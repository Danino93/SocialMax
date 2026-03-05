"""
SocialSniper — TikTok Marketing Agent
מריץ שני לולאות מקביליות:
  1. Playwright browser  → גילוי hashtags + תגובות + עקיבות + העלאת וידאו
  2. python-telegram-bot → פקודות Admin (/ttstats, /ttpause, /ttresume, /ttconfig)

לוח זמנים (שעון ישראל):
  09:00 — העלאת וידאו (grok-video.mp4) לחשבון שלנו
  10:00 — גילוי hashtags (3 hashtags)
  11:00 — סשן תגובות #1 (10 תגובות)
  14:30 — סשן עקיבות (15 follows)
  17:00 — סשן תגובות #2 (8 תגובות)
  20:00 — סשן תגובות #3 (5 תגובות)

⚠️  TikTok הכי מחמירה — הפעל בחשבון ייעודי בלבד!
     בפעם הראשונה: הפעל עם headless=False כדי לאשר login ידנית.
"""
import asyncio
import logging
import sys
from playwright.async_api import async_playwright
from telegram.ext import Application
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from .config import (
    TT_USERNAME, TT_PASSWORD,
    BOT_TOKEN, ADMIN_ID,
    TIMEZONE,
)
from .database import init_db
from .browser import create_browser, get_context, save_session, ensure_logged_in
from .discovery import run_discovery_session
from .outreach import run_comment_session, run_follow_session
from .content import post_daily_video
from .admin import get_tt_admin_handlers

# ─── לוגינג ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("tt_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Admin notification helper ────────────────────────────────────────────────

async def _notify_admin(bot_app: Application, text: str) -> None:
    """שולח הודעה ל-Admin דרך הבוט."""
    if bot_app and ADMIN_ID:
        try:
            await bot_app.bot.send_message(chat_id=ADMIN_ID, text=text)
        except Exception as e:
            logger.error("שגיאה בשליחת הודעה לAdmin: %s", e)


# ─── Scheduled job wrappers ───────────────────────────────────────────────────

async def job_upload_video(page, bot_app) -> None:
    """09:00 — העלאת וידאו יומי לחשבון שלנו."""
    logger.info("=== TikTok Video Upload התחיל ===")
    success = await post_daily_video(page)
    logger.info("=== TikTok Video Upload הסתיים: %s ===", "הצליח" if success else "נכשל/דולג")
    if not success:
        await _notify_admin(bot_app, "⚠️ TikTok — העלאת וידאו נכשלה. בדוק tt_agent.log")


async def job_discover(page, bot_app) -> None:
    """10:00 — גילוי hashtags."""
    logger.info("=== TikTok Discovery התחיל ===")
    found = await run_discovery_session(page, num_hashtags=3)
    logger.info("=== TikTok Discovery הסתיים: %d רשומות חדשות ===", found)


async def job_comment(page, limit: int) -> None:
    """סשן תגובות."""
    logger.info("=== TikTok Comment session התחיל (limit=%d) ===", limit)
    sent = await run_comment_session(page, limit)
    logger.info("=== TikTok Comment session הסתיים: %d תגובות ===", sent)


async def job_follow(page, limit: int) -> None:
    """סשן עקיבות."""
    logger.info("=== TikTok Follow session התחיל (limit=%d) ===", limit)
    sent = await run_follow_session(page, limit)
    logger.info("=== TikTok Follow session הסתיים: %d עקיבות ===", sent)


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    # אתחול DB
    init_db()

    # בדיקת פרטי חיבור
    if not TT_USERNAME or not TT_PASSWORD:
        logger.error(
            "פרטי TikTok חסרים!\n"
            "הגדר TT_USERNAME ו-TT_PASSWORD ב-.env"
        )
        return

    tz = pytz.timezone(TIMEZONE)

    # ── python-telegram-bot (Admin commands) ──────────────────────────────────
    bot_app: Application | None = None
    if BOT_TOKEN:
        bot_app = Application.builder().token(BOT_TOKEN).build()
        for handler in get_tt_admin_handlers():
            bot_app.add_handler(handler)
        await bot_app.initialize()
        await bot_app.start()
        await bot_app.updater.start_polling()   # type: ignore[union-attr]
        logger.info("TikTok admin bot התחיל (polling).")
    else:
        logger.warning("BOT_TOKEN לא מוגדר — פקודות Admin מושבתות")

    # ── Playwright browser setup ──────────────────────────────────────────────
    playwright_ctx = await async_playwright().__aenter__()
    browser  = await create_browser(playwright_ctx, headless=True)
    context  = await get_context(browser)
    page     = await context.new_page()

    # בדיקת / ביצוע Login
    logged_in = await ensure_logged_in(page, TT_USERNAME, TT_PASSWORD)
    if not logged_in:
        logger.error(
            "כניסה לTikTok נכשלה!\n"
            "בדוק TT_USERNAME + TT_PASSWORD ב-.env\n"
            "אם TikTok מציגה CAPTCHA — הפעל עם headless=False לכניסה ידנית:\n"
            "  שנה בtt_main.py: create_browser(playwright_ctx, headless=False)"
        )
        await browser.close()
        await playwright_ctx.__aexit__(None, None, None)
        return

    # שמור cookies אחרי login מוצלח
    await save_session(context)
    logger.info("TikTok browser session מוכן ✓")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(timezone=tz)

    # 09:00 — העלאת וידאו יומי
    scheduler.add_job(
        job_upload_video, "cron", hour=9, minute=0,
        args=[page, bot_app], id="tt_upload",
    )

    # 10:00 — גילוי hashtags (3)
    scheduler.add_job(
        job_discover, "cron", hour=10, minute=0,
        args=[page, bot_app], id="tt_discover",
    )

    # 11:00 — תגובות #1 (10)
    scheduler.add_job(
        job_comment, "cron", hour=11, minute=0,
        args=[page, 10], id="tt_comment_1",
    )

    # 14:30 — עקיבות (15)
    scheduler.add_job(
        job_follow, "cron", hour=14, minute=30,
        args=[page, 15], id="tt_follow",
    )

    # 17:00 — תגובות #2 (8)
    scheduler.add_job(
        job_comment, "cron", hour=17, minute=0,
        args=[page, 8], id="tt_comment_2",
    )

    # 20:00 — תגובות #3 (5)
    scheduler.add_job(
        job_comment, "cron", hour=20, minute=0,
        args=[page, 5], id="tt_comment_3",
    )

    scheduler.start()
    logger.info(
        "Scheduler התחיל.\n"
        "  09:00 — העלאת וידאו\n"
        "  10:00 — גילוי hashtags (3)\n"
        "  11:00 — תגובות #1 (10)\n"
        "  14:30 — עקיבות (15)\n"
        "  17:00 — תגובות #2 (8)\n"
        "  20:00 — תגובות #3 (5)\n"
        "  (שעון ישראל)"
    )

    # ── Keep alive ────────────────────────────────────────────────────────────
    try:
        logger.info("TikTok Agent רץ. לעצירה: Ctrl+C")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        logger.info("מכבה...")
    finally:
        scheduler.shutdown(wait=False)
        if bot_app:
            await bot_app.updater.stop()    # type: ignore[union-attr]
            await bot_app.stop()
            await bot_app.shutdown()
        await browser.close()
        await playwright_ctx.__aexit__(None, None, None)
        logger.info("TikTok Agent נכבה בצורה נקייה.")


if __name__ == "__main__":
    asyncio.run(main())
