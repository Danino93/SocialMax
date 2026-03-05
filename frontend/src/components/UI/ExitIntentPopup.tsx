import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TELEGRAM_LINK = 'https://t.me/socialsniper93_bot';

const ExitIntentPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (localStorage.getItem('ss_exit_shown')) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        localStorage.setItem('ss_exit_shown', '1');
        setVisible(true);
        document.removeEventListener('mousemove', handler);
      }
    };
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px',
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              background: '#13131f', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: '40px 36px', maxWidth: 440, width: '100%',
              position: 'relative', direction: 'rtl', textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Top gradient line */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: 2,
              background: 'linear-gradient(90deg, transparent, #7c3aed, #2563eb, transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            <button
              onClick={close}
              aria-label="סגור"
              style={{
                position: 'absolute', top: 14, left: 14, width: 30, height: 30,
                borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                color: '#94a3b8', fontSize: 14, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            <div style={{ fontSize: 52, marginBottom: 16 }}>🎁</div>
            <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 700, marginBottom: 8, fontFamily: 'Heebo, sans-serif' }}>
              רגע לפני שאתה הולך!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24, fontFamily: 'Heebo, sans-serif' }}>
              קבל 10% הנחה על ההזמנה הראשונה שלך
            </p>

            <div style={{
              background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 12, padding: '14px 24px', marginBottom: 24,
            }}>
              <span style={{
                display: 'block', color: '#a855f7', fontSize: 30, fontWeight: 700,
                fontFamily: "'Courier New', monospace", letterSpacing: '0.12em', marginBottom: 6,
              }}>SNIPER10</span>
              <span style={{ color: '#64748b', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>
                * שלח את הקוד בטלגרם בעת ההזמנה
              </span>
            </div>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 14, width: '100%',
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                fontFamily: 'Heebo, sans-serif', textDecoration: 'none', marginBottom: 16,
                boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
              }}
            >
              ✈️ למימוש ההנחה בטלגרם
            </a>
            <p style={{ color: '#475569', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>
              ⏱️ המבצע תקף ל-10 דקות הקרובות
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
