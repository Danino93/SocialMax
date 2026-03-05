"""
SocialSniper — Telegram Marketing Agent
מריץ Telethon user client לפרסום בקבוצות טלגרם.

לוח זמנים (שעון ישראל):
  09:00 — גילוי קבוצות חדשות
  11:00, 15:00, 19:00 — sessions פרסום

הפעלה עצמאית (standalone):
  python tg_main.py

הפעלה מ-bot.py (ללא בוט עצמאי):
  הקובץ bot.py מפעיל את run_tg_agent() — ראה bot.py
"""
import asyncio
import logging
import sys
from telethon import TelegramClient
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from .config import (
    TELE_API_ID, TELE_API_HASH, TELE_PHONE,
    SESSION_NAME, TIMEZONE,
    MAX_NEW_GROUPS_PER_DAY,
)
from .database import init_db
from .search import find_groups
from .poster import run_posting_session

# ─── לוגינג ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("tg_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


# ─── Scheduled jobs ───────────────────────────────────────────────────────────

async def job_discover(client: TelegramClient) -> None:
    """09:00 — גילוי קבוצות חדשות."""
    logger.info("=== Telegram Group Discovery התחיל ===")
    found = await find_groups(client, daily_limit=MAX_NEW_GROUPS_PER_DAY)
    logger.info("=== Discovery הסתיים: %d קבוצות חדשות ===", found)


async def job_posting_session(client: TelegramClient) -> None:
    """11:00 / 15:00 / 19:00 — session פרסום."""
    logger.info("=== Telegram Posting session התחיל ===")
    sent = await run_posting_session(client)
    logger.info("=== Posting session הסתיים: %d פרסומים ===", sent)


# ─── Engine — גרעין ה-Agent (ללא בוט) ────────────────────────────────────────

async def run_tg_agent() -> None:
    """
    מריץ את Telegram Agent ללא בוט Admin.
    הבוט מנוהל ע"י bot.py — ראה bot.py.
    """
    init_db()

    if not TELE_API_ID or not TELE_API_HASH or not TELE_PHONE:
        logger.error(
            "פרטי Telethon חסרים!\n"
            "הגדר TELE_API_ID, TELE_API_HASH, TELE_PHONE ב-.env\n"
            "מקבלים מ-https://my.telegram.org"
        )
        return

    tz = pytz.timezone(TIMEZONE)

    # ── Telethon user client ──────────────────────────────────────────────────
    telethon_client = TelegramClient(SESSION_NAME, TELE_API_ID, TELE_API_HASH)
    await telethon_client.start(phone=TELE_PHONE)
    logger.info("Telethon client מחובר ✓")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(timezone=tz)

    # 09:00 — גילוי קבוצות חדשות
    scheduler.add_job(
        job_discover, "cron", hour=9, minute=0,
        args=[telethon_client], id="tg_discover",
    )

    # 11:00, 15:00, 19:00 — sessions פרסום
    for hour in [11, 15, 19]:
        scheduler.add_job(
            job_posting_session, "cron", hour=hour, minute=0,
            args=[telethon_client], id=f"tg_posting_{hour}",
        )

    scheduler.start()
    logger.info(
        "Telegram Agent Scheduler התחיל.\n"
        "  09:00 — גילוי קבוצות\n"
        "  11:00, 15:00, 19:00 — sessions פרסום\n"
        "  (שעון ישראל)"
    )

    # גילוי ראשוני בהפעלה ראשונה
    logger.info("מריץ גילוי ראשוני...")
    await job_discover(telethon_client)

    # ── Keep alive ────────────────────────────────────────────────────────────
    try:
        logger.info("Telegram Agent רץ. לעצירה: Ctrl+C")
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit, asyncio.CancelledError):
        logger.info("מכבה Telegram Agent...")
    finally:
        scheduler.shutdown(wait=False)
        await telethon_client.disconnect()
        logger.info("Telegram Agent נכבה בצורה נקייה.")


# ─── standalone — הפעלה ישירה ─────────────────────────────────────────────────

async def main() -> None:
    """
    הפעלה עצמאית — `python tg_main.py`.
    מריץ רק את Telegram Agent ללא Admin bot.
    לבוט Admin — הפעל גם `python bot.py` בנפרד.
    """
    await run_tg_agent()


if __name__ == "__main__":
    asyncio.run(main())
