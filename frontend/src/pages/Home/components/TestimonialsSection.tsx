import React, { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    name: 'דן לוי',
    role: 'בעל עסק - ניו יורק פיצה',
    platform: 'Instagram',
    platformColor: '#e1306c',
    text: 'תוך 24 שעות ראיתי 800 עוקבים חדשים בדף האינסטגרם שלי. המחיר היה זול מאוד והשירות מצוין.',
    rating: 5,
    avatar: '🍕',
    avatarBg: 'linear-gradient(135deg, #e1306c33, #f5852933)',
    result: '+800 עוקבים',
    resultColor: '#e1306c',
  },
  {
    name: 'מיכל כהן',
    role: 'אינפלואנסרית - יופי ואופנה',
    platform: 'TikTok',
    platformColor: '#ff0050',
    text: 'הסרטון שלי קיבל מיליון צפיות תוך יום! הפרופיל שלי טס קדימה. ממליצה בחום.',
    rating: 5,
    avatar: '💄',
    avatarBg: 'linear-gradient(135deg, #ff005033, #00f2ea33)',
    result: '1M+ צפיות',
    resultColor: '#ff0050',
  },
  {
    name: 'אמיר גולן',
    role: 'מוזיקאי עצמאי',
    platform: 'Spotify',
    platformColor: '#1db954',
    text: 'הוספתי 5,000 השמעות לשיר שלי. עלה לטרנד ותוך שבוע הגעתי לאנשים אמיתיים.',
    rating: 5,
    avatar: '🎵',
    avatarBg: 'linear-gradient(135deg, #1db95433, #19123133)',
    result: '+5K השמעות',
    resultColor: '#1db954',
  },
  {
    name: 'שרון ביטון',
    role: 'יועצת עסקית',
    platform: 'Facebook',
    platformColor: '#1877f2',
    text: 'הדף העסקי שלי קיבל 2,000 לייקים. הנראות גדלה וכבר יש יותר לקוחות. תודה!',
    rating: 5,
    avatar: '💼',
    avatarBg: 'linear-gradient(135deg, #1877f233, #0d5ecc33)',
    result: '+2K לייקים',
    resultColor: '#1877f2',
  },
  {
    name: 'יובל שמש',
    role: 'גיימר ויוטיובר',
    platform: 'YouTube',
    platformColor: '#ff0000',
    text: 'הגעתי ל-1,000 מנויים ועברתי את הסף של מוניטיזציה. SocialSniper עזרו לי להגשים חלום.',
    rating: 5,
    avatar: '🎮',
    avatarBg: 'linear-gradient(135deg, #ff000033, #cc000033)',
    result: '1K מנויים ✓',
    resultColor: '#ff0000',
  },
  {
    name: 'נועה אברהם',
    role: 'מנהלת קבוצת טלגרם',
    platform: 'Telegram',
    platformColor: '#2aabee',
    text: 'הקבוצה שלי גדלה מ-200 ל-1,500 חברים תוך שבוע. כולם Non-Drop, לא ירד מאז.',
    rating: 5,
    avatar: '✈️',
    avatarBg: 'linear-gradient(135deg, #2aabee33, #229ED933)',
    result: '+1,300 חברים',
    resultColor: '#2aabee',
  },
];

const VISIBLE = 3; // cards per slide on desktop

const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const slides = total - VISIBLE + 1; // 0..3

  const next = useCallback(() => {
    setActive(a => (a + 1) % (total - VISIBLE + 1));
  }, [total]);

  // Auto-advance every 4s
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, 4000);
    return () => clearTimeout(t);
  }, [active, paused, next]);

  return (
    <section
      className="section"
      aria-label="ביקורות לקוחות"
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ⭐ מה הלקוחות אומרים
          </span>
          <h2 className="section-title">
            לקוחות{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              מרוצים
            </span>
          </h2>
          <p className="section-subtitle">
            מאות לקוחות מרוצים כבר שיפרו את הנוכחות הדיגיטלית שלהם
          </p>
        </div>

        {/* Carousel track */}
        <div style={{ overflow: 'hidden', margin: '0 -8px' }}>
          <div
            style={{
              display: 'flex',
              gap: 20,
              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: `translateX(calc(${active} * (100% / ${VISIBLE} + 20px / ${VISIBLE}) * -1))`,
              willChange: 'transform',
              padding: '8px 8px 12px',
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  flex: `0 0 calc(${100 / VISIBLE}% - ${20 * (VISIBLE - 1) / VISIBLE}px)`,
                  minWidth: 0,
                  padding: '24px',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.borderColor = `${t.platformColor}35`;
                  el.style.boxShadow = `0 12px 36px ${t.platformColor}18`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Top row: stars + platform */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array(t.rating).fill(null).map((_, si) => (
                      <span key={si} style={{ color: '#fbbf24', fontSize: 15 }}>★</span>
                    ))}
                  </div>
                  <div style={{
                    background: `${t.platformColor}18`,
                    border: `1px solid ${t.platformColor}35`,
                    borderRadius: 6,
                    padding: '3px 8px',
                    color: t.platformColor,
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>
                    {t.platform}
                  </div>
                </div>

                {/* Result badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: `${t.resultColor}12`,
                  border: `1px solid ${t.resultColor}25`,
                  borderRadius: 20,
                  padding: '3px 10px',
                  marginBottom: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  color: t.resultColor,
                }}>
                  📈 {t.result}
                </div>

                {/* Quote */}
                <p style={{
                  color: '#cbd5e1',
                  fontSize: 14,
                  lineHeight: 1.75,
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: t.avatarBg,
                    border: `1px solid ${t.platformColor}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {Array(slides).fill(null).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`עבור לשקף ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-label="ביקורות לקוחות"] .glass-card {
            flex: 0 0 calc(50% - 10px) !important;
          }
        }
        @media (max-width: 580px) {
          section[aria-label="ביקורות לקוחות"] .glass-card {
            flex: 0 0 85vw !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
