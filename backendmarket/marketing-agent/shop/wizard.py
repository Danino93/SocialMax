"""
shop_wizard.py — Guided Order Wizard & Price Calculator for SocialSniper Bot
=============================================================================
Wizard:     /wizard or "🙋 עזרה בבחירה" → 3-step inline keyboard chain
             wiz:g:{goal} → wiz:p:{goal}:{platform} → wiz:q:{goal}:{platform}:{qty}
             → shows best-match service recommendation + order CTA

Calculator: /calc or "🧮 מחשבון מחיר" → 3-step inline keyboard chain
             calc:p:{platform} → calc:s:{platform}:{svc_idx} → calc:q:{platform}:{svc_idx}:{qty}
             → shows price estimate for the chosen quantity

No ConversationHandler needed — pure callback data chain.
"""
import urllib.parse
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes, CommandHandler, CallbackQueryHandler
from telegram.constants import ParseMode

from .data import PLATFORMS, SERVICES, OWNER_USERNAME, BADGE_EMOJIS
from .messages import (
    MSG_WIZARD_GOAL, MSG_WIZARD_PLATFORM, MSG_WIZARD_QTY, MSG_WIZARD_RESULT,
    MSG_CALC_INTRO, MSG_CALC_SERVICE, MSG_CALC_QTY, MSG_CALC_RESULT,
    BTN_BACK_PLATFORMS,
)


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _platform_info(platform_id: str) -> dict | None:
    return next((p for p in PLATFORMS if p["id"] == platform_id), None)


def _calc_price(price_per_k: float, qty: int) -> float:
    """price_per_k = ILS per 1000 units → return ILS for qty."""
    return round(price_per_k * qty / 1000, 2)


def _format_price(price: float) -> str:
    if price < 1:
        return f"{price:.2f}"
    return f"{price:.0f}"


def _badges_str(badges: list[str]) -> str:
    if not badges:
        return ""
    emojis = "".join(BADGE_EMOJIS.get(b, "") for b in badges)
    return emojis if emojis else ""


# ─── Wizard goal → platform mapping ──────────────────────────────────────────

# Which platforms are relevant for each goal
_GOAL_PLATFORMS: dict[str, list[str]] = {
    "עוקבים":   ["instagram", "tiktok", "youtube", "telegram", "twitter", "discord", "spotify"],
    "לייקים":   ["instagram", "tiktok", "youtube", "facebook", "twitter"],
    "צפיות":    ["instagram", "tiktok", "youtube", "facebook", "twitter", "telegram"],
    "ביקורות":  ["google"],
}

# Keyword → which service names to match
_GOAL_KEYWORDS: dict[str, list[str]] = {
    "עוקבים":  ["עוקבים", "מנויים", "חברים", "מאזינים"],
    "לייקים":  ["לייקים"],
    "צפיות":   ["צפיות", "נגינות"],
    "ביקורות": ["ביקורות"],
}


def _find_best_service(platform_id: str, goal: str) -> dict | None:
    """Return the first service for this platform that matches the goal keywords."""
    keywords = _GOAL_KEYWORDS.get(goal, [])
    svcs = SERVICES.get(platform_id, [])
    for svc in svcs:
        for kw in keywords:
            if kw in svc["name"]:
                return svc
    return svcs[0] if svcs else None


def _qty_options(svc: dict) -> list[int]:
    """Generate 3 quantity options based on minimum."""
    min_qty = svc["min"]
    return [min_qty, min_qty * 5, min_qty * 20]


# ─── WIZARD step 1: goal selection ────────────────────────────────────────────

async def wizard_start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Entry point: /wizard command or inline button."""
    goals = list(_GOAL_PLATFORMS.keys())
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton(f"👥 {g}", callback_data=f"wiz:g:{g}") for g in goals[:2]],
        [InlineKeyboardButton(f"👁 {g}", callback_data=f"wiz:g:{g}") for g in goals[2:]],
        [InlineKeyboardButton("⬅️ חזור לתפריט", callback_data="menu_open")],
    ])
    if update.message:
        await update.message.reply_text(MSG_WIZARD_GOAL, parse_mode=ParseMode.HTML, reply_markup=keyboard)
    elif update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text(MSG_WIZARD_GOAL, parse_mode=ParseMode.HTML, reply_markup=keyboard)


# ─── WIZARD step 2: platform selection ────────────────────────────────────────

async def wizard_goal_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """wiz:g:{goal} — show platform buttons filtered by goal."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    goal = (query.data or "").split(":", 2)[2]  # type: ignore[union-attr]
    platform_ids = _GOAL_PLATFORMS.get(goal, [])

    buttons = []
    for pid in platform_ids:
        p = _platform_info(pid)
        if p:
            buttons.append(InlineKeyboardButton(
                f"{p['emoji']} {p['label']}",
                callback_data=f"wiz:p:{goal}:{pid}",
            ))

    rows = [buttons[i:i+2] for i in range(0, len(buttons), 2)]
    rows.append([InlineKeyboardButton("⬅️ חזור", callback_data="wiz:start")])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_WIZARD_PLATFORM.format(goal=goal),
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(rows),
    )


