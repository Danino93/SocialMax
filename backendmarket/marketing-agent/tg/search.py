"""
tg_search.py — גילוי קבוצות טלגרם ל-Telegram Marketing Agent
מחפש קבוצות לפי 60+ מילות מפתח, מסנן לפי גודל, שומר ל-DB.
"""
import logging
import asyncio
import random
from telethon import TelegramClient
from telethon.tl.functions.contacts import SearchRequest
from telethon.tl.types import Chat, Channel

from .config import MIN_GROUP_MEMBERS, MAX_GROUP_MEMBERS
from .database import log_group, increment_stat, get_groups_found_today

logger = logging.getLogger(__name__)


# ─── מילות מפתח לחיפוש — 60+ קטגוריות ──────────────────────────────────────
SEARCH_KEYWORDS: list[str] = [

    # שיווק ורשתות חברתיות
    "שיווק דיגיטלי", "שיווק", "סושיאל מדיה",
    "אינסטגרם", "טיקטוק", "יוטיוב", "פייסבוק",
    "SMM ישראל", "influencer", "תוכן דיגיטלי",
    "digital marketing israel", "social media israel",

    # עסקים ויזמות
    "עסקים", "יזמות", "סטארטאפ", "פרילנסרים",
    "עצמאים", "עסק קטן", "בעלי עסקים",
    "ייעוץ עסקי", "מסחר", "אי קומרס",
    "dropshipping", "e-commerce ישראל",

    # נדל"ן
    "נדלן", "נדל\"ן ישראל", "מתווכים",
    "השקעות נדלן", "דירות",

    # פיננסים וקריפטו
    "קריפטו", "ביטקוין", "השקעות",
    "מסחר בבורסה", "פורקס",
    "crypto israel", "bitcoin ישראל",

    # AI וטכנולוגיה
    "בינה מלאכותית", "AI ישראל", "ChatGPT",
    "הייטק", "פיתוח", "תוכנה",
    "developers ישראל", "tech israel",
    "יזמות טכנולוגית", "data science",

    # קהילות מקצועיות
    "מעצבים", "צלמים", "גרפיקאים",
    "אמנים", "יוצרים", "קריאייטיב",
    "מורים ומדריכים", "קואצ'ינג",
    "עורכי דין", "רואי חשבון",

    # בריאות וכושר
    "כושר ובריאות", "אימון", "תזונה",
    "יוגה", "ספורט", "ריצה",
    "personal trainer ישראל",

    # אוכל ועסקי מזון
    "אוכל ישראלי", "מסעדות", "שפים",
    "קייטרינג", "קונדיטוריה",

    # אופנה וסגנון חיים
    "אופנה", "בוטיק", "עיצוב",
    "מאפרות", "ביוטי", "נייל",

    # טיולים ותיירות
    "טיולים", "תיירות", "טיסות",
    "backpacking", "טייסות ישראל",

    # הורים ומשפחה
    "הורים", "הורות", "גני ילדים",
    "חינוך", "תלמידים",

    # בידור ותרבות
    "מוזיקה ישראל", "גיימינג", "ספורט ישראל",
    "כדורגל", "סדרות", "סרטים",
    "ממים", "בידור ישראלי",

    # קהילות ערים
    "תל אביב", "ירושלים", "חיפה",
    "ראשון לציון", "פתח תקווה", "נתניה",
    "בת ים", "רמת גן", "אשדוד",

    # כללי ישראלי
    "ישראל", "קהילה ישראלית", "חדשות ישראל",
    "telegram ישראל", "קבוצה ישראלית",
]


def _is_valid_group(entity) -> bool:
    """בודק שה-entity הוא קבוצה/ערוץ עם מספר חברים מקובל."""
    if not isinstance(entity, (Chat, Channel)):
        return False
    # דלג על ערוצי broadcast — רוצים רק קבוצות וסופר-גרופים
    if isinstance(entity, Channel) and entity.broadcast:
        return False
    count = getattr(entity, "participants_count", None) or 0
    return MIN_GROUP_MEMBERS <= count <= MAX_GROUP_MEMBERS


async def find_groups(client: TelegramClient, daily_limit: int) -> int:
    """
    מחפש קבוצות חדשות לפי מילות מפתח אקראיות.
    מחזיר מספר קבוצות חדשות שנוספו ל-DB.
    """
    # בדיקת לימיט יומי
    already_found_today = get_groups_found_today()
    remaining = daily_limit - already_found_today
    if remaining <= 0:
        logger.info("הגענו ללימיט גילוי קבוצות יומי.")
        return 0

    # בחירה אקראית של מילות מפתח — גיוון כל יום
    keywords = random.sample(SEARCH_KEYWORDS, min(len(SEARCH_KEYWORDS), remaining * 4))

    new_count = 0
    for keyword in keywords:
        if new_count >= remaining:
            break
        try:
            result = await client(SearchRequest(q=keyword, limit=10))
            for chat in result.chats:
                if not _is_valid_group(chat):
                    continue

                telegram_id = str(chat.id)
                username    = getattr(chat, "username", None)
                title       = getattr(chat, "title", telegram_id)
                members     = getattr(chat, "participants_count", 0) or 0

                was_new = log_group(telegram_id, username, title, members)
                if was_new:
                    new_count += 1
                    increment_stat("groups_found")
                    logger.info("קבוצה חדשה: %s (%d חברים)", title, members)

                if new_count >= remaining:
                    break

            # עיכוי קצר בין חיפושים — לא להציף את ה-API
            await asyncio.sleep(3)

        except Exception as e:
            logger.warning("שגיאת חיפוש עבור '%s': %s", keyword, e)
            await asyncio.sleep(5)

    logger.info("גילוי קבוצות הסתיים: %d קבוצות חדשות.", new_count)
    return new_count
