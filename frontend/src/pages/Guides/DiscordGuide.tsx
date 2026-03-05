import React from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(88,101,242,0.08)', borderRight: '4px solid #5865f2', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0', color: '#a5b4fc', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>
    🎮 {children}
  </div>
);

const DiscordGuide: React.FC = () => (
  <>
    <SEOHead
      title="דיסקורד לעסקים — איך לבנות קהילה שמוכרת | SocialSniper"
      description="המדריך לבניית קהילת Discord לעסק. הגדרת שרת, ערוצים, בוטים, וצמיחת חברים — המדריך המלא."
      keywords="דיסקורד לעסקים ישראל, Discord server עסקי, קהילת Discord, גידול חברים Discord"
      canonicalPath="/guides/discord-for-businesses"
    />
    <Header />
    <main style={{ paddingTop: 96 }}>
      <section style={{ padding: '64px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <span style={{ background: 'rgba(88,101,242,0.15)', border: '1px solid rgba(88,101,242,0.3)', borderRadius: 20, padding: '4px 14px', color: '#5865f2', fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>🎮 Discord</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', margin: '20px 0 16px', fontFamily: 'Heebo, sans-serif' }}>דיסקורד לעסקים — איך לבנות קהילה שמוכרת</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto', fontFamily: 'Heebo, sans-serif' }}>דיסקורד לא רק לגיימרים — ב-2026 הוא הפלטפורמה הכי חזקה לבניית קהילה נאמנה</p>
        </div>
      </section>
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800, fontFamily: 'Heebo, sans-serif', direction: 'rtl' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 0, marginBottom: 12 }}>למה דיסקורד לעסקים?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>Discord גדל מ-56M משתמשים ב-2021 ל-200M+ ב-2026. מותגים כמו Nike, Starbucks ו-Louis Vuitton כבר מנהלים שם קהילות. בישראל — עסקי gaming, crypto, קורסים, ופיתוח תוכנה כבר שם. הסוד: Discord נותן engagement של 70%+ לעומת 2-5% בפייסבוק.</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>מבנה שרת Discord מנצח לעסק</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 12 }}>שרת טוב מחולק לקטגוריות ברורות:</p>
          <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
            <li><strong style={{ color: 'white' }}>📢 הודעות</strong> — announcements, עדכונים, מבצעים (read-only)</li>
            <li><strong style={{ color: 'white' }}>💬 כללי</strong> — שיחה פתוחה, היכרות, off-topic</li>
            <li><strong style={{ color: 'white' }}>🆘 תמיכה</strong> — שאלות ותשובות, help desk</li>
            <li><strong style={{ color: 'white' }}>🎯 niche ספציפי</strong> — לפי תחום העסק שלך</li>
            <li><strong style={{ color: 'white' }}>👑 VIP</strong> — ערוץ סגור ללקוחות משלמים</li>
          </ul>
          <TipBox>ערוץ VIP סגור = הכי טוב למכור. "הצטרף ל-50 החברים שמקבלים 20% הנחה" → מוביל אנשים לקנות רק כדי לגשת לערוץ.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>בוטים שכדאי להתקין</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
            <li><strong style={{ color: 'white' }}>MEE6</strong> — ניהול רמות, auto-roles, ברכת חברים חדשים</li>
            <li><strong style={{ color: 'white' }}>Carl-bot</strong> — reaction roles (בחר תפקיד = גישה לערוצים)</li>
            <li><strong style={{ color: 'white' }}>Statbot</strong> — סטטיסטיקות על פעילות השרת</li>
            <li><strong style={{ color: 'white' }}>Ticket Tool</strong> — מערכת תמיכה בטיקטים</li>
          </ul>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>איך לצמוח ב-Discord?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>פרסם את הDiscord בכל פלטפורמה אחרת — אינסטגרם, טיקטוק, יוטיוב. עשה Giveaways שדורשות להצטרף לשרת. שתף פ ב-Discord Discovery (אם השרת ציבורי). הפעל Events שבועיים — פגישות Zoom, AMA, gamification.</p>
          <TipBox>הדרך המהירה ביותר לצמוח: שתף לינק לDiscord שלך בסיום כל YouTube video או TikTok. "הצטרף לקהילה הבלעדית ←" — זה הnuance שאנשים מחכים לו.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>עסקים שמצוינים ב-Discord</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>קורסים אונליין, coaching, SaaS, gaming, crypto, NFT, music producers, כלי עסקים — כל מי שמוכר ידע ושייכות. אם אתה יוצר תוכן, Discord הוא "בית" הקהל שלך.</p>
        </div>
      </section>
      <section style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Heebo, sans-serif' }}>רוצה חברים לשרת Discord שלך?</h2>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 הזמן חברים לדיסקורד</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default DiscordGuide;
