import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const articles = [
  {
    emoji: '🎓',
    title: 'מה זה SMM?',
    excerpt: 'מדריך מקיף למתחילים: מה זה Social Media Marketing, למה כל עסק צריך את זה, ואיך שירותי SMM יכולים לזרז את הצמיחה שלך.',
    badge: 'מתחילים',
    badgeColor: '#10b981',
    href: '/guides/what-is-smm',
    readTime: '5 דקות קריאה',
  },
  {
    emoji: '📸',
    title: 'איך לגדול באינסטגרם 2026',
    excerpt: 'המדריך המלא לגדילה אורגנית ומואצת באינסטגרם - תוכן, hashtags, שעות פרסום, ושירותים לזירוז התהליך.',
    badge: 'Instagram',
    badgeColor: '#e1306c',
    href: '/guides/grow-instagram',
    readTime: '7 דקות קריאה',
  },
  {
    emoji: '🎵',
    title: 'שיווק בטיקטוק 2026',
    excerpt: 'כל מה שצריך לדעת על אלגוריתם TikTok, FYP, ואיך ליצור סרטונים שהופכים ויראליים. טיפים מהמקצוענים.',
    badge: 'TikTok',
    badgeColor: '#ff0050',
    href: '/guides/tiktok-marketing',
    readTime: '6 דקות קריאה',
  },
  {
    emoji: '🤖',
    title: 'אלגוריתם אינסטגרם 2026',
    excerpt: 'איך עובד האלגוריתם של אינסטגרם, מה משפיע על Reach, ואיך להכות אותו בצורה חוקית ויעילה.',
    badge: 'Instagram',
    badgeColor: '#e1306c',
    href: '/guides/instagram-algorithm-2026',
    readTime: '8 דקות קריאה',
  },
  {
    emoji: '💰',
    title: 'איך לעשות כסף בטיקטוק',
    excerpt: 'המדריך המלא לרווחה מטיקטוק: Creator Fund, Live Gifts, ספונסרים, אפיליאייט ועוד 5 דרכים להרוויח.',
    badge: 'TikTok',
    badgeColor: '#ff0050',
    href: '/guides/how-to-make-money-tiktok',
    readTime: '7 דקות קריאה',
  },
  {
    emoji: '⭐',
    title: 'מדריך ביקורות גוגל',
    excerpt: 'איך לקבל יותר ביקורות לגוגל, איך להגיב לביקורות שליליות, ואיך ביקורות משפרות את הדירוג המקומי.',
    badge: 'Google',
    badgeColor: '#4285f4',
    href: '/guides/google-reviews-guide',
    readTime: '6 דקות קריאה',
  },
  {
    emoji: '⚖️',
    title: 'האם קניית עוקבים חוקית?',
    excerpt: 'כל האמת על חוקיות קניית עוקבים בישראל, מה הסיכונים האמיתיים, ואיך להימנע מהם.',
    badge: 'עובדות',
    badgeColor: '#f59e0b',
    href: '/guides/is-buying-followers-legal-israel',
    readTime: '5 דקות קריאה',
  },
  {
    emoji: '▶️',
    title: 'יוטיוב: ממנויים לרווח 2026',
    excerpt: 'המסלול המלא מ-0 מנויים עד מוניטיזציה - תוכן, SEO ליוטיוב, thumbnails, ושירותים להאצה.',
    badge: 'YouTube',
    badgeColor: '#ff0000',
    href: '/guides/youtube-growth-guide',
    readTime: '9 דקות קריאה',
  },
  {
    emoji: '📘',
    title: 'שיווק בפייסבוק לעסקים 2026',
    excerpt: 'איך להגדיל דף עסקי בפייסבוק, reach אורגני, קבוצות, Boost vs. Ads ואיך לייקים עוזרים.',
    badge: 'Facebook',
    badgeColor: '#1877f2',
    href: '/guides/facebook-marketing-israel',
    readTime: '6 דקות קריאה',
  },
  {
    emoji: '💬',
    title: '10 טיפים לוואטסאפ עסקי',
    excerpt: 'טיפים מעשיים להגדלת קהל לקוחות בוואטסאפ: Broadcast, קטלוג מוצרים, תגובות מהירות ועוד.',
    badge: 'WhatsApp',
    badgeColor: '#25d366',
    href: '/guides/whatsapp-business-tips',
    readTime: '5 דקות קריאה',
  },
  {
    emoji: '⚡',
    title: 'SMM vs פרסום בפייסבוק',
    excerpt: 'השוואה מלאה עם מספרים: עלות, ROI, מהירות. מתי SMM עדיף ומתי Facebook Ads מנצח.',
    badge: 'השוואה',
    badgeColor: '#7c3aed',
    href: '/guides/smm-vs-facebook-ads',
    readTime: '6 דקות קריאה',
  },
  {
    emoji: '🎮',
    title: 'דיסקורד לעסקים — המדריך',
    excerpt: 'איך לבנות קהילת Discord לעסק, הגדרת שרת, ערוצים, בוטים כמו MEE6 ו-Carl-bot, וצמיחת חברים.',
    badge: 'Discord',
    badgeColor: '#5865f2',
    href: '/guides/discord-for-businesses',
    readTime: '7 דקות קריאה',
  },
  {
    emoji: '🚀',
    title: 'SMM למתחילים — כל מה שצריך',
    excerpt: 'מה זה SMM, סוגי שירותים, 5 דברים לבדוק לפני שקונים, תקציב מומלץ ואיך למדוד ROI.',
    badge: 'מתחילים',
    badgeColor: '#10b981',
    href: '/guides/smm-beginners-guide',
    readTime: '5 דקות קריאה',
  },
  {
    emoji: '✅',
    title: 'מדריך הבוסט האולטימטיבי — Checklist',
    excerpt: '8 צעדים מוכחים לבוסט מוצלח: הכנה, ביצוע ואחרי. צ\'קליסט אינטראקטיבי שמציל זמן ומפחית שגיאות.',
    badge: 'כלי עבודה',
    badgeColor: '#7c3aed',
    href: '/guides/ultimate-boost-checklist',
    readTime: '3 דקות',
  },
];

const GuidesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="מדריכים לשיווק ברשתות חברתיות | SocialSniper"
        description="מדריכים מקצועיים בעברית לשיווק ברשתות חברתיות - Instagram, TikTok, Facebook, YouTube. למדו איך לגדול, להגדיל עוקבים ולהגיע ליותר אנשים."
        keywords="מדריך שיווק רשתות חברתיות, SMM מדריך, איך לגדול באינסטגרם, שיווק טיקטוק, שיווק פייסבוק"
      />
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 64, textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            📖 מרכז הידע
          </span>
          <h1 className="section-title" style={{ marginBottom: 20 }}>
            מדריכים{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              מקצועיים
            </span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 48px' }}>
            כל מה שצריך לדעת על שיווק ברשתות חברתיות - ממתחילים ועד מתקדמים, בעברית
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: '13+', label: 'מדריכים' },
              { value: '100%', label: 'בעברית' },
              { value: 'חינם', label: 'לגמרי' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{s.value}</div>
                <div style={{ fontSize: 14, color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {articles.map((article, i) => (
              <Link key={i} to={article.href} style={{ textDecoration: 'none' }}>
                <div
                  className="glass-card"
                  style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column', gap: 16, transition: 'all 0.25s ease', cursor: 'pointer' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-6px)';
                    el.style.borderColor = `${article.badgeColor}35`;
                    el.style.boxShadow = `0 12px 36px ${article.badgeColor}15`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 36 }}>{article.emoji}</span>
                    <div style={{ background: `${article.badgeColor}18`, border: `1px solid ${article.badgeColor}35`, borderRadius: 6, padding: '3px 10px', color: article.badgeColor, fontSize: 11, fontWeight: 700 }}>
                      {article.badge}
                    </div>
                  </div>
                  <h2 style={{ color: 'white', fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}>{article.title}</h2>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                    <span style={{ color: '#64748b', fontSize: 12 }}>⏱️ {article.readTime}</span>
                    <span style={{ color: article.badgeColor, fontSize: 13, fontWeight: 600 }}>קרא עוד →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 64, padding: '40px 48px', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.12))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 24, textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>מוכן להתחיל לגדול?</h2>
            <p style={{ color: '#94a3b8', marginBottom: 24 }}>קרא את המדריכים, ואם תרצה לזרז את הצמיחה - אנחנו כאן</p>
            <a href="https://t.me/socialsniper93_bot" target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 התחל עכשיו בטלגרם</a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .guides-articles { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px) { .guides-articles { grid-template-columns: 1fr !important; } }
      `}</style>
      <Footer />
    </>
  );
};

export default GuidesPage;
