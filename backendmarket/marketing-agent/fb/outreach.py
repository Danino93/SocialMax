"""
Facebook outreach: comment on group posts + Messenger DMs via Playwright.
"""
import asyncio
import logging
import random
from playwright.async_api import Page

from .config import (
    FB_MIN_ACTION_DELAY, FB_MAX_ACTION_DELAY,
    DAILY_FB_COMMENT_LIMIT, DAILY_FB_DM_LIMIT,
    FB_DM_COOLDOWN_DAYS,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE,
)
from .database import (
    get_eligible_groups, already_commented, mark_comment_sent,
    already_dmed, mark_dm_sent, increment_stat, get_today_stats, is_paused,
)
from .messages import get_comment_template, get_dm_template
from .browser import human_delay, slow_scroll
import pytz
from datetime import datetime

logger = logging.getLogger(__name__)


def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


# ─── Comment session ──────────────────────────────────────────────────────────

async def _comment_on_post(page: Page, post_url: str, comment_text: str) -> bool:
    """Navigate to a post and leave a comment."""
    try:
        await page.goto(post_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 4))

        # Click "Comment" or find comment box
        comment_selectors = [
            '[aria-label*="Write a comment"]',
            '[aria-label*="Comment"]',
            'div[data-lexical-editor="true"]',
            'div[contenteditable="true"][role="textbox"]',
        ]

        comment_box = None
        # First click "Comment" button to expand
        try:
            btn = page.locator('[aria-label*="Comment"]').first
            if await btn.is_visible(timeout=3000):
                await btn.click()
                await asyncio.sleep(1)
        except Exception:
            pass

        for sel in comment_selectors:
            try:
                el = page.locator(sel).last  # last = the active comment input
                if await el.is_visible(timeout=3000):
                    comment_box = el
                    break
            except Exception:
                continue

        if not comment_box:
            logger.warning("Comment box not found for %s", post_url)
            return False

        await comment_box.click()
        # Type with human delay
        for char in comment_text:
            await comment_box.type(char, delay=random.randint(50, 130))
            if random.random() < 0.04:
                await asyncio.sleep(random.uniform(0.2, 0.6))

        await asyncio.sleep(random.uniform(0.5, 1))
        await page.keyboard.press("Enter")
        await asyncio.sleep(random.uniform(2, 3))
        logger.info("Comment posted on %s", post_url)
        return True

    except Exception as e:
        logger.error("Error commenting on %s: %s", post_url, e)
        return False


