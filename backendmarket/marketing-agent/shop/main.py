"""
shop_main.py — SocialSniper Customer & Admin Bot
=================================================
בוט טלגרם יחיד שמאחד:
  1. לקוחות  — /start, /menu, /reviews, /faq, /guarantee, /contact, /help
               + קיצורי פלטפורמה: /instagram, /tiktok וכו׳
               + callbacks: verify, menu_open, plt:*, plt_back, order:*

  2. Admin   — /astats /apause /aresume /agroups /aconfig  (Telegram Agent)
               /igstats /igpause /igresume /igconfig        (Instagram Agent)
               /fbstats /fbpause /fbresume /fbconfig        (Facebook Agent)
               /ttstats /ttpause /ttresume /ttconfig        (TikTok Agent)
               /status                                       (סיכום כל ה-Agents)

הפעלה:
  python shop_main.py

הפעלה עם כל ה-Agents יחד:
  ראה start.sh בתיקיה זו
"""
import asyncio
import datetime
import io
import logging
import sys

import pytz
from telegram import Update
from telegram.ext import ApplicationBuilder, Application, CommandHandler, ContextTypes
from telegram.constants import ParseMode

from .config import BOT_TOKEN, ADMIN_ID
from .handlers import get_shop_handlers
from . import database as shop_database
from .messages import MSG_REVIEW_REQUEST, BTN_REVIEW_5, BTN_REVIEW_4, BTN_REVIEW_WAIT

ISR_TZ = pytz.timezone("Asia/Jerusalem")

# ─── Admin handlers מה-Agents ────────────────────────────────────────────────
from tg.admin import get_tg_admin_handlers
from ig.admin import get_ig_admin_handlers
from fb.admin import get_fb_admin_handlers
from tt.admin import get_tt_admin_handlers

# ─── DBs (לצורך /status) ─────────────────────────────────────────────────────
import tg.database as tg_database
import ig.database as ig_database
import fb.database as fb_database
import tt.database as tt_database

# ─── לוגינג ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("bot.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Startup & error notifications ───────────────────────────────────────────

async def _on_startup(app: Application) -> None:
    """Initialize DB and notify admin when the bot comes online."""
    shop_database.init_db()
    if ADMIN_ID:
        try:
            await app.bot.send_message(
                chat_id=ADMIN_ID,
                text=(
                    "✅ <b>SocialSniper Bot הופעל!</b>\n\n"
                    "כל ה-Agents עלו לאוויר 🚀\n"
                    "/status לבדיקת מצב כל ה-Agents"
                ),
                parse_mode=ParseMode.HTML,
            )
        except Exception as e:
            logger.warning("Startup notification failed: %s", e)


async def _error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Catch any unhandled exception and alert admin via Telegram."""
    import traceback
    logger.error("Unhandled exception:", exc_info=context.error)
    if ADMIN_ID:
        tb = "".join(traceback.format_exception(
            type(context.error), context.error,
            context.error.__traceback__,
        ))
        try:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=f"🚨 <b>Bot Error!</b>\n\n<code>{tb[:1500]}</code>",
                parse_mode=ParseMode.HTML,
            )
        except Exception:
            pass  # Fail silently — we're already in the error handler


# ─── Flash Sale admin commands ────────────────────────────────────────────────

@_admin_only
async def sale_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/sale <text> <hours> — activate a flash sale FOMO banner."""
    args = context.args or []
    if len(args) < 2:
        await update.message.reply_text(  # type: ignore[union-attr]
            "שימוש: /sale <טקסט> <שעות>\n"
            "דוגמה: /sale 30% הנחה Instagram 3",
        )
        return
    try:
        hours = float(args[-1])
    except ValueError:
        await update.message.reply_text("הארגומנט האחרון חייב להיות מספר שעות (למשל: 3)")  # type: ignore[union-attr]
        return
    text = " ".join(args[:-1])
    shop_database.set_sale(text, hours)
    await update.message.reply_text(  # type: ignore[union-attr]
        f"✅ <b>מבצע פעיל!</b>\n🔥 {text}\n⏳ עוד {hours:.0f} שעות",
        parse_mode=ParseMode.HTML,
    )


