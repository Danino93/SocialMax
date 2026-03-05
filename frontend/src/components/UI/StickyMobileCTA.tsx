import React from 'react';

const TELEGRAM_LINK = 'https://t.me/socialsniper93_bot';

const StickyMobileCTA: React.FC = () => (
  <>
    <style>{`
      @media (min-width: 901px) { .sticky-mob-cta { display: none !important; } }
      @media (max-width: 900px) { .sticky-mob-cta { display: flex !important; } }
    `}</style>
    <a
      href={TELEGRAM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="התחל עכשיו בטלגרם"
      className="sticky-mob-cta"
      style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 56, zIndex: 998,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.97), rgba(37,99,235,0.97))',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
        boxShadow: '0 -2px 20px rgba(124,58,237,0.35)',
      }}
    >
      <span style={{
        color: '#fff', fontSize: 16, fontWeight: 700,
        fontFamily: 'Heebo, sans-serif', direction: 'rtl',
      }}>
        📱 התחל עכשיו בטלגרם
      </span>
    </a>
  </>
);

export default StickyMobileCTA;
