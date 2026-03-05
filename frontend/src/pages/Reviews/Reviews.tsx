import React, { useState } from 'react';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const allReviews = [
  {
    name: 'דן לוי',
    role: 'בעל עסק - ניו יורק פיצה',
    platform: 'Instagram',
    platformEmoji: '📸',
    platformColor: '#e1306c',
    text: 'תוך 24 שעות ראיתי 800 עוקבים חדשים בדף האינסטגרם שלי. המחיר היה זול מאוד והשירות מצוין. ממליץ בחום לכל בית עסק.',
    rating: 5,
    avatar: '🍕',
    result: '+800 עוקבים',
    date: 'ינואר 2025',
    isReturning: true,
    orderCount: 3,
  },
  {
    name: 'מיכל כהן',
    role: 'אינפלואנסרית - יופי ואופנה',
    platform: 'TikTok',
    platformEmoji: '🎵',
    platformColor: '#ff0050',
    text: 'הסרטון שלי קיבל מיליון צפיות תוך יום! הפרופיל שלי טס קדימה. ממליצה בחום לכל מי שרוצה לגדול בטיקטוק.',
    rating: 5,
    avatar: '💄',
    result: '1M+ צפיות',
    date: 'פברואר 2025',
    isReturning: false,
    orderCount: 1,
  },
  {
    name: 'אמיר גולן',
    role: 'מוזיקאי עצמאי',
    platform: 'Spotify',
    platformEmoji: '🎧',
    platformColor: '#1db954',
    text: 'הוספתי 5,000 השמעות לשיר שלי. עלה לטרנד ותוך שבוע הגעתי לאנשים אמיתיים שפלייליסטו אותי. שווה כל שקל.',
    rating: 5,
    avatar: '🎵',
    result: '+5K השמעות',
    date: 'ינואר 2025',
    isReturning: true,
    orderCount: 5,
  },
  {
    name: 'שרון ביטון',
    role: 'יועצת עסקית',
    platform: 'Facebook',
    platformEmoji: '📘',
    platformColor: '#1877f2',
    text: 'הדף העסקי שלי קיבל 2,000 לייקים. הנראות גדלה וכבר יש יותר לקוחות שפונים. תודה לצוות שענו מהר.',
    rating: 5,
    avatar: '💼',
    result: '+2K לייקים',
    date: 'מרץ 2025',
    isReturning: true,
    orderCount: 4,
  },
  {
    name: 'יובל שמש',
    role: 'גיימר ויוטיובר',
    platform: 'YouTube',
    platformEmoji: '▶️',
    platformColor: '#ff0000',
    text: 'הגעתי ל-1,000 מנויים ועברתי את הסף של מוניטיזציה. SocialSniper עזרו לי להגשים חלום שרדפתי אחריו שנה.',
    rating: 5,
    avatar: '🎮',
    result: '1K מנויים ✓',
    date: 'פברואר 2025',
    isReturning: false,
    orderCount: 2,
  },
  {
    name: 'נועה אברהם',
    role: 'מנהלת קבוצת טלגרם',
    platform: 'Telegram',
    platformEmoji: '✈️',
    platformColor: '#2aabee',
    text: 'הקבוצה שלי גדלה מ-200 ל-1,500 חברים תוך שבוע. כולם Non-Drop, לא ירד מאז. שירות מקצועי ומהיר.',
    rating: 5,
    avatar: '✈️',
    result: '+1,300 חברים',
    date: 'ינואר 2025',
    isReturning: true,
    orderCount: 6,
  },
  {
    name: 'תמר פרידמן',
    role: 'מאמנת כושר',
    platform: 'Instagram',
    platformEmoji: '📸',
    platformColor: '#e1306c',
    text: 'הזמנתי 500 עוקבים לאינסטגרם שלי. הגיעו תוך 6 שעות. כבר לקוחות חדשים שאלו אותי "איך גדלת כל כך מהר?"',
    rating: 5,
    avatar: '💪',
    result: '+500 עוקבים',
    date: 'מרץ 2025',
    isReturning: false,
    orderCount: 1,
  },
  {
    name: 'רוני ברק',
    role: 'בעל מסעדה',
    platform: 'Facebook',
    platformEmoji: '📘',
    platformColor: '#1877f2',
    text: 'המחיר זול ממה שציפיתי ורמת השירות גבוהה. הדף של המסעדה קיבל תשומת לב ממשתמשים אמיתיים. שוב בהחלט.',
    rating: 5,
    avatar: '🍽️',
    result: '+3K לייקים',
    date: 'פברואר 2025',
    isReturning: true,
    orderCount: 8,
  },
  {
    name: 'יעל ניר',
    role: 'מעצבת גרפית',
    platform: 'TikTok',
    platformEmoji: '🎵',
    platformColor: '#ff0050',
    text: 'הפרופיל שלי עמד על 200 עוקבים חודשים ארוכים. אחרי שירות מ-SocialSniper קפצתי ל-1,200 תוך יומיים. מדהים!',
    rating: 5,
    avatar: '🎨',
    result: '+1,000 עוקבים',
    date: 'ינואר 2025',
    isReturning: false,
    orderCount: 2,
  },
  {
    name: 'אייל מזרחי',
    role: 'שחקן ומשפיען',
    platform: 'Instagram',
    platformEmoji: '📸',
    platformColor: '#e1306c',
    text: 'הגעתי ל-10,000 עוקבים (Verification threshold) תוך שבוע. שלחתי בקשת וריפיקציה ואושרה! SocialSniper הם פשוט הכי.',
    rating: 5,
    avatar: '🎭',
    result: '10K milestone',
    date: 'מרץ 2025',
    isReturning: true,
    orderCount: 7,
  },
  {
    name: 'דנה שפירא',
    role: 'סטודנטית ויזמת',
    platform: 'YouTube',
    platformEmoji: '▶️',
    platformColor: '#ff0000',
    text: 'ערוץ היוטיוב שלי על קריירה ולימודים הגיע ל-500 מנויים. זה גרם לאנשים אמיתיים להרגיש שאני כבר מוסמכת. תודה!',
    rating: 5,
    avatar: '📚',
    result: '+500 מנויים',
    date: 'פברואר 2025',
    isReturning: false,
    orderCount: 3,
  },
  {
    name: 'ניר שלום',
    role: 'יזם ומנכ"ל',
    platform: 'Twitter',
    platformEmoji: '🐦',
    platformColor: '#1da1f2',
    text: 'השירות מהיר, מדויק, ומחיר הוגן. הגדלתי את מספר העוקבים בטוויטר שלי ב-2,000 תוך 48 שעות. ממליץ לכל עסק.',
    rating: 5,
    avatar: '🚀',
    result: '+2K עוקבים',
    date: 'ינואר 2025',
    isReturning: true,
    orderCount: 5,
  },
];

