import sqlite3
import logging
from datetime import date, datetime
from .config import IG_DB_PATH

logger = logging.getLogger(__name__)


def _conn() -> sqlite3.Connection:
    conn = sqlite3.connect(IG_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create all tables if they don't exist."""
    with _conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS accounts (
                id                INTEGER PRIMARY KEY AUTOINCREMENT,
                username          TEXT UNIQUE NOT NULL,
                user_pk           TEXT,
                follower_count    INTEGER,
                found_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_dm_at        TIMESTAMP,
                last_comment_at   TIMESTAMP,
                dm_count          INTEGER DEFAULT 0,
                comment_count     INTEGER DEFAULT 0,
                is_blocked        INTEGER DEFAULT 0,
                source_hashtag    TEXT
            );

            CREATE TABLE IF NOT EXISTS dms (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                username    TEXT NOT NULL,
                template_id INTEGER NOT NULL,
                sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status      TEXT DEFAULT 'sent'
            );

            CREATE TABLE IF NOT EXISTS comments (
                id             INTEGER PRIMARY KEY AUTOINCREMENT,
                username       TEXT NOT NULL,
                post_shortcode TEXT NOT NULL,
                template_id    INTEGER NOT NULL,
                sent_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status         TEXT DEFAULT 'sent'
            );

            CREATE TABLE IF NOT EXISTS ig_posts (
                id                 INTEGER PRIMARY KEY AUTOINCREMENT,
                media_type         TEXT NOT NULL,
                caption_template_id INTEGER,
                posted_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status             TEXT DEFAULT 'sent',
                media_id           TEXT
            );

            CREATE TABLE IF NOT EXISTS daily_stats (
                date              TEXT PRIMARY KEY,
                accounts_found    INTEGER DEFAULT 0,
                dms_sent          INTEGER DEFAULT 0,
                dms_failed        INTEGER DEFAULT 0,
                comments_sent     INTEGER DEFAULT 0,
                comments_failed   INTEGER DEFAULT 0,
                posts_published   INTEGER DEFAULT 0,
                likes_sent        INTEGER DEFAULT 0,
                follows_sent      INTEGER DEFAULT 0,
                unfollows_sent    INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS agent_state (
                key   TEXT PRIMARY KEY,
                value TEXT
            );

            -- תגובות לתגובות שלנו (Feature 3 — Comment Reply Monitor)
            CREATE TABLE IF NOT EXISTS ig_comment_replies (
                comment_id    TEXT PRIMARY KEY,
                username      TEXT NOT NULL,
                post_shortcode TEXT,
                reply_text    TEXT,
                dm_sent       INTEGER DEFAULT 0,
                seen_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- שיחות DM פעילות עם Gemini (Feature 11 — DM Inbox Manager)
            CREATE TABLE IF NOT EXISTS ig_dm_conversations (
                username          TEXT PRIMARY KEY,
                stage             TEXT DEFAULT 'new',
                last_user_msg     TEXT,
                our_last_reply_at TIMESTAMP,
                platform          TEXT,
                created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- סטוריז שצפינו בהם (Feature 1 — Story Viewer)
            CREATE TABLE IF NOT EXISTS ig_story_views (
                story_pk  TEXT PRIMARY KEY,
                username  TEXT,
                viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Warm leads — אנשים שהגיבו/לייקו את הפוסטים שלנו (Feature 7)
            CREATE TABLE IF NOT EXISTS ig_warm_leads (
                username  TEXT PRIMARY KEY,
                user_pk   TEXT,
                source    TEXT,   -- post_like / post_comment / reel_save
                media_id  TEXT,
                dm_sent   INTEGER DEFAULT 0,
                found_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- מטמון מתחרים שהתגלו אוטומטית (Feature 2)
            CREATE TABLE IF NOT EXISTS ig_competitor_cache (
                username    TEXT PRIMARY KEY,
                user_pk     TEXT,
                score       INTEGER DEFAULT 0,
                bio         TEXT,
                followers   INTEGER DEFAULT 0,
                discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- עקיבות — לעקוב / לבטל עקיבה (Follow Engine)
            CREATE TABLE IF NOT EXISTS ig_follows (
                user_pk      TEXT PRIMARY KEY,
                username     TEXT NOT NULL,
                followed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                unfollowed   INTEGER DEFAULT 0,
                unfollowed_at TIMESTAMP
            );
        """)
    logger.info("Instagram DB initialised at %s", IG_DB_PATH)


# ─── Account management ───────────────────────────────────────────────────────

def log_account(username: str, user_pk: str, follower_count: int, hashtag: str) -> bool:
    """Insert a discovered account. Returns True if new, False if already exists."""
    try:
        with _conn() as conn:
            conn.execute(
                """INSERT OR IGNORE INTO accounts
                   (username, user_pk, follower_count, source_hashtag)
                   VALUES (?, ?, ?, ?)""",
                (username, user_pk, follower_count, hashtag),
            )
            return conn.total_changes > 0
    except Exception as e:
        logger.error("log_account error: %s", e)
        return False


def get_dm_cooldown_ok_by_pk(user_pk: str, cooldown_days: int) -> bool:
    """בדוק cooldown לפי user_pk (לא username) — לcompetitor harvest."""
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM accounts WHERE user_pk=? AND last_dm_at IS NOT NULL "
            "AND julianday('now') - julianday(last_dm_at) < ?",
            (user_pk, cooldown_days),
        ).fetchone()
    return row is None


def block_account(username: str) -> None:
    """Mark account as blocked so we never contact it again."""
    with _conn() as conn:
        conn.execute(
            "UPDATE accounts SET is_blocked = 1 WHERE username = ?", (username,)
        )


def get_dm_eligible(cooldown_days: int, limit: int) -> list[dict]:
    """Return accounts that haven't been DMed in cooldown_days days."""
    with _conn() as conn:
        rows = conn.execute(
            """SELECT username, user_pk, source_hashtag
               FROM accounts
               WHERE is_blocked = 0
                 AND (last_dm_at IS NULL
                      OR julianday('now') - julianday(last_dm_at) >= ?)
               ORDER BY found_at DESC
               LIMIT ?""",
            (cooldown_days, limit),
        ).fetchall()
    return [dict(r) for r in rows]


def get_comment_eligible(cooldown_days: int, limit: int) -> list[dict]:
    """Return accounts we haven't commented on in cooldown_days days."""
    with _conn() as conn:
        rows = conn.execute(
            """SELECT username, user_pk, source_hashtag
               FROM accounts
               WHERE is_blocked = 0
                 AND (last_comment_at IS NULL
                      OR julianday('now') - julianday(last_comment_at) >= ?)
               ORDER BY found_at DESC
               LIMIT ?""",
            (cooldown_days, limit),
        ).fetchall()
    return [dict(r) for r in rows]


# ─── DM tracking ─────────────────────────────────────────────────────────────

def mark_dm_sent(username: str, template_id: int, status: str = "sent") -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT INTO dms (username, template_id, status) VALUES (?, ?, ?)",
            (username, template_id, status),
        )
        if status == "sent":
            conn.execute(
                """UPDATE accounts
                   SET last_dm_at = CURRENT_TIMESTAMP,
                       dm_count = dm_count + 1
                   WHERE username = ?""",
                (username,),
            )


# ─── Comment tracking ─────────────────────────────────────────────────────────

def mark_comment_sent(
    username: str, shortcode: str, template_id: int, status: str = "sent"
) -> None:
    with _conn() as conn:
        conn.execute(
            """INSERT INTO comments (username, post_shortcode, template_id, status)
               VALUES (?, ?, ?, ?)""",
            (username, shortcode, template_id, status),
        )
        if status == "sent":
            conn.execute(
                """UPDATE accounts
                   SET last_comment_at = CURRENT_TIMESTAMP,
                       comment_count = comment_count + 1
                   WHERE username = ?""",
                (username,),
            )


def already_commented(shortcode: str) -> bool:
    """Check if we've already commented on this specific post."""
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM comments WHERE post_shortcode = ? AND status = 'sent'",
            (shortcode,),
        ).fetchone()
    return row is not None


# ─── Post tracking ───────────────────────────────────────────────────────────

def log_ig_post(
    media_type: str, caption_template_id: int, status: str, media_id: str = ""
) -> None:
    with _conn() as conn:
        conn.execute(
            """INSERT INTO ig_posts (media_type, caption_template_id, status, media_id)
               VALUES (?, ?, ?, ?)""",
            (media_type, caption_template_id, status, media_id),
        )


def get_posts_today() -> int:
    """Count posts published today."""
    today = date.today().isoformat()
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM ig_posts WHERE date(posted_at) = ? AND status = 'sent'",
            (today,),
        ).fetchone()
    return row[0] if row else 0


# ─── Stats ───────────────────────────────────────────────────────────────────

def increment_stat(field: str) -> None:
    today = date.today().isoformat()
    with _conn() as conn:
        conn.execute(
            f"""INSERT INTO daily_stats (date, {field})
                VALUES (?, 1)
                ON CONFLICT(date) DO UPDATE SET {field} = {field} + 1""",
            (today,),
        )


def get_today_stats() -> dict:
    today = date.today().isoformat()
    with _conn() as conn:
        row = conn.execute(
            "SELECT * FROM daily_stats WHERE date = ?", (today,)
        ).fetchone()
    if not row:
        return {
            "accounts_found": 0, "dms_sent": 0, "dms_failed": 0,
            "comments_sent": 0, "comments_failed": 0, "posts_published": 0,
            "likes_sent": 0, "follows_sent": 0, "unfollows_sent": 0,
        }
    return dict(row)


def get_total_accounts() -> int:
    with _conn() as conn:
        row = conn.execute("SELECT COUNT(*) FROM accounts WHERE is_blocked = 0").fetchone()
    return row[0] if row else 0


# ─── Agent state ─────────────────────────────────────────────────────────────

def is_paused() -> bool:
    with _conn() as conn:
        row = conn.execute(
            "SELECT value FROM agent_state WHERE key = 'paused'"
        ).fetchone()
    return row is not None and row["value"] == "1"


def set_paused(paused: bool) -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT OR REPLACE INTO agent_state (key, value) VALUES ('paused', ?)",
            ("1" if paused else "0",),
        )


# ─── Comment Reply Monitor (Feature 3) ───────────────────────────────────────

def is_comment_reply_seen(comment_id: str) -> bool:
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM ig_comment_replies WHERE comment_id=?", (comment_id,)
        ).fetchone()
    return row is not None


def log_comment_reply(
    comment_id: str, username: str, shortcode: str, reply_text: str, dm_sent: bool = False
) -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO ig_comment_replies "
            "(comment_id, username, post_shortcode, reply_text, dm_sent) VALUES (?,?,?,?,?)",
            (comment_id, username, shortcode, reply_text[:500], 1 if dm_sent else 0),
        )


def mark_comment_reply_dm_sent(comment_id: str) -> None:
    with _conn() as conn:
        conn.execute(
            "UPDATE ig_comment_replies SET dm_sent=1 WHERE comment_id=?", (comment_id,)
        )


# ─── DM Conversation Manager (Feature 11) ────────────────────────────────────

def start_ig_conversation(username: str) -> None:
    """מתחיל מעקב שיחה כשאנחנו שולחים DM ראשוני."""
    with _conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO ig_dm_conversations (username, stage) VALUES (?, 'new')",
            (username,),
        )


