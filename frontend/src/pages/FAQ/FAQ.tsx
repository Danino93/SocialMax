import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const faqCategories = [
  {
    category: '🛒 הזמנה ותשלום',
    color: '#7c3aed',
    items: [
      {
        q: 'איך מבצעים הזמנה?',
        a: 'פשוט מאוד - בחר שירות, לחץ "הזמן עכשיו", ותועבר לצ\'אט הטלגרם שלנו. שם תשתף את קישור הפרופיל/פוסט שלך ונסגור את הפרטים.',
      },
      {
        q: 'אילו אמצעי תשלום מקובלים?',
        a: 'אנחנו מקבלים העברה בנקאית, ביט, פייבוקס, Paypal וקריפטו. כל פרטי התשלום יישלחו בצ\'אט הטלגרם.',
      },
      {
        q: 'האם יש מינימום הזמנה?',
        a: 'המינימום נגזר מכל שירות - חלקם מתחילים מ-100 יחידות. ניתן לראות את כמות המינימום בעמוד השירות.',
      },
      {
        q: 'כמה זמן לוקח לקבל אישור הזמנה?',
        a: 'בדרך כלל תוך 30 דקות בימי חול. בסופ"ש ייתכן עיכוב קל. אנחנו זמינים 7 ימים בשבוע.',
      },
    ],
  },
  {
    category: '⚡ מסירה ואיכות',
    color: '#f59e0b',
    items: [
      {
        q: 'כמה זמן לוקח לראות תוצאות?',
        a: 'רוב השירותים מתחילים תוך 1-6 שעות מרגע אישור ההזמנה. יש שירותים שמתחילים תוך דקות. זמן המסירה המלא תלוי בכמות שהוזמנה.',
      },
      {
        q: 'האם העוקבים/לייקים אמיתיים?',
        a: 'אנחנו מציעים שירותים מסוגים שונים - High Quality (פרופילים עם תמונה ופוסטים), Real Mixed, ועוד. הפרטים מפורטים בכל שירות.',
      },
      {
        q: 'מה ה-Drop Rate? האם עוקבים נופלים?',
        a: 'לשירותי Non-Drop שלנו יש ערבות שהמספרים לא ירדו. אם ירד - נעשה Refill בחינם. ראה את תנאי הערבות בכל שירות.',
      },
      {
        q: 'האם ניתן להזמין שירות לפרופיל פרטי?',
        a: 'לא - הפרופיל חייב להיות ציבורי. עבור שירותים שמצריכים קישור לפוסט, גם הפוסט חייב להיות ציבורי.',
      },
    ],
  },
  {
    category: '🔒 בטיחות ואבטחה',
    color: '#06b6d4',
    items: [
      {
        q: 'האם הפעילות בטוחה לחשבון שלי?',
        a: 'כן. אנחנו לא מבקשים סיסמה. כל השירותים עובדים דרך קישור ציבורי בלבד. מסירה הדרגתית שנראית טבעית ולא מעוררת חשד.',
      },
      {
        q: 'למה אתם לא מבקשים סיסמה?',
        a: 'כי אנחנו לא צריכים אותה. כל הפעולות מתבצעות מבחוץ דרך API. שום שירות לגיטימי לא צריך גישה לחשבון שלך.',
      },
      {
        q: 'האם אינסטגרם/טיקטוק יחסמו אותי?',
        a: 'סיכוי נמוך מאוד כאשר המסירה הדרגתית ובכמויות ריאליות. אנחנו לא ממליצים על הזמנות ענק בפעם אחת - עדיף לבנות בהדרגה.',
      },
      {
        q: 'האם המידע שלי מאובטח?',
        a: 'כן. אנחנו שומרים רק את קישור הפרופיל הציבורי שלך. לא שומרים מידע אישי, לא מוכרים לצדדים שלישיים.',
      },
    ],
  },
  {
    category: '🔄 Refill וערבויות',
    color: '#10b981',
    items: [
      {
        q: 'מה זה Refill?',
        a: 'Refill הוא מילוי מחדש - אם הכמות שהזמנת ירדה (עוקבים שביטלו, לייקים שנמחקו), אנחנו ממלאים מחדש ללא עלות.',
      },
      {
        q: 'כמה זמן ערבות ה-Refill תקפה?',
        a: 'תלוי בשירות - יש שירותים עם Refill ל-30 יום ויש ל-90 יום ואפילו לצמיתות. הפרטים מצוינים בכל שירות.',
      },
      {
        q: 'איך מבקשים Refill?',
        a: 'פנה אלינו בטלגרם עם מספר ההזמנה ונטפל מיידית. ודא שהחשבון עדיין ציבורי.',
      },
      {
        q: 'יש ערבות החזר כספי?',
        a: 'אם לא הצלחנו לספק את השירות (דרופ מלא, בעיה טכנית), נציע Refill, קרדיט או החזר - לפי שיקול דעתנו. יצירת קשר בטלגרם.',
      },
    ],
  },
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      <SEOHead
        title="שאלות נפוצות (FAQ) | SocialSniper"
        description="תשובות לכל השאלות על שירותי SMM - הזמנה, תשלום, מסירה, בטיחות, Refill וערבויות. מדריך מלא לשימוש ב-SocialSniper."
        keywords="שאלות נפוצות SMM, FAQ שירותי עוקבים, בטיחות שירותי סושיאל, Refill עוקבים, הזמנת שירותי רשתות חברתיות"
      />
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 64, textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
            ❓ שאלות ותשובות
          </span>
          <h1 className="section-title" style={{ marginBottom: 20 }}>
            שאלות{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              נפוצות
            </span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto' }}>
            כל מה שרצית לדעת על שירותי SMM - מהזמנה ועד ערבויות
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 800 }}>

          {faqCategories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 40 }}>
              {/* Category Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: `2px solid ${cat.color}25`,
              }}>
                <h2 style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>{cat.category}</h2>
              </div>

              {/* Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cat.items.map((item, qi) => {
                  const key = `${ci}-${qi}`;
                  const isOpen = openItems.has(key);

                  return (
                    <div
                      key={qi}
                      className="glass-card"
                      style={{
                        padding: 0,
                        overflow: 'hidden',
                        borderColor: isOpen ? `${cat.color}30` : 'rgba(255,255,255,0.08)',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%',
                          padding: '18px 24px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 16,
                          textAlign: 'right',
                          fontFamily: 'Heebo, sans-serif',
                        }}
                      >
                        <span style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>{item.q}</span>
                        <span style={{
                          color: cat.color,
                          fontSize: 20,
                          fontWeight: 300,
                          transition: 'transform 0.25s',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}>
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 24px 20px',
                          color: '#94a3b8',
                          fontSize: 14,
                          lineHeight: 1.8,
                          borderTop: `1px solid rgba(255,255,255,0.05)`,
                          paddingTop: 16,
                        }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div style={{
            padding: '40px 48px',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.12))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
            <h2 style={{ color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              עדיין יש לך שאלה?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: 24 }}>
              אנחנו זמינים בטלגרם ועונים תוך 30 דקות בימי חול
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                📱 שאל בטלגרם
              </a>
              <Link to="/contact" className="btn-primary">
                צור קשר →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQ;
