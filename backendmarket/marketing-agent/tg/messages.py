"""
tg_messages.py — תבניות הודעות ל-Telegram Marketing Agent
16 תבניות בעברית ב-4 קטגוריות — נראות אנושיות, לא רובוטיות.
5 תבניות כוללות {group_name} לפרסונליזציה לפי שם הקבוצה.
"""
import random

# ─── 16 תבניות הודעה ──────────────────────────────────────────────────────────
# 4 קטגוריות × 3 תבניות קיימות + 4 חדשות
# {group_name} מוחלף בשם הקבוצה בזמן אמת (ב-poster.py)
TEMPLATES: list[str] = [

    # ── קטגוריה א: שיתוף אישי (soft, personal story) ──────────────────────────
    (
        "שיתוף קטן — לפני כמה חודשים לא האמנתי בשירותי SMM. "
        "אחרי @socialsniper93_bot הפרופיל שלי נראה אחרת לגמרי 😅 "
        "מי שרוצה לשמוע עוד, מוזמן לשאול"
    ),
    (
        "אני יודע זה לא מה שכולם אוהבים לשמוע, אבל לפעמים "
        "קצת דחיפה לפרופיל שווה הרבה 🙃 "
        "@socialsniper93_bot עשה את זה בשקלים ובלי עגמת נפש"
    ),
    (
        "ניסיתי כמה שירותים — רוב לא שווים את הכסף. "
        "@socialsniper93_bot היה שונה. מסירה מהירה, תוצאות אמיתיות. "
        "שיתוף בלבד, לא מרוויח כלום מזה 🤷"
    ),

    # ── קטגוריה ב: המלצה לחבר (direct but not pushy) ──────────────────────────
    (
        "כאן ב-{group_name} מישהו שאל אתמול על שירות SMM — "
        "שלחתי לו @socialsniper93_bot. "
        "ישראלי, עברית, שקלים. אין על זה 🇮🇱"
    ),
    (
        "אם מישהו ב-{group_name} מחפש לגדול ברשתות — @socialsniper93_bot. "
        "לא מסובך, לא יקר, עובד. זהו 😎"
    ),
    (
        "חבר כאן ב-{group_name} שאל איפה אפשר לקנות עוקבים לאינסטגרם בלי לסבך — "
        "שלחתי לו @socialsniper93_bot. "
        "חזר עם תוצאות תוך יום 🙌"
    ),

    # ── קטגוריה ג: שאלה + ערך (engagement first) ──────────────────────────────
    (
        "שאלה לחברי {group_name} — מישהו ניסה שירות SMM? "
        "מחפש המלצה לפני שמשקיע 😅 "
        "(כן, קצת ביישן לשאול)"
    ),
    (
        "טיפ לחברי {group_name} שרוצים לגדול בטיקטוק: "
        "שילוב של תוכן טוב + boost קטן עושה פלאים 🔥 "
        "@socialsniper93_bot מציע בדיוק את זה"
    ),
    (
        "מישהו יודע שהאלגוריתם של אינסטגרם "
        "מעדיף חשבונות עם engagement גבוה? "
        "@socialsniper93_bot נותן בדיוק את הדחיפה הזו 📈"
    ),

    # ── קטגוריה ד: Social proof (numbers & facts) ──────────────────────────────
    (
        "1,200+ ישראלים כבר משתמשים ב-@socialsniper93_bot — "
        "עוקבים, צפיות, לייקים, ביקורות גוגל. "
        "מי שעוד לא ניסה... 👀"
    ),
    (
        "בלי לעשות פרסומת יתרה — "
        "@socialsniper93_bot הפך לאחד מהבוטים הפופולריים ל-SMM בישראל. "
        "דירוג 4.9/5 מ-1,200+ לקוחות 🇮🇱"
    ),
    (
        "כשרוצים לגדול ברשתות מהר ובבטחה — @socialsniper93_bot. "
        "שירות ישראלי, מחירים בשקלים, תוצאות מוכחות ⚡"
    ),

    # ── קטגוריה ה: חדשות — דעות, עובדות ושיתוף ────────────────────────────────
    (
        "שאלת תום שאלה — מה עדיף: להשקיע בתוכן או ב-boost? "
        "לדעתי — שניהם 😄 @socialsniper93_bot"
    ),
    (
        "רק שיתוף — ב-3 חודשים עברנו מ-200 ל-4,000 עוקבים. "
        "לא קסם, סתם עבודה נכונה + כלים נכונים 🔧 "
        "@socialsniper93_bot"
    ),
    (
        "מי מכיר מישהו שצריך לגדול בטיקטוק? "
        "@socialsniper93_bot — ישראלי, בשקלים, עובד 🇮🇱"
    ),
    (
        "עובדה מעניינת: לקוחות בוחרים עסקים עם עוד ביקורות גוגל ב-68% מהמקרים. "
        "@socialsniper93_bot עושה גם את זה 📍"
    ),
]

NUM_TEMPLATES = len(TEMPLATES)


def get_template(last_template_id: int = -1) -> tuple[int, str]:
    """
    בוחר תבנית לפי Epsilon-greedy A/B selection — מעדיף תבניות עם הצלחה גבוהה.
    (עם 20% סיכוי לאקראיות לחקירה מתמשכת)
    מחזיר (template_id, message_text).
    הערה: {group_name} עדיין קיים בטקסט — poster.py מחליף אותו לפני שליחה.
    """
    try:
        from .database import get_weighted_template_id  # lazy import — avoids circular at load
        idx = get_weighted_template_id(last_template_id)
    except Exception:
        # Fallback to pure random if DB not ready yet
        available = [i for i in range(NUM_TEMPLATES) if i != last_template_id]
        if not available:
            available = list(range(NUM_TEMPLATES))
        idx = random.choice(available)
    return idx, TEMPLATES[idx]
