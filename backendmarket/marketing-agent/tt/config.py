"""
tt_config.py — הגדרות ה-TikTok Agent
טוען את כל המשתנים מקובץ .env הקיים (אותו קובץ לכל ה-Agents)
"""
import os
import logging
from dotenv import load_dotenv

# טעינת .env מאותה תיקייה
_ROOT = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(_ROOT, ".env"))

logger = logging.getLogger(__name__)

# ─── פרטי חשבון TikTok ────────────────────────────────────────────────────────
# ⚠️ חשבון ייעודי נפרד — לא החשבון האישי שלך!
TT_USERNAME: str = os.getenv("TT_USERNAME", "")
TT_PASSWORD: str = os.getenv("TT_PASSWORD", "")

# ─── Admin — פקודות ניהול מטלגרם ──────────────────────────────────────────────
# אותם נתונים כמו שאר ה-Agents — BOT_TOKEN + ADMIN_ID מה-.env
BOT_TOKEN: str  = os.getenv("BOT_TOKEN", "")
ADMIN_ID:  int  = int(os.getenv("ADMIN_ID", "0"))

# ─── לימיטים יומיים ───────────────────────────────────────────────────────────
# ניתן להעלות לאחר שהחשבון מבוסס (שבוע–שבועיים)
DAILY_TT_COMMENT_LIMIT: int = int(os.getenv("DAILY_TT_COMMENT_LIMIT", "23"))
DAILY_TT_FOLLOW_LIMIT:  int = int(os.getenv("DAILY_TT_FOLLOW_LIMIT",  "20"))

# ─── עיכובים בין פעולות (שניות) ──────────────────────────────────────────────
# 5–10 דקות — הכי ארוך מכל הפלטפורמות
TT_MIN_ACTION_DELAY: int = int(os.getenv("TT_MIN_ACTION_DELAY", "300"))
TT_MAX_ACTION_DELAY: int = int(os.getenv("TT_MAX_ACTION_DELAY", "600"))

# ─── שעות פעילות (שעון ישראל) ─────────────────────────────────────────────────
# לא פועלים לפני 9 בבוקר ולא אחרי 21:00
ACTIVE_HOUR_START: int = 9
ACTIVE_HOUR_END:   int = 21

# ─── שעון ─────────────────────────────────────────────────────────────────────
TIMEZONE: str = "Asia/Jerusalem"

# ─── קבצים ────────────────────────────────────────────────────────────────────
# נתיבים לקבצים שנוצרים אוטומטית — כולם מוגדרים ב-.gitignore
TT_COOKIES_FILE: str = os.path.join(_ROOT, "tt_cookies.json")
TT_DB_PATH:      str = os.path.join(_ROOT, "agent_tt.db")

# סרטון לפרסום — assets/grok-video.mp4 (אותו נתיב לכל ה-Agents)
VIDEO_PATH: str = os.path.join(_ROOT, "assets", "grok-video.mp4")

# ─── User-Agent לדפדפן ────────────────────────────────────────────────────────
# Chrome 122 אמיתי — מונע זיהוי כ-bot
TT_USER_AGENT: str = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36"
)

# ─── אימות ────────────────────────────────────────────────────────────────────
# מציג אזהרות אם חסרים פרטי חיבור
if not TT_USERNAME:
    logger.warning("TT_USERNAME לא מוגדר ב-.env — לא ניתן להתחבר לTikTok")
if not TT_PASSWORD:
    logger.warning("TT_PASSWORD לא מוגדר ב-.env — לא ניתן להתחבר לTikTok")
if not BOT_TOKEN:
    logger.warning("BOT_TOKEN לא מוגדר ב-.env — פקודות Admin מושבתות")
