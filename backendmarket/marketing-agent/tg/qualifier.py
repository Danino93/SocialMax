"""
tg/qualifier.py — Lead Qualifier Bot
-------------------------------------
כשמישהו עונה ל-DM שלנו, מזהים את הפלטפורמה שהם רוצים לקדם
ושולחים Pitch מותאם אישית.

זרימה:
  1. Monitor/Scraper שולחים DM עם שאלת כישורים ("איזה פלטפורמה?")
  2. המשתמש עונה (הודעה פרטית)
  3. Qualifier מזהה: איזו פלטפורמה / מטרה?
  4. שולח Pitch ספציפי לפלטפורמה, בשקלים, ישראלי
  5. מסמן ב-DB כ-"qualified"

Handler נרשם על NewMessage מ-private chats (DMs שנכנסים אלינו).
"""
import asyncio
import logging
import random

from telethon import TelegramClient, events
from telethon.errors import UserPrivacyRestrictedError, FloodWaitError

from .database import (
    get_qualifier_status,
    set_qualifier_done,
    get_dm_cooldown_ok,
)

logger = logging.getLogger(__name__)


# ─── Platform Detection ────────────────────────────────────────────────────────

PLATFORM_KEYWORDS: dict[str, list[str]] = {
    "instagram": [
        "אינסטגרם", "instagram", "insta", "ig", "ריל", "רילס", "reel", "reels",
        "סטורי", "story", "stories",
    ],
    "tiktok": [
        "טיקטוק", "tiktok", "tik tok", "tik-tok",
    ],
    "youtube": [
        "יוטיוב", "youtube", "yt", "subscribers", "סאבסקרייברס",
    ],
    "facebook": [
        "פייסבוק", "facebook", "fb", "פייג'", "page",
    ],
    "google": [
        "גוגל", "google", "ביקורות", "כוכבים", "מפות", "maps", "reviews",
        "דירוג", "5 כוכבים",
    ],
    "telegram": [
        "טלגרם", "telegram", "ערוץ", "channel", "מנויים",
    ],
    "spotify": [
        "ספוטיפיי", "spotify", "האזנות", "streams",
    ],
    "discord": [
        "דיסקורד", "discord", "שרת", "server",
    ],
    "twitter": [
        "טוויטר", "twitter", "x", "ציוצים", "tweets",
    ],
}


def detect_platform(text: str) -> str:
    """
    מזהה פלטפורמה מתוך טקסט תשובה של המשתמש.
    מחזיר שם פלטפורמה או 'general' אם לא זוהה.
    """
    text_lower = text.lower()
    for platform, keywords in PLATFORM_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in text_lower:
                return platform
    return "general"


# ─── Pitch Templates לפי פלטפורמה ────────────────────────────────────────────

