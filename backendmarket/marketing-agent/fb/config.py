import os
from dotenv import load_dotenv

load_dotenv()
_ROOT = os.path.dirname(os.path.dirname(__file__))

# ─── Facebook credentials (Playwright browser) ───────────────────────────────
FB_EMAIL:    str = os.getenv("FB_EMAIL", "").strip()
FB_PASSWORD: str = os.getenv("FB_PASSWORD", "").strip()

# ─── Graph API (Page management) ─────────────────────────────────────────────
FB_PAGE_ACCESS_TOKEN: str = os.getenv("FB_PAGE_ACCESS_TOKEN", "").strip()
FB_PAGE_ID:           str = os.getenv("FB_PAGE_ID", "").strip()

# ─── Admin bot (same BOT_TOKEN as Telegram agent) ────────────────────────────
BOT_TOKEN: str = os.getenv("BOT_TOKEN", "")
_admin_raw = os.getenv("ADMIN_ID", "")
ADMIN_ID: int | None = int(_admin_raw) if _admin_raw.isdigit() else None

# ─── Daily limits ─────────────────────────────────────────────────────────────
DAILY_FB_GROUP_POST_LIMIT: int = int(os.getenv("DAILY_FB_GROUP_POST_LIMIT", "3"))
DAILY_FB_COMMENT_LIMIT:    int = int(os.getenv("DAILY_FB_COMMENT_LIMIT", "8"))
DAILY_FB_DM_LIMIT:         int = int(os.getenv("DAILY_FB_DM_LIMIT", "5"))
FB_GROUP_COOLDOWN_DAYS:    int = int(os.getenv("FB_GROUP_COOLDOWN_DAYS", "14"))
FB_DM_COOLDOWN_DAYS:       int = int(os.getenv("FB_DM_COOLDOWN_DAYS", "30"))

# ─── Action delays (seconds) ──────────────────────────────────────────────────
FB_MIN_ACTION_DELAY: int = int(os.getenv("FB_MIN_ACTION_DELAY", "180"))
FB_MAX_ACTION_DELAY: int = int(os.getenv("FB_MAX_ACTION_DELAY", "420"))

# ─── Active hours (shared with Telegram agent) ───────────────────────────────
ACTIVE_HOUR_START: int = int(os.getenv("ACTIVE_HOUR_START", "10"))
ACTIVE_HOUR_END:   int = int(os.getenv("ACTIVE_HOUR_END", "21"))

# ─── Content ──────────────────────────────────────────────────────────────────
VIDEO_PATH: str = os.path.join(_ROOT, "assets", "grok-video.mp4")

# ─── Internal ─────────────────────────────────────────────────────────────────
FB_COOKIES_FILE = os.path.join(_ROOT, "fb_cookies.json")
FB_DB_PATH      = os.path.join(_ROOT, "agent_fb.db")
TIMEZONE        = "Asia/Jerusalem"
GRAPH_API_BASE  = "https://graph.facebook.com/v18.0"

# ─── Validation ───────────────────────────────────────────────────────────────
if not FB_EMAIL or not FB_PASSWORD:
    print("[WARNING] FB_EMAIL / FB_PASSWORD missing — Playwright sessions will fail")

if not BOT_TOKEN:
    print("[WARNING] BOT_TOKEN missing — admin commands will not work")

if not ADMIN_ID:
    print("[WARNING] ADMIN_ID missing — admin commands will not work")