def get_ig_conversation_stage(username: str) -> str | None:
    """מחזיר שלב השיחה: new / qualifying / pitching / done / None."""
    with _conn() as conn:
        row = conn.execute(
            "SELECT stage FROM ig_dm_conversations WHERE username=?", (username,)
        ).fetchone()
    return row["stage"] if row else None


def update_ig_conversation(username: str, last_user_msg: str, new_stage: str | None = None) -> None:
    """מעדכן שיחה: הודעה אחרונה + שלב + זמן מענה שלנו."""
    with _conn() as conn:
        if new_stage:
            conn.execute(
                "UPDATE ig_dm_conversations SET last_user_msg=?, our_last_reply_at=CURRENT_TIMESTAMP, stage=? WHERE username=?",
                (last_user_msg[:500], new_stage, username),
            )
        else:
            conn.execute(
                "UPDATE ig_dm_conversations SET last_user_msg=?, our_last_reply_at=CURRENT_TIMESTAMP WHERE username=?",
                (last_user_msg[:500], username),
            )


def close_ig_conversation(username: str) -> None:
    with _conn() as conn:
        conn.execute(
            "UPDATE ig_dm_conversations SET stage='done' WHERE username=?", (username,)
        )


def get_active_conversations() -> list[dict]:
    with _conn() as conn:
        rows = conn.execute(
            "SELECT username, stage, last_user_msg, our_last_reply_at FROM ig_dm_conversations "
            "WHERE stage != 'done' ORDER BY created_at DESC"
        ).fetchall()
    return [dict(r) for r in rows]


