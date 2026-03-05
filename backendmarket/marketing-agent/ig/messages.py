"""
Instagram message templates.
Three categories:
  - COMMENT_TEMPLATES : short engagement comments (no bot mention — builds trust)
  - DM_TEMPLATES      : personal DM messages with soft service mention
  - CAPTION_TEMPLATES : captions for our own Reels/posts
"""
import random

# ─── Comment templates ────────────────────────────────────────────────────────
# Pure engagement — builds genuine presence before any DM
COMMENT_TEMPLATES: list[str] = [
    "תוכן מדהים! 🔥",
    "ממש מרשים, ממשיכים כך! 👊",
    "אחלה! מה הסוד שלך? 😄",
    "בדיוק מה שהייתי צריך לראות 🙌",
    "כל הכבוד, יצא נהדר!",
    "נייל איט 🎯",
    "וואו, איזה עבודה יפה!",
    "תוכן מושלם, ממשיך לעקוב! ✨",
    "לב אש 🔥❤️",
    "מדהים! רואים שאתה שם לב לפרטים!",
]

# ─── DM templates ─────────────────────────────────────────────────────────────
# {hashtag} placeholder is replaced at runtime
DM_TEMPLATES: list[str] = [
    "שלום! ראיתי את התוכן שלך ונראה מעניין 🙌 אני מציע שירות לגדילה ברשתות — אם סקרן, אשמח לספר",
    "היי! ראיתי אותך בהאשטג #{hashtag}. אני עוזר לאנשים לגדול באינסטגרם בצורה טבעית — מעניין לשמוע?",
    "שלום, אני רואה שאתה פעיל מאוד! יש לי שירות שעוזר לחשבונות כמו שלך לגדול מהר יותר 🚀",
    "היי! סתם ראיתי את הפרופיל שלך — תוכן מעניין! אם יש שאלות על גדילה אורגנית, אני כאן 😊",
    "שלום! אני עוזר לבעלי עסקים ויוצרי תוכן לגדול ברשתות. מוזמן לבקר: @socialsniper93_bot 🇮🇱",
    "היי! ראיתי אותך פעיל ב#{hashtag}. מציע SMM ישראלי — עוקבים, לייקים, צפיות. מעניין? ⚡",
    "שלום {name}! ראיתי את התוכן שלך — ממש מקצועי 🙌 יש שירות שעוזר לחשבונות כמו שלך לגדול מהר. מעניין?",
    "היי! עוקב אחרי התוכן שלך כבר זמן מה 😊 יש לי שירות SMM ישראלי שיכול לעזור לך. @socialsniper93_bot לפרטים",
    "שלום! אני עוזר לבעלי עסקים לגדול ב-Instagram בצורה טבעית ומהירה 🚀 5 דקות שיחה ואני מסביר הכל",
    "היי! ראיתי שאתה פעיל מאוד — תוכן מעולה! מציע boost חכם שמשלים את העבודה שלך. @socialsniper93_bot 🇮🇱",
]

# ─── Caption templates for our own Reels / posts ─────────────────────────────
CAPTION_TEMPLATES: list[str] = [
    (
        "רוצה לגדול בטיקטוק או אינסטגרם? 📲\n"
        "1,200+ ישראלים כבר עושים את זה דרך @socialsniper93_bot\n"
        "🔗 קישור בביו\n\n"
        "#שיווקדיגיטלי #אינסטגרם #טיקטוק #עסקים"
    ),
    (
        "מה ההבדל בין 500 ל-5,000 עוקבים?\n"
        "תוכן טוב + דחיפה קטנה 🔥\n"
        "@socialsniper93_bot לפרטים!\n\n"
        "#SMM #שיווק #גדילהאורגנית #ישראל"
    ),
    (
        "הסוד שרוב הבלוגרים לא אומרים לך 📢\n"
        "boost חכם = צמיחה מהירה\n"
        "@socialsniper93_bot\n\n"
        "#influencer #בלוגר #שיווקישראל #תוכן"
    ),
    (
        "שירות ה-SMM הישראלי הכי מהיר והאמין ⚡\n"
        "מחירים בשקלים | שירות בעברית\n"
        "@socialsniper93_bot\n\n"
        "#SMMIsrael #שיווקדיגיטלי #עסקיםישראל"
    ),
]


# ─── Template selectors ───────────────────────────────────────────────────────

def get_comment_template(last_used_id: int = -1) -> tuple[int, str]:
    """Return (template_id, text), avoiding same template twice in a row."""
    indices = [i for i in range(len(COMMENT_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, COMMENT_TEMPLATES[idx]


def get_dm_template(last_used_id: int = -1, hashtag: str = "שיווקדיגיטלי") -> tuple[int, str]:
    """Return (template_id, text) with hashtag substituted."""
    indices = [i for i in range(len(DM_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    text = DM_TEMPLATES[idx].replace("{hashtag}", hashtag)
    return idx, text


def get_caption_template(last_used_id: int = -1) -> tuple[int, str]:
    """Return (template_id, caption) for our own posts."""
    indices = [i for i in range(len(CAPTION_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, CAPTION_TEMPLATES[idx]
