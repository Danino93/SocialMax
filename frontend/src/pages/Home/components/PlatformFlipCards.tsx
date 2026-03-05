import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const platforms = [
  { id: 'instagram', emoji: '📸', name: 'אינסטגרם', color: '#e1306c', fromPrice: '₪1.90', services: ['עוקבים', 'לייקים'] },
  { id: 'facebook', emoji: '📘', name: 'פייסבוק', color: '#1877f2', fromPrice: '₪2.50', services: ['לייקים לדף', 'ריאקשן'] },
  { id: 'tiktok', emoji: '🎵', name: 'טיקטוק', color: '#ff0050', fromPrice: '₪0.70', services: ['צפיות', 'עוקבים'] },
  { id: 'youtube', emoji: '▶️', name: 'יוטיוב', color: '#ff0000', fromPrice: '₪8.00', services: ['מנויים', 'צפיות'] },
  { id: 'telegram', emoji: '✈️', name: 'טלגרם', color: '#2aabee', fromPrice: '₪3.70', services: ['חברים', 'צפיות'] },
  { id: 'whatsapp', emoji: '💬', name: 'וואטסאפ', color: '#25d366', fromPrice: '₪7.40', services: ['חברים', 'ביקורות'] },
  { id: 'twitter', emoji: '🐦', name: 'טוויטר', color: '#1da1f2', fromPrice: '₪3.00', services: ['עוקבים', 'לייקים'] },
  { id: 'discord', emoji: '🎮', name: 'דיסקורד', color: '#5865f2', fromPrice: '₪5.55', services: ['חברים', 'עוקבים'] },
  { id: 'spotify', emoji: '🎧', name: 'ספוטיפיי', color: '#1db954', fromPrice: '₪2.78', services: ['השמעות', 'עוקבים'] },
  { id: 'google', emoji: '⭐', name: 'גוגל', color: '#4285f4', fromPrice: '₪18.50', services: ['ביקורות', 'עוקבים'] },
];

const FlipCard: React.FC<{ p: typeof platforms[0] }> = ({ p }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: 1000, height: 180 }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: `${p.color}0d`, border: `1px solid ${p.color}30`,
          borderRadius: 16, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: 20,
        }}>
          <span style={{ fontSize: 40 }}>{p.emoji}</span>
          <span style={{ color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>
            {p.name}
          </span>
          <span style={{ color: p.color, fontSize: 11, fontFamily: 'Heebo, sans-serif' }}>
            העבר עכבר לפרטים →
          </span>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: '#13131f', border: `1px solid ${p.color}40`,
          borderRadius: 16, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: 20, textAlign: 'center',
          boxShadow: `0 8px 24px ${p.color}20`,
        }}>
          <div style={{
            background: `${p.color}18`, border: `1px solid ${p.color}35`,
            borderRadius: 8, padding: '4px 12px',
          }}>
            <span style={{ color: p.color, fontSize: 13, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>
              מ-{p.fromPrice} / אלף
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {p.services.map(s => (
              <span key={s} style={{ color: '#94a3b8', fontSize: 13, fontFamily: 'Heebo, sans-serif' }}>✓ {s}</span>
            ))}
          </div>
          <Link
            to={`/services/${p.id}`}
            style={{
              marginTop: 4, padding: '6px 16px', borderRadius: 20,
              background: `linear-gradient(135deg, ${p.color}cc, ${p.color}99)`,
              color: 'white', fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif',
              textDecoration: 'none',
            }}
          >
            הזמן עכשיו →
          </Link>
        </div>
      </div>
    </div>
  );
};

const PlatformFlipCards: React.FC = () => (
  <section className="section" aria-label="פלטפורמות flip">
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
          🌐 הפלטפורמות שלנו
        </span>
        <h2 className="section-title">
          בחר את{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            הפלטפורמה שלך
          </span>
        </h2>
        <p className="section-subtitle">העבר עכבר על הכרטיס לראות מחירים ושירותים</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
      }}>
        {platforms.map(p => <FlipCard key={p.id} p={p} />)}
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        section[aria-label="פלטפורמות flip"] .container > div:last-child {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }
      @media (max-width: 540px) {
        section[aria-label="פלטפורמות flip"] .container > div:last-child {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
    `}</style>
  </section>
);

export default PlatformFlipCards;
