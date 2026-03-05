"""
shop_config.py — הגדרות Customer Bot (SocialSniper Shop)
טוען BOT_TOKEN ו-ADMIN_ID מקובץ .env המשותף לכל ה-Agents
"""
import os
from dotenv import load_dotenv
import logging

# טעינת .env מאותה תיקייה
_ROOT = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(_ROOT, ".env"))

logger = logging.getLogger(__name__)

# ─── Bot credentials (משותף לכל ה-Agents) ────────────────────────────────────
BOT_TOKEN: str     = os.getenv("BOT_TOKEN", "").strip()
_admin_raw         = os.getenv("ADMIN_ID", "").strip()
ADMIN_ID: int | None = int(_admin_raw) if _admin_raw.isdigit() else None

# ─── אימות ────────────────────────────────────────────────────────────────────
if not BOT_TOKEN:
    logger.warning("BOT_TOKEN חסר — הגדר BOT_TOKEN ב-.env (מ-@BotFather)")
if not ADMIN_ID:
    logger.warning("ADMIN_ID חסר — הגדר ADMIN_ID ב-.env (קבל מ-@userinfobot)")
