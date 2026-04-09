"""
shared/warmer.py — SocialSniper Account Warmer
פרוטוקול חימום חשבון לפני כל session שיווקי.
מטרה: לדמות פעילות אנושית → להוריד סיכון ban → לשפר אמינות חשבון.

80% מהאינטראקציות הן "אנושיות" (צפייה, גלילה, לייק)
20% בלבד הן שיווקיות (DM, תגובה, פוסט)

Classes:
    IGWarmer        — Instagram (משתמש ב-Instagrapi API)
    PlaywrightWarmer — Facebook + TikTok (משתמש ב-Playwright browser)

שימוש:
    # Instagram (async):
    warmer = IGWarmer(client)
    await warmer.run(intensity="medium")

    # Facebook / TikTok (async):
    warmer = PlaywrightWarmer(page, platform="facebook")
    await warmer.run()
"""
import asyncio
import logging
import os
import random
import time

logger = logging.getLogger(__name__)

# ─── הגדרות עוצמה ─────────────────────────────────────────────────────────────
INTENSITY_CONFIG = {
    "low": {
        "stories": 2,
        "likes": 3,
        "explore_seconds": 30,
        "scroll_seconds": 20,
        "hover_posts": 2,
        "description": "חשבון ותיק / לא רוצים לבזבז זמן",
    },
    "medium": {
        "stories": 5,
        "likes": 8,
        "explore_seconds": 60,
        "scroll_seconds": 45,
        "hover_posts": 3,
        "description": "שימוש יומי רגיל — ברירת מחדל",
    },
    "high": {
        "stories": 10,
        "likes": 15,
        "explore_seconds": 120,
        "scroll_seconds": 90,
        "hover_posts": 5,
        "description": "חשבון חדש / אחרי ban / לפני campaign גדול",
    },
}

WARM_HASHTAGS_IG = [
    "ישראל", "תלאביב", "אוכל", "כושר", "אופנה", "נדלן",
    "יזמות", "עסקים", "טיול", "חתולים", "כלבים",
]


# ─── IGWarmer — Instagram ─────────────────────────────────────────────────────

class IGWarmer:
    """
    מחמם חשבון Instagram לפני session שיווקי.
    משתמש ב-Instagrapi Client.

    פעולות:
    - watch_stories: צפייה בסטוריז של משתמשים אקראיים
    - like_posts:    לייק לפוסטים מהאשטג אקראי
    - scroll_explore: המתנה שמדמה גלילה ב-Explore
    """

    def __init__(self, client):
        """
        :param client: Instagrapi Client מחובר
        """
        self.cl = client

    async def run(self, intensity: str = "medium") -> None:
        """
        מריץ פרוטוקול חימום מלא.
        :param intensity: "low" / "medium" / "high"
        """
        cfg = INTENSITY_CONFIG.get(intensity, INTENSITY_CONFIG["medium"])
        logger.info(
            "[IGWarmer] Starting warm — intensity=%s (%s)",
            intensity, cfg["description"]
        )

        # 1. גלילת Explore (מדמה גלילה)
        await self._scroll_explore(cfg["explore_seconds"])

        # 2. צפייה בסטוריז
        await self._watch_stories(cfg["stories"])

        # 3. לייקים לפוסטים
        await self._like_posts(cfg["likes"])

        logger.info("[IGWarmer] Warm complete ✓")

    async def _scroll_explore(self, seconds: int) -> None:
        """מדמה גלילה ב-Explore על ידי המתנה עם jitter."""
        logger.info("[IGWarmer] Simulating Explore scroll (%ds)...", seconds)
        jitter = random.uniform(0.8, 1.3)
        await asyncio.sleep(seconds * jitter)

    async def _watch_stories(self, count: int) -> None:
        """צפייה בסטוריז של משתמשים מהאשטג אקראי."""
        if count <= 0:
            return
        hashtag = random.choice(WARM_HASHTAGS_IG)
        logger.info("[IGWarmer] Watching up to %d stories (hashtag: #%s)...", count, hashtag)
        watched = 0
        try:
            loop = asyncio.get_event_loop()
            medias = await loop.run_in_executor(
                None,
                lambda: self.cl.hashtag_medias_recent(hashtag, amount=count * 3)
            )
            seen_users: set[str] = set()
            for media in medias:
                if watched >= count:
                    break
                user_pk = str(media.user.pk)
                if user_pk in seen_users:
                    continue
                seen_users.add(user_pk)
                try:
                    stories = await loop.run_in_executor(
                        None,
                        lambda pk=user_pk: self.cl.user_stories(int(pk))
                    )
                    if stories:
                        story_ids = [s.id for s in stories[:3]]
                        await loop.run_in_executor(
                            None,
                            lambda ids=story_ids: self.cl.story_seen(ids)
                        )
                        watched += 1
                        logger.debug("[IGWarmer] Watched stories of @%s", media.user.username)
                        await asyncio.sleep(random.uniform(2, 6))
                except Exception as e:
                    logger.debug("[IGWarmer] Story skip: %s", e)
                    continue
        except Exception as e:
            logger.warning("[IGWarmer] _watch_stories error: %s", e)
        logger.info("[IGWarmer] Watched %d story sessions.", watched)

    async def _like_posts(self, count: int) -> None:
        """לייק לפוסטים מהאשטג אקראי."""
        if count <= 0:
            return
        hashtag = random.choice(WARM_HASHTAGS_IG)
        logger.info("[IGWarmer] Liking up to %d posts (hashtag: #%s)...", count, hashtag)
        liked = 0
        try:
            loop = asyncio.get_event_loop()
            medias = await loop.run_in_executor(
                None,
                lambda: self.cl.hashtag_medias_recent(hashtag, amount=count * 2)
            )
            for media in medias:
                if liked >= count:
                    break
                try:
                    await loop.run_in_executor(
                        None,
                        lambda m=media: self.cl.media_like(m.id)
                    )
                    liked += 1
                    logger.debug("[IGWarmer] Liked media %s", media.id)
                    await asyncio.sleep(random.uniform(3, 9))
                except Exception as e:
                    logger.debug("[IGWarmer] Like skip: %s", e)
                    continue
        except Exception as e:
            logger.warning("[IGWarmer] _like_posts error: %s", e)
        logger.info("[IGWarmer] Liked %d posts.", liked)


