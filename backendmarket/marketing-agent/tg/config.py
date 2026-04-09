"""Configuration for the Telegram marketing agent."""

import logging
import os

from dotenv import load_dotenv

_ROOT = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(_ROOT, ".env"))

logger = logging.getLogger(__name__)

# Telethon credentials
_api_id_raw = os.getenv("TELE_API_ID", "0").strip()
TELE_API_ID: int = int(_api_id_raw) if _api_id_raw.isdigit() else 0
TELE_API_HASH: str = os.getenv("TELE_API_HASH", "").strip()
TELE_PHONE: str = os.getenv("TELE_PHONE", "").strip()

# Shared admin bot settings
BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
_admin_raw = os.getenv("ADMIN_ID", "")
ADMIN_ID: int | None = int(_admin_raw) if _admin_raw.isdigit() else None

# Daily limits
MAX_NEW_GROUPS_PER_DAY: int = int(os.getenv("MAX_NEW_GROUPS_PER_DAY", "40"))
DAILY_POST_LIMIT: int = int(os.getenv("DAILY_POST_LIMIT", "36"))
POST_COOLDOWN_DAYS: int = int(os.getenv("POST_COOLDOWN_DAYS", "3"))

# Delays between posts (minutes)
MIN_DELAY_MINUTES: int = int(os.getenv("MIN_DELAY_MINUTES", "5"))
MAX_DELAY_MINUTES: int = int(os.getenv("MAX_DELAY_MINUTES", "15"))

# Active hours (Israel time)
ACTIVE_HOUR_START: int = int(os.getenv("ACTIVE_HOUR_START", "7"))
ACTIVE_HOUR_END: int = int(os.getenv("ACTIVE_HOUR_END", "23"))

# Group size filters
MIN_GROUP_MEMBERS: int = int(os.getenv("MIN_GROUP_MEMBERS", "100"))
MAX_GROUP_MEMBERS: int = int(os.getenv("MAX_GROUP_MEMBERS", "80000"))

# Internal paths
SESSION_NAME: str = "tg_agent"
DB_PATH: str = os.path.join(_ROOT, "tg_agent.db")
TIMEZONE: str = "Asia/Jerusalem"

# Promo video
VIDEO_PATH: str = os.path.join(_ROOT, "assets", "grok-video.mp4")
VIDEO_SEND_CHANCE: float = float(os.getenv("VIDEO_SEND_CHANCE", "0.4"))

# Competitor monitor IDs (comma separated numeric IDs)
CI_COMPETITORS_TG: str = os.getenv("CI_COMPETITORS_TG", "").strip()

if not TELE_API_ID or not TELE_API_HASH or not TELE_PHONE:
    logger.warning("Missing Telethon credentials: TELE_API_ID, TELE_API_HASH, TELE_PHONE")
if not BOT_TOKEN:
    logger.warning("BOT_TOKEN is missing: admin Telegram commands will be disabled")
if not ADMIN_ID:
    logger.warning("ADMIN_ID is missing: admin Telegram commands will be disabled")
