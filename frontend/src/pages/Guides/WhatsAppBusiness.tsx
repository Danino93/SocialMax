import React from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(37,211,102,0.08)', borderRight: '4px solid #25d366', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0', color: '#86efac', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>
    💬 {children}
  </div>
);

const WhatsAppBusiness: React.FC = () => (
  <>
    <SEOHead
      title="וואטסאפ ביזנס — 10 טיפים להגדלת העסק | SocialSniper"
      description="איך להשתמש בוואטסאפ ביזנס נכון? Auto-reply, catalog, broadcast lists, קבוצות — המדריך לעסקים ישראליים."
      keywords="וואטסאפ ביזנס ישראל, WhatsApp Business טיפים, כלי עסקי וואטסאפ"
      canonicalPath="/guides/whatsapp-business-tips"
    />
    <Header />
    <main style={{ paddingTop: 96 }}>
      <section style={{ padding: '64px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <span style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: 20, padding: '4px 14px', color: '#25d366', fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>💬 WhatsApp Business</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', margin: '20px 0 16px', fontFamily: 'Heebo, sans-serif' }}>וואטסאפ ביזנס — 10 טיפים להגדלת העסק</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto', fontFamily: 'Heebo, sans-serif' }}>98% מהישראלים משתמשים בוואטסאפ. הנה איך לגרום לעסק שלך להנות מזה</p>
        </div>
      </section>
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800, fontFamily: 'Heebo, sans-serif', direction: 'rtl' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 0, marginBottom: 12 }}>למה וואטסאפ ביזנס?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>בישראל, וואטסאפ היא ערוץ השירות הפופולרי ביותר. לקוחות מעדיפים לכתוב בוואטסאפ לפני שהם מתקשרים. WhatsApp Business נותן לעסק כלים חינמיים שכמעט שווים ל-CRM קטן: תשובות אוטומטיות, קטלוג מוצרים, תיוגים, ועוד.</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>10 טיפים שישנו את העסק שלך</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.4, paddingRight: 20 }}>
            <li><strong style={{ color: 'white' }}>1. הגדר Quick Replies</strong> — תשובות מוכנות לשאלות הנפוצות (מחיר, שעות, כתובת)</li>
            <li><strong style={{ color: 'white' }}>2. הפעל Away Message</strong> — "קיבלנו את הפנייה שלך! נחזור תוך שעה 🙏"</li>
            <li><strong style={{ color: 'white' }}>3. בנה Catalog</strong> — הוסף את המוצרים/שירותים עם תמונות ומחירים</li>
            <li><strong style={{ color: 'white' }}>4. השתמש בStatus</strong> — עדכוני Status יומיים = Engagement חינמי</li>
            <li><strong style={{ color: 'white' }}>5. צור Broadcast Lists</strong> — שלח מבצעים לכל לקוחות הועברה בפעולה אחת</li>
            <li><strong style={{ color: 'white' }}>6. תייג שיחות</strong> — "לקוח חדש", "ממתין לתשלום", "VIP" — עם תיוגים צבעוניים</li>
            <li><strong style={{ color: 'white' }}>7. קישור ישיר ל-WA</strong> — הוסף wa.me/972XXXXXXXXX לאתר וסושיאל</li>
            <li><strong style={{ color: 'white' }}>8. שלח תזכורות</strong> — תזכורת יום לפני פגישה = פחות ביטולים</li>
            <li><strong style={{ color: 'white' }}>9. בנה קבוצת VIP</strong> — לקוחות חוזרים → קבוצה עם מבצעים בלעדיים</li>
            <li><strong style={{ color: 'white' }}>10. מדוד תגובות</strong> — בדוק איזה Status קיבל יותר תגובות ושכפל אותו</li>
          </ul>
          <TipBox>קישור WA.me הוא הדרך הכי מהירה להגדיל פניות. הוסף אותו לכל פוסט פייסבוק/אינסטגרם. "שלח לנו הודעה ←" → נוח יותר ממספר טלפון.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>WhatsApp Business vs. Personal</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>WhatsApp Business נותן: כרטיס ביקור עסקי, שעות פתיחה, תשובות אוטומטיות, קטלוג, תיוגים, סטטיסטיקות הודעות. הכל בחינם. אין סיבה לנהל עסק עם WhatsApp רגיל.</p>
          <TipBox>השתמש ב-WhatsApp Business API (דרך ספק מורשה) כדי לשלוח הודעות Template אוטומטיות — אישורי הזמנה, תזכורות, עדכוני משלוח. שווה זהב לעסקי e-commerce.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>וואטסאפ כחלק מאסטרטגיית SMM</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>השלב וואטסאפ עם שאר הפלטפורמות: אינסטגרם → Link in Bio → WhatsApp. פייסבוק Ads → "שלח הודעה ב-WhatsApp" CTA. לקוח שמגיע לוואטסאפ כבר חם ומוכן לקנות — שיעור ההמרה הגבוה ביותר מכל ערוץ.</p>
        </div>
      </section>
      <section style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Heebo, sans-serif' }}>רוצה יותר חברים לקבוצת וואטסאפ?</h2>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 הזמן חברים לוואטסאפ</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default WhatsAppBusiness;
