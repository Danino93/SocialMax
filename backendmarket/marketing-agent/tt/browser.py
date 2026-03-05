"""
tt_browser.py — Playwright browser utilities ל-TikTok Agent
מטפל ב: יצירת דפדפן, טעינת cookies, התחברות, עזרים אנושיים.

⚠️  TikTok היא הכי קשה לאוטומציה — anti-bot מחמיר.
     חובה: headless=False בפעם הראשונה לכניסה ידנית!
"""
import asyncio
import json
import logging
import os
import random

from playwright.async_api import async_playwright, Browser, BrowserContext, Page

from .config import (
    TT_COOKIES_FILE,
    TT_USER_AGENT,
    TT_MIN_ACTION_DELAY,
    TT_MAX_ACTION_DELAY,
)

logger = logging.getLogger(__name__)

# ─── יצירת דפדפן ──────────────────────────────────────────────────────────────

async def create_browser(playwright, headless: bool = True) -> Browser:
    """
    יוצר browser Chromium עם args נגד bot-detection.
    headless=False בפעם הראשונה — לכניסה ידנית ולמעקב.
    """
    return await playwright.chromium.launch(
        headless=headless,
        args=[
            "--no-sandbox",
            "--disable-blink-features=AutomationControlled",  # מסתיר automation flag
            "--disable-dev-shm-usage",
            "--disable-infobars",
            "--window-size=1280,720",
        ],
    )


async def get_context(browser: Browser) -> BrowserContext:
    """
    יוצר BrowserContext:
    - אם tt_cookies.json קיים — טוען אותו (session שמורה)
    - אחרת — context חדש עם locale עברית
    """
    if os.path.exists(TT_COOKIES_FILE):
        logger.info("טוען TikTok session מ-%s", TT_COOKIES_FILE)
        return await browser.new_context(
            storage_state=TT_COOKIES_FILE,
            user_agent=TT_USER_AGENT,
            locale="he-IL",
            timezone_id="Asia/Jerusalem",
            viewport={"width": 1280, "height": 720},
        )

    logger.info("TikTok cookies לא נמצאו — יוצר context חדש")
    return await browser.new_context(
        user_agent=TT_USER_AGENT,
        locale="he-IL",
        timezone_id="Asia/Jerusalem",
        viewport={"width": 1280, "height": 720},
    )


async def save_session(context: BrowserContext) -> None:
    """שומר את ה-cookies הנוכחיים לקובץ — בפעמים הבאות נטעין אותם."""
    await context.storage_state(path=TT_COOKIES_FILE)
    logger.info("TikTok session נשמר ב-%s", TT_COOKIES_FILE)


# ─── התחברות ──────────────────────────────────────────────────────────────────

