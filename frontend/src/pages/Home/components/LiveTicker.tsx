import React from 'react';

const ORDERS = [
  { user: 'דניאל מ.', city: 'תל אביב',       service: 'עוקבים לאינסטגרם', amount: '1,000', mins: 2  },
  { user: 'מיכל ג.',  city: 'חיפה',           service: 'לייקים לפייסבוק',  amount: '500',   mins: 5  },
  { user: 'יוסי א.',  city: 'ירושלים',        service: 'צפיות לטיקטוק',   amount: '10,000',mins: 8  },
  { user: 'אורית מ.', city: 'נתניה',          service: 'מנויים ליוטיוב',  amount: '200',   mins: 11 },
  { user: 'שלמה ר.',  city: 'באר שבע',        service: 'עוקבים לטיקטוק',  amount: '2,000', mins: 14 },
  { user: 'ליאת כ.',  city: 'רמת גן',         service: 'לייקים לאינסטגרם',amount: '1,000', mins: 17 },
  { user: 'אמיר נ.',  city: 'ראשון לציון',    service: 'צפיות ריילס',      amount: '50,000',mins: 21 },
  { user: 'דבורה ה.', city: 'פתח תקווה',      service: 'מנויים לטלגרם',   amount: '500',   mins: 25 },
  { user: 'רוני ב.',  city: 'אשדוד',          service: 'עוקבים לאינסטגרם',amount: '5,000', mins: 29 },
  { user: 'נועה ל.',  city: 'הרצליה',         service: 'לייקים לטיקטוק',  amount: '800',   mins: 33 },
];

const LiveTicker: React.FC = () => {

  return (
    <div style={{
      background: 'rgba(10,10,15,0.9)',
      borderTop: '1px solid rgba(16,185,129,0.15)',
      borderBottom: '1px solid rgba(16,185,129,0.15)',
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Label */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 120,
        background: 'linear-gradient(270deg, rgba(10,10,15,1) 60%, transparent)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 16,
        paddingRight: 16,
        gap: 6,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%', background: '#10b981',
          display: 'inline-block', animation: 'tickerPulse 1.5s ease-in-out infinite', flexShrink: 0,
        }} />
        <span style={{ color: '#34d399', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
          LIVE
        </span>
      </div>
      {/* Left fade */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 60,
        background: 'linear-gradient(90deg, rgba(10,10,15,1) 60%, transparent)',
        zIndex: 2,
      }} />

      {/* Scrolling text */}
      <div style={{
        display: 'flex',
        animation: 'tickerScroll 45s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {/* Duplicate for seamless loop */}
        {[0, 1].map(k => (
          <span key={k} style={{ color: '#64748b', fontSize: 13, paddingLeft: k === 0 ? 120 : 0 }}>
            {ORDERS.map((o, i) => (
              <React.Fragment key={`${k}-${i}`}>
                <span style={{ color: '#34d399' }}>🟢</span>
                {' '}
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>{o.user}</span>
                {' '}מ{o.city} רכש{o.user.includes('מ.') || o.user.includes('ר.') || o.user.includes('א.') || o.user.includes('נ.') || o.user.includes('ב.') ? '' : 'ה'}{' '}
                <span style={{ color: 'white', fontWeight: 600 }}>{o.amount} {o.service}</span>
                <span style={{ color: '#334155' }}> לפני {o.mins} דק'</span>
                <span style={{ color: '#1e293b', margin: '0 20px' }}>•</span>
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;
