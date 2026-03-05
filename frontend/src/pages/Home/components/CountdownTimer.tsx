import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer: React.FC = () => {
  const endRef = useRef<number>(Date.now() + 3 * 3600 * 1000);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, endRef.current - Date.now());
      if (diff === 0) endRef.current = Date.now() + 3 * 3600 * 1000;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const Digit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: 10, width: 54, height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 16px rgba(124,58,237,0.2)',
      }}>
        <span style={{
          color: '#a855f7', fontSize: 26, fontWeight: 900,
          fontFamily: "'Courier New', monospace", lineHeight: 1,
        }}>
          {pad(value)}
        </span>
      </div>
      <span style={{ color: '#64748b', fontSize: 10, fontFamily: 'Heebo, sans-serif', marginTop: 4 }}>
        {label}
      </span>
    </div>
  );

  const Colon: React.FC = () => (
    <span style={{ color: '#7c3aed', fontSize: 24, fontWeight: 900, marginBottom: 14, alignSelf: 'flex-end', paddingBottom: 6 }}>:</span>
  );

  return (
    <section style={{
      background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))',
      borderTop: '1px solid rgba(124,58,237,0.2)',
      borderBottom: '1px solid rgba(124,58,237,0.2)',
      padding: '16px 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 32, flexWrap: 'wrap',
      }}>
        <span style={{
          color: '#f59e0b', fontSize: 14, fontWeight: 700,
          fontFamily: 'Heebo, sans-serif', direction: 'rtl',
        }}>
          🔥 מבצע מיוחד — קבל 10% הנחה על הזמנה ראשונה! שלח קוד <strong style={{ color: '#a855f7' }}>SNIPER10</strong>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#94a3b8', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>מסתיים בעוד:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Digit value={timeLeft.h} label="שעות" />
            <Colon />
            <Digit value={timeLeft.m} label="דקות" />
            <Colon />
            <Digit value={timeLeft.s} label="שניות" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
