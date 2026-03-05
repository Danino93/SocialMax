import React, { useRef, useState, useEffect } from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const SEGMENTS = [
  { label: '5%\nהנחה', color: '#7c3aed' },
  { label: '10%\nהנחה', color: '#2563eb' },
  { label: '15%\nהנחה', color: '#a855f7' },
  { label: '20%\nהנחה', color: '#6d28d9' },
  { label: 'שירות\nמתנה', color: '#10b981' },
  { label: '5%\nהנחה', color: '#3b82f6' },
];

const NUM = SEGMENTS.length;
const ANGLE = (2 * Math.PI) / NUM;

function drawWheel(ctx: CanvasRenderingContext2D, rotation: number, size: number) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
  ctx.clearRect(0, 0, size, size);

  for (let i = 0; i < NUM; i++) {
    const start = rotation + i * ANGLE - Math.PI / 2;
    const end = start + ANGLE;
    // Segment
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = SEGMENTS[i].color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + ANGLE / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size < 300 ? 13 : 15}px Heebo, sans-serif`;
    const lines = SEGMENTS[i].label.split('\n');
    lines.forEach((line, li) => {
      ctx.fillText(line, r - 20, (li - (lines.length - 1) / 2) * 18);
    });
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
  ctx.fillStyle = '#0a0a0f';
  ctx.fill();
  ctx.strokeStyle = 'rgba(168,85,247,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Pointer (top)
  ctx.beginPath();
  ctx.moveTo(cx, 2);
  ctx.lineTo(cx - 12, 22);
  ctx.lineTo(cx + 12, 22);
  ctx.closePath();
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
}

const SpinWheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);

  const CANVAS_SIZE = 340;

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [alreadySpun, setAlreadySpun] = useState(false);

  useEffect(() => {
    const prev = localStorage.getItem('ss_spin_result');
    if (prev) {
      setResult(prev);
      setAlreadySpun(true);
      setShowResult(true);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawWheel(ctx, rotRef.current, CANVAS_SIZE);
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const totalRotation = (5 + Math.random() * 5) * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000;
    const start = performance.now();
    const startRot = rotRef.current;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      rotRef.current = startRot + totalRotation * ease;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) drawWheel(ctx, rotRef.current, CANVAS_SIZE);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Determine which segment the pointer points to (top = -PI/2)
        const normalized = ((rotRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(((2 * Math.PI - normalized) / ANGLE + 0.5) % NUM);
        const seg = SEGMENTS[idx];
        const resultText = seg.label.replace('\n', ' ');
        setResult(resultText);
        localStorage.setItem('ss_spin_result', resultText);
        setSpinning(false);
        setTimeout(() => setShowResult(true), 400);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    localStorage.removeItem('ss_spin_result');
    setResult(null);
    setShowResult(false);
    setAlreadySpun(false);
    rotRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) drawWheel(ctx, 0, CANVAS_SIZE);
    }
  };

  const getCode = (res: string) => {
    if (res.includes('מתנה') || res.includes('חינם')) return 'SNIPERFREE';
    const match = res.match(/\d+/);
    return match ? `SNIPER${match[0]}` : 'SNIPER10';
  };

  return (
    <>
      <SEOHead
        title="גלגל המזל 🎰 | SocialSniper"
        description="סובב את גלגל המזל וקבל קוד הנחה בלעדי! 5%-20% הנחה על שירותי SMM. חד פעמי לכל לקוח."
        keywords="הנחה SocialSniper, קוד קופון, גלגל המזל, SMM הנחה"
        canonicalPath="/spin"
      />
      <Header />
      <main style={{ paddingTop: 120, paddingBottom: 80, minHeight: '100vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            🎰 גלגל המזל
          </span>
          <h1 className="section-title" style={{ marginBottom: 12 }}>
            סובב וגלה את{' '}
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ההנחה שלך!
            </span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom: 48 }}>
            כל לקוח מקבל הנחה בלעדית — חד פעמי בלבד!
          </p>

          {/* Wheel */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 32 }}>
            <div style={{
              borderRadius: '50%', padding: 6,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              boxShadow: '0 0 60px rgba(124,58,237,0.4)',
              display: 'inline-block',
            }}>
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{ borderRadius: '50%', display: 'block' }}
              />
            </div>
          </div>

          {!alreadySpun && !showResult && (
            <div>
              <button
                onClick={spin}
                disabled={spinning}
                style={{
                  padding: '16px 48px', borderRadius: 20, border: 'none', cursor: spinning ? 'not-allowed' : 'pointer',
                  background: spinning ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  color: 'white', fontSize: 18, fontWeight: 700, fontFamily: 'Heebo, sans-serif',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.4)', transition: 'all 0.2s',
                }}
              >
                {spinning ? '⏳ מסתובב...' : '🎰 סובב!'}
              </button>
              <p style={{ color: '#64748b', fontSize: 13, fontFamily: 'Heebo, sans-serif', marginTop: 12 }}>
                * כל לקוח זכאי לסיבוב אחד בלבד
              </p>
            </div>
          )}
        </div>

        {/* Result Modal */}
        {showResult && result && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
          }}>
            <div style={{
              background: '#13131f', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: '40px 36px', maxWidth: 420, width: '100%',
              textAlign: 'center', direction: 'rtl',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h2 style={{ color: 'white', fontSize: 28, fontWeight: 700, fontFamily: 'Heebo, sans-serif', marginBottom: 8 }}>
                זכית ב-{result}!
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 14, fontFamily: 'Heebo, sans-serif', marginBottom: 24 }}>
                שלח את קוד ההנחה בטלגרם בעת ההזמנה
              </p>

              <div style={{
                background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: 12, padding: '16px 24px', marginBottom: 24,
              }}>
                <div style={{ color: '#a855f7', fontSize: 30, fontWeight: 700, fontFamily: "'Courier New', monospace", letterSpacing: '0.1em', marginBottom: 6 }}>
                  {getCode(result)}
                </div>
                <div style={{ color: '#64748b', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>
                  * שלח קוד זה בטלגרם בעת ההזמנה
                </div>
              </div>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram"
                style={{ width: '100%', justifyContent: 'center', marginBottom: 16, display: 'flex' }}
              >
                ✈️ מממש הנחה בטלגרם
              </a>
              <p style={{ color: '#475569', fontSize: 12, fontFamily: 'Heebo, sans-serif', marginBottom: 16 }}>
                ההנחה תקפה ל-24 שעות מרגע הסיבוב
              </p>
              <button
                onClick={reset}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '8px 20px', cursor: 'pointer',
                  color: '#64748b', fontSize: 13, fontFamily: 'Heebo, sans-serif',
                }}
              >
                סובב שוב (יאפס תוצאה קודמת)
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SpinWheel;
