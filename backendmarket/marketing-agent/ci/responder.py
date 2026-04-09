"""
ci/responder.py — שליחת DM אל מטרות שזוהו
משתמש ב-AI לכתיבת DM מותאם אישית לפי תלונת המטרה.
Fallback: תבניות סטטיות מ-ci/messages.py

תמיכה בפלטפורמות:
  - Telegram (Telethon)
  - Instagram (Instagrapi)
"""
import asyncio
import logging
import random

from shared.ai_provider import AIProvider
from shared.sentiment import extract_complaint_keywords
from .config import DAILY_CI_DM_LIMIT
from .database import get_pending_targets, mark_sent, get_dms_sent_today, is_paused
from .messages import get_fallback_dm

logger = logging.getLogger(__name__)

# AI singleton
_ai = AIProvider()


# ─── Single DM sender ─────────────────────────────────────────────────────────

async def _generate_ci_dm(target: dict) -> str:
    """
    מייצר DM מותאם אישית לפי תלונת המטרה.
    Fallback ל-template סטטי אם AI נכשל.
    """
    platform      = target["platform"]
    complaint     = target["complaint_text"]
    source        = target["source_channel"]
    keywords      = extract_complaint_keywords(complaint)

    ai_prompt = (
        f'מישהו כתב ב-{platform}: "{complaint}"\n'
        f'מקור: הוא כתב זאת ב-{source} (ערוץ/חשבון מתחרה).\n'
        f'כתוב לו הודעה פרטית בעברית שמציעה SocialSniper כחלופה טובה יותר.\n'
        f'חוקים:\n'
        f'- היה אמפתי לבעיה שלו ספציפית\n'
        f'- הצע ערך ממשי (לא רק "בוא אלינו")\n'
        f'- כולל הפנייה ל-@socialsniper93_bot\n'
        f'- אסור: להגיד "ראיתי שאתה מתלונן", "ידוע לי שיש לך בעיה"\n'
        f'- מקסימום 3 שורות'
    )

    text = await _ai.generate(ai_prompt, "ci_dm")
    if text:
        logger.debug("[CI-Responder] AI DM generated (%d chars)", len(text))
        return text

    # Fallback
    fallback = get_fallback_dm(platform=platform, complaint_keywords=keywords)
    logger.debug("[CI-Responder] Using fallback DM template")
    return fallback


async def send_telegram_dm(tg_client, target: dict) -> bool:
    """שולח DM בטלגרם למטרה."""
    text = await _generate_ci_dm(target)
    try:
        user_id = int(target["user_id"])
        await tg_client.send_message(user_id, text)
        logger.info("[CI-Responder:TG] DM sent to user %s", user_id)
        return True
    except Exception as e:
        logger.error("[CI-Responder:TG] Failed to DM user %s: %s", target["user_id"], e)
        return False


async def send_instagram_dm(ig_client, target: dict) -> bool:
    """שולח DM באינסטגרם למטרה (sync wrapper)."""
    text = await _generate_ci_dm(target)
    try:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: ig_client.direct_send(text, user_ids=[int(target["user_id"])])
        )
        logger.info("[CI-Responder:IG] DM sent to user %s", target["user_id"])
        return True
    except Exception as e:
        logger.error("[CI-Responder:IG] Failed to DM user %s: %s", target["user_id"], e)
        return False


# ─── Session runner ───────────────────────────────────────────────────────────

async def run_response_session(
    tg_client=None,
    ig_client=None,
    limit: int | None = None,
) -> int:
    """
    שולח DMs לכל המטרות הממתינות, עד ל-DAILY_CI_DM_LIMIT.
    :param tg_client: Telethon client (None = לא שולח TG DMs)
    :param ig_client: Instagrapi client (None = לא שולח IG DMs)
    :param limit:     כמה DMs לשלוח max בsession זה (None = עד הלימיט היומי)
    :return: מספר DMs שנשלחו
    """
    if is_paused():
        logger.info("[CI-Responder] CI agent paused — skipping response session")
        return 0

    already_sent_today = get_dms_sent_today()
    daily_remaining    = DAILY_CI_DM_LIMIT - already_sent_today

    if daily_remaining <= 0:
        logger.info("[CI-Responder] Daily DM limit reached (%d)", DAILY_CI_DM_LIMIT)
        return 0

    session_limit = min(limit or daily_remaining, daily_remaining)
    targets = get_pending_targets(limit=session_limit * 2)

    if not targets:
        logger.info("[CI-Responder] No pending targets to respond to")
        return 0

    logger.info(
        "[CI-Responder] Response session: up to %d DMs (%d pending targets)",
        session_limit, len(targets)
    )

    sent = 0
    for target in targets:
        if sent >= session_limit:
            break
        if is_paused():
            logger.info("[CI-Responder] Agent paused mid-session")
            break

        platform = target["platform"]
        success  = False

        if platform == "telegram" and tg_client:
            success = await send_telegram_dm(tg_client, target)
        elif platform == "instagram" and ig_client:
            success = await send_instagram_dm(ig_client, target)
        else:
            logger.debug(
                "[CI-Responder] No client for platform=%s — skipping target %s",
                platform, target["id"]
            )
            continue

        if success:
            mark_sent(target["id"])
            sent += 1

        # המתנה אנושית בין DMs — 3-8 דקות
        if sent < session_limit:
            delay = random.randint(180, 480)
            logger.info("[CI-Responder] Waiting %ds before next DM...", delay)
            await asyncio.sleep(delay)

    logger.info("[CI-Responder] Response session done: %d DMs sent", sent)
    return sent
