"""
Telegram admin commands for the Instagram agent.
Commands: /igstats  /igpause  /igresume  /igconfig
Only responds to ADMIN_ID.
"""
import logging
from functools import wraps
from telegram import Update
from telegram.ext import CommandHandler, ContextTypes

from .config import (
    ADMIN_ID,
    DAILY_DM_LIMIT, DAILY_COMMENT_LIMIT,
    DM_COOLDOWN_DAYS, COMMENT_COOLDOWN_DAYS,
    MIN_ACTION_DELAY, MAX_ACTION_DELAY,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
)
from .database import (
    get_today_stats, get_total_accounts,
    is_paused, set_paused,
)

logger = logging.getLogger(__name__)


# ─── Auth decorator ───────────────────────────────────────────────────────────

def _admin_only(func):
    @wraps(func)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if update.effective_user and update.effective_user.id == ADMIN_ID:
            return await func(update, context)
        # Silently ignore non-admin users
    return wrapper


# ─── Handlers ─────────────────────────────────────────────────────────────────

@_admin_only
async def igstats_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    stats  = get_today_stats()
    total  = get_total_accounts()
    status = "⏸ מושהה" if is_paused() else "✅ פעיל"

    text = (
        "📊 <b>Instagram Agent — סטטיסטיקות היום</b>\n\n"
        f"🔍 חשבונות שנמצאו:  <b>{stats['accounts_found']}</b>\n"
        f"💬 תגובות שנשלחו:   <b>{stats['comments_sent']}</b> "
        f"(נכשלו: {stats['comments_failed']})\n"
        f"📩 DMs שנשלחו:       <b>{stats['dms_sent']}</b> "
        f"(נכשלו: {stats['dms_failed']})\n"
        f"🎬 פוסטים שפורסמו:  <b>{stats['posts_published']}</b>\n\n"
        f"👥 סה\"כ חשבונות ב-DB: <b>{total}</b>\n"
        f"🤖 מצב Agent: {status}"
    )
    await update.message.reply_text(text, parse_mode="HTML")


@_admin_only
async def igpause_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    set_paused(True)
    await update.message.reply_text("⏸ <b>Instagram Agent מושהה.</b>", parse_mode="HTML")
    logger.info("Instagram agent paused by admin.")


@_admin_only
async def igresume_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    set_paused(False)
    await update.message.reply_text("▶️ <b>Instagram Agent חזר לפעילות.</b>", parse_mode="HTML")
    logger.info("Instagram agent resumed by admin.")


@_admin_only
async def igconfig_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "⚙️ <b>Instagram Agent — הגדרות נוכחיות</b>\n\n"
        f"📩 מקסימום DMs ליום:          <b>{DAILY_DM_LIMIT}</b>\n"
        f"💬 מקסימום תגובות ליום:        <b>{DAILY_COMMENT_LIMIT}</b>\n"
        f"⏳ cooldown DM (ימים):         <b>{DM_COOLDOWN_DAYS}</b>\n"
        f"⏳ cooldown תגובה (ימים):      <b>{COMMENT_COOLDOWN_DAYS}</b>\n"
        f"⏱ עיכוי בין פעולות:           <b>{MIN_ACTION_DELAY}–{MAX_ACTION_DELAY} שניות</b>\n"
        f"🕐 שעות פעילות:               <b>{ACTIVE_HOUR_START}:00–{ACTIVE_HOUR_END}:00</b>"
    )
    await update.message.reply_text(text, parse_mode="HTML")


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_ig_admin_handlers() -> list:
    return [
        CommandHandler("igstats",  igstats_handler),
        CommandHandler("igpause",  igpause_handler),
        CommandHandler("igresume", igresume_handler),
        CommandHandler("igconfig", igconfig_handler),
    ]