@_admin_only
async def clearsale_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/clearsale — remove the active flash sale."""
    shop_database.clear_sale()
    await update.message.reply_text("🗑 המבצע הוסר.")  # type: ignore[union-attr]


# ─── /analytics — Multi-day ASCII dashboard ───────────────────────────────────

@_admin_only
async def analytics_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/analytics [7|14|30] — גרף ASCII של ביצועים N ימים אחורה (ברירת מחדל: 7)."""
    args = context.args or []
    days = int(args[0]) if args and args[0].isdigit() else 7
    days = max(1, min(days, 30))
    try:
        from .analytics import generate_analytics_report
        text = generate_analytics_report(days)
    except Exception as e:
        text = f"שגיאה בייצור הדוח: <code>{e}</code>"
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


# ─── Scheduled jobs ────────────────────────────────────────────────────────────

async def _daily_report_job(context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a Pillow-generated daily summary image to admin at 09:00 Israel time."""
    if not ADMIN_ID:
        return
    try:
        from .report import generate_daily_report
        tg_stats   = tg_database.get_today_stats()
        ig_stats   = ig_database.get_today_stats()
        fb_stats   = fb_database.get_today_stats()
        tt_stats   = tt_database.get_today_stats()
        shop_stats = {
            "new_users":     shop_database.get_new_users_today(),
            "order_intents": 0,  # placeholder — tracked via admin notifications
        }
        img_bytes = generate_daily_report(tg_stats, ig_stats, fb_stats, tt_stats, shop_stats)
        caption   = "📊 <b>SocialSniper — דוח יומי</b>\n/status לפירוט"
        await context.bot.send_photo(
            chat_id=ADMIN_ID,
            photo=io.BytesIO(img_bytes),
            caption=caption,
            parse_mode=ParseMode.HTML,
        )
    except Exception as e:
        logger.error("Daily report job failed: %s", e)
        try:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=f"⚠️ דוח יומי נכשל: <code>{e}</code>",
                parse_mode=ParseMode.HTML,
            )
        except Exception:
            pass


async def _send_pending_reviews_job(context: ContextTypes.DEFAULT_TYPE) -> None:
    """Every hour: send review follow-up DMs to users whose order was 24h ago."""
    from telegram import InlineKeyboardButton, InlineKeyboardMarkup
    pending = shop_database.get_pending_reviews()
    for row in pending:
        try:
            keyboard = InlineKeyboardMarkup([[
                InlineKeyboardButton(BTN_REVIEW_5,   callback_data="review:5"),
                InlineKeyboardButton(BTN_REVIEW_4,   callback_data="review:4"),
            ], [
                InlineKeyboardButton(BTN_REVIEW_WAIT, callback_data="review:wait"),
            ]])
            await context.bot.send_message(
                chat_id=row["chat_id"],
                text=MSG_REVIEW_REQUEST.format(platform=row["platform"]),
                parse_mode=ParseMode.HTML,
                reply_markup=keyboard,
            )
            shop_database.mark_review_sent(row["id"])
        except Exception as e:
            logger.warning("Review DM failed for user %s: %s", row.get("user_id"), e)
            shop_database.mark_review_sent(row["id"])  # mark as sent to avoid retry spam


# ─── /status — סיכום כל ה-Agents ─────────────────────────────────────────────

def _admin_only(func):
    """Decorator — מתעלם ממשתמשים שאינם Admin."""
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if not update.effective_user or update.effective_user.id != ADMIN_ID:
            return
        await func(update, context)
    wrapper.__name__ = func.__name__
    return wrapper


@_admin_only
async def status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """מציג סיכום מצב כל 4 ה-Agents."""
    # Telegram Agent
    try:
        tg_stats  = tg_database.get_today_stats()
        tg_groups = tg_database.get_total_groups()
        tg_status = "⏸" if tg_database.is_paused() else "✅"
        tg_line = (
            f"{tg_status} <b>Telegram</b>  "
            f"קבוצות: {tg_stats.get('groups_found',0)} חדשות | "
            f"פוסטים: {tg_stats.get('posts_sent',0)} | "
            f"DB: {tg_groups} קבוצות"
        )
    except Exception as e:
        tg_line = f"⚠️ <b>Telegram</b>  שגיאה: {e}"

    # Instagram Agent
    try:
        ig_stats  = ig_database.get_today_stats()
        ig_total  = ig_database.get_total_users()
        ig_status = "⏸" if ig_database.is_paused() else "✅"
        ig_line = (
            f"{ig_status} <b>Instagram</b>  "
            f"משתמשים: {ig_stats.get('users_found',0)} | "
            f"הודעות: {ig_stats.get('dms_sent',0)} | "
            f"DB: {ig_total} משתמשים"
        )
    except Exception as e:
        ig_line = f"⚠️ <b>Instagram</b>  שגיאה: {e}"

    # Facebook Agent
    try:
        fb_stats  = fb_database.get_today_stats()
        fb_groups = fb_database.get_total_groups()
        fb_status = "⏸" if fb_database.is_paused() else "✅"
        fb_line = (
            f"{fb_status} <b>Facebook</b>  "
            f"קבוצות: {fb_stats.get('groups_found',0)} | "
            f"פוסטים: {fb_stats.get('posts_sent',0)} | "
            f"DB: {fb_groups} קבוצות"
        )
    except Exception as e:
        fb_line = f"⚠️ <b>Facebook</b>  שגיאה: {e}"

    # TikTok Agent
    try:
        tt_stats  = tt_database.get_today_stats()
        tt_status = "⏸" if tt_database.is_paused() else "✅"
        tt_line = (
            f"{tt_status} <b>TikTok</b>  "
            f"תגובות: {tt_stats.get('comments_sent',0)} | "
            f"עקיבות: {tt_stats.get('follows_sent',0)} | "
            f"וידאוים: {tt_stats.get('videos_posted',0)}"
        )
    except Exception as e:
        tt_line = f"⚠️ <b>TikTok</b>  שגיאה: {e}"

    text = (
        "📊 <b>SocialSniper — מצב כל ה-Agents היום</b>\n\n"
        f"{tg_line}\n"
        f"{ig_line}\n"
        f"{fb_line}\n"
        f"{tt_line}\n\n"
        "<i>לפירוט: /astats · /igstats · /fbstats · /ttstats</i>"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    if not BOT_TOKEN:
        logger.error(
            "BOT_TOKEN חסר!\n"
            "הגדר BOT_TOKEN ב-.env\n"
            "מקבלים מ-@BotFather בטלגרם"
        )
        sys.exit(1)

    logger.info("מאתחל SocialSniper Bot...")

    app = ApplicationBuilder().token(BOT_TOKEN).post_init(_on_startup).build()
    app.add_error_handler(_error_handler)

    # ── Customer handlers (לקוחות) ────────────────────────────────────────────
    for handler in get_shop_handlers():
        app.add_handler(handler)

    # ── Admin handlers (ניהול) ────────────────────────────────────────────────
    app.add_handler(CommandHandler("status",    status_handler))
    app.add_handler(CommandHandler("sale",      sale_handler))
    app.add_handler(CommandHandler("clearsale", clearsale_handler))
    app.add_handler(CommandHandler("analytics", analytics_handler))

    for handler in get_tg_admin_handlers():   # /astats /apause /aresume /agroups /aconfig
        app.add_handler(handler)

    for handler in get_ig_admin_handlers():   # /igstats /igpause /igresume /igconfig
        app.add_handler(handler)

    for handler in get_fb_admin_handlers():   # /fbstats /fbpause /fbresume /fbconfig
        app.add_handler(handler)

    for handler in get_tt_admin_handlers():   # /ttstats /ttpause /ttresume /ttconfig
        app.add_handler(handler)

    # ── Scheduled jobs ────────────────────────────────────────────────────────
    if app.job_queue:
        # Daily report at 09:00 Israel time
        app.job_queue.run_daily(
            callback=_daily_report_job,
            time=datetime.time(9, 0, 0, tzinfo=ISR_TZ),
            name="daily_report",
        )
        # Review follow-up: check every hour
        app.job_queue.run_repeating(
            callback=_send_pending_reviews_job,
            interval=3600,
            first=120,  # 2 minutes after startup
            name="review_sender",
        )

    logger.info(
        "SocialSniper Bot פעיל!\n"
        "  לקוחות: /start /menu /reviews /faq /guarantee /contact /help\n"
        "  Admin:   /status /sale /clearsale /analytics /astats /aab /atop\n"
        "           /igstats /fbstats /ttstats\n"
        "  לעצירה: Ctrl+C"
    )
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
