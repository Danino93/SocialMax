"""
tg/engager.py — Auto-Comment + Reactions + Forward
----------------------------------------------------
שלוש פעולות engagement בקבוצות טלגרם:

  4. Auto-Comment  — מגיב על פוסטים בקבוצות עם תגובה אורגנית + mention
  5. Reaction Bot  — נותן ❤️/👍 על פוסטים בקבוצות → מייצר נוכחות ללא ריסק
  6. Forward       — מעביר תוכן ערכי לערוץ שלנו עם CTA (אם מוגדר)

הפעלה: run_engagement_session(client) ← Scheduler ב-main.py
"""
import asyncio
import logging
import random
from datetime import datetime

import pytz
from telethon import TelegramClient
from telethon.errors import (
    FloodWaitError, ChatWriteForbiddenError,
    UserBannedInChannelError, MessageNotModifiedError,
)
from telethon.tl.functions.messages import SendReactionRequest
from telethon.tl.types import ReactionEmoji

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused, get_eligible_groups,
    get_comment_cooldown_ok, log_comment,
    get_reaction_cooldown_ok, log_reaction,
    get_engagement_stats_today, increment_stat,
)

logger = logging.getLogger(__name__)


# ─── לימיטים יומיים ──────────────────────────────────────────────────────────
DAILY_COMMENT_LIMIT   = 25   # מקסימום תגובות ביום
DAILY_REACTION_LIMIT  = 60   # מקסימום reactions ביום (בטוח יותר מתגובות)
COMMENT_COOLDOWN_DAYS = 3    # לא מגיבים באותה קבוצה תוך 3 ימים
REACTION_COOLDOWN_DAYS = 1   # reactions כל יום לאותה קבוצה
GROUPS_PER_SESSION    = 10   # כמה קבוצות לסרוק בsession
MESSAGES_TO_SCAN      = 15   # כמה הודעות אחרונות לסרוק בכל קבוצה

# Reactions — emojis ניטרליים ואוהדים
REACTIONS = ["❤", "👍", "🔥", "💯", "👏"]


# ─── תגובות Auto-Comment ──────────────────────────────────────────────────────
# תגובות אורגניות שנראות כמו חבר מהקהילה, לא פרסומת ישירה

COMMENT_TEMPLATES: list[str] = [
    "נקודה מצוינת! 👏 אגב, מי שרוצה לגדול ברשתות — @socialsniper93_bot ממש שווה.",
    "אחלה תוכן 🔥 בדיוק בשביל כאלה שרוצים להגדיל חשיפה — @socialsniper93_bot",
    "מסכים לגמרי! ומי שרוצה יותר עוקבים/לייקים לעסק — @socialsniper93_bot 🇮🇱",
    "שיתוף נהדר 🙌 לדרך הטובה לגדול ברשתות — @socialsniper93_bot",
    "❤️ מעניין. אגב, לקידום ברשתות חברתיות — @socialsniper93_bot, ישראלי ובשקלים.",
    "פוסט מעולה 💯 מי שמחפש שירות SMM ישראלי — @socialsniper93_bot שווה ביקור.",
    "👍 תודה על השיתוף! לקידום עסק ברשתות — @socialsniper93_bot",
    "מעולה! ולמי שרוצה יותר לייקים/עוקבים לפרופיל — @socialsniper93_bot 🚀",
]


# ─── Session ראשי ─────────────────────────────────────────────────────────────

