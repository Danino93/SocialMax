"""
ig/feed_engage.py — Feed Browse + Hashtag Engagement + Follow/Unfollow Engine
------------------------------------------------------------------------------
פעילות רקע לאורך כל היום כדי לשמור על חשבון "חי":

  1. run_feed_browse(cl)      — גלול פיד, לייק 8-15 פוסטים טבעיים
  2. run_hashtag_engage(cl)   — חפש hashtags ישראליים, לייק + תגובה קצרה
  3. run_follow_session(cl)   — עקוב אחרי משתמשים רלוונטיים (לימיט יומי)
  4. run_unfollow_session(cl) — הפסק לעקוב אחרי מי שלא עקב בחזרה (4 ימים)
"""
import logging
import random
import time
from datetime import datetime

import pytz
from instagrapi import Client
from instagrapi.exceptions import (
    ClientError, FeedbackRequired, PleaseWaitFewMinutes, UserNotFound,
)

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused, increment_stat,
    log_follow, is_followed_before, get_follows_today,
    get_unfollow_candidates, mark_unfollowed,
)
from shared.ai_provider import ai_generate_sync

logger = logging.getLogger(__name__)

# ─── Limits ───────────────────────────────────────────────────────────────────
DAILY_FOLLOW_LIMIT   = 40   # עקיבות ביום (בטוח לאינסטגרם)
DAILY_UNFOLLOW_LIMIT = 40
UNFOLLOW_AFTER_DAYS  = 4    # ימים לפני ביטול עקיבה

# ─── Hashtags ישראליים עסקיים ─────────────────────────────────────────────────
TARGET_HASHTAGS = [
    "שיווקדיגיטלי",    "עסקיםקטנים",       "שיווקברשתות",
    "קידוםעסקי",       "אינסטגרםישראל",    "עוקביםאינסטגרם",
    "instagramisrael", "businessisrael",   "marketingisrael",
    "startupnation",   "digitalmarketing", "socialmediatips",
    "contentcreator",  "businessowner",    "growthmarketing",
    "branding",        "onlinebusiness",   "הצלחה",
]

# תגובות קצרות וטבעיות (fallback כש-Gemini לא זמין)
COMMENT_TEMPLATES = [
    "תוכן מעולה! 🔥", "פוסט מדהים 👏", "ממש אהבתי! ❤️",
    "מעניין מאוד 💡",  "שווה שיתוף! 🚀",  "תוכן איכותי 💪",
    "אחלה פוסט! 😊",  "כל הכבוד! 👍",   "מושלם! ✨",
]


def _is_active_hour() -> bool:
    tz = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


# ─── 1. Feed Browse ───────────────────────────────────────────────────────────

def run_feed_browse(cl: Client, like_limit: int = 12) -> int:
    """
    גולל את הפיד ומלייק פוסטים — מחקה התנהגות אנושית טבעית.
    זה חיוני לשמור על האלגוריתם של אינסטגרם מרוצה.
    """
    if is_paused() or not _is_active_hour():
        return 0

    liked = 0
    try:
        feed_data = cl.get_timeline_feed()
        items = feed_data.get("feed_items", []) if isinstance(feed_data, dict) else []
        random.shuffle(items)

        for item in items[:like_limit + 8]:
            if liked >= like_limit:
                break
            try:
                media = item.get("media_or_ad") or item.get("media") if isinstance(item, dict) else None
                if not media:
                    continue
                media_id = media.get("id") if isinstance(media, dict) else getattr(media, "id", None)
                if not media_id:
                    continue
                cl.media_like(str(media_id))
                liked += 1
                increment_stat("likes_sent")
                time.sleep(random.uniform(4, 10))
            except Exception:
                continue

    except (PleaseWaitFewMinutes, FeedbackRequired):
        logger.warning("Feed Browse: rate limited")
        time.sleep(120)
    except Exception as e:
        logger.debug("Feed Browse error: %s", e)

    if liked:
        logger.info("Feed Browse: %d לייקים בפיד", liked)
    return liked


# ─── 2. Hashtag Engagement ────────────────────────────────────────────────────

