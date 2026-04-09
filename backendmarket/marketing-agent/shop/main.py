"""SocialSniper customer/admin bot entrypoint."""

import datetime
import io
import logging
import sys

import pytz
from telegram import BotCommand, BotCommandScopeChat, BotCommandScopeDefault, Update
from telegram.constants import ParseMode
from telegram.ext import Application, ApplicationBuilder, CommandHandler, ContextTypes

from . import database as shop_database
from .config import ADMIN_ID, BOT_TOKEN
from .handlers import get_shop_handlers
from .messages import BTN_REVIEW_4, BTN_REVIEW_5, BTN_REVIEW_WAIT, MSG_REVIEW_REQUEST

from tg.admin import get_tg_admin_handlers
from ig.admin import get_ig_admin_handlers
from fb.admin import get_fb_admin_handlers
from tt.admin import get_tt_admin_handlers
from ci.admin import get_ci_admin_handlers

import tg.database as tg_database
import ig.database as ig_database
import fb.database as fb_database
import tt.database as tt_database
import ci.database as ci_database

ISR_TZ = pytz.timezone("Asia/Jerusalem")

logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("bot.log", encoding="utf-8"),
    ],
)
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)


def _admin_only(func):
    """Restrict command handlers to ADMIN_ID only."""

    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE):
        if not update.effective_user or update.effective_user.id != ADMIN_ID:
            return
        await func(update, context)

    wrapper.__name__ = func.__name__
    return wrapper


async def _on_startup(app: Application) -> None:
    """Initialize DBs, register command menus, and notify admin."""
    shop_database.init_db()
    tg_database.init_db()
    ig_database.init_db()
    fb_database.init_db()
    tt_database.init_db()
    ci_database.init_db()

    customer_commands = [
        BotCommand("start", "התחלה"),
        BotCommand("menu", "תפריט שירותים"),
        BotCommand("reviews", "ביקורות"),
        BotCommand("faq", "שאלות נפוצות"),
        BotCommand("guarantee", "אחריות"),
        BotCommand("contact", "יצירת קשר"),
        BotCommand("help", "עזרה"),
    ]
    try:
        await app.bot.set_my_commands(customer_commands, scope=BotCommandScopeDefault())
    except Exception as e:
        logger.warning("Failed to set customer commands: %s", e)

    if ADMIN_ID:
        admin_commands = [
            BotCommand("status", "סטטוס כל הסוכנים"),
            BotCommand("analytics", "אנליטיקה"),
            BotCommand("cmds", "כל הפקודות"),
            BotCommand("pause_all", "השהה את כל הסוכנים"),
            BotCommand("resume_all", "הפעל את כל הסוכנים"),
            BotCommand("sale", "הפעל מבצע"),
            BotCommand("clearsale", "בטל מבצע"),
            BotCommand("ig", "סטטוס Instagram"),
            BotCommand("tg", "סטטוס Telegram"),
            BotCommand("fb", "סטטוס Facebook"),
            BotCommand("tt", "סטטוס TikTok"),
            BotCommand("ci", "סטטוס CI"),
            BotCommand("astats", "נתוני Telegram"),
            BotCommand("agroups", "קבוצות Telegram"),
            BotCommand("aab", "דוח A/B"),
            BotCommand("atop", "פוסטים מובילים"),
            BotCommand("adms", "היסטוריית DMs"),
            BotCommand("asentiment", "ניתוח סנטימנט"),
            BotCommand("acompetitor", "מתחרים שהתגלו"),
            BotCommand("aqual", "Lead Qualifier"),
            BotCommand("aconfig", "הגדרות Telegram"),
            BotCommand("apause", "השהה Telegram"),
            BotCommand("aresume", "הפעל Telegram"),
            BotCommand("igstats", "נתוני Instagram"),
            BotCommand("igconvo", "שיחות AI באינסטגרם"),
            BotCommand("iginsights", "IG Insights"),
            BotCommand("igaudio", "אודיו טרנדי"),
            BotCommand("igpeaktime", "שעת שיא לריל"),
            BotCommand("igconfig", "הגדרות Instagram"),
            BotCommand("igpause", "השהה Instagram"),
            BotCommand("igresume", "הפעל Instagram"),
            BotCommand("fbstats", "נתוני Facebook"),
            BotCommand("fbconfig", "הגדרות Facebook"),
            BotCommand("fbpause", "השהה Facebook"),
            BotCommand("fbresume", "הפעל Facebook"),
            BotCommand("ttstats", "נתוני TikTok"),
            BotCommand("ttconfig", "הגדרות TikTok"),
            BotCommand("ttpause", "השהה TikTok"),
            BotCommand("ttresume", "הפעל TikTok"),
            BotCommand("cistats", "נתוני CI"),
            BotCommand("cicompetitors", "מתחרי CI"),
            BotCommand("citargets", "מטרות CI"),
            BotCommand("ciconfig", "הגדרות CI"),
            BotCommand("cipause", "השהה CI"),
            BotCommand("ciresume", "הפעל CI"),
        ]
        try:
            await app.bot.set_my_commands(admin_commands, scope=BotCommandScopeChat(chat_id=ADMIN_ID))
        except Exception as e:
            logger.warning("Failed to set admin commands: %s", e)

        try:
            await app.bot.send_message(
                chat_id=ADMIN_ID,
                text=(
                    "✅ <b>SocialSniper Bot עלה בהצלחה</b>\n\n"
                    "כל הסוכנים מחוברים.\n"
                    "פקודות עיקריות: /status /cmds"
                ),
                parse_mode=ParseMode.HTML,
            )
        except Exception as e:
            logger.warning("Startup notification failed: %s", e)


