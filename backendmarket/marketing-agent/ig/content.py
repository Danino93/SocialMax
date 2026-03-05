"""
Post content (Reels / images) to our own Instagram Business account.

Strategy:
  Primary  → Instagrapi clip_upload() — works without Graph API setup
  Optional → Instagram Graph API  — used only if IG_ACCESS_TOKEN is configured
"""
import logging
import os
import time
import requests
from instagrapi import Client
from instagrapi.exceptions import ClientError, FeedbackRequired, LoginRequired

from .config import (
    VIDEO_PATH,
    IG_ACCESS_TOKEN, IG_BUSINESS_ACCOUNT_ID,
)
from .database import log_ig_post, get_posts_today, increment_stat
from .messages import get_caption_template

logger = logging.getLogger(__name__)

GRAPH_API_BASE = "https://graph.facebook.com/v18.0"


# ─── Instagrapi (primary) ─────────────────────────────────────────────────────

def _post_reel_instagrapi(cl: Client, caption: str) -> str | None:
    """
    Upload grok-video.mp4 as a Reel using Instagrapi.
    Returns media_id on success, None on failure.
    """
    if not os.path.exists(VIDEO_PATH):
        logger.error("Video not found at %s", VIDEO_PATH)
        return None
    try:
        logger.info("Uploading Reel via Instagrapi...")
        media = cl.clip_upload(VIDEO_PATH, caption)
        logger.info("Reel uploaded via Instagrapi — media_id: %s", media.id)
        return str(media.id)
    except FeedbackRequired as e:
        logger.warning("FeedbackRequired during Reel upload: %s", e)
    except LoginRequired:
        logger.error("LoginRequired — re-login needed before posting")
    except ClientError as e:
        logger.error("ClientError posting Reel via Instagrapi: %s", e)
    except Exception as e:
        logger.error("Unexpected error posting Reel via Instagrapi: %s", e)
    return None


# ─── Graph API (optional / fallback) ─────────────────────────────────────────

def _post_reel_graph_api(caption: str) -> str | None:
    """
    Upload a Reel via Instagram Graph API (requires IG_ACCESS_TOKEN + IG_BUSINESS_ACCOUNT_ID).
    Uses Resumable Upload to handle the video file.
    Returns media_id on success, None on failure.
    """
    if not IG_ACCESS_TOKEN or not IG_BUSINESS_ACCOUNT_ID:
        return None
    if not os.path.exists(VIDEO_PATH):
        logger.error("Video not found at %s", VIDEO_PATH)
        return None

    file_size = os.path.getsize(VIDEO_PATH)
    token = IG_ACCESS_TOKEN
    account_id = IG_BUSINESS_ACCOUNT_ID

    try:
        # Step 1: Initialize resumable upload session
        logger.info("Initializing Graph API resumable upload...")
        init_resp = requests.post(
            f"https://rupload.facebook.com/video-upload/v18.0/{account_id}/videos",
            headers={
                "Authorization": f"OAuth {token}",
                "X-FB-Video-Size": str(file_size),
            },
            json={"file_size": file_size, "start_offset": 0},
            timeout=30,
        )
        init_resp.raise_for_status()
        upload_session_id = init_resp.json().get("video_id")
        upload_url = init_resp.json().get("start_offset")  # Actually full URL returned

        if not upload_session_id:
            logger.error("Graph API: no video_id in upload init response")
            return None

        # Step 2: Upload video binary
        logger.info("Uploading video binary to Graph API...")
        with open(VIDEO_PATH, "rb") as f:
            upload_resp = requests.post(
                f"https://rupload.facebook.com/video-upload/v18.0/{account_id}/videos",
                headers={
                    "Authorization": f"OAuth {token}",
                    "Content-Type": "application/octet-stream",
                    "X-Entity-Name": "grok-video.mp4",
                    "X-Entity-Length": str(file_size),
                    "X-Entity-Type": "video/mp4",
                    "Offset": "0",
                },
                data=f,
                timeout=120,
            )
        upload_resp.raise_for_status()

        # Step 3: Create media container
        logger.info("Creating Reels container via Graph API...")
        container_resp = requests.post(
            f"{GRAPH_API_BASE}/{account_id}/media",
            params={
                "media_type": "REELS",
                "video_id": upload_session_id,
                "caption": caption,
                "share_to_feed": "true",
                "access_token": token,
            },
            timeout=30,
        )
        container_resp.raise_for_status()
        creation_id = container_resp.json().get("id")

        if not creation_id:
            logger.error("Graph API: no creation_id in container response")
            return None

        # Wait for processing
        logger.info("Waiting 15s for video processing...")
        time.sleep(15)

        # Step 4: Publish
        logger.info("Publishing Reel via Graph API...")
        publish_resp = requests.post(
            f"{GRAPH_API_BASE}/{account_id}/media_publish",
            params={"creation_id": creation_id, "access_token": token},
            timeout=30,
        )
        publish_resp.raise_for_status()
        media_id = publish_resp.json().get("id")
        logger.info("Reel published via Graph API — media_id: %s", media_id)
        return str(media_id) if media_id else None

    except requests.RequestException as e:
        logger.error("Graph API request failed: %s", e)
    except Exception as e:
        logger.error("Unexpected error in Graph API post: %s", e)
    return None


# ─── Public interface ─────────────────────────────────────────────────────────

def post_daily_reel(cl: Client, last_caption_id: int = -1) -> bool:
    """
    Post one Reel to our account.
    Tries Graph API first (if configured), falls back to Instagrapi.
    Returns True on success.
    """
    if get_posts_today() >= 1:
        logger.info("Already posted today — skipping Reel.")
        return False

    caption_id, caption = get_caption_template(last_caption_id)

    # Try Graph API first (official, preferred for Business accounts)
    media_id = None
    method = "graph_api"
    if IG_ACCESS_TOKEN and IG_BUSINESS_ACCOUNT_ID:
        media_id = _post_reel_graph_api(caption)

    # Fallback to Instagrapi
    if not media_id:
        method = "instagrapi"
        media_id = _post_reel_instagrapi(cl, caption)

    if media_id:
        log_ig_post("REELS", caption_id, "sent", media_id)
        increment_stat("posts_published")
        logger.info("Daily Reel posted via %s (caption #%d)", method, caption_id)
        return True
    else:
        log_ig_post("REELS", caption_id, "failed", "")
        logger.error("Failed to post daily Reel (tried both methods)")
        return False
