"""Telegram marketing agent scheduler and runtime."""

import asyncio
import logging
import sys

import pytz
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from telethon import TelegramClient

from . import monitor
from . import qualifier
from .config import (
    CI_COMPETITORS_TG,
    MAX_NEW_GROUPS_PER_DAY,
    SESSION_NAME,
    TELE_API_HASH,
    TELE_API_ID,
    TELE_PHONE,
    TIMEZONE,
)
from .database import init_db
from .engager import run_engagement_session
from .poster import run_posting_session
from .scraper import run_scraper_session
from .search import find_groups

logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("tg_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


async def job_discover(client: TelegramClient) -> None:
    """Run group discovery job."""
    logger.info("=== Telegram Group Discovery started ===")
    found = await find_groups(client, daily_limit=MAX_NEW_GROUPS_PER_DAY)
    logger.info("=== Discovery finished: %d new groups ===", found)


async def job_posting_session(client: TelegramClient) -> None:
    """Run posting session."""
    logger.info("=== Telegram Posting session started ===")
    try:
        sent = await run_posting_session(client)
        logger.info("=== Posting session finished: %d posts ===", sent)
    except asyncio.CancelledError:
        logger.info("Posting session cancelled during shutdown.")


def _parse_competitor_ids(raw: str) -> list[int]:
    """Parse comma-separated competitor IDs to int list."""
    if not raw:
        return []
    result: list[int] = []
    for part in raw.split(","):
        part = part.strip().lstrip("@")
        try:
            result.append(int(part))
        except ValueError:
            continue
    return result


async def run_tg_agent() -> None:
    """Run Telegram agent without the admin bot poller."""
    init_db()

    if not TELE_API_ID or not TELE_API_HASH or not TELE_PHONE:
        logger.error(
            "Missing Telethon credentials. "
            "Set TELE_API_ID, TELE_API_HASH, TELE_PHONE in .env"
        )
        return

    tz = pytz.timezone(TIMEZONE)

    telethon_client = TelegramClient(SESSION_NAME, TELE_API_ID, TELE_API_HASH)
    await telethon_client.start(phone=TELE_PHONE)
    logger.info("Telethon client connected")

    competitor_ids = _parse_competitor_ids(CI_COMPETITORS_TG)
    monitor.register_handlers(telethon_client, competitor_ids)
    logger.info("Monitor handlers registered")

    qualifier.register_handler(telethon_client)
    logger.info("Qualifier handler registered")

    scheduler = AsyncIOScheduler(
        timezone=tz,
        job_defaults={
            "coalesce": True,
            "misfire_grace_time": 120,
            "max_instances": 1,
        },
    )

    discover_slots = [(8, 0), (11, 0), (14, 0), (17, 0), (20, 0)]
    for idx, (h, m) in enumerate(discover_slots):
        scheduler.add_job(
            job_discover,
            "cron",
            hour=h,
            minute=m,
            id=f"tg_discover_{idx}",
            args=[telethon_client],
        )

    post_slots = [
        (7, 15), (8, 45), (10, 0), (11, 30), (13, 0), (14, 30),
        (16, 0), (17, 30), (19, 0), (20, 30), (22, 0),
    ]
    for idx, (h, m) in enumerate(post_slots):
        scheduler.add_job(
            job_posting_session,
            "cron",
            hour=h,
            minute=m,
            id=f"tg_post_{idx}",
            args=[telethon_client],
        )

    async def _job_scraper() -> None:
        await run_scraper_session(telethon_client)

    scraper_slots = [(9, 30), (12, 30), (15, 30), (18, 30), (21, 30)]
    for idx, (h, m) in enumerate(scraper_slots):
        scheduler.add_job(_job_scraper, "cron", hour=h, minute=m, id=f"tg_scraper_{idx}")

    async def _job_engage() -> None:
        await run_engagement_session(telethon_client)

    engage_slots = [
        (7, 45), (9, 0), (10, 30), (12, 0), (13, 30), (15, 0),
        (16, 30), (18, 0), (19, 30), (21, 0), (22, 30),
    ]
    for idx, (h, m) in enumerate(engage_slots):
        scheduler.add_job(_job_engage, "cron", hour=h, minute=m, id=f"tg_engage_{idx}")

    scheduler.start()
    logger.info(
        "Telegram Agent Scheduler started.\n"
        "  Discovery: 08:00, 11:00, 14:00, 17:00, 20:00\n"
        "  Posting: 11 slots between 07:15 and 22:00\n"
        "  Scraper DMs: 09:30, 12:30, 15:30, 18:30, 21:30\n"
        "  Engagement: 11 slots between 07:45 and 22:30\n"
        "  Monitor/Qualifier: always-on\n"
        "  Timezone: Asia/Jerusalem"
    )

    logger.info("Running initial discovery...")
    await job_discover(telethon_client)

    try:
        logger.info("Telegram Agent is running. Press Ctrl+C to stop.")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit, asyncio.CancelledError):
        logger.info("Shutting down Telegram Agent...")
    finally:
        scheduler.shutdown(wait=False)
        await telethon_client.disconnect()
        logger.info("Telegram Agent stopped cleanly.")


async def main() -> None:
    """Standalone entrypoint: python -m tg.main"""
    await run_tg_agent()


if __name__ == "__main__":
    asyncio.run(main())
