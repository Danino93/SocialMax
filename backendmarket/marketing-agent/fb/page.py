"""
Post content to our Facebook Business Page via Graph API.
No browser needed — pure HTTP requests with Page Access Token.
"""
import logging
import os
import requests
from .config import (
    GRAPH_API_BASE, FB_PAGE_ACCESS_TOKEN, FB_PAGE_ID, VIDEO_PATH,
)
from .database import log_page_post, get_page_posts_today, increment_stat
from .messages import get_page_post_template

logger = logging.getLogger(__name__)


# ─── Graph API helpers ────────────────────────────────────────────────────────

def _graph_post(endpoint: str, data: dict, files: dict | None = None) -> dict:
    """Make a POST request to the Graph API."""
    url = f"{GRAPH_API_BASE}/{endpoint}"
    data["access_token"] = FB_PAGE_ACCESS_TOKEN
    try:
        if files:
            resp = requests.post(url, data=data, files=files, timeout=120)
        else:
            resp = requests.post(url, data=data, timeout=30)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException as e:
        logger.error("Graph API error on %s: %s", endpoint, e)
        return {}


# ─── Text post ────────────────────────────────────────────────────────────────

def post_text_to_page(caption: str) -> str | None:
    """
    Post a text message to our Facebook Page.
    Returns fb_post_id on success, None on failure.
    """
    result = _graph_post(f"{FB_PAGE_ID}/feed", {"message": caption})
    return result.get("id")


# ─── Video post ───────────────────────────────────────────────────────────────

def post_video_to_page(video_path: str, caption: str) -> str | None:
    """
    Upload a video to our Facebook Page.
    Returns fb_post_id on success, None on failure.
    """
    if not os.path.exists(video_path):
        logger.error("Video not found: %s", video_path)
        return None
    try:
        with open(video_path, "rb") as f:
            result = _graph_post(
                f"{FB_PAGE_ID}/videos",
                data={"description": caption, "title": "SocialSniper"},
                files={"source": (os.path.basename(video_path), f, "video/mp4")},
            )
        return result.get("id")
    except Exception as e:
        logger.error("Error uploading video to page: %s", e)
        return None


# ─── Daily post ───────────────────────────────────────────────────────────────

def post_daily_to_page(last_template_id: int = -1) -> bool:
    """
    Post once per day to our Facebook Page.
    Tries video first (if file exists), falls back to text post.
    Returns True on success.
    """
    if not FB_PAGE_ACCESS_TOKEN or not FB_PAGE_ID:
        logger.warning("FB_PAGE_ACCESS_TOKEN or FB_PAGE_ID not set — skipping page post.")
        return False

    if get_page_posts_today() >= 1:
        logger.info("Already posted to Facebook Page today — skipping.")
        return False

    template_id, caption = get_page_post_template(last_template_id)

    # Try video post first
    post_id = None
    post_type = "text"

    if os.path.exists(VIDEO_PATH):
        logger.info("Posting video to Facebook Page...")
        post_id = post_video_to_page(VIDEO_PATH, caption)
        if post_id:
            post_type = "video"

    # Fallback: text post
    if not post_id:
        logger.info("Posting text to Facebook Page...")
        post_id = post_text_to_page(caption)
        post_type = "text"

    if post_id:
        log_page_post(post_type, template_id, "sent", post_id)
        increment_stat("page_posts")
        logger.info("Posted to Facebook Page (type=%s, id=%s, template=#%d)",
                    post_type, post_id, template_id)
        return True
    else:
        log_page_post(post_type, template_id, "failed", "")
        logger.error("Failed to post to Facebook Page")
        return False