def get_conversation_stats() -> dict:
    with _conn() as conn:
        total = conn.execute("SELECT COUNT(*) FROM ig_dm_conversations").fetchone()[0]
        done  = conn.execute("SELECT COUNT(*) FROM ig_dm_conversations WHERE stage='done'").fetchone()[0]
        reply_monitor = conn.execute("SELECT COUNT(*) FROM ig_comment_replies WHERE dm_sent=1").fetchone()[0]
    return {"total": total, "active": total - done, "done": done, "reply_monitor_dms": reply_monitor}


# ─── Story Views (Feature 1) ──────────────────────────────────────────────────

def is_story_viewed(story_pk: str) -> bool:
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM ig_story_views WHERE story_pk=?", (story_pk,)
        ).fetchone()
    return row is not None


def log_story_view(story_pk: str, username: str) -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO ig_story_views (story_pk, username) VALUES (?,?)",
            (story_pk, username),
        )


def get_story_views_today() -> int:
    today = date.today().isoformat()
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM ig_story_views WHERE date(viewed_at)=?", (today,)
        ).fetchone()
    return row[0] if row else 0


# ─── Warm Leads (Feature 7) ───────────────────────────────────────────────────

def log_warm_lead(username: str, user_pk: str, source: str, media_id: str) -> bool:
    """מוסיף warm lead. מחזיר True אם חדש."""
    try:
        with _conn() as conn:
            conn.execute(
                "INSERT OR IGNORE INTO ig_warm_leads (username, user_pk, source, media_id) VALUES (?,?,?,?)",
                (username, user_pk, source, media_id),
            )
            return conn.total_changes > 0
    except Exception:
        return False


