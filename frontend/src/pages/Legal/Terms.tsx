import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const sections = [
  {
    title: '1. קבלת התנאים',
    content: `בשימוש בשירותי SocialSniper ("השירות", "האתר"), הינך מסכים לתנאי שימוש אלו. אם אינך מסכים לתנאים, אנא הפסק להשתמש בשירות. SocialSniper שומרת לעצמה את הזכות לעדכן תנאים אלו בכל עת, ועדכון ייכנס לתוקף עם פרסומו באתר.`,
  },
  {
    title: '2. תיאור השירות',
    content: `SocialSniper מספקת שירותי Social Media Marketing (SMM) הכוללים: הגדלת עוקבים, לייקים, צפיות, תגובות ומדדים חברתיים נוספים בפלטפורמות כגון Instagram, TikTok, Facebook, YouTube, Telegram, Spotify ועוד. השירות מיועד לשיפור נוכחות דיגיטלית ו-Social Proof. SocialSniper אינה מבטיחה המרות, מכירות או תוצאות עסקיות ספציפיות.`,
  },
  {
    title: '3. כשירות המשתמש',
    content: `השירות מיועד למשתמשים בני 18 ומעלה. בשימוש בשירות, המשתמש מצהיר כי הוא בעל סמכות חוקית לשימוש בחשבונות הרשת החברתית לגביהם מוזמן השירות. חל איסור מוחלט להשתמש בשירות לקידום תוכן בלתי חוקי, מטעה, מזיק או מפר זכויות יוצרים.`,
  },
  {
    title: '4. שירותים ומחירים',
    content: `המחירים המוצגים באתר הם בשקלים חדשים (₪) כולל מע"מ. SocialSniper שומרת לעצמה את הזכות לשנות מחירים ללא הודעה מוקדמת. הזמנה שאושרה ושולמה לא תושפע משינוי מחיר. SocialSniper אינה אחראית לכל הפרה של תנאי שימוש של פלטפורמות צד שלישי.`,
  },
  {
    title: '5. ביטולים והחזרות',
    content: `הזמנה שהחלה להתבצע אינה ניתנת לביטול. הזמנה שטרם החלה ניתנת לביטול תוך שעה מאישורה. במקרה של כשל טכני מצידנו שמנע מסירה מלאה, ניתן לקבל קרדיט, Refill, או החזר כספי חלקי לפי שיקול דעת SocialSniper. אין החזרות עבור שירותים שסופקו במלואם.`,
  },
  {
    title: '6. Refill וערבויות',
    content: `שירותים המסומנים "Non-Drop" מגיעים עם ערבות Refill לתקופה הנקובה בכל שירות. Refill ינתן אך ורק כאשר: (א) הפרופיל נותר ציבורי, (ב) הירידה היא בעוקבים/לייקים ממש ולא בשינוי metrics אחרים, (ג) הבקשה הוגשה בתוך תקופת הערבות. SocialSniper אינה מבטיחה שאף פלטפורמה לא תבצע "audit" ותסיר מדדים.`,
  },
  {
    title: '7. הגבלת אחריות',
    content: `SocialSniper מספקת את שירותיה "כמות שהם" (AS IS). SocialSniper לא תהיה אחראית לכל נזק ישיר, עקיף, מקרי, מיוחד או תוצאתי הנובע משימוש בשירות, לרבות: חסימת חשבון רשת חברתית, אובדן הכנסות, פגיעה במוניטין, או שגיאות אלגוריתם. האחריות המקסימלית של SocialSniper תוגבל לסכום ששולם עבור ההזמנה הספציפית.`,
  },
  {
    title: '8. שימוש אסור',
    content: `אסור להשתמש בשירות ל: (א) קידום תוכן טרוריסטי, אלים, גזעני, פורנוגרפי לקטינים, (ב) הונאה ומרמה, (ג) פגיעה בפרטיות צדדים שלישיים, (ד) שימוש מחדש בשירות לצרכי resale ללא אישור מפורש, (ה) כל פעילות בלתי חוקית לפי חוקי מדינת ישראל.`,
  },
  {
    title: '9. קניין רוחני',
    content: `כל התוכן באתר SocialSniper - לוגו, טקסטים, עיצוב, קוד - הם רכושה הבלעדי של SocialSniper ומוגנים בזכויות יוצרים. חל איסור על שכפול, הפצה, שינוי או שימוש מסחרי בתוכן ללא אישור מפורש בכתב.`,
  },
  {
    title: '10. שינויים בשירות',
    content: `SocialSniper שומרת לעצמה את הזכות לשנות, להשהות או להפסיק כל חלק מהשירות בכל עת ללא הודעה מוקדמת. לא תהיה לנו כל אחריות כלפיך או כלפי כל צד שלישי בגין כל שינוי, השהיה, או הפסקת השירות.`,
  },
  {
    title: '11. דין וסמכות שיפוט',
    content: `תנאי שימוש אלו כפופים לחוקי מדינת ישראל. כל סכסוך יידון בבתי המשפט המוסמכים בתל אביב. בכל מקרה של סתירה בין גרסה עברית ותרגום, הגרסה העברית תגבר.`,
  },
];

const Terms: React.FC = () => {
  return (
    <>
      <SEOHead
        title="תנאי שימוש | SocialSniper"
        description="תנאי השימוש של SocialSniper - מדיניות ביטולים, ערבויות, הגבלת אחריות ושאר הוראות משפטיות לשימוש בשירות."
        keywords="תנאי שימוש SocialSniper, מדיניות ביטולים, ערבות עוקבים, שירותי SMM תנאים"
      />
      <Header />

      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#64748b', marginBottom: 40 }}>
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>בית</Link>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>תנאי שימוש</span>
          </nav>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>⚖️ משפטי</span>
            <h1 style={{ color: 'white', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>תנאי שימוש</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              עדכון אחרון: ינואר 2025 | שפה: עברית
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, marginTop: 16 }}>
              ברוכים הבאים ל-SocialSniper. לפני השימוש בשירות, אנא קרא בעיון את תנאי השימוש הבאים. שימוש בשירות מהווה הסכמה לתנאים אלה.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map((sec, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 32px' }}>
                <h2 style={{ color: 'white', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>
                  {sec.title}
                </h2>
                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14 }}>
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
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 12 }}>📬 שאלות משפטיות?</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              לכל שאלה הנוגעת לתנאי השימוש, צור קשר איתנו:
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ color: '#a78bfa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                📧 דף יצירת קשר
              </Link>
              <Link to="/privacy" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                🔒 מדיניות פרטיות →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Terms;
