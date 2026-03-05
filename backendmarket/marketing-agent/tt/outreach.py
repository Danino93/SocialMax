"""
tt_outreach.py — outreach ל-TikTok: תגובות + עקיבות
פעולות דרך Playwright בלבד.

⚠️  לימיטים מחמירים:
     - תגובות: 5–10 דקות בין תגובה לתגובה
     - עקיבות: 3–6 דקות בין עקיבה לעקיבה
"""
import asyncio
import logging
import random
from datetime import datetime

import pytz
from playwright.async_api import Page

from .config import (
    DAILY_TT_COMMENT_LIMIT,
    DAILY_TT_FOLLOW_LIMIT,
    TT_MIN_ACTION_DELAY,
    TT_MAX_ACTION_DELAY,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE,
)
from .database import (
    get_uncontacted_videos, already_commented, mark_comment_sent,
    get_unfollowed_users, already_followed, mark_followed,
    increment_stat, get_today_stats, is_paused,
)
from .messages import get_comment_template
from .browser import human_delay, slow_scroll

logger = logging.getLogger(__name__)


def _is_active_hour() -> bool:
    """בודק אם אנחנו בשעות הפעילות המוגדרות."""
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


# ─── תגובות ────────────────────────────────────────────────────────────────────

async def comment_on_video(page: Page, author: str, video_id: str, comment_text: str) -> bool:
    """
    מנווט לוידאו TikTok ומשאיר תגובה.
    URL פורמט: https://www.tiktok.com/@{author}/video/{video_id}
    מחזיר True אם הצליח.
    """
    url = f"https://www.tiktok.com/@{author}/video/{video_id}"
    try:
        logger.info("מגיב על וידאו: %s", url)
        await page.goto(url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(3, 5))

        # גלול קצת — נראה כאילו צפינו
        await slow_scroll(page, times=1, pause=2.0)
        await asyncio.sleep(random.uniform(2, 4))

        # מצא את תיבת התגובה
        comment_input_sels = [
            '[data-e2e="comment-input"]',
            'div[contenteditable="true"][data-e2e*="comment"]',
            'div[class*="DraftEditor"]',
            'div[contenteditable="true"]',
        ]

        comment_box = None
        # לחץ על "Add comment" / אזור התגובות תחילה לפתיחה
        try:
            open_btn_sels = [
                '[data-e2e="comment-icon"]',
                'span[class*="commentCount"]',
                'div[class*="comment-bar"]',
            ]
            for sel in open_btn_sels:
                try:
                    btn = page.locator(sel).first
                    if await btn.is_visible(timeout=3000):
                        await btn.click()
                        await asyncio.sleep(1.5)
                        break
                except Exception:
                    continue
        except Exception:
            pass

        # מצא input
        for sel in comment_input_sels:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=4000):
                    comment_box = el
                    break
            except Exception:
                continue

        if not comment_box:
            logger.warning("לא נמצאה תיבת תגובה עבור %s", url)
            return False

        await comment_box.click()
        await asyncio.sleep(random.uniform(0.5, 1))

        # הקלדה אנושית
        for char in comment_text:
            await comment_box.type(char, delay=random.randint(55, 130))
            if random.random() < 0.04:
                await asyncio.sleep(random.uniform(0.2, 0.6))

        await asyncio.sleep(random.uniform(0.5, 1))

        # שלח — Enter או כפתור "Post"
        submit_sels = [
            '[data-e2e="comment-post"]',
            'div[class*="submit"]:has-text("Post")',
            'button:has-text("Post")',
        ]
        submitted = False
        for sel in submit_sels:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=2000):
                    await btn.click()
                    submitted = True
                    break
            except Exception:
                continue

        if not submitted:
            await page.keyboard.press("Enter")

        await asyncio.sleep(random.uniform(2, 3))
        logger.info("תגובה הושארה על %s ✓", url)
        return True

    except Exception as e:
        logger.error("שגיאה בתגובה על %s: %s", url, e)
        return False


