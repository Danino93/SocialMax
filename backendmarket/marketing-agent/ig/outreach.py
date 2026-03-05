"""
Instagram outreach: hashtag discovery → comment → DM
Uses Instagrapi (private API) for all interactions.
"""
import asyncio
import logging
import random
import time
from instagrapi import Client
from instagrapi.exceptions import (
    ClientError,
    FeedbackRequired,
    PleaseWaitFewMinutes,
    UserNotFound,
    MediaNotFound,
)
from .config import (
    MIN_ACTION_DELAY, MAX_ACTION_DELAY,
    MIN_ACCOUNT_FOLLOWERS, MAX_ACCOUNT_FOLLOWERS,
    DAILY_DM_LIMIT, DAILY_COMMENT_LIMIT,
    DM_COOLDOWN_DAYS, COMMENT_COOLDOWN_DAYS,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END,
    TIMEZONE,
)
from .database import (
    log_account, block_account, get_dm_eligible, get_comment_eligible,
    mark_dm_sent, mark_comment_sent, already_commented,
    increment_stat, is_paused,
    get_today_stats,
)
from .messages import get_comment_template, get_dm_template
import pytz
from datetime import datetime

logger = logging.getLogger(__name__)

# ─── Hashtag list ─────────────────────────────────────────────────────────────
SEARCH_HASHTAGS: list[str] = [
    # שיווק ורשתות
    "שיווקדיגיטלי", "סושיאלמדיה", "שיווקאינסטגרם", "שיווקטיקטוק",
    "שיווקישראל", "influencer_israel", "בלוגרים_ישראל", "יוצריתוכן",
    "קריאייטיב",
    # עסקים
    "עסקיםישראל", "יזמות", "עסקקטן", "עצמאים",
    "פרילנסר", "בעליעסקים", "ecommerceisrael",
    # נישות
    "אופנה", "ביוטי", "נייל", "כושר", "תזונה",
    "נדלן", "השקעות", "קריפטו",
    "מסעדות", "שפים", "אוכל",
    "צלמים", "גרפיקאים", "מעצבים",
    # ערים
    "תלאביב", "ירושלים", "חיפה",
    # כללי
    "ישראל", "israel", "israelibusiness",
]


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


def _human_delay() -> None:
    seconds = random.randint(MIN_ACTION_DELAY, MAX_ACTION_DELAY)
    logger.info("Waiting %ds before next action...", seconds)
    time.sleep(seconds)


def _is_valid_account(user_info) -> bool:
    """Filter: mid-size, public, non-verified accounts only."""
    try:
        followers = getattr(user_info, "follower_count", 0) or 0
        is_private  = getattr(user_info, "is_private", False)
        is_verified = getattr(user_info, "is_verified", False)
        return (
            MIN_ACCOUNT_FOLLOWERS <= followers <= MAX_ACCOUNT_FOLLOWERS
            and not is_private
            and not is_verified
        )
    except Exception:
        return False


# ─── Account discovery ────────────────────────────────────────────────────────

def discover_accounts(cl: Client, hashtag: str, fetch_count: int = 30) -> int:
    """
    Fetch recent posts from a hashtag, extract users, save to DB.
    Returns number of new accounts saved.
    """
    new_count = 0
    try:
        medias = cl.hashtag_medias_recent(hashtag, amount=fetch_count)
        for media in medias:
            try:
                user = media.user
                if not _is_valid_account(user):
                    continue
                is_new = log_account(
                    username=user.username,
                    user_pk=str(user.pk),
                    follower_count=getattr(user, "follower_count", 0) or 0,
                    hashtag=hashtag,
                )
                if is_new:
                    new_count += 1
                    increment_stat("accounts_found")
            except Exception as e:
                logger.debug("Skipping account from media: %s", e)
    except FeedbackRequired:
        logger.warning("FeedbackRequired on hashtag '%s' — skipping", hashtag)
    except PleaseWaitFewMinutes:
        logger.warning("Rate limited on hashtag '%s' — sleeping 10min", hashtag)
        time.sleep(600)
    except ClientError as e:
        logger.error("ClientError discovering hashtag '%s': %s", hashtag, e)
    return new_count


# ─── Comment session ──────────────────────────────────────────────────────────

