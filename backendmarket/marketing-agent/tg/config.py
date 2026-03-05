"""
tg_config.py — הגדרות Telegram Marketing Agent
טוען את כל המשתנים מקובץ .env הקיים (אותו קובץ לכל ה-Agents)
"""
import os
from dotenv import load_dotenv
import logging

# טעינת .env מאותה תיקייה
_ROOT = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(_ROOT, ".env"))

logger = logging.getLogger(__name__)

# ─── פרטי Telethon (חשבון משתמש ייעודי לפרסום) ───────────────────────────────
# מגיעים מ-https://my.telegram.org → Apps → Create New App
_api_id_raw  = os.getenv("TELE_API_ID", "0").strip()
TELE_API_ID:   int = int(_api_id_raw) if _api_id_raw.isdigit() else 0
TELE_API_HASH: str = os.getenv("TELE_API_HASH", "").strip()
TELE_PHONE:    str = os.getenv("TELE_PHONE", "").strip()

# ─── Admin — פקודות ניהול מטלגרם ──────────────────────────────────────────────
# BOT_TOKEN ו-ADMIN_ID משותפים לכל ה-Agents — מוגדרים פעם אחת ב-.env
BOT_TOKEN: str     = os.getenv("BOT_TOKEN", "")
_admin_raw         = os.getenv("ADMIN_ID", "")
ADMIN_ID:  int | None = int(_admin_raw) if _admin_raw.isdigit() else None

# ─── לימיטים יומיים ───────────────────────────────────────────────────────────
# Agent מחפש קבוצות כל בוקר ומפרסם 3 פעמים ביום
MAX_NEW_GROUPS_PER_DAY: int = int(os.getenv("MAX_NEW_GROUPS_PER_DAY", "5"))
DAILY_POST_LIMIT:       int = int(os.getenv("DAILY_POST_LIMIT", "8"))
POST_COOLDOWN_DAYS:     int = int(os.getenv("POST_COOLDOWN_DAYS", "7"))

# ─── עיכובים בין פרסומים (דקות) ──────────────────────────────────────────────
# רנדומלי = נראה כמו בן אדם, לא בוט
MIN_DELAY_MINUTES: int = int(os.getenv("MIN_DELAY_MINUTES", "25"))
MAX_DELAY_MINUTES: int = int(os.getenv("MAX_DELAY_MINUTES", "55"))

# ─── שעות פעילות (שעון ישראל) ─────────────────────────────────────────────────
# לא שולחים לפני 10 ולא אחרי 21:00
ACTIVE_HOUR_START: int = int(os.getenv("ACTIVE_HOUR_START", "10"))
ACTIVE_HOUR_END:   int = int(os.getenv("ACTIVE_HOUR_END",   "21"))

# ─── סינון קבוצות לפי גודל ────────────────────────────────────────────────────
# קבוצות קטנות מדי — לא שווה; גדולות מדי — יותר מדי רעש
MIN_GROUP_MEMBERS: int = int(os.getenv("MIN_GROUP_MEMBERS", "150"))
MAX_GROUP_MEMBERS: int = int(os.getenv("MAX_GROUP_MEMBERS", "50000"))

# ─── קבצים פנימיים ────────────────────────────────────────────────────────────
# SESSION_NAME → יוצר tg_agent.session (מוגדר ב-.gitignore כ-*.session)
SESSION_NAME: str = "tg_agent"
DB_PATH:      str = os.path.join(_ROOT, "tg_agent.db")
TIMEZONE:     str = "Asia/Jerusalem"

# ─── סרטון תדמית ─────────────────────────────────────────────────────────────
# הנתיב לסרטון שמצטרף לחלק מההודעות (40% מהפרסומים)
VIDEO_PATH:       str   = os.path.join(_ROOT, "assets", "grok-video.mp4")
VIDEO_SEND_CHANCE: float = float(os.getenv("VIDEO_SEND_CHANCE", "0.4"))

# ─── אימות ────────────────────────────────────────────────────────────────────
if not TELE_API_ID or not TELE_API_HASH or not TELE_PHONE:
    logger.warning("פרטי Telethon חסרים — הגדר TELE_API_ID, TELE_API_HASH, TELE_PHONE ב-.env")
if not BOT_TOKEN:
    logger.warning("BOT_TOKEN חסר — פקודות Admin יושבתו")
if not ADMIN_ID:
    logger.warning("ADMIN_ID חסר — פקודות Admin יושבתו")
