import React from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const reasons = [
  {
    icon: '💰',
    title: 'מחירים הכי נמוכים',
    description: 'קנה שירותים ישירות ממחסן - ללא תיווך יקר. אנחנו מבטיחים את המחיר הטוב ביותר בשוק.',
    color: '#10b981',
  },
  {
    icon: '⚡',
    title: 'מסירה מהירה',
    description: 'רוב השירותים מתחילים תוך שעה אחת. ראה תוצאות עוד היום, לא בעוד שבוע.',
    color: '#f59e0b',
  },
  {
    icon: '🇮🇱',
    title: 'שירות ישראלי',
    description: 'תמיכה מלאה בעברית. מדברים את השפה שלך ומבינים את השוק המקומי.',
    color: '#3b82f6',
  },
  {
    icon: '🔄',
    title: 'ערבות Refill',
    description: 'שירותים נבחרים מגיעים עם ערבות Refill. אם המספרים יורדים - אנחנו מחזירים.',
    color: '#8b5cf6',
  },
  {
    icon: '🔒',
    title: 'בטוח ומאובטח',
    description: 'אנחנו לא מבקשים סיסמאות. הפרטים שלך בטוחים לחלוטין. ללא סיכון לחשבון.',
    color: '#06b6d4',
  },
  {
    icon: '📱',
    title: 'תמיכה 24/7',
    description: 'זמינים בטלגרם כל השנה. עונים תוך 30 דקות בימי חול ומהר ביותר תמיד.',
    color: '#ec4899',
  },
];

const WhyChooseUsSection: React.FC = () => {
  const gridRef = useScrollReveal(90);

  return (
    <section className="section" aria-label="למה לבחור בנו">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ✅ למה SocialSniper?
          </span>
          <h2 className="section-title">
            הסיבה שלקוחות{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              בוחרים בנו
            </span>
          </h2>
          <p className="section-subtitle">
            אנחנו לא סתם עוד ספק שירותים. אנחנו הפתרון הכולל לשיווק ברשתות.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="glass-card reveal-card"
              style={{
                padding: '28px 24px',
                transition: 'all 0.25s ease, opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-6px)';
                el.style.borderColor = `${reason.color}40`;
                el.style.boxShadow = `0 12px 36px ${reason.color}18`;
                el.style.background = `${reason.color}08`;
                // Scale icon
                const icon = el.querySelector('.reason-icon') as HTMLElement;
                if (icon) icon.style.transform = 'scale(1.25) rotate(-5deg)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = 'none';
                el.style.background = 'rgba(255,255,255,0.04)';
                const icon = el.querySelector('.reason-icon') as HTMLElement;
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              {/* Icon with color ring */}
              <div style={{ marginBottom: 16, position: 'relative', display: 'inline-block' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${reason.color}15`,
                  border: `1px solid ${reason.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}>
                  <span
                    className="reason-icon"
                    style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                  >
                    {reason.icon}
                  </span>
                </div>
              </div>

              <h3 style={{ color: 'white', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                {reason.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="למה לבחור בנו"] .container > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section[aria-label="למה לבחור בנו"] .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
