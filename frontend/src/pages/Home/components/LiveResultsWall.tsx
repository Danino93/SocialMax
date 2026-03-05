import React, { useState, useEffect, useRef } from 'react';

interface Result {
  id: number;
  name: string;
  city: string;
  service: string;
  platform: string;
  emoji: string;
  color: string;
  amount: string;
  status: 'active' | 'done';
  minutesAgo: number;
}

const NAMES = [
  'אייל מ.', 'שירה כ.', 'דוד ל.', 'נעמה ב.', 'יוסי ג.', 'רחל צ.', 'אמיר ו.', 'מיכל ש.',
  'ניר ה.', 'תמר פ.', 'רון ד.', 'גלית ר.', 'יובל מ.', 'לירון ק.', 'ליאור א.', 'ורד נ.',
  'מיכאל ז.', 'דנה א.', 'ערן ט.', 'סיגל ח.',
];
const CITIES = ['תל אביב', 'ירושלים', 'חיפה', 'ראשל"צ', 'נתניה', 'באר שבע', 'אשדוד', 'פתח תקווה', 'רמת גן', 'בני ברק'];

const SERVICES: Array<{ service: string; platform: string; emoji: string; color: string; amounts: string[] }> = [
  { service: 'עוקבים', platform: 'Instagram', emoji: '📸', color: '#e1306c', amounts: ['500', '1,000', '2,000', '5,000'] },
  { service: 'לייקים', platform: 'Instagram', emoji: '📸', color: '#e1306c', amounts: ['200', '500', '1,000'] },
  { service: 'צפיות', platform: 'TikTok', emoji: '🎵', color: '#ff0050', amounts: ['5K', '10K', '50K', '100K'] },
  { service: 'עוקבים', platform: 'TikTok', emoji: '🎵', color: '#ff0050', amounts: ['500', '1,000', '3,000'] },
  { service: 'מנויים', platform: 'YouTube', emoji: '▶️', color: '#ff0000', amounts: ['200', '500', '1,000'] },
  { service: 'צפיות', platform: 'YouTube', emoji: '▶️', color: '#ff0000', amounts: ['1K', '5K', '10K'] },
  { service: 'לייקים', platform: 'Facebook', emoji: '📘', color: '#1877f2', amounts: ['500', '1,000', '2,000'] },
  { service: 'חברים', platform: 'Telegram', emoji: '✈️', color: '#2aabee', amounts: ['200', '500', '1,000'] },
  { service: 'השמעות', platform: 'Spotify', emoji: '🎧', color: '#1db954', amounts: ['1K', '5K', '10K'] },
  { service: 'ביקורות', platform: 'Google', emoji: '🔍', color: '#4285f4', amounts: ['5', '10', '20'] },
];

function generate(id: number): Result {
  const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
  const amt = svc.amounts[Math.floor(Math.random() * svc.amounts.length)];
  const status = Math.random() > 0.35 ? 'done' : 'active';
  return {
    id,
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    city: CITIES[Math.floor(Math.random() * CITIES.length)],
    service: svc.service,
    platform: svc.platform,
    emoji: svc.emoji,
    color: svc.color,
    amount: amt,
    status,
    minutesAgo: Math.floor(Math.random() * 25) + 1,
  };
}

const TOTAL = 20;

const LiveResultsWall: React.FC = () => {
  const [results, setResults] = useState<Result[]>(() =>
    Array.from({ length: TOTAL }, (_, i) => generate(i))
  );
  const [flashingId, setFlashingId] = useState<number | null>(null);
  const idCounter = useRef(TOTAL);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * TOTAL);
      idCounter.current++;
      const newItem = generate(idCounter.current);
      setFlashingId(idCounter.current);
      setResults(prev => {
        const next = [...prev];
        next[idx] = newItem;
        return next;
      });
      setTimeout(() => setFlashingId(null), 800);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: '96px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ⚡ תוצאות בזמן אמת
          </span>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            מה קורה{' '}
            <span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              עכשיו
            </span>
          </h2>
          <p className="section-subtitle">
            הזמנות ותוצאות חיות מלקוחות SocialSniper ברחבי ישראל
          </p>

          {/* Live indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 20,
            padding: '6px 14px',
            marginTop: 16,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulseDot 1.5s ease infinite',
            }} />
            <span style={{ color: '#10b981', fontSize: 13, fontWeight: 700 }}>LIVE — מתעדכן כל 3.5 שניות</span>
          </div>
        </div>

        {/* Results grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
        }}>
          {results.map((r) => (
            <div
              key={r.id}
              style={{
                background: flashingId === r.id
                  ? `${r.color}18`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${flashingId === r.id ? `${r.color}40` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 14,
                padding: '12px 14px',
                transition: 'background 0.4s ease, border-color 0.4s ease',
              }}
            >
              {/* Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{r.emoji}</span>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: r.status === 'done' ? 'rgba(16,185,129,0.12)' : 'rgba(251,191,36,0.12)',
                  border: `1px solid ${r.status === 'done' ? 'rgba(16,185,129,0.25)' : 'rgba(251,191,36,0.25)'}`,
                  borderRadius: 10,
                  padding: '2px 7px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: r.status === 'done' ? '#10b981' : '#fbbf24',
                }}>
                  {r.status === 'done' ? '✅ הושלם' : '⚡ פעיל'}
                </div>
              </div>

              {/* Name + City */}
              <div style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{r.name}</div>
              <div style={{ color: '#475569', fontSize: 11, marginBottom: 8 }}>{r.city}</div>

              {/* Service */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: `${r.color}10`,
                border: `1px solid ${r.color}25`,
                borderRadius: 8,
                padding: '3px 8px',
                color: r.color,
                fontSize: 11,
                fontWeight: 700,
              }}>
                +{r.amount} {r.service}
              </div>

              {/* Time */}
              <div style={{ color: '#334155', fontSize: 10, marginTop: 8 }}>
                לפני {r.minutesAgo} דקות
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes pulseDot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
          }
          @media (max-width: 900px) {
            .live-wall-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .live-wall-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default LiveResultsWall;
