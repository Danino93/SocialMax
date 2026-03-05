"""
tt_content.py — העלאת וידאו ל-TikTok דרך Playwright
מנווט ל-tiktok.com/upload → מעלה קובץ → ממלא caption → לוחץ Post.

⚠️  TikTok אין API ציבורי להעלאת וידאו — חייבים Playwright.
    העלאה פעם אחת ביום בלבד.
"""
import asyncio
import logging
import os
import random

from playwright.async_api import Page

from .config import VIDEO_PATH
from .database import (
    log_our_video, get_videos_posted_today, increment_stat, is_paused,
)
from .messages import get_video_caption

logger = logging.getLogger(__name__)


async def upload_video(page: Page, video_path: str, caption: str) -> bool:
    """
    מעלה וידאו לחשבון TikTok שלנו דרך tiktok.com/upload.
    שלבים:
      1. נווט לדף upload
      2. מצא file input ← שלח את הקובץ
      3. המתן לעיבוד הוידאו
      4. מלא caption
      5. לחץ Post
    מחזיר True אם ההעלאה הצליחה.
    """
    if not os.path.exists(video_path):
        logger.error("קובץ וידאו לא נמצא: %s", video_path)
        return False

    try:
        logger.info("מעלה וידאו לTikTok: %s", video_path)
        await page.goto("https://www.tiktok.com/upload", wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(3, 5))

        # מצא file input ← ייתכן שהוא בתוך iframe
        upload_iframe = None
        try:
            # TikTok מכניס upload ב-iframe
            frames = page.frames
            for frame in frames:
                if "upload" in frame.url or "creator" in frame.url:
                    upload_iframe = frame
                    break
        except Exception:
            pass

        # נסה עם page הראשית או ה-iframe
        target = upload_iframe if upload_iframe else page

        # מצא file input
        file_input_sels = [
            'input[type="file"]',
            'input[accept*="video"]',
        ]
        file_input = None
        for sel in file_input_sels:
            try:
                el = target.locator(sel).first
                # file inputs לפעמים מוסתרים — נשתמש ב-set_input_files ישירות
                file_input = el
                break
            except Exception:
                continue

        if not file_input:
            logger.error("לא נמצא file input בדף upload של TikTok")
            return False

        # העלה את הקובץ
        await file_input.set_input_files(video_path)
        logger.info("קובץ נשלח לבדיקה — ממתין לעיבוד...")
        await asyncio.sleep(random.uniform(10, 15))  # TikTok מעבד את הוידאו

        # מלא caption
        caption_input_sels = [
            'div[data-e2e="caption-input"]',
            'div[contenteditable="true"][class*="caption"]',
            'div[contenteditable="true"][placeholder*="caption"]',
            'div[contenteditable="true"]',
        ]
        caption_input = None
        for sel in caption_input_sels:
            try:
                el = target.locator(sel).first
                if await el.is_visible(timeout=5000):
                    caption_input = el
                    break
            except Exception:
                continue

        if caption_input:
            await caption_input.click()
            await asyncio.sleep(0.5)
            # נקה תוכן קיים ← Ctrl+A + Delete
            await page.keyboard.press("Control+a")
            await page.keyboard.press("Delete")
            await asyncio.sleep(0.3)

            # הקלדה אנושית של ה-caption
            for char in caption:
                await caption_input.type(char, delay=random.randint(40, 90))
                if random.random() < 0.03:
                    await asyncio.sleep(random.uniform(0.2, 0.5))
            await asyncio.sleep(random.uniform(1, 2))
        else:
            logger.warning("לא נמצא שדה caption — ממשיך בלי כיתוב")

        # לחץ Post
        post_btn_sels = [
            'button[data-e2e="post-button"]',
            'button:has-text("Post")',
            'div[class*="submit-btn"]:has-text("Post")',
        ]
        posted = False
        for sel in post_btn_sels:
            try:
                btn = target.locator(sel).first
                if await btn.is_visible(timeout=5000):
                    await btn.click()
                    posted = True
                    break
            except Exception:
                continue

        if not posted:
            logger.error("לא נמצא כפתור Post ב-TikTok upload")
            return False

        # המתן לאישור ← TikTok מציגה הודעה אחרי upload מוצלח
        await asyncio.sleep(random.uniform(8, 12))

        # בדוק אם הועלה בהצלחה
        success_sels = [
            'div:has-text("Your video has been uploaded")',
            'div[class*="success"]',
            'div:has-text("uploaded")',
        ]
        upload_success = False
        for sel in success_sels:
            try:
                el = page.locator(sel).first
                if await el.is_visible(timeout=5000):
                    upload_success = True
                    break
            except Exception:
                continue

        if upload_success:
            logger.info("וידאו הועלה לTikTok בהצלחה ✓")
            return True
        else:
            # ייתכן שהדף ניווט קדימה — גם זה אות להצלחה
            current_url = page.url
            if "upload" not in current_url and "tiktok.com" in current_url:
                logger.info("וידאו הועלה — דף ניווט ל-%s", current_url)
                return True
            logger.warning("לא ניתן לאשר upload — ייתכן שהצליח, בדוק ידנית")
            return True  # מניחים הצלחה כדי לא לנסות שוב

    except Exception as e:
        logger.error("שגיאה בהעלאת וידאו לTikTok: %s", e)
        return False


async def post_daily_video(page: Page) -> bool:
    """
    מעלה וידאו אחד ביום לחשבון TikTok שלנו.
    בוחר caption אוטומטית ומסובב בין התבניות.
    מחזיר True אם הצליח.
    """
    if is_paused():
        logger.info("TikTok Agent מושהה — מדלג על העלאת וידאו")
        return False

    # בדוק שלא העלינו כבר היום
    if get_videos_posted_today() >= 1:
        logger.info("כבר העלינו וידאו היום לTikTok — מדלג")
        return False

    # בדוק שקובץ הוידאו קיים
    if not os.path.exists(VIDEO_PATH):
        logger.warning("קובץ וידאו לא נמצא: %s — מדלג", VIDEO_PATH)
        return False

    # בחר caption
    caption_id, caption_text = get_video_caption()
    logger.info("מעלה וידאו לTikTok עם caption #%d", caption_id)

    success = await upload_video(page, VIDEO_PATH, caption_text)

    if success:
        log_our_video(caption_id, "sent")
        increment_stat("videos_posted")
        logger.info("וידאו יומי הועלה לTikTok ✓ (caption #%d)", caption_id)
    else:
        log_our_video(caption_id, "failed")
        logger.error("העלאת וידאו יומי לTikTok נכשלה")

    return success
