import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TELEGRAM_LINK } from '../../../components/Layout/Header';

const TYPING_WORDS = ['לייקים', 'עוקבים', 'צפיות', 'מנויים', 'שיתופים'];

// Pre-computed particles to avoid random on every render
const PARTICLES = [
  { id: 0,  l: 8,   t: 14,  s: 2, dur: 7,  del: 0   },
  { id: 1,  l: 22,  t: 38,  s: 1, dur: 9,  del: 1.2 },
  { id: 2,  l: 45,  t: 6,   s: 3, dur: 6,  del: 0.5 },
  { id: 3,  l: 67,  t: 72,  s: 2, dur: 8,  del: 2.1 },
  { id: 4,  l: 83,  t: 25,  s: 1, dur: 11, del: 0.8 },
  { id: 5,  l: 12,  t: 85,  s: 2, dur: 7,  del: 3.3 },
  { id: 6,  l: 55,  t: 52,  s: 1, dur: 9,  del: 1.7 },
  { id: 7,  l: 91,  t: 48,  s: 3, dur: 6,  del: 2.5 },
  { id: 8,  l: 33,  t: 91,  s: 1, dur: 10, del: 0.3 },
  { id: 9,  l: 76,  t: 8,   s: 2, dur: 8,  del: 4.1 },
  { id: 10, l: 18,  t: 60,  s: 1, dur: 12, del: 1.0 },
  { id: 11, l: 62,  t: 33,  s: 3, dur: 7,  del: 3.8 },
  { id: 12, l: 40,  t: 78,  s: 2, dur: 9,  del: 0.6 },
  { id: 13, l: 88,  t: 90,  s: 1, dur: 6,  del: 2.9 },
  { id: 14, l: 3,   t: 44,  s: 2, dur: 8,  del: 4.5 },
  { id: 15, l: 72,  t: 18,  s: 1, dur: 11, del: 1.4 },
  { id: 16, l: 27,  t: 55,  s: 3, dur: 7,  del: 3.0 },
  { id: 17, l: 95,  t: 35,  s: 1, dur: 9,  del: 0.9 },
  { id: 18, l: 50,  t: 95,  s: 2, dur: 8,  del: 2.2 },
  { id: 19, l: 15,  t: 22,  s: 1, dur: 6,  del: 4.7 },
  { id: 20, l: 79,  t: 65,  s: 2, dur: 10, del: 1.6 },
  { id: 21, l: 35,  t: 10,  s: 3, dur: 7,  del: 3.5 },
  { id: 22, l: 58,  t: 82,  s: 1, dur: 9,  del: 0.4 },
  { id: 23, l: 6,   t: 70,  s: 2, dur: 8,  del: 2.8 },
  { id: 24, l: 47,  t: 28,  s: 1, dur: 11, del: 1.1 },
];

const FLOATING_ICONS = [
  { icon: '📸', x: 7,  y: 22, delay: 0,   size: 36 },
  { icon: '👥', x: 88, y: 16, delay: 1.5, size: 32 },
  { icon: '🎵', x: 4,  y: 68, delay: 3.2, size: 28 },
  { icon: '▶️', x: 93, y: 62, delay: 2.1, size: 34 },
  { icon: '✈️', x: 51, y: 6,  delay: 4.0, size: 30 },
  { icon: '💬', x: 82, y: 85, delay: 0.8, size: 26 },
];

