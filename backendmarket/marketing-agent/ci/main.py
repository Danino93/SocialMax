"""
ci/main.py — Competitor Infiltrator Agent — Main Runner
מריץ שני loops מקבילים:
  1. Scheduler — סריקת מתחרים + שליחת DMs
  2. Admin bot — /cistats, /cipause, /ciresume, etc.

הפעלה:
  python -m ci.main

לוג: logs/ci_agent.log
"""
import asyncio
import logging
import sys
from datetime import datetime

import pytz
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from telethon import TelegramClient
from telegram.ext import Application

from .config import (
    TELE_API_ID, TELE_API_HASH, TELE_PHONE, CI_SESSION_NAME,
    IG_USERNAME, IG_PASSWORD, IG_SESSION_FILE,
    BOT_TOKEN, ADMIN_ID,
    CI_SCAN_INTERVAL_HOURS,
    CI_COMPETITORS_TG, CI_COMPETITORS_IG,
    TIMEZONE, validate_config,
)
from .database import init_db, is_paused
from .monitor import run_full_scan
from .responder import run_response_session
from .admin import get_ci_admin_handlers

# ─── Logging ──────────────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("logs/ci_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Clients ──────────────────────────────────────────────────────────────────

async def _init_tg_client() -> TelegramClient | None:
    """יוצר ומחבר Telethon client אם יש credentials."""
    if not CI_COMPETITORS_TG:
        return None
    if not (TELE_API_ID and TELE_API_HASH and TELE_PHONE):
        logger.warning("[CI] Missing Telethon credentials — TG scanning disabled")
        return None
    try:
        client = TelegramClient(
            CI_SESSION_NAME,
            int(TELE_API_ID),
            TELE_API_HASH,
        )
        await client.start(phone=TELE_PHONE)
        logger.info("[CI] Telethon client connected")
        return client
    except Exception as e:
        logger.error("[CI] Telethon connect failed: %s", e)
        return None


def _init_ig_client():
    """יוצר ומחבר Instagrapi client אם יש credentials."""
    if not CI_COMPETITORS_IG:
        return None
    if not (IG_USERNAME and IG_PASSWORD):
        logger.warning("[CI] Missing Instagram credentials — IG scanning disabled")
        return None
    try:
        import os
        from instagrapi import Client
        cl = Client()
        cl.delay_range = [2, 5]
        if os.path.exists(IG_SESSION_FILE):
            try:
                cl.load_settings(IG_SESSION_FILE)
                cl.login(IG_USERNAME, IG_PASSWORD)
                logger.info("[CI] Instagram client connected (from session)")
                return cl
            except Exception:
                logger.warning("[CI] IG session load failed — fresh login...")
        cl.login(IG_USERNAME, IG_PASSWORD)
        cl.dump_settings(IG_SESSION_FILE)
        logger.info("[CI] Instagram client connected (fresh login)")
        return cl
    except Exception as e:
        logger.error("[CI] Instagram connect failed: %s", e)
        return None


# ─── Scheduled jobs ───────────────────────────────────────────────────────────

async def job_scan(tg_client, ig_client) -> None:
    """סריקת מתחרים — מופעל לפי CI_SCAN_INTERVAL_HOURS."""
    if is_paused():
        logger.info("[CI] Agent paused — skipping scan")
        return
    logger.info("[CI] === Scan job started ===")
    found = await run_full_scan(tg_client=tg_client, ig_client=ig_client)
    logger.info("[CI] === Scan job done: %d new targets ===", found)


async def job_respond(tg_client, ig_client) -> None:
    """שליחת DMs למטרות ממתינות — מופעל כל שעה."""
    if is_paused():
        logger.info("[CI] Agent paused — skipping response session")
        return
    logger.info("[CI] === Response job started ===")
    sent = await run_response_session(
        tg_client=tg_client,
        ig_client=ig_client,
        limit=3,  # עד 3 DMs בכל ריצה של שעה (נשמר בלימיט היומי)
    )
    logger.info("[CI] === Response job done: %d DMs sent ===", sent)


async def _notify_admin(bot_app: Application, text: str) -> None:
    """שולח הודעה ל-ADMIN_ID."""
    if bot_app and ADMIN_ID:
        try:
            await bot_app.bot.send_message(chat_id=ADMIN_ID, text=text)
        except Exception as e:
            logger.error("[CI] Failed to notify admin: %s", e)


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    # אתחול DB
    import os
    os.makedirs("logs", exist_ok=True)
    init_db()

    # Validation
    errors = validate_config()
    if errors:
        for err in errors:
            logger.error("[CI] Config error: %s", err)
        logger.warning("[CI] Agent starting with configuration warnings — some features may be disabled")

    tz = pytz.timezone(TIMEZONE)

    # ── Clients ───────────────────────────────────────────────────────────────
    tg_client = await _init_tg_client()
    ig_client = _init_ig_client()

    if not tg_client and not ig_client:
        logger.error("[CI] No clients available — cannot run CI agent. Set credentials in .env")
        return

    # ── Admin bot ─────────────────────────────────────────────────────────────
    bot_app: Application | None = None
    if BOT_TOKEN:
        bot_app = Application.builder().token(BOT_TOKEN).build()
        for handler in get_ci_admin_handlers():
            bot_app.add_handler(handler)
        await bot_app.initialize()
        await bot_app.start()
        await bot_app.updater.start_polling()  # type: ignore[union-attr]
        logger.info("[CI] Admin bot started")
    else:
        logger.warning("[CI] BOT_TOKEN not set — admin commands disabled")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(timezone=tz)

    # סריקת מתחרים — כל X שעות
    scheduler.add_job(
        job_scan,
        "interval",
        hours=CI_SCAN_INTERVAL_HOURS,
        args=[tg_client, ig_client],
        id="ci_scan",
        next_run_time=datetime.now(tz),  # רץ מיד בהתחלה
    )

    # שליחת DMs — כל שעה
    scheduler.add_job(
        job_respond,
        "interval",
        hours=1,
        args=[tg_client, ig_client],
        id="ci_respond",
    )

    scheduler.start()
    logger.info(
        "[CI] Competitor Infiltrator Agent started ✓\n"
        "  Scan interval: every %d hours\n"
        "  Response interval: every 1 hour\n"
        "  Telegram competitors: %s\n"
        "  Instagram competitors: %s\n"
        "  Use /cistats, /cipause, /ciresume to control",
        CI_SCAN_INTERVAL_HOURS,
        CI_COMPETITORS_TG or "none",
        CI_COMPETITORS_IG or "none",
    )

    # הודעת אתחול ל-admin
    if bot_app:
        await _notify_admin(
            bot_app,
            f"🕵️ Competitor Infiltrator Agent הופעל!\n"
            f"מנטר: {len(CI_COMPETITORS_TG)} TG channels, {len(CI_COMPETITORS_IG)} IG accounts\n"
            f"סריקה כל {CI_SCAN_INTERVAL_HOURS} שעות"
        )

    # ── Keep alive ────────────────────────────────────────────────────────────
    try:
        logger.info("[CI] Agent running. Press Ctrl+C to stop.")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        logger.info("[CI] Shutting down...")
    finally:
        scheduler.shutdown(wait=False)
        if tg_client:
            await tg_client.disconnect()
        if bot_app:
            await bot_app.updater.stop()  # type: ignore[union-attr]
            await bot_app.stop()
            await bot_app.shutdown()
        logger.info("[CI] Competitor Infiltrator Agent stopped cleanly.")


if __name__ == "__main__":
    asyncio.run(main())