PLATFORM_PITCHES: dict[str, list[str]] = {
    "instagram": [
        "מעולה! 📸 לאינסטגרם יש לנו:\n"
        "• עוקבים ישראלים אמיתיים 🇮🇱\n"
        "• לייקים לפוסטים וריילס\n"
        "• צפיות לסטוריז\n"
        "• תגובות ושמירות\n\n"
        "מחירים בשקלים, מסירה תוך 24 שעות ⚡\n"
        "👉 @socialsniper93_bot — כתוב /start ותהיה בעניינים",

        "נהדר! אינסטגרם היא הפלטפורמה הכי חזקה היום 📸\n\n"
        "מה שאנחנו מציעים לאינסטגרם:\n"
        "✅ עוקבים ישראלים אמיתיים\n"
        "✅ לייקים ממשיים\n"
        "✅ צפיות לריילס וסטוריז\n"
        "✅ מחירים בשקלים, ללא דולרים\n\n"
        "👉 @socialsniper93_bot לכל המחירים והחבילות",
    ],
    "tiktok": [
        "מגניב! 🎵 טיקטוק = האלגוריתם הכי ויראלי שיש!\n\n"
        "לטיקטוק יש לנו:\n"
        "• עוקבים\n"
        "• לייקים לסרטונים\n"
        "• צפיות וריחים\n"
        "• תגובות\n\n"
        "מחירים בשקלים, אלגוריתם-פריינדלי ⚡\n"
        "👉 @socialsniper93_bot — שלח /start",

        "טיקטוק זה הכסף הגדול! 🎵\n\n"
        "החבילות שלנו לטיקטוק:\n"
        "✅ עוקבים ממשיים\n"
        "✅ לייקים לסרטון\n"
        "✅ צפיות ממשיות\n"
        "✅ כל זה בשקלים 🇮🇱\n\n"
        "👉 @socialsniper93_bot",
    ],
    "youtube": [
        "יוטיוב — המלך! ▶️\n\n"
        "לקנאל שלך יש לנו:\n"
        "• Subscribers (מנויים)\n"
        "• צפיות לסרטונים\n"
        "• לייקים\n"
        "• Watch Hours\n\n"
        "הכל בשקלים, תוך 24-48 שעות ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "facebook": [
        "פייסבוק עדיין מלך לעסקים! 👍\n\n"
        "לפייסבוק יש לנו:\n"
        "• לייקים לפייג'\n"
        "• עוקבים\n"
        "• לייקים לפוסטים\n"
        "• Reviews לעמוד\n\n"
        "מחירים בשקלים, מהיר ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "google": [
        "ביקורות גוגל = הכי חשוב לעסק! ⭐\n\n"
        "לקוחות בודקים ביקורות גוגל לפני הכל.\n"
        "יש לנו חבילות ביקורות 5 כוכבים:\n"
        "• ביקורות ממשיות\n"
        "• בטוח ויציב\n"
        "• מחירים בשקלים 🇮🇱\n\n"
        "👉 @socialsniper93_bot — כתוב /start ותראה מחירים",

        "5 כוכבים בגוגל = יותר לקוחות! ⭐⭐⭐⭐⭐\n\n"
        "אנחנו מציעים ביקורות גוגל ממשיות לעסק שלך.\n"
        "בטוח, מהיר, בשקלים 🇮🇱\n\n"
        "👉 @socialsniper93_bot",
    ],
    "telegram": [
        "טלגרם — הפלטפורמה שאנחנו הכי אוהבים! ✈️\n\n"
        "לערוץ/קבוצה שלך יש לנו:\n"
        "• מנויים לערוץ\n"
        "• צפיות להודעות\n"
        "• שיתופים\n\n"
        "מחירים בשקלים, מסירה מהירה ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "spotify": [
        "ספוטיפיי 🎵 — מגניב!\n\n"
        "לפרופיל שלך יש לנו:\n"
        "• Streams (האזנות)\n"
        "• עוקבים\n"
        "• Saves ו-Playlist adds\n\n"
        "בשקלים, מהיר ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "discord": [
        "Discord? מגניב! 🎮\n\n"
        "לשרת שלך יש לנו:\n"
        "• חברי שרת\n"
        "• Online members boost\n\n"
        "בשקלים ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "twitter": [
        "X/Twitter — הרשת הכי ויראלית! 🐦\n\n"
        "יש לנו:\n"
        "• עוקבים\n"
        "• לייקים\n"
        "• ריטוויטים\n\n"
        "בשקלים ⚡\n"
        "👉 @socialsniper93_bot",
    ],
    "general": [
        "מעולה שדיברנו! 🙌\n\n"
        "@socialsniper93_bot מציע שירותי SMM לכל הפלטפורמות:\n"
        "📸 אינסטגרם — עוקבים, לייקים, צפיות\n"
        "🎵 טיקטוק — עוקבים, לייקים, צפיות\n"
        "▶️ יוטיוב — Subscribers, צפיות\n"
        "👍 פייסבוק — לייקים, עוקבים\n"
        "⭐ ביקורות גוגל\n\n"
        "הכל בשקלים, שירות ישראלי 🇮🇱\n"
        "👉 כתוב /start ב-@socialsniper93_bot",

        "כיף! יש לנו פתרון לכל פלטפורמה 🚀\n\n"
        "שלח /start ב-@socialsniper93_bot ותבחר מה שמתאים לך.\n"
        "מחירים בשקלים, שירות ישראלי מלא 🇮🇱",
    ],
}


# ─── Register handler ─────────────────────────────────────────────────────────

def register_handler(client: TelegramClient) -> None:
    """
    רושם handler לתשובות incoming DMs.
    כשמישהו עונה לנו בפרטי — בודקים אם הוא 'awaiting' ושולחים Pitch.
    """

    @client.on(events.NewMessage(incoming=True, func=lambda e: e.is_private))
    async def qualifier_handler(event):
        """מטפל בתשובות פרטיות לDMs שלנו."""
        try:
            sender = await event.get_sender()
            if sender is None:
                return
            if getattr(sender, "bot", False):
                return

            user_id = str(sender.id)

            # בדוק שהמשתמש ב-'awaiting' — ענה לשאלת הכישורים שלנו
            status = get_qualifier_status(user_id)
            if status != "awaiting":
                return  # לא פנינו אליו עם שאלה, מתעלמים

            # זהה פלטפורמה מהתשובה
            msg_text = event.message.message or ""
            platform = detect_platform(msg_text)

            logger.info(
                "Qualifier: user %s ענה '%s' → platform: %s",
                user_id, msg_text[:50], platform,
            )

            # בחר Pitch מתאים
            pitches = PLATFORM_PITCHES.get(platform, PLATFORM_PITCHES["general"])
            pitch   = random.choice(pitches)

            # מחכה קצת — נראה אנושי
            await asyncio.sleep(random.uniform(3, 8))

            # שלח Pitch
            await client.send_message(sender, pitch)

            # עדכן DB
            set_qualifier_done(user_id, platform)

            logger.info("Qualifier: Pitch נשלח ל-%s (פלטפורמה: %s)", user_id, platform)

        except UserPrivacyRestrictedError:
            logger.debug("Qualifier: Privacy restricted for user")
        except FloodWaitError as e:
            logger.warning("Qualifier: FloodWait %ds", e.seconds)
            await asyncio.sleep(e.seconds + 5)
        except Exception as e:
            logger.debug("Qualifier handler error: %s", e)

    logger.info("Qualifier handler רשום — מאזין לתשובות DMs פרטיים ✓")
