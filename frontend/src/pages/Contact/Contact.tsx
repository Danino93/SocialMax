import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import { TELEGRAM_LINK } from '../../components/Layout/Header';

const faqItems = [
  { q: 'כמה זמן לוקח לקבל תשובה?', a: 'בימי חול אנחנו עונים תוך 30 דקות. בסופי שבוע – תוך מספר שעות.' },
  { q: 'אפשר לבטל הזמנה?', a: 'הזמנות שעוד לא התחילו – כן. הזמנות שכבר בעיבוד – לא ניתן לבטל.' },
  { q: 'מה אם השירות לא מתחיל?', a: 'אם השירות לא התחיל תוך הזמן המפורסם, צור קשר ונפתור מיד.' },
  { q: 'האם אפשר לקנות בכמות גדולה?', a: 'כן! ללקוחות עם הזמנות גדולות אנחנו נותנים הנחות מיוחדות. פנה אלינו.' },
  { q: 'אילו שיטות תשלום קיימות?', a: 'כרגע אנחנו פועלים דרך טלגרם עם מגוון שיטות תשלום. פנה אלינו לפרטים.' },
  { q: 'האם הפרטים שלי בטוחים?', a: 'אנחנו לא שומרים סיסמאות ולא מבקשים גישה לחשבונות. רק URL או שם משתמש.' },
  { q: 'יש ערבות על השירותים?', a: 'שירותים עם תווית Refill מגיעים עם ערבות. שאר השירותים ללא ירידה מובטחת.' },
  { q: 'לכמה פלטפורמות אתם מספקים שירות?', a: 'אנחנו מספקים לעשר פלטפורמות: Instagram, Facebook, TikTok, YouTube, Telegram, WhatsApp, X, Discord, Spotify, Google.' },
  { q: 'האם יש הנחה ללקוחות חוזרים?', a: 'כן! לקוחות קבועים מקבלים הטבות ומחירים מיוחדים. צור קשר לפרטים.' },
  { q: 'מה ה-URL שצריך לספק?', a: 'עבור כל שירות, צריך לספק את הקישור הישיר לפרופיל, פוסט, סרטון או דף שאליו רוצים לשלוח את השירות.' },
];

const Contact: React.FC = () => {
  return (
    <>
      <SEOHead
        title="צור קשר - SocialSniper"
        description="צור קשר עם צוות SocialSniper דרך טלגרם. עונים תוך 30 דקות בימי חול. שירות לקוחות מהיר ומקצועי."
        canonicalPath="/contact"
      />
      <Header />
      <main>
        {/* Header */}
        <section style={{
          paddingTop: 120,
          paddingBottom: 60,
          textAlign: 'center',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,158,217,0.12) 0%, transparent 60%)',
        }}>
          <div className="container">
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
              📱 זמינים עבורך
            </span>
            <h1 className="section-title" style={{ marginBottom: 14 }}>
              צור{' '}
              <span style={{
                background: 'linear-gradient(135deg, #229ed9, #1a7fc7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                קשר
              </span>
            </h1>
            <p className="section-subtitle">אנחנו כאן לכל שאלה, הצעה או הזמנה</p>
          </div>
        </section>

        {/* Contact Card */}
        <section className="section-sm">
          <div className="container" style={{ maxWidth: 640 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(34,158,217,0.1), rgba(26,127,199,0.05))',
              border: '1px solid rgba(34,158,217,0.2)',
              borderRadius: 24,
              padding: 40,
              textAlign: 'center',
              marginBottom: 32,
            }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>✈️</div>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
                הדרך המהירה ביותר
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                הצוות שלנו זמין בטלגרם 7 ימים בשבוע.
                <br />
                <strong style={{ color: 'white' }}>עונים תוך 30 דקות בימי חול.</strong>
              </p>

              {/* Live status */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 100,
                padding: '8px 18px',
                marginBottom: 28,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#10b981',
                  display: 'inline-block', animation: 'pulseLive 2s ease-in-out infinite',
                }} />
                <span style={{ color: '#34d399', fontSize: 14, fontWeight: 600 }}>זמינים עכשיו</span>
              </div>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram"
                style={{ fontSize: 18, padding: '16px 40px', borderRadius: 14, display: 'inline-flex' }}
              >
                📱 פתח טלגרם
              </a>

              <p style={{ color: '#475569', fontSize: 13, marginTop: 14 }}>
                לחיצה תפתח את הטלגרם ישירות לשיחה איתנו
              </p>
            </div>

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
              {[
                { icon: '🕐', title: 'שעות פעילות', text: 'ימי חול: 09:00-23:00\nשישי-שבת: 10:00-20:00' },
                { icon: '⚡', title: 'זמן מענה', text: 'בימי חול עד 30 דקות\nסוף שבוע עד 2 שעות' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{card.icon}</div>
                  <div style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{card.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{card.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" aria-label="שאלות נפוצות" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              שאלות{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                נפוצות
              </span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqItems.map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                  <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                    {item.q}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes pulseLive {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        @media (max-width: 480px) {
          section .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default Contact;