def run_hashtag_engage(
    cl: Client,
    like_count: int = 25,
    comment_count: int = 5,
) -> dict:
    """
    מחפש 3 hashtags ישראליים עסקיים ומבצע לייק + תגובה קצרה.
    תגובות נוצרות ע"י Gemini — טבעיות ורלוונטיות לתוכן.
    """
    if is_paused() or not _is_active_hour():
        return {"liked": 0, "commented": 0}

    hashtags = random.sample(TARGET_HASHTAGS, min(3, len(TARGET_HASHTAGS)))
    liked = 0
    commented = 0

    for hashtag in hashtags:
        if liked >= like_count and commented >= comment_count:
            break
        try:
            medias = cl.hashtag_medias_recent(hashtag, amount=20)
            random.shuffle(medias)
            time.sleep(random.uniform(2, 5))

            for media in medias:
                if liked >= like_count and commented >= comment_count:
                    break

                media_id = str(media.id) if hasattr(media, "id") else None
                if not media_id:
                    continue

                # לייק
                if liked < like_count:
                    try:
                        cl.media_like(media_id)
                        liked += 1
                        increment_stat("likes_sent")
                        time.sleep(random.uniform(3, 8))
                    except Exception:
                        pass

                # תגובה — רק על חלק מהפוסטים (30% סיכוי)
                if commented < comment_count and random.random() < 0.30:
                    try:
                        caption = str(getattr(media, "caption_text", "") or "")[:120]
                        ai_prompt = (
                            f"כתוב תגובה אינסטגרם קצרה (2-5 מילים) בעברית.\n"
                            f"Caption: {caption or 'תמונה/וידאו'}\n"
                            f"רק התגובה עצמה, חיובית וטבעית, ללא אמוג'י עודף."
                        )
                        comment_text = ai_generate_sync(ai_prompt, "ig_hashtag_comment")
                        if not comment_text or len(comment_text) > 80:
                            comment_text = random.choice(COMMENT_TEMPLATES)

                        cl.media_comment(media_id, comment_text)
                        commented += 1
                        increment_stat("comments_sent")
                        time.sleep(random.uniform(20, 40))
                    except Exception:
                        pass

        except (PleaseWaitFewMinutes, FeedbackRequired):
            logger.warning("Hashtag Engage: rate limited on #%s — sleep 5m", hashtag)
            time.sleep(300)
            break
        except Exception as e:
            logger.debug("Hashtag #%s error: %s", hashtag, e)

    logger.info("Hashtag Engage: לייק %d | תגובות %d", liked, commented)
    return {"liked": liked, "commented": commented}


# ─── 3. Follow Session ────────────────────────────────────────────────────────

def run_follow_session(cl: Client, limit: int = 12) -> int:
    """
    עוקב אחרי משתמשים רלוונטיים מ-hashtags עסקיים.
    שומר בDB כדי לדעת מתי לבטל עקיבה.
    """
    if is_paused() or not _is_active_hour():
        return 0

    today_follows = get_follows_today()
    if today_follows >= DAILY_FOLLOW_LIMIT:
        logger.info("Follow Session: הגענו ללימיט יומי (%d/%d)", today_follows, DAILY_FOLLOW_LIMIT)
        return 0

    remaining = min(limit, DAILY_FOLLOW_LIMIT - today_follows)
    hashtags  = random.sample(TARGET_HASHTAGS, min(2, len(TARGET_HASHTAGS)))
    followed  = 0

    for hashtag in hashtags:
        if followed >= remaining:
            break
        try:
            medias = cl.hashtag_medias_recent(hashtag, amount=30)
            time.sleep(random.uniform(2, 5))

            for media in medias:
                if followed >= remaining:
                    break

                user     = getattr(media, "user", None)
                username = getattr(user, "username", "") or ""
                user_pk  = str(getattr(user, "pk", "")) or ""

                if not username or not user_pk:
                    continue
                if getattr(user, "is_private", False):
                    continue
                if is_followed_before(user_pk):
                    continue

                try:
                    cl.user_follow(int(user_pk))
                    log_follow(username, user_pk)
                    followed += 1
                    increment_stat("follows_sent")
                    logger.info("Follow → @%s (#%s)", username, hashtag)
                    time.sleep(random.uniform(25, 55))
                except (UserNotFound,):
                    continue
                except (FeedbackRequired, PleaseWaitFewMinutes):
                    logger.warning("Follow: rate limited — stopping")
                    time.sleep(300)
                    return followed
                except Exception:
                    continue

        except Exception as e:
            logger.debug("Follow session error #%s: %s", hashtag, e)

    logger.info("Follow Session: %d עקיבות", followed)
    return followed


# ─── 4. Unfollow Session ─────────────────────────────────────────────────────

def run_unfollow_session(cl: Client, limit: int = 20) -> int:
    """
    מבטל עקיבה אחרי מי שלא עקב בחזרה לאחר UNFOLLOW_AFTER_DAYS ימים.
    שומר על יחס עוקבים / נעקבים נקי.
    """
    if is_paused():
        return 0

    candidates = get_unfollow_candidates(days=UNFOLLOW_AFTER_DAYS, limit=limit)
    if not candidates:
        return 0

    unfollowed = 0
    for user in candidates:
        try:
            cl.user_unfollow(int(user["user_pk"]))
            mark_unfollowed(user["user_pk"])
            unfollowed += 1
            logger.info("Unfollow → @%s", user["username"])
            time.sleep(random.uniform(20, 45))
        except (FeedbackRequired, PleaseWaitFewMinutes):
            logger.warning("Unfollow: rate limited — stopping")
            time.sleep(300)
            break
        except Exception:
            continue

    if unfollowed:
        logger.info("Unfollow Session: %d ביטולי עקיבה", unfollowed)
    return unfollowed