def run_comment_session(cl: Client, limit: int) -> int:
    """
    Search random hashtag → comment on recent posts.
    Returns number of comments sent.
    """
    if is_paused():
        logger.info("Instagram agent paused — skipping comment session.")
        return 0
    if not _is_active_hour():
        logger.info("Outside active hours — skipping comment session.")
        return 0

    today_stats = get_today_stats()
    already_done = today_stats.get("comments_sent", 0)
    remaining = min(limit, DAILY_COMMENT_LIMIT - already_done)
    if remaining <= 0:
        logger.info("Daily comment limit reached.")
        return 0

    hashtag = random.choice(SEARCH_HASHTAGS)
    logger.info("Comment session: hashtag=#%s, target=%d comments", hashtag, remaining)

    # Also discover new accounts while we're here
    discover_accounts(cl, hashtag, fetch_count=40)

    sent = 0
    last_template_id = -1

    try:
        medias = cl.hashtag_medias_recent(hashtag, amount=50)
    except (ClientError, FeedbackRequired, PleaseWaitFewMinutes) as e:
        logger.warning("Cannot fetch hashtag #%s: %s", hashtag, e)
        return 0

    for media in medias:
        if sent >= remaining:
            break
        if is_paused():
            logger.info("Agent paused mid-comment-session.")
            break

        try:
            shortcode = media.code
            username  = media.user.username
            user_info = media.user

            if not _is_valid_account(user_info):
                continue
            if already_commented(shortcode):
                continue

            template_id, comment_text = get_comment_template(last_template_id)

            cl.media_comment(media.id, comment_text)
            mark_comment_sent(username, shortcode, template_id, "sent")
            increment_stat("comments_sent")
            last_template_id = template_id
            sent += 1
            logger.info("Commented on @%s (template #%d)", username, template_id)

        except (UserNotFound, MediaNotFound):
            logger.debug("Post/user disappeared — skipping")
            continue
        except FeedbackRequired as e:
            logger.warning("FeedbackRequired during comment — stopping session: %s", e)
            mark_comment_sent(username, shortcode, template_id, "failed")
            increment_stat("comments_failed")
            break
        except PleaseWaitFewMinutes:
            logger.warning("Rate limited — sleeping 10 min")
            time.sleep(600)
            continue
        except ClientError as e:
            logger.error("ClientError commenting on @%s: %s", username, e)
            mark_comment_sent(username, shortcode, template_id, "failed")
            increment_stat("comments_failed")
            continue
        except Exception as e:
            logger.error("Unexpected error commenting: %s", e)
            continue

        if sent < remaining:
            _human_delay()

    logger.info("Comment session done: %d comments sent.", sent)
    return sent


# ─── DM session ───────────────────────────────────────────────────────────────

def run_dm_session(cl: Client, limit: int) -> int:
    """
    Send DMs to accounts collected during hashtag discovery.
    Returns number of DMs sent.
    """
    if is_paused():
        logger.info("Instagram agent paused — skipping DM session.")
        return 0
    if not _is_active_hour():
        logger.info("Outside active hours — skipping DM session.")
        return 0

    today_stats = get_today_stats()
    already_done = today_stats.get("dms_sent", 0)
    remaining = min(limit, DAILY_DM_LIMIT - already_done)
    if remaining <= 0:
        logger.info("Daily DM limit reached.")
        return 0

    accounts = get_dm_eligible(cooldown_days=DM_COOLDOWN_DAYS, limit=remaining * 2)
    if not accounts:
        logger.info("No DM-eligible accounts in DB.")
        return 0

    logger.info("DM session: up to %d DMs", remaining)
    sent = 0
    last_template_id = -1

    for account in accounts:
        if sent >= remaining:
            break
        if is_paused():
            logger.info("Agent paused mid-DM-session.")
            break

        username = account["username"]
        user_pk  = account["user_pk"]
        hashtag  = account.get("source_hashtag") or "שיווקדיגיטלי"

        template_id, dm_text = get_dm_template(last_template_id, hashtag)

        try:
            cl.direct_send(dm_text, user_ids=[int(user_pk)])
            mark_dm_sent(username, template_id, "sent")
            increment_stat("dms_sent")
            last_template_id = template_id
            sent += 1
            logger.info("DM sent to @%s (template #%d)", username, template_id)

        except UserNotFound:
            logger.debug("@%s not found — skipping", username)
            block_account(username)
            continue
        except FeedbackRequired as e:
            logger.warning("FeedbackRequired sending DM — stopping session: %s", e)
            mark_dm_sent(username, template_id, "failed")
            increment_stat("dms_failed")
            break
        except PleaseWaitFewMinutes:
            logger.warning("Rate limited during DM — sleeping 10 min")
            time.sleep(600)
            continue
        except ClientError as e:
            err_str = str(e).lower()
            if "block" in err_str or "restricted" in err_str:
                logger.warning("Account @%s blocked us — marking blocked", username)
                block_account(username)
            mark_dm_sent(username, template_id, "failed")
            increment_stat("dms_failed")
            logger.error("ClientError DMing @%s: %s", username, e)
            continue
        except Exception as e:
            logger.error("Unexpected error DMing @%s: %s", username, e)
            mark_dm_sent(username, template_id, "failed")
            increment_stat("dms_failed")
            continue

        if sent < remaining:
            _human_delay()

    logger.info("DM session done: %d DMs sent.", sent)
    return sent
