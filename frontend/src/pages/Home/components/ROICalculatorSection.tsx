import React, { useState } from 'react';
import { TELEGRAM_LINK } from '../../../components/Layout/Header';

const platforms = [
  { id: 'instagram', name: 'אינסטגרם', pricePerK: 1.90, fbCostPerK: 8, service: 'עוקבים' },
  { id: 'tiktok', name: 'טיקטוק', pricePerK: 0.70, fbCostPerK: 6, service: 'צפיות' },
  { id: 'facebook', name: 'פייסבוק', pricePerK: 2.50, fbCostPerK: 7, service: 'לייקים' },
  { id: 'youtube', name: 'יוטיוב', pricePerK: 8.00, fbCostPerK: 12, service: 'מנויים' },
  { id: 'telegram', name: 'טלגרם', pricePerK: 3.70, fbCostPerK: 5, service: 'חברים' },
];

const ROICalculatorSection: React.FC = () => {
  const [budget, setBudget] = useState(500);
  const [platIdx, setPlatIdx] = useState(0);

  const p = platforms[platIdx];
  const qty = Math.floor((budget / p.pricePerK) * 1000);
  const ourCost = budget;
  const fbCost = Math.floor((qty / 1000) * p.fbCostPerK);
  const saving = Math.max(0, fbCost - ourCost);
  const roi = fbCost > 0 ? Math.floor(((fbCost - ourCost) / ourCost) * 100) : 0;

  const ResultCard: React.FC<{ label: string; main: string; sub?: string; color?: string }> = ({ label, main, sub, color = '#a855f7' }) => (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14, padding: '20px 24px', flex: 1,
    }}>
      <div style={{ color: '#64748b', fontSize: 12, fontFamily: 'Heebo, sans-serif', marginBottom: 8 }}>{label}</div>
      <div style={{ color, fontSize: 28, fontWeight: 900, fontFamily: 'Heebo, sans-serif', lineHeight: 1 }}>{main}</div>
      {sub && <div style={{ color: '#64748b', fontSize: 12, fontFamily: 'Heebo, sans-serif', marginTop: 6 }}>{sub}</div>}
    </div>
  );

  return (
    <section className="section" aria-label="מחשבון ROI" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            🧮 מחשבון ROI
          </span>
          <h2 className="section-title">
            כמה שווה{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ההשקעה שלך?
            </span>
          </h2>
          <p className="section-subtitle">חשב בעצמך את החיסכון לעומת פרסום ממומן</p>

          {/* Demo badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 20, padding: '6px 16px', marginTop: 12,
          }}>
            <span style={{ fontSize: 14 }}>🚧</span>
            <span style={{ color: '#f59e0b', fontSize: 13, fontWeight: 600, fontFamily: 'Heebo, sans-serif' }}>
              דמו בלבד — רכישה אוטומטית בקרוב
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32, alignItems: 'start',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: 36,
        }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, fontFamily: 'Heebo, sans-serif', display: 'block', marginBottom: 10 }}>
                תקציב חודשי:
                <strong style={{ color: 'white', marginRight: 8, fontSize: 18 }}>₪{budget.toLocaleString('he-IL')}</strong>
              </label>
              <input
                type="range" min={100} max={5000} step={50} value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 11, fontFamily: 'Heebo, sans-serif', marginTop: 4 }}>
                <span>₪100</span><span>₪5,000</span>
              </div>
            </div>

            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, fontFamily: 'Heebo, sans-serif', display: 'block', marginBottom: 10 }}>
                פלטפורמה:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {platforms.map((pl, i) => (
                  <button
                    key={pl.id}
                    onClick={() => setPlatIdx(i)}
                    style={{
                      padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
                      fontFamily: 'Heebo, sans-serif', fontSize: 13, fontWeight: 600,
                      border: `1px solid ${platIdx === i ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                      background: platIdx === i ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                      color: platIdx === i ? '#a78bfa' : '#64748b',
                      transition: 'all 0.15s',
                    }}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
              borderRadius: 12, padding: '12px 16px',
            }}>
              <span style={{ color: '#94a3b8', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>
                💡 מחיר לאלף {p.service}: <strong style={{ color: '#a855f7' }}>₪{p.pricePerK.toFixed(2)}</strong>
                {' '}לעומת פרסום ממומן: <strong style={{ color: '#64748b' }}>₪{p.fbCostPerK}</strong>
              </span>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ResultCard
              label={`כמות ${p.service} משוערת`}
              main={qty.toLocaleString('he-IL')}
              sub={`עבור תקציב של ₪${budget}`}
              color="#a855f7"
            />
            <ResultCard
              label="עלות פרסום ממומן לאותה כמות"
              main={`₪${fbCost.toLocaleString('he-IL')}`}
              sub={`חיסכון: ₪${saving.toLocaleString('he-IL')}`}
              color="#60a5fa"
            />
            <ResultCard
              label="ROI משוער"
              main={`${roi}%`}
              sub="יותר ממה שתוציא על פרסום"
              color="#10b981"
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram"
            style={{ fontSize: 16, padding: '14px 36px' }}
          >
            📱 התחל עכשיו בטלגרם
          </a>
          <p style={{ color: '#475569', fontSize: 12, marginTop: 12, fontFamily: 'Heebo, sans-serif' }}>
            * החישובים הם הערכה בלבד ועשויים להשתנות. אין ערובה לתוצאות זהות.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="מחשבון ROI"] .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ROICalculatorSection;
