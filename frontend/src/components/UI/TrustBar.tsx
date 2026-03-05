import React from 'react';

const items = [
  { icon: '🔒', text: 'תשלום מאובטח' },
  { icon: '✅', text: "הפעלה תוך 30 דק'", mobileHide: true },
  { icon: '🇮🇱', text: 'שירות ישראלי' },
  { icon: '⭐', text: '4.9/5 מ-1,247 לקוחות', mobileHide: true },
];

const TrustBar: React.FC = () => (
  <>
    <style>{`
      @media (max-width: 600px) {
        .trust-hide { display: none !important; }
        .trust-div-hide { display: none !important; }
      }
    `}</style>
    <div
      role="complementary"
      aria-label="אמינות ואבטחה"
      style={{
        position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
        height: 40, background: 'rgba(124,58,237,0.06)',
        borderBottom: '1px solid rgba(124,58,237,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                className={item.mobileHide ? 'trust-div-hide' : undefined}
                style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', margin: '0 4px' }}
              />
            )}
            <div
              className={item.mobileHide ? 'trust-hide' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '0 14px', color: '#94a3b8', fontSize: 12,
                fontFamily: 'Heebo, sans-serif', fontWeight: 500, whiteSpace: 'nowrap',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </>
);

export default TrustBar;
