"""
tg_database.py — מסד הנתונים של Telegram Marketing Agent
SQLite — נוצר אוטומטית על השרת, אין צורך בהגדרה חיצונית.
קובץ: tg_agent.db (מוגדר ב-.gitignore)
"""
import random
import sqlite3
import logging
from datetime import datetime, date
from .config import DB_PATH

logger = logging.getLogger(__name__)


def get_conn() -> sqlite3.Connection:
    """מחזיר חיבור ל-DB עם dict-like rows."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """יוצר את כל הטבלאות אם עדיין לא קיימות."""
    conn = get_conn()
    cursor = conn.cursor()

    cursor.executescript("""
        -- קבוצות טלגרם שנמצאו
        CREATE TABLE IF NOT EXISTS groups (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            telegram_id      TEXT    UNIQUE NOT NULL,
            username         TEXT,
            title            TEXT,
            member_count     INTEGER DEFAULT 0,
            found_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_posted_at   TIMESTAMP,
            post_count       INTEGER DEFAULT 0,
            last_template_id INTEGER DEFAULT -1,
            is_active        INTEGER DEFAULT 1,
            success_rate     REAL    DEFAULT 1.0
        );

        -- פרסומים שנשלחו
        CREATE TABLE IF NOT EXISTS posts (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            group_telegram_id TEXT   NOT NULL,
            template_id      INTEGER NOT NULL,
            posted_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status           TEXT    DEFAULT 'sent'
        );

        -- סטטיסטיקות יומיות
        CREATE TABLE IF NOT EXISTS daily_stats (
            date             TEXT PRIMARY KEY,
            groups_found     INTEGER DEFAULT 0,
            posts_sent       INTEGER DEFAULT 0,
            posts_failed     INTEGER DEFAULT 0,
            comments_sent    INTEGER DEFAULT 0,
            reactions_sent   INTEGER DEFAULT 0,
            monitor_dms_sent INTEGER DEFAULT 0,
            scraper_dms_sent INTEGER DEFAULT 0
        );

        -- מצב Agent (pause / resume)
        CREATE TABLE IF NOT EXISTS agent_state (
            key   TEXT PRIMARY KEY,
            value TEXT
        );

        -- A/B Testing — ביצועי תבניות
        CREATE TABLE IF NOT EXISTS template_stats (
            template_id  INTEGER PRIMARY KEY,
            sends        INTEGER DEFAULT 0,
            successes    INTEGER DEFAULT 0
        );

        -- DMs שנשלחו (scraper + monitor)
        CREATE TABLE IF NOT EXISTS dm_log (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     TEXT    NOT NULL,
            source      TEXT    NOT NULL,
            text        TEXT,
            sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Monitor hits
        CREATE TABLE IF NOT EXISTS monitor_hits (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     TEXT    NOT NULL,
            group_id    TEXT    NOT NULL,
            keyword     TEXT,
            message     TEXT,
            hit_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- הודעות מתחרים
        CREATE TABLE IF NOT EXISTS competitor_msgs (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            channel_id  TEXT    NOT NULL,
            msg_id      TEXT    NOT NULL UNIQUE,
            text        TEXT,
            saved_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Sentiment Tracker
        CREATE TABLE IF NOT EXISTS sentiment_daily (
            date    TEXT NOT NULL,
            keyword TEXT NOT NULL,
            count   INTEGER DEFAULT 0,
            PRIMARY KEY (date, keyword)
        );

        -- Engagement log
        CREATE TABLE IF NOT EXISTS engagement_log (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id    TEXT    NOT NULL,
            msg_id      TEXT,
            action      TEXT    NOT NULL,
            done_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Lead Qualifier Bot — מעקב אחרי שיחות כישורים
        CREATE TABLE IF NOT EXISTS qualifier_conversations (
            user_id      TEXT PRIMARY KEY,
            status       TEXT DEFAULT 'awaiting',  -- awaiting / qualified
            platform     TEXT,
            asked_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            qualified_at TIMESTAMP
        );
    """)

    # ברירת מחדל — agent פעיל
    cursor.execute(
        "INSERT OR IGNORE INTO agent_state (key, value) VALUES ('paused', '0')"
    )

    # Migration: add success_rate column for existing DBs (safe if already exists)
    try:
        cursor.execute("ALTER TABLE groups ADD COLUMN success_rate REAL DEFAULT 1.0")
    except Exception:
        pass  # Column already exists

    # Migration: add missing daily_stats counters for newer TG features
    _daily_stat_migrations = [
        ("comments_sent", "INTEGER DEFAULT 0"),
        ("reactions_sent", "INTEGER DEFAULT 0"),
        ("monitor_dms_sent", "INTEGER DEFAULT 0"),
        ("scraper_dms_sent", "INTEGER DEFAULT 0"),
    ]
    for col_name, col_def in _daily_stat_migrations:
        try:
            cursor.execute(f"ALTER TABLE daily_stats ADD COLUMN {col_name} {col_def}")
        except Exception:
            pass  # Column already exists

    conn.commit()
    conn.close()
    logger.info("Telegram DB מוכן: %s", DB_PATH)


# ─── A/B Testing — ביצועי תבניות ─────────────────────────────────────────────

def record_template_result(template_id: int, success: bool) -> None:
    """
    מתעד תוצאת שימוש בתבנית.
    sends += 1 תמיד; successes += 1 רק בהצלחה.
    """
    conn = get_conn()
    conn.execute(
        "INSERT OR IGNORE INTO template_stats (template_id) VALUES (?)",
        (template_id,),
    )
    if success:
        conn.execute(
            "UPDATE template_stats SET sends = sends + 1, successes = successes + 1 WHERE template_id = ?",
            (template_id,),
        )
    else:
        conn.execute(
            "UPDATE template_stats SET sends = sends + 1 WHERE template_id = ?",
            (template_id,),
        )
    conn.commit()
    conn.close()


def get_template_stats() -> list[dict]:
    """
    מחזיר סטטיסטיקות לכל תבנית, כולל אחוז הצלחה.
    מוחזר ממוין לפי rate DESC.
    """
    conn = get_conn()
    rows = conn.execute(
        "SELECT template_id, sends, successes FROM template_stats ORDER BY template_id"
    ).fetchall()
    conn.close()
    result = []
    for r in rows:
        sends = r["sends"] or 0
        successes = r["successes"] or 0
        rate = successes / sends if sends > 0 else None
        result.append({"template_id": r["template_id"], "sends": sends, "successes": successes, "rate": rate})
    # Sort by rate DESC (None → treated as 0.5 for sorting)
    result.sort(key=lambda x: x["rate"] if x["rate"] is not None else 0.5, reverse=True)
    return result


def get_weighted_template_id(last_id: int = -1) -> int:
    """
    Epsilon-greedy template selection:
    - Templates with < 5 sends → assigned 0.5 exploration weight
    - 80% chance: weighted random by success rate (excluding last_id)
    - 20% chance: pure random exploration (any template except last_id)

    Falls back to pure random if no stats exist yet.
    """
    from .messages import NUM_TEMPLATES  # lazy import — avoids circular at module load

    all_ids = [i for i in range(NUM_TEMPLATES) if i != last_id]

    # 20% pure-random exploration
    if random.random() < 0.20:
        return random.choice(all_ids)

    # Fetch stats
    conn = get_conn()
    rows = conn.execute(
        "SELECT template_id, sends, successes FROM template_stats WHERE template_id != ?",
        (last_id,),
    ).fetchall()
    conn.close()

    stats = {r["template_id"]: r for r in rows}

    # Build weight for each candidate template
    weights = []
    for tid in all_ids:
        if tid not in stats or stats[tid]["sends"] < 5:
            w = 0.5  # exploration bonus for unseen templates
        else:
            sends = stats[tid]["sends"]
            successes = stats[tid]["successes"]
            w = max(successes / sends, 0.05)  # floor at 5% so nothing is completely ignored
        weights.append(w)

    # Weighted random choice
    return random.choices(all_ids, weights=weights, k=1)[0]


# ─── קבוצות ────────────────────────────────────────────────────────────────────

def log_group(telegram_id: str, username: str | None, title: str, member_count: int) -> bool:
    """
    שומר קבוצה חדשה ב-DB.
    מחזיר True אם נוספה, False אם כבר קיימת.
    """
    conn = get_conn()
    try:
        conn.execute(
            "INSERT OR IGNORE INTO groups (telegram_id, username, title, member_count) VALUES (?, ?, ?, ?)",
            (str(telegram_id), username, title, member_count),
        )
        changed = conn.total_changes > 0
        conn.commit()
        return changed
    finally:
        conn.close()


def get_eligible_groups(cooldown_days: int, limit: int = 20) -> list[dict]:
    """
    מחזיר קבוצות עם cooldown אדפטיבי לפי success_rate:
    - success_rate >= 0.8 → cooldown מקוצר (cd_short = max(cooldown//2, 2))
    - success_rate >= 0.5 → cooldown רגיל (cooldown_days)
    - success_rate < 0.5  → cooldown מוארך (cooldown_days * 2)
    ממוין לפי success_rate DESC — הקבוצות הטובות קודמות.
    """
    cd_short   = max(cooldown_days // 2, 2)
    cd_default = cooldown_days
    cd_long    = cooldown_days * 2

    conn = get_conn()
    try:
        rows = conn.execute(
            """
            SELECT * FROM groups
            WHERE is_active = 1
              AND (
                    last_posted_at IS NULL
                    OR datetime(last_posted_at, '+' ||
                        CASE
                            WHEN success_rate >= 0.8 THEN ?
                            WHEN success_rate >= 0.5 THEN ?
                            ELSE ?
                        END || ' days') <= datetime('now')
                  )
            ORDER BY success_rate DESC, last_posted_at ASC
            LIMIT ?
            """,
            (cd_short, cd_default, cd_long, limit),
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def mark_posted(telegram_id: str, template_id: int) -> None:
    """מעדכן last_posted_at, מונה פרסומים, ומחשב EMA הצלחה (success_rate)."""
    conn = get_conn()
    conn.execute(
        """
        UPDATE groups
        SET last_posted_at   = datetime('now'),
            post_count       = post_count + 1,
            last_template_id = ?,
            success_rate     = success_rate * 0.8 + 0.2
        WHERE telegram_id = ?
        """,
        (template_id, str(telegram_id)),
    )
    conn.commit()
    conn.close()


def mark_post_failed(telegram_id: str) -> None:
    """מוריד את success_rate EMA בעקבות כישלון פרסום."""
    conn = get_conn()
    conn.execute(
        "UPDATE groups SET success_rate = success_rate * 0.8 WHERE telegram_id = ?",
        (str(telegram_id),),
    )
    conn.commit()
    conn.close()


def deactivate_group(telegram_id: str) -> None:
    """מסמן קבוצה כלא-פעילה (נחסמנו, קבוצה פרטית, שגיאות)."""
    conn = get_conn()
    conn.execute(
        "UPDATE groups SET is_active = 0 WHERE telegram_id = ?",
        (str(telegram_id),),
    )
    conn.commit()
    conn.close()


def get_total_groups() -> int:
    """כמה קבוצות פעילות ב-DB בסך הכל?"""
    conn = get_conn()
    result = conn.execute("SELECT COUNT(*) FROM groups WHERE is_active = 1").fetchone()
    conn.close()
    return result[0]


def get_recent_groups(limit: int = 5) -> list[dict]:
    """מחזיר N קבוצות אחרונות שנמצאו."""
    conn = get_conn()
    rows = conn.execute(
        "SELECT * FROM groups ORDER BY found_at DESC LIMIT ?", (limit,)
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_top_groups(limit: int = 5) -> list[dict]:
    """מחזיר N קבוצות עם הביצועים הטובים ביותר (לפי post_count ו-success_rate)."""
    conn = get_conn()
    rows = conn.execute(
        """
        SELECT title, post_count, member_count, success_rate
        FROM groups
        WHERE is_active = 1
        ORDER BY post_count DESC, success_rate DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


# ─── פרסומים ────────────────────────────────────────────────────────────────────

def log_post(group_telegram_id: str, template_id: int, status: str = "sent") -> None:
    """מתעד פרסום חדש ב-DB."""
    conn = get_conn()
    conn.execute(
        "INSERT INTO posts (group_telegram_id, template_id, status) VALUES (?, ?, ?)",
        (str(group_telegram_id), template_id, status),
    )
    conn.commit()
    conn.close()


# ─── סטטיסטיקות ───────────────────────────────────────────────────────────────

def _ensure_today() -> None:
    """מוודא שיש שורה לתאריך היום."""
    today = date.today().isoformat()
    conn = get_conn()
    conn.execute(
        "INSERT OR IGNORE INTO daily_stats (date) VALUES (?)", (today,)
    )
    conn.commit()
    conn.close()


def increment_stat(field: str) -> None:
    """????? ????? ????????? ?-1 ???? ???? ?????? ????."""
    allowed_fields = {
        "groups_found",
        "posts_sent",
        "posts_failed",
        "comments_sent",
        "reactions_sent",
        "monitor_dms_sent",
        "scraper_dms_sent",
    }
    if field not in allowed_fields:
        logger.warning("increment_stat called with unsupported field: %s", field)
        return

    _ensure_today()
    today = date.today().isoformat()
    conn = get_conn()
    try:
        conn.execute(
            f"UPDATE daily_stats SET {field} = {field} + 1 WHERE date = ?", (today,)
        )
        conn.commit()
    except sqlite3.OperationalError:
        # Protect runtime if DB was created with an older schema and migration failed.
        logger.warning("increment_stat failed for field '%s' due to missing column", field)
    finally:
        conn.close()


def get_today_stats() -> dict:
    """מחזיר סטטיסטיקות של היום."""
    _ensure_today()
    today = date.today().isoformat()
    conn = get_conn()
    row = conn.execute(
        "SELECT * FROM daily_stats WHERE date = ?", (today,)
    ).fetchone()
    conn.close()
    return dict(row) if row else {}


def get_posts_sent_today() -> int:
    """כמה פרסומים נשלחו היום?"""
    return get_today_stats().get("posts_sent", 0)


def get_groups_found_today() -> int:
    """כמה קבוצות נמצאו היום?"""
    return get_today_stats().get("groups_found", 0)


# ─── מצב Agent ────────────────────────────────────────────────────────────────

def is_paused() -> bool:
    """האם ה-Agent מושהה?"""
    conn = get_conn()
    row = conn.execute(
        "SELECT value FROM agent_state WHERE key = 'paused'"
    ).fetchone()
    conn.close()
    return row is not None and row[0] == "1"


def set_paused(paused: bool) -> None:
    """מגדיר את מצב ה-pause של ה-Agent."""
    conn = get_conn()
    conn.execute(
        "UPDATE agent_state SET value = ? WHERE key = 'paused'",
        ("1" if paused else "0",),
    )
    conn.commit()
    conn.close()


# ─── DM Log (scraper + monitor) ───────────────────────────────────────────────

def log_dm_sent(user_id: str, source: str, text: str) -> None:
    conn = get_conn()
    conn.execute(
        "INSERT INTO dm_log (user_id, source, text) VALUES (?, ?, ?)",
        (user_id, source, text),
    )
    conn.commit()
    conn.close()


def get_dm_cooldown_ok(user_id: str, cooldown_days: int) -> bool:
    conn = get_conn()
    row = conn.execute(
        "SELECT 1 FROM dm_log WHERE user_id=? AND datetime(sent_at,'+' || ? ||' days')>datetime('now') LIMIT 1",
        (user_id, cooldown_days),
    ).fetchone()
    conn.close()
    return row is None


def get_monitor_dms_today() -> int:
    today = date.today().isoformat()
    conn  = get_conn()
    row   = conn.execute(
        "SELECT COUNT(*) FROM dm_log WHERE source='monitor' AND date(sent_at)=?", (today,)
    ).fetchone()
    conn.close()
    return row[0] if row else 0


def get_scraper_dms_today() -> int:
    today = date.today().isoformat()
    conn  = get_conn()
    row   = conn.execute(
        "SELECT COUNT(*) FROM dm_log WHERE source='scraper' AND date(sent_at)=?", (today,)
    ).fetchone()
    conn.close()
    return row[0] if row else 0


# ─── Monitor hits ─────────────────────────────────────────────────────────────

def log_monitor_hit(user_id: str, group_id: str, keyword: str, message: str) -> None:
    conn = get_conn()
    conn.execute(
        "INSERT INTO monitor_hits (user_id, group_id, keyword, message) VALUES (?,?,?,?)",
        (user_id, group_id, keyword, message),
    )
    conn.commit()
    conn.close()


def get_monitor_hits_today() -> int:
    today = date.today().isoformat()
    conn  = get_conn()
    row   = conn.execute(
        "SELECT COUNT(*) FROM monitor_hits WHERE date(hit_at)=?", (today,)
    ).fetchone()
    conn.close()
    return row[0] if row else 0


# ─── Competitor msgs ──────────────────────────────────────────────────────────

def log_competitor_msg(channel_id: str, msg_id: str, text: str) -> None:
    conn = get_conn()
    conn.execute(
        "INSERT OR IGNORE INTO competitor_msgs (channel_id, msg_id, text) VALUES (?,?,?)",
        (channel_id, msg_id, text),
    )
    conn.commit()
    conn.close()


def get_recent_competitor_msgs(limit: int = 10) -> list[dict]:
    conn = get_conn()
    rows = conn.execute(
        "SELECT channel_id, text, saved_at FROM competitor_msgs ORDER BY saved_at DESC LIMIT ?",
        (limit,),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


# ─── Sentiment Tracker ────────────────────────────────────────────────────────

def increment_sentiment(keyword: str) -> None:
    today = date.today().isoformat()
    conn  = get_conn()
    conn.execute(
        "INSERT INTO sentiment_daily (date,keyword,count) VALUES (?,?,1) "
        "ON CONFLICT(date,keyword) DO UPDATE SET count=count+1",
        (today, keyword),
    )
    conn.commit()
    conn.close()


def get_top_sentiments(limit: int = 10) -> list[dict]:
    conn = get_conn()
    rows = conn.execute(
        "SELECT keyword, SUM(count) as total FROM sentiment_daily "
        "WHERE date >= date('now','-7 days') GROUP BY keyword ORDER BY total DESC LIMIT ?",
        (limit,),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


# ─── Engagement log ───────────────────────────────────────────────────────────

def log_comment(group_id: str, msg_id: str) -> None:
    conn = get_conn()
    conn.execute(
        "INSERT INTO engagement_log (group_id,msg_id,action) VALUES (?,?,'comment')",
        (group_id, msg_id),
    )
    conn.commit()
    conn.close()


def log_reaction(group_id: str, msg_id: str) -> None:
    conn = get_conn()
    conn.execute(
        "INSERT INTO engagement_log (group_id,msg_id,action) VALUES (?,?,'reaction')",
        (group_id, msg_id),
    )
    conn.commit()
    conn.close()


def get_comment_cooldown_ok(group_id: str, cooldown_days: int) -> bool:
    conn = get_conn()
    row  = conn.execute(
        "SELECT 1 FROM engagement_log WHERE group_id=? AND action='comment' "
        "AND datetime(done_at,'+' || ? ||' days')>datetime('now') LIMIT 1",
        (group_id, cooldown_days),
    ).fetchone()
    conn.close()
    return row is None


def get_reaction_cooldown_ok(group_id: str, cooldown_days: int) -> bool:
    conn = get_conn()
    row  = conn.execute(
        "SELECT 1 FROM engagement_log WHERE group_id=? AND action='reaction' "
        "AND datetime(done_at,'+' || ? ||' days')>datetime('now') LIMIT 1",
        (group_id, cooldown_days),
    ).fetchone()
    conn.close()
    return row is None


def get_engagement_stats_today() -> dict:
    today = date.today().isoformat()
    conn  = get_conn()
    c = conn.execute(
        "SELECT COUNT(*) FROM engagement_log WHERE action='comment' AND date(done_at)=?", (today,)
    ).fetchone()
    r = conn.execute(
        "SELECT COUNT(*) FROM engagement_log WHERE action='reaction' AND date(done_at)=?", (today,)
    ).fetchone()
    conn.close()
    return {"comments_sent": c[0] if c else 0, "reactions_sent": r[0] if r else 0}


# ─── Lead Qualifier Bot ────────────────────────────────────────────────────────

def set_qualifier_awaiting(user_id: str) -> None:
    """מסמן שהמשתמש קיבל שאלת כישורים ואנחנו מחכים לתשובה."""
    conn = get_conn()
    conn.execute(
        "INSERT OR REPLACE INTO qualifier_conversations (user_id, status) VALUES (?, 'awaiting')",
        (user_id,),
    )
    conn.commit()
    conn.close()


def get_qualifier_status(user_id: str) -> str | None:
    """מחזיר: 'awaiting' / 'qualified' / None אם אין רשומה."""
    conn = get_conn()
    row = conn.execute(
        "SELECT status FROM qualifier_conversations WHERE user_id=?", (user_id,)
    ).fetchone()
    conn.close()
    return row["status"] if row else None


def set_qualifier_done(user_id: str, platform: str) -> None:
    """מסמן שהמשתמש qualified — הפלטפורמה זוהתה ופיץ' נשלח."""
    conn = get_conn()
    conn.execute(
        "UPDATE qualifier_conversations SET status='qualified', platform=?, qualified_at=CURRENT_TIMESTAMP WHERE user_id=?",
        (platform, user_id),
    )
    conn.commit()
    conn.close()


def get_qualified_today() -> int:
    """כמה leads qualified היום?"""
    today = date.today().isoformat()
    conn  = get_conn()
    row   = conn.execute(
        "SELECT COUNT(*) FROM qualifier_conversations WHERE status='qualified' AND date(qualified_at)=?",
        (today,),
    ).fetchone()
    conn.close()
    return row[0] if row else 0


def get_qualifier_stats() -> dict:
    """סטטיסטיקות qualifier — סה"כ + היום + פלטפורמות."""
    today = date.today().isoformat()
    conn  = get_conn()
    total     = conn.execute("SELECT COUNT(*) FROM qualifier_conversations WHERE status='qualified'").fetchone()[0]
    today_cnt = conn.execute(
        "SELECT COUNT(*) FROM qualifier_conversations WHERE status='qualified' AND date(qualified_at)=?", (today,)
    ).fetchone()[0]
    platforms = conn.execute(
        "SELECT platform, COUNT(*) as cnt FROM qualifier_conversations WHERE status='qualified' "
        "GROUP BY platform ORDER BY cnt DESC"
    ).fetchall()
    conn.close()
    return {
        "total": total,
        "today": today_cnt,
        "platforms": [dict(r) for r in platforms],
    }