async def run_engagement_session(client: TelegramClient) -> dict:
    """
    מריץ session engagement מלא.
    מחזיר dict עם כמות תגובות ו-reactions שנשלחו.
    """
    if is_paused():
        logger.info("Engager: Agent מושהה — דולג.")
        return {"comments": 0, "reactions": 0}

    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    if not (ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END):
        logger.info("Engager: מחוץ לשעות פעילות.")
        return {"comments": 0, "reactions": 0}

    stats    = get_engagement_stats_today()
    comments = stats.get("comments_sent", 0)
    reactions = stats.get("reactions_sent", 0)

    comments_remaining  = DAILY_COMMENT_LIMIT - comments
    reactions_remaining = DAILY_REACTION_LIMIT - reactions

    if comments_remaining <= 0 and reactions_remaining <= 0:
        logger.info("Engager: הגיע ללימיטים יומיים.")
        return {"comments": 0, "reactions": 0}

    # בחר קבוצות לסריקה
    groups = get_eligible_groups(cooldown_days=1, limit=GROUPS_PER_SESSION * 2)
    random.shuffle(groups)
    groups = groups[:GROUPS_PER_SESSION]

    total_comments  = 0
    total_reactions = 0

    for group in groups:
        if is_paused():
            break

        tg_id = group["telegram_id"]
        title = group.get("title", tg_id)

        try:
            entity   = await client.get_entity(int(tg_id))
            messages = await client.get_messages(entity, limit=MESSAGES_TO_SCAN)
        except Exception as e:
            logger.debug("Engager: לא ניתן לגשת ל-%s: %s", title, e)
            continue

        for msg in messages:
            if not msg or not msg.message:
                continue
            if msg.out:          # לא על הודעות שלנו
                continue
            if len(msg.message) < 20:  # מסנן הודעות קצרות מדי
                continue

            msg_id = str(msg.id)

            # ── Reaction ─────────────────────────────────────────────────────
            if reactions_remaining > 0 and get_reaction_cooldown_ok(tg_id, REACTION_COOLDOWN_DAYS):
                reacted = await _send_reaction(client, entity, msg)
                if reacted:
                    log_reaction(tg_id, msg_id)
                    increment_stat("reactions_sent")
                    total_reactions += 1
                    reactions_remaining -= 1
                    await asyncio.sleep(random.uniform(5, 15))

            # ── Comment ──────────────────────────────────────────────────────
            if (comments_remaining > 0
                    and get_comment_cooldown_ok(tg_id, COMMENT_COOLDOWN_DAYS)
                    and random.random() < 0.3):  # 30% מהפוסטים מקבלים תגובה
                commented = await _send_comment(client, entity, msg, title)
                if commented:
                    log_comment(tg_id, msg_id)
                    increment_stat("comments_sent")
                    total_comments += 1
                    comments_remaining -= 1
                    await asyncio.sleep(random.uniform(30, 90))

            if comments_remaining <= 0 and reactions_remaining <= 0:
                break

        # עיכוי בין קבוצות
        await asyncio.sleep(random.uniform(20, 45))

    logger.info(
        "Engagement session: %d תגובות, %d reactions",
        total_comments, total_reactions,
    )
    return {"comments": total_comments, "reactions": total_reactions}


# ─── Helpers ──────────────────────────────────────────────────────────────────

async def _send_reaction(client: TelegramClient, entity, msg) -> bool:
    """נותן reaction על הודעה. מחזיר True בהצלחה."""
    try:
        emoji = random.choice(REACTIONS)
        await client(SendReactionRequest(
            peer=entity,
            msg_id=msg.id,
            reaction=[ReactionEmoji(emoticon=emoji)],
        ))
        logger.debug("Reaction %s על msg %d", emoji, msg.id)
        return True
    except FloodWaitError as e:
        await asyncio.sleep(e.seconds + 5)
        return False
    except Exception as e:
        logger.debug("Reaction failed: %s", e)
        return False


async def _send_comment(
    client: TelegramClient,
    entity,
    msg,
    group_title: str,
) -> bool:
    """מוסיף תגובה על הודעה. מחזיר True בהצלחה."""
    try:
        comment_text = random.choice(COMMENT_TEMPLATES)
        await client.send_message(
            entity,
            comment_text,
            reply_to=msg.id,
        )
        logger.info("Comment בקבוצה %s על msg %d", group_title, msg.id)
        return True
    except (ChatWriteForbiddenError, UserBannedInChannelError) as e:
        logger.debug("Comment forbidden in %s: %s", group_title, e)
        return False
    except FloodWaitError as e:
        await asyncio.sleep(e.seconds + 5)
        return False
    except Exception as e:
        logger.debug("Comment failed in %s: %s", group_title, e)
        return False
