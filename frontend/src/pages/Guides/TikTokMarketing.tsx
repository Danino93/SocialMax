import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const TikTokMarketing: React.FC = () => {
  return (
    <>
      <SEOHead
        title="שיווק בטיקטוק 2025 - המדריך המלא | SocialSniper"
        description="מדריך שיווק TikTok 2025: איך לעלות ל-FYP, אלגוריתם טיקטוק, טיפים לסרטונים ויראליים, וכיצד שירותי boost יכולים לעזור."
        keywords="שיווק טיקטוק, TikTok FYP, אלגוריתם TikTok, סרטונים ויראליים, עוקבים טיקטוק"
      />
      <Header />

      <article style={{ paddingTop: 100 }}>
        <div className="container" style={{ paddingTop: 32, paddingBottom: 0 }}>
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#64748b' }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>בית</Link>
            <span>›</span>
            <Link to="/guides" style={{ color: '#64748b', textDecoration: 'none' }}>מדריכים</Link>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>שיווק בטיקטוק</span>
          </nav>
        </div>

        <section style={{ padding: '48px 0 64px' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <span style={{ background: 'rgba(255,0,80,0.12)', border: '1px solid rgba(255,0,80,0.25)', borderRadius: 6, padding: '3px 10px', color: '#ff0050', fontSize: 12, fontWeight: 700 }}>TikTok</span>
              <span style={{ color: '#64748b', fontSize: 13 }}>⏱️ 6 דקות קריאה</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 42, fontWeight: 800, lineHeight: 1.3, marginBottom: 20 }}>
              שיווק ב{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff0050, #00f2ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                TikTok 2025
              </span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.8 }}>
              TikTok הוא הפלטפורמה עם הצמיחה המהירה ביותר. מיליארד משתמשים פעילים מחפשים תוכן כל יום - זה הזמן שלך לנצל את זה.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 800 }}>

            {/* Stats */}
            <div className="glass-card" style={{ padding: '24px 32px', marginBottom: 32, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
              {[
                { value: '1B+', label: 'משתמשים פעילים' },
                { value: '167', label: 'דקות ביום בממוצע' },
                { value: '90%', label: 'גולשים כמה פעמים ביום' },
                { value: '55%', label: 'מגיל 18-34' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#ff0050' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* FYP */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🔥 מה זה FYP ואיך להגיע לשם?
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
                <strong style={{ color: '#e2e8f0' }}>FYP (For You Page)</strong> הוא עמוד ה-"בשבילך" - ה-feed המרכזי של TikTok. רוב המשתמשים בילים 90% מהזמן בFYP. הגעה לFYP = חשיפה לאלפי ומיליוני אנשים.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { factor: '⏱️ Completion Rate', desc: 'כמה אחוז מהסרטון אנשים רואים עד הסוף. מעל 70% = מעולה' },
                  { factor: '❤️ Engagement Rate', desc: 'לייקים + תגובות + שיתופים + שמירות לחלק ל-Views' },
                  { factor: '↩️ Re-watches', desc: 'אנשים שצופים שוב = סיגנל חזק שהתוכן טוב' },
                  { factor: '💬 תגובות', desc: 'תגובות עם מילים חיוביות מגבירות distribution' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '14px 18px', background: 'rgba(255,0,80,0.05)', borderRadius: 10 }}>
                    <div style={{ color: 'white', fontWeight: 600, marginBottom: 4 }}>{item.factor}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tips */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
                🎬 10 טיפים לסרטון ויראלי
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { num: '01', tip: 'Hook חזק ב-3 שניות הראשונות', detail: 'אם לא תתפוס תשומת לב מיידית - יעברו הלאה' },
                  { num: '02', tip: 'אורך אופטימלי: 15-60 שניות', detail: 'סרטונים קצרים מקבלים completion rate גבוה יותר' },
                  { num: '03', tip: 'כתוביות תמיד', detail: '85% צופים בלי קול - כתוביות מגדילות engagement' },
                  { num: '04', tip: 'מוזיקה טרנדית', detail: 'השתמש במוזיקה מהtop charts - האלגוריתם מגביר אותה' },
                  { num: '05', tip: 'אל תדחה - פרסם', detail: 'TikTok נותן לכל סרטון "test window" - אל תסרב לנסות' },
                  { num: '06', tip: 'Trending sounds ו-effects', detail: 'שלב trends פעילים - האלגוריתם "מעלה" אותם' },
                  { num: '07', tip: 'CTA בסוף הסרטון', detail: '"עקבו לעוד תוכן כזה" - מגדיל המרה לעוקבים' },
                  { num: '08', tip: 'פרסם 3-5 פעמים ביום', detail: 'TikTok מתגמל שכיחות גבוהה יותר מפלטפורמות אחרות' },
                  { num: '09', tip: 'ענה לתגובות בסרטון', detail: 'תגובות → Reply Video → Engagement כפול' },
                  { num: '10', tip: 'Duet ו-Stitch', detail: 'שלב תוכן פופולרי - מקבל חשיפה לקהל הסרטון המקורי' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ color: '#ff0050', fontWeight: 800, fontSize: 13, minWidth: 28, opacity: 0.7 }}>{item.num}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 600, marginBottom: 2 }}>{item.tip}</div>
                      <div style={{ color: '#64748b', fontSize: 13 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Boost Section */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24, borderColor: 'rgba(255,0,80,0.2)' }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                ⚡ שירותי Boost לטיקטוק
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
                שירותי boost לTikTok נותנים לסרטון "דחיפה" ראשונית שמגדילה את הסיכוי להגיע לFYP:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {[
                  { icon: '👁️', text: 'צפיות TikTok', link: '/buy/tiktok-views' },
                  { icon: '❤️', text: 'לייקים TikTok', link: '/buy/tiktok-likes' },
                  { icon: '👤', text: 'עוקבים TikTok', link: '/services/tiktok' },
                  { icon: '💬', text: 'תגובות TikTok', link: '/services/tiktok' },
                ].map((item, i) => (
                  <Link key={i} to={item.link} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 18px',
                    background: 'rgba(255,0,80,0.06)',
                    border: '1px solid rgba(255,0,80,0.15)',
                    borderRadius: 10,
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,0,80,0.12)';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,0,80,0.06)';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{
              padding: '36px 40px',
              background: 'linear-gradient(135deg, rgba(255,0,80,0.12), rgba(0,242,234,0.08))',
              border: '1px solid rgba(255,0,80,0.2)',
              borderRadius: 20,
              textAlign: 'center',
            }}>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                מוכן לכבוש את טיקטוק?
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: 24 }}>
                שירותי TikTok של SocialSniper - עוקבים, צפיות ולייקים מהירים ואיכותיים
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/services/tiktok" className="btn-primary" style={{ background: 'linear-gradient(135deg, #ff0050, #00f2ea)' }}>
                  🎵 שירותי TikTok →
                </Link>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                  📱 שאל אותנו
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/guides/grow-instagram" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>← איך לגדול באינסטגרם</Link>
              <Link to="/guides" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>כל המדריכים →</Link>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default TikTokMarketing;
