"""
shop_handlers.py — Customer-facing Telegram Bot handlers for SocialSniper
Handles: /start, /menu, /reviews, /faq, /guarantee, /contact, /help
         + platform shortcuts (/instagram, /tiktok, etc.)
         + inline button callbacks (verify, menu_open, plt:*, plt_back, order:*)
         + returning customer detection, flash sale injection, order loading simulation
"""
import asyncio
import logging
import urllib.parse
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes, CommandHandler, CallbackQueryHandler
from telegram.constants import ParseMode

from .config import ADMIN_ID
from .data import PLATFORMS, OWNER_USERNAME, build_platform_services_msg
from .messages import (
    MSG_WELCOME, BTN_VERIFY,
    MSG_VERIFIED, BTN_MENU_OPEN, BTN_CHAT_EXPERT,
    MSG_SELECT_PLATFORM, BTN_BACK_PLATFORMS, BTN_ORDER_INTENT,
    MSG_ORDER_CONFIRMED, MSG_CONTACT, MSG_FAQ, MSG_GUARANTEE, MSG_HELP,
    build_reviews_msg,
    MSG_WELCOME_BACK, BTN_WIZARD, BTN_CALC,
    MSG_FLASH_SALE, MSG_FLASH_BANNER, MSG_ORDER_LOADING,
    MSG_REVIEW_REQUEST, BTN_REVIEW_5, BTN_REVIEW_4, BTN_REVIEW_WAIT,
)
from . import database as shop_database

logger = logging.getLogger(__name__)


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _escape_html(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _build_platforms_keyboard() -> InlineKeyboardMarkup:
    """10 platform buttons in 2 columns."""
    buttons = [
        InlineKeyboardButton(f"{p['emoji']} {p['label']}", callback_data=f"plt:{p['id']}")
        for p in PLATFORMS
    ]
    rows = [buttons[i:i+2] for i in range(0, len(buttons), 2)]
    return InlineKeyboardMarkup(rows)


def _build_service_keyboard(platform_id: str, platform_label: str) -> InlineKeyboardMarkup:
    """Back + Order (intent callback) buttons at bottom of service listing."""
    return InlineKeyboardMarkup([[
        InlineKeyboardButton(BTN_BACK_PLATFORMS, callback_data="plt_back"),
        InlineKeyboardButton(BTN_ORDER_INTENT, callback_data=f"order:{platform_id}:{platform_label}"),
    ]])


# ─── /start ──────────────────────────────────────────────────────────────────

async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.message.from_user  # type: ignore[union-attr]
    is_new, visit_count = shop_database.upsert_user(
        user.id,
        user.username,
        user.first_name or "חבר",
    )

    if not is_new:
        # Returning customer — show quick-access menu instead of verify screen
        keyboard = [[
            InlineKeyboardButton(BTN_MENU_OPEN, callback_data="menu_open"),
            InlineKeyboardButton(BTN_CHAT_EXPERT, url=f"https://t.me/{OWNER_USERNAME}"),
        ], [
            InlineKeyboardButton(BTN_WIZARD, callback_data="wiz:start"),
            InlineKeyboardButton(BTN_CALC,   callback_data="calc:back"),
        ]]
        await update.message.reply_text(  # type: ignore[union-attr]
            MSG_WELCOME_BACK.format(name=_escape_html(user.first_name or "חבר")),
            parse_mode=ParseMode.HTML,
            reply_markup=InlineKeyboardMarkup(keyboard),
        )
        return

    keyboard = [[InlineKeyboardButton(BTN_VERIFY, callback_data="verify_human")]]
    await update.message.reply_text(  # type: ignore[union-attr]
        MSG_WELCOME,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard),
        disable_web_page_preview=True,
    )


# ─── Callback: verify_human ───────────────────────────────────────────────────

