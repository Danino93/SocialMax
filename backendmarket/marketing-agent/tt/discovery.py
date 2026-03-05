"""
tt_discovery.py — גילוי וידאוים ומשתמשים ב-TikTok לפי hashtags
מחפש hashtags רלוונטיים, שומר וידאוים + authors ל-DB.
כל הפעולות דרך Playwright — אין API רשמי ל-TikTok.
"""
import asyncio
import logging
import random

from playwright.async_api import Page

from .database import log_video, log_user, increment_stat, is_paused
from .browser import slow_scroll

logger = logging.getLogger(__name__)


# ─── Hashtags לחיפוש ──────────────────────────────────────────────────────────
# שיווק, עסקים, נישות ישראליות — הקהל הכי רלוונטי לשירות שלנו
SEARCH_HASHTAGS: list[str] = [
    # שיווק ועסקים
    "שיווקדיגיטלי", "עסקים", "יזמות", "שיווק",
    "SMM", "socialmedia", "marketing", "business",
    # ישראלי
    "ישראל", "israel", "israelibusiness",
    "israelimarketing", "israelitiktok",
    # נישות
    "כסף", "השקעות", "נדלן", "קריפטו",
    "כושר", "אופנה", "ביוטי", "נייל",
    "מסעדות", "אוכל", "שפים",
    "צלמים", "מעצבים", "גרפיקאים",
    # כללי TikTok
    "tiktoktips", "entrepreneur", "smallbusiness",
    "digitalmarketing", "growthhack",
]


# ─── גילוי hashtag יחיד ────────────────────────────────────────────────────────

async def discover_hashtag(page: Page, hashtag: str, limit: int = 20) -> int:
    """
    מנווט לדף hashtag ב-TikTok → מחלץ video IDs + author usernames → שומר ב-DB.
    מחזיר מספר רשומות חדשות שנוספו.
    """
    new_count = 0
    url = f"https://www.tiktok.com/tag/{hashtag}"

    try:
        logger.info("גולש לhttag: #%s", hashtag)
        await page.goto(url, wait_until="domcontentloaded", timeout=30_000)
        await asyncio.sleep(random.uniform(2, 4))

        # גלילה לטעינת וידאוים
        await slow_scroll(page, times=4, pause=2.0)
        await asyncio.sleep(random.uniform(1, 2))

        # חילוץ קישורי וידאו + authors מה-DOM
        video_data = await page.evaluate("""
            (limit) => {
                // וידאוים מגיעים כ-links עם /video/ ב-URL
                const links = document.querySelectorAll('a[href*="/video/"]');
                const seen = new Set();
                const results = [];

                links.forEach(a => {
                    const href = a.href;
                    // פורמט: https://www.tiktok.com/@username/video/videoId
                    const match = href.match(/@([^/]+)\\/video\\/(\\d+)/);
                    if (match && !seen.has(match[2]) && results.length < limit) {
                        seen.add(match[2]);
                        results.push({
                            video_id: match[2],
                            username: match[1]
                        });
                    }
                });
                return results;
            }
        """, limit)

        if not video_data:
            logger.warning("לא נמצאו וידאוים עבור #%s", hashtag)
            return 0

        logger.info("נמצאו %d וידאוים עבור #%s", len(video_data), hashtag)

        # שמירה ב-DB
        for item in video_data:
            vid_added  = log_video(item["video_id"], item["username"], hashtag)
            user_added = log_user(item["username"])

            if vid_added:
                new_count += 1
                increment_stat("videos_found")
            if user_added:
                increment_stat("users_found")

    except Exception as e:
        logger.error("שגיאה בגילוי hashtag #%s: %s", hashtag, e)

    logger.info("hashtag #%s — %d רשומות חדשות", hashtag, new_count)
    return new_count


# ─── session גילוי ─────────────────────────────────────────────────────────────

async def run_discovery_session(page: Page, num_hashtags: int = 3) -> int:
    """
    מפעיל גילוי על N hashtags אקראיים מרשימת SEARCH_HASHTAGS.
    מחזיר מספר רשומות חדשות שנוספו בסך הכל.
    """
    if is_paused():
        logger.info("TikTok Agent מושהה — מדלג על גילוי")
        return 0

    # בחירה אקראית של hashtags — גיוון כל יום
    selected = random.sample(SEARCH_HASHTAGS, min(num_hashtags, len(SEARCH_HASHTAGS)))
    logger.info("=== TikTok Discovery session: %d hashtags: %s ===", len(selected), selected)

    total_new = 0
    for hashtag in selected:
        if is_paused():
            break

        new = await discover_hashtag(page, hashtag, limit=20)
        total_new += new

        # עיכוב בין hashtags — לא רצים מהר מדי
        if hashtag != selected[-1]:
            await asyncio.sleep(random.uniform(15, 30))

    logger.info("=== Discovery session הסתיים: %d רשומות חדשות ===", total_new)
    return total_new
