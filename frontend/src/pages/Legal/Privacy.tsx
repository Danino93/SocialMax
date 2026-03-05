import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const sections = [
  {
    title: '1. מבוא',
    content: `SocialSniper ("אנחנו", "החברה") מכבדת את פרטיות המשתמשים שלנו. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, ומגנים על מידע אישי שנמסר לנו בעת שימוש בשירות. אנא קרא מדיניות זו בעיון. המשך שימוש בשירות מהווה הסכמה לתנאים המפורטים כאן.`,
  },
  {
    title: '2. המידע שאנו אוספים',
    content: `אנו אוספים את הסוגים הבאים של מידע:
• מידע שנמסר באופן פעיל: שם, כתובת אימייל, מספר טלפון (בעת יצירת קשר בטלגרם)
• קישורי פרופיל ציבוריים לרשתות חברתיות (לצורך ביצוע ההזמנה)
• פרטי הזמנה: שירות שהוזמן, כמות, מחיר ותאריך
• מידע טכני: כתובת IP, סוג דפדפן, מכשיר - לצרכי אבטחה ואנליטיקה
• עוגיות (Cookies) לשיפור חוויית משתמש`,
  },
  {
    title: '3. כיצד אנו משתמשים במידע',
    content: `המידע שנאסף משמש ל:
• עיבוד ואספקת ההזמנות
• תקשורת עם המשתמש לגבי הזמנות ועדכונים
• שיפור השירות ופיתוח פיצ'רים חדשים
• מניעת הונאה ושמירה על אבטחה
• עמידה בדרישות חוק ורגולציה
• שליחת עדכונים ומבצעים (ניתן לביטול בכל עת)`,
  },
  {
    title: '4. שיתוף מידע עם צדדים שלישיים',
    content: `אנו לא מוכרים ולא משכירים מידע אישי לצדדים שלישיים. מידע עשוי להיות משותף רק:
• עם ספקי שירותים הפועלים בשמנו (אחסון, עיבוד תשלומים) ומחויבים לסודיות
• כאשר נדרש על פי חוק, צו בית משפט, או בקשת רשות מוסמכת
• במקרה של מיזוג, רכישה, או העברת פעילות - עם הודעה מוקדמת`,
  },
  {
    title: '5. Cookies ועוגיות',
    content: `האתר משתמש ב-Cookies לצרכים הבאים:
• Cookies הכרחיים: לתפקוד האתר (לא ניתן לכיבוי)
• Cookies אנליטיים: Google Analytics לניתוח תנועה (אנונימי)
• Cookies פונקציונליים: שמירת העדפות משתמש

ניתן לנהל Cookies בהגדרות הדפדפן שלך. השבתת Cookies עלולה לפגוע בחלק מתפקודי האתר.`,
  },
  {
    title: '6. אבטחת מידע',
    content: `אנו נוקטים אמצעי אבטחה סבירים להגנה על המידע שלך:
• הצפנת HTTPS לכל תקשורת עם האתר
• אחסון מידע בשרתים מאובטחים
• גישה מוגבלת למידע אישי לעובדים המורשים בלבד
• ביקורות אבטחה תקופתיות

חשוב לדעת: שום מערכת אינה מאובטחת ב-100%. אנו ממליצים לא לשתף מידע רגיש מעבר לנדרש.`,
  },
  {
    title: '7. שמירת מידע',
    content: `אנו שומרים מידע אישי כל עוד נדרש לספק את השירות ולעמוד בדרישות חוקיות:
• פרטי הזמנות: עד 3 שנים לאחר ביצוע ההזמנה
• תכתובות תמיכה: עד שנה
• מידע טכני (לוגים): עד 90 יום
• כתובות אימייל לרשימת תפוצה: עד לביטול המנוי`,
  },
  {
    title: '8. זכויות המשתמש (GDPR)',
    content: `בהתאם לרגולציית GDPR ולחוק הגנת הפרטיות הישראלי, המשתמש זכאי ל:
• גישה: לקבל עותק של המידע שנשמר עליו
• תיקון: לתקן מידע שגוי
• מחיקה: לבקש מחיקת המידע ("זכות להישכח")
• הגבלה: להגביל את עיבוד המידע
• ניידות: לקבל המידע בפורמט נייד
• התנגדות: להתנגד לשימוש מסוים במידע

לבקשות, פנה אלינו בטלגרם או בדף יצירת הקשר.`,
  },
  {
    title: '9. ילדים',
    content: `השירות אינו מיועד לילדים מתחת לגיל 18. אנו לא אוספים ביודעין מידע מקטינים. אם נודע לנו שנאסף מידע מקטין, נמחק אותו מיידית. הורים המאמינים שילדיהם סיפקו מידע אישי מוזמנים לפנות אלינו.`,
  },
  {
    title: '10. שינויים במדיניות',
    content: `אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו בכל עת. שינויים מהותיים יפורסמו באתר ויישלח עדכון לרשימת התפוצה. המשך שימוש בשירות לאחר פרסום השינויים מהווה הסכמה לנוסח המעודכן.`,
  },
];

const Privacy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="מדיניות פרטיות | SocialSniper"
        description="מדיניות הפרטיות של SocialSniper - כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך. GDPR ועמידה בחוק הגנת פרטיות ישראלי."
        keywords="מדיניות פרטיות, הגנת פרטיות SocialSniper, GDPR, cookies, מידע אישי"
      />
      <Header />

      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#64748b', marginBottom: 40 }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>בית</Link>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>מדיניות פרטיות</span>
          </nav>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>🔒 פרטיות</span>
            <h1 style={{ color: 'white', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>מדיניות פרטיות</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              עדכון אחרון: ינואר 2025 | עומד בדרישות GDPR וחוק הגנת הפרטיות הישראלי
            </p>
            <div style={{
              marginTop: 20,
              padding: '16px 20px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
              <p style={{ color: '#10b981', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                <strong>המחויבות שלנו:</strong> אנחנו לא מוכרים מידע אישי לעולם. לא מבקשים סיסמאות. שומרים רק על מה שנחוץ לאספקת השירות.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map((sec, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 32px' }}>
                <h2 style={{ color: 'white', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>
                  {sec.title}
                </h2>
                <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: 14, whiteSpace: 'pre-line' }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{
            marginTop: 48,
            padding: '32px 36px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
          }}>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>📬 שאלות פרטיות?</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              לבקשות מחיקת מידע, גישה למידע, או כל שאלה הנוגעת לפרטיות - פנה אלינו:
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                📧 דף יצירת קשר
              </Link>
              <Link to="/terms" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                ⚖️ תנאי שימוש →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Privacy;