async def _error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Catch unhandled exceptions and notify admin."""
    import traceback

    err = context.error
    logger.error("Unhandled exception:", exc_info=err)
    if ADMIN_ID and err is not None:
        tb = "".join(traceback.format_exception(type(err), err, err.__traceback__))
        try:
            await context.bot.send_message(
                chat_id=ADMIN_ID,
                text=f"⚠️ <b>Bot Error</b>\n\n<code>{tb[:1500]}</code>",
                parse_mode=ParseMode.HTML,
            )
        except Exception:
            pass


@_admin_only
async def sale_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
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
        await update.message.reply_text("הארגומנט האחרון חייב להיות מספר שעות (למשל 3)")  # type: ignore[union-attr]
        return

    text = " ".join(args[:-1])
    shop_database.set_sale(text, hours)
    await update.message.reply_text(  # type: ignore[union-attr]
        f"✅ <b>מבצע הופעל</b>\n{text}\nמשך: {hours:.0f} שעות",
        parse_mode=ParseMode.HTML,
    )


@_admin_only
async def clearsale_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    shop_database.clear_sale()
    await update.message.reply_text("המבצע בוטל.")  # type: ignore[union-attr]


@_admin_only
async def analytics_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    args = context.args or []
    days = int(args[0]) if args and args[0].isdigit() else 7
    days = max(1, min(days, 30))
    try:
        from .analytics import generate_analytics_report

        text = generate_analytics_report(days)
    except Exception as e:
        text = f"שגיאה ביצירת הדוח: <code>{e}</code>"
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


@_admin_only
async def cmds_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "📋 <b>פקודות אדמין</b>\n\n"
        "<b>כללי</b>\n"
        "/status /analytics /cmds /sale /clearsale\n"
        "/pause_all /resume_all\n\n"
        "<b>קיצורים</b>\n"
        "/tg /ig /fb /tt /ci\n\n"
        "<b>Telegram</b>\n"
        "/astats /agroups /aab /atop /adms /asentiment /acompetitor /aqual /aconfig /apause /aresume\n\n"
        "<b>Instagram</b>\n"
        "/igstats /igconvo /iginsights /igaudio /igpeaktime /igconfig /igpause /igresume\n\n"
        "<b>Facebook</b>\n"
        "/fbstats /fbconfig /fbpause /fbresume\n\n"
        "<b>TikTok</b>\n"
        "/ttstats /ttconfig /ttpause /ttresume\n\n"
        "<b>CI</b>\n"
        "/cistats /cicompetitors /citargets /ciconfig /cipause /ciresume"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


@_admin_only
async def pause_all_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    tg_database.set_paused(True)
    ig_database.set_paused(True)
    fb_database.set_paused(True)
    tt_database.set_paused(True)
    ci_database.set_paused(True)
    await update.message.reply_text(
        "⏸ <b>כל הסוכנים הושהו.</b>\nלהפעלה מחדש: /resume_all",
        parse_mode=ParseMode.HTML,
    )  # type: ignore[union-attr]


@_admin_only
async def resume_all_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    tg_database.set_paused(False)
    ig_database.set_paused(False)
    fb_database.set_paused(False)
    tt_database.set_paused(False)
    ci_database.set_paused(False)
    await update.message.reply_text(
        "✅ <b>כל הסוכנים חזרו לפעילות.</b>",
        parse_mode=ParseMode.HTML,
    )  # type: ignore[union-attr]


@_admin_only
async def quick_tg_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from tg.admin import astats_handler
    await astats_handler(update, context)


@_admin_only
async def quick_ig_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from ig.admin import igstats_handler
    await igstats_handler(update, context)


@_admin_only
async def quick_fb_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from fb.admin import fbstats_handler
    await fbstats_handler(update, context)


@_admin_only
async def quick_tt_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from tt.admin import ttstats_handler
    await ttstats_handler(update, context)


@_admin_only
async def quick_ci_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from ci.admin import cmd_cistats
    await cmd_cistats(update, context)


async def _daily_report_job(context: ContextTypes.DEFAULT_TYPE) -> None:
    if not ADMIN_ID:
        return
    try:
        from .report import generate_daily_report

        tg_stats = tg_database.get_today_stats()
        ig_stats = ig_database.get_today_stats()
        fb_stats = fb_database.get_today_stats()
        tt_stats = tt_database.get_today_stats()
        shop_stats = {
            "new_users": shop_database.get_new_users_today(),
            "order_intents": 0,
        }
        img_bytes = generate_daily_report(tg_stats, ig_stats, fb_stats, tt_stats, shop_stats)
        caption = "📊 <b>SocialSniper - דוח יומי</b>\n/status לפירוט"
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
                text=f"⚠️ הדוח היומי נכשל: <code>{e}</code>",
                parse_mode=ParseMode.HTML,
            )
        except Exception:
            pass


async def _send_pending_reviews_job(context: ContextTypes.DEFAULT_TYPE) -> None:
    from telegram import InlineKeyboardButton, InlineKeyboardMarkup

    pending = shop_database.get_pending_reviews()
    for row in pending:
        try:
            keyboard = InlineKeyboardMarkup(
                [
                    [
                        InlineKeyboardButton(BTN_REVIEW_5, callback_data="review:5"),
                        InlineKeyboardButton(BTN_REVIEW_4, callback_data="review:4"),
                    ],
                    [InlineKeyboardButton(BTN_REVIEW_WAIT, callback_data="review:wait")],
                ]
            )
            await context.bot.send_message(
                chat_id=row["chat_id"],
                text=MSG_REVIEW_REQUEST.format(platform=row["platform"]),
                parse_mode=ParseMode.HTML,
                reply_markup=keyboard,
            )
            shop_database.mark_review_sent(row["id"])
        except Exception as e:
            logger.warning("Review DM failed for user %s: %s", row.get("user_id"), e)
            shop_database.mark_review_sent(row["id"])


@_admin_only
async def status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    def _agent_icon(is_paused: bool) -> str:
        return "⏸" if is_paused else "✅"

    try:
        tg_stats = tg_database.get_today_stats()
        tg_groups = tg_database.get_total_groups()
        tg_line = (
            f"{_agent_icon(tg_database.is_paused())} <b>Telegram</b> | "
            f"קבוצות חדשות: {tg_stats.get('groups_found', 0)} | "
            f"פוסטים: {tg_stats.get('posts_sent', 0)} | "
            f"סה""כ קבוצות ב-DB: {tg_groups}"
        )
    except Exception as e:
        tg_line = f"⚠️ <b>Telegram</b> | שגיאה: {e}"

    try:
        ig_stats = ig_database.get_today_stats()
        ig_total = ig_database.get_total_users()
        ig_line = (
            f"{_agent_icon(ig_database.is_paused())} <b>Instagram</b> | "
            f"משתמשים: {ig_stats.get('users_found', 0)} | "
            f"DMs: {ig_stats.get('dms_sent', 0)} | "
            f"סה""כ ב-DB: {ig_total}"
        )
    except Exception as e:
        ig_line = f"⚠️ <b>Instagram</b> | שגיאה: {e}"

    try:
        fb_stats = fb_database.get_today_stats()
        fb_groups = fb_database.get_total_groups()
        fb_line = (
            f"{_agent_icon(fb_database.is_paused())} <b>Facebook</b> | "
            f"קבוצות: {fb_stats.get('groups_found', 0)} | "
            f"פוסטים: {fb_stats.get('posts_sent', 0)} | "
            f"סה""כ ב-DB: {fb_groups}"
        )
    except Exception as e:
        fb_line = f"⚠️ <b>Facebook</b> | שגיאה: {e}"

    try:
        tt_stats = tt_database.get_today_stats()
        tt_line = (
            f"{_agent_icon(tt_database.is_paused())} <b>TikTok</b> | "
            f"תגובות: {tt_stats.get('comments_sent', 0)} | "
            f"מעקבים: {tt_stats.get('follows_sent', 0)} | "
            f"וידאוים: {tt_stats.get('videos_posted', 0)}"
        )
    except Exception as e:
        tt_line = f"⚠️ <b>TikTok</b> | שגיאה: {e}"

    try:
        ci_stats = ci_database.get_today_stats()
        ci_line = (
            f"{_agent_icon(ci_database.is_paused())} <b>CI</b> | "
            f"מטרות: {ci_stats.get('found', 0)} | DMs: {ci_stats.get('dms_sent', 0)}"
        )
    except Exception as e:
        ci_line = f"⚠️ <b>CI</b> | שגיאה: {e}"

    text = (
        "📊 <b>SocialSniper - סטטוס סוכנים</b>\n\n"
        f"{tg_line}\n"
        f"{ig_line}\n"
        f"{fb_line}\n"
        f"{tt_line}\n"
        f"{ci_line}\n\n"
        "<i>פירוט: /astats /igstats /fbstats /ttstats /cistats</i>"
    )
    await update.message.reply_text(text, parse_mode=ParseMode.HTML)  # type: ignore[union-attr]


def main() -> None:
    if not BOT_TOKEN:
        logger.error("BOT_TOKEN is missing. Set BOT_TOKEN in .env (from @BotFather)")
        sys.exit(1)

    logger.info("Starting SocialSniper Bot...")

    app = ApplicationBuilder().token(BOT_TOKEN).post_init(_on_startup).build()
    app.add_error_handler(_error_handler)

    for handler in get_shop_handlers():
        app.add_handler(handler)

    app.add_handler(CommandHandler("status", status_handler))
    app.add_handler(CommandHandler("sale", sale_handler))
    app.add_handler(CommandHandler("clearsale", clearsale_handler))
    app.add_handler(CommandHandler("analytics", analytics_handler))
    app.add_handler(CommandHandler("cmds", cmds_handler))
    app.add_handler(CommandHandler("pause_all", pause_all_handler))
    app.add_handler(CommandHandler("resume_all", resume_all_handler))

    app.add_handler(CommandHandler("tg", quick_tg_handler))
    app.add_handler(CommandHandler("ig", quick_ig_handler))
    app.add_handler(CommandHandler("fb", quick_fb_handler))
    app.add_handler(CommandHandler("tt", quick_tt_handler))
    app.add_handler(CommandHandler("ci", quick_ci_handler))

    for handler in get_tg_admin_handlers():
        app.add_handler(handler)
    for handler in get_ig_admin_handlers():
        app.add_handler(handler)
    for handler in get_fb_admin_handlers():
        app.add_handler(handler)
    for handler in get_tt_admin_handlers():
        app.add_handler(handler)
    for handler in get_ci_admin_handlers():
        app.add_handler(handler)

    if app.job_queue:
        app.job_queue.run_daily(
            callback=_daily_report_job,
            time=datetime.time(9, 0, 0, tzinfo=ISR_TZ),
            name="daily_report",
        )
        app.job_queue.run_repeating(
            callback=_send_pending_reviews_job,
            interval=3600,
            first=120,
            name="review_sender",
        )

    logger.info(
        "SocialSniper Bot is running.\n"
        "  Customer: /start /menu /reviews /faq /guarantee /contact /help\n"
        "  Admin: /cmds /status /pause_all /resume_all /sale /clearsale /analytics\n"
        "  Shortcuts: /tg /ig /fb /tt /ci\n"
        "  Stop: Ctrl+C"
    )
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
