"""
SocialSniper — Instagram Marketing Agent
Runs two parallel loops:
  1. Instagrapi client  → comment + DM outreach + daily Reel post
  2. python-telegram-bot → admin commands (/igstats, /igpause, etc.)

Schedule (Israel time):
  09:30 — post daily Reel
  11:00 — comment session (12 comments)
  14:00 — DM session (7 DMs)
  16:30 — comment session (10 comments)
  19:00 — DM session (6 DMs)
"""
import asyncio
import logging
import sys
import time
from instagrapi import Client
from instagrapi.exceptions import (
    ChallengeRequired, LoginRequired,
    FeedbackRequired, PleaseWaitFewMinutes,
)
from telegram.ext import Application
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from .config import (
    IG_USERNAME, IG_PASSWORD,
    BOT_TOKEN, ADMIN_ID,
    IG_SESSION_FILE, TIMEZONE,
)
from .database import init_db, is_paused, set_paused
from .outreach import run_comment_session, run_dm_session
from .content import post_daily_reel
from .admin import get_ig_admin_handlers

logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("ig_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Instagrapi login ─────────────────────────────────────────────────────────

def _login(cl: Client) -> None:
    """
    Login to Instagram.
    Loads saved session first; falls back to fresh login.
    Saves session after successful login.
    """
    import os
    import json

    if os.path.exists(IG_SESSION_FILE):
        try:
            cl.load_settings(IG_SESSION_FILE)
            cl.login(IG_USERNAME, IG_PASSWORD)
            logger.info("Logged in from saved session.")
            return
        except Exception as e:
            logger.warning("Session load failed (%s) — fresh login...", e)

    # Fresh login
    cl.login(IG_USERNAME, IG_PASSWORD)
    cl.dump_settings(IG_SESSION_FILE)
    logger.info("Fresh login successful. Session saved.")


# ─── Admin bot notification helper ───────────────────────────────────────────

async def _notify_admin(bot_app: Application, text: str) -> None:
    """Send a message to ADMIN_ID via the Telegram bot."""
    if bot_app and ADMIN_ID:
        try:
            await bot_app.bot.send_message(chat_id=ADMIN_ID, text=text)
        except Exception as e:
            logger.error("Failed to notify admin: %s", e)


# ─── Scheduled job wrappers ───────────────────────────────────────────────────

def job_post_reel(cl: Client) -> None:
    logger.info("=== Daily Reel job started ===")
    success = post_daily_reel(cl)
    logger.info("=== Daily Reel job done: %s ===", "posted" if success else "failed")


def job_comment_session(cl: Client, limit: int, bot_app) -> None:
    logger.info("=== Comment session started (limit=%d) ===", limit)
    sent = run_comment_session(cl, limit)
    logger.info("=== Comment session done: %d comments ===", sent)


def job_dm_session(cl: Client, limit: int, bot_app) -> None:
    logger.info("=== DM session started (limit=%d) ===", limit)
    sent = run_dm_session(cl, limit)
    logger.info("=== DM session done: %d DMs ===", sent)


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    # Init DB
    init_db()

    # Validate credentials
    if not IG_USERNAME or not IG_PASSWORD:
        logger.error(
            "Missing Instagram credentials.\n"
            "Set IG_USERNAME and IG_PASSWORD in .env"
        )
        return

    tz = pytz.timezone(TIMEZONE)

    # ── Instagrapi client ─────────────────────────────────────────────────────
    cl = Client()
    cl.delay_range = [2, 5]     # built-in polite delay between API calls

    try:
        _login(cl)
    except ChallengeRequired:
        logger.error(
            "Instagram requires a challenge (captcha / SMS verification).\n"
            "Open the app on your phone, complete verification, then restart."
        )
        return
    except LoginRequired as e:
        logger.error("Login failed: %s", e)
        return
    except Exception as e:
        logger.error("Could not login to Instagram: %s", e)
        return

    logger.info("Instagram client connected as @%s", IG_USERNAME)

    # ── python-telegram-bot (admin commands) ─────────────────────────────────
    bot_app: Application | None = None
    if BOT_TOKEN:
        bot_app = Application.builder().token(BOT_TOKEN).build()
        for handler in get_ig_admin_handlers():
            bot_app.add_handler(handler)
        await bot_app.initialize()
        await bot_app.start()
        await bot_app.updater.start_polling()   # type: ignore[union-attr]
        logger.info("Instagram admin bot started (polling).")
    else:
        logger.warning("BOT_TOKEN not set — admin commands disabled.")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(timezone=tz)

    # 09:30 — Daily Reel
    scheduler.add_job(
        job_post_reel, "cron", hour=9, minute=30,
        args=[cl], id="ig_daily_reel",
    )

    # 11:00 — Comment session (12 comments)
    scheduler.add_job(
        job_comment_session, "cron", hour=11, minute=0,
        args=[cl, 12, bot_app], id="ig_comment_1",
    )

    # 14:00 — DM session (7 DMs)
    scheduler.add_job(
        job_dm_session, "cron", hour=14, minute=0,
        args=[cl, 7, bot_app], id="ig_dm_1",
    )

    # 16:30 — Comment session (10 comments)
    scheduler.add_job(
        job_comment_session, "cron", hour=16, minute=30,
        args=[cl, 10, bot_app], id="ig_comment_2",
    )

    # 19:00 — DM session (6 DMs)
    scheduler.add_job(
        job_dm_session, "cron", hour=19, minute=0,
        args=[cl, 6, bot_app], id="ig_dm_2",
    )

    scheduler.start()
    logger.info(
        "Scheduler started.\n"
        "  09:30 — Daily Reel\n"
        "  11:00 — Comment session (12)\n"
        "  14:00 — DM session (7)\n"
        "  16:30 — Comment session (10)\n"
        "  19:00 — DM session (6)\n"
        "  (Israel time)"
    )

    # ── Keep alive ────────────────────────────────────────────────────────────
    try:
        logger.info("Instagram Agent is running. Press Ctrl+C to stop.")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        logger.info("Shutting down...")
    finally:
        scheduler.shutdown(wait=False)
        if bot_app:
            await bot_app.updater.stop()    # type: ignore[union-attr]
            await bot_app.stop()
            await bot_app.shutdown()
        logger.info("Instagram Agent stopped cleanly.")


if __name__ == "__main__":
    asyncio.run(main())
