"""
ig/competitor.py — Smart Competitor Auto-Discovery + Follower Harvesting
-------------------------------------------------------------------------
Feature 2: מגלה בעצמו accounts מתחרים ישראלים בתחום SMM, בוחר את הרלוונטיים
ביותר, ושולח DM לעוקבים שלהם — הם כבר יודעים שהם צריכים שירות כזה!

אין צורך להגדיר IG_COMPETITORS ב-.env — המערכת מחליטה לבד.

לוגיקת גילוי:
  1. מחפש תחת hashtags של SMM ישראלי
  2. מנתח bio של accounts שמצא
  3. מסנן לפי keywords + follower count
  4. שומר ב-DB עם ציון (score) רלוונטיות
  5. בכל ריצה בוחר top-5 מהמטמון (מגלה חדשים רק אם המטמון ישן)

לוח זמנים: 10:00 (דרך main.py)
"""
import logging
import random
import time
from datetime import datetime, timedelta

import pytz
from instagrapi import Client
from instagrapi.exceptions import (
    ClientError, FeedbackRequired, PleaseWaitFewMinutes,
    UserNotFound,
)

from .config import (
    ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE,
    DM_COOLDOWN_DAYS,
)
from .database import (
    is_paused, log_account, get_dm_cooldown_ok_by_pk,
    mark_dm_sent, increment_stat, start_ig_conversation,
    cache_competitor, get_cached_competitors, is_competitor_cache_fresh,
)
from shared.ai_provider import ai_generate_sync

logger = logging.getLogger(__name__)

DAILY_COMPETITOR_DM_LIMIT = 8   # מקסימום DMs מהמתחרים ביום
FOLLOWERS_PER_COMPETITOR  = 50  # כמה עוקבים לשלוף מכל מתחרה
CACHE_MAX_AGE_DAYS        = 7   # כל כמה ימים לגלות מחדש מתחרים

# Hashtags לחיפוש מתחרים SMM ישראלים
DISCOVERY_HASHTAGS = [
    "שיווקדיגיטלי",
    "עוקביםאינסטגרם",
    "קידוםברשתות",
    "סושיאלמדיה",
    "שיווקברשתות",
    "smm",
    "digitalmarketingisrael",
    "instagramisrael",
    "socialmediaisrael",
    "marketingisrael",
]

# Keywords בביו שמעידים על שירות SMM (מתחרה)
SMM_BIO_KEYWORDS = [
    "עוקבים", "followers", "likes", "לייקים", "smm", "שיווק",
    "boost", "views", "צפיות", "תגובות", "comments", "social media",
    "smmpanel", "שירותי", "hashtaglike", "קידום", "promote",
    "reels", "viral", "ויראלי", "growth", "צמיחה", "engagement",
]

# Keywords בשם משתמש או ביו שמציינים מתחרה ישיר
COMPETITOR_USERNAME_HINTS = [
    "smm", "social", "followers", "likes", "boost", "grow", "viral",
    "marketing", "digital", "קידום", "שיווק", "עוקבים", "לייקים",
]

# DM Templates
COMPETITOR_DM_TEMPLATES = [
    "היי {name} 👋\n"
    "ראיתי שאתה מתעניין בשיווק ברשתות.\n"
    "@socialsniper93_bot — SMM ישראלי בשקלים, מהיר ואמין 🇮🇱",

    "שלום {name}!\n"
    "בא לי להציג שירות SMM ישראלי שכדאי להשוות:\n"
    "@socialsniper93_bot — עוקבים, לייקים, ביקורות גוגל. מחירים בשקלים ⚡",

    "היי {name} 😊\n"
    "אם אתה בתחום השיווק ברשתות — @socialsniper93_bot שווה בדיקה.\n"
    "שירות ישראלי, מחירים בשקלים, מסירה מהירה 🇮🇱",

    "שלום {name}!\n"
    "SocialSniper — פתרון SMM ישראלי מהיר.\n"
    "עוקבים / לייקים / ביקורות גוגל — הכל בשקלים 🚀 @socialsniper93_bot",
]


# ─── Bio Scoring ──────────────────────────────────────────────────────────────

