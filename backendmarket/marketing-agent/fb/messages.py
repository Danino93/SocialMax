"""
Facebook message templates.
Four categories:
  - GROUP_POST_TEMPLATES    : posts in Facebook groups (soft sell)
  - GROUP_COMMENT_TEMPLATES : short comments on group posts (no bot mention — builds trust)
  - MESSENGER_DM_TEMPLATES  : personal Messenger DMs with soft service mention
  - PAGE_POST_TEMPLATES     : captions for our own Facebook Page posts
"""
import random

# ─── Group post templates ─────────────────────────────────────────────────────
GROUP_POST_TEMPLATES: list[str] = [
    (
        "שיתוף קצר 🙋\n"
        "ניסיתי כמה שירותי SMM בשנה האחרונה.\n"
        "@socialsniper93_bot היה הכי טוב — ישראלי, מהיר, בשקלים ❤️\n"
        "מי שמחפש — ממליץ בחום!"
    ),
    (
        "שאלה לקבוצה 🤔\n"
        "מישהו ניסה שירות לקניית עוקבים/לייקים ישראלי?\n"
        "מחפש המלצה לפני שמשקיע 😅"
    ),
    (
        "טיפ מהניסיון שלי לגדול ברשתות:\n"
        "תוכן טוב + דחיפה קטנה בהתחלה = תוצאות אמיתיות 🔥\n"
        "@socialsniper93_bot נותן בדיוק את הדחיפה הזו!"
    ),
    (
        "1,200+ ישראלים כבר גדלו ברשתות עם @socialsniper93_bot ⚡\n"
        "שירות SMM — עוקבים, לייקים, צפיות, ביקורות גוגל.\n"
        "שירות ישראלי בשקלים 🇮🇱"
    ),
    (
        "חבר שלי הכפיל את העוקבים שלו תוך חודש.\n"
        "שאלתי איך — @socialsniper93_bot\n"
        "שיתוף בלבד, אין לי קשר 🤷"
    ),
    (
        "מי שרוצה נוכחות דיגיטלית חזקה — אין צורך לחכות חודשים 🚀\n"
        "@socialsniper93_bot מספק תוצאות תוך יום\n"
        "שירות ישראלי, מחירים בשקלים 🇮🇱"
    ),
    (
        "SMM ישראלי שמרגיש קרוב:\n"
        "שפה → עברית ✅\n"
        "מחירים → שקלים ✅\n"
        "שירות לקוחות → עברית ✅\n"
        "@socialsniper93_bot 💬"
    ),
    (
        "לא כל שירות SMM שווה את הכסף.\n"
        "@socialsniper93_bot כן — תוצאות אמיתיות, מחירים הוגנים ✅\n"
        "1,200+ לקוחות מרוצים לא טועים!"
    ),
]

# ─── Group comment templates ─────────────────────────────────────────────────
# Pure engagement — no bot mention, builds authentic presence
GROUP_COMMENT_TEMPLATES: list[str] = [
    "מעניין מאוד! 🙌",
    "תודה על השיתוף, ממש שימושי!",
    "אחלה תוכן, ממשיך לעקוב 👊",
    "כל הכבוד על הפוסט הזה 🔥",
    "בדיוק מה שהייתי צריך, תודה!",
    "ממש נהניתי לקרוא, תמשיך כך! ✨",
    "וואו, לא ידעתי את זה! תודה 😊",
    "שיתוף מעולה, מוסיף ערך לקבוצה! 💪",
]

# ─── Messenger DM templates ───────────────────────────────────────────────────
MESSENGER_DM_TEMPLATES: list[str] = [
    "שלום! ראיתי אותך בקבוצה ונראה שאתה פעיל מאוד 🙌 אני מציע שירות SMM ישראלי — אם סקרן, אשמח לספר",
    "היי! ראיתי את הפוסט שלך ונראה מעניין. @socialsniper93_bot — שירות לגדילה ברשתות, מוזמן לבקר 🇮🇱",
    "שלום! אני מציע שירות SMM ישראלי — עוקבים, לייקים, צפיות, בשקלים. מעניין? @socialsniper93_bot",
    "היי! ראיתי אותך פעיל בקבוצה — רציתי לשאול, אתה משתמש בשירותי SMM? יש לי שירות ישראלי מצוין 🚀",
    "שלום! מציע שירות SMM בעברית — תוצאות מהירות, מחירים בשקלים. @socialsniper93_bot לפרטים ⚡",
]

# ─── Page post templates ──────────────────────────────────────────────────────
PAGE_POST_TEMPLATES: list[str] = [
    (
        "רוצה לגדול ברשתות החברתיות? 📲\n"
        "1,200+ ישראלים כבר עושים את זה!\n"
        "שירות SMM ישראלי — עוקבים, לייקים, צפיות 🇮🇱\n"
        "@socialsniper93_bot\n\n"
        "#שיווקדיגיטלי #SMM #ישראל #אינסטגרם #טיקטוק"
    ),
    (
        "הסוד לגדילה מהירה ברשתות? 🤫\n"
        "תוכן טוב + boost חכם = תוצאות!\n"
        "בדוק: @socialsniper93_bot\n\n"
        "#אינסטגרם #טיקטוק #שיווק #ישראל #גדילהאורגנית"
    ),
    (
        "שירות ה-SMM הישראלי הכי פופולרי ⚡\n"
        "מחירים בשקלים | שירות בעברית | תוצאות תוך יום\n"
        "היכנס: @socialsniper93_bot\n\n"
        "#עסקיםישראל #שיווקדיגיטלי #SMM #פרילנסר"
    ),
    (
        "כשרוצים לגדול ברשתות — @socialsniper93_bot 🚀\n"
        "✅ עוקבים אמיתיים\n"
        "✅ לייקים וצפיות\n"
        "✅ ביקורות גוגל\n"
        "✅ שירות בעברית\n\n"
        "#SocialSniper #SMM #ישראל #שיווק"
    ),
]


# ─── Template selectors ───────────────────────────────────────────────────────

def get_group_post_template(last_used_id: int = -1) -> tuple[int, str]:
    indices = [i for i in range(len(GROUP_POST_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, GROUP_POST_TEMPLATES[idx]


def get_comment_template(last_used_id: int = -1) -> tuple[int, str]:
    indices = [i for i in range(len(GROUP_COMMENT_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, GROUP_COMMENT_TEMPLATES[idx]


def get_dm_template(last_used_id: int = -1) -> tuple[int, str]:
    indices = [i for i in range(len(MESSENGER_DM_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, MESSENGER_DM_TEMPLATES[idx]


def get_page_post_template(last_used_id: int = -1) -> tuple[int, str]:
    indices = [i for i in range(len(PAGE_POST_TEMPLATES)) if i != last_used_id]
    idx = random.choice(indices)
    return idx, PAGE_POST_TEMPLATES[idx]
