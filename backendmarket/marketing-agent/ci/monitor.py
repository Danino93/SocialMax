"""
ci/monitor.py — סריקת מתחרים לזיהוי מתלוננים
תומך בשתי פלטפורמות:
  1. Telegram  — דרך Telethon (iter_messages על channels)
  2. Instagram — דרך Instagrapi (media_comments על פוסטים של מתחרים)
"""
import logging
from datetime import datetime

from shared.sentiment import is_complaint, extract_complaint_keywords
from .config import CI_COMPETITORS_TG, CI_COMPETITORS_IG
from .database import add_target, set_last_scan

logger = logging.getLogger(__name__)


# ─── Telegram Monitor ─────────────────────────────────────────────────────────

async def scan_telegram_competitors(client, competitors: list[str] | None = None) -> int:
    """
    סורק הודעות בchannels/groups של מתחרים בטלגרם.
    מחפש הודעות עם keywords שליליים → שומר ב-DB.

    :param client:      Telethon TelegramClient מחובר
    :param competitors: רשימת channel usernames (ללא @). None = מה-.env
    :return: מספר מטרות חדשות שנמצאו
    """
    if competitors is None:
        competitors = CI_COMPETITORS_TG

    if not competitors:
        logger.info("[CI:TG] No Telegram competitors configured — skipping TG scan")
        return 0

    found = 0
    for channel in competitors:
        logger.info("[CI:TG] Scanning channel: @%s", channel)
        try:
            async for msg in client.iter_messages(channel, limit=200):
                if not msg.text:
                    continue
                if not is_complaint(msg.text):
                    continue

                # בדיקה שיש sender_id (הודעות אנונימיות מדלגים)
                if not msg.sender_id:
                    continue

                keywords = extract_complaint_keywords(msg.text)
                added = add_target(
                    user_id=str(msg.sender_id),
                    platform="telegram",
                    complaint_text=msg.text[:500],
                    source_channel=channel,
                )
                if added:
                    found += 1
                    logger.info(
                        "[CI:TG] New target found in @%s (user: %s, keywords: %s)",
                        channel, msg.sender_id, keywords
                    )
        except Exception as e:
            logger.error("[CI:TG] Error scanning @%s: %s", channel, e)

    logger.info("[CI:TG] Telegram scan done: %d new targets", found)
    return found


# ─── Instagram Monitor ────────────────────────────────────────────────────────

def scan_instagram_competitors(ig_client, competitors: list[str] | None = None) -> int:
    """
    סורק תגובות על פוסטים של מתחרים באינסטגרם.
    מחפש תגובות עם keywords שליליים → שומר ב-DB.

    :param ig_client:   Instagrapi Client מחובר
    :param competitors: רשימת IG usernames. None = מה-.env
    :return: מספר מטרות חדשות שנמצאו
    """
    if competitors is None:
        competitors = CI_COMPETITORS_IG

    if not competitors:
        logger.info("[CI:IG] No Instagram competitors configured — skipping IG scan")
        return 0

    found = 0
    for username in competitors:
        logger.info("[CI:IG] Scanning @%s posts", username)
        try:
            user_info = ig_client.user_info_by_username(username)
            user_pk   = user_info.pk

            # בדיקת 10 הפוסטים האחרונים
            medias = ig_client.user_medias(user_pk, 10)
            for media in medias:
                try:
                    comments = ig_client.media_comments(media.id, amount=50)
                    for comment in comments:
                        if not comment.text:
                            continue
                        if not is_complaint(comment.text):
                            continue

                        keywords = extract_complaint_keywords(comment.text)
                        added = add_target(
                            user_id=str(comment.user.pk),
                            platform="instagram",
                            complaint_text=comment.text[:500],
                            source_channel=username,
                        )
                        if added:
                            found += 1
                            logger.info(
                                "[CI:IG] New target found on @%s post (user: %s, keywords: %s)",
                                username, comment.user.username, keywords
                            )
                except Exception as e:
                    logger.debug("[CI:IG] Error scanning media %s: %s", media.id, e)
                    continue

        except Exception as e:
            logger.error("[CI:IG] Error scanning @%s: %s", username, e)

    logger.info("[CI:IG] Instagram scan done: %d new targets", found)
    return found


# ─── Combined scan ────────────────────────────────────────────────────────────

async def run_full_scan(tg_client=None, ig_client=None) -> int:
    """
    מריץ סריקה מלאה בכל הפלטפורמות שמוגדרות.
    :return: סך מטרות חדשות
    """
    logger.info("[CI] === Starting full competitor scan ===")
    total = 0

    if tg_client and CI_COMPETITORS_TG:
        tg_found = await scan_telegram_competitors(tg_client)
        total += tg_found

    if ig_client and CI_COMPETITORS_IG:
        ig_found = scan_instagram_competitors(ig_client)
        total += ig_found

    now = datetime.utcnow().isoformat()
    set_last_scan(now)
    logger.info("[CI] === Full scan done: %d new targets total ===", total)
    return total
