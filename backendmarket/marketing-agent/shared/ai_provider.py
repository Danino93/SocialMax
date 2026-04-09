"""
Shared AI provider with deterministic fallback order:
1) Ollama
2) Gemini
3) empty string (caller uses local static template fallback)
"""
import asyncio
import logging
import os
import threading
import time

import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434").rstrip("/")
OLLAMA_SECRET: str = os.getenv("OLLAMA_SECRET", "")
OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

AI_PRIORITY_RAW: str = os.getenv("AI_PRIORITY", "ollama,gemini")
AI_PROVIDER_VERBOSE_ERRORS: bool = os.getenv("AI_PROVIDER_VERBOSE_ERRORS", "true").lower() == "true"
OLLAMA_RETRY_COOLDOWN_SEC: int = int(os.getenv("OLLAMA_RETRY_COOLDOWN_SEC", "300"))
OLLAMA_TIMEOUT: int = int(os.getenv("OLLAMA_TIMEOUT", "20"))
GEMINI_TIMEOUT: int = int(os.getenv("GEMINI_TIMEOUT", "15"))

SYSTEM_PROMPT = (
    "אתה עוזר שיווקי של SocialSniper, עסק ישראלי לשיווק ברשתות חברתיות.\n"
    "חוקים:\n"
    "1. תמיד כתוב בעברית\n"
    "2. מקסימום 3 שורות\n"
    "3. טון אנושי, ישיר, לא רובוטי\n"
    "4. אסור: קריאות יתר, הבטחות מוגזמות, מילים כמו 'מדהים!!'\n"
    "5. אסור: לינקים חיצוניים (מלבד @socialsniper93_bot)\n"
    "6. תן תשובה ישירה בלבד, ללא הקדמות\n"
)


class AIProvider:
    """Generate marketing text with provider fallback order."""

    def __init__(self) -> None:
        self._ollama_backoff_until = 0.0
        self._priority = self._parse_priority(AI_PRIORITY_RAW)

    @staticmethod
    def _parse_priority(raw: str) -> list[str]:
        allowed = {"ollama", "gemini"}
        parts = [p.strip().lower() for p in raw.split(",") if p.strip()]
        parsed = [p for p in parts if p in allowed]
        return parsed or ["ollama", "gemini"]

    @staticmethod
    def _err_text(err: Exception) -> str:
        if AI_PROVIDER_VERBOSE_ERRORS:
            return str(err)
        return err.__class__.__name__

    async def generate(self, prompt: str, scenario: str = "general") -> str:
        for provider in self._priority:
            if provider == "ollama":
                now = time.time()
                if now < self._ollama_backoff_until:
                    logger.info(
                        "[AI:%s] Ollama skipped (cooldown %ds left)",
                        scenario,
                        int(self._ollama_backoff_until - now),
                    )
                    continue
                try:
                    result = await self._call_ollama(prompt)
                    if result:
                        logger.debug("[AI:%s] Ollama OK (%d chars)", scenario, len(result))
                        return result
                except Exception as e:
                    self._ollama_backoff_until = time.time() + max(30, OLLAMA_RETRY_COOLDOWN_SEC)
                    logger.info("[AI:%s] Ollama failed: %s", scenario, self._err_text(e))
                continue

            if provider == "gemini":
                try:
                    result = await self._call_gemini(prompt)
                    if result:
                        logger.debug("[AI:%s] Gemini OK (%d chars)", scenario, len(result))
                        return result
                except Exception as e:
                    logger.info("[AI:%s] Gemini failed: %s", scenario, self._err_text(e))
                continue

        logger.info("[AI:%s] All AI layers failed - using template fallback", scenario)
        return ""

    async def _call_ollama(self, prompt: str) -> str:
        headers = {}
        if OLLAMA_SECRET:
            headers["X-Internal-Token"] = OLLAMA_SECRET

        payload = {
            "model": OLLAMA_MODEL,
            "prompt": f"{SYSTEM_PROMPT}\n\n{prompt}",
            "stream": False,
            "options": {
                "temperature": 0.85,
                "num_predict": 120,
            },
        }

        def _sync_request() -> str:
            resp = requests.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json=payload,
                headers=headers,
                timeout=OLLAMA_TIMEOUT,
            )
            resp.raise_for_status()
            return resp.json().get("response", "").strip()

        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, _sync_request)

    async def _call_gemini(self, prompt: str) -> str:
        if not GEMINI_API_KEY:
            logger.info("[AI] GEMINI_API_KEY is missing, skipping Gemini.")
            return ""

        def _sync_request() -> str:
            import google.generativeai as genai

            genai.configure(api_key=GEMINI_API_KEY)
            model = genai.GenerativeModel(
                "gemini-1.5-flash",
                system_instruction=SYSTEM_PROMPT,
            )
            resp = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.85,
                    max_output_tokens=120,
                ),
            )
            text = getattr(resp, "text", "") or ""
            return text.strip()

        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, _sync_request)


_ai_instance = AIProvider()
_loop_lock = threading.Lock()
_thread_loop: asyncio.AbstractEventLoop | None = None


def _get_or_create_loop() -> asyncio.AbstractEventLoop:
    global _thread_loop
    try:
        return asyncio.get_running_loop()
    except RuntimeError:
        pass

    with _loop_lock:
        if _thread_loop is None or _thread_loop.is_closed():
            def _run_loop(loop: asyncio.AbstractEventLoop) -> None:
                asyncio.set_event_loop(loop)
                loop.run_forever()

            new_loop = asyncio.new_event_loop()
            t = threading.Thread(target=_run_loop, args=(new_loop,), daemon=True)
            t.start()
            _thread_loop = new_loop

    return _thread_loop


def ai_generate_sync(prompt: str, scenario: str = "general") -> str:
    try:
        loop = _get_or_create_loop()
        try:
            running_loop = asyncio.get_running_loop()
            if running_loop is loop:
                logger.debug("[AI:%s] sync called from async context - using fallback", scenario)
                return ""
        except RuntimeError:
            pass

        future = asyncio.run_coroutine_threadsafe(_ai_instance.generate(prompt, scenario), loop)
        result = future.result(timeout=OLLAMA_TIMEOUT + GEMINI_TIMEOUT + 5)
        return result or ""
    except Exception as e:
        logger.error("[AI:%s] ai_generate_sync error: %s", scenario, e)
        return ""
