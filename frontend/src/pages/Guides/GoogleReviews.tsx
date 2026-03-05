import React from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(66,133,244,0.08)', borderRight: '4px solid #4285f4', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0', color: '#93c5fd', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>
    💡 {children}
  </div>
);

const GoogleReviews: React.FC = () => (
  <>
    <SEOHead
      title="ביקורות גוגל לעסק — המדריך המלא לישראלים | SocialSniper"
      description="איך לקבל יותר ביקורות גוגל לעסק? Local SEO, Google Maps, תגובה לביקורות שליליות. המדריך המלא."
      keywords="ביקורות גוגל לעסק, Google Reviews ישראל, Local SEO, גוגל מפות דירוג"
      canonicalPath="/guides/google-reviews-guide"
    />
    <Header />
    <main style={{ paddingTop: 96 }}>
      <section style={{ padding: '64px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <span style={{ background: 'rgba(66,133,244,0.15)', border: '1px solid rgba(66,133,244,0.3)', borderRadius: 20, padding: '4px 14px', color: '#4285f4', fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>⭐ Google Business</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', margin: '20px 0 16px', fontFamily: 'Heebo, sans-serif' }}>
            ביקורות גוגל לעסק — המדריך המלא לישראלים
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto', fontFamily: 'Heebo, sans-serif' }}>
            איך להופיע ראשון בגוגל מפות ולהשפיע על עשרות לקוחות חדשים בחודש
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800, fontFamily: 'Heebo, sans-serif', direction: 'rtl' }}>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 0, marginBottom: 12 }}>למה ביקורות גוגל חשובות כל כך?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            97% מהצרכנים קוראים ביקורות אונליין לפני שהם פונים לעסק מקומי. עסק עם 4.5+ כוכבים ו-50+ ביקורות מקבל פי 3 יותר קליקים לעומת עסק עם 10 ביקורות. גוגל מציגה עסקים עם יותר ביקורות ודירוג גבוה יותר בתוצאות המקומיות — מה שמשמעותו יותר לקוחות.
          </p>

          <TipBox>עסק מקומי עם 100+ ביקורות גוגל מגיע בממוצע למקום הראשון בגוגל מפות לחיפושים מקומיים — בלי לשלם על פרסום!</TipBox>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>7 דרכים לקבל יותר ביקורות אורגניות</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
            <li>שלח SMS אוטומטי לכל לקוח 24 שעות אחרי הקנייה עם קישור לביקורת</li>
            <li>הדפס QR Code בדלפק שמוביל ישירות לדף הביקורות</li>
            <li>הכשר עובדים לבקש ביקורת בסיום השירות ("אם היה לכם טוב, נשמח לביקורת...")</li>
            <li>הוסף קישור לביקורת בחתימת המייל</li>
            <li>שתף ביקורות טובות בסושיאל — יגרום לאחרים לכתוב</li>
            <li>ענה על כל ביקורת בתוך 24 שעות — גוגל מחשיב זאת</li>
            <li>השתמש בGoogle Business Profile לפרסום עדכונים</li>
          </ul>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>איך גוגל מדרגת עסקים?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            האלגוריתם של גוגל מחשב שלושה גורמים עיקריים: <strong style={{ color: 'white' }}>רלוונטיות</strong> (כמה אתה מתאים לחיפוש), <strong style={{ color: 'white' }}>מרחק</strong> (כמה אתה קרוב לחיפוש), ו-<strong style={{ color: 'white' }}>פופולריות</strong> (כמה ביקורות יש, מה הדירוג, כמה אנשים לחצו). בגזרת הפופולריות — ביקורות הן המפתח.
          </p>

          <TipBox>גוגל מחשיבה את הרענון של ביקורות. ביקורות חדשות ב-30 הימים האחרונים שוות יותר מביקורות ישנות. לכן חשוב לקבל ביקורות באופן קבוע.</TipBox>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>איך להגיב לביקורות שליליות</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            ביקורת שלילית היא הזדמנות. עסקים שמגיבים לביקורות שליליות בצורה מקצועית נתפסים כאמינים יותר. הנוסחה: הודה, התנצל, הצע פתרון, הזמין לשיחה פרטית. לעולם אל תגיב בכעס.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>שירות קניית ביקורות גוגל — מה שצריך לדעת</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            קניית ביקורות גוגל היא שיטה נפוצה בעולם העסקי. העיקר הוא לקנות ביקורות מספק אמין שמוסיף אותן בהדרגה — לא 50 ביום אחד. SocialSniper מוסיפה ביקורות לאורך 2-3 שבועות, מה שנראה טבעי לאלגוריתם של גוגל.
          </p>

          <TipBox>שלב קניית ביקורות עם הגדלת ביקורות אורגניות. יחס מומלץ: 60% אורגני, 40% מוגבר. כך הצמיחה נראית טבעית לחלוטין.</TipBox>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>מה הדירוג שאתה צריך?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>
            מחקרים מראים שדירוג של 4.7-4.9 הוא האופטימלי. 5.0 מושלם נתפס לפעמים כלא אמין. 4.5+ עם 50+ ביקורות = אמינות מקסימלית. תמקד על להגיע ל-50 ביקורות ראשונות עם דירוג ממוצע של 4.7+.
          </p>

        </div>
      </section>

      <section style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Heebo, sans-serif' }}>רוצה יותר ביקורות גוגל?</h2>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 הזמן ביקורות גוגל</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default GoogleReviews;