def _score_account(username: str, biography: str, follower_count: int) -> int:
    """
    מחזיר ציון רלוונטיות (0-100) לפי ביו + username + עוקבים.
    ציון גבוה = סבירות גבוהה יותר שזה מתחרה SMM.
    """
    score = 0
    bio_lower = biography.lower() if biography else ""
    user_lower = username.lower()

    # ביו: keywords
    for kw in SMM_BIO_KEYWORDS:
        if kw.lower() in bio_lower:
            score += 8

    # username hints
    for hint in COMPETITOR_USERNAME_HINTS:
        if hint.lower() in user_lower:
            score += 10

    # טווח עוקבים אידיאלי: 500–50k (לא גדול מדי = בוט, לא קטן מדי = לא רלוונטי)
    if 500 <= follower_count <= 50_000:
        score += 15
    elif follower_count > 50_000:
        score += 5

    # קישור בביו — עסקים עם site מוכרים שירות
    if "http" in bio_lower or "link" in bio_lower or "bit.ly" in bio_lower:
        score += 5

    # הגבל ל-100
    return min(score, 100)


# ─── Auto-Discovery ────────────────────────────────────────────────────────────

def _discover_competitors(cl: Client, max_candidates: int = 60) -> list[dict]:
    """
    מחפש מתחרים SMM ב-Instagram לפי hashtags.
    מחזיר רשימת dicts: {username, pk, score, bio, followers}
    """
    candidates: dict[str, dict] = {}
    hashtags = random.sample(DISCOVERY_HASHTAGS, min(4, len(DISCOVERY_HASHTAGS)))

    for hashtag in hashtags:
        if len(candidates) >= max_candidates:
            break
        try:
            logger.info("Competitor Discovery: חיפוש #%s", hashtag)
            medias = cl.hashtag_medias_recent(hashtag, amount=20)
            time.sleep(random.uniform(3, 7))

            for media in medias:
                if len(candidates) >= max_candidates:
                    break

                user = getattr(media, "user", None)
                if not user:
                    continue

                username = getattr(user, "username", "") or ""
                user_pk  = str(getattr(user, "pk", "")) or ""
                if not username or not user_pk or username in candidates:
                    continue

                # נסה לשלוף פרטי חשבון מלאים
                try:
                    full_user   = cl.user_info(user_pk)
                    biography   = getattr(full_user, "biography", "") or ""
                    followers   = getattr(full_user, "follower_count", 0) or 0
                    is_private  = getattr(full_user, "is_private", False)
                    is_business = getattr(full_user, "is_business", False)
                    time.sleep(random.uniform(1.5, 3.5))
                except Exception:
                    biography  = ""
                    followers  = 0
                    is_private = True
                    is_business = False

                if is_private:
                    continue
                if followers < 300:
                    continue

                score = _score_account(username, biography, followers)
                if score < 10:
                    continue  # לא רלוונטי

                candidates[username] = {
                    "username": username,
                    "pk": user_pk,
                    "score": score,
                    "bio": biography[:200],
                    "followers": followers,
                }

        except (PleaseWaitFewMinutes, FeedbackRequired):
            logger.warning("Rate limited during competitor discovery — sleeping 5m")
            time.sleep(300)
            break
        except Exception as e:
            logger.debug("Discovery error for #%s: %s", hashtag, e)
            continue

    # מיין לפי score
    result = sorted(candidates.values(), key=lambda x: x["score"], reverse=True)
    logger.info(
        "Competitor Discovery: נמצאו %d מועמדים, top score=%d",
        len(result), result[0]["score"] if result else 0,
    )
    return result


def _refresh_competitor_cache(cl: Client) -> None:
    """מגלה מתחרים חדשים ושומר ב-DB."""
    logger.info("Competitor Discovery: מרענן מטמון מתחרים...")
    candidates = _discover_competitors(cl)

    # שמור top-20 עם score >= 15
    saved = 0
    for c in candidates:
        if c["score"] < 15:
            continue
        cache_competitor(
            username=c["username"],
            user_pk=c["pk"],
            score=c["score"],
            bio=c["bio"],
            followers=c["followers"],
        )
        saved += 1
        if saved >= 20:
            break

    logger.info("Competitor Discovery: %d מתחרים נשמרו ב-DB", saved)


# ─── Main Harvest ──────────────────────────────────────────────────────────────