async def login_tiktok(page: Page, username: str, password: str) -> bool:
    """
    מתחבר ל-TikTok דרך Email/Username.
    שלבים:
      1. נווט ל-tiktok.com/login
      2. לחץ "Use phone / email / username"
      3. בחר "Log in with email or username"
      4. הכנס פרטים → Submit
    מחזיר True אם ההתחברות הצליחה.
    """
    try:
        logger.info("מתחבר לTikTok עם username=%s", username)
        await page.goto("https://www.tiktok.com/login", wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 4))

        # לחץ "Use phone / email / username"
        email_btn_selectors = [
            '[data-e2e="channel-item-phone-email"]',
            'div[class*="channel-item"]:has-text("phone")',
            'a:has-text("Use phone")',
            '[data-e2e="login-email"]',
        ]
        for sel in email_btn_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    await el.click()
                    await asyncio.sleep(1)
                    break
            except Exception:
                continue

        await asyncio.sleep(random.uniform(1, 2))

        # לחץ "Log in with email or username"
        username_tab_selectors = [
            'a:has-text("Log in with email or username")',
            '[data-e2e="login-with-email"]',
            'p:has-text("Log in with email")',
        ]
        for sel in username_tab_selectors:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    await el.click()
                    await asyncio.sleep(1)
                    break
            except Exception:
                continue

        await asyncio.sleep(random.uniform(1, 2))

        # מלא username
        username_input_sels = [
            'input[name="username"]',
            'input[placeholder*="username"]',
            'input[placeholder*="Username"]',
            'input[type="text"]',
        ]
        username_input = None
        for sel in username_input_sels:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=3000):
                    username_input = el
                    break
            except Exception:
                continue

        if not username_input:
            logger.error("לא נמצא שדה username ב-TikTok login")
            return False

        await username_input.click()
        await _type_human(page, username_input, username)
        await asyncio.sleep(random.uniform(0.5, 1))

        # מלא password
        password_input = page.locator('input[type="password"]').first
        if not await password_input.is_visible(timeout=5000):
            logger.error("לא נמצא שדה password ב-TikTok login")
            return False

        await password_input.click()
        await _type_human(page, password_input, password)
        await asyncio.sleep(random.uniform(0.5, 1))

        # לחץ Login
        login_btn_sels = [
            'button[data-e2e="login-button"]',
            'button:has-text("Log in")',
            'button[type="submit"]',
        ]
        for sel in login_btn_sels:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=3000):
                    await btn.click()
                    break
            except Exception:
                continue

        # חכה לניווט
        await asyncio.sleep(random.uniform(4, 6))

        # בדוק אם התחברנו
        current_url = page.url
        if "login" not in current_url and "tiktok.com" in current_url:
            logger.info("התחברות לTikTok הצליחה!")
            return True
        else:
            logger.warning("ייתכן שנדרש CAPTCHA או אימות נוסף ב-TikTok — כתובת נוכחית: %s", current_url)
            # חכה עוד — ייתכן שהמשתמש צריך לאשר CAPTCHA ידנית
            await asyncio.sleep(10)
            current_url = page.url
            return "login" not in current_url and "tiktok.com" in current_url

    except Exception as e:
        logger.error("שגיאה בהתחברות לTikTok: %s", e)
        return False


async def ensure_logged_in(page: Page, username: str, password: str) -> bool:
    """
    בודק אם כבר מחוברים לTikTok.
    אם לא — מנסה להתחבר.
    מחזיר True אם מחוברים.
    """
    try:
        await page.goto("https://www.tiktok.com/foryou", wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 3))

        current_url = page.url
        # אם הופנינו לדף login — צריך להתחבר
        if "login" in current_url:
            logger.info("TikTok לא מחובר — מתחבר...")
            return await login_tiktok(page, username, password)

        # בדיקה נוספת: האם יש תמונת פרופיל?
        profile_icon = page.locator('[data-e2e="profile-icon"], [href*="/profile"]').first
        if await profile_icon.is_visible(timeout=5000):
            logger.info("TikTok session תקין ✓")
            return True

        # נסיון להתחבר
        logger.info("TikTok session לא תקין — מתחבר...")
        return await login_tiktok(page, username, password)

    except Exception as e:
        logger.error("שגיאה בבדיקת TikTok session: %s", e)
        return False


# ─── עזרים אנושיים ────────────────────────────────────────────────────────────

async def _type_human(page: Page, element, text: str) -> None:
    """הקלדה כמו בן אדם — עם עיכובים רנדומליים בין תווים."""
    for char in text:
        await element.type(char, delay=random.randint(60, 140))
        # עצירה קצרה מדי פעם — נראית טבעית
        if random.random() < 0.05:
            await asyncio.sleep(random.uniform(0.2, 0.5))


async def human_delay(min_sec: float = None, max_sec: float = None) -> None:
    """
    עיכוב אנושי רנדומלי בין פעולות.
    ברירת מחדל: TT_MIN_ACTION_DELAY – TT_MAX_ACTION_DELAY מה-config.
    """
    if min_sec is None:
        min_sec = TT_MIN_ACTION_DELAY
    if max_sec is None:
        max_sec = TT_MAX_ACTION_DELAY

    delay = random.uniform(min_sec, max_sec)
    logger.debug("המתנה %.0f שניות...", delay)
    await asyncio.sleep(delay)


async def slow_scroll(page: Page, times: int = 3, pause: float = 1.5) -> None:
    """
    גלילה איטית לטעינת תוכן נוסף — מחקה גלילה אנושית.
    TikTok טוענת תוכן דינמי עם scroll.
    """
    for _ in range(times):
        await page.mouse.wheel(0, random.randint(600, 900))
        await asyncio.sleep(random.uniform(pause * 0.7, pause * 1.3))
