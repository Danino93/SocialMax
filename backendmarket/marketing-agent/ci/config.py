"""
ci/config.py — הגדרות Competitor Infiltrator Agent
טוען משתנים מ-.env
"""
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Telegram credentials (Telethon) ──────────────────────────────────────────
TELE_API_ID:   str = os.getenv("TELE_API_ID", "")
TELE_API_HASH: str = os.getenv("TELE_API_HASH", "")
TELE_PHONE:    str = os.getenv("TELE_PHONE", "")

# ─── Instagram credentials (Instagrapi) ───────────────────────────────────────
IG_USERNAME: str = os.getenv("IG_USERNAME", "")
IG_PASSWORD: str = os.getenv("IG_PASSWORD", "")
IG_SESSION_FILE: str = "ci_ig_session.json"  # session נפרד מAI agent

# ─── Admin bot ────────────────────────────────────────────────────────────────
BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
ADMIN_ID:  int = int(os.getenv("ADMIN_ID", "0") or 0)

# ─── מתחרים לניטור ────────────────────────────────────────────────────────────
# ערכים מופרדים בפסיק
_CI_TG_RAW = os.getenv("CI_COMPETITORS_TG", "")
_CI_IG_RAW = os.getenv("CI_COMPETITORS_IG", "")

CI_COMPETITORS_TG: list[str] = [
    c.strip().lstrip("@") for c in _CI_TG_RAW.split(",") if c.strip()
]
CI_COMPETITORS_IG: list[str] = [
    c.strip() for c in _CI_IG_RAW.split(",") if c.strip()
]

# ─── לימיטים ──────────────────────────────────────────────────────────────────
DAILY_CI_DM_LIMIT:      int = int(os.getenv("DAILY_CI_DM_LIMIT", "8"))
CI_SCAN_INTERVAL_HOURS: int = int(os.getenv("CI_SCAN_INTERVAL_HOURS", "3"))

# ─── הגדרות נוספות ────────────────────────────────────────────────────────────
TIMEZONE: str = "Asia/Jerusalem"
CI_SESSION_NAME: str = "ci_agent"   # שם session Telethon

# ─── Validation ───────────────────────────────────────────────────────────────

def validate_config() -> list[str]:
    """בודק הגדרות חובה ומחזיר רשימת שגיאות. רשימה ריקה = הכל תקין."""
    errors = []
    if not BOT_TOKEN:
        errors.append("BOT_TOKEN חסר ב-.env")
    if not ADMIN_ID:
        errors.append("ADMIN_ID חסר ב-.env")
    if not CI_COMPETITORS_TG and not CI_COMPETITORS_IG:
        errors.append(
            "CI_COMPETITORS_TG ו/או CI_COMPETITORS_IG חסרים — "
            "הוסף לפחות מתחרה אחד ב-.env"
        )
    if CI_COMPETITORS_TG and not (TELE_API_ID and TELE_API_HASH and TELE_PHONE):
        errors.append(
            "CI_COMPETITORS_TG הוגדר אך TELE_API_ID / TELE_API_HASH / TELE_PHONE חסרים"
        )
    if CI_COMPETITORS_IG and not (IG_USERNAME and IG_PASSWORD):
        errors.append(
            "CI_COMPETITORS_IG הוגדר אך IG_USERNAME / IG_PASSWORD חסרים"
        )
    return errors
