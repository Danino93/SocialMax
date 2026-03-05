"""
tg_admin.py — פקודות Admin בטלגרם ל-Telegram Marketing Agent
פקודות: /astats  /apause  /aresume  /agroups  /aconfig
מגיב רק ל-ADMIN_ID.
"""
import logging
from telegram import Update
from telegram.ext import ContextTypes, CommandHandler
from telegram.constants import ParseMode

from .config import (
    ADMIN_ID,
    MAX_NEW_GROUPS_PER_DAY, DAILY_POST_LIMIT, POST_COOLDOWN_DAYS,
    MIN_DELAY_MINUTES, MAX_DELAY_MINUTES,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
    MIN_GROUP_MEMBERS, MAX_GROUP_MEMBERS,
)
from .database import (
    get_today_stats, get_total_groups, get_recent_groups, get_top_groups,
    get_template_stats, is_paused, set_paused,
)

logger = logging.getLogger(__name__)


# ─── Auth decorator ───────────────────────────────────────────────────────────

def _admin_only(func):
    """Decorator — מתעלם בשקט ממשתמשים שאינם Admin."""
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if not update.effective_user or update.effective_user.id != ADMIN_ID:
            return
        await func(update, context)
    wrapper.__name__ = func.__name__
    return wrapper


# ─── /astats ─────────────────────────────────────────────────────────────────

@_admin_only
async def astats_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג סטטיסטיקות Telegram Agent של היום."""
    stats  = get_today_stats()
    total  = get_total_groups()
    status = "⏸ מושהה" if is_paused() else "✅ פעיל"

    text = (
        f"📊 <b>Telegram Agent — סטטיסטיקות היום</b>\n\n"
        f"מצב: {status}\n\n"
        f"🔍 קבוצות חדשות שנמצאו: <b>{stats.get('groups_found', 0)}</b>\n"
        f"📨 פוסטים שנשלחו:        <b>{stats.get('posts_sent', 0)}</b>\n"
        f"❌ פוסטים שנכשלו:        <b>{stats.get('posts_failed', 0)}</b>\n\n"
        f"🗄 סה\"כ קבוצות פעילות ב-DB: <b>{total}</b>"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


# ─── /apause ─────────────────────────────────────────────────────────────────

@_admin_only
async def apause_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מושהה את ה-Telegram Agent."""
    if is_paused():
        await update.message.reply_text("⏸ Agent כבר מושהה.")  # type: ignore[union-attr]
        return
    set_paused(True)
    await update.message.reply_text(  # type: ignore[union-attr]
        "⏸ <b>Telegram Agent הושהה.</b>\nשלח /aresume להמשך.",
        parse_mode=ParseMode.HTML,
    )
    logger.info("Telegram agent הושהה ע\"י Admin.")


# ─── /aresume ────────────────────────────────────────────────────────────────

@_admin_only
async def aresume_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מפעיל מחדש את ה-Telegram Agent."""
    if not is_paused():
        await update.message.reply_text("✅ Agent כבר פעיל.")  # type: ignore[union-attr]
        return
    set_paused(False)
    await update.message.reply_text(  # type: ignore[union-attr]
        "✅ <b>Telegram Agent חזר לפעולה!</b>",
        parse_mode=ParseMode.HTML,
    )
    logger.info("Telegram agent הופעל מחדש ע\"י Admin.")


# ─── /agroups ────────────────────────────────────────────────────────────────

@_admin_only
async def agroups_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג 5 הקבוצות האחרונות שנמצאו."""
    groups = get_recent_groups(limit=5)
    if not groups:
        await update.message.reply_text("אין קבוצות ב-DB עדיין.")  # type: ignore[union-attr]
        return

    lines = ["🗂 <b>5 הקבוצות האחרונות שנמצאו:</b>\n"]
    for g in groups:
        username = f"@{g['username']}" if g.get("username") else "פרטית"
        lines.append(
            f"• <b>{g['title']}</b>\n"
            f"  {username} · {g['member_count']:,} חברים · "
            f"פוסטים: {g['post_count']}"
        )
    await update.message.reply_text(  # type: ignore[union-attr]
        "\n".join(lines),
        parse_mode=ParseMode.HTML,
    )


# ─── /aconfig ────────────────────────────────────────────────────────────────

