"""
ci/messages.py — תבניות DM ל-Competitor Infiltrator Agent
משמשות כ-fallback כשה-AI לא זמין.
מותאמות לפלטפורמה ולסוג התלונה.
"""
import random

# ─── תבניות Telegram DM ───────────────────────────────────────────────────────
FALLBACK_DMS_TG: list[str] = [
    (
        "היי! ראיתי שיש לך ניסיון עם שירותי SMM — "
        "מוזמן לנסות את SocialSniper 🇮🇱\n"
        "שירות ישראלי, בשקלים, עם תמיכה אמיתית בעברית.\n"
        "@socialsniper93_bot"
    ),
    (
        "שלום! שיווק ברשתות לא חייב להיות מסובך 😊\n"
        "SocialSniper — שירות SMM ישראלי עם מחירים שפויים ותוצאות אמיתיות.\n"
        "מוזמן לדבר: @socialsniper93_bot"
    ),
    (
        "היי, אשמח להציע חלופה ל-SMM שעשויה לעבוד בשבילך טוב יותר 🙂\n"
        "SocialSniper — ישראלי, עברית, שקלים, תמיכה 24/7.\n"
        "לפרטים: @socialsniper93_bot"
    ),
    (
        "שלום! שמעתי שאתה מחפש שירות SMM אמין — ניסית את SocialSniper? 🔥\n"
        "עוקבים, לייקים, צפיות — לכל הפלטפורמות. ישראלי לחלוטין.\n"
        "@socialsniper93_bot"
    ),
]

# ─── תבניות Instagram DM ──────────────────────────────────────────────────────
FALLBACK_DMS_IG: list[str] = [
    (
        "היי! ראיתי שיש לך ניסיון עם שירותי SMM ❤️‍🔥\n"
        "מוזמן לנסות SocialSniper — שירות ישראלי עם מחירים שפויים ותוצאות אמיתיות.\n"
        "כל הפרטים: @socialsniper93_bot בטלגרם"
    ),
    (
        "שלום! שיווק ברשתות לא חייב לעלות המון 😊\n"
        "SocialSniper נותן עוקבים/לייקים/צפיות בכל הפלטפורמות — ישראלי ובשקלים.\n"
        "בוא נדבר: @socialsniper93_bot"
    ),
    (
        "היי! אם אתה מחפש SMM אמין — SocialSniper מחכה לך 🇮🇱\n"
        "מחירים שפויים, תוצאות מהירות, תמיכה בעברית. @socialsniper93_bot"
    ),
]

# ─── תבניות לפי סוג תלונה ─────────────────────────────────────────────────────
COMPLAINT_TYPE_TEMPLATES: dict[str, list[str]] = {
    "price": [
        (
            "היי! מחפש SMM במחיר הוגן? 💰\n"
            "SocialSniper — מחירים ישראליים שפויים, תוצאות אמיתיות.\n"
            "@socialsniper93_bot"
        ),
    ],
    "bots": [
        (
            "היי! מחפש עוקבים/לייקים אמיתיים? ✅\n"
            "SocialSniper עובד רק עם פעילות אמיתית — ללא בוטים.\n"
            "@socialsniper93_bot"
        ),
    ],
    "alternative": [
        (
            "היי! מחפש שירות SMM טוב? 🔍\n"
            "SocialSniper — הבחירה הישראלית: עברית, שקלים, תמיכה אמיתית.\n"
            "@socialsniper93_bot"
        ),
    ],
}


def get_fallback_dm(platform: str = "telegram", complaint_keywords: list[str] | None = None) -> str:
    """
    מחזיר תבנית DM fallback לפי פלטפורמה וסוג תלונה.

    :param platform:          "telegram" | "instagram"
    :param complaint_keywords: keywords שנמצאו בתלונה (לבחירת תבנית מותאמת)
    :return: str — תבנית DM
    """
    # בדיקת סוג תלונה לבחירת תבנית מותאמת
    if complaint_keywords:
        keywords_str = " ".join(complaint_keywords).lower()
        if any(k in keywords_str for k in ["יקר", "מחיר", "עולה"]):
            return random.choice(COMPLAINT_TYPE_TEMPLATES["price"])
        if any(k in keywords_str for k in ["בוטים", "מזויף", "פייק"]):
            return random.choice(COMPLAINT_TYPE_TEMPLATES["bots"])
        if any(k in keywords_str for k in ["חלופה", "מחפש", "המלצה"]):
            return random.choice(COMPLAINT_TYPE_TEMPLATES["alternative"])

    # fallback לפי פלטפורמה
    if platform == "instagram":
        return random.choice(FALLBACK_DMS_IG)
    return random.choice(FALLBACK_DMS_TG)
