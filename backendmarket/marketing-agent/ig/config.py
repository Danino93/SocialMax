import os
from dotenv import load_dotenv

load_dotenv()
_ROOT = os.path.dirname(os.path.dirname(__file__))

# ─── Instagram credentials (Instagrapi) ───────────────────────────────────────
IG_USERNAME: str = os.getenv("IG_USERNAME", "").strip()
IG_PASSWORD: str = os.getenv("IG_PASSWORD", "").strip()

# ─── Graph API (optional) ─────────────────────────────────────────────────────
IG_ACCESS_TOKEN:        str = os.getenv("IG_ACCESS_TOKEN", "").strip()
IG_BUSINESS_ACCOUNT_ID: str = os.getenv("IG_BUSINESS_ACCOUNT_ID", "").strip()

# ─── Admin bot (same BOT_TOKEN as Telegram agent) ────────────────────────────
BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
_admin_raw = os.getenv("ADMIN_ID", "")
ADMIN_ID: int | None = int(_admin_raw) if _admin_raw.isdigit() else None

# ─── Daily limits ─────────────────────────────────────────────────────────────
DAILY_DM_LIMIT:      int = int(os.getenv("DAILY_DM_LIMIT", "13"))
DAILY_COMMENT_LIMIT: int = int(os.getenv("DAILY_COMMENT_LIMIT", "22"))
DM_COOLDOWN_DAYS:    int = int(os.getenv("DM_COOLDOWN_DAYS", "14"))
COMMENT_COOLDOWN_DAYS: int = int(os.getenv("COMMENT_COOLDOWN_DAYS", "7"))

# ─── Action delays (seconds) ──────────────────────────────────────────────────
MIN_ACTION_DELAY: int = int(os.getenv("MIN_ACTION_DELAY", "90"))
MAX_ACTION_DELAY: int = int(os.getenv("MAX_ACTION_DELAY", "240"))

# ─── Active hours (shared with Telegram agent) ───────────────────────────────
ACTIVE_HOUR_START: int = int(os.getenv("ACTIVE_HOUR_START", "10"))
ACTIVE_HOUR_END:   int = int(os.getenv("ACTIVE_HOUR_END", "21"))

# ─── Content ──────────────────────────────────────────────────────────────────
VIDEO_PATH: str = os.path.join(_ROOT, "assets", "grok-video.mp4")

# ─── Account filters (accounts to engage with) ───────────────────────────────
MIN_ACCOUNT_FOLLOWERS: int = 500
MAX_ACCOUNT_FOLLOWERS: int = 50_000

# ─── Internal ─────────────────────────────────────────────────────────────────
IG_SESSION_FILE = os.path.join(_ROOT, "ig_session.json")
IG_DB_PATH      = os.path.join(_ROOT, "agent_ig.db")
TIMEZONE        = "Asia/Jerusalem"

# ─── Validation ───────────────────────────────────────────────────────────────
if not IG_USERNAME or not IG_PASSWORD:
    print("[WARNING] IG_USERNAME / IG_PASSWORD missing — set them in .env")

if not BOT_TOKEN:
    print("[WARNING] BOT_TOKEN missing — admin commands will not work")

if not ADMIN_ID:
    print("[WARNING] ADMIN_ID missing — admin commands will not work")
