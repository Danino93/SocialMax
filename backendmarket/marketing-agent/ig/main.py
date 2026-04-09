"""
SocialSniper — Instagram Marketing Agent
Runs as a standalone scheduler process.
Admin commands (/igstats, /igpause, etc.) are served by shop/main.py (shared bot).

Schedule (Israel time):
  08:00 — Warm Lead Discovery
  09:30 — Daily Reel
  10:00 — Competitor Harvest (auto-discovery)
  11:00 — Comment session (12)
  12:00 — Comment Reply Monitor
  13:00 — Story Viewer
  13:30 — DM Inbox Manager (Gemini)
  14:00 — DM session (7)
  15:30 — Reels Like+Save
  16:30 — Comment session (10)
  17:30 — DM Inbox Manager (Gemini)
  18:00 — Comment Reply Monitor
  19:00 — DM session (6)
  20:00 — Warm Leads DM
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
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from .config import (
    IG_USERNAME, IG_PASSWORD,
    IG_SESSION_FILE, TIMEZONE,
)
from .database import init_db, is_paused
from .outreach import (
    run_comment_session, run_dm_session,
    run_reels_save_session, discover_warm_leads, run_warm_leads_dm_session,
)
from .content import post_daily_reel
from .story_viewer import run_story_session
from .competitor import run_competitor_harvest
from .ai_conversation import run_comment_reply_monitor, run_dm_inbox_manager
from .feed_engage import run_feed_browse, run_hashtag_engage, run_follow_session, run_unfollow_session
from shared.warmer import IGWarmer

logging.basicConfig(
    format="%(asctime)s | %(name)s | %(levelname)s | %(message)s",
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("ig_agent.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


class _DropNoisyPublicRequestFilter(logging.Filter):
    """Suppress known noisy HTML dumps from instagrapi public_request logger."""

    def filter(self, record: logging.LogRecord) -> bool:
        if record.name != "public_request":
            return True
        return "JSONDecodeError in public_request" not in record.getMessage()


for _handler in logging.getLogger().handlers:
    _handler.addFilter(_DropNoisyPublicRequestFilter())


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


# ─── Scheduled job wrappers ───────────────────────────────────────────────────

def job_post_reel(cl: Client) -> None:
    logger.info("=== Daily Reel job started ===")
    success = post_daily_reel(cl)
    logger.info("=== Daily Reel job done: %s ===", "posted" if success else "failed")


async def _warm_ig(cl: Client) -> None:
    """מריץ Account Warmer לפני כל session שיווקי."""
    import os
    warm_enabled = os.getenv("WARM_BEFORE_SESSION", "true").lower() == "true"
    if not warm_enabled:
        return
    intensity = os.getenv("WARM_INTENSITY", "medium")
    warmer = IGWarmer(cl)
    try:
        await warmer.run(intensity=intensity)
    except Exception as e:
        logger.warning("IGWarmer error (skipping warm): %s", e)


async def job_comment_session(cl: Client, limit: int) -> None:
    logger.info("=== Comment session started (limit=%d) ===", limit)
    await _warm_ig(cl)
    sent = run_comment_session(cl, limit)
    logger.info("=== Comment session done: %d comments ===", sent)


async def job_dm_session(cl: Client, limit: int) -> None:
    logger.info("=== DM session started (limit=%d) ===", limit)
    await _warm_ig(cl)
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

    # ── Admin commands are handled by shop/main.py (shared bot) ─────────────
    # ig/main.py runs as a standalone scheduler only — no separate Telegram polling
    # to avoid 409 Conflict when shop bot is already running.
    logger.info("Admin commands (/igstats, /igpause etc.) are served by the shop bot.")

    # ── Scheduler ─────────────────────────────────────────────────────────────
    scheduler = AsyncIOScheduler(
        timezone=tz,
        job_defaults={
            # Coalesce missed runs and allow a small grace window for minor drifts.
            "coalesce": True,
            "misfire_grace_time": 120,
            "max_instances": 1,
        },
    )

    # helper — כל lambda צריכה לכסות את cl בזמן הגדרה
    def _add(func, h, m, job_id, **kw):
        scheduler.add_job(func, "cron", hour=h, minute=m, id=job_id, **kw)

    # ── 07:00-09:00 — בוקר: חימום + פיד טבעי ─────────────────────────────
    _add(lambda: run_feed_browse(cl),                    7,  0,  "ig_feed_07")
    _add(lambda: run_follow_session(cl, limit=8),        7, 30,  "ig_follow_07")
    _add(lambda: discover_warm_leads(cl),                8,  0,  "ig_warm_discover")
    _add(lambda: run_hashtag_engage(cl),                 8, 30,  "ig_hashtag_08")
    _add(lambda: run_dm_inbox_manager(cl),               9,  0,  "ig_inbox_09")
    _add(job_post_reel,                                  9, 30,  "ig_daily_reel", args=[cl])

    # ── 10:00-12:00 — בוקר: מתחרים + תגובות ─────────────────────────────
    _add(lambda: run_competitor_harvest(cl),            10,  0,  "ig_competitor")
    _add(lambda: run_hashtag_engage(cl),                10, 30,  "ig_hashtag_10")
    _add(job_comment_session,                           11,  0,  "ig_comment_1", args=[cl, 12])
    _add(lambda: run_feed_browse(cl),                   11, 30,  "ig_feed_11")
    _add(lambda: run_comment_reply_monitor(cl),         12,  0,  "ig_reply_12")

    # ── 12:00-15:00 — צהריים: עקיבות + שיחות AI ──────────────────────────
    _add(lambda: run_follow_session(cl, limit=8),       12, 30,  "ig_follow_12")
    _add(lambda: run_story_session(cl),                 13,  0,  "ig_stories_13")
    _add(lambda: run_dm_inbox_manager(cl),              13, 30,  "ig_inbox_13")
    _add(job_dm_session,                                14,  0,  "ig_dm_1",  args=[cl, 7])
    _add(lambda: run_hashtag_engage(cl),                14, 30,  "ig_hashtag_14")

    # ── 15:00-18:00 — אחה"צ: Reels + תגובות + סטוריז ────────────────────
    _add(lambda: run_follow_session(cl, limit=6),       15,  0,  "ig_follow_15")
    _add(lambda: run_reels_save_session(cl, limit=20),  15, 30,  "ig_reels_save")
    _add(lambda: run_comment_reply_monitor(cl),         16,  0,  "ig_reply_16")
    _add(job_comment_session,                           16, 30,  "ig_comment_2", args=[cl, 10])
    _add(lambda: run_story_session(cl),                 17,  0,  "ig_stories_17")
    _add(lambda: run_dm_inbox_manager(cl),              17, 30,  "ig_inbox_17")
    _add(lambda: run_comment_reply_monitor(cl),         18,  0,  "ig_reply_18")
    _add(lambda: run_hashtag_engage(cl),                18, 30,  "ig_hashtag_18")

    # ── 19:00-23:00 — ערב: DMs + warm leads + unfollow ───────────────────
    _add(job_dm_session,                                19,  0,  "ig_dm_2",  args=[cl, 6])
    _add(lambda: run_follow_session(cl, limit=6),       19, 30,  "ig_follow_19")
    _add(lambda: run_warm_leads_dm_session(cl, limit=5),20,  0,  "ig_warm_dm")
    _add(lambda: run_dm_inbox_manager(cl),              20, 30,  "ig_inbox_20")
    _add(lambda: run_story_session(cl),                 21,  0,  "ig_stories_21")
    _add(lambda: run_feed_browse(cl, like_limit=8),     21, 30,  "ig_feed_21")
    _add(lambda: run_comment_reply_monitor(cl),         22,  0,  "ig_reply_22")
    _add(lambda: run_dm_inbox_manager(cl),              22, 30,  "ig_inbox_22")

    # ── Unfollow יומי — 23:00 ─────────────────────────────────────────────
    _add(lambda: run_unfollow_session(cl, limit=20),    23,  0,  "ig_unfollow")

    scheduler.start()
    logger.info(
        "Scheduler started — פעיל כל 30-60 דקות 07:00-23:00\n"
        "  07:00 — Feed browse + Follow\n"
        "  08:00 — Warm Lead Discovery + Hashtag Engage\n"
        "  09:00 — DM Inbox (Gemini) + Daily Reel\n"
        "  10:00 — Competitor Harvest + Hashtag Engage\n"
        "  11:00 — Comment session (12) + Feed browse\n"
        "  12:00 — Comment Reply Monitor + Follow\n"
        "  13:00 — Story Viewer + DM Inbox + Hashtag\n"
        "  14:00 — DM session (7)\n"
        "  15:00 — Follow + Reels Like+Save\n"
        "  16:00 — Comment Reply Monitor + Comment session (10)\n"
        "  17:00 — Story Viewer + DM Inbox\n"
        "  18:00 — Comment Reply Monitor + Hashtag Engage\n"
        "  19:00 — DM session (6) + Follow\n"
        "  20:00 — Warm Leads DM + DM Inbox\n"
        "  21:00 — Story Viewer + Feed browse\n"
        "  22:00 — Comment Reply Monitor + DM Inbox\n"
        "  23:00 — Unfollow Session\n"
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
        logger.info("Instagram Agent stopped cleanly.")


if __name__ == "__main__":
    asyncio.run(main())