# ─── PlaywrightWarmer — Facebook & TikTok ────────────────────────────────────

class PlaywrightWarmer:
    """
    מחמם חשבון Facebook או TikTok דרך Playwright browser automation.
    פעולות: גלילת פיד, hover על פוסטים, צפייה בוידאו.

    שימוש:
        warmer = PlaywrightWarmer(page, platform="facebook")
        await warmer.run()
    """

    def __init__(self, page, platform: str = "facebook"):
        """
        :param page:     Playwright Page object (כבר מחובר לפלטפורמה)
        :param platform: "facebook" | "tiktok"
        """
        self.page = page
        self.platform = platform.lower()

    async def run(self, intensity: str | None = None) -> None:
        """
        מריץ פרוטוקול חימום מתאים לפלטפורמה.
        :param intensity: "low" / "medium" / "high" (None = מה-env)
        """
        if intensity is None:
            intensity = os.getenv("WARM_INTENSITY", "medium")
        cfg = INTENSITY_CONFIG.get(intensity, INTENSITY_CONFIG["medium"])

        logger.info(
            "[PlaywrightWarmer:%s] Starting warm — intensity=%s",
            self.platform, intensity
        )

        if self.platform == "facebook":
            await self._warm_facebook(cfg)
        elif self.platform == "tiktok":
            await self._warm_tiktok(cfg)
        else:
            logger.warning("[PlaywrightWarmer] Unknown platform: %s", self.platform)

        logger.info("[PlaywrightWarmer:%s] Warm complete ✓", self.platform)

    # ── Facebook ──────────────────────────────────────────────────────────────

    async def _warm_facebook(self, cfg: dict) -> None:
        """פעולות חימום ספציפיות לפייסבוק."""
        # 1. גלילת פיד
        await self._scroll_feed(cfg["scroll_seconds"])

        # 2. hover על פוסטים
        await self._hover_posts_fb(cfg["hover_posts"])

        # 3. צפייה בוידאו קצר (אם יש)
        await self._watch_fb_video(seconds=random.randint(8, 20))

    async def _scroll_feed(self, seconds: int) -> None:
        """גלילת הפיד על ידי לחיצות מקלדת."""
        logger.info("[PlaywrightWarmer:fb] Scrolling feed for %ds...", seconds)
        end_time = asyncio.get_event_loop().time() + seconds
        while asyncio.get_event_loop().time() < end_time:
            await self.page.keyboard.press("ArrowDown")
            await asyncio.sleep(random.uniform(0.4, 1.2))

    async def _hover_posts_fb(self, count: int) -> None:
        """Hover על פוסטים בפיד."""
        logger.info("[PlaywrightWarmer:fb] Hovering over %d posts...", count)
        selectors = [
            "[role='article']",
            "div[data-pagelet*='FeedUnit']",
            ".x1yztbdb",  # FB class (נשתנה לפעמים)
        ]
        for _ in range(count):
            for sel in selectors:
                try:
                    elements = await self.page.query_selector_all(sel)
                    if elements:
                        el = random.choice(elements[:8])
                        await el.hover()
                        await asyncio.sleep(random.uniform(1.5, 4.0))
                        break
                except Exception:
                    continue

    async def _watch_fb_video(self, seconds: int) -> None:
        """מוצא וידאו ראשון בפיד ומחכה שהוא ירוץ."""
        logger.info("[PlaywrightWarmer:fb] Watching FB video for ~%ds...", seconds)
        video_selectors = ["video", "[aria-label*='video']", "[data-video-id]"]
        for sel in video_selectors:
            try:
                el = await self.page.query_selector(sel)
                if el:
                    await el.scroll_into_view_if_needed()
                    await asyncio.sleep(seconds + random.uniform(-3, 3))
                    return
            except Exception:
                continue
        # אם לא מצא וידאו — פשוט ממתין
        await asyncio.sleep(seconds)

    # ── TikTok ────────────────────────────────────────────────────────────────

    async def _warm_tiktok(self, cfg: dict) -> None:
        """פעולות חימום ספציפיות לטיקטוק."""
        # 1. צפייה ב-4 סרטונים מלאים (עד 80% משך)
        videos_to_watch = cfg.get("stories", 4)  # שימוש ב-stories כcounter
        await self._watch_tiktok_videos(videos_to_watch)

        # 2. לייק ל-2-3 סרטונים
        await self._like_tiktok_videos(min(cfg["likes"] // 4 + 1, 3))

        # 3. גלילת FYP
        await self._scroll_fyp(cfg["scroll_seconds"])

    async def _watch_tiktok_videos(self, count: int) -> None:
        """צפייה בסרטוני טיקטוק על ידי המתנה."""
        logger.info("[PlaywrightWarmer:tt] Watching %d TikTok videos...", count)
        for i in range(count):
            watch_time = random.uniform(8, 25)  # 8-25 שניות לסרטון
            logger.debug("[PlaywrightWarmer:tt] Watching video %d/%d (%.0fs)", i+1, count, watch_time)
            await asyncio.sleep(watch_time)
            # Swipe לסרטון הבא
            try:
                await self.page.keyboard.press("ArrowDown")
                await asyncio.sleep(random.uniform(0.5, 1.5))
            except Exception:
                pass

    async def _like_tiktok_videos(self, count: int) -> None:
        """לייק לסרטוני טיקטוק."""
        logger.info("[PlaywrightWarmer:tt] Liking %d TikTok videos...", count)
        like_selectors = [
            "[data-e2e='like-icon']",
            "strong[data-e2e='like-count']",
            "button[aria-label*='Like']",
        ]
        for _ in range(count):
            for sel in like_selectors:
                try:
                    el = await self.page.query_selector(sel)
                    if el:
                        await el.click()
                        await asyncio.sleep(random.uniform(1, 3))
                        break
                except Exception:
                    continue
            # המתנה בין לייקים
            await asyncio.sleep(random.uniform(5, 12))

    async def _scroll_fyp(self, seconds: int) -> None:
        """גלילת FYP (For You Page) בטיקטוק."""
        logger.info("[PlaywrightWarmer:tt] Scrolling FYP for %ds...", seconds)
        end_time = asyncio.get_event_loop().time() + seconds
        while asyncio.get_event_loop().time() < end_time:
            await self.page.keyboard.press("ArrowDown")
            await asyncio.sleep(random.uniform(15, 30))  # כל 15-30 שניות — סרטון חדש
