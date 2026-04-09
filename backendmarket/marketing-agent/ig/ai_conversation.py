"""
ig/ai_conversation.py — Gemini-Powered Instagram Conversation Manager
----------------------------------------------------------------------
Gemini מנהל את כל שיחות ה-DM באינסטגרם — מההיכרות ועד הסגירה.

שני שירותים:

  Feature 3 — Comment Reply Monitor:
    כשמישהו עונה לתגובה שלנו בפוסט → Gemini מייצר DM אנושי וחכם
    ומדבר איתו בהקשר המדויק של מה שהם כתבו.

  Feature 11 — DM Inbox Manager:
    בודק תיבת ה-DMs כל שעתיים.
    כשלקוח פוטנציאלי ענה לנו → Gemini ממשיך את השיחה בצורה חכמה:
      שלב 'new'        → ברכה + שאלת פתיחה
      שלב 'qualifying' → הבנת הצורך (פלטפורמה, מטרה, גודל)
      שלב 'pitching'   → הצגת הפתרון הרלוונטי בקצרה
      שלב 'closing'    → CTA ל-@socialsniper93_bot
"""
import logging
import random
import time

from instagrapi import Client
from instagrapi.exceptions import (
    ClientError, FeedbackRequired, PleaseWaitFewMinutes,
    UserNotFound, MediaNotFound,
)

from .config import ACTIVE_HOUR_START, ACTIVE_HOUR_END, TIMEZONE
from .database import (
    is_paused, is_comment_reply_seen, log_comment_reply,
    mark_comment_reply_dm_sent, increment_stat,
    get_active_conversations, update_ig_conversation,
    close_ig_conversation, start_ig_conversation,
)
from shared.ai_provider import ai_generate_sync

import pytz
from datetime import datetime

logger = logging.getLogger(__name__)


# ─── Persona — Gemini מקבל את זה כהקשר לכל שיחה ───────────────────────────

DANNY_PERSONA = """
אתה דני, יועץ SMM ישראלי חברי ומקצועי מ-@socialsniper93_bot.
אתה מנהל שיחות קצרות עם לקוחות פוטנציאליים באינסטגרם.

מה SocialSniper מוכר:
  • עוקבים / לייקים / צפיות — לכל הפלטפורמות (אינסטגרם, טיקטוק, יוטיוב, פייסבוק)
  • ביקורות גוגל 5 כוכבים
  • טלגרם: מנויים לערוץ, צפיות
  • מחירים בשקלים, שירות ישראלי, מהיר

שלבי השיחה:
  new        → ברכה חברית + שאל "באיזו פלטפורמה אתה הכי פעיל?"
  qualifying → הבן מה הם צריכים: "כמה עוקבים כרגע? מה המטרה שלך?"
  pitching   → הצג את הפתרון הרלוונטי בקצרה (לא יותר מ-2 שורות)
  closing    → "כתוב /start ב-@socialsniper93_bot — תראה מחירים ותתחיל 🚀"

חוקים דיבוריים:
  ✅ עברית בלבד
  ✅ 1–2 משפטים קצרים (לא יותר!)
  ✅ טון ידידותי, חברי, לא מוכרני
  ✅ תגיב בהתאם למה שהם אמרו — אל תעתיק תשובות גנריות
  ❌ אל תאמר שאתה בוט/AI
  ❌ אל תאמר מחירים מספריים ספציפיים
  ❌ אל תשלח יותר מ-2 משפטים
  ❌ אל תכתוב "בוודאי!" / "מעולה!" / "נהדר!" — נשמע רובוטי
"""

# DM פולבק כשGemini נכשל
FALLBACK_DMS = [
    "היי! ראיתי את התגובה שלך 😊 תגיד, איזה פלטפורמה הכי חשובה לך לקדם?",
    "שלום! ראיתי אותך כאן — סקרן לדעת על מה אתה עובד. אינסטגרם? טיקטוק? משהו אחר?",
    "היי 👋 אתה נראה פעיל פה. תגיד — מה הפלטפורמה שהכי חשובה לך?",
]

# מספר DMs מקסימלי ל-Comment Reply Monitor ביום
DAILY_REPLY_MONITOR_LIMIT = 8


# ─── Feature 3 — Comment Reply Monitor ───────────────────────────────────────

