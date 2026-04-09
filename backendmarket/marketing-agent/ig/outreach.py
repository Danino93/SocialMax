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
    log_warm_lead, get_warm_leads_eligible, mark_warm_lead_dm_sent,
    start_ig_conversation,
)
from .messages import get_comment_template, get_dm_template
from shared.ai_provider import ai_generate_sync
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
    Note: media.user is a UserShort — follower_count is not populated.
    We save all public, non-verified accounts and filter at outreach time.
    """
    new_count = 0
    try:
        medias = cl.hashtag_medias_recent(hashtag, amount=fetch_count)
        for media in medias:
            try:
                user = media.user
                if getattr(user, "is_private", False):
                    continue
                if getattr(user, "is_verified", False):
                    continue
                username = getattr(user, "username", "") or ""
                user_pk  = str(getattr(user, "pk", "")) or ""
                if not username or not user_pk:
                    continue
                is_new = log_account(
                    username=username,
                    user_pk=user_pk,
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

            # media.user is UserShort — follower_count not reliably populated.
            # Skip only private / verified accounts.
            if getattr(user_info, "is_private", False):
                continue
            if getattr(user_info, "is_verified", False):
                continue
            if already_commented(shortcode):
                continue

            # ── AI comment generation ──────────────────────────────────────────
            caption = getattr(media, "caption_text", "") or ""
            ai_prompt = (
                f'כתוב תגובה קצרה (1 משפט) בעברית לפוסט אינסטגרם של @{username}.\n'
                f'נושא הפוסט: "{caption[:150]}"\n'
                f'מטרה: תגובה אמיתית שנראית שקראת את הפוסט + mention עדין של SocialSniper.\n'
                f'אסור: spam, @username מרובים, פרסום ישיר.'
            )
            ai_comment = ai_generate_sync(ai_prompt, "ig_comment")
            if ai_comment:
                comment_text = ai_comment
                template_id  = last_template_id  # לא נעדכן A/B כשAI כתב
                logger.debug("AI comment for @%s (%d chars)", username, len(comment_text))
            else:
                template_id, comment_text = get_comment_template(last_template_id)

            cl.media_comment(media.id, comment_text)
            mark_comment_sent(username, shortcode, template_id, "sent")
            increment_stat("comments_sent")
            last_template_id = template_id
            sent += 1
            logger.info("Commented on @%s (%s)", username, "AI" if ai_comment else f"template #{template_id}")

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
        followers = account.get("follower_count", 0)

        # ── AI DM generation ───────────────────────────────────────────────────
        ai_prompt = (
            f'כתוב DM קצר בעברית לאינסטגרם.\n'
            f'שם משתמש: @{username}, {followers:,} עוקבים.\n'
            f'מקור: #{hashtag}.\n'
            f'מטרה: הצע שירות SMM (עוקבים/לייקים/צפיות) — SocialSniper.\n'
            f'מקסימום 2 משפטים + הפנייה ל-@socialsniper93_bot.\n'
            f'טון: לא spam, חברי, ישיר.'
        )
        ai_dm = ai_generate_sync(ai_prompt, "ig_dm")
        if ai_dm:
            dm_text     = ai_dm
            template_id = last_template_id
            logger.debug("AI DM for @%s (%d chars)", username, len(dm_text))
        else:
            template_id, dm_text = get_dm_template(last_template_id, hashtag)

        try:
            cl.direct_send(dm_text, user_ids=[int(user_pk)])
            mark_dm_sent(username, template_id, "sent")
            increment_stat("dms_sent")
            last_template_id = template_id
            sent += 1
            logger.info("DM sent to @%s (%s)", username, "AI" if ai_dm else f"template #{template_id}")

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


# ─── Feature 6 — Reels Like + Save ───────────────────────────────────────────

def run_reels_save_session(cl: Client, limit: int = 20) -> int:
    """
    Feature 6: לייק + Save על Reels של accounts מה-DB.
    Save בולט יותר ללייק רגיל — הם מקבלים התראה ורואים אותנו.
    מחזיר מספר Reels שנשמרו.
    """
    if is_paused():
        return 0
    if not _is_active_hour():
        return 0

    accounts = get_dm_eligible(cooldown_days=0, limit=60)
    if not accounts:
        return 0

    random.shuffle(accounts)
    saved = 0

    for account in accounts[:40]:
        if saved >= limit:
            break
        if is_paused():
            break

        user_pk = account.get("user_pk")
        if not user_pk:
            continue

        try:
            medias = cl.user_medias(int(user_pk), amount=5)
        except Exception:
            continue

        for media in medias:
            # media_type=2 → Video/Reel
            if getattr(media, "media_type", 0) != 2:
                continue
            try:
                cl.media_like(media.id)
                cl.media_save(media.id)
                increment_stat("dms_sent")  # log as engagement
                saved += 1
                logger.debug("Reels save: @%s media %s", account["username"], media.id)
            except FeedbackRequired:
                logger.warning("FeedbackRequired during Reels save — stopping")
                return saved
            except Exception:
                pass
            break  # מקסימום Reel אחד לאקאונט

        if saved < limit:
            time.sleep(random.randint(15, 40))

    logger.info("Reels Save session: %d Reels saved", saved)
    return saved


# ─── Feature 7 — Warm Lead Tracker (מי אינטרקט עם הפוסטים שלנו) ──────────────

def discover_warm_leads(cl: Client) -> int:
    """
    Feature 7: מוצא אנשים שלייקו/הגיבו על הפוסטים שלנו → warm leads!
    הם כבר הראו עניין → הסיכוי להמיר גבוה יותר.
    מחזיר מספר leads חדשים שנמצאו.
    """
    found = 0
    try:
        our_pk = cl.user_id
        medias = cl.user_medias(our_pk, amount=5)
    except Exception as e:
        logger.warning("Warm leads: can't fetch our medias: %s", e)
        return 0

    for media in medias:
        media_id_str = str(media.id)

        # לייקים
        try:
            likers = cl.media_likers(media.id)
            for liker in likers[:25]:
                username = getattr(liker, "username", "")
                pk       = str(getattr(liker, "pk", ""))
                if username and pk:
                    if log_warm_lead(username, pk, "post_like", media_id_str):
                        found += 1
        except Exception:
            pass

        # תגובות
        try:
            comments = cl.media_comments(media.id, amount=30)
            for comment in comments:
                u = comment.user
                if str(u.pk) == str(cl.user_id):
                    continue  # תגובות שלנו
                if log_warm_lead(u.username, str(u.pk), "post_comment", media_id_str):
                    found += 1
        except Exception:
            pass

    logger.info("Warm leads discovered: %d new leads", found)
    return found


def run_warm_leads_dm_session(cl: Client, limit: int = 5) -> int:
    """
    שולח DMs ל-warm leads שטרם פנינו אליהם.
    מחזיר מספר DMs שנשלחו.
    """
    if is_paused():
        return 0

    leads = get_warm_leads_eligible(limit=limit * 3)
    if not leads:
        logger.info("Warm leads DM: אין leads פנויים.")
        return 0

    sent = 0
    for lead in leads:
        if sent >= limit:
            break
        username = lead["username"]
        user_pk  = lead["user_pk"]
        source   = lead.get("source", "engagement")

        ai_prompt = (
            f"כתוב DM קצר בעברית (2 משפטים) לאינסטגרם.\n"
            f"@{username} אינטרקט עם הפוסטים שלנו ({source}) — הוא מכיר את SocialSniper.\n"
            f"הצע שיחה ופנה ל-@socialsniper93_bot.\n"
            f"טון: חברי, ישיר, לא spam."
        )
        dm_text = ai_generate_sync(ai_prompt, "ig_warm_dm")
        if not dm_text:
            dm_text = (
                f"היי 👋 ראיתי שאתה עוקב אחרינו — תודה!\n"
                f"אם אתה מחפש לגדול ברשתות, @socialsniper93_bot בשקלים 🇮🇱"
            )

        try:
            cl.direct_send(dm_text, user_ids=[int(user_pk)])
            mark_warm_lead_dm_sent(username)
            start_ig_conversation(username)
            increment_stat("dms_sent")
            sent += 1
            logger.info("Warm Lead DM → @%s (%s)", username, source)
            _human_delay()

        except (UserNotFound, FeedbackRequired):
            logger.debug("Warm lead DM blocked for @%s", username)
            continue
        except Exception as e:
            logger.debug("Warm lead DM failed for @%s: %s", username, e)

    logger.info("Warm Leads DM session: %d DMs sent", sent)
    return sent
