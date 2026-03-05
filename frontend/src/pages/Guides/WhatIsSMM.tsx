import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const WhatIsSMM: React.FC = () => {
  return (
    <>
      <SEOHead
        title="מה זה SMM? מדריך שיווק ברשתות חברתיות 2025 | SocialSniper"
        description="מה זה SMM (Social Media Marketing)? מדריך מקיף בעברית - הגדרה, שירותים, יתרונות, ואיך להשתמש בשירותי SMM כדי לגדול מהר יותר."
        keywords="מה זה SMM, Social Media Marketing עברית, שיווק רשתות חברתיות, עוקבים לייקים צפיות, SMM ישראל"
      />
      <Header />

      <article style={{ paddingTop: 100 }}>
        {/* Breadcrumb */}
        <div className="container" style={{ paddingTop: 32, paddingBottom: 0 }}>
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#64748b' }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>בית</Link>
            <span>›</span>
            <Link to="/guides" style={{ color: '#64748b', textDecoration: 'none' }}>מדריכים</Link>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>מה זה SMM?</span>
          </nav>
        </div>

        {/* Hero */}
        <section style={{ padding: '48px 0 64px' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <span style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 6, padding: '3px 10px', color: '#10b981', fontSize: 12, fontWeight: 700 }}>מתחילים</span>
              <span style={{ color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center' }}>⏱️ 5 דקות קריאה</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 42, fontWeight: 800, lineHeight: 1.3, marginBottom: 20 }}>
              מה זה SMM?{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                המדריך המלא
              </span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.8 }}>
              SMM - Social Media Marketing - הוא תחום שיווקי שמתמקד בשימוש ברשתות חברתיות לקידום עסקים, מותגים ואנשים פרטיים. בשנת 2025, נוכחות חזקה ברשתות חברתיות היא כבר לא אופציה - היא הכרח.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 800 }}>

            {/* Section 1 */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🎓 הגדרה: מה זה SMM?
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
                <strong style={{ color: '#e2e8f0' }}>SMM (Social Media Marketing)</strong> הוא שיווק דיגיטלי המשתמש בפלטפורמות כמו Instagram, TikTok, Facebook, YouTube ו-Twitter כדי להגיע לקהל יעד, לבנות מותג ולהגדיל מכירות.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
                SMM כולל שני סוגי פעילות עיקריים:
              </p>
              <ul style={{ color: '#94a3b8', lineHeight: 2, paddingRight: 20 }}>
                <li><strong style={{ color: '#e2e8f0' }}>SMM אורגני:</strong> יצירת תוכן, פרסום סדיר, אינטראקציה עם קהל. זה לוקח זמן אבל בונה קהל אמיתי.</li>
                <li><strong style={{ color: '#e2e8f0' }}>SMM ממומן:</strong> פרסום בתשלום (Facebook Ads, TikTok Ads) לקבל חשיפה מהירה לקהל ממוקד.</li>
                <li><strong style={{ color: '#e2e8f0' }}>SMM Panel / שירותי SMM:</strong> רכישת עוקבים, לייקים, צפיות - כדי לתת "דחיפה" לפרופיל ולהשיג Social Proof.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🚀 למה SMM חשוב לעסק שלך?
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '👥', title: 'הגעה לקהל רחב', text: 'מיליארדי משתמשים פעילים ברשתות החברתיות בכל יום' },
                  { icon: '💰', title: 'עלות נמוכה', text: 'שיווק ברשתות חברתיות זול בהרבה מפרסום מסורתי' },
                  { icon: '🎯', title: 'טרגוט מדויק', text: 'אפשר להגיע בדיוק לקהל הנכון לפי גיל, מיקום, תחומי עניין' },
                  { icon: '📊', title: 'מדידה ואנליטיקה', text: 'כל פעולה מדידה - לייקים, שיתופים, קליקים, המרות' },
                  { icon: '🤝', title: 'בניית אמון', text: 'פרופיל עם הרבה עוקבים ולייקים נתפס כאמין ומוסמך יותר' },
                  { icon: '⚡', title: 'תוצאות מהירות', text: 'שירותי SMM יכולים לתת תוצאות תוך שעות ספורות' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ color: 'white', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🛒 שירותי SMM - מה אפשר לקנות?
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
                שירותי SMM panel (כמו SocialSniper) מאפשרים לקנות מדדים חברתיים שנותנים Social Proof ועוזרים לאלגוריתמים לדרג אתכם גבוה יותר:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { platform: '📸 Instagram', services: 'עוקבים, לייקים, צפיות Reels, תגובות, מופיעים בסיפורים' },
                  { platform: '🎵 TikTok', services: 'עוקבים, לייקים, צפיות, שיתופים, הגעה ל-FYP' },
                  { platform: '📘 Facebook', services: 'לייקים לדף, עוקבים, צפיות, תגובות' },
                  { platform: '▶️ YouTube', services: 'מנויים, צפיות, לייקים, שעות צפייה למוניטיזציה' },
                  { platform: '✈️ Telegram', services: 'חברי קבוצה, מנויי ערוץ, צפיות הודעות' },
                  { platform: '🎵 Spotify', services: 'השמעות, עוקבים, שמירות לפלייליסט' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 16,
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 10,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ fontWeight: 700, color: 'white', minWidth: 120, flexShrink: 0 }}>{item.platform}</span>
                    <span style={{ color: '#94a3b8', fontSize: 14 }}>{item.services}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🔒 האם שירותי SMM בטוחים?
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
                שאלה טובה. התשובה הקצרה: <strong style={{ color: '#10b981' }}>כן, אם עושים את זה נכון.</strong>
              </p>
              <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
                <li>✅ <strong style={{ color: '#e2e8f0' }}>לא נדרשת סיסמה</strong> - שירותים לגיטימיים לא מבקשים גישה לחשבון</li>
                <li>✅ <strong style={{ color: '#e2e8f0' }}>Non-Drop</strong> - עוקבים שלא נופלים אחרי ההוספה</li>
                <li>✅ <strong style={{ color: '#e2e8f0' }}>מסירה הדרגתית</strong> - תוספת ריאלית שלא נראית כמו spam</li>
                <li>⚠️ <strong style={{ color: '#fbbf24' }}>הימנע משירותים זולים מאוד</strong> - עלולים לספק בוטים שיפגעו בחשבון</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 40 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
                ❓ שאלות נפוצות
              </h2>
              {[
                { q: 'האם שירותי SMM עובדים?', a: 'כן. הם נותנים Social Proof שמסייע לאלגוריתמים ולאנשים לתפוס את הפרופיל שלך כפופולרי ואמין יותר.' },
                { q: 'כמה זמן לוקח לראות תוצאות?', a: 'רוב השירותים מתחילים תוך 1-24 שעות. יש שירותים שמספקים תוצאות תוך דקות.' },
                { q: 'מה ההבדל בין SMM ל-SEM?', a: 'SMM זה שיווק ברשתות חברתיות, SEM (Search Engine Marketing) זה שיווק במנועי חיפוש כמו גוגל. שניהם חשובים.' },
              ].map((faq, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ color: 'white', fontWeight: 600, marginBottom: 8 }}>❓ {faq.q}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, paddingRight: 24 }}>{faq.a}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              padding: '36px 40px',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.15))',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 20,
              textAlign: 'center',
            }}>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                מוכן לנסות שירותי SMM?
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: 24 }}>
                SocialSniper מציעה שירותי SMM לישראל - מחירים נמוכים, מסירה מהירה, תמיכה בעברית
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/services" className="btn-primary">
                  צפה בשירותים →
                </Link>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                  📱 הזמן בטלגרם
                </a>
              </div>
            </div>

            {/* Related links — SEO internal linking */}
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                מדריכים וכלים קשורים
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: '🎯 קוויז: לאיזו פלטפורמה מתאים לי?', href: '/quiz' },
                  { label: '📦 בנה חבילת SMM', href: '/build' },
                  { label: '✅ מדריך הבוסט האולטימטיבי', href: '/guides/ultimate-boost-checklist' },
                  { label: '🚀 SMM למתחילים', href: '/guides/smm-beginners-guide' },
                  { label: '⚖️ האם קניית עוקבים חוקית?', href: '/guides/is-buying-followers-legal-israel' },
                  { label: '⚡ SMM vs פרסום ממומן', href: '/guides/smm-vs-facebook-ads' },
                  { label: '📸 שירותי אינסטגרם', href: '/services/instagram' },
                  { label: '🎵 שירותי טיקטוק', href: '/services/tiktok' },
                ].map(l => (
                  <Link
                    key={l.href}
                    to={l.href}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 20,
                      color: '#94a3b8',
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#a78bfa'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 0, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/guides" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>← חזרה למדריכים</Link>
              <Link to="/guides/grow-instagram" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>המדריך הבא: איך לגדול באינסטגרם →</Link>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default WhatIsSMM;
