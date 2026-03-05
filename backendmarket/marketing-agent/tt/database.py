"""
tt_database.py — מסד הנתונים של TikTok Agent
SQLite — נוצר אוטומטית על השרת, אין צורך בהגדרה חיצונית.
קובץ: agent_tt.db (מוגדר ב-.gitignore)
"""
import sqlite3
import logging
from datetime import date, datetime, timedelta
from .config import TT_DB_PATH

logger = logging.getLogger(__name__)


# ─── חיבור לDB ────────────────────────────────────────────────────────────────

def _get_conn() -> sqlite3.Connection:
    """מחזיר חיבור לDB עם dict-like rows."""
    conn = sqlite3.connect(TT_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ─── יצירת טבלאות ─────────────────────────────────────────────────────────────

def init_db() -> None:
    """יוצר את כל הטבלאות אם עדיין לא קיימות."""
    with _get_conn() as conn:
        conn.executescript("""
        -- וידאוים שאיתרנו בהאשטגים (מטרות לתגובות)
        CREATE TABLE IF NOT EXISTS videos (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            video_id        TEXT UNIQUE NOT NULL,
            author_username TEXT,
            hashtag         TEXT,
            found_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            commented_at    TIMESTAMP,
            comment_count   INTEGER DEFAULT 0
        );

        -- משתמשים שנמצאו (מטרות לעקיבה)
        CREATE TABLE IF NOT EXISTS users (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            username        TEXT UNIQUE NOT NULL,
            follower_count  INTEGER,
            found_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            followed_at     TIMESTAMP,
            is_followed     INTEGER DEFAULT 0
        );

        -- תגובות שהשארנו
        CREATE TABLE IF NOT EXISTS comments (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            video_id    TEXT NOT NULL,
            template_id INTEGER NOT NULL,
            sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status      TEXT DEFAULT 'sent'
        );

        -- עקיבות שביצענו
        CREATE TABLE IF NOT EXISTS follows (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            username    TEXT NOT NULL,
            followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status      TEXT DEFAULT 'sent'
        );

        -- וידאוים שהעלנו לחשבון שלנו
        CREATE TABLE IF NOT EXISTS our_videos (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            caption_id  INTEGER NOT NULL,
            posted_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status      TEXT DEFAULT 'sent',
            video_url   TEXT
        );

        -- סטטיסטיקות יומיות
        CREATE TABLE IF NOT EXISTS daily_stats (
            date             TEXT PRIMARY KEY,
            videos_found     INTEGER DEFAULT 0,
            users_found      INTEGER DEFAULT 0,
            comments_sent    INTEGER DEFAULT 0,
            comments_failed  INTEGER DEFAULT 0,
            follows_sent     INTEGER DEFAULT 0,
            follows_failed   INTEGER DEFAULT 0,
            videos_posted    INTEGER DEFAULT 0
        );

        -- מצב Agent (pause/resume וערכים גלובליים)
        CREATE TABLE IF NOT EXISTS agent_state (
            key   TEXT PRIMARY KEY,
            value TEXT
        );
        """)
    logger.info("TikTok DB מוכן: %s", TT_DB_PATH)


# ─── וידאוים ───────────────────────────────────────────────────────────────────

def log_video(video_id: str, author_username: str, hashtag: str) -> bool:
    """שומר וידאו חדש ב-DB. מחזיר True אם הוסף, False אם כבר קיים."""
    try:
        with _get_conn() as conn:
            conn.execute(
                "INSERT OR IGNORE INTO videos (video_id, author_username, hashtag) VALUES (?, ?, ?)",
                (video_id, author_username, hashtag),
            )
            return conn.execute(
                "SELECT changes()"
            ).fetchone()[0] > 0
    except sqlite3.Error as e:
        logger.error("log_video שגיאה: %s", e)
        return False


def already_commented(video_id: str) -> bool:
    """האם כבר הגבנו על הוידאו הזה?"""
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM videos WHERE video_id = ? AND commented_at IS NOT NULL",
            (video_id,),
        ).fetchone()
        return row is not None


def mark_comment_sent(video_id: str, template_id: int, status: str = "sent") -> None:
    """מסמן וידאו כ'הגבנו עליו' ומוסיף רשומה לטבלת comments."""
    with _get_conn() as conn:
        conn.execute(
            "UPDATE videos SET commented_at = CURRENT_TIMESTAMP WHERE video_id = ?",
            (video_id,),
        )
        conn.execute(
            "INSERT INTO comments (video_id, template_id, status) VALUES (?, ?, ?)",
            (video_id, template_id, status),
        )


