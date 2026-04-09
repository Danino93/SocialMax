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

# Group names that are usually not relevant for SocialSniper outreach.
TITLE_BLACKLIST_TERMS = [
    "????? ?????????", "???? ????????", "escort", "adult", "sex",
    "forex", "crypto leads", "recovery leads", "casino", "bet",
]

# Group names that are likely relevant to business/marketing audiences.
TITLE_WHITELIST_TERMS = [
    "?????", "???", "?????", "?????", "?????", "?????", "??????",
    "marketing", "digital", "social", "smm", "ecommerce", "e-commerce",
    "freelance", "???? ?????", "??????", "?????",
]


# ─── מילות מפתח לחיפוש — 60+ קטגוריות ──────────────────────────────────────
SEARCH_KEYWORDS: list[str] = [

    # ── עוקבים ולייקים (הישירים ביותר) ────────────────────────────────────────
    "עוקבים", "לייקים", "צפיות", "תגובות",
    "יותר עוקבים", "להגדיל עוקבים", "לקנות עוקבים",
    "עוקבים אינסטגרם", "עוקבים טיקטוק", "עוקבים יוטיוב",
    "לייקים פייסבוק", "views יוטיוב", "subscribers",

    # ── קידום ופרסום עסקי ──────────────────────────────────────────────────────
    "קידום עסק", "פרסום עסק", "קידום אורגני",
    "קידום ממומן", "קידום ברשתות", "קידום בגוגל",
    "פרסום ממומן", "מודעות פייסבוק", "מודעות אינסטגרם",
    "Google Ads ישראל", "Meta Ads", "פרסומות",
    "הגדלת חשיפה", "חשיפה", "טווח הגעה",

    # ── שיווק דיגיטלי ──────────────────────────────────────────────────────────
    "שיווק דיגיטלי", "שיווק", "מרקטינג",
    "סושיאל מדיה", "ניהול רשתות חברתיות",
    "SMM ישראל", "digital marketing israel",
    "social media ישראל", "social media israel",
    "תוכן דיגיטלי", "תוכן שיווקי", "content marketing",
    "אסטרטגיה שיווקית", "פאנל שיווקי", "משכיות לקוחות",

    # ── יוצרי תוכן ואינפלואנסרים ───────────────────────────────────────────────
    "יוצר תוכן", "יוצרי תוכן", "קריאייטור",
    "אינפלואנסר", "influencer ישראל", "nano influencer",
    "micro influencer", "ויראלי", "להפוך לוויראלי",
    "TikTok ויראלי", "ריל ויראלי", "רילס",
    "קונטנט", "content creator", "UGC",

    # ── עסקים ויזמות (לקוחות פוטנציאליים עם עסק) ─────────────────────────────
    "עסקים", "יזמות", "סטארטאפ", "פרילנסרים",
    "עצמאים", "עסק קטן", "בעלי עסקים",
    "ייעוץ עסקי", "מסחר", "אי קומרס",
    "dropshipping", "e-commerce ישראל",
    "אמזון ישראל", "מוצרים דיגיטליים",
    "עסק מהבית", "לפתוח עסק", "הכנסה פסיבית",
    "מכירות אונליין", "חנות אונליין", "Shopify ישראל",

    # ── ביקורות ודירוגים ───────────────────────────────────────────────────────
    "ביקורות גוגל", "דירוג גוגל", "Google Maps ביקורות",
    "ביקורות עסק", "דירוג מסעדה", "דירוג 5 כוכבים",
    "כמה ביקורות", "לקבל ביקורות", "יותר ביקורות",

    # ── ספוטיפיי ─────────────────────────────────────────────────────────────
    "Spotify ישראל", "מוזיקה Spotify", "streams Spotify",
    "להגדיל plays", "playlist Spotify",

    # ── טלגרם ────────────────────────────────────────────────────────────────
    "חברי קבוצה טלגרם", "מנויי ערוץ", "subscribers טלגרם",
    "לגדול בטלגרם", "קבוצת טלגרם גדולה",

    # ── Discord ─────────────────────────────────────────────────────────────
    "Discord ישראל", "Discord server", "חברי Discord",

    # ── רשתות חברתיות — פלטפורמות ─────────────────────────────────────────────
    "אינסטגרם", "טיקטוק", "יוטיוב", "פייסבוק",
    "X טוויטר", "Threads", "LinkedIn ישראל",
    "Pinterest ישראל", "Snapchat",

    # ── שאלות שאנשים שואלים בקבוצות (לא מכירים SMM) ──────────────────────────
    "איך מגדילים עוקבים", "מי מכיר שירות",
    "מישהו מכיר SMM", "מישהו עשה קידום",
    "מה הדרך הטובה לצמוח", "איך מקדמים עסק",
    "איך לפרסם עסק", "איפה מפרסמים",
    "כמה עולה פרסום", "שירות קידום",
    "לקוחות חדשים", "להביא לקוחות",
    "איך מביאים לקוחות", "לידים", "leads",
    "שיפור מכירות", "להגדיל מכירות",

    # ── נישות עם קהל רלוונטי ───────────────────────────────────────────────────
    # נדל"ן
    "נדלן", "נדל\"ן ישראל", "מתווכים",
    "השקעות נדלן", "דירות", "סוכני נדלן",

    # פיננסים וקריפטו
    "קריפטו", "ביטקוין", "השקעות",
    "מסחר בבורסה", "פורקס",
    "crypto israel", "bitcoin ישראל",
    "NFT ישראל", "Web3 ישראל",

    # AI וטכנולוגיה
    "בינה מלאכותית", "AI ישראל", "ChatGPT",
    "הייטק", "פיתוח", "תוכנה",
    "developers ישראל", "tech israel",
    "יזמות טכנולוגית", "data science",
    "אוטומציה", "automation",

    # קהילות מקצועיות
    "מעצבים", "צלמים", "גרפיקאים",
    "אמנים", "יוצרים", "קריאייטיב",
    "מורים ומדריכים", "קואצ'ינג", "מנטורינג",
    "עורכי דין", "רואי חשבון", "יועצים",
    "מטפלים", "מאמנים אישיים",

    # בריאות וכושר
    "כושר ובריאות", "אימון", "תזונה",
    "יוגה", "ספורט", "ריצה",
    "personal trainer ישראל", "פילאטיס",
    "dietitian ישראל", "תזונאים",

    # יופי ואסתטיקה
    "מאפרות", "ביוטי", "נייל", "שיער",
    "קוסמטיקאיות", "lash ישראל", "microblading",
    "ספא", "טיפוח", "beauty ישראל",

    # אוכל ועסקי מזון
    "מסעדות", "שפים", "קייטרינג",
    "קונדיטוריה", "עוגות", "עסק מזון",
    "מסעדן ישראל", "food blogger",

    # אופנה וסגנון חיים
    "אופנה", "בוטיק", "עיצוב",
    "fashion ישראל", "בגדים", "סטייליסט",

    # טיולים ותיירות
    "טיולים", "תיירות", "טיסות",
    "backpacking", "travel ישראל",
    "מדריכי טיולים", "tzim tzum",

    # הורים ומשפחה
    "הורים", "הורות", "גני ילדים",
    "חינוך", "תלמידים", "אמהות",
    "תינוקות", "mom blogger ישראל",

    # ספורט ובידור
    "מוזיקה ישראל", "גיימינג", "ספורט ישראל",
    "כדורגל", "כדורסל", "DJ ישראל",
    "מוזיקאים", "אמני מוזיקה",

    # קהילות ערים (פעילות מאוד)
    "תל אביב", "ירושלים", "חיפה",
    "ראשון לציון", "פתח תקווה", "נתניה",
    "בת ים", "רמת גן", "אשדוד",
    "באר שבע", "רחובות", "הרצליה",
    "כפר סבא", "מודיעין", "אשקלון",
    "חולון", "גבעתיים", "רמת השרון",

    # כללי ישראלי (מגנט לכל הקהלים)
    "ישראל", "קהילה ישראלית",
    "telegram ישראל", "קבוצה ישראלית",
    "ישראלים", "עברית",
]


def _is_relevant_group(entity) -> bool:
    """Return True only for groups with business/marketing relevance."""
    title = (getattr(entity, "title", "") or "").lower()
    username = (getattr(entity, "username", "") or "").lower()
    searchable = f"{title} {username}"

    if any(term.lower() in searchable for term in TITLE_BLACKLIST_TERMS):
        return False
    if not any(term.lower() in searchable for term in TITLE_WHITELIST_TERMS):
        return False
    return True


def _is_valid_group(entity) -> bool:
    """???????? ???"-entity ?????? ??????????/???????? ???? ???????? ?????????? ??????????."""
    if not isinstance(entity, (Chat, Channel)):
        return False
    # ?????? ???? ?????????? broadcast ??? ?????????? ???? ???????????? ??????????-????????????
    if isinstance(entity, Channel) and entity.broadcast:
        return False
    count = getattr(entity, "participants_count", None) or 0
    if not (MIN_GROUP_MEMBERS <= count <= MAX_GROUP_MEMBERS):
        return False
    return _is_relevant_group(entity)


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
