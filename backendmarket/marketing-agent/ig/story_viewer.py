"""
ig/story_viewer.py — Story Viewer + Poll Engagement
-----------------------------------------------------
Feature 1: Story Viewer — צופה בסטוריז של accounts מה-DB.
  → הם רואים את שם החשבון שלנו ב-viewers → חשיפה אורגנית חינם.

Feature 10: Poll Engagement — כשסטורי מכיל Poll, מצביע עליו.
  → מגביר engagement + נראה יותר אנושי.

לוח זמנים: 13:00 (דרך main.py)
"""
import logging
import random
import time

from instagrapi import Client
from instagrapi.exceptions import (
    ClientError, FeedbackRequired, PleaseWaitFewMinutes,
    UserNotFound,
)

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused, get_dm_eligible,
    is_story_viewed, log_story_view, get_story_views_today, increment_stat,
)

import pytz
from datetime import datetime

logger = logging.getLogger(__name__)

DAILY_STORY_VIEW_LIMIT = 25   # מקסימום סטוריז ביום
ACCOUNTS_PER_SESSION  = 40    # כמה accounts לנסות לכל session


def run_story_session(cl: Client) -> int:
    """
    צופה בסטוריז של accounts מה-DB.
    מחזיר מספר סטוריז שנצפו.
    """
    if is_paused():
        logger.info("Story Viewer: Agent מושהה.")
        return 0
    if not _is_active_hour():
        logger.info("Story Viewer: מחוץ לשעות פעילות.")
        return 0

    already_viewed = get_story_views_today()
    remaining = DAILY_STORY_VIEW_LIMIT - already_viewed
    if remaining <= 0:
        logger.info("Story Viewer: הגיע ללימיט יומי.")
        return 0

    # שלוף accounts מה-DB (משתמשים שטרם שלחנו להם DM — נטרל חום לפני DM)
    accounts = get_dm_eligible(cooldown_days=0, limit=ACCOUNTS_PER_SESSION)
    if not accounts:
        logger.info("Story Viewer: אין accounts ב-DB.")
        return 0

    random.shuffle(accounts)
    viewed_total = 0

    logger.info("Story Viewer: מנסה לצפות בסטוריז של %d accounts", len(accounts))

    for account in accounts:
        if viewed_total >= remaining:
            break
        if is_paused():
            break

        username = account["username"]
        user_pk  = account.get("user_pk")
        if not user_pk:
            continue

        try:
            stories = cl.user_stories(int(user_pk))
        except UserNotFound:
            logger.debug("Story Viewer: @%s לא נמצא", username)
            continue
        except (FeedbackRequired, PleaseWaitFewMinutes):
            logger.warning("Story Viewer: Rate limited — sleeping 5 min")
            time.sleep(300)
            break
        except ClientError as e:
            logger.debug("Story Viewer: ClientError for @%s: %s", username, e)
            continue
        except Exception as e:
            logger.debug("Story Viewer: error for @%s: %s", username, e)
            continue

        if not stories:
            continue

        # בחר סטוריז שטרם נצפו
        new_stories = [s for s in stories if not is_story_viewed(str(s.pk))]
        if not new_stories:
            continue

        # צפה בסטוריז (כל אחת בנפרד)
        story_pks = [s.pk for s in new_stories[:3]]  # מקסימום 3 סטוריז לאקאונט
        try:
            cl.story_seen(story_pks)
            for s in new_stories[:3]:
                log_story_view(str(s.pk), username)
                viewed_total += 1
                increment_stat("accounts_found")  # שימוש בשדה קיים לנוחות

                # Feature 10: Poll voting — אם הסטורי מכיל Poll
                _try_vote_poll(cl, s)

            logger.info("Story Viewer: צפה ב-%d סטוריז של @%s", len(story_pks), username)

        except Exception as e:
            logger.debug("Story Viewer: error viewing stories for @%s: %s", username, e)
            continue

        # עיכוי אנושי בין accounts
        time.sleep(random.uniform(4, 10))

    logger.info("Story Viewer session הסתיים: %d סטוריז נצפו", viewed_total)
    return viewed_total


def _try_vote_poll(cl: Client, story) -> None:
    """
    Feature 10: מנסה להצביע ב-Poll אם קיים בסטורי.
    שקט בשגיאות — לא קריטי.
    """
    try:
        # בדוק אם יש sticker poll בסטורי
        stickers = getattr(story, "story_sticker_infos", []) or []
        for sticker in stickers:
            sticker_type = getattr(sticker, "type", "") or ""
            if "poll" in sticker_type.lower():
                vote_index = random.choice([0, 1])  # הצבע אקראית
                cl.story_vote(story.pk, sticker.id, str(vote_index))
                logger.debug("Story poll vote: story %s, vote=%d", story.pk, vote_index)
                return
    except Exception:
        pass  # שקט — poll voting לא קריטי


def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END