# ─── WIZARD step 3: quantity selection ────────────────────────────────────────

async def wizard_platform_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """wiz:p:{goal}:{platform} — show quantity options."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    parts = (query.data or "").split(":", 3)  # type: ignore[union-attr]
    goal        = parts[2]
    platform_id = parts[3]

    svc = _find_best_service(platform_id, goal)
    if not svc:
        await query.edit_message_text("לא נמצא שירות מתאים. /menu לתפריט")  # type: ignore[union-attr]
        return

    p = _platform_info(platform_id)
    platform_label = p["label"] if p else platform_id
    qty_options = _qty_options(svc)

    buttons = [
        InlineKeyboardButton(
            f"{qty:,} יחידות ≈ {_format_price(_calc_price(svc['price'], qty))}₪",
            callback_data=f"wiz:q:{goal}:{platform_id}:{qty}",
        )
        for qty in qty_options
    ]
    rows = [[b] for b in buttons]
    rows.append([InlineKeyboardButton("⬅️ חזור", callback_data=f"wiz:g:{goal}")])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_WIZARD_QTY.format(service_name=svc["name"], platform=platform_label),
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(rows),
    )


# ─── WIZARD result ─────────────────────────────────────────────────────────────

async def wizard_qty_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """wiz:q:{goal}:{platform}:{qty} — show final recommendation + CTA."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    parts = (query.data or "").split(":", 4)  # type: ignore[union-attr]
    goal        = parts[2]
    platform_id = parts[3]
    qty         = int(parts[4])

    svc = _find_best_service(platform_id, goal)
    if not svc:
        await query.edit_message_text("לא נמצא שירות. /menu")  # type: ignore[union-attr]
        return

    p = _platform_info(platform_id)
    platform_label = p["label"] if p else platform_id
    platform_emoji = p["emoji"] if p else ""
    price          = _calc_price(svc["price"], qty)
    badges_str     = _badges_str(svc.get("badges", []))

    pretext = f"שלום! אני מעוניין ב-{platform_label} — {svc['name']}, {qty:,} יחידות"
    url = f"https://t.me/{OWNER_USERNAME}?text={urllib.parse.quote(pretext)}"

    keyboard = InlineKeyboardMarkup([[
        InlineKeyboardButton("💬 פתח שיחה עם המומחה", url=url),
        InlineKeyboardButton("⬅️ חזור", callback_data=f"wiz:p:{goal}:{platform_id}"),
    ]])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_WIZARD_RESULT.format(
            platform_emoji=platform_emoji,
            platform=platform_label,
            service_name=svc["name"],
            qty=qty,
            price=_format_price(price),
            time=svc["time"],
            badges=badges_str,
        ),
        parse_mode=ParseMode.HTML,
        reply_markup=keyboard,
        disable_web_page_preview=True,
    )


# ─── CALCULATOR step 1: platform selection ────────────────────────────────────