async def verify_human_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer("✅ אומת!")  # type: ignore[union-attr]

    keyboard = [[
        InlineKeyboardButton(BTN_MENU_OPEN, callback_data="menu_open"),
        InlineKeyboardButton(BTN_CHAT_EXPERT, url=f"https://t.me/{OWNER_USERNAME}"),
    ]]

    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_VERIFIED,
        parse_mode=ParseMode.HTML,
        reply_markup=InlineKeyboardMarkup(keyboard),
        disable_web_page_preview=True,
    )

    # Flash sale injection — if there's an active sale, send it right after verification
    sale = shop_database.get_active_sale()
    if sale and query.from_user:  # type: ignore[union-attr]
        try:
            keyboard_sale = InlineKeyboardMarkup([[
                InlineKeyboardButton(BTN_MENU_OPEN, callback_data="menu_open"),
            ]])
            await context.bot.send_message(
                chat_id=query.from_user.id,  # type: ignore[union-attr]
                text=MSG_FLASH_SALE.format(text=sale["text"], minutes=sale["minutes_left"]),
                parse_mode=ParseMode.HTML,
                reply_markup=keyboard_sale,
            )
        except Exception as e:
            logger.warning("Flash sale message failed: %s", e)

    # Notify admin — new verified user
    if ADMIN_ID and query.from_user:  # type: ignore[union-attr]
        user = query.from_user  # type: ignore[union-attr]
        username = f"@{user.username}" if user.username else "אין יוזר"
        admin_msg = (
            "<b>לקוח חדש אימת!</b>\n\n"
            f"שם: {_escape_html(user.first_name)}\n"
            f"יוזר: {_escape_html(username)}\n"
            f"ID: <code>{user.id}</code>"
        )
        try:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=admin_msg,
                parse_mode=ParseMode.HTML,
            )
        except Exception as e:
            logger.error("Failed to send admin notification: %s", e)


# ─── /menu command ────────────────────────────────────────────────────────────

def _menu_text() -> str:
    """Returns MSG_SELECT_PLATFORM optionally prefixed with flash sale banner."""
    sale = shop_database.get_active_sale()
    if sale:
        return MSG_FLASH_BANNER.format(text=sale["text"], minutes=sale["minutes_left"]) + MSG_SELECT_PLATFORM
    return MSG_SELECT_PLATFORM


async def menu_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        _menu_text(),
        parse_mode=ParseMode.HTML,
        reply_markup=_build_platforms_keyboard(),
    )


# ─── Callback: menu_open ──────────────────────────────────────────────────────

async def menu_open_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]
    await query.edit_message_text(  # type: ignore[union-attr]
        _menu_text(),
        parse_mode=ParseMode.HTML,
        reply_markup=_build_platforms_keyboard(),
    )


# ─── Callback: plt:<platform_id> ─────────────────────────────────────────────

async def platform_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]

    platform_id = (query.data or "").replace("plt:", "")  # type: ignore[union-attr]
    platform = next((p for p in PLATFORMS if p["id"] == platform_id), None)
    platform_label = platform["label"] if platform else platform_id

    msg = build_platform_services_msg(platform_id)

    await query.edit_message_text(  # type: ignore[union-attr]
        msg,
        parse_mode=ParseMode.HTML,
        reply_markup=_build_service_keyboard(platform_id, platform_label),
        disable_web_page_preview=True,
    )


# ─── Callback: plt_back ──────────────────────────────────────────────────────

async def back_to_platforms_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()  # type: ignore[union-attr]
    await query.edit_message_text(  # type: ignore[union-attr]
        MSG_SELECT_PLATFORM,
        parse_mode=ParseMode.HTML,
        reply_markup=_build_platforms_keyboard(),
    )


# ─── Callback: order:<platform_id>:<platform_label> ─────────────────────────

