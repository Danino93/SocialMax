import sqlite3
import logging
from datetime import date
from .config import FB_DB_PATH

logger = logging.getLogger(__name__)


def _conn() -> sqlite3.Connection:
    conn = sqlite3.connect(FB_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create all Facebook agent tables if they don't exist."""
    with _conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS groups (
                id               INTEGER PRIMARY KEY AUTOINCREMENT,
                fb_group_id      TEXT UNIQUE NOT NULL,
                name             TEXT,
                member_count     INTEGER,
                found_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_posted_at   TIMESTAMP,
                post_count       INTEGER DEFAULT 0,
                last_template_id INTEGER DEFAULT -1,
                is_active        INTEGER DEFAULT 1
            );

            CREATE TABLE IF NOT EXISTS group_posts (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                fb_group_id TEXT NOT NULL,
                template_id INTEGER NOT NULL,
                posted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status      TEXT DEFAULT 'sent'
            );

            CREATE TABLE IF NOT EXISTS comments (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                fb_group_id TEXT,
                post_url    TEXT NOT NULL,
                template_id INTEGER NOT NULL,
                sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status      TEXT DEFAULT 'sent'
            );

            CREATE TABLE IF NOT EXISTS dms (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                profile_url TEXT NOT NULL,
                template_id INTEGER NOT NULL,
                sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status      TEXT DEFAULT 'sent'
            );

            CREATE TABLE IF NOT EXISTS page_posts (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                post_type   TEXT NOT NULL,
                template_id INTEGER NOT NULL,
                posted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status      TEXT DEFAULT 'sent',
                fb_post_id  TEXT
            );

            CREATE TABLE IF NOT EXISTS daily_stats (
                date                TEXT PRIMARY KEY,
                groups_found        INTEGER DEFAULT 0,
                group_posts_sent    INTEGER DEFAULT 0,
                group_posts_failed  INTEGER DEFAULT 0,
                comments_sent       INTEGER DEFAULT 0,
                comments_failed     INTEGER DEFAULT 0,
                dms_sent            INTEGER DEFAULT 0,
                dms_failed          INTEGER DEFAULT 0,
                page_posts          INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS agent_state (
                key   TEXT PRIMARY KEY,
                value TEXT
            );
        """)
    logger.info("Facebook DB initialised at %s", FB_DB_PATH)


# ─── Group management ─────────────────────────────────────────────────────────

def log_fb_group(fb_group_id: str, name: str, member_count: int) -> bool:
    """Insert a discovered group. Returns True if new."""
    try:
        with _conn() as conn:
            conn.execute(
                """INSERT OR IGNORE INTO groups (fb_group_id, name, member_count)
                   VALUES (?, ?, ?)""",
                (fb_group_id, name, member_count),
            )
            return conn.total_changes > 0
    except Exception as e:
        logger.error("log_fb_group error: %s", e)
        return False


def get_eligible_groups(cooldown_days: int, limit: int) -> list[dict]:
    """Groups not posted to in cooldown_days days."""
    with _conn() as conn:
        rows = conn.execute(
            """SELECT fb_group_id, name, member_count, last_template_id
               FROM groups
               WHERE is_active = 1
                 AND (last_posted_at IS NULL
                      OR julianday('now') - julianday(last_posted_at) >= ?)
               ORDER BY found_at DESC
               LIMIT ?""",
            (cooldown_days, limit),
        ).fetchall()
    return [dict(r) for r in rows]


def mark_group_posted(fb_group_id: str, template_id: int, status: str = "sent") -> None:
    with _conn() as conn:
        conn.execute(
            """INSERT INTO group_posts (fb_group_id, template_id, status)
               VALUES (?, ?, ?)""",
            (fb_group_id, template_id, status),
        )
        if status == "sent":
            conn.execute(
                """UPDATE groups
                   SET last_posted_at = CURRENT_TIMESTAMP,
                       post_count = post_count + 1,
                       last_template_id = ?
                   WHERE fb_group_id = ?""",
                (template_id, fb_group_id),
            )


def deactivate_group(fb_group_id: str) -> None:
    with _conn() as conn:
        conn.execute(
            "UPDATE groups SET is_active = 0 WHERE fb_group_id = ?", (fb_group_id,)
        )


def get_total_groups() -> int:
    with _conn() as conn:
        row = conn.execute("SELECT COUNT(*) FROM groups WHERE is_active = 1").fetchone()
    return row[0] if row else 0


# ─── Comments ─────────────────────────────────────────────────────────────────

def already_commented(post_url: str) -> bool:
    with _conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM comments WHERE post_url = ? AND status = 'sent'",
            (post_url,),
        ).fetchone()
    return row is not None


def mark_comment_sent(
    post_url: str, template_id: int, fb_group_id: str = "", status: str = "sent"
) -> None:
    with _conn() as conn:
        conn.execute(
            """INSERT INTO comments (fb_group_id, post_url, template_id, status)
               VALUES (?, ?, ?, ?)""",
            (fb_group_id, post_url, template_id, status),
        )


# ─── DMs ──────────────────────────────────────────────────────────────────────

def already_dmed(profile_url: str, cooldown_days: int) -> bool:
    with _conn() as conn:
        row = conn.execute(
            """SELECT 1 FROM dms
               WHERE profile_url = ?
                 AND status = 'sent'
                 AND julianday('now') - julianday(sent_at) < ?""",
            (profile_url, cooldown_days),
        ).fetchone()
    return row is not None


def mark_dm_sent(profile_url: str, template_id: int, status: str = "sent") -> None:
    with _conn() as conn:
        conn.execute(
            "INSERT INTO dms (profile_url, template_id, status) VALUES (?, ?, ?)",
            (profile_url, template_id, status),
        )


# ─── Page posts ───────────────────────────────────────────────────────────────

def log_page_post(
    post_type: str, template_id: int, status: str, fb_post_id: str = ""
) -> None:
    with _conn() as conn:
        conn.execute(
            """INSERT INTO page_posts (post_type, template_id, status, fb_post_id)
               VALUES (?, ?, ?, ?)""",
            (post_type, template_id, status, fb_post_id),
        )


def get_page_posts_today() -> int:
    today = date.today().isoformat()
    with _conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM page_posts WHERE date(posted_at) = ? AND status = 'sent'",
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
            "groups_found": 0, "group_posts_sent": 0, "group_posts_failed": 0,
            "comments_sent": 0, "comments_failed": 0,
            "dms_sent": 0, "dms_failed": 0, "page_posts": 0,
        }
    return dict(row)


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
