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
                posts_published   INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS agent_state (
                key   TEXT PRIMARY KEY,
                value TEXT
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
