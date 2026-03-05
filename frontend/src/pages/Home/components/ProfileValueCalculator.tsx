import React, { useState, useEffect } from 'react';
import { TELEGRAM_LINK } from '../../../components/Layout/Header';

const platformRates: Record<string, { rate: number; label: string; emoji: string }> = {
  instagram: { rate: 180, label: 'Instagram', emoji: '📸' },
  tiktok:    { rate: 150, label: 'TikTok',    emoji: '🎵' },
  youtube:   { rate: 240, label: 'YouTube',   emoji: '▶️' },
  facebook:  { rate: 90,  label: 'Facebook',  emoji: '📘' },
  twitter:   { rate: 110, label: 'Twitter/X', emoji: '🐦' },
  telegram:  { rate: 70,  label: 'Telegram',  emoji: '✈️' },
};

function calcValue(platform: string, followers: number, avgLikes: number): number {
  const rate = platformRates[platform]?.rate ?? 120;
  const engagement = followers > 0 ? (avgLikes / followers) * 100 : 0;
  const engMult = Math.min(Math.max(engagement / 3, 0.3), 3.0);
  return Math.round((followers / 1000) * rate * engMult);
}

function formatILS(n: number) {
  if (n >= 10000) return `₪${(n / 1000).toFixed(1)}K`;
  return `₪${n.toLocaleString('he-IL')}`;
}

const ProfileValueCalculator: React.FC = () => {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState(5000);
  const [avgLikes, setAvgLikes] = useState(150);
  const [displayValue, setDisplayValue] = useState(0);
  const [animating, setAnimating] = useState(false);

  const targetValue = calcValue(platform, followers, avgLikes);
  const engagement = followers > 0 ? ((avgLikes / followers) * 100).toFixed(1) : '0';
  const tier =
    Number(engagement) >= 6 ? { label: 'ויראלי 🔥', color: '#f59e0b' } :
    Number(engagement) >= 3 ? { label: 'טוב ✅',     color: '#10b981' } :
    Number(engagement) >= 1 ? { label: 'ממוצע 📊',  color: '#60a5fa' } :
                               { label: 'חלש ⚠️',    color: '#f87171' };

  useEffect(() => {
    setAnimating(true);
    const start = displayValue;
    const diff = targetValue - start;
    const steps = 30;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplayValue(Math.round(start + (diff * step) / steps));
      if (step >= steps) { clearInterval(timer); setAnimating(false); }
    }, 20);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue]);

  return (
    <section style={{ padding: '96px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            💰 מחשבון שווי פרופיל
          </span>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            כמה{' '}
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              שווה הפרופיל שלך?
            </span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 480, margin: '0 auto' }}>
            הכנס את הנתונים שלך וגלה את הערך השנתי שלך כאינפלואנסר בשוק הישראלי
          </p>
        </div>

        {/* Calculator card */}
        <div style={{
          maxWidth: 780,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          overflow: 'hidden',
        }}>

          {/* Left — Inputs */}
          <div style={{ padding: 36, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 24 }}>הכנס את הנתונים שלך</h3>

            {/* Platform */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>פלטפורמה</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {Object.entries(platformRates).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setPlatform(key)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: `1px solid ${platform === key ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                      background: platform === key ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                      color: platform === key ? '#a78bfa' : '#64748b',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: 'Heebo, sans-serif',
                      transition: 'all 0.15s',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 16, marginBottom: 2 }}>{val.emoji}</div>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Followers */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                מספר עוקבים: <span style={{ color: '#a78bfa' }}>{followers.toLocaleString('he-IL')}</span>
              </label>
              <input
                type="range"
                min={100}
                max={500000}
                step={100}
                value={followers}
                onChange={e => setFollowers(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 11, marginTop: 4 }}>
                <span>100</span><span>500K</span>
              </div>
            </div>

            {/* Avg likes */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                ממוצע לייקים לפוסט: <span style={{ color: '#a78bfa' }}>{avgLikes.toLocaleString('he-IL')}</span>
              </label>
              <input
                type="range"
                min={0}
                max={Math.max(followers * 0.3, 100)}
                step={10}
                value={avgLikes}
                onChange={e => setAvgLikes(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 11, marginTop: 4 }}>
                <span>0</span><span>{Math.round(followers * 0.3).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right — Result */}
          <div style={{
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(124,58,237,0.05)',
            textAlign: 'center',
            gap: 20,
          }}>
            <div style={{ color: '#64748b', fontSize: 13, fontWeight: 600 }}>שווי הפרופיל שלך</div>

            <div style={{
              fontSize: 56,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              transition: animating ? 'none' : 'all 0.3s',
            }}>
              {formatILS(displayValue)}
            </div>
            <div style={{ color: '#475569', fontSize: 12 }}>לשנה כאינפלואנסר ישראלי</div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, width: '100%' }}>
              <div style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
                padding: '10px 8px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: tier.color, fontSize: 14, fontWeight: 700 }}>{engagement}%</div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>Engagement</div>
                <div style={{ color: tier.color, fontSize: 10, marginTop: 3, fontWeight: 600 }}>{tier.label}</div>
              </div>
              <div style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 12,
                padding: '10px 8px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ color: '#a78bfa', fontSize: 14, fontWeight: 700 }}>
                  {formatILS(Math.round(targetValue / 12))}
                </div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>לחודש</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: 12,
              color: '#a78bfa',
              lineHeight: 1.5,
            }}>
              💡 עוד {(1000).toLocaleString()} עוקבים ישפרו את השווי שלך ב-
              <strong> {formatILS(Math.round(calcValue(platform, followers + 1000, avgLikes) - targetValue))}</strong>
            </div>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', padding: '12px 20px', fontSize: 14 }}
            >
              🚀 הגדל את השווי שלך
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: 'center', color: '#334155', fontSize: 11, marginTop: 16 }}>
          * חישוב מבוסס על ממוצע שוק האינפלואנסרים הישראלי 2025 — לצרכי הדגמה בלבד
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .profile-calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProfileValueCalculator;
