import React, { useState } from 'react';

const TELEGRAM_LINK = 'https://t.me/socialsniper93_bot';

const FloatingTelegramButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);

  return (
    <>
      <style>{`
        @keyframes floatingBtnPulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (max-width: 900px) {
          .floating-tg-btn { display: none !important; }
        }
      `}</style>
      <div
        className="floating-tg-btn"
        style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999 }}
      >
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(124,58,237,0.35)',
            animation: pulseActive ? 'floatingBtnPulse 2s ease-out infinite' : 'none',
            pointerEvents: 'none',
          }} />
          {/* Tooltip */}
          {hovered && (
            <div style={{
              position: 'absolute', right: 76, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(19,19,31,0.95)', border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 10, padding: '8px 14px', color: '#e2e8f0', fontSize: 13,
              fontFamily: 'Heebo, sans-serif', fontWeight: 600, whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}>
              הזמן בטלגרם
            </div>
          )}
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הזמן בטלגרם"
            onMouseEnter={() => { setHovered(true); setPulseActive(false); }}
            onMouseLeave={() => { setHovered(false); setPulseActive(true); }}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, textDecoration: 'none', position: 'relative', zIndex: 1,
              boxShadow: hovered ? '0 8px 32px rgba(124,58,237,0.6)' : '0 4px 24px rgba(124,58,237,0.4)',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            ✈️
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingTelegramButton;