async def run_comment_session(page: Page, limit: int) -> int:
    """
    מפעיל session תגובות — מגיב על וידאוים שטרם הגבנו עליהם.
    מחזיר מספר תגובות שנשלחו.
    """
    if is_paused():
        logger.info("TikTok Agent מושהה — מדלג על תגובות")
        return 0
    if not _is_active_hour():
        logger.info("מחוץ לשעות הפעילות — מדלג על תגובות")
        return 0

    # בדיקת לימיט יומי
    today_stats  = get_today_stats()
    already_done = today_stats.get("comments_sent", 0)
    remaining    = min(limit, DAILY_TT_COMMENT_LIMIT - already_done)
    if remaining <= 0:
        logger.info("הגענו ללימיט תגובות יומי (%d)", DAILY_TT_COMMENT_LIMIT)
        return 0

    # טעינת וידאוים ממתינים
    videos = get_uncontacted_videos(limit=remaining * 2)
    if not videos:
        logger.info("אין וידאוים ממתינים לתגובה")
        return 0

    logger.info("Comment session: עד %d תגובות, %d מועמדים", remaining, len(videos))
    sent = 0
    last_template_id = -1

    for video in videos:
        if sent >= remaining:
            break
        if is_paused():
            break

        vid_id   = video["video_id"]
        author   = video["author_username"]

        if already_commented(vid_id):
            continue

        template_id, comment_text = get_comment_template(last_template_id)
        success = await comment_on_video(page, author, vid_id, comment_text)

        if success:
            mark_comment_sent(vid_id, template_id, "sent")
            increment_stat("comments_sent")
            last_template_id = template_id
            sent += 1
        else:
            mark_comment_sent(vid_id, template_id, "failed")
            increment_stat("comments_failed")

        # עיכוב בין תגובות — 5–10 דקות!
        if sent < remaining:
            await human_delay(TT_MIN_ACTION_DELAY, TT_MAX_ACTION_DELAY)

    logger.info("Comment session הסתיים: %d תגובות", sent)
    return sent


# ─── עקיבות ────────────────────────────────────────────────────────────────────

async def follow_user(page: Page, username: str) -> bool:
    """
    עוקב אחרי משתמש TikTok.
    מנווט לפרופיל → לוחץ Follow.
    מחזיר True אם הצליח.
    """
    url = f"https://www.tiktok.com/@{username}"
    try:
        logger.info("עוקב אחרי: @%s", username)
        await page.goto(url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 4))

        # מצא כפתור Follow
        follow_btn_sels = [
            '[data-e2e="follow-button"]',
            'button[class*="follow"]:not([class*="following"])',
            'button:has-text("Follow"):not(:has-text("Following"))',
        ]
        follow_btn = None
        for sel in follow_btn_sels:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=4000):
                    # וודא שעוד לא עוקבים
                    text = await el.inner_text()
                    if "Following" in text or "עוקב" in text:
                        logger.info("כבר עוקב אחרי @%s", username)
                        return False
                    follow_btn = el
                    break
            except Exception:
                continue

        if not follow_btn:
            logger.warning("לא נמצא כפתור Follow עבור @%s", username)
            return False

        await follow_btn.click()
        await asyncio.sleep(random.uniform(1.5, 2.5))
        logger.info("עקיבה בוצעה: @%s ✓", username)
        return True

    except Exception as e:
        logger.error("שגיאה בעקיבה אחרי @%s: %s", username, e)
        return False


async def run_follow_session(page: Page, limit: int) -> int:
    """
    מפעיל session עקיבות — עוקב אחרי משתמשים שגילינו.
    מחזיר מספר עקיבות שבוצעו.
    """
    if is_paused():
        logger.info("TikTok Agent מושהה — מדלג על עקיבות")
        return 0
    if not _is_active_hour():
        logger.info("מחוץ לשעות הפעילות — מדלג על עקיבות")
        return 0

    # בדיקת לימיט יומי
    today_stats  = get_today_stats()
    already_done = today_stats.get("follows_sent", 0)
    remaining    = min(limit, DAILY_TT_FOLLOW_LIMIT - already_done)
    if remaining <= 0:
        logger.info("הגענו ללימיט עקיבות יומי (%d)", DAILY_TT_FOLLOW_LIMIT)
        return 0

    # טעינת משתמשים שעדיין לא עקבנו אחריהם
    users = get_unfollowed_users(limit=remaining * 2)
    if not users:
        logger.info("אין משתמשים ממתינים לעקיבה")
        return 0

    logger.info("Follow session: עד %d עקיבות, %d מועמדים", remaining, len(users))
    sent = 0

    for user in users:
        if sent >= remaining:
            break
        if is_paused():
            break

        username = user["username"]
        if already_followed(username):
            continue

        success = await follow_user(page, username)

        if success:
            mark_followed(username, "sent")
            increment_stat("follows_sent")
            sent += 1
        else:
            mark_followed(username, "failed")
            increment_stat("follows_failed")

        # עיכוב בין עקיבות — 3–6 דקות (חצי מהתגובות)
        if sent < remaining:
            await human_delay(
                TT_MIN_ACTION_DELAY * 0.6,
                TT_MAX_ACTION_DELAY * 0.6,
            )

    logger.info("Follow session הסתיים: %d עקיבות", sent)
    return sent