const HeroSection: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [liveOrders, setLiveOrders] = useState(12);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const word = TYPING_WORDS[wordIndex];
    let timer: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayed.length < word.length) {
        timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 130);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 65);
      } else {
        setIsDeleting(false);
        setWordIndex(i => (i + 1) % TYPING_WORDS.length);
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, wordIndex]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Live orders counter
  useEffect(() => {
    const interval = setInterval(() => setLiveOrders(c => c + 1), 14000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="כותרת ראשית"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '100px 24px 80px',
      }}
    >
      {/* ── Background Layer ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Orb 1 */}
        <div style={{
          position: 'absolute', width: 800, height: 800, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 60%)',
          top: -350, right: -250, animation: 'heroOrb 12s ease-in-out infinite',
        }} />
        {/* Orb 2 */}
        <div style={{
          position: 'absolute', width: 650, height: 650, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 60%)',
          bottom: -250, left: -180, animation: 'heroOrb 15s ease-in-out infinite 5s',
        }} />
        {/* Orb 3 */}
        <div style={{
          position: 'absolute', width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 60%)',
          top: '40%', left: '45%', animation: 'heroOrb 18s ease-in-out infinite 9s',
        }} />

        {/* Floating platform icons */}
        {FLOATING_ICONS.map(fi => (
          <div
            key={fi.icon}
            style={{
              position: 'absolute',
              left: `${fi.x}%`,
              top: `${fi.y}%`,
              fontSize: fi.size,
              opacity: 0.12,
              animation: `heroOrb ${8 + fi.delay}s ease-in-out infinite ${fi.delay}s`,
              filter: 'blur(0.5px)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {fi.icon}
          </div>
        ))}

        {/* Particle dots */}
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: p.s,
              height: p.s,
              borderRadius: '50%',
              background: p.id % 3 === 0 ? '#7c3aed' : p.id % 3 === 1 ? '#2563eb' : '#a855f7',
              opacity: 0.25,
              animation: `particlePulse ${p.dur}s ease-in-out infinite ${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, width: '100%' }}>

        {/* Live orders badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 100, padding: '7px 18px',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#10b981',
              display: 'inline-block', animation: 'livePulse 1.8s ease-in-out infinite', flexShrink: 0,
            }} />
            <span style={{ color: '#34d399', fontSize: 13, fontWeight: 600 }}>
              🔥 {liveOrders} הזמנות בשעה האחרונה
            </span>
          </div>
        </div>

        {/* Top badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <span className="badge badge-purple" style={{ fontSize: 14, padding: '8px 22px' }}>
            ✨ הפלטפורמה הישראלית #1 לשיווק ברשתות
          </span>
        </div>

        {/* H1 with typewriter */}
        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 12,
          letterSpacing: '-0.5px',
          color: 'white',
        }}>
          קנה{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #818cf8 50%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
            minWidth: '3ch',
          }}>
            {displayed}
            <span style={{
              WebkitTextFillColor: '#a855f7',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.1s',
            }}>|</span>
          </span>
        </h1>
        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 28,
          letterSpacing: '-0.5px',
          color: 'white',
        }}>
          לרשתות החברתיות שלך
        </h1>

        {/* Subheadline - keyword rich */}
        <p style={{
          fontSize: 'clamp(16px, 2.2vw, 20px)',
          color: '#94a3b8',
          lineHeight: 1.8,
          marginBottom: 14,
          maxWidth: 680,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          עוקבים לאינסטגרם, לייקים לפייסבוק, צפיות לטיקטוק ומנויים ליוטיוב.
        </p>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#64748b',
          lineHeight: 1.7,
          marginBottom: 44,
          maxWidth: 580,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          המחירים הכי נמוכים בישראל · מסירה מהירה · תמיכה מלאה בעברית
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
          <Link
            to="/services"
            className="btn-primary"
            style={{ fontSize: 17, padding: '15px 40px', borderRadius: 14 }}
          >
            🔥 צפה בכל השירותים
          </Link>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram"
            style={{ fontSize: 17, padding: '15px 40px', borderRadius: 14 }}
          >
            📱 הזמן עכשיו בטלגרם
          </a>
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px',
        }}>
          {[
            { icon: '🔒', text: 'מאובטח 100%' },
            { icon: '⚡', text: 'מסירה תוך שעות' },
            { icon: '🇮🇱', text: 'תמיכה בעברית' },
            { icon: '✅', text: '1,000+ לקוחות' },
            { icon: '🔄', text: 'ערבות Refill' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#64748b', fontSize: 14 }}>
              <span>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        color: '#334155', animation: 'scrollBounce 2s ease-in-out infinite',
      }}>
        <div style={{ width: 22, height: 34, border: '2px solid #334155', borderRadius: 11, position: 'relative' }}>
          <div style={{
            width: 4, height: 8, background: '#475569', borderRadius: 2,
            position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
            animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes heroOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes particlePulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(2.5); opacity: 0.5; }
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { transform: scale(1.2); box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scrollDot {
          0%, 100% { top: 4px; opacity: 1; }
          50% { top: 14px; opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
