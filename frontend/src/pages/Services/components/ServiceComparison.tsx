import React, { useState } from 'react';
import { Service } from '../../../data/services';
import { TELEGRAM_LINK } from '../../../components/Layout/Header';

interface Props {
  services: Service[];
  color?: string;
}

const ServiceComparison: React.FC<Props> = ({ services, color = '#7c3aed' }) => {
  const [open, setOpen] = useState(false);
  const [idxA, setIdxA] = useState(0);
  const [idxB, setIdxB] = useState(Math.min(1, services.length - 1));

  if (services.length < 2) return null;

  const sA = services[idxA];
  const sB = services[idxB];

  function priceFor(s: Service, qty: number) {
    return ((s.pricePerK * qty) / 1000).toFixed(0);
  }

  function perUnit(s: Service) {
    return ((s.pricePerK / 1000) * 100).toFixed(2);
  }

  function recommend(): 'A' | 'B' | null {
    if (!sA || !sB) return null;
    const scoreA = sA.badges.length + (sA.badges.includes('non-drop') ? 3 : 0) + (sA.badges.includes('refill') ? 2 : 0);
    const scoreB = sB.badges.length + (sB.badges.includes('non-drop') ? 3 : 0) + (sB.badges.includes('refill') ? 2 : 0);
    if (scoreA === scoreB) return null;
    return scoreA >= scoreB ? 'A' : 'B';
  }

  const rec = recommend();

  const badgeLabels: Record<string, string> = {
    popular: 'פופולרי',
    'non-drop': 'Non-Drop',
    refill: 'Refill',
    fast: 'מהיר',
    premium: 'פרמיום',
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${open ? color : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 12,
          color: open ? '#a78bfa' : '#94a3b8',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'Heebo, sans-serif',
          transition: 'all 0.2s',
          marginBottom: open ? 0 : 0,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        ⚖️ השווה שירותים
        <span style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
          fontSize: 12,
        }}>▼</span>
      </button>

      {/* Comparison panel */}
      {open && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${color}25`,
          borderRadius: 20,
          padding: 24,
          marginTop: 12,
        }}>
          {/* Service selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 24 }}>
            {/* Select A */}
            <div>
              <label style={{ color: '#64748b', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>שירות א׳</label>
              <select
                value={idxA}
                onChange={e => setIdxA(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  color: 'white',
                  padding: '8px 10px',
                  fontSize: 13,
                  fontFamily: 'Heebo, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {services.map((s, i) => (
                  <option key={s.id} value={i}>{s.name}</option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'center', color: '#475569', fontWeight: 700, fontSize: 18, paddingTop: 20 }}>VS</div>

            {/* Select B */}
            <div>
              <label style={{ color: '#64748b', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 6 }}>שירות ב׳</label>
              <select
                value={idxB}
                onChange={e => setIdxB(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: '#1a1a2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  color: 'white',
                  padding: '8px 10px',
                  fontSize: 13,
                  fontFamily: 'Heebo, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {services.map((s, i) => (
                  <option key={s.id} value={i}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {sA && sB && (
            <>
              {/* Comparison table */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 0 }}>
                {/* Header */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '8px 0' }} />
                {[sA, sB].map((s, ci) => (
                  <div key={ci} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '8px 12px',
                    textAlign: 'center',
                    background: rec === (ci === 0 ? 'A' : 'B') ? `${color}08` : 'transparent',
                    borderRadius: ci === 0 ? '12px 0 0 0' : '0 12px 0 0',
                    position: 'relative',
                  }}>
                    {rec === (ci === 0 ? 'A' : 'B') && (
                      <div style={{
                        position: 'absolute',
                        top: -10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: color,
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 20,
                        whiteSpace: 'nowrap',
                      }}>
                        🏆 מומלץ
                      </div>
                    )}
                    <div style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{s.name}</div>
                  </div>
                ))}

                {/* Rows */}
                {[
                  {
                    label: 'מחיר ל-1K',
                    vals: [sA, sB].map(s => `₪${s.pricePerK.toFixed(2)}`),
                    best: sA.pricePerK <= sB.pricePerK ? 0 : 1,
                  },
                  {
                    label: 'מחיר ל-1000 יחידות',
                    vals: [sA, sB].map(s => `₪${priceFor(s, 1000)}`),
                    best: sA.pricePerK <= sB.pricePerK ? 0 : 1,
                  },
                  {
                    label: 'מחיר לכל יחידה (אג׳)',
                    vals: [sA, sB].map(s => `${perUnit(s)}₪`),
                    best: Number(perUnit(sA)) <= Number(perUnit(sB)) ? 0 : 1,
                  },
                  {
                    label: 'זמן אספקה',
                    vals: [sA, sB].map(s => s.startTime),
                    best: null,
                  },
                  {
                    label: 'מינימום הזמנה',
                    vals: [sA, sB].map(s => s.minOrder.toLocaleString('he-IL')),
                    best: sA.minOrder <= sB.minOrder ? 0 : 1,
                  },
                  {
                    label: 'תגיות',
                    vals: [sA, sB].map(s => (
                      s.badges.map(b => badgeLabels[b] || b).join(' · ')
                    )),
                    best: null,
                  },
                ].map((row, ri) => (
                  <React.Fragment key={ri}>
                    <div style={{
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      color: '#64748b',
                      fontSize: 12,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      {row.label}
                    </div>
                    {[0, 1].map(ci => (
                      <div key={ci} style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        textAlign: 'center',
                        background: row.best === ci ? `${color}08` : 'transparent',
                      }}>
                        <span style={{
                          color: row.best === ci ? '#a78bfa' : '#94a3b8',
                          fontSize: 12,
                          fontWeight: row.best === ci ? 700 : 500,
                        }}>
                          {typeof row.vals[ci] === 'string' ? row.vals[ci] : ''}
                          {row.best === ci && ' ✓'}
                        </span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>

              {/* Recommendation */}
              {rec && (
                <div style={{
                  marginTop: 20,
                  background: `${color}10`,
                  border: `1px solid ${color}25`,
                  borderRadius: 14,
                  padding: '14px 18px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                    🏆 אנחנו ממליצים על: {rec === 'A' ? sA.name : sB.name}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 14 }}>
                    יחס מחיר-איכות טוב יותר עם {(rec === 'A' ? sA : sB).badges.map(b => badgeLabels[b]).join(', ')}
                  </div>
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-telegram"
                    style={{ fontSize: 13, padding: '8px 20px' }}
                  >
                    📱 הזמן {rec === 'A' ? sA.name : sB.name}
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ServiceComparison;
