"""
tg/monitor.py — Real-time Keyword Monitor + Competitor Tracker + Sentiment
---------------------------------------------------------------------------
שלוש יכולות במודול אחד:

  1. Keyword Monitor — מאזין לקבוצות בזמן אמת.
     כשמישהו כותב משהו רלוונטי → שולח לו DM אוטומטי.
     מילות טריגר רחבות: עוקבים / קידום / שיווק / עסק / אינסטגרם...
     (הרוב לא מכירים SMM — הם פשוט רוצים יותר לקוחות)

  2. Competitor Monitor — עוקב אחרי ערוצים/קבוצות של מתחרים.
     שומר הודעות לDB לניתוח — מחירים, קמפיינים, מה עובד להם.

  3. Sentiment Tracker — סופר כמה פעמים ביום אנשים מדברים על
     עוקבים/קידום/שיווק → מזהה מגמות וזמני שיא.

הרשמה: monitor.register_handlers(client)  ← קוראים מ-main.py
"""
import asyncio
import logging
import random
from datetime import date, datetime

import pytz
from telethon import TelegramClient, events
from telethon.errors import UserPrivacyRestrictedError, FloodWaitError, PeerFloodError

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused,
    log_monitor_hit, get_dm_cooldown_ok, log_dm_sent,
    log_competitor_msg, increment_sentiment, increment_stat,
    get_monitor_dms_today, set_qualifier_awaiting,
)

logger = logging.getLogger(__name__)


# ─── לימיטים ─────────────────────────────────────────────────────────────────
DAILY_MONITOR_DM_LIMIT = 12        # מקסימום DMs שנשלחים דרך ה-Monitor ביום
MONITOR_DM_COOLDOWN_DAYS = 21      # לא שולחים שוב לאותו משתמש ב-21 יום
DM_REPLY_DELAY_SEC = (60, 180)     # מחכים 1–3 דקות לפני DM (נראה אנושי)


# ─── מילות טריגר — הלב של ה-Monitor ─────────────────────────────────────────
# אלו המילים שגורמות לנו לפנות למשתמש.
# רחב מאוד — הרוב לא מכירים SMM, הם מחפשים לגדול, להביא לקוחות, לקדם עסק.

TRIGGER_KEYWORDS: list[str] = [

    # ── מחפשי עוקבים/לייקים (הישירים ביותר) ──────────────────────────────────
    "עוקבים", "לייקים", "צפיות", "subscribers",
    "יותר עוקבים", "להגדיל עוקבים", "לקנות עוקבים",
    "איך מגדילים", "לקנות לייקים", "views",
    "follower", "followers", "likes",

    # ── קידום ועסק ────────────────────────────────────────────────────────────
    "קידום", "לקדם", "לפרסם", "פרסום",
    "להביא לקוחות", "לקוחות חדשים", "יותר לקוחות",
    "לידים", "leads", "הגדלת מכירות",
    "להגדיל מכירות", "יותר מכירות",
    "איך מביאים לקוחות", "איך מפרסמים",
    "איפה מפרסמים", "כמה עולה פרסום",

    # ── שיווק (גם מי שמכיר את המונח) ─────────────────────────────────────────
    "שיווק", "מרקטינג", "שיווק דיגיטלי",
    "SMM", "ניהול רשתות", "סושיאל מדיה",
    "digital marketing", "social media",

    # ── פלטפורמות — כשמישהו מזכיר בהקשר של גדילה ─────────────────────────────
    "אינסטגרם", "טיקטוק", "יוטיוב",
    "פייסבוק", "טלגרם עוקבים",
    "ויראלי", "viral", "ריל", "reel",
    "חשיפה", "טווח הגעה", "reach",

    # ── יוצרי תוכן ──────────────────────────────────────────────────────────
    "יוצר תוכן", "content creator", "אינפלואנסר",
    "influencer", "UGC",

    # ── ביקורות גוגל ────────────────────────────────────────────────────────
    "ביקורות גוגל", "דירוג גוגל", "Google Maps",
    "ביקורות עסק", "5 כוכבים",

    # ── שאלות עזרה כלליות (אנשים שמחפשים שירות) ─────────────────────────────
    "מישהו מכיר", "מי יכול לעזור",
    "מחפש שירות", "המלצה על",
    "מי עשה", "ניסה מישהו",
]

# מילות חיזוק — אם גם אחת מהן קיימת, הסיכוי גבוה יותר שהמשתמש רלוונטי
BOOST_KEYWORDS: list[str] = [
    "עסק", "עסקי", "פרופיל", "חשבון",
    "אינסטגרם", "טיקטוק", "יוטיוב",
    "ישראל", "ישראלי",
    "מכירות", "לקוחות", "הכנסה",
]


# ─── הודעות DM — למי שטרגרנו דרך Monitor ────────────────────────────────────
# שאלת כישורים ראשונה → Qualifier יטפל בתשובה ויישלח Pitch מותאם

MONITOR_DM_TEMPLATES: list[str] = [
    "היי 👋 ראיתי שדיברת על {topic} —\n"
    "אגב, איזה פלטפורמה הכי חשוב לך לקדם?\n"
    "(אינסטגרם / טיקטוק / יוטיוב / פייסבוק / ביקורות גוגל / אחר)",

    "שלום! ראיתי את ההודעה שלך על {topic} 😊\n"
    "תגיד, על איזה פלטפורמה אתה הכי רוצה לגדול?\n"
    "אינסטגרם? טיקטוק? יוטיוב? פייסבוק?",

    "היי 👋 בא לי לעזור עם {topic} —\n"
    "רק שאלה אחת: איזה רשת חברתית הכי חשובה לך?\n"
    "(אינסטגרם / טיקטוק / יוטיוב / פייסבוק / ביקורות גוגל)",

    "שלום! נושא ה{topic} מעניין אותי 💡\n"
    "תגיד, אתה מחפש לקדם:\n"
    "📸 אינסטגרם\n🎵 טיקטוק\n▶️ יוטיוב\n👍 פייסבוק\n⭐ ביקורות גוגל\nאחר?",

    "היי 👋 ראיתי אותך כותב על {topic} —\n"
    "אפשר לשאול: מה המטרה שלך?\n"
    "יותר עוקבים? יותר לייקים? לקוחות חדשים? ביקורות גוגל?",
]


