import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const tips = [
  { icon: '📅', title: 'פרסם בעקביות', text: 'לפחות 4-5 פוסטים בשבוע. האלגוריתם אוהב חשבונות פעילים. השתמש בלוח שנה תוכן.' },
  { icon: '#️⃣', title: 'השתמש ב-Hashtags נכון', text: 'שלב hashtags גדולים (1M+), בינוניים (100K-500K) וקטנים (10K-50K). עד 20 hashtags בפוסט.' },
  { icon: '📸', title: 'איכות ויזואלית גבוהה', text: 'תמונות חדות, תאורה טובה, סגנון עקבי. Reels מקבלים הרבה יותר reach מפוסטים רגילים.' },
  { icon: '⏰', title: 'שעות פרסום אופטימליות', text: 'בישראל: 19:00-21:00 בימי חול, 12:00-14:00 בסופ"ש. בדוק ב-Instagram Insights שלך.' },
  { icon: '💬', title: 'ענה על כל תגובה', text: 'Instagram מגביר posts עם אינטראקציה. ענה תוך 30-60 דקות מרגע הפרסום.' },
  { icon: '🎬', title: 'Reels הם המלך', text: 'Reels מקבלים 40% יותר reach מסוגי תוכן אחרים. השקע בסרטונים קצרים ודינמיים.' },
];

