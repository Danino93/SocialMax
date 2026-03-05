"""
Facebook group discovery and posting via Playwright.
"""
import asyncio
import logging
import random
import re
from playwright.async_api import Page

from .config import (
    FB_MIN_ACTION_DELAY, FB_MAX_ACTION_DELAY,
    DAILY_FB_GROUP_POST_LIMIT, FB_GROUP_COOLDOWN_DAYS,
    ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE,
)
from .database import (
    log_fb_group, get_eligible_groups, mark_group_posted,
    deactivate_group, increment_stat, get_today_stats, is_paused,
)
from .messages import get_group_post_template
from .browser import human_delay, slow_scroll
import pytz
from datetime import datetime

logger = logging.getLogger(__name__)

# ─── Search keywords ──────────────────────────────────────────────────────────
SEARCH_KEYWORDS: list[str] = [
    "שיווק דיגיטלי ישראל",
    "עסקים ישראל",
    "יזמות ישראל",
    "אינסטגרם ישראל",
    "טיקטוק ישראל",
    "SMM ישראל",
    "פרילנסרים ישראל",
    "בעלי עסקים ישראל",
    "נדלן ישראל",
    "קריפטו ישראל",
    "כושר ובריאות ישראל",
    "אופנה ישראל",
    "צלמים ישראל",
    "e-commerce ישראל",
    "dropshipping ישראל",
]


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


def _extract_group_id(url: str) -> str | None:
    """Extract group ID from Facebook group URL."""
    m = re.search(r"/groups/(\d+)", url)
    if m:
        return m.group(1)
    m = re.search(r"groups/([^/?]+)", url)
    return m.group(1) if m else None


def _parse_member_count(text: str) -> int:
    """Parse '12,500 members' → 12500"""
    text = text.replace(",", "").replace(".", "")
    nums = re.findall(r"\d+", text)
    return int(nums[0]) if nums else 0


# ─── Group discovery ─────────────────────────────────────────────────────────