def run_competitor_harvest(cl: Client) -> int:
    """
    מגלה מתחרים אוטומטית, שולף עוקבים, ושולח להם DM.
    מחזיר מספר DMs שנשלחו.
    """
    if is_paused():
        logger.info("Competitor Harvest: Agent מושהה.")
        return 0
    if not _is_active_hour():
        logger.info("Competitor Harvest: מחוץ לשעות פעילות.")
        return 0

    # האם המטמון ישן? אם כן — גלה מחדש
    if not is_competitor_cache_fresh(max_age_days=CACHE_MAX_AGE_DAYS):
        _refresh_competitor_cache(cl)

    # קח top-5 מתחרים מהמטמון
    competitors = get_cached_competitors(limit=5)
    if not competitors:
        logger.warning("Competitor Harvest: אין מתחרים במטמון — מריץ גילוי חירום")
        _refresh_competitor_cache(cl)
        competitors = get_cached_competitors(limit=5)
        if not competitors:
            logger.error("Competitor Harvest: לא נמצאו מתחרים גם לאחר גילוי.")
            return 0

    logger.info(
        "Competitor Harvest: %d מתחרים נבחרו: %s",
        len(competitors),
        [c["username"] for c in competitors],
    )

    sent = 0
    random.shuffle(competitors)

    for comp in competitors:
        if sent >= DAILY_COMPETITOR_DM_LIMIT:
            break
        if is_paused():
            break

        comp_username = comp.get("username", "")
        comp_pk = str(comp.get("user_pk") or comp.get("pk") or "")
        if not comp_username or not comp_pk:
            logger.warning(
                "Competitor Harvest: skipping invalid competitor row: %s",
                comp,
            )
            continue

        logger.info("Competitor Harvest: שולף עוקבים מ-@%s (score=%d)", comp_username, comp.get("score", 0))

        try:
            comp_pk_int = int(comp_pk)
        except (TypeError, ValueError):
            logger.warning(
                "Competitor Harvest: skipping competitor with non-numeric pk: %s",
                comp,
            )
            continue

        try:
            followers_dict = cl.user_followers(comp_pk_int, amount=FOLLOWERS_PER_COMPETITOR)
            followers = list(followers_dict.values())
        except (PleaseWaitFewMinutes, FeedbackRequired):
            logger.warning("Rate limited on @%s followers — sleeping 5m", comp_username)
            time.sleep(300)
            continue
        except Exception as e:
            logger.debug("Can't get followers of @%s: %s", comp_username, e)
            continue

        random.shuffle(followers)

        for user in followers:
            if sent >= DAILY_COMPETITOR_DM_LIMIT:
                break
            if is_paused():
                break

            username = getattr(user, "username", "") or ""
            user_pk  = str(getattr(user, "pk", ""))
            if not username or not user_pk:
                continue
            if getattr(user, "is_private", False):
                continue

            if not get_dm_cooldown_ok_by_pk(user_pk, DM_COOLDOWN_DAYS):
                continue

            follower_count = getattr(user, "follower_count", 0) or 0
            log_account(username, user_pk, follower_count, f"competitor_{comp_username}")

            name       = getattr(user, "full_name", "") or username
            first_name = name.split()[0] if name else username

            ai_prompt = (
                f"כתוב DM קצר בעברית (2 משפטים) לאינסטגרם.\n"
                f"@{username} עוקב אחרי חשבון SMM מתחרה — הוא יודע מה זה שירות כזה.\n"
                f"הצע את SocialSniper (@socialsniper93_bot) כאלטרנטיבה ישראלית טובה יותר.\n"
                f"טון: ישיר, לא spam, ידידותי."
            )
            dm_text = ai_generate_sync(ai_prompt, "ig_competitor_dm")
            if not dm_text:
                tmpl = random.choice(COMPETITOR_DM_TEMPLATES)
                dm_text = tmpl.format(name=first_name)

            try:
                cl.direct_send(dm_text, user_ids=[int(user_pk)])
                mark_dm_sent(username, -1, "sent")
                start_ig_conversation(username)
                increment_stat("dms_sent")
                sent += 1
                logger.info("Competitor DM → @%s (מ-@%s)", username, comp_username)
                time.sleep(random.randint(90, 180))

            except UserNotFound:
                logger.debug("@%s not found", username)
            except (FeedbackRequired, PleaseWaitFewMinutes):
                logger.warning("Rate limited — stopping competitor DMs")
                time.sleep(600)
                return sent
            except ClientError as e:
                logger.debug("ClientError DMing @%s: %s", username, e)

        time.sleep(random.randint(30, 60))

    logger.info("Competitor Harvest: %d DMs נשלחו", sent)
    return sent


def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END