async def order_intent_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer("מעולה! 🔥 שנייה...")  # type: ignore[union-attr]

    parts = (query.data or "").split(":", 2)  # type: ignore[union-attr]
    platform_id    = parts[1] if len(parts) > 1 else ""
    platform_label = parts[2] if len(parts) > 2 else platform_id

    # ── Step 1: Loading simulation ──────────────────────────────────────────
    loading_msg = await query.edit_message_text(  # type: ignore[union-attr]
        MSG_ORDER_LOADING,
        parse_mode=ParseMode.HTML,
    )

    # ── Step 2: Schedule review follow-up (24h later) ──────────────────────
    if query.from_user:  # type: ignore[union-attr]
        try:
            shop_database.add_review_request(
                user_id=query.from_user.id,  # type: ignore[union-attr]
                chat_id=query.message.chat_id,  # type: ignore[union-attr]
                platform=platform_label,
            )
        except Exception as e:
            logger.warning("Could not schedule review request: %s", e)

    # ── Step 3: Brief pause → show confirmed state ──────────────────────────
    await asyncio.sleep(18)

    pretext = f"שלום! אני מעוניין ב-{platform_label} שירותים"
    url = f"https://t.me/{OWNER_USERNAME}?text={urllib.parse.quote(pretext)}"

    keyboard = InlineKeyboardMarkup([[
        InlineKeyboardButton("💬 פתח שיחה עם המומחה", url=url),
        InlineKeyboardButton("⬅️ חזור לתפריט", callback_data="plt_back"),
    ]])

    await loading_msg.edit_text(
        MSG_ORDER_CONFIRMED,
        parse_mode=ParseMode.HTML,
        reply_markup=keyboard,
    )

    # Notify admin — purchase intent
    if ADMIN_ID and query.from_user:  # type: ignore[union-attr]
        user = query.from_user  # type: ignore[union-attr]
        username = f"@{user.username}" if user.username else "אין יוזר"
        admin_msg = (
            "<b>💸 כוונת הזמנה!</b>\n\n"
            f"פלטפורמה: {platform_label}\n"
            f"שם: {_escape_html(user.first_name)}\n"
            f"יוזר: {_escape_html(username)}\n"
            f"ID: <code>{user.id}</code>"
        )
        try:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=admin_msg,
                parse_mode=ParseMode.HTML,
            )
        except Exception as e:
            logger.error("Failed to send admin order-intent notification: %s", e)


# ─── Direct platform shortcuts (/instagram, /tiktok, etc.) ──────────────────

async def platform_shortcut_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = update.message.text or ""  # type: ignore[union-attr]
    platform_id = text.split("@")[0].lstrip("/").lower()
    platform = next((p for p in PLATFORMS if p["id"] == platform_id), None)
    if not platform:
        await update.message.reply_text("פלטפורמה לא נמצאה.")  # type: ignore[union-attr]
        return

    msg = build_platform_services_msg(platform_id)
    await update.message.reply_text(  # type: ignore[union-attr]
        msg,
        parse_mode=ParseMode.HTML,
        reply_markup=_build_service_keyboard(platform["id"], platform["label"]),
        disable_web_page_preview=True,
    )


# ─── /contact ────────────────────────────────────────────────────────────────

async def contact_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        MSG_CONTACT,
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True,
    )


# ─── /reviews ────────────────────────────────────────────────────────────────

async def reviews_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        build_reviews_msg(),
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True,
    )


# ─── /faq ─────────────────────────────────────────────────────────────────────

async def faq_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        MSG_FAQ,
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True,
    )


# ─── /guarantee ───────────────────────────────────────────────────────────────

async def guarantee_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        MSG_GUARANTEE,
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True,
    )


# ─── /help ───────────────────────────────────────────────────────────────────

async def help_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(  # type: ignore[union-attr]
        MSG_HELP,
        parse_mode=ParseMode.HTML,
        disable_web_page_preview=True,
    )


# ─── Handler list ─────────────────────────────────────────────────────────────

def get_shop_handlers() -> list:
    """Returns all customer-facing handlers for the shop bot."""
    from .wizard import get_wizard_handlers

    platform_ids = [p["id"] for p in PLATFORMS]

    return [
        # Commands
        CommandHandler("start",     start_handler),
        CommandHandler("menu",      menu_handler),
        CommandHandler("reviews",   reviews_handler),
        CommandHandler("faq",       faq_handler),
        CommandHandler("guarantee", guarantee_handler),
        CommandHandler("contact",   contact_handler),
        CommandHandler("help",      help_handler),
        # Platform shortcuts (/instagram, /tiktok, ...)
        CommandHandler(platform_ids, platform_shortcut_handler),
        # Callbacks
        CallbackQueryHandler(verify_human_handler,      pattern="^verify_human$"),
        CallbackQueryHandler(menu_open_handler,         pattern="^menu_open$"),
        CallbackQueryHandler(back_to_platforms_handler, pattern="^plt_back$"),
        CallbackQueryHandler(platform_handler,          pattern="^plt:"),
        CallbackQueryHandler(order_intent_handler,      pattern="^order:"),
        # Wizard + Calculator (imported from wizard.py)
        *get_wizard_handlers(),
    ]
