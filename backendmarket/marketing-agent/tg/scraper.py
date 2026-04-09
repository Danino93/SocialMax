"""
tg/scraper.py — User Scraper + Cold DM
----------------------------------------
גורד חברים פעילים מקבוצות ישראליות ושולח להם DM אישי.

זרימה:
  1. בוחר קבוצות מה-DB (עדיפות לקבוצות גדולות ורלוונטיות)
  2. מוריד רשימת חברים עם get_participants()
  3. מסנן: ישראלים, לא בוטים, פעילים לאחרונה, לא קיבלו DM לאחרונה
  4. שולח DM אישי עם עיכויים רנדומליים
  5. שומר כל DM ב-DB למניעת כפילויות

הפעלה: run_scraper_session(client) ← נקרא מ-main.py (Scheduler)
"""
import asyncio
import logging
import random
from datetime import datetime, timedelta

import pytz
from telethon import TelegramClient
from telethon.errors import (
    UserPrivacyRestrictedError, FloodWaitError, PeerFloodError,
    ChannelPrivateError, ChatAdminRequiredError,
)
from telethon.tl.types import User

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused, get_eligible_groups,
    get_dm_cooldown_ok, log_dm_sent, increment_stat,
    get_scraper_dms_today, set_qualifier_awaiting,
)

logger = logging.getLogger(__name__)
_peerflood_until: datetime | None = None


# ─── לימיטים ─────────────────────────────────────────────────────────────────
DAILY_SCRAPER_DM_LIMIT  = 30        # מקסימום DMs קרים ביום
SCRAPER_DM_COOLDOWN_DAYS = 30       # לא חוזרים לאותו משתמש ב-30 יום
GROUPS_PER_SESSION      = 5         # כמה קבוצות לסרוק בsession אחד
MEMBERS_PER_GROUP       = 60        # כמה חברים לשלוף מכל קבוצה
DM_DELAY_SEC            = (45, 120) # עיכוי בין DM לDM (45שניות–2דקות)


# ─── תבניות DM קר ─────────────────────────────────────────────────────────────
# פנייה לחברי קבוצות ישראליות — לא ידעו מה זה SMM, רק רוצים לגדול/למכור

COLD_DM_TEMPLATES: list[str] = [
    "היי {name} 👋\n"
    "ראיתי שאתה חבר בקבוצות עסקים/שיווק — בא לי לשתף:\n"
    "יש שירות ישראלי שעוזר לגדול ברשתות — @socialsniper93_bot\n"
    "עוקבים, לייקים, ביקורות גוגל — הכל בשקלים 🇮🇱",

    "שלום {name} 😊\n"
    "אני משתף שירות שעזר לי ולהרבה ישראלים לקדם עסק ברשתות:\n"
    "@socialsniper93_bot — מחירים בשקלים, מהיר, ישראלי.\n"
    "שווה להציץ!",

    "היי {name}!\n"
    "רציתי לשתף טיפ לכל מי שרוצה לגדול באינסטגרם/טיקטוק/יוטיוב:\n"
    "@socialsniper93_bot — שירות SMM ישראלי, מאות לקוחות מרוצים ⚡\n"
    "בשקלים, מסירה מהירה.",

    "שלום {name} 🙌\n"
    "מחפש לגדול ברשתות או לקדם עסק? @socialsniper93_bot יכול לעזור.\n"
    "שירות ישראלי — עוקבים, לייקים, צפיות, ביקורות גוגל.\n"
    "הכל בשקלים 🇮🇱",

    "היי {name} 👋\n"
    "שיתוף קצר — @socialsniper93_bot הוא שירות SMM ישראלי שמרבה ממליצים עליו.\n"
    "עוקבים/לייקים/ביקורות גוגל, הכל בשקלים. תבדוק!",
]


# ─── Session פרסום ───────────────────────────────────────────────────────────

async def run_scraper_session(client: TelegramClient) -> int:
    """
    מריץ session אחד של גרידת חברים ושליחת DMs.
    מחזיר מספר DMs שנשלחו.
    """
    if is_paused():
        logger.info("Scraper: Agent מושהה — דולג.")
        return 0

    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)

    global _peerflood_until
    if _peerflood_until and now < _peerflood_until:
        logger.warning(
            "Scraper: PeerFlood cooldown active until %s; skipping session.",
            _peerflood_until.isoformat(timespec="seconds"),
        )
        return 0

    if not (ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END):
        logger.info("Scraper: מחוץ לשעות פעילות.")
        return 0

    already_sent = get_scraper_dms_today()
    remaining    = DAILY_SCRAPER_DM_LIMIT - already_sent
    if remaining <= 0:
        logger.info("Scraper: הגיע ללימיט DMs יומי.")
        return 0

    # בחר קבוצות לסריקה — מהגדולות ביותר
    groups = get_eligible_groups(cooldown_days=1, limit=GROUPS_PER_SESSION * 3)
    groups = sorted(groups, key=lambda g: g.get("member_count", 0), reverse=True)
    groups = groups[:GROUPS_PER_SESSION]

    if not groups:
        logger.info("Scraper: אין קבוצות ב-DB עדיין.")
        return 0

    logger.info("Scraper session: %d קבוצות, עד %d DMs", len(groups), remaining)
    total_sent = 0

    for group in groups:
        if total_sent >= remaining:
            break
        if is_paused():
            break

        sent = await _scrape_and_dm_group(client, group, remaining - total_sent)
        total_sent += sent

    logger.info("Scraper session הסתיים: %d DMs נשלחו", total_sent)
    return total_sent