def run_comment_reply_monitor(cl: Client) -> int:
    """
    סורק תגובות חדשות לפוסטים שלנו.
    כשמישהו ענה לתגובה שלנו → Gemini שולח DM אנושי בהקשר מדויק.
    מחזיר מספר DMs שנשלחו.
    """
    if is_paused():
        return 0
    if not _is_active_hour():
        return 0

    try:
        our_pk   = str(cl.user_id)
        our_name = cl.username

        # שלוף 8 פוסטים אחרונים שלנו
        medias = cl.user_medias(cl.user_id, amount=8)
    except Exception as e:
        logger.warning("Comment reply monitor: can't fetch our medias: %s", e)
        return 0

    sent_today = 0
    sent = 0

    for media in medias:
        if sent >= DAILY_REPLY_MONITOR_LIMIT:
            break
        if is_paused():
            break

        try:
            shortcode = media.code
            caption   = (getattr(media, "caption_text", "") or "")[:120]
            comments  = cl.media_comments(media.id, amount=60)
        except (MediaNotFound, ClientError):
            continue
        except Exception as e:
            logger.debug("Can't fetch comments for %s: %s", media.code, e)
            continue

        # תגובות שלנו בפוסט
        our_comment_ids = {
            str(c.pk) for c in comments
            if str(c.user.pk) == our_pk or c.user.username == our_name
        }

        if not our_comment_ids:
            continue

        # מצא תגובות-תגובה של אחרים
        for comment in comments:
            if sent >= DAILY_REPLY_MONITOR_LIMIT:
                break

            replied_to = str(getattr(comment, "replied_to_comment_id", "") or "")
            if replied_to not in our_comment_ids:
                continue
            if str(comment.user.pk) == our_pk:
                continue  # תגובה שלנו
            if getattr(comment.user, "is_private", False):
                continue

            comment_id = str(comment.pk)
            if is_comment_reply_seen(comment_id):
                continue

            username = comment.user.username
            reply_text = (comment.text or "")[:200]

            # רשום מיד כ-seen כדי למנוע כפילויות
            log_comment_reply(comment_id, username, shortcode, reply_text)

            # Gemini — מייצר DM בהקשר מדויק
            prompt = (
                f"{DANNY_PERSONA}\n\n"
                f"פוסט שלנו: \"{caption}\"\n"
                f"@{username} ענה על התגובה שלנו וכתב: \"{reply_text}\"\n\n"
                f"כתוב DM אנושי קצר (1-2 משפטים) שמגיב בהקשר ומזמין שיחה."
            )
            dm_text = ai_generate_sync(prompt, "ig_comment_reply")
            if not dm_text:
                dm_text = random.choice(FALLBACK_DMS)

            try:
                cl.direct_send(dm_text, user_ids=[int(comment.user.pk)])
                mark_comment_reply_dm_sent(comment_id)
                start_ig_conversation(username)   # מתחיל מעקב שיחה
                increment_stat("dms_sent")
                sent += 1
                logger.info("Comment Reply DM → @%s (post: %s)", username, shortcode)
                time.sleep(random.randint(45, 90))

            except (UserNotFound, FeedbackRequired):
                logger.debug("Comment Reply DM blocked for @%s", username)
                break
            except PleaseWaitFewMinutes:
                logger.warning("Rate limited — sleeping 10 min")
                time.sleep(600)
                break
            except Exception as e:
                logger.debug("DM to @%s failed: %s", username, e)

    logger.info("Comment Reply Monitor: %d DMs sent", sent)
    return sent


# ─── Feature 11 — DM Inbox Manager ──────────────────────────────────────────

