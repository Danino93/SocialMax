#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# start.sh — SocialSniper Marketing Agent — הפעלת כל ה-Agents בפקודה אחת
#
# שימוש:
#   chmod +x start.sh
#   ./start.sh
#
# עוצר את הכל עם Ctrl+C
# ─────────────────────────────────────────────────────────────────────────────

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "╔══════════════════════════════════════════════╗"
echo "║         SocialSniper — Starting All          ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── בדיקת .env ────────────────────────────────────────────────────────────────
if [ ! -f ".env" ]; then
    echo "❌  קובץ .env לא נמצא!"
    echo "    צור קובץ .env עם BOT_TOKEN, ADMIN_ID ויתר ההגדרות."
    exit 1
fi

# ── Python ────────────────────────────────────────────────────────────────────
PYTHON="${PYTHON:-python3}"
if ! command -v "$PYTHON" &>/dev/null; then
    PYTHON="python"
fi

echo "🐍  Python: $($PYTHON --version)"
echo ""

# ── לוגים ─────────────────────────────────────────────────────────────────────
mkdir -p logs

# ── הפעלת כל תהליך ברקע ────────────────────────────────────────────────────
echo "🚀  מפעיל Telegram Agent    (tg_main.py)..."
"$PYTHON" -m tg.main >> logs/tg_agent.log 2>&1 &
PID_TG=$!

echo "📸  מפעיל Instagram Agent   (ig_main.py)..."
"$PYTHON" -m ig.main >> logs/ig_agent.log 2>&1 &
PID_IG=$!

echo "👥  מפעיל Facebook Agent    (fb_main.py)..."
"$PYTHON" -m fb.main >> logs/fb_agent.log 2>&1 &
PID_FB=$!

echo "🎵  מפעיל TikTok Agent      (tt_main.py)..."
"$PYTHON" -m tt.main >> logs/tt_agent.log 2>&1 &
PID_TT=$!

echo "✈️   מפעיל Shop & Admin Bot  (shop_main.py)..."
"$PYTHON" -m shop.main >> logs/bot.log 2>&1 &
PID_BOT=$!

echo ""
echo "✅  כל ה-Agents פועלים!"
echo ""
echo "   PID  Telegram  : $PID_TG"
echo "   PID  Instagram : $PID_IG"
echo "   PID  Facebook  : $PID_FB"
echo "   PID  TikTok    : $PID_TT"
echo "   PID  Bot       : $PID_BOT"
echo ""
echo "📋  לוגים: tail -f logs/bot.log"
echo "🛑  לעצירה: Ctrl+C"
echo ""

# ── עצירה נקייה של כל התהליכים ───────────────────────────────────────────────
cleanup() {
    echo ""
    echo "🛑  עוצר את כל ה-Agents..."
    kill $PID_TG  2>/dev/null || true
    kill $PID_IG  2>/dev/null || true
    kill $PID_FB  2>/dev/null || true
    kill $PID_TT  2>/dev/null || true
    kill $PID_BOT 2>/dev/null || true
    echo "👋  כל ה-Agents נעצרו."
    exit 0
}
trap cleanup SIGINT SIGTERM

# ── המתנה עד שאחד התהליכים ייכשל ──────────────────────────────────────────────
wait $PID_TG $PID_IG $PID_FB $PID_TT $PID_BOT
