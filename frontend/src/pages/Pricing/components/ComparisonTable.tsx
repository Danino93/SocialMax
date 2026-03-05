import React, { useRef, useEffect, useState } from 'react';

const rows = [
  { criterion: 'שפה עברית מלאה', us: true,  them: false, note: '' },
  { criterion: 'הזמנה בטלגרם', us: true,  them: false, note: 'ייחודי לישראל' },
  { criterion: 'מחירים בש"ח (ILS)', us: true,  them: false, note: '' },
  { criterion: 'ערבות Non-Drop', us: true,  them: false, note: 'שירותים נבחרים' },
  { criterion: 'שירות לקוחות ישראלי', us: true,  them: false, note: '' },
  { criterion: 'Refill Guarantee', us: true,  them: false, note: 'ל-30 יום' },
  { criterion: 'מחיר תחרותי', us: true,  them: true,  note: '' },
  { criterion: '10 פלטפורמות', us: true,  them: true,  note: '' },
];

const ComparisonTable: React.FC = () => {
  const [visibleRows, setVisibleRows] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rows.forEach((_, i) => {
            setTimeout(() => setVisibleRows(i + 1), i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '80px 0' }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ⚖️ למה SocialSniper?
          </span>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            אנחנו vs.{' '}
            <span style={{ color: '#475569' }}>פאנלים אחרים</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 440, margin: '0 auto' }}>
            SocialSniper הוא הפאנל הישראלי היחיד עם שפה עברית, מחירי ILS, והזמנה בטלגרם
          </p>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 120px',
            gap: 0,
            marginBottom: 2,
          }}>
            <div style={{ padding: '12px 16px', color: '#475569', fontSize: 12, fontWeight: 600 }} />
            <div style={{
              padding: '12px 16px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))',
              borderRadius: '12px 0 0 0',
              border: '1px solid rgba(124,58,237,0.3)',
              borderBottom: 'none',
            }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>🎯</div>
              <div style={{ color: '#a78bfa', fontSize: 13, fontWeight: 800 }}>SocialSniper</div>
            </div>
            <div style={{
              padding: '12px 16px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '0 12px 0 0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderLeft: 'none',
              borderBottom: 'none',
            }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>🌐</div>
              <div style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>פאנלים אחרים</div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 120px',
                gap: 0,
                opacity: i < visibleRows ? 1 : 0,
                transform: i < visibleRows ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <div style={{
                padding: '13px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{row.criterion}</span>
                {row.note && (
                  <span style={{
                    background: 'rgba(124,58,237,0.12)',
                    color: '#a78bfa',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 6,
                  }}>{row.note}</span>
                )}
              </div>
              {/* Our col */}
              <div style={{
                padding: '13px 16px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: row.us ? 'rgba(124,58,237,0.04)' : 'transparent',
                border: '1px solid rgba(124,58,237,0.15)',
                borderTop: 'none',
              }}>
                {row.us
                  ? <span style={{ color: '#10b981', fontSize: 18 }}>✅</span>
                  : <span style={{ color: '#ef4444', fontSize: 18 }}>✗</span>}
              </div>
              {/* Them col */}
              <div style={{
                padding: '13px 16px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: 'none',
                borderLeft: 'none',
              }}>
                {row.them
                  ? <span style={{ color: '#10b981', fontSize: 18 }}>✅</span>
                  : <span style={{ color: '#475569', fontSize: 16 }}>✗</span>}
              </div>
            </div>
          ))}

          {/* Score summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 120px',
            gap: 0,
            marginTop: 2,
          }}>
            <div style={{ padding: '14px 16px', color: '#64748b', fontSize: 12, fontWeight: 700 }}>
              סה"כ
            </div>
            <div style={{
              padding: '14px 16px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.15))',
              borderRadius: '0 0 0 12px',
              border: '1px solid rgba(124,58,237,0.3)',
              borderTop: 'none',
            }}>
              <div style={{ color: '#a78bfa', fontSize: 18, fontWeight: 900 }}>
                {rows.filter(r => r.us).length}/{rows.length}
              </div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>ניקוד</div>
            </div>
            <div style={{
              padding: '14px 16px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '0 0 12px 0',
              border: '1px solid rgba(255,255,255,0.06)',
              borderTop: 'none',
              borderLeft: 'none',
            }}>
              <div style={{ color: '#475569', fontSize: 18, fontWeight: 900 }}>
                {rows.filter(r => r.them).length}/{rows.length}
              </div>
              <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>ניקוד</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