def run_dm_inbox_manager(cl: Client) -> int:
    """
    בודק תיבת ה-DMs — כשלקוח ענה לנו, Gemini ממשיך את השיחה.
    מחזיר מספר תשובות שנשלחו.
    """
    if is_paused():
        return 0

    active = get_active_conversations()
    if not active:
        logger.info("DM Inbox: no active conversations to manage.")
        return 0

    our_pk   = str(cl.user_id)
    replied  = 0

    # בנה מפה username → stage
    convo_map = {c["username"]: c for c in active}

    try:
        threads = cl.direct_threads(amount=30)
    except Exception as e:
        logger.warning("DM Inbox: can't fetch threads: %s", e)
        return 0

    for thread in threads:
        if is_paused():
            break
        if replied >= 10:  # cap per run
            break

        # מצא את המשתמש השני בשיחה
        other_users = [u for u in thread.users if str(u.pk) != our_pk]
        if not other_users:
            continue

        other = other_users[0]
        username = other.username

        if username not in convo_map:
            continue  # לא שיחה שלנו

        convo = convo_map[username]
        stage = convo["stage"]

        # שלוף הודעות מהthread
        try:
            messages = cl.direct_messages(thread.id, amount=12)
        except Exception as e:
            logger.debug("Can't fetch messages for thread %s: %s", thread.id, e)
            continue

        if not messages:
            continue

        # מצא ההודעה האחרונה מהמשתמש
        user_msgs = [
            m for m in messages
            if str(getattr(m, "user_id", "")) != our_pk
            and getattr(m, "item_type", "") == "text"
        ]
        if not user_msgs:
            continue

        last_user_msg = sorted(user_msgs, key=lambda m: m.timestamp, reverse=True)[0]
        last_user_text = (getattr(last_user_msg, "text", "") or "").strip()

        if not last_user_text:
            continue

        # בדוק שלא ענינו כבר להודעה הזו
        our_last_reply_at = convo.get("our_last_reply_at")
        if our_last_reply_at:
            try:
                from datetime import timezone
                last_reply_ts = datetime.fromisoformat(our_last_reply_at)
                if last_reply_ts.tzinfo is None:
                    last_reply_ts = last_reply_ts.replace(tzinfo=timezone.utc)
                msg_ts = last_user_msg.timestamp
                if msg_ts.tzinfo is None:
                    msg_ts = msg_ts.replace(tzinfo=timezone.utc)
                if last_reply_ts >= msg_ts:
                    continue  # כבר ענינו אחרי ההודעה הזו
            except Exception:
                pass

        # בנה היסטוריית שיחה לGemini (6 הודעות אחרונות)
        history_lines = []
        for msg in sorted(messages, key=lambda m: m.timestamp):
            if getattr(msg, "item_type", "") != "text":
                continue
            text = (getattr(msg, "text", "") or "").strip()
            if not text:
                continue
            if str(getattr(msg, "user_id", "")) == our_pk:
                history_lines.append(f"דני: {text}")
            else:
                history_lines.append(f"@{username}: {text}")
        history = "\n".join(history_lines[-6:])

        # קבע שלב הבא
        next_stage = _next_stage(stage, last_user_text)

        # Gemini מייצר את התשובה
        prompt = (
            f"{DANNY_PERSONA}\n\n"
            f"היסטוריית השיחה:\n{history}\n\n"
            f"@{username} כתב כרגע: \"{last_user_text}\"\n"
            f"שלב נוכחי: {stage} → שלב הבא: {next_stage}\n\n"
            f"כתוב תשובה קצרה, טבעית, בעברית (1-2 משפטים)."
        )
        reply = ai_generate_sync(prompt, "ig_inbox")
        if not reply:
            reply = _fallback_by_stage(next_stage)

        # שלח תשובה
        try:
            cl.direct_send(reply, thread_ids=[thread.id])
            update_ig_conversation(username, last_user_text, next_stage)
            replied += 1
            logger.info(
                "DM Inbox reply → @%s | stage: %s→%s", username, stage, next_stage
            )
            time.sleep(random.randint(20, 60))

            # אם הגענו לclosing → סמן done אחרי עוד שיחה
            if next_stage == "done":
                close_ig_conversation(username)

        except FeedbackRequired:
            logger.warning("FeedbackRequired in DM inbox — stopping")
            break
        except PleaseWaitFewMinutes:
            logger.warning("Rate limited in DM inbox — sleeping 10 min")
            time.sleep(600)
            break
        except Exception as e:
            logger.debug("Inbox reply to @%s failed: %s", username, e)

    logger.info("DM Inbox Manager: %d replies sent", replied)
    return replied


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _is_active_hour() -> bool:
    tz  = pytz.timezone(TIMEZONE)
    now = datetime.now(tz)
    return ACTIVE_HOUR_START <= now.hour < ACTIVE_HOUR_END


def _next_stage(current: str, user_msg: str) -> str:
    """
    קובע את השלב הבא לפי השלב הנוכחי.
    Gemini מקבל את ההחלטה הסופית — זה רק רמז.
    """
    flow = {"new": "qualifying", "qualifying": "pitching", "pitching": "closing", "closing": "done"}
    return flow.get(current, "qualifying")


def _fallback_by_stage(stage: str) -> str:
    """תשובת ברירת מחדל כשGemini נכשל."""
    FALLBACKS = {
        "qualifying": "תגיד, איזה פלטפורמה הכי חשובה לך — אינסטגרם, טיקטוק, יוטיוב?",
        "pitching":   "יש לנו פתרון מצוין בשקלים 🇮🇱 @socialsniper93_bot — כתוב שם /start",
        "closing":    "כדי לראות מחירים ולהתחיל — כתוב /start ב-@socialsniper93_bot 🚀",
        "done":       "שמח לעזור! אם יש שאלות נוספות — @socialsniper93_bot 😊",
    }
    return FALLBACKS.get(stage, random.choice(FALLBACK_DMS))