const platforms = ['הכל', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'Telegram', 'Spotify', 'Twitter'];

const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('הכל');

  const filtered = activeFilter === 'הכל'
    ? allReviews
    : allReviews.filter(r => r.platform === activeFilter);

  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <>
      <SEOHead
        title="ביקורות לקוחות ⭐ | SocialSniper"
        description="ביקורות אמיתיות של לקוחות SocialSniper - מדורג 4.9/5 מ-100+ לקוחות מרוצים. קרא חוות דעת על שירותי עוקבים, לייקים וצפיות."
        keywords="ביקורות SocialSniper, חוות דעת שירותי SMM, לקוחות מרוצים, עוקבים אינסטגרם ביקורות"
      />
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 64, textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-orange" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ⭐ ביקורות לקוחות
          </span>
          <h1 className="section-title" style={{ marginBottom: 20 }}>
            מה הלקוחות{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              אומרים
            </span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 500, margin: '0 auto 48px' }}>
            ביקורות אמיתיות מלקוחות שכבר שיפרו את הנוכחות הדיגיטלית שלהם
          </p>

          {/* Rating Overview */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 32,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '20px 40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>{avgRating}</div>
              <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 6 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: 18 }}>★</span>
                ))}
              </div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>דירוג ממוצע</div>
            </div>
            <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'white' }}>100+</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>לקוחות מרוצים</div>
            </div>
            <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'white' }}>10</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>פלטפורמות</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section style={{ paddingBottom: 32 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setActiveFilter(p)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 20,
                  border: `1px solid ${activeFilter === p ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                  background: activeFilter === p ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                  color: activeFilter === p ? '#a78bfa' : '#64748b',
                  fontSize: 14,
                  fontWeight: activeFilter === p ? 700 : 500,
                  cursor: 'pointer',
                  fontFamily: 'Heebo, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {filtered.map((review, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: 24,
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = `${review.platformColor}35`;
                  el.style.boxShadow = `0 12px 36px ${review.platformColor}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array(review.rating).fill(null).map((_, si) => (
                      <span key={si} style={{ color: '#fbbf24', fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {/* Platform badge */}
                    <div style={{
                      background: `${review.platformColor}18`,
                      border: `1px solid ${review.platformColor}35`,
                      borderRadius: 6,
                      padding: '2px 8px',
                      color: review.platformColor,
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <span>{review.platformEmoji}</span>
                      {review.platform}
                    </div>
                  </div>
                </div>

                {/* Loyalty badge + result */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  {/* Loyalty badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: review.isReturning ? 'rgba(251,191,36,0.1)' : 'rgba(16,185,129,0.1)',
                    border: `1px solid ${review.isReturning ? 'rgba(251,191,36,0.3)' : 'rgba(16,185,129,0.3)'}`,
                    borderRadius: 20,
                    padding: '2px 8px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: review.isReturning ? '#fbbf24' : '#10b981',
                  }}>
                    {review.isReturning ? '🏆 לקוח חוזר' : '⭐ לקוח חדש'}
                    <span style={{ opacity: 0.7 }}>· {review.orderCount} הזמנות</span>
                  </div>
                  {/* Result badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: `${review.platformColor}12`,
                    border: `1px solid ${review.platformColor}25`,
                    borderRadius: 20,
                    padding: '2px 8px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: review.platformColor,
                  }}>
                    📈 {review.result}
                  </div>
                </div>

                {/* Quote */}
                <p style={{
                  color: '#cbd5e1',
                  fontSize: 13,
                  lineHeight: 1.75,
                  marginBottom: 18,
                  fontStyle: 'italic',
                }}>
                  "{review.text}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${review.platformColor}15`,
                    border: `1px solid ${review.platformColor}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}>
                    {review.avatar}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{review.name}</div>
                    <div style={{ color: '#64748b', fontSize: 11 }}>{review.role}</div>
                  </div>
                  <div style={{ marginRight: 'auto', color: '#475569', fontSize: 11 }}>{review.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 64,
            padding: '40px 48px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12))',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⭐</div>
            <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              הצטרף ל-100+ לקוחות מרוצים
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: 24 }}>
              גם אתה יכול לשפר את הנוכחות הדיגיטלית שלך היום
            </p>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
              📱 התחל עכשיו בטלגרם
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section .container > div:first-of-type[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          section .container > div:first-of-type[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default Reviews;
