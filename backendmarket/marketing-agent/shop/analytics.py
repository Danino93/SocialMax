"""
shop/analytics.py — ASCII 7-day performance dashboard
=======================================================
מייצר דוח טקסטואלי עם גרף עמודות ASCII לכל 4 ה-Agents.
נשלח על-ידי /analytics [days] מ-shop/main.py.

פשוט מחבר ישירות לכל DB ומושך 7 (או N) ימים אחורה.
"""
import sqlite3
import logging
from datetime import date, timedelta

logger = logging.getLogger(__name__)

# ─── DB paths ──────────────────────────────────────────────────────────────────
try:
    from tg.config import DB_PATH as TG_DB
except Exception:
    TG_DB = ""

try:
    from ig.config import IG_DB_PATH as IG_DB
except Exception:
    IG_DB = ""

try:
    from fb.config import FB_DB_PATH as FB_DB
except Exception:
    FB_DB = ""

try:
    from tt.config import TT_DB_PATH as TT_DB
except Exception:
    TT_DB = ""


# ─── Helpers ───────────────────────────────────────────────────────────────────

def _query_range(db_path: str, days: int) -> dict:
    """
    מחזיר {date_str: row_dict} עבור last N ימים מטבלת daily_stats.
    מחזיר {} אם ה-DB לא קיים או לא נגיש עדיין.
    """
    if not db_path:
        return {}
    try:
        start = str(date.today() - timedelta(days=days - 1))
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            "SELECT * FROM daily_stats WHERE date >= ? ORDER BY date ASC",
            (start,),
        ).fetchall()
        conn.close()
        return {r["date"]: dict(r) for r in rows}
    except Exception as e:
        logger.debug("analytics query failed for %s: %s", db_path, e)
        return {}


def _bar(value: int, max_val: int, width: int = 10) -> str:
    """מחזיר גרף עמודות Unicode כמו '████░░░░░░'."""
    if max_val <= 0:
        return "░" * width
    filled = min(round(value / max_val * width), width)
    return "█" * filled + "░" * (width - filled)


def _section(emoji: str, title: str, rows_by_date: dict, field: str,
             days: int, label: str) -> str:
    """
    בונה סקשן אחד עם גרף עמודות + שורת סיכום.
    rows_by_date: {date_str: {field: value, ...}}
    """
    # Generate date range
    today = date.today()
    dates = [(today - timedelta(days=days - 1 - i)) for i in range(days)]

    values = [rows_by_date.get(str(d), {}).get(field, 0) for d in dates]
    max_val = max(values) if values else 0
    total   = sum(values)
    avg     = total / days if days > 0 else 0

    lines = [f"\n{emoji} <b>{title}</b> ({label})"]

    if max_val == 0:
        lines.append("<i>אין נתונים עדיין</i>")
    else:
        for d, v in zip(dates, values):
            bar  = _bar(v, max_val)
            date_str = d.strftime("%d/%m")
            lines.append(f"<code>{date_str}  {bar}  {v}</code>")
        lines.append(
            f"<i>סה״כ {total} | avg {avg:.1f}/יום | max {max_val}</i>"
        )

    return "\n".join(lines)


# ─── Main report ───────────────────────────────────────────────────────────────

def generate_analytics_report(days: int = 7) -> str:
    """
    מייצר דוח ASCII מלא עבור כל 4 ה-Agents.

    Args:
        days: כמה ימים אחורה (ברירת מחדל: 7, מקסימום: 30)
    Returns:
        str — טקסט HTML מוכן לשליחה ב-Telegram (ParseMode.HTML)
    """
    days = max(1, min(days, 30))

    tg_rows = _query_range(TG_DB, days)
    ig_rows = _query_range(IG_DB, days)
    fb_rows = _query_range(FB_DB, days)
    tt_rows = _query_range(TT_DB, days)

    header = f"📊 <b>SocialSniper — {days} ימים אחורה</b>"

    tg_section = _section("📱", "Telegram",  tg_rows, "posts_sent",       days, "פוסטים")
    ig_section = _section("📸", "Instagram", ig_rows, "dms_sent",         days, "DMs")
    fb_section = _section("📘", "Facebook",  fb_rows, "group_posts_sent", days, "פוסטים")
    tt_section = _section("🎵", "TikTok",    tt_rows, "comments_sent",    days, "תגובות")

    footer = "\n\n<i>לפירוט: /astats · /igstats · /fbstats · /ttstats</i>"

    return header + tg_section + ig_section + fb_section + tt_section + footer
