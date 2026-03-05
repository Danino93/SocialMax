"""
tt_messages.py — תבניות הודעות ל-TikTok Agent
תגובות קצרות בסגנון TikTok + כיתובי וידאו לחשבון שלנו.
כל הטקסטים בעברית — שוק ישראלי.
"""
import random
from typing import Tuple


# ─── תגובות לוידאוים ──────────────────────────────────────────────────────────
# קצרות, נראות אנושיות — בסגנון TikTok ישראלי
# לא מזכירות את הבוט/שירות — רק engagement אמיתי
COMMENT_TEMPLATES: list[str] = [
    "ממש מועיל! 🔥",
    "תוכן מעולה, כל הכבוד 🙌",
    "אחלה ריל! ❤️",
    "זה בדיוק מה שחיפשתי 👊",
    "מדהים, נהניתי לצפות! ✨",
    "כשר 🎯",
    "וואו, לא ידעתי! 😍",
    "תוכן מושלם, ממשיך לעקוב! 💪",
    "לב אש 🔥❤️",
    "נייל איט 🎯",
    "תמשיך כך, תוכן מעולה! 🚀",
    "פשוט מושלם 🤩",
]


# ─── כיתובי וידאו לחשבון שלנו ────────────────────────────────────────────────
# לוידאוים שאנחנו מעלים — מציגים את הבוט/שירות
# hashtags ישראליים + אנגליים לחשיפה מקסימלית
VIDEO_CAPTIONS: list[str] = [
    "רוצה לגדול בטיקטוק? 📲\n@socialsniper93_bot\n#שיווקדיגיטלי #טיקטוק #ישראל #SMM",
    "הסוד לגדילה מהירה ברשתות 🔥\n@socialsniper93_bot\n#שיווק #ישראל #business #tiktoktips",
    "1,200+ ישראלים גדלו ברשתות איתנו 🇮🇱\n@socialsniper93_bot\n#SMM #ישראל #שיווקדיגיטלי",
    "שירות SMM ישראלי — עוקבים, לייקים, צפיות ⚡\n@socialsniper93_bot\n#ישראל #שיווק #עסקים",
    "boost חכם = צמיחה אמיתית 🚀\n@socialsniper93_bot\n#אינסטגרם #טיקטוק #שיווק #ישראל",
    "אם אתה רוצה לגדול בטיקטוק — זה הסוד 🤫\n@socialsniper93_bot\n#ישראל #שיווק #growth #fyp",
    "SMM ישראלי = תוצאות אמיתיות 🇮🇱\n@socialsniper93_bot\n#טיקטוק #אינסטגרם #עסקים #שיווקדיגיטלי",
    "5,000 עוקבים תוך שבוע? אפשרי 💪\n@socialsniper93_bot\n#SMM #ישראל #followersboost #tiktoktips",
]


# ─── selectors ─────────────────────────────────────────────────────────────────

def get_comment_template(last_id: int = -1) -> Tuple[int, str]:
    """
    בוחר תבנית תגובה אקראית — לא חוזרת על הקודמת.
    מחזיר (template_id, comment_text).
    """
    available = [
        (i, t) for i, t in enumerate(COMMENT_TEMPLATES)
        if i != last_id
    ]
    idx, text = random.choice(available)
    return idx, text


def get_video_caption(last_id: int = -1) -> Tuple[int, str]:
    """
    בוחר כיתוב אקראי לוידאו — לא חוזר על הקודם.
    מחזיר (caption_id, caption_text).
    """
    available = [
        (i, c) for i, c in enumerate(VIDEO_CAPTIONS)
        if i != last_id
    ]
    idx, text = random.choice(available)
    return idx, text
