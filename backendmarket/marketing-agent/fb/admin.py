"""
Telegram admin commands for the Facebook agent.
Commands: /fbstats  /fbpause  /fbresume  /fbconfig
Only responds to ADMIN_ID.
"""
import logging
from functools import wraps
from telegram import Update
from telegram.ext import CommandHandler, ContextTypes

from .config import (
    ADMIN_ID,
    DAILY_FB_GROUP_POST_LIMIT, DAILY_FB_COMMENT_LIMIT, DAILY_FB_DM_LIMIT,
    FB_GROUP_COOLDOWN_DAYS, FB_DM_COOLDOWN_DAYS,
    FB_MIN_ACTION_DELAY, FB_MAX_ACTION_DELAY,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
)
from .database import (
    get_today_stats, get_total_groups,
    is_paused, set_paused,
)

logger = logging.getLogger(__name__)


# ─── Auth decorator ───────────────────────────────────────────────────────────

def _admin_only(func):
    @wraps(func)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if update.effective_user and update.effective_user.id == ADMIN_ID:
            return await func(update, context)
    return wrapper


# ─── Handlers ─────────────────────────────────────────────────────────────────

@_admin_only
async def fbstats_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    stats  = get_today_stats()
    total  = get_total_groups()
    status = "⏸ מושהה" if is_paused() else "✅ פעיל"

    text = (
        "📊 <b>Facebook Agent — סטטיסטיקות היום</b>\n\n"
        f"🔍 קבוצות שנמצאו:      <b>{stats['groups_found']}</b>\n"
        f"📝 פוסטים בקבוצות:     <b>{stats['group_posts_sent']}</b> "
        f"(נכשלו: {stats['group_posts_failed']})\n"
        f"💬 תגובות:              <b>{stats['comments_sent']}</b> "
        f"(נכשלו: {stats['comments_failed']})\n"
        f"📩 Messenger DMs:       <b>{stats['dms_sent']}</b> "
        f"(נכשלו: {stats['dms_failed']})\n"
        f"📄 פוסטים לפייג':       <b>{stats['page_posts']}</b>\n\n"
        f"👥 סה\"כ קבוצות ב-DB:   <b>{total}</b>\n"
        f"🤖 מצב Agent: {status}"
    )
    await update.message.reply_text(text, parse_mode="HTML")


@_admin_only
async def fbpause_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    set_paused(True)
    await update.message.reply_text("⏸ <b>Facebook Agent מושהה.</b>", parse_mode="HTML")
    logger.info("Facebook agent paused by admin.")


@_admin_only
async def fbresume_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    set_paused(False)
    await update.message.reply_text("▶️ <b>Facebook Agent חזר לפעילות.</b>", parse_mode="HTML")
    logger.info("Facebook agent resumed by admin.")


@_admin_only
async def fbconfig_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "⚙️ <b>Facebook Agent — הגדרות נוכחיות</b>\n\n"
        f"📝 מקסימום פוסטי קבוצה/יום: <b>{DAILY_FB_GROUP_POST_LIMIT}</b>\n"
        f"💬 מקסימום תגובות/יום:      <b>{DAILY_FB_COMMENT_LIMIT}</b>\n"
        f"📩 מקסימום DMs/יום:          <b>{DAILY_FB_DM_LIMIT}</b>\n"
        f"⏳ cooldown קבוצה (ימים):   <b>{FB_GROUP_COOLDOWN_DAYS}</b>\n"
        f"⏳ cooldown DM (ימים):       <b>{FB_DM_COOLDOWN_DAYS}</b>\n"
        f"⏱ עיכוי בין פעולות:         <b>{FB_MIN_ACTION_DELAY}–{FB_MAX_ACTION_DELAY} שניות</b>\n"
        f"🕐 שעות פעילות:              <b>{ACTIVE_HOUR_START}:00–{ACTIVE_HOUR_END}:00</b>"
    )
    await update.message.reply_text(text, parse_mode="HTML")


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_fb_admin_handlers() -> list:
    return [
        CommandHandler("fbstats",  fbstats_handler),
        CommandHandler("fbpause",  fbpause_handler),
        CommandHandler("fbresume", fbresume_handler),
        CommandHandler("fbconfig", fbconfig_handler),
    ]
