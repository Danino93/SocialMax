"""
shop_database.py — Customer Bot SQLite database
================================================
Tables:
  users        — tracks returning customers (visit_count, first_seen)
  flash_sales  — active FOMO promotions with expiry
  review_queue — scheduled review requests sent 24h after order intent

DB file: agent_shop.db (root of marketing-agent/, in .gitignore)
"""
import os
import sqlite3
import logging
from datetime import datetime, timedelta

_ROOT = os.path.dirname(os.path.dirname(__file__))
SHOP_DB_PATH = os.path.join(_ROOT, "agent_shop.db")

logger = logging.getLogger(__name__)


def _get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(SHOP_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Create all tables if they don't exist yet."""
    conn = _get_conn()
    conn.executescript("""
        -- Returning customer tracking
        CREATE TABLE IF NOT EXISTS users (
            user_id     INTEGER PRIMARY KEY,
            username    TEXT,
            first_name  TEXT,
            first_seen  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            visit_count INTEGER   DEFAULT 1
        );

        -- Flash sale / FOMO promotions (only 1 active at a time)
        CREATE TABLE IF NOT EXISTS flash_sales (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            text       TEXT      NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Review follow-up queue (sent 24h after order intent)
        CREATE TABLE IF NOT EXISTS review_queue (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id       INTEGER   NOT NULL,
            chat_id       INTEGER   NOT NULL,
            platform      TEXT      NOT NULL,
            scheduled_for TIMESTAMP NOT NULL,
            sent          INTEGER   DEFAULT 0
        );
    """)
    conn.commit()
    conn.close()
    logger.info("Shop DB initialized: %s", SHOP_DB_PATH)


# ─── Users ─────────────────────────────────────────────────────────────────────

def upsert_user(user_id: int, username: str | None, first_name: str) -> tuple[bool, int]:
    """
    Register or update a user.
    Returns (is_new_user, visit_count).
    """
    conn = _get_conn()
    try:
        existing = conn.execute(
            "SELECT visit_count FROM users WHERE user_id = ?", (user_id,)
        ).fetchone()

        if existing is None:
            conn.execute(
                "INSERT INTO users (user_id, username, first_name) VALUES (?, ?, ?)",
                (user_id, username or "", first_name),
            )
            conn.commit()
            return True, 1
        else:
            new_count = existing["visit_count"] + 1
            conn.execute(
                """UPDATE users
                   SET visit_count = ?, username = ?, first_name = ?
                   WHERE user_id = ?""",
                (new_count, username or "", first_name, user_id),
            )
            conn.commit()
            return False, new_count
    finally:
        conn.close()


def get_total_users() -> int:
    """Total unique users who have used the bot."""
    conn = _get_conn()
    result = conn.execute("SELECT COUNT(*) FROM users").fetchone()
    conn.close()
    return result[0]


def get_new_users_today() -> int:
    """Users who started the bot today."""
    conn = _get_conn()
    result = conn.execute(
        "SELECT COUNT(*) FROM users WHERE date(first_seen) = date('now')"
    ).fetchone()
    conn.close()
    return result[0]


# ─── Flash Sales ───────────────────────────────────────────────────────────────

def set_sale(text: str, hours: float) -> None:
    """
    Store a new flash sale, replacing any existing one.
    Expires `hours` hours from now (UTC).
    """
    conn = _get_conn()
    expires_at = (datetime.utcnow() + timedelta(hours=hours)).isoformat(timespec="seconds")
    conn.execute("DELETE FROM flash_sales")
    conn.execute(
        "INSERT INTO flash_sales (text, expires_at) VALUES (?, ?)",
        (text, expires_at),
    )
    conn.commit()
    conn.close()
    logger.info("Flash sale set: '%s' expires at %s", text, expires_at)


def get_active_sale() -> dict | None:
    """
    Return the current active flash sale or None.
    Returns dict with keys: text, minutes_left.
    """
    conn = _get_conn()
    try:
        row = conn.execute(
            """SELECT * FROM flash_sales
               WHERE expires_at > datetime('now')
               ORDER BY id DESC LIMIT 1"""
        ).fetchone()
        if not row:
            return None
        expires_at = datetime.fromisoformat(row["expires_at"])
        delta = expires_at - datetime.utcnow()
        minutes_left = max(1, int(delta.total_seconds() / 60))
        return {"text": row["text"], "minutes_left": minutes_left}
    finally:
        conn.close()


def clear_sale() -> None:
    """Remove all active flash sales."""
    conn = _get_conn()
    conn.execute("DELETE FROM flash_sales")
    conn.commit()
    conn.close()


# ─── Review Queue ──────────────────────────────────────────────────────────────

def add_review_request(user_id: int, chat_id: int, platform: str) -> None:
    """
    Schedule a review request to be sent 24 hours from now.
    """
    conn = _get_conn()
    scheduled_for = (datetime.utcnow() + timedelta(hours=24)).isoformat(timespec="seconds")
    conn.execute(
        """INSERT INTO review_queue (user_id, chat_id, platform, scheduled_for)
           VALUES (?, ?, ?, ?)""",
        (user_id, chat_id, platform, scheduled_for),
    )
    conn.commit()
    conn.close()


def get_pending_reviews() -> list[dict]:
    """
    Return review requests that are due (scheduled_for <= now) and not yet sent.
    """
    conn = _get_conn()
    try:
        rows = conn.execute(
            """SELECT * FROM review_queue
               WHERE sent = 0
                 AND scheduled_for <= datetime('now')
               ORDER BY scheduled_for ASC
               LIMIT 20"""
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def mark_review_sent(review_id: int) -> None:
    """Mark a review request as sent so it doesn't get re-sent."""
    conn = _get_conn()
    conn.execute("UPDATE review_queue SET sent = 1 WHERE id = ?", (review_id,))
    conn.commit()
    conn.close()