def get_uncontacted_videos(limit: int = 20) -> list[dict]:
    """מחזיר וידאוים שעוד לא הגבנו עליהם."""
    with _get_conn() as conn:
        rows = conn.execute(
            """SELECT video_id, author_username, hashtag
               FROM videos
               WHERE commented_at IS NULL
               ORDER BY found_at ASC
               LIMIT ?""",
            (limit,),
        ).fetchall()
        return [dict(r) for r in rows]


# ─── משתמשים ───────────────────────────────────────────────────────────────────

def log_user(username: str, follower_count: int = 0) -> bool:
    """שומר משתמש חדש ב-DB. מחזיר True אם הוסף."""
    try:
        with _get_conn() as conn:
            conn.execute(
                "INSERT OR IGNORE INTO users (username, follower_count) VALUES (?, ?)",
                (username, follower_count),
            )
            return conn.execute("SELECT changes()").fetchone()[0] > 0
    except sqlite3.Error as e:
        logger.error("log_user שגיאה: %s", e)
        return False


def already_followed(username: str) -> bool:
    """האם כבר עקבנו אחרי המשתמש הזה?"""
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT 1 FROM users WHERE username = ? AND is_followed = 1",
            (username,),
        ).fetchone()
        return row is not None


def mark_followed(username: str, status: str = "sent") -> None:
    """מסמן משתמש כ'עקבנו אחריו'."""
    with _get_conn() as conn:
        conn.execute(
            "UPDATE users SET is_followed = 1, followed_at = CURRENT_TIMESTAMP WHERE username = ?",
            (username,),
        )
        conn.execute(
            "INSERT INTO follows (username, status) VALUES (?, ?)",
            (username, status),
        )


def get_unfollowed_users(limit: int = 25) -> list[dict]:
    """מחזיר משתמשים שעוד לא עקבנו אחריהם."""
    with _get_conn() as conn:
        rows = conn.execute(
            """SELECT username, follower_count
               FROM users
               WHERE is_followed = 0
               ORDER BY found_at ASC
               LIMIT ?""",
            (limit,),
        ).fetchall()
        return [dict(r) for r in rows]


# ─── הוידאוים שלנו ────────────────────────────────────────────────────────────

def log_our_video(caption_id: int, status: str = "sent", video_url: str = "") -> None:
    """מתעד וידאו שהעלנו לחשבון שלנו."""
    with _get_conn() as conn:
        conn.execute(
            "INSERT INTO our_videos (caption_id, status, video_url) VALUES (?, ?, ?)",
            (caption_id, status, video_url),
        )


def get_videos_posted_today() -> int:
    """כמה וידאוים העלנו היום?"""
    today = date.today().isoformat()
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT COUNT(*) FROM our_videos WHERE date(posted_at) = ? AND status = 'sent'",
            (today,),
        ).fetchone()
        return row[0] if row else 0


# ─── סטטיסטיקות ───────────────────────────────────────────────────────────────

def _ensure_today_stats() -> None:
    """מוודא שיש שורה לתאריך היום בטבלת daily_stats."""
    today = date.today().isoformat()
    with _get_conn() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO daily_stats (date) VALUES (?)",
            (today,),
        )


def increment_stat(column: str, amount: int = 1) -> None:
    """מגדיל עמודת סטטיסטיקה ביומי."""
    _ensure_today_stats()
    today = date.today().isoformat()
    with _get_conn() as conn:
        conn.execute(
            f"UPDATE daily_stats SET {column} = {column} + ? WHERE date = ?",
            (amount, today),
        )


def get_today_stats() -> dict:
    """מחזיר סטטיסטיקות של היום."""
    _ensure_today_stats()
    today = date.today().isoformat()
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT * FROM daily_stats WHERE date = ?",
            (today,),
        ).fetchone()
        return dict(row) if row else {}


def get_total_videos() -> int:
    """כמה וידאוים שמורים ב-DB בסך הכל?"""
    with _get_conn() as conn:
        row = conn.execute("SELECT COUNT(*) FROM videos").fetchone()
        return row[0] if row else 0


def get_total_users() -> int:
    """כמה משתמשים שמורים ב-DB בסך הכל?"""
    with _get_conn() as conn:
        row = conn.execute("SELECT COUNT(*) FROM users").fetchone()
        return row[0] if row else 0


# ─── מצב Agent ────────────────────────────────────────────────────────────────

def is_paused() -> bool:
    """האם ה-Agent מושהה?"""
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT value FROM agent_state WHERE key = 'paused'",
        ).fetchone()
        return row is not None and row["value"] == "1"


def set_paused(paused: bool) -> None:
    """מגדיר את מצב ה-pause של ה-Agent."""
    with _get_conn() as conn:
        conn.execute(
            "INSERT OR REPLACE INTO agent_state (key, value) VALUES ('paused', ?)",
            ("1" if paused else "0",),
        )
