"""
shop_data.py — Services & Platforms data for SocialSniper Customer Bot
Mirrors frontend/src/data/services.ts
Prices in ILS per 1000 units (pricePerK)
"""

OWNER_USERNAME = "socialsniper93"

BADGE_EMOJIS = {
    "popular":  "⭐",
    "non-drop": "🛡️",
    "refill":   "🔄",
    "fast":     "⚡",
    "premium":  "💎",
}

PLATFORMS = [
    {"id": "instagram", "label": "Instagram",       "emoji": "📸"},
    {"id": "tiktok",    "label": "TikTok",           "emoji": "🎵"},
    {"id": "youtube",   "label": "YouTube",          "emoji": "▶️"},
    {"id": "facebook",  "label": "Facebook",         "emoji": "👥"},
    {"id": "telegram",  "label": "Telegram",         "emoji": "✈️"},
    {"id": "whatsapp",  "label": "WhatsApp",         "emoji": "💬"},
    {"id": "twitter",   "label": "X / Twitter",      "emoji": "🐦"},
    {"id": "discord",   "label": "Discord",          "emoji": "🎮"},
    {"id": "spotify",   "label": "Spotify",          "emoji": "🎶"},
    {"id": "google",    "label": "Google Business",  "emoji": "📍"},
]

SERVICES: dict[str, list[dict]] = {
    "instagram": [
        {"name": "עוקבים — בסיסי",             "price": 1.90,   "min": 100,   "time": "1-6 שעות",    "badges": ["fast", "popular"]},
        {"name": "עוקבים + Refill 30 יום",     "price": 7.40,   "min": 50,    "time": "1-12 שעות",   "badges": ["refill", "popular"]},
        {"name": "עוקבים Non-Drop",            "price": 9.90,   "min": 50,    "time": "6-24 שעות",   "badges": ["non-drop", "premium"]},
        {"name": "לייקים לפוסטים",             "price": 1.10,   "min": 50,    "time": "1-3 שעות",    "badges": ["fast", "popular"]},
        {"name": "צפיות ריילס / פוסטים",       "price": 0.02,   "min": 1000,  "time": "30 דקות",     "badges": ["fast"]},
        {"name": "צפיות סטוריז",               "price": 0.07,   "min": 100,   "time": "1-6 שעות",    "badges": ["fast"]},
    ],
    "facebook": [
        {"name": "עוקבים לדף",                 "price": 2.00,   "min": 100,   "time": "6-24 שעות",   "badges": ["popular"]},
        {"name": "לייקים לדף",                 "price": 0.90,   "min": 100,   "time": "6-48 שעות",   "badges": ["popular"]},
        {"name": "לייקים לפוסטים",             "price": 0.90,   "min": 50,    "time": "1-6 שעות",    "badges": ["fast"]},
        {"name": "צפיות וידאו",                "price": 0.75,   "min": 500,   "time": "30 דקות",     "badges": ["fast"]},
    ],
    "tiktok": [
        {"name": "עוקבים",                     "price": 0.90,   "min": 100,   "time": "6-24 שעות",   "badges": ["popular"]},
        {"name": "לייקים לסרטונים",            "price": 1.10,   "min": 100,   "time": "1-6 שעות",    "badges": ["fast"]},
        {"name": "צפיות",                      "price": 0.003,  "min": 5000,  "time": "30 דקות",     "badges": ["fast", "popular"]},
        {"name": "תגובות",                     "price": 18.00,  "min": 10,    "time": "6-24 שעות",   "badges": []},
    ],
    "youtube": [
        {"name": "מנויים לערוץ",               "price": 1.30,   "min": 50,    "time": "6-48 שעות",   "badges": ["popular"]},
        {"name": "צפיות לסרטונים",             "price": 4.40,   "min": 500,   "time": "1-6 שעות",    "badges": ["popular"]},
        {"name": "לייקים לסרטונים",            "price": 0.78,   "min": 50,    "time": "1-6 שעות",    "badges": ["fast"]},
        {"name": "שעות צפייה (מוניטיזציה)",    "price": 170.00, "min": 100,   "time": "3-14 ימים",   "badges": ["premium"]},
    ],
    "telegram": [
        {"name": "מנויים לערוץ / קבוצה",       "price": 4.50,   "min": 50,    "time": "1-24 שעות",   "badges": ["non-drop", "popular"]},
        {"name": "צפיות לפוסטים",              "price": 0.08,   "min": 100,   "time": "30 דקות",     "badges": ["fast"]},
        {"name": "ריאקשנים לפוסטים",           "price": 0.75,   "min": 20,    "time": "1-6 שעות",    "badges": ["fast"]},
        {"name": "צפיות סטוריז",               "price": 0.90,   "min": 100,   "time": "1-6 שעות",    "badges": []},
    ],
    "whatsapp": [
        {"name": "חברים לקבוצה",               "price": 12.00,  "min": 50,    "time": "6-24 שעות",   "badges": []},
        {"name": "צפיות סטטוס",                "price": 3.00,   "min": 100,   "time": "1-6 שעות",    "badges": ["fast"]},
    ],
    "twitter": [
        {"name": "עוקבים",                     "price": 48.00,  "min": 100,   "time": "24-72 שעות",  "badges": []},
        {"name": "לייקים לציוצים",             "price": 5.50,   "min": 100,   "time": "1-6 שעות",    "badges": ["fast"]},
        {"name": "צפיות לציוצים",              "price": 1.10,   "min": 500,   "time": "1-3 שעות",    "badges": ["fast"]},
    ],
    "discord": [
        {"name": "חברים לשרת",                 "price": 7.00,   "min": 100,   "time": "6-24 שעות",   "badges": []},
        {"name": "חברים Online",               "price": 18.00,  "min": 50,    "time": "1-6 שעות",    "badges": ["premium"]},
    ],
    "spotify": [
        {"name": "נגינות לשירים",              "price": 3.70,   "min": 1000,  "time": "1-24 שעות",   "badges": ["popular"]},
        {"name": "עוקבים לאמן",                "price": 9.25,   "min": 100,   "time": "6-48 שעות",   "badges": []},
        {"name": "מאזינים חודשיים",            "price": 8.00,   "min": 100,   "time": "6-72 שעות",   "badges": []},
    ],
    "google": [
        {"name": "ביקורות 5 כוכבים",           "price": 950.00, "min": 1,     "time": "1-3 ימים",    "badges": ["premium"]},
        {"name": "צפיות במפות Google",         "price": 5.50,   "min": 100,   "time": "1-7 ימים",    "badges": []},
    ],
}


def build_platform_services_msg(platform_id: str) -> str:
    """Build HTML message listing all services for a platform (no prices — quoted privately)."""
    platform = next((p for p in PLATFORMS if p["id"] == platform_id), None)
    if not platform:
        return "פלטפורמה לא נמצאה."

    svcs = SERVICES.get(platform_id, [])
    emoji = platform["emoji"]
    label = platform["label"]

    lines = [f"🔥 <b>{emoji} {label}</b> — הנה מה שיש לנו:\n"]

    for svc in svcs:
        badges = "".join(BADGE_EMOJIS[b] for b in svc["badges"] if b in BADGE_EMOJIS)
        lines.append(
            f"{'  ' if not badges else ''}{badges} <b>{svc['name']}</b>\n"
            f"   ⏱ {svc['time']}  ·  מינ׳ {svc['min']:,} יחידות"
        )

    lines.append(f"\n━━━━━━━━━━━━━━━━━━━━━")
    lines.append(f"💰 <b>מחיר?</b> <i>שאל אותנו בפרטי — נסגור עסקה 🤝</i>")
    return "\n".join(lines)
