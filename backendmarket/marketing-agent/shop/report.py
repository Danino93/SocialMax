"""
shop_report.py — Daily report image generator using Pillow
===========================================================
Generates a dark-themed 700×380px PNG card with today's stats for all 4 agents.
Sent to Admin every morning at 09:00 (Israel time) via shop/main.py JobQueue.

Font strategy:
  1. Try assets/NotoSansHebrew-Regular.ttf (Hebrew, if downloaded)
  2. Fallback to ImageFont.load_default() (ASCII-safe layout)
"""
import os
import io
import logging
from datetime import datetime

try:
    from PIL import Image, ImageDraw, ImageFont  # type: ignore
    _PIL_AVAILABLE = True
except ImportError:
    _PIL_AVAILABLE = False

logger = logging.getLogger(__name__)

_ROOT      = os.path.dirname(os.path.dirname(__file__))
_FONT_PATH = os.path.join(_ROOT, "assets", "NotoSansHebrew-Regular.ttf")

# ─── Colors ───────────────────────────────────────────────────────────────────
BG       = (13,  13,  26)   # #0d0d1a dark background
ACCENT   = (124, 58,  237)  # #7c3aed purple
ACCENT2  = (37,  99,  235)  # #2563eb blue
WHITE    = (255, 255, 255)
GRAY     = (140, 140, 160)
GREEN    = (74,  222, 128)  # #4ade80
DIVIDER  = (30,  30,  50)


def _load_font(size: int) -> "ImageFont.FreeTypeFont | ImageFont.ImageFont":  # type: ignore
    if _PIL_AVAILABLE:
        if os.path.exists(_FONT_PATH):
            try:
                return ImageFont.truetype(_FONT_PATH, size)
            except Exception:
                pass
        try:
            return ImageFont.load_default(size=size)  # Pillow >= 10
        except TypeError:
            return ImageFont.load_default()
    raise RuntimeError("Pillow not available")


def generate_daily_report(
    tg_stats:   dict,
    ig_stats:   dict,
    fb_stats:   dict,
    tt_stats:   dict,
    shop_stats: dict,
    date_str:   str = "",
) -> bytes:
    """
    Returns PNG image bytes.

    Args:
        tg_stats:   {posts_sent, groups_found, posts_failed}
        ig_stats:   {dms_sent, users_found}
        fb_stats:   {posts_sent, groups_found}
        tt_stats:   {comments_sent, follows_sent, videos_posted}
        shop_stats: {new_users, order_intents}
        date_str:   "04/03/2026" (auto-generated if empty)
    """
    if not _PIL_AVAILABLE:
        raise RuntimeError("Pillow is not installed — cannot generate report image")

    W, H = 700, 400
    img  = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    font_h1  = _load_font(22)
    font_h2  = _load_font(16)
    font_sm  = _load_font(13)
    font_xs  = _load_font(11)

    if not date_str:
        date_str = datetime.now().strftime("%d/%m/%Y")

    # ── Header ─────────────────────────────────────────────────────────────
    # Purple gradient bar at top
    for x in range(W):
        r = int(124 + (37 - 124) * x / W)
        g = int(58  + (99 - 58)  * x / W)
        b = int(237 + (235 - 237) * x / W)
        draw.line([(x, 0), (x, 44)], fill=(r, g, b))

    draw.text((20, 10), "SocialSniper",   font=font_h1, fill=WHITE)
    draw.text((20, 32), "Daily Report",   font=font_xs, fill=(200, 200, 220))
    draw.text((W - 120, 14), date_str,    font=font_sm, fill=WHITE)

    # ── Agent rows ─────────────────────────────────────────────────────────
    rows = [
        ("TG",  "Telegram",   tg_stats.get("posts_sent", 0),    "posts",    tg_stats.get("groups_found", 0),  "groups"),
        ("IG",  "Instagram",  ig_stats.get("dms_sent", 0),       "DMs",      ig_stats.get("users_found", 0),   "users"),
        ("FB",  "Facebook",   fb_stats.get("posts_sent", 0),     "posts",    fb_stats.get("groups_found", 0),  "groups"),
        ("TT",  "TikTok",     tt_stats.get("comments_sent", 0),  "comments", tt_stats.get("follows_sent", 0),  "follows"),
    ]

    y = 60
    for tag, name, val1, label1, val2, label2 in rows:
        # Row background
        draw.rectangle([(10, y), (W - 10, y + 52)], fill=DIVIDER)
        # Tag chip
        draw.rectangle([(18, y + 10), (60, y + 42)], fill=ACCENT)
        draw.text((24, y + 16), tag, font=font_h2, fill=WHITE)
        # Name
        draw.text((72, y + 10), name,                   font=font_h2, fill=WHITE)
        # Stats
        stat1 = f"{val1}  {label1}"
        stat2 = f"{val2}  {label2}"
        draw.text((72,  y + 32), stat1,  font=font_sm, fill=GREEN)
        draw.text((250, y + 32), stat2,  font=font_sm, fill=GRAY)
        y += 62

    # ── Bot summary row ────────────────────────────────────────────────────
    y += 4
    draw.rectangle([(10, y), (W - 10, y + 52)], fill=(20, 20, 40))
    draw.text((20, y + 10), "Bot",             font=font_h2, fill=ACCENT2)
    draw.text((70, y + 10), "Customer Bot",    font=font_h2, fill=WHITE)
    new_u  = shop_stats.get("new_users", 0)
    orders = shop_stats.get("order_intents", 0)
    draw.text((70,  y + 32), f"{new_u}  new users",      font=font_sm, fill=GREEN)
    draw.text((240, y + 32), f"{orders}  order intents", font=font_sm, fill=GRAY)

    # ── Footer ─────────────────────────────────────────────────────────────
    draw.text((20, H - 22), "Generated by SocialSniper Bot", font=font_xs, fill=GRAY)

    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()
