import React from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(255,0,80,0.08)', borderRight: '4px solid #ff0050', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0', color: '#ff6b8a', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>
    💡 {children}
  </div>
);

const TikTokMoney: React.FC = () => (
  <>
    <SEOHead
      title="איך מרוויחים כסף מטיקטוק? המדריך המלא לישראלים | SocialSniper"
      description="Creator Fund, שיתופי פעולה, ליב, אפיליאט — כל דרכי ההכנסה מטיקטוק לישראלים ב-2026."
      keywords="להרוויח כסף מטיקטוק, TikTok Creator Fund ישראל, מוניטיזציה טיקטוק, שיתופי פעולה טיקטוק"
      canonicalPath="/guides/how-to-make-money-tiktok"
    />
    <Header />
    <main style={{ paddingTop: 96 }}>
      <section style={{ padding: '64px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <span style={{ background: 'rgba(255,0,80,0.15)', border: '1px solid rgba(255,0,80,0.3)', borderRadius: 20, padding: '4px 14px', color: '#ff0050', fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>🎵 TikTok</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', margin: '20px 0 16px', fontFamily: 'Heebo, sans-serif' }}>
            איך מרוויחים כסף מטיקטוק? המדריך המלא לישראלים
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto', fontFamily: 'Heebo, sans-serif' }}>
            5 דרכים להפוך את הטיקטוק שלך למקור הכנסה ב-2026
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800, fontFamily: 'Heebo, sans-serif', direction: 'rtl' }}>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 0, marginBottom: 12 }}>כמה עוקבים צריך להרוויח?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            בניגוד לאינסטגרם ויוטיוב, טיקטוק מאפשרת להרוויח גם עם ספורת עוקבים — אבל הרף משתנה לפי המודל. Creator Fund דורש 10,000 עוקבים ו-100,000 צפיות ב-30 יום. שיתופי פעולה עם מותגים? 5,000-10,000 עוקבים כבר מספיקים אם הniche שלך ממוקד.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>1. TikTok Creator Fund</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            הCreator Fund משלם לך לפי צפיות — בממוצע $0.02-$0.04 לאלף צפיות. זה לא הרבה, אבל זה פסיבי. אם הסרטון שלך מגיע למיליון צפיות, אתה מקבל $20-40 ישירות לחשבון. ב-2026 טיקטוק הוסיפה את TikTok Pulse שמשלם יותר לtop 4% יוצרים.
          </p>

          <TipBox>Creator Fund זמין בישראל! הירשם דרך האפליקציה תחת Creator Tools. צריך חשבון בנק אירופאי לקבלת תשלום — פתח חשבון ב-Wise ב-5 דקות.</TipBox>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>2. Live Gifts ומתנות בשידור חי</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            Live הוא אחד הדרכים הכי רווחיות בטיקטוק. הצופים קונים מטבעות וירטואליים ומשלחים לך מתנות שהופכות לכסף אמיתי (60% מהערך). שעה של Live פעיל יכולה להכניס $50-500 לפי גודל הקהל שלך.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>3. שיתופי פעולה עם מותגים</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            ב-2026 מותגים ישראליים מחפשים אינפלואנסרים בטיקטוק יותר מאי פעם. עם 10,000 עוקבים בנiche ממוקד (אוכל, כושר, יופי, טכנולוגיה), אתה יכול לגבות ₪300-1,500 לסרטון. עם 100,000 עוקבים? ₪2,000-10,000.
          </p>

          <TipBox>כדי למשוך מותגים, עשה דף "שיתופי פעולה" בביו שלך עם מייל ליצירת קשר. מותגים מחפשים ביו ראשון — אל תחכה שיחפשו אותך.</TipBox>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>4. אפיליאט מרקטינג</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            TikTok Shop (זמין ב-2026 גם לישראלים דרך VPN) מאפשר להרוויח עמלה על מכירות. אבל גם בלי זה, אתה יכול לקדם מוצרי Amazon, Aliexpress, ו-Fiverr דרך הסרטונים שלך וסביאת קישורים בביו.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>5. מכירת קורסים ושירותים</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            אם אתה מומחה בתחום — טיקטוק הוא מגנט לייד מעולה. בנה קהל בטיקטוק, הפנה אותם לwaitlist, ומכור קורס, ייעוץ, או מוצר דיגיטלי. עם 5,000 עוקבים ממוקדים, מכירה אחת של קורס ב-₪500 = ROI מדהים.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>איך SMM מאיץ את ההכנסות</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            כדי להרוויח מטיקטוק צריך להגיע לסף עוקבים מהר. כל יום שאתה מחכה = הכנסה שמפספסת. שירותי SMM כמו SocialSniper עוזרים לך להגיע ל-10,000 העוקבים הראשונים מהר, מה שמאפשר לך לפתוח Creator Fund, למשוך מותגים, ולהפעיל Live.
          </p>

          <TipBox>קנה 1,000 עוקבים ראשונים ב-SocialSniper, ואז צור תוכן יומי למשך שבועיים. הסכום הקטן שתשלם יחזיר את עצמו ב-Live אחד ראשון.</TipBox>

        </div>
      </section>

      <section style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Heebo, sans-serif' }}>מוכן להתחיל להרוויח מטיקטוק?</h2>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 הגדל עוקבים עכשיו</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default TikTokMoney;
