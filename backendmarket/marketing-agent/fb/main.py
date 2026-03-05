"""
SocialSniper — Facebook Marketing Agent
Runs two parallel loops:
  1. Playwright browser  → discover groups + post + comment + DMs
  2. python-telegram-bot → admin commands (/fbstats, /fbpause, etc.)

Schedule (Israel time):
  10:00 — group discovery (3 keywords)
  10:30 — post to our Facebook Page (Graph API)
  13:00 — comment session (4 comments in groups)
  16:00 — group posting session (1-2 group posts)
  19:30 — Messenger DM session (3 DMs)
"""
import asyncio
import logging
import sys
from playwright.async_api import async_playwright
from telegram.ext import Application
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from .config import (
    FB_EMAIL, FB_PASSWORD,
    BOT_TOKEN, ADMIN_ID,
    TIMEZONE,
)
from .database import init_db
from .browser import create_browser, get_context, save_session, ensure_logged_in
from .groups import run_discovery_session, run_group_posting_session
from .outreach import run_comment_session, run_dm_session
from .page import post_daily_to_page
from .admin import get_fb_admin_handlers

logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("fb_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Admin notification helper ────────────────────────────────────────────────

async def _notify_admin(bot_app: Application, text: str) -> None:
    if bot_app and ADMIN_ID:
        try:
            await bot_app.bot.send_message(chat_id=ADMIN_ID, text=text)
        except Exception as e:
            logger.error("Failed to notify admin: %s", e)


# ─── Scheduled job wrappers ───────────────────────────────────────────────────

async def job_discover(page, bot_app) -> None:
    logger.info("=== FB Group Discovery started ===")
    found = await run_discovery_session(page, num_keywords=3)
    logger.info("=== FB Discovery done: %d new groups ===", found)


async def job_page_post(bot_app) -> None:
    logger.info("=== FB Page post started ===")
    success = post_daily_to_page()
    logger.info("=== FB Page post done: %s ===", "posted" if success else "failed/skipped")
    if not success:
        await _notify_admin(bot_app, "⚠️ Facebook Page post failed — check FB_PAGE_ACCESS_TOKEN")


async def job_comment(page, limit: int) -> None:
    logger.info("=== FB Comment session started (limit=%d) ===", limit)
    sent = await run_comment_session(page, limit)
    logger.info("=== FB Comment session done: %d ===", sent)


async def job_group_post(page) -> None:
    logger.info("=== FB Group posting session started ===")
    sent = await run_group_posting_session(page)
    logger.info("=== FB Group posting done: %d ===", sent)


async def job_dm(page, limit: int) -> None:
    logger.info("=== FB Messenger DM session started (limit=%d) ===", limit)
    sent = await run_dm_session(page, limit)
    logger.info("=== FB DM session done: %d ===", sent)


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    # Init DB
    init_db()

    # Validate credentials
    if not FB_EMAIL or not FB_PASSWORD:
        logger.error(
            "Missing Facebook credentials.\n"
            "Set FB_EMAIL and FB_PASSWORD in .env"
        )
        return

    tz = pytz.timezone(TIMEZONE)

    # ── python-telegram-bot (admin commands) ─────────────────────────────────
    bot_app: Application | None = None
    if BOT_TOKEN:
        bot_app = Application.builder().token(BOT_TOKEN).build()
        for handler in get_fb_admin_handlers():
            bot_app.add_handler(handler)
        await bot_app.initialize()
        await bot_app.start()
        await bot_app.updater.start_polling()   # type: ignore[union-attr]
        logger.info("Facebook admin bot started (polling).")
    else:
        logger.warning("BOT_TOKEN not set — admin commands disabled.")

    # ── Playwright browser setup ──────────────────────────────────────────────
    playwright_ctx = await async_playwright().__aenter__()
    browser  = await create_browser(playwright_ctx)
    context  = await get_context(browser)
    page     = await context.new_page()

    # Login / verify session
    logged_in = await ensure_logged_in(page, FB_EMAIL, FB_PASSWORD)
    if not logged_in:
        logger.error(
            "Failed to log in to Facebook.\n"
            "Check FB_EMAIL and FB_PASSWORD in .env\n"
            "If Facebook shows a challenge, login manually and export cookies."
        )
        await browser.close()
        await playwright_ctx.__aexit__(None, None, None)
        return

    # Save cookies after successful login
    await save_session(context)
    logger.info("Facebook browser session ready.")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(timezone=tz)

    # 10:00 — Group discovery
    scheduler.add_job(
        job_discover, "cron", hour=10, minute=0,
        args=[page, bot_app], id="fb_discover",
    )

    # 10:30 — Page post (Graph API — no browser needed)
    scheduler.add_job(
        job_page_post, "cron", hour=10, minute=30,
        args=[bot_app], id="fb_page_post",
    )

    # 13:00 — Comment session (4 comments)
    scheduler.add_job(
        job_comment, "cron", hour=13, minute=0,
        args=[page, 4], id="fb_comment_1",
    )

    # 16:00 — Group post session
    scheduler.add_job(
        job_group_post, "cron", hour=16, minute=0,
        args=[page], id="fb_group_post",
    )

    # 19:30 — DM session (3 DMs)
    scheduler.add_job(
        job_dm, "cron", hour=19, minute=30,
        args=[page, 3], id="fb_dm",
    )

    scheduler.start()
    logger.info(
        "Scheduler started.\n"
        "  10:00 — Group discovery\n"
        "  10:30 — Page post (Graph API)\n"
        "  13:00 — Comment session (4)\n"
        "  16:00 — Group posting session\n"
        "  19:30 — Messenger DM session (3)\n"
        "  (Israel time)"
    )

    # ── Keep alive ────────────────────────────────────────────────────────────
    try:
        logger.info("Facebook Agent is running. Press Ctrl+C to stop.")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Shutting down...")
    finally:
        scheduler.shutdown(wait=False)
        if bot_app:
            await bot_app.updater.stop()    # type: ignore[union-attr]
            await bot_app.stop()
            await bot_app.shutdown()
        await browser.close()
        await playwright_ctx.__aexit__(None, None, None)
        logger.info("Facebook Agent stopped cleanly.")


if __name__ == "__main__":
    asyncio.run(main())
