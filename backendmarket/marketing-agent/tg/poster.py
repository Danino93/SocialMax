"""
tg_poster.py — מנוע הפרסום של Telegram Marketing Agent
מפרסם הודעות טקסט / וידאו לקבוצות טלגרם דרך Telethon.
"""
import asyncio
import logging
import os
import random
from datetime import datetime
import pytz
from telethon import TelegramClient
from telethon.errors import (
    ChatWriteForbiddenError,
    UserBannedInChannelError,
    FloodWaitError,
    ChannelPrivateError,
    ChatAdminRequiredError,
)

from .config import (
    MIN_DELAY_MINUTES, MAX_DELAY_MINUTES,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
    DAILY_POST_LIMIT, POST_COOLDOWN_DAYS,
    TIMEZONE, VIDEO_PATH, VIDEO_SEND_CHANCE,
)
from .database import (
    get_eligible_groups, mark_posted, mark_post_failed, deactivate_group,
    log_post, increment_stat, get_posts_sent_today, is_paused,
    record_template_result,
)
from .messages import get_template

logger = logging.getLogger(__name__)


def _is_active_hour() -> bool:
    """בודק אם אנחנו בשעות הפרסום הפעילות."""
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


async def human_delay() -> None:
    """המתנה אנושית-רנדומלית בין פרסום לפרסום."""
    seconds = random.randint(MIN_DELAY_MINUTES * 60, MAX_DELAY_MINUTES * 60)
    minutes = seconds // 60
    logger.info("המתנה %d דקות לפרסום הבא...", minutes)
    await asyncio.sleep(seconds)


async def post_to_group(client: TelegramClient, group: dict) -> bool:
    """
    מפרסם הודעה אחת לקבוצה.
    40% מהפרסומים כוללים את סרטון התדמית.
    מחזיר True אם הצליח.
    """
    telegram_id   = group["telegram_id"]
    title         = group.get("title", telegram_id)
    last_template = group.get("last_template_id", -1)

    template_id, text = get_template(last_template)

    # Inject group name — replaces {group_name} placeholder if present
    group_title = group.get("title") or "הקבוצה"
    text = text.replace("{group_name}", group_title)

    try:
        # Resolve entity
        entity = await client.get_entity(int(telegram_id))

        # 40% מהפרסומים — שלח גם את סרטון התדמית
        use_video = (
            os.path.exists(VIDEO_PATH)
            and random.random() < VIDEO_SEND_CHANCE
        )

        if use_video:
            await client.send_file(entity, VIDEO_PATH, caption=text)
            logger.info("פורסם VIDEO ל-%s (תבנית #%d)", title, template_id)
        else:
            await client.send_message(entity, text)
            logger.info("פורסם TEXT ל-%s (תבנית #%d)", title, template_id)

        mark_posted(telegram_id, template_id)
        record_template_result(template_id, success=True)   # A/B tracking
        log_post(telegram_id, template_id, "sent")
        increment_stat("posts_sent")
        return True

    except FloodWaitError as e:
        # טלגרם ביקש להמתין — ממתינים ואז ממשיכים
        wait = e.seconds + 10
        logger.warning("FloodWait %d שניות — ממתין...", wait)
        await asyncio.sleep(wait)
        mark_post_failed(telegram_id)
        record_template_result(template_id, success=False)  # A/B tracking
        log_post(telegram_id, template_id, "failed")
        increment_stat("posts_failed")
        return False

    except (ChatWriteForbiddenError, UserBannedInChannelError,
            ChannelPrivateError, ChatAdminRequiredError) as e:
        # הקבוצה חסמה אותנו — מסמנים כלא-פעילה ולא נחזור אליה
        # לא מתעדים ב-A/B — הבעיה היא הקבוצה, לא התבנית
        logger.warning("לא ניתן לפרסם ב-%s: %s — מסמן כ-inactive", title, e)
        deactivate_group(telegram_id)
        log_post(telegram_id, template_id, "failed")
        increment_stat("posts_failed")
        return False

    except Exception as e:
        logger.error("שגיאה לא צפויה בפרסום ל-%s: %s", title, e)
        mark_post_failed(telegram_id)
        record_template_result(template_id, success=False)  # A/B tracking
        log_post(telegram_id, template_id, "failed")
        increment_stat("posts_failed")
        return False


async def run_posting_session(client: TelegramClient) -> int:
    """
    מריץ session פרסום אחד.
    מפרסם עד DAILY_POST_LIMIT הודעות עם עיכויים אנושיים.
    מחזיר מספר פרסומים שנשלחו.
    """
    if is_paused():
        logger.info("Agent מושהה — מדלג על session פרסום.")
        return 0

    if not _is_active_hour():
        logger.info("מחוץ לשעות הפעילות — מדלג על session פרסום.")
        return 0

    already_sent = get_posts_sent_today()
    remaining    = DAILY_POST_LIMIT - already_sent

    if remaining <= 0:
        logger.info("הגענו ללימיט פרסומים יומי.")
        return 0

    groups = get_eligible_groups(cooldown_days=POST_COOLDOWN_DAYS, limit=remaining * 2)
    if not groups:
        logger.info("אין קבוצות זמינות לפרסום.")
        return 0

    logger.info("Session פרסום: עד %d פרסומים", remaining)
    sent = 0

    for group in groups:
        if sent >= remaining:
            break
        if is_paused():
            logger.info("Agent הושהה באמצע session — עוצר.")
            break
        if not _is_active_hour():
            logger.info("יצאנו משעות הפעילות — עוצר session.")
            break

        success = await post_to_group(client, group)
        if success:
            sent += 1

        # תמיד ממתינים בין פרסומים — גם אחרי כישלון
        if sent < remaining:
            await human_delay()

    logger.info("Session פרסום הסתיים: %d פרסומים נשלחו.", sent)
    return sent