const GrowInstagram: React.FC = () => {
  return (
    <>
      <SEOHead
        title="איך לגדול באינסטגרם 2025 - המדריך המלא | SocialSniper"
        description="המדריך המלא לגדילה באינסטגרם 2025: hashtags, שעות פרסום, Reels, engagement, ואיך שירותי עוקבים יכולים לזרז את הצמיחה שלך."
        keywords="איך לגדול באינסטגרם, עוקבים אינסטגרם, hashtags אינסטגרם, Reels, Instagram algorithm 2025"
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
            <span style={{ color: '#94a3b8' }}>איך לגדול באינסטגרם</span>
          </nav>
        </div>

        {/* Hero */}
        <section style={{ padding: '48px 0 64px' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <span style={{ background: 'rgba(225,48,108,0.12)', border: '1px solid rgba(225,48,108,0.25)', borderRadius: 6, padding: '3px 10px', color: '#e1306c', fontSize: 12, fontWeight: 700 }}>Instagram</span>
              <span style={{ color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center' }}>⏱️ 7 דקות קריאה</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 42, fontWeight: 800, lineHeight: 1.3, marginBottom: 20 }}>
              איך לגדול{' '}
              <span style={{
                background: 'linear-gradient(135deg, #e1306c, #f58529)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                באינסטגרם 2025
              </span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.8 }}>
              המדריך הכי מקיף בעברית לגדילה באינסטגרם - מתחילים לבניית קהל עוקבים אמיתי ואמין. כולל טיפים עדכניים לאלגוריתם 2025.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: 80 }}>
          <div className="container" style={{ maxWidth: 800 }}>

            {/* Stats Bar */}
            <div className="glass-card" style={{ padding: '24px 32px', marginBottom: 32, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
              {[
                { value: '2B+', label: 'משתמשים פעילים' },
                { value: '500M', label: 'Stories ביום' },
                { value: '40%', label: 'יותר reach ל-Reels' },
                { value: '1-3%', label: 'engagement rate טוב' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#e1306c' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Algorithm Section */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                🤖 איך עובד אלגוריתם אינסטגרם 2025?
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
                האלגוריתם של אינסטגרם מדרג תוכן לפי מספר גורמים מרכזיים:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { factor: 'אינטראקציה', weight: '40%', desc: 'לייקים, תגובות, שמירות ושיתופים - כולם משפיעים' },
                  { factor: 'רלוונטיות', weight: '25%', desc: 'כמה הפוסט קשור לתחומי העניין של הצופה' },
                  { factor: 'עדכניות', weight: '20%', desc: 'תוכן חדש מקבל עדיפות על פני תוכן ישן' },
                  { factor: 'זמן צפייה', weight: '15%', desc: 'כמה זמן אנשים מבלים עם הפוסט שלך' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'rgba(225,48,108,0.05)', borderRadius: 10, alignItems: 'center' }}>
                    <span style={{ color: '#e1306c', fontWeight: 700, fontSize: 16, minWidth: 40 }}>{item.weight}</span>
                    <div>
                      <div style={{ color: 'white', fontWeight: 600, marginBottom: 2 }}>{item.factor}</div>
                      <div style={{ color: '#64748b', fontSize: 13 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Grid */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
                💡 6 טיפים לגדילה מהירה
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {tips.map((tip, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{tip.icon}</div>
                    <div style={{ color: 'white', fontWeight: 600, marginBottom: 8 }}>{tip.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{tip.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Boost Section */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24, borderColor: 'rgba(225,48,108,0.2)' }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                ⚡ שירותי עוקבים - לזרז את הצמיחה
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
                גדילה אורגנית לוקחת זמן. שירותי עוקבים נותנים "דחיפה" ראשונית שמעזרת לאלגוריתם לזהות את הפרופיל שלך כפופולרי:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  '🔥 Social Proof - פרופיל עם 1,000 עוקבים נתפס כאמין יותר מאחד עם 50',
                  '📈 Snowball Effect - יותר עוקבים = יותר חשיפה אורגנית = יותר עוקבים',
                  '🎯 מסירה בטוחה - ללא סיסמה, ללא סיכון לחשבון',
                  '💰 מחיר נמוך - כמה שקלים לאלפי עוקבים איכותיים',
                ].map((item, i) => (
                  <div key={i} style={{ color: '#94a3b8', fontSize: 14, padding: '10px 0' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/services/instagram" className="btn-primary">
                  📸 שירותי אינסטגרם →
                </Link>
                <Link to="/buy/instagram-followers" style={{ color: '#e1306c', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  קנה עוקבים לאינסטגרם →
                </Link>
              </div>
            </div>

            {/* Hashtag Guide */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 40 }}>
              <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                #️⃣ מדריך Hashtags 2025
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
                אסטרטגיית hashtags נכונה יכולה להכפיל את ה-reach שלך:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { type: 'גדולים', range: '1M+', count: '5-7', color: '#ff0000', example: '#food, #travel' },
                  { type: 'בינוניים', range: '50K-500K', count: '8-10', color: '#f59e0b', example: '#ישראל, #אוכל' },
                  { type: 'קטנים', range: '1K-50K', count: '5-8', color: '#10b981', example: 'niche tags' },
                ].map((item, i) => (
                  <div key={i} style={{ background: `${item.color}08`, border: `1px solid ${item.color}25`, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                    <div style={{ color: item.color, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{item.type}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>{item.range}</div>
                    <div style={{ color: 'white', fontWeight: 600 }}>{item.count} hashtags</div>
                    <div style={{ color: '#64748b', fontSize: 11, marginTop: 6 }}>{item.example}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{
              padding: '36px 40px',
              background: 'linear-gradient(135deg, rgba(225,48,108,0.12), rgba(245,133,41,0.12))',
              border: '1px solid rgba(225,48,108,0.2)',
              borderRadius: 20,
              textAlign: 'center',
            }}>
              <h3 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                מוכן להגדיל את הפרופיל שלך?
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: 24 }}>
                שלב את הטיפים האורגניים עם שירותי הדחיפה של SocialSniper לתוצאות מקסימליות
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/services/instagram" className="btn-primary" style={{ background: 'linear-gradient(135deg, #e1306c, #f58529)' }}>
                  📸 שירותי Instagram →
                </Link>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                  📱 שאל אותנו
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link to="/guides/what-is-smm" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}>← מה זה SMM?</Link>
              <Link to="/guides/tiktok-marketing" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>המדריך הבא: שיווק בטיקטוק →</Link>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default GrowInstagram;