async def _scrape_and_dm_group(
    client: TelegramClient,
    group: dict,
    limit: int,
) -> int:
    """גורד חברים מקבוצה ושולח DMs. מחזיר מספר DMs שנשלחו."""
    tg_id = group["telegram_id"]
    title = group.get("title", tg_id)
    sent  = 0

    try:
        logger.info("Scraper: סורק חברים מ-%s", title)
        entity = await client.get_entity(int(tg_id))
        participants = await client.get_participants(entity, limit=MEMBERS_PER_GROUP)

    except (ChannelPrivateError, ChatAdminRequiredError) as e:
        logger.warning("Scraper: לא ניתן לגרוד %s: %s", title, e)
        return 0
    except FloodWaitError as e:
        now = datetime.now(pytz.timezone(TIMEZONE))
        _peerflood_until = now + timedelta(seconds=e.seconds + 60)
        logger.warning(
            "FloodWait %ds; pausing scraper DMs until %s",
            e.seconds,
            _peerflood_until.isoformat(timespec="seconds"),
        )
        return False

    except Exception as e:
        logger.debug("Scraper: שגיאה בגרידת %s: %s", title, e)
        return 0

    # ערבב את הרשימה — לא תמיד אותם אנשים
    random.shuffle(participants)

    for user in participants:
        if sent >= limit:
            break
        if is_paused():
            break

        # סינון: לא בוטים, יש username, לא deleted
        if not isinstance(user, User):
            continue
        if getattr(user, "bot", False):
            continue
        if getattr(user, "deleted", False):
            continue

        user_id = str(user.id)

        # בדוק cooldown
        if not get_dm_cooldown_ok(user_id, SCRAPER_DM_COOLDOWN_DAYS):
            continue

        # בנה שם נוח
        name = _get_display_name(user)

        # בחר תבנית
        template = random.choice(COLD_DM_TEMPLATES)
        dm_text  = template.format(name=name)

        # שלח DM
        success = await _send_dm(client, user, dm_text, user_id)
        if success:
            sent += 1

        if _peerflood_until and datetime.now(pytz.timezone(TIMEZONE)) < _peerflood_until:
            logger.warning("Scraper: stopping current group due to PeerFlood cooldown.")
            break

        # עיכוי בין DMs
        if sent < limit:
            delay = random.uniform(*DM_DELAY_SEC)
            logger.debug("Scraper: ממתין %.0fs לפני DM הבא", delay)
            await asyncio.sleep(delay)

    logger.info("Scraper: %d DMs מ-%s", sent, title)
    return sent


async def _send_dm(
    client: TelegramClient,
    user: User,
    text: str,
    user_id: str,
) -> bool:
    """שולח DM, מטפל בשגיאות, מחזיר True בהצלחה."""
    global _peerflood_until
    try:
        await client.send_message(user, text)
        log_dm_sent(user_id, "scraper", text[:200])
        set_qualifier_awaiting(user_id)   # מסמן שאנחנו ממתינים לתשובת כישורים
        increment_stat("scraper_dms_sent")
        logger.info("Scraper DM → user %s", user_id)
        return True

    except UserPrivacyRestrictedError:
        logger.debug("User %s: Privacy restricted", user_id)
        return False

    except PeerFloodError:
        now = datetime.now(pytz.timezone(TIMEZONE))
        _peerflood_until = now + timedelta(hours=6)
        logger.warning(
            "PeerFloodError: pausing scraper DMs until %s",
            _peerflood_until.isoformat(timespec="seconds"),
        )
        return False


    except FloodWaitError as e:
        now = datetime.now(pytz.timezone(TIMEZONE))
        _peerflood_until = now + timedelta(seconds=e.seconds + 60)
        logger.warning(
            "FloodWait %ds; pausing scraper DMs until %s",
            e.seconds,
            _peerflood_until.isoformat(timespec="seconds"),
        )
        return False

    except Exception as e:
        logger.debug("DM to %s failed: %s", user_id, e)
        return False


def _get_display_name(user: User) -> str:
    """מחזיר שם תצוגה נוח — שם פרטי או username."""
    first = getattr(user, "first_name", "") or ""
    if first:
        return first
    username = getattr(user, "username", "") or ""
    if username:
        return f"@{username}"
    return "חבר"