async def _get_group_post_urls(page: Page, fb_group_id: str, limit: int = 5) -> list[str]:
    """Scrape recent post URLs from a Facebook group."""
    urls: list[str] = []
    try:
        group_url = f"https://www.facebook.com/groups/{fb_group_id}"
        await page.goto(group_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(2)
        await slow_scroll(page, times=3)
        await asyncio.sleep(1)

        post_urls = await page.evaluate("""
            (limit) => {
                const links = document.querySelectorAll('a[href*="/permalink/"], a[href*="/posts/"]');
                const seen = new Set();
                const results = [];
                links.forEach(a => {
                    if (!seen.has(a.href) && results.length < limit) {
                        seen.add(a.href);
                        results.push(a.href);
                    }
                });
                return results;
            }
        """, limit)
        urls = post_urls or []
    except Exception as e:
        logger.error("Error fetching posts from group %s: %s", fb_group_id, e)
    return urls


async def run_comment_session(page: Page, limit: int) -> int:
    """
    Comment on recent posts in known groups.
    Returns number of comments sent.
    """
    if is_paused():
        logger.info("Facebook agent paused — skipping comment session.")
        return 0
    if not _is_active_hour():
        logger.info("Outside active hours — skipping comment session.")
        return 0

    today_stats   = get_today_stats()
    already_done  = today_stats.get("comments_sent", 0)
    remaining     = min(limit, DAILY_FB_COMMENT_LIMIT - already_done)
    if remaining <= 0:
        logger.info("Daily comment limit reached.")
        return 0

    groups = get_eligible_groups(cooldown_days=1, limit=10)  # any active group
    if not groups:
        logger.info("No groups to comment in.")
        return 0

    logger.info("Comment session: up to %d comments", remaining)
    sent = 0
    last_template_id = -1

    for group in groups:
        if sent >= remaining:
            break
        if is_paused():
            break

        gid = group["fb_group_id"]
        post_urls = await _get_group_post_urls(page, gid, limit=5)

        for post_url in post_urls:
            if sent >= remaining:
                break
            if already_commented(post_url):
                continue

            template_id, comment_text = get_comment_template(last_template_id)
            success = await _comment_on_post(page, post_url, comment_text)

            if success:
                mark_comment_sent(post_url, template_id, gid, "sent")
                increment_stat("comments_sent")
                last_template_id = template_id
                sent += 1
            else:
                mark_comment_sent(post_url, template_id, gid, "failed")
                increment_stat("comments_failed")

            if sent < remaining:
                await human_delay(FB_MIN_ACTION_DELAY, FB_MAX_ACTION_DELAY)

    logger.info("Comment session done: %d comments", sent)
    return sent


# ─── Messenger DM session ─────────────────────────────────────────────────────

async def _collect_group_members(page: Page, fb_group_id: str, limit: int = 10) -> list[str]:
    """Collect profile URLs of recent commenters in a group."""
    profile_urls: list[str] = []
    try:
        group_url = f"https://www.facebook.com/groups/{fb_group_id}"
        await page.goto(group_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(2)
        await slow_scroll(page, times=3)

        urls = await page.evaluate("""
            (limit) => {
                // Find profile links in the feed (author links)
                const links = document.querySelectorAll('a[href*="facebook.com/"][href*="?comment"]');
                const profileLinks = document.querySelectorAll('h3 a, h4 a');
                const seen = new Set();
                const results = [];
                profileLinks.forEach(a => {
                    const href = a.href;
                    if (
                        href.includes('facebook.com/') &&
                        !href.includes('/groups/') &&
                        !href.includes('/pages/') &&
                        !href.includes('login') &&
                        !seen.has(href) &&
                        results.length < limit
                    ) {
                        seen.add(href);
                        results.push(href);
                    }
                });
                return results;
            }
        """, limit)
        profile_urls = urls or []
    except Exception as e:
        logger.error("Error collecting members from group %s: %s", fb_group_id, e)
    return profile_urls


async def _send_messenger_dm(page: Page, profile_url: str, message: str) -> bool:
    """Send a Messenger DM to a Facebook profile."""
    try:
        # Extract username or profile ID from URL
        # Navigate to their profile first
        await page.goto(profile_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 3))

        # Find "Message" button on profile
        msg_btn_selectors = [
            'a[aria-label*="Message"]',
            'div[aria-label*="Message"]',
            'a[href*="messenger.com"]',
            '[aria-label*="שלח הודעה"]',
        ]
        msg_btn = None
        for sel in msg_btn_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    msg_btn = el
                    break
            except Exception:
                continue

        if not msg_btn:
            logger.warning("Message button not found on profile: %s", profile_url)
            return False

        await msg_btn.click()
        await asyncio.sleep(random.uniform(2, 3))

        # Now in Messenger — find the message input
        input_selectors = [
            '[aria-label*="Message"]',
            'div[contenteditable="true"]',
            'div[role="textbox"]',
        ]
        msg_input = None
        for sel in input_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=5000):
                    msg_input = el
                    break
            except Exception:
                continue

        if not msg_input:
            logger.warning("Messenger input not found for: %s", profile_url)
            return False

        await msg_input.click()
        for char in message:
            await msg_input.type(char, delay=random.randint(50, 120))
            if random.random() < 0.04:
                await asyncio.sleep(random.uniform(0.2, 0.5))

        await asyncio.sleep(random.uniform(0.5, 1))
        await page.keyboard.press("Enter")
        await asyncio.sleep(random.uniform(2, 3))
        logger.info("DM sent to: %s", profile_url)
        return True

    except Exception as e:
        logger.error("Error sending DM to %s: %s", profile_url, e)
        return False


async def run_dm_session(page: Page, limit: int) -> int:
    """
    Send Messenger DMs to active group members.
    Returns number of DMs sent.
    """
    if is_paused():
        logger.info("Facebook agent paused — skipping DM session.")
        return 0
    if not _is_active_hour():
        logger.info("Outside active hours — skipping DM session.")
        return 0

    today_stats  = get_today_stats()
    already_done = today_stats.get("dms_sent", 0)
    remaining    = min(limit, DAILY_FB_DM_LIMIT - already_done)
    if remaining <= 0:
        logger.info("Daily DM limit reached.")
        return 0

    # Collect potential targets from active groups
    groups = get_eligible_groups(cooldown_days=1, limit=5)
    profile_urls: list[str] = []
    for group in groups:
        if len(profile_urls) >= remaining * 3:
            break
        urls = await _collect_group_members(page, group["fb_group_id"], limit=10)
        profile_urls.extend(urls)

    # De-duplicate
    profile_urls = list(dict.fromkeys(profile_urls))

    if not profile_urls:
        logger.info("No DM targets found.")
        return 0

    logger.info("DM session: up to %d DMs, %d candidates", remaining, len(profile_urls))
    sent = 0
    last_template_id = -1

    for profile_url in profile_urls:
        if sent >= remaining:
            break
        if is_paused():
            break
        if already_dmed(profile_url, FB_DM_COOLDOWN_DAYS):
            continue

        template_id, dm_text = get_dm_template(last_template_id)
        success = await _send_messenger_dm(page, profile_url, dm_text)

        if success:
            mark_dm_sent(profile_url, template_id, "sent")
            increment_stat("dms_sent")
            last_template_id = template_id
            sent += 1
        else:
            mark_dm_sent(profile_url, template_id, "failed")
            increment_stat("dms_failed")

        if sent < remaining:
            # Longer delay between DMs — Messenger is strict
            await human_delay(FB_MIN_ACTION_DELAY * 2, FB_MAX_ACTION_DELAY * 2)

    logger.info("DM session done: %d DMs sent", sent)
    return sent