# ─── Register handlers על ה-Telethon client ──────────────────────────────────

def register_handlers(client: TelegramClient, competitor_ids: list[int] = None) -> None:
    """
    רושם את כל ה-event handlers על ה-client.
    קוראים פעם אחת מ-main.py אחרי יצירת ה-client.
    competitor_ids — רשימת IDs של ערוצים/קבוצות מתחרים לניטור.
    """
    competitor_ids = competitor_ids or []

    # ── Handler 1: Keyword Monitor ────────────────────────────────────────────
    @client.on(events.NewMessage())
    async def keyword_monitor(event):
        """מאזין לכל הודעה חדשה בקבוצות שהחשבון חבר בהן."""
        try:
            # רק בשעות פעילות
            tz  = pytz.timezone(TIMEZONE)
            now = datetime.now(tz)
            if not (ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END):
                return

            # רק הודעות בקבוצות/סופרגרופים — לא DMs
            if not event.is_group and not event.is_channel:
                return

            # לא להגיב לעצמנו
            if event.out:
                return

            # בדוק טריגר
            msg_text = (event.message.message or "").lower()
            if not any(kw.lower() in msg_text for kw in TRIGGER_KEYWORDS):
                return

            # עדכן Sentiment Tracker
            matched = [kw for kw in TRIGGER_KEYWORDS if kw.lower() in msg_text]
            for kw in matched:
                increment_sentiment(kw)

            # בדוק אם ה-Agent מושהה
            if is_paused():
                return

            # בדוק לימיט יומי
            if get_monitor_dms_today() >= DAILY_MONITOR_DM_LIMIT:
                return

            # קבל פרטי שולח
            sender = await event.get_sender()
            if sender is None or getattr(sender, "bot", False):
                return  # לא שולחים DM לבוטים
            if not getattr(sender, "id", None):
                return

            user_id = str(sender.id)

            # בדוק cooldown
            if not get_dm_cooldown_ok(user_id, MONITOR_DM_COOLDOWN_DAYS):
                return

            # שמור את ה-hit ב-DB
            group_id  = str(event.chat_id)
            log_monitor_hit(user_id, group_id, matched[0], msg_text[:200])

            # מחכים קצת — נראה אנושי
            delay = random.uniform(*DM_REPLY_DELAY_SEC)
            await asyncio.sleep(delay)

            # בחר topic לתגובה
            topic = _topic_from_keywords(matched)

            # בחר תבנית DM
            template = random.choice(MONITOR_DM_TEMPLATES)
            dm_text  = template.format(topic=topic)

            # שלח DM
            await _send_dm(client, sender, dm_text, user_id)

        except Exception as e:
            logger.debug("keyword_monitor error: %s", e)

    # ── Handler 2: Competitor Monitor ─────────────────────────────────────────
    if competitor_ids:
        @client.on(events.NewMessage(chats=competitor_ids))
        async def competitor_monitor(event):
            """שומר הודעות מתחרים ל-DB לניתוח."""
            try:
                msg   = event.message.message or ""
                cid   = str(event.chat_id)
                mid   = str(event.message.id)
                if msg:
                    log_competitor_msg(cid, mid, msg[:1000])
            except Exception as e:
                logger.debug("competitor_monitor error: %s", e)

    logger.info(
        "Monitor handlers registered — %d trigger keywords, %d competitor channels",
        len(TRIGGER_KEYWORDS), len(competitor_ids),
    )


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _topic_from_keywords(matched: list[str]) -> str:
    """ממפה מילת טריגר לנושא קריא לDM."""
    TOPIC_MAP = {
        "עוקבים": "עוקבים",
        "לייקים": "לייקים",
        "צפיות": "צפיות",
        "קידום": "קידום ברשתות",
        "פרסום": "פרסום",
        "שיווק": "שיווק דיגיטלי",
        "ביקורות גוגל": "ביקורות גוגל",
        "לקוחות חדשים": "השגת לקוחות",
        "חשיפה": "הגדלת חשיפה",
        "ויראלי": "תוכן ויראלי",
    }
    for kw in matched:
        if kw in TOPIC_MAP:
            return TOPIC_MAP[kw]
    return "קידום ברשתות"


async def _send_dm(
    client: TelegramClient,
    sender,
    text: str,
    user_id: str,
) -> None:
    """שולח DM ומעדכן DB."""
    try:
        await client.send_message(sender, text)
        log_dm_sent(user_id, "monitor", text[:200])
        set_qualifier_awaiting(user_id)   # מסמן שאנחנו ממתינים לתשובת כישורים
        increment_stat("monitor_dms_sent")
        logger.info("Monitor DM sent to user %s", user_id)
    except UserPrivacyRestrictedError:
        logger.debug("User %s has privacy restrictions — skipping DM", user_id)
    except PeerFloodError:
        logger.warning("PeerFloodError — מגביל DMs למשך 30 דקות")
        await asyncio.sleep(1800)
    except FloodWaitError as e:
        logger.warning("FloodWait %ds — waiting...", e.seconds)
        await asyncio.sleep(e.seconds + 5)
    except Exception as e:
        logger.debug("DM to %s failed: %s", user_id, e)