@_admin_only
async def aconfig_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג את הגדרות ה-Telegram Agent הנוכחיות."""
    text = (
        "⚙️ <b>Telegram Agent — הגדרות נוכחיות</b>\n\n"
        f"📅 קבוצות חדשות ביום: <code>{MAX_NEW_GROUPS_PER_DAY}</code>\n"
        f"📨 מקסימום פוסטים ביום: <code>{DAILY_POST_LIMIT}</code>\n"
        f"🔁 cooldown לקבוצה: <code>{POST_COOLDOWN_DAYS} ימים</code>\n\n"
        f"⏱ עיכוי בין פוסטים: <code>{MIN_DELAY_MINUTES}–{MAX_DELAY_MINUTES} דקות</code>\n"
        f"🕐 שעות פעילות: <code>{ACTIVE_HOUR_START}:00–{ACTIVE_HOUR_END}:00</code>\n\n"
        f"👥 גודל קבוצה: <code>{MIN_GROUP_MEMBERS:,}–{MAX_GROUP_MEMBERS:,} חברים</code>\n\n"
        "<i>לשינוי — ערוך את קובץ .env והפעל מחדש.</i>"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


# ─── /atop ───────────────────────────────────────────────────────────────────

@_admin_only
async def atop_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג Top 5 קבוצות לפי מספר פרסומים ו-success_rate."""
    top = get_top_groups(limit=5)
    if not top:
        await update.message.reply_text("אין קבוצות ב-DB עדיין.")  # type: ignore[union-attr]
        return

    lines = ["🏆 <b>Top 5 קבוצות (לפי פרסומים)</b>\n"]
    for i, g in enumerate(top, 1):
        title       = g.get("title") or "לא ידוע"
        post_count  = g.get("post_count", 0)
        members     = g.get("member_count", 0)
        rate        = g.get("success_rate", 1.0)
        lines.append(
            f"{i}. <b>{title}</b>\n"
            f"   📨 {post_count} פוסטים | 👥 {members:,} חברים | "
            f"✅ {rate:.0%} הצלחה"
        )

    await update.message.reply_text(  # type: ignore[union-attr]
        "\n".join(lines),
        parse_mode=ParseMode.HTML,
    )


# ─── /aab — A/B Testing Results ──────────────────────────────────────────────

@_admin_only
async def aab_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג ביצועי A/B Testing — Top 5 ו-Bottom 3 תבניות."""
    from .messages import TEMPLATES

    stats = get_template_stats()
    if not stats:
        await update.message.reply_text("אין נתוני A/B עדיין — שלח כמה פוסטים ראשית.")  # type: ignore[union-attr]
        return

    def _preview(tid: int) -> str:
        """קיצור של תחילת הטקסט — 40 תווים."""
        raw = TEMPLATES[tid] if tid < len(TEMPLATES) else ""
        raw = raw.replace("{group_name}", "הקבוצה")
        return raw[:40].rstrip() + "..."

    def _grade(rate) -> str:
        if rate is None:
            return "📊 לומד"
        if rate >= 0.80:
            return f"{rate:.0%} ✅"
        if rate >= 0.50:
            return f"{rate:.0%} ⚠️"
        return f"{rate:.0%} ❌"

    lines = ["📈 <b>A/B ביצועי תבניות</b>\n"]

    # Top 5
    lines.append("🏆 <b>Top 5</b>")
    for i, s in enumerate(stats[:5], 1):
        tid   = s["template_id"]
        grade = _grade(s["rate"])
        n     = s["sends"]
        preview = _preview(tid)
        lines.append(f'{i}. #{tid} <i>"{preview}"</i>  {n} שליחות | {grade}')

    # Bottom 3 (if we have enough templates)
    bottom = [s for s in stats if s["sends"] >= 3][-3:]
    if bottom:
        lines.append("\n📉 <b>Bottom 3</b>")
        for i, s in enumerate(bottom, 1):
            tid   = s["template_id"]
            grade = _grade(s["rate"])
            n     = s["sends"]
            preview = _preview(tid)
            lines.append(f'{i}. #{tid} <i>"{preview}"</i>  {n} שליחות | {grade}')

    # Summary
    total_sends = sum(s["sends"] for s in stats)
    lines.append(f"\n<i>סה״כ: {total_sends} שליחות על {len(stats)} תבניות שנבדקו</i>")

    await update.message.reply_text(  # type: ignore[union-attr]
        "\n".join(lines),
        parse_mode=ParseMode.HTML,
    )


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_tg_admin_handlers() -> list[CommandHandler]:
    """מחזיר את כל ה-handlers של Telegram Admin."""
    return [
        CommandHandler("astats",  astats_handler),
        CommandHandler("apause",  apause_handler),
        CommandHandler("aresume", aresume_handler),
        CommandHandler("agroups", agroups_handler),
        CommandHandler("aconfig", aconfig_handler),
        CommandHandler("atop",    atop_handler),
        CommandHandler("aab",     aab_handler),
    ]
