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
    get_conversation_stats, get_story_views_today,
)
from .graph_api import build_insights_message

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


@_admin_only
async def iginsights_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג Analytics מ-Instagram Graph API (עמוד עסקי)."""
    await update.message.reply_text("⏳ טוען נתונים מ-Graph API...", parse_mode="HTML")
    text = build_insights_message()
    await update.message.reply_text(text, parse_mode="HTML")


# ─── /igconvo — AI Conversation Stats ───────────────────────────────────────

@_admin_only
async def igconvo_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/igconvo — סטטיסטיקות AI Conversation Manager."""
    stats  = get_conversation_stats()
    views  = get_story_views_today()
    text = (
        "🤖 <b>Instagram AI Conversation Manager</b>\n\n"
        f"📩 DMs ממענה לתגובות (Feature 3): <b>{stats['reply_monitor_dms']}</b>\n"
        f"💬 שיחות DM פעילות (Feature 11):  <b>{stats['active']}</b>\n"
        f"✅ שיחות שהושלמו:                  <b>{stats['done']}</b>\n"
        f"📊 סה\"כ שיחות שנפתחו:             <b>{stats['total']}</b>\n\n"
        f"👁 סטוריז שנצפו היום (Feature 1):  <b>{views}</b>"
    )
    await update.message.reply_text(text, parse_mode="HTML")  # type: ignore[union-attr]


# ─── /igaudio — Trending Audio Report ────────────────────────────────────────

@_admin_only
async def igaudio_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/igaudio — אודיו טרנדינג מ-Reels ישראלים (Feature 12)."""
    await update.message.reply_text("⏳ מנתח Reels ישראלים...")  # type: ignore[union-attr]
    try:
        from instagrapi import Client as _Client
        import json, os
        SESSION_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ig_session.json")
        cl = _Client()
        if os.path.exists(SESSION_FILE):
            cl.load_settings(SESSION_FILE)
        from .config import IG_USERNAME, IG_PASSWORD
        cl.login(IG_USERNAME, IG_PASSWORD)
        from .content import get_trending_audio_report
        text = get_trending_audio_report(cl)
    except Exception as e:
        text = f"⚠️ שגיאה: <code>{e}</code>"
    await update.message.reply_text(text, parse_mode="HTML")  # type: ignore[union-attr]


# ─── /igpeaktime — Peak Time Analysis ────────────────────────────────────────

@_admin_only
async def igpeaktime_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/igpeaktime — שעת השיא לפרסום לפי hashtag (Feature 9)."""
    await update.message.reply_text("⏳ מנתח שעות פעילות...")  # type: ignore[union-attr]
    try:
        from instagrapi import Client as _Client
        import os
        SESSION_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ig_session.json")
        cl = _Client()
        if os.path.exists(SESSION_FILE):
            cl.load_settings(SESSION_FILE)
        from .config import IG_USERNAME, IG_PASSWORD
        cl.login(IG_USERNAME, IG_PASSWORD)
        from .content import get_peak_time_report
        text = get_peak_time_report(cl)
    except Exception as e:
        text = f"⚠️ שגיאה: <code>{e}</code>"
    await update.message.reply_text(text, parse_mode="HTML")  # type: ignore[union-attr]


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_ig_admin_handlers() -> list:
    return [
        CommandHandler("igstats",    igstats_handler),
        CommandHandler("igpause",    igpause_handler),
        CommandHandler("igresume",   igresume_handler),
        CommandHandler("igconfig",   igconfig_handler),
        CommandHandler("iginsights", iginsights_handler),
        CommandHandler("igconvo",    igconvo_handler),
        CommandHandler("igaudio",    igaudio_handler),
        CommandHandler("igpeaktime", igpeaktime_handler),
    ]
