"""
ig/graph_api.py — Instagram Graph API: Insights & Analytics
------------------------------------------------------------
מציג נתוני ביצועים על העמוד העסקי שלנו.
דורש: IG_ACCESS_TOKEN + IG_BUSINESS_ACCOUNT_ID ב-.env

Endpoints בשימוש:
  GET /{account_id}/insights        — נתוני חשבון (reach, impressions, profile_views)
  GET /{account_id}?fields=...      — follower_count, media_count
  GET /{account_id}/media           — רשימת פוסטים אחרונים
  GET /{media_id}/insights          — ביצועים של פוסט ספציפי
"""
import logging
import requests

from .config import IG_ACCESS_TOKEN, IG_BUSINESS_ACCOUNT_ID

logger = logging.getLogger(__name__)

GRAPH_BASE = "https://graph.facebook.com/v18.0"


def _get(endpoint: str, params: dict) -> dict | None:
    """GET request עם token — מחזיר JSON או None בשגיאה."""
    params["access_token"] = IG_ACCESS_TOKEN
    try:
        resp = requests.get(f"{GRAPH_BASE}{endpoint}", params=params, timeout=15)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException as e:
        logger.error("Graph API GET %s failed: %s", endpoint, e)
        return None


# ─── Account info ─────────────────────────────────────────────────────────────

def get_account_info() -> dict | None:
    """
    מחזיר: followers_count, media_count, name, biography.
    """
    if not IG_ACCESS_TOKEN or not IG_BUSINESS_ACCOUNT_ID:
        return None
    data = _get(
        f"/{IG_BUSINESS_ACCOUNT_ID}",
        {"fields": "followers_count,media_count,name,biography"},
    )
    return data


# ─── Account insights ─────────────────────────────────────────────────────────

def get_account_insights(period: str = "day") -> dict | None:
    """
    מחזיר נתוני reach, impressions, profile_views ל-28 יום אחרונים.
    period: "day" | "week" | "days_28"
    """
    if not IG_ACCESS_TOKEN or not IG_BUSINESS_ACCOUNT_ID:
        return None

    metrics = ["reach", "impressions", "profile_views"]
    data = _get(
        f"/{IG_BUSINESS_ACCOUNT_ID}/insights",
        {
            "metric": ",".join(metrics),
            "period": period,
        },
    )
    if not data or "data" not in data:
        return None

    # מפשט לdict: {metric_name: value}
    result = {}
    for item in data["data"]:
        name = item.get("name")
        values = item.get("values", [])
        if values:
            # סה"כ לתקופה
            total = sum(v.get("value", 0) for v in values)
            result[name] = total
    return result


# ─── Recent posts ─────────────────────────────────────────────────────────────

def get_recent_posts(limit: int = 5) -> list[dict] | None:
    """
    מחזיר N פוסטים אחרונים עם: id, media_type, timestamp, like_count, comments_count.
    """
    if not IG_ACCESS_TOKEN or not IG_BUSINESS_ACCOUNT_ID:
        return None

    data = _get(
        f"/{IG_BUSINESS_ACCOUNT_ID}/media",
        {
            "fields": "id,media_type,timestamp,like_count,comments_count,caption",
            "limit": limit,
        },
    )
    if not data:
        return None
    return data.get("data", [])


def get_post_insights(media_id: str) -> dict | None:
    """
    מחזיר insights לפוסט ספציפי: reach, impressions, engagement, saved.
    """
    if not IG_ACCESS_TOKEN:
        return None

    data = _get(
        f"/{media_id}/insights",
        {"metric": "reach,impressions,engagement,saved"},
    )
    if not data or "data" not in data:
        return None

    result = {}
    for item in data["data"]:
        result[item["name"]] = item.get("values", [{}])[0].get("value", 0)
    return result


# ─── Summary builder (for Telegram message) ───────────────────────────────────

def build_insights_message() -> str:
    """
    בונה הודעת טלגרם מסכמת עם כל נתוני ה-Analytics.
    מחזיר string מוכן לשליחה.
    """
    if not IG_ACCESS_TOKEN or not IG_BUSINESS_ACCOUNT_ID:
        return (
            "⚠️ <b>Instagram Graph API לא מוגדר</b>\n\n"
            "הוסף ב-.env:\n"
            "<code>IG_ACCESS_TOKEN=...</code>\n"
            "<code>IG_BUSINESS_ACCOUNT_ID=...</code>\n\n"
            "קבל מ: developers.facebook.com → Graph API Explorer"
        )

    lines = ["📊 <b>Instagram Business — Analytics</b>\n"]

    # Account info
    info = get_account_info()
    if info:
        lines.append(
            f"👤 <b>{info.get('name', 'N/A')}</b>\n"
            f"👥 עוקבים: <b>{info.get('followers_count', '?'):,}</b>\n"
            f"📸 פוסטים: <b>{info.get('media_count', '?')}</b>\n"
        )

    # Insights (28 days)
    insights = get_account_insights(period="days_28")
    if insights:
        lines.append(
            "📅 <b>28 יום אחרונים:</b>\n"
            f"  👁 Reach:         <b>{insights.get('reach', 0):,}</b>\n"
            f"  📣 Impressions:   <b>{insights.get('impressions', 0):,}</b>\n"
            f"  🔍 Profile Views: <b>{insights.get('profile_views', 0):,}</b>\n"
        )

    # Recent posts
    posts = get_recent_posts(limit=3)
    if posts:
        lines.append("🖼 <b>3 פוסטים אחרונים:</b>")
        for i, post in enumerate(posts, 1):
            caption = (post.get("caption") or "")[:40]
            if len(post.get("caption") or "") > 40:
                caption += "..."
            lines.append(
                f"\n  {i}. {post.get('media_type', '')} | "
                f"❤️ {post.get('like_count', 0)} | "
                f"💬 {post.get('comments_count', 0)}\n"
                f"     {caption}"
            )

    if len(lines) == 1:
        lines.append("⚠️ לא ניתן לטעון נתונים — בדוק את ה-Access Token.")

    return "\n".join(lines)
