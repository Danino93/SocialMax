"""
ci/admin.py — פקודות ניהול ל-Competitor Infiltrator Agent
מתחבר לבוט הראשי (shop/main.py) דרך get_ci_admin_handlers()

פקודות:
  /cistats       — סטטיסטיקות היום + שבוע
  /cipause       — עצור סריקה ושליחת DMs
  /ciresume      — חזור לפעילות
  /cicompetitors — רשימת מתחרים שמנוטרים
  /ciconfig      — הגדרות נוכחיות (לימיטים, interval)
"""
import logging

from telegram import Update
from telegram.ext import CommandHandler, ContextTypes

from .config import (
    ADMIN_ID,
    CI_COMPETITORS_TG, CI_COMPETITORS_IG,
    DAILY_CI_DM_LIMIT, CI_SCAN_INTERVAL_HOURS,
)
from .database import (
    get_today_stats, get_stats_last_7_days, get_dms_sent_today,
    is_paused, set_paused, get_last_scan,
    get_all_targets,
)

logger = logging.getLogger(__name__)


def _admin_only(func):
    """Decorator — רק ADMIN_ID יכול להשתמש בפקודות."""
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if update.effective_user.id != ADMIN_ID:
            await update.message.reply_text("❌ גישה נדחית")
            return
        return await func(update, context)
    wrapper.__name__ = func.__name__
    return wrapper


# ─── /cistats ─────────────────────────────────────────────────────────────────

@_admin_only
async def cmd_cistats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """סטטיסטיקות CI — היום + 7 ימים."""
    today = get_today_stats()
    week  = get_stats_last_7_days()

    # חישוב conversion rate
    def _rate(sent: int, found: int) -> str:
        if found == 0:
            return "N/A"
        return f"{sent / found * 100:.1f}%"

    today_rate = _rate(today.get("dms_sent", 0), today.get("found", 0))
    last_scan  = get_last_scan() or "לא רץ עדיין"
    paused_str = "⏸ מושהה" if is_paused() else "✅ פעיל"

    lines = [
        "🕵️ *Competitor Infiltrator — סטטיסטיקות*",
        "",
        f"סטטוס: {paused_str}",
        f"סריקה אחרונה: `{last_scan[:16]}`",
        "",
        "*היום:*",
        f"  מטרות שנמצאו: {today.get('found', 0)}",
        f"  DMs שנשלחו: {today.get('dms_sent', 0)} / {DAILY_CI_DM_LIMIT}",
        f"  תגובות שהתקבלו: {today.get('responses', 0)}",
        f"  Conversion: {today_rate}",
        "",
        "*7 ימים אחרונים:*",
    ]

    total_found = total_sent = total_resp = 0
    for row in week:
        found = row.get("found", 0)
        sent  = row.get("dms_sent", 0)
        resp  = row.get("responses", 0)
        total_found += found
        total_sent  += sent
        total_resp  += resp
        lines.append(f"  {row['stat_date']}: {found} מטרות, {sent} DMs, {resp} תגובות")

    lines += [
        "",
        f"*סה\"כ שבוע:* {total_found} מטרות | {total_sent} DMs | {total_resp} תגובות",
        f"Conversion שבועי: {_rate(total_sent, total_found)}",
    ]

    await update.message.reply_text("\n".join(lines), parse_mode="Markdown")


# ─── /cipause ─────────────────────────────────────────────────────────────────

@_admin_only
async def cmd_cipause(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """עצור CI agent."""
    set_paused(True)
    await update.message.reply_text("⏸ Competitor Infiltrator הושהה.")
    logger.info("[CI-Admin] Agent paused by admin")


# ─── /ciresume ────────────────────────────────────────────────────────────────

@_admin_only
async def cmd_ciresume(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """חדש פעילות CI agent."""
    set_paused(False)
    await update.message.reply_text("▶️ Competitor Infiltrator חזר לפעילות.")
    logger.info("[CI-Admin] Agent resumed by admin")


# ─── /cicompetitors ───────────────────────────────────────────────────────────

@_admin_only
async def cmd_cicompetitors(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """הצג מתחרים שמנוטרים."""
    tg_list = "\n".join(f"  • @{c}" for c in CI_COMPETITORS_TG) or "  — לא הוגדרו"
    ig_list = "\n".join(f"  • @{c}" for c in CI_COMPETITORS_IG) or "  — לא הוגדרו"

    text = (
        "🎯 *מתחרים שמנוטרים:*\n\n"
        f"*Telegram:*\n{tg_list}\n\n"
        f"*Instagram:*\n{ig_list}\n\n"
        "_לשינוי: ערוך CI\\_COMPETITORS\\_TG / CI\\_COMPETITORS\\_IG ב-.env_"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


# ─── /ciconfig ────────────────────────────────────────────────────────────────

@_admin_only
async def cmd_ciconfig(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """הצג הגדרות CI נוכחיות."""
    text = (
        "⚙️ *הגדרות Competitor Infiltrator:*\n\n"
        f"DM יומי מקסימלי: `{DAILY_CI_DM_LIMIT}`\n"
        f"DMs נשלחו היום: `{get_dms_sent_today()}`\n"
        f"Scan interval: כל `{CI_SCAN_INTERVAL_HOURS}` שעות\n\n"
        "_לשינוי: ערוך DAILY\\_CI\\_DM\\_LIMIT / CI\\_SCAN\\_INTERVAL\\_HOURS ב-.env_"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


# ─── /citargets ───────────────────────────────────────────────────────────────

@_admin_only
async def cmd_citargets(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """הצג 10 מטרות אחרונות."""
    targets = get_all_targets(limit=10)
    if not targets:
        await update.message.reply_text("📋 אין מטרות ב-DB.")
        return

    lines = ["📋 *10 מטרות אחרונות:*\n"]
    for t in targets:
        sent_icon = "✅" if t["dm_sent"] else "⏳"
        resp_icon = "💬" if t["response_received"] else ""
        lines.append(
            f"{sent_icon}{resp_icon} `{t['platform']}` | user: `{t['user_id'][:12]}` | "
            f"src: {t['source_channel']}\n"
            f"   _\"{t['complaint_text'][:60]}..._\""
        )

    await update.message.reply_text("\n".join(lines), parse_mode="Markdown")


# ─── Export ───────────────────────────────────────────────────────────────────

def get_ci_admin_handlers() -> list[CommandHandler]:
    """מחזיר רשימת handlers לרישום ב-shop/main.py."""
    return [
        CommandHandler("cistats",       cmd_cistats),
        CommandHandler("cipause",       cmd_cipause),
        CommandHandler("ciresume",      cmd_ciresume),
        CommandHandler("cicompetitors", cmd_cicompetitors),
        CommandHandler("ciconfig",      cmd_ciconfig),
        CommandHandler("citargets",     cmd_citargets),
    ]
