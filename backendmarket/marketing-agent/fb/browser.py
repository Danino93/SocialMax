"""
Playwright browser utilities for Facebook automation.
Manages login, session persistence, and page lifecycle.
"""
import asyncio
import logging
import os
import random
from playwright.async_api import (
    async_playwright, Browser, BrowserContext, Page, Playwright,
)
from .config import FB_COOKIES_FILE, FB_EMAIL, FB_PASSWORD

logger = logging.getLogger(__name__)


# ─── Browser factory ─────────────────────────────────────────────────────────

async def create_browser(playwright: Playwright) -> Browser:
    """Launch Chromium with anti-detection settings."""
    return await playwright.chromium.launch(
        headless=True,
        args=[
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-blink-features=AutomationControlled",
            "--disable-extensions",
            "--disable-infobars",
            "--window-size=1366,768",
        ],
    )


async def get_context(browser: Browser) -> BrowserContext:
    """
    Load saved Facebook session (cookies) if available.
    Otherwise create a fresh context with Hebrew locale.
    """
    viewport = {"width": 1366, "height": 768}
    ua = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
    if os.path.exists(FB_COOKIES_FILE):
        logger.info("Loading saved Facebook session from %s", FB_COOKIES_FILE)
        context = await browser.new_context(
            storage_state=FB_COOKIES_FILE,
            viewport=viewport,
            user_agent=ua,
            locale="he-IL",
            timezone_id="Asia/Jerusalem",
        )
    else:
        logger.info("No saved session — creating fresh browser context")
        context = await browser.new_context(
            viewport=viewport,
            user_agent=ua,
            locale="he-IL",
            timezone_id="Asia/Jerusalem",
        )
    return context


async def save_session(context: BrowserContext) -> None:
    """Persist current cookies/session to disk."""
    await context.storage_state(path=FB_COOKIES_FILE)
    logger.info("Facebook session saved to %s", FB_COOKIES_FILE)


# ─── Login ────────────────────────────────────────────────────────────────────

async def login_facebook(page: Page) -> bool:
    """
    Log in to Facebook with human-like behaviour.
    Returns True on success, False on failure.
    """
    logger.info("Navigating to Facebook login page...")
    await page.goto("https://www.facebook.com/login", wait_until="networkidle")
    await _random_delay(1, 2)

    # Fill email
    email_input = page.locator("#email")
    await email_input.click()
    await _type_human(page, "#email", FB_EMAIL)
    await _random_delay(0.5, 1.2)

    # Fill password
    await page.locator("#pass").click()
    await _type_human(page, "#pass", FB_PASSWORD)
    await _random_delay(0.5, 1.5)

    # Click login button
    await page.locator('button[name="login"]').click()
    await page.wait_for_load_state("networkidle", timeout=30_000)
    await _random_delay(2, 3)

    current_url = page.url
    if "login" in current_url or "checkpoint" in current_url:
        logger.error("Login failed — current URL: %s", current_url)
        return False

    logger.info("Login successful!")
    return True


async def ensure_logged_in(page: Page) -> bool:
    """
    Navigate to Facebook. If redirected to login, perform login.
    Returns True if logged in, False otherwise.
    """
    await page.goto("https://www.facebook.com", wait_until="networkidle")
    await _random_delay(1, 2)

    if "login" in page.url:
        logger.info("Not logged in — attempting login...")
        return await login_facebook(page)

    logger.info("Already logged in.")
    return True


# ─── Human simulation helpers ─────────────────────────────────────────────────

async def _random_delay(min_s: float, max_s: float) -> None:
    """Sleep for a random duration to simulate human pacing."""
    await asyncio.sleep(random.uniform(min_s, max_s))


async def _type_human(page: Page, selector: str, text: str) -> None:
    """Type text character by character with random delays."""
    for char in text:
        await page.type(selector, char, delay=random.randint(60, 160))


async def human_delay(min_seconds: int, max_seconds: int) -> None:
    """Public helper: wait a random interval between major actions."""
    seconds = random.randint(min_seconds, max_seconds)
    logger.info("Waiting %ds before next action...", seconds)
    await asyncio.sleep(seconds)


async def slow_scroll(page: Page, times: int = 3) -> None:
    """Scroll down slowly to trigger content loading."""
    for _ in range(times):
        await page.evaluate("window.scrollBy(0, window.innerHeight * 0.7)")
        await _random_delay(1, 2)
