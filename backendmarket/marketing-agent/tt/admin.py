"""
tt_admin.py — פקודות Admin בטלגרם ל-TikTok Agent
פקודות: /ttstats  /ttpause  /ttresume  /ttconfig
מגיב רק ל-ADMIN_ID.
"""
import logging
from functools import wraps
from telegram import Update
from telegram.ext import CommandHandler, ContextTypes

from .config import (
    ADMIN_ID,
    DAILY_TT_COMMENT_LIMIT, DAILY_TT_FOLLOW_LIMIT,
    TT_MIN_ACTION_DELAY, TT_MAX_ACTION_DELAY,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
)
from .database import (
    get_today_stats, get_total_videos, get_total_users,
    is_paused, set_paused,
)

logger = logging.getLogger(__name__)


# ─── Auth decorator ───────────────────────────────────────────────────────────
# מוודא שרק ה-Admin יכול להפעיל פקודות

def _admin_only(func):
    @wraps(func)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if update.effective_user and update.effective_user.id == ADMIN_ID:
            return await func(update, context)
    return wrapper


# ─── Handlers ─────────────────────────────────────────────────────────────────

@_admin_only
async def ttstats_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג סטטיסטיקות TikTok Agent של היום."""
    stats        = get_today_stats()
    total_videos = get_total_videos()
    total_users  = get_total_users()
    status       = "⏸ מושהה" if is_paused() else "✅ פעיל"

    text = (
        "📊 <b>TikTok Agent — סטטיסטיקות היום</b>\n\n"
        f"🔍 וידאוים שנמצאו:   <b>{stats.get('videos_found', 0)}</b>\n"
        f"👤 משתמשים שנמצאו:  <b>{stats.get('users_found', 0)}</b>\n"
        f"💬 תגובות שנשלחו:   <b>{stats.get('comments_sent', 0)}</b> "
        f"(נכשלו: {stats.get('comments_failed', 0)})\n"
        f"➕ עקיבות שבוצעו:   <b>{stats.get('follows_sent', 0)}</b> "
        f"(נכשלו: {stats.get('follows_failed', 0)})\n"
        f"🎬 וידאוים שהועלו:  <b>{stats.get('videos_posted', 0)}</b>\n\n"
        f"📁 סה\"כ וידאוים ב-DB:  <b>{total_videos}</b>\n"
        f"👥 סה\"כ משתמשים ב-DB: <b>{total_users}</b>\n"
        f"🤖 מצב Agent: {status}"
    )
    await update.message.reply_text(text, parse_mode="HTML")


@_admin_only
async def ttpause_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """עוצר את ה-TikTok Agent."""
    set_paused(True)
    await update.message.reply_text("⏸ <b>TikTok Agent מושהה.</b>", parse_mode="HTML")
    logger.info("TikTok agent הושהה ע\"י Admin.")


@_admin_only
async def ttresume_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מפעיל מחדש את ה-TikTok Agent."""
    set_paused(False)
    await update.message.reply_text("▶️ <b>TikTok Agent חזר לפעילות.</b>", parse_mode="HTML")
    logger.info("TikTok agent הופעל מחדש ע\"י Admin.")


@_admin_only
async def ttconfig_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג את הגדרות ה-TikTok Agent הנוכחיות."""
    text = (
        "⚙️ <b>TikTok Agent — הגדרות נוכחיות</b>\n\n"
        f"💬 מקסימום תגובות/יום:  <b>{DAILY_TT_COMMENT_LIMIT}</b>\n"
        f"➕ מקסימום עקיבות/יום: <b>{DAILY_TT_FOLLOW_LIMIT}</b>\n"
        f"⏱ עיכוב בין פעולות:    <b>{TT_MIN_ACTION_DELAY // 60}–{TT_MAX_ACTION_DELAY // 60} דקות</b>\n"
        f"🕐 שעות פעילות:         <b>{ACTIVE_HOUR_START}:00–{ACTIVE_HOUR_END}:00</b>\n\n"
        "📅 <b>לוח זמנים יומי:</b>\n"
        "  09:00 — העלאת וידאו\n"
        "  10:00 — גילוי hashtags (3)\n"
        "  11:00 — תגובות #1 (10)\n"
        "  14:30 — עקיבות (15)\n"
        "  17:00 — תגובות #2 (8)\n"
        "  20:00 — תגובות #3 (5)"
    )
    await update.message.reply_text(text, parse_mode="HTML")


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_tt_admin_handlers() -> list:
    """מחזיר את כל ה-handlers של TikTok Admin."""
    return [
        CommandHandler("ttstats",  ttstats_handler),
        CommandHandler("ttpause",  ttpause_handler),
        CommandHandler("ttresume", ttresume_handler),
        CommandHandler("ttconfig", ttconfig_handler),
    ]
