import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import { TELEGRAM_LINK } from '../../components/Layout/Header';

const About: React.FC = () => {
  const values = [
    { icon: '💰', title: 'מחירים הוגנים', description: 'אנחנו מאמינים שכולם מגיעים לגישה למחירים תחרותיים. ללא תיווך יקר, ישירות ממקור.' },
    { icon: '🇮🇱', title: 'שירות ישראלי', description: 'מבינים את השוק המקומי. תמיכה מלאה בעברית, בשפה שלך ועם הבנה תרבותית.' },
    { icon: '🔒', title: 'שקיפות מלאה', description: 'מחירים ברורים, תנאים שקופים. לא מסתירים כלום – מה שרואים זה מה שמקבלים.' },
    { icon: '⚡', title: 'תוצאות מהירות', description: 'זמן הוא כסף. רוב השירותים שלנו מתחילים תוך שעה ומסתיימים תוך 24 שעות.' },
  ];

  return (
    <>
      <SEOHead
        title="אודות SocialSniper"
        description="הכירו את SocialSniper - הפלטפורמה הישראלית לשירותי SMM. הסיפור שלנו, הערכים שלנו ולמה אנחנו שונים."
        canonicalPath="/about"
      />
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          paddingTop: 120,
          paddingBottom: 80,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
              👋 הסיפור שלנו
            </span>
            <h1 className="section-title" style={{ marginBottom: 20 }}>
              אודות{' '}
              <span style={{
                background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                SocialSniper
              </span>
            </h1>
            <p style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#94a3b8',
              lineHeight: 1.75,
              maxWidth: 650,
              margin: '0 auto',
            }}>
              הפלטפורמה הישראלית שהופכת שיווק ברשתות חברתיות לנגיש, מהיר ומשתלם לכולם.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="section-sm">
          <div className="container" style={{ maxWidth: 820 }}>
            <div className="glass-card" style={{
              padding: '48px',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(37,99,235,0.05) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 20, textAlign: 'center' }}>
                המשימה שלנו 🎯
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: 17, lineHeight: 1.8, textAlign: 'center' }}>
                SocialSniper נוצרה עם מטרה אחת פשוטה: לתת לכל עסק ישראלי, יוצר תוכן, ומשפיען
                גישה לשירותי SMM מקצועיים במחירים שהיו פעם נגישים רק לחברות גדולות.
              </p>
              <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.8, textAlign: 'center', marginTop: 16 }}>
                אנחנו מבינים שבעולם הדיגיטלי של היום, נוכחות חזקה ברשתות חברתיות היא לא מותרות – היא הכרחות.
                לכן אנחנו כאן, עם פתרונות פשוטים, שירות אישי בעברית, ומחירים שמתאימים לכולם.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section" aria-label="הערכים שלנו">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 className="section-title">הערכים שמנחים אותנו</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 820, margin: '0 auto' }}>
              {values.map((v, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '32px 28px', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-4px)';
                    el.style.borderColor = 'rgba(124,58,237,0.3)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-sm" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
              {[
                { num: '10+', label: 'פלטפורמות' },
                { num: '50+', label: 'שירותים' },
                { num: '1K+', label: 'לקוחות' },
                { num: '24/7', label: 'תמיכה' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: 36,
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: 6,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 15 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: 'white', marginBottom: 16 }}>
              מוכן להצטרף לאלפי לקוחות מרוצים?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 32 }}>
              צור קשר עוד היום ותתחיל לראות תוצאות.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" style={{ fontSize: 16, padding: '13px 32px' }}>
                צפה בשירותים
              </Link>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram"
                style={{ fontSize: 16, padding: '13px 32px' }}
              >
                📱 פנה אלינו בטלגרם
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 600px) {
          section[aria-label="הערכים שלנו"] .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default About;