def get_warm_leads_eligible(limit: int = 20) -> list[dict]:
    """מחזיר warm leads שטרם קיבלו DM."""
    with _conn() as conn:
        rows = conn.execute(
            "SELECT username, user_pk, source FROM ig_warm_leads WHERE dm_sent=0 "
            "ORDER BY found_at DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]


def mark_warm_lead_dm_sent(username: str) -> None:
    with _conn() as conn:
        conn.execute(
            "UPDATE ig_warm_leads SET dm_sent=1 WHERE username=?", (username,)
        )


# ─── Competitor Cache (Feature 2 — Auto-Discovery) ────────────────────────────

def cache_competitor(
    username: str, user_pk: str, score: int, bio: str, followers: int
) -> None:
    """שומר מתחרה שהתגלה אוטומטית ב-DB (או מעדכן אם קיים)."""
    with _conn() as conn:
        conn.execute(
            """INSERT INTO ig_competitor_cache
               (username, user_pk, score, bio, followers, discovered_at)
               VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
               ON CONFLICT(username) DO UPDATE SET
                 score=excluded.score,
                 bio=excluded.bio,
                 followers=excluded.followers,
                 discovered_at=CURRENT_TIMESTAMP""",
            (username, user_pk, score, bio[:200], followers),
        )


def get_cached_competitors(limit: int = 5) -> list[dict]:
    """מחזיר top מתחרים לפי score."""
    with _conn() as conn:
        rows = conn.execute(
            "SELECT username, user_pk, score, followers FROM ig_competitor_cache "
            "ORDER BY score DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]


def is_competitor_cache_fresh(max_age_days: int = 7) -> bool:
    """האם המטמון עדכני? True = יש רשומות חדשות מספיק."""
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM ig_competitor_cache "
            "WHERE julianday('now') - julianday(discovered_at) <= ?",
            (max_age_days,),
        ).fetchone()
    return (row[0] if row else 0) >= 3  # לפחות 3 מתחרים תקפים


# ─── Follow Engine ────────────────────────────────────────────────────────────

def log_follow(username: str, user_pk: str) -> None:
    """שומר עקיבה חדשה ב-DB."""
    with _conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO ig_follows (user_pk, username) VALUES (?, ?)",
            (user_pk, username),
        )


def is_followed_before(user_pk: str) -> bool:
    """האם כבר עקבנו אחרי המשתמש?"""
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM ig_follows WHERE user_pk=?", (user_pk,)
        ).fetchone()
    return row is not None


def get_follows_today() -> int:
    """כמה עקיבות בוצעו היום."""
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM ig_follows "
            "WHERE date(followed_at)=date('now','localtime') AND unfollowed=0",
        ).fetchone()
    return row[0] if row else 0


def get_unfollow_candidates(days: int = 4, limit: int = 20) -> list[dict]:
    """מחזיר משתמשים שעקבנו אחריהם לפני X ימים ועדיין לא ביטלנו."""
    with _conn() as conn:
        rows = conn.execute(
            "SELECT username, user_pk FROM ig_follows "
            "WHERE unfollowed=0 "
            "AND julianday('now') - julianday(followed_at) >= ? "
            "LIMIT ?",
            (days, limit),
        ).fetchall()
    return [dict(r) for r in rows]


def mark_unfollowed(user_pk: str) -> None:
    """מסמן שביטלנו עקיבה."""
    with _conn() as conn:
        conn.execute(
            "UPDATE ig_follows SET unfollowed=1, unfollowed_at=CURRENT_TIMESTAMP "
            "WHERE user_pk=?",
            (user_pk,),
        )
