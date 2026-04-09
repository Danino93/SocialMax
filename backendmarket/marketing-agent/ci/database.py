"""
ci/database.py — SQLite database for Competitor Infiltrator Agent
קובץ: ci_agent.db

טבלאות:
  targets   — מטרות שזוהו (מתלוננים מפוסטים/תגובות של מתחרים)
  ci_stats  — סטטיסטיקות יומיות
  ci_state  — state כללי (pause/resume, מועד סריקה אחרונה)
"""
import logging
import sqlite3
from datetime import date, datetime

logger = logging.getLogger(__name__)

DB_PATH = "ci_agent.db"


def _get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db() -> None:
    """יוצר את הטבלאות אם לא קיימות."""
    with _get_conn() as conn:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS targets (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id         TEXT NOT NULL,
            platform        TEXT NOT NULL,          -- telegram / instagram
            complaint_text  TEXT NOT NULL,
            source_channel  TEXT NOT NULL,          -- channel / username של המתחרה
            discovered_at   TEXT NOT NULL,          -- ISO datetime
            dm_sent         INTEGER DEFAULT 0,      -- 0/1
            dm_sent_at      TEXT,                   -- ISO datetime
            response_received INTEGER DEFAULT 0,   -- 0/1 (אם ענה לDM)
            UNIQUE(user_id, platform)               -- לא לשלוח לאותו user פעמיים
        );

        CREATE TABLE IF NOT EXISTS ci_stats (
            stat_date   TEXT PRIMARY KEY,           -- YYYY-MM-DD
            found       INTEGER DEFAULT 0,
            dms_sent    INTEGER DEFAULT 0,
            responses   INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS ci_state (
            key     TEXT PRIMARY KEY,
            value   TEXT NOT NULL
        );

        INSERT OR IGNORE INTO ci_state (key, value) VALUES ('paused', 'false');
        INSERT OR IGNORE INTO ci_state (key, value) VALUES ('last_scan', '');
        """)
    logger.info("[CI-DB] Database initialized: %s", DB_PATH)


# ─── Targets ──────────────────────────────────────────────────────────────────

def add_target(
    user_id: str,
    platform: str,
    complaint_text: str,
    source_channel: str,
) -> bool:
    """
    מוסיף מטרה חדשה לDB.
    מחזיר True אם נוספה (חדשה), False אם כבר קיימת.
    """
    now = datetime.utcnow().isoformat()
    is_new = False
    try:
        with _get_conn() as conn:
            conn.execute(
                """
                INSERT OR IGNORE INTO targets
                    (user_id, platform, complaint_text, source_channel, discovered_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (str(user_id), platform, complaint_text[:500], source_channel, now),
            )
            is_new = conn.total_changes > 0
        # _increment_stat AFTER closing the write connection (fixes Windows lock)
        if is_new:
            _increment_stat("found")
            logger.info(
                "[CI-DB] New target: %s on %s (from %s)",
                user_id, platform, source_channel
            )
    except Exception as e:
        logger.error("[CI-DB] add_target error: %s", e)
    return is_new


def get_pending_targets(limit: int = 20) -> list[dict]:
    """מחזיר מטרות שטרם קיבלו DM, לפי סדר גילוי."""
    with _get_conn() as conn:
        rows = conn.execute(
            """
            SELECT * FROM targets
            WHERE dm_sent = 0
            ORDER BY discovered_at ASC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]


def mark_sent(target_id: int) -> None:
    """מסמן target כDM נשלח."""
    now = datetime.utcnow().isoformat()
    with _get_conn() as conn:
        conn.execute(
            "UPDATE targets SET dm_sent = 1, dm_sent_at = ? WHERE id = ?",
            (now, target_id),
        )
    _increment_stat("dms_sent")


def mark_response(target_id: int) -> None:
    """מסמן target כענה לDM."""
    with _get_conn() as conn:
        conn.execute(
            "UPDATE targets SET response_received = 1 WHERE id = ?",
            (target_id,),
        )
    _increment_stat("responses")


def get_all_targets(limit: int = 100) -> list[dict]:
    """מחזיר כל ה-targets (לadmin)."""
    with _get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM targets ORDER BY discovered_at DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(r) for r in rows]


# ─── Stats ────────────────────────────────────────────────────────────────────

def _increment_stat(field: str, amount: int = 1) -> None:
    today = date.today().isoformat()
    with _get_conn() as conn:
        conn.execute(
            f"""
            INSERT INTO ci_stats (stat_date, {field})
            VALUES (?, ?)
            ON CONFLICT(stat_date) DO UPDATE SET {field} = {field} + ?
            """,
            (today, amount, amount),
        )


def get_today_stats() -> dict:
    today = date.today().isoformat()
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT * FROM ci_stats WHERE stat_date = ?", (today,)
        ).fetchone()
    if row:
        return dict(row)
    return {"stat_date": today, "found": 0, "dms_sent": 0, "responses": 0}


def get_stats_last_7_days() -> list[dict]:
    with _get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM ci_stats ORDER BY stat_date DESC LIMIT 7"
        ).fetchall()
    return [dict(r) for r in rows]


def get_dms_sent_today() -> int:
    return get_today_stats().get("dms_sent", 0)


# ─── State (pause / resume) ───────────────────────────────────────────────────

def is_paused() -> bool:
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT value FROM ci_state WHERE key = 'paused'"
        ).fetchone()
    return row and row["value"] == "true"


def set_paused(paused: bool) -> None:
    with _get_conn() as conn:
        conn.execute(
            "UPDATE ci_state SET value = ? WHERE key = 'paused'",
            ("true" if paused else "false",),
        )


def get_last_scan() -> str:
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT value FROM ci_state WHERE key = 'last_scan'"
        ).fetchone()
    return row["value"] if row else ""


def set_last_scan(dt: str) -> None:
    with _get_conn() as conn:
        conn.execute(
            "UPDATE ci_state SET value = ? WHERE key = 'last_scan'",
            (dt,),
        )