async def calc_start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Entry point: /calc command."""
    buttons = [
        InlineKeyboardButton(f"{p['emoji']} {p['label']}", callback_data=f"calc:p:{p['id']}")
        for p in PLATFORMS
    ]
    rows = [buttons[i:i+2] for i in range(0, len(buttons), 2)]
    rows.append([InlineKeyboardButton("⬅️ חזור לתפריט", callback_data="menu_open")])
    if update.message:
        await update.message.reply_text(MSG_CALC_INTRO, parse_mode=ParseMode.HTML, reply_markup=InlineKeyboardMarkup(rows))
    elif update.callback_query:
        await update.callback_query.answer()
        await update.callback_query.edit_message_text(MSG_CALC_INTRO, parse_mode=ParseMode.HTML, reply_markup=InlineKeyboardMarkup(rows))


# ─── CALCULATOR step 2: service selection ────────────────────────────────────

async def calc_platform_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """calc:p:{platform} — show service list."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    platform_id = (query.data or "").split(":", 2)[2]  # type: ignore[union-attr]
    p = _platform_info(platform_id)
    platform_label = p["label"] if p else platform_id

    svcs = SERVICES.get(platform_id, [])
    buttons = [
        InlineKeyboardButton(svc["name"], callback_data=f"calc:s:{platform_id}:{i}")
        for i, svc in enumerate(svcs)
    ]
    rows = [[b] for b in buttons]
    rows.append([InlineKeyboardButton("⬅️ חזור", callback_data="calc:back")])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_CALC_SERVICE.format(platform=platform_label),
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(rows),
    )


# ─── CALCULATOR step 3: quantity selection ────────────────────────────────────

async def calc_service_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """calc:s:{platform}:{svc_idx} — show quantity options."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    parts = (query.data or "").split(":", 3)  # type: ignore[union-attr]
    platform_id = parts[2]
    svc_idx     = int(parts[3])

    svcs = SERVICES.get(platform_id, [])
    if svc_idx >= len(svcs):
        await query.edit_message_text("שגיאה. /calc לחזרה.")  # type: ignore[union-attr]
        return

    svc = svcs[svc_idx]
    qty_options = _qty_options(svc)

    buttons = [
        InlineKeyboardButton(
            f"{qty:,} יחידות ≈ {_format_price(_calc_price(svc['price'], qty))}₪",
            callback_data=f"calc:q:{platform_id}:{svc_idx}:{qty}",
        )
        for qty in qty_options
    ]
    rows = [[b] for b in buttons]
    rows.append([InlineKeyboardButton("⬅️ חזור", callback_data=f"calc:p:{platform_id}")])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_CALC_QTY.format(service=svc["name"]),
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(rows),
    )


# ─── CALCULATOR result ─────────────────────────────────────────────────────────

async def calc_qty_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """calc:q:{platform}:{svc_idx}:{qty} — show price estimate + CTA."""
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    parts = (query.data or "").split(":", 4)  # type: ignore[union-attr]
    platform_id = parts[2]
    svc_idx     = int(parts[3])
    qty         = int(parts[4])

    svcs = SERVICES.get(platform_id, [])
    if svc_idx >= len(svcs):
        await query.edit_message_text("שגיאה. /calc")  # type: ignore[union-attr]
        return

    svc   = svcs[svc_idx]
    p     = _platform_info(platform_id)
    price = _calc_price(svc["price"], qty)

    pretext = f"שלום! שאלה על {svc['name']} — {qty:,} יחידות"
    url = f"https://t.me/{OWNER_USERNAME}?text={urllib.parse.quote(pretext)}"

    keyboard = InlineKeyboardMarkup([[
        InlineKeyboardButton("💬 שאל על המחיר", url=url),
        InlineKeyboardButton("🔄 חישוב נוסף", callback_data=f"calc:p:{platform_id}"),
    ]])

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_CALC_RESULT.format(
            qty=qty,
            service=svc["name"],
            price=_format_price(price),
            time=svc["time"],
        ),
        parse_mode=ParseMode.HTML,
        reply_markup=keyboard,
        disable_web_page_preview=True,
    )


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_wizard_handlers() -> list:
    """Returns all wizard + calculator handlers."""
    return [
        # Commands
        CommandHandler("wizard", wizard_start_handler),
        CommandHandler("calc",   calc_start_handler),
        # Wizard callbacks
        CallbackQueryHandler(wizard_start_handler,    pattern="^wiz:start$"),
        CallbackQueryHandler(wizard_goal_handler,     pattern="^wiz:g:"),
        CallbackQueryHandler(wizard_platform_handler, pattern="^wiz:p:"),
        CallbackQueryHandler(wizard_qty_handler,      pattern="^wiz:q:"),
        # Calculator callbacks
        CallbackQueryHandler(calc_start_handler,    pattern="^calc:back$"),
        CallbackQueryHandler(calc_platform_handler, pattern="^calc:p:"),
        CallbackQueryHandler(calc_service_handler,  pattern="^calc:s:"),
        CallbackQueryHandler(calc_qty_handler,      pattern="^calc:q:"),
    ]