async def discover_groups(page: Page, keyword: str, limit: int = 10) -> int:
    """
    Search Facebook groups for keyword, save new ones to DB.
    Returns number of new groups found.
    """
    new_count = 0
    try:
        search_url = f"https://www.facebook.com/search/groups/?q={keyword}"
        logger.info("Searching groups: '%s'", keyword)
        await page.goto(search_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(3)

        # Scroll to load more results
        await slow_scroll(page, times=4)
        await asyncio.sleep(2)

        # Extract group cards
        # Facebook renders groups as links containing /groups/
        links = await page.evaluate("""
            () => {
                const anchors = document.querySelectorAll('a[href*="/groups/"]');
                const seen = new Set();
                const results = [];
                anchors.forEach(a => {
                    const href = a.href;
                    if (!seen.has(href) && !href.includes('/groups/feed') && !href.includes('?')) {
                        seen.add(href);
                        // Try to find member count nearby
                        const text = a.closest('[role="article"]')?.innerText || '';
                        results.push({ url: href, context: text });
                    }
                });
                return results.slice(0, 20);
            }
        """)

        for item in links:
            if new_count >= limit:
                break
            url     = item.get("url", "")
            context = item.get("context", "")
            gid     = _extract_group_id(url)
            if not gid:
                continue

            # Parse member count from context text
            member_count = _parse_member_count(context)
            # Filter: 1K–500K members (FB groups are bigger than TG)
            if member_count and (member_count < 1000 or member_count > 500_000):
                continue

            # Use group ID as name fallback
            name = gid
            is_new = log_fb_group(gid, name, member_count)
            if is_new:
                new_count += 1
                increment_stat("groups_found")
                logger.info("New group found: %s (members: %d)", gid, member_count)

    except Exception as e:
        logger.error("Error discovering groups for '%s': %s", keyword, e)

    return new_count


async def run_discovery_session(page: Page, num_keywords: int = 3) -> int:
    """Run discovery on N random keywords. Returns total new groups found."""
    keywords = random.sample(SEARCH_KEYWORDS, min(num_keywords, len(SEARCH_KEYWORDS)))
    total = 0
    for kw in keywords:
        found = await discover_groups(page, kw, limit=5)
        total += found
        await asyncio.sleep(random.randint(5, 10))
    logger.info("Discovery session done: %d new groups", total)
    return total


# ─── Group posting ────────────────────────────────────────────────────────────

async def post_in_group(page: Page, group: dict, text: str) -> bool:
    """
    Navigate to Facebook group and post a message.
    Returns True on success.
    """
    gid   = group["fb_group_id"]
    name  = group.get("name", gid)
    group_url = f"https://www.facebook.com/groups/{gid}"

    try:
        logger.info("Navigating to group: %s", name)
        await page.goto(group_url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(3, 5))

        # Find "Write something" compose area
        compose_selectors = [
            '[placeholder*="Write something"]',
            '[aria-label*="Write something"]',
            '[aria-label*="כתוב משהו"]',
            'div[role="button"][tabindex="0"]',
        ]
        compose = None
        for sel in compose_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    compose = el
                    break
            except Exception:
                continue

        if not compose:
            logger.warning("Cannot find compose area in group '%s'", name)
            return False

        # Click to open compose dialog
        await compose.click()
        await asyncio.sleep(random.uniform(1, 2))

        # Type the message with human-like delays
        textarea_selectors = [
            'div[aria-label*="What\'s on your mind"]',
            'div[contenteditable="true"]',
            'div[role="textbox"]',
        ]
        textarea = None
        for sel in textarea_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    textarea = el
                    break
            except Exception:
                continue

        if not textarea:
            logger.warning("Cannot find textarea in group '%s'", name)
            return False

        await textarea.click()
        # Type with human-like random delays between characters
        for char in text:
            await textarea.type(char, delay=random.randint(40, 120))
            # Occasional pause (like thinking)
            if random.random() < 0.05:
                await asyncio.sleep(random.uniform(0.3, 0.8))

        await asyncio.sleep(random.uniform(1, 2))

        # Click Post button
        post_btn_selectors = [
            'div[aria-label="Post"]',
            'button[type="submit"]',
            '[aria-label="פרסם"]',
        ]
        posted = False
        for sel in post_btn_selectors:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=3000):
                    await btn.click()
                    posted = True
                    break
            except Exception:
                continue

        if not posted:
            logger.warning("Cannot find Post button in group '%s'", name)
            return False

        await asyncio.sleep(random.uniform(3, 5))
        logger.info("Posted to group '%s'", name)
        return True

    except Exception as e:
        logger.error("Error posting to group '%s': %s", name, e)
        return False


async def run_group_posting_session(page: Page) -> int:
    """
    Post to eligible groups (up to daily limit).
    Returns number of posts sent.
    """
    if is_paused():
        logger.info("Facebook agent paused — skipping group posting.")
        return 0
    if not _is_active_hour():
        logger.info("Outside active hours — skipping group posting.")
        return 0

    today_stats  = get_today_stats()
    already_sent = today_stats.get("group_posts_sent", 0)
    remaining    = DAILY_FB_GROUP_POST_LIMIT - already_sent
    if remaining <= 0:
        logger.info("Daily group post limit reached.")
        return 0

    groups = get_eligible_groups(cooldown_days=FB_GROUP_COOLDOWN_DAYS, limit=remaining * 2)
    if not groups:
        logger.info("No eligible groups for posting.")
        return 0

    logger.info("Group posting session: up to %d posts", remaining)
    sent = 0
    last_template_id = -1

    for group in groups:
        if sent >= remaining:
            break
        if is_paused():
            break

        template_id, post_text = get_group_post_template(last_template_id)
        success = await post_in_group(page, group, post_text)

        if success:
            mark_group_posted(group["fb_group_id"], template_id, "sent")
            increment_stat("group_posts_sent")
            last_template_id = template_id
            sent += 1
        else:
            mark_group_posted(group["fb_group_id"], template_id, "failed")
            increment_stat("group_posts_failed")

        if sent < remaining:
            await human_delay(FB_MIN_ACTION_DELAY, FB_MAX_ACTION_DELAY)

    logger.info("Group posting session done: %d posts", sent)
    return sent
