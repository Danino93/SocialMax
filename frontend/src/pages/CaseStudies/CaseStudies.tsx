import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(15,15,26,0.95)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8, padding: '8px 12px', fontFamily: 'Heebo, sans-serif', direction: 'rtl',
    }}>
      <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>{label}</p>
      <p style={{ color: payload[0].color, fontSize: 13, fontWeight: 700 }}>
        {payload[0].value.toLocaleString('he-IL')} {payload[0].name}
      </p>
    </div>
  );
};

const cases = [
  {
    id: 1,
    client: 'L. Boutique — בוטיק נשים, תל אביב',
    platform: 'Instagram',
    color: '#e1306c',
    emoji: '📸',
    challenge: 'הדף עמד על 340 עוקבים אחרי שנה של פעילות. לא הגענו לקהל היעד ולקוחות פוטנציאליים לא מצאו אותנו.',
    action: 'רכשנו 2,000 עוקבים + 500 לייקים לכל פוסט במשך חודש שלם. הגדלנו את האמינות ושיפרנו את הnראות בחיפוש.',
    result: '8,500 עוקבים פעילים | 40% יותר פניות DM | 3 שיתופי פעולה עם אינפלואנסריות',
    metrics: [
      { label: 'עוקבים לפני', value: '340' },
      { label: 'עוקבים אחרי', value: '8,500' },
      { label: 'גידול', value: '×25' },
    ],
    chartData: [
      { x: 'שבוע 1', y: 340 }, { x: 'שבוע 2', y: 1200 }, { x: 'שבוע 3', y: 3400 },
      { x: 'שבוע 4', y: 5800 }, { x: 'שבוע 5', y: 7200 }, { x: 'שבוע 6', y: 8500 },
    ],
    dataKey: 'עוקבים',
    quote: 'תוך 6 שבועות הפכנו מדף שאיש לא הכיר לדף שאנשים מבינים בו עסק מוביל.',
    quoteAuthor: 'לינור מ., מנהלת L. Boutique',
  },
  {
    id: 2,
    client: 'Barber King — ספרייה לגברים, חיפה',
    platform: 'Google Business',
    color: '#4285f4',
    emoji: '⭐',
    challenge: 'עסק חדש עם 12 ביקורות בגוגל. לקוחות לא מצאו אותנו בחיפוש מקומי ועדפו מתחרים עם יותר ביקורות.',
    action: 'רכשנו 60 ביקורות גוגל במשך 3 שבועות. הדירוג עלה מ-3.8 ל-4.7 כוכבים ועלינו במיקום גוגל מפות.',
    result: '180 ביקורות | מקום #1 בחיפוש "ספר חיפה" | +85% הזמנות חדשות דרך גוגל',
    metrics: [
      { label: 'ביקורות לפני', value: '12' },
      { label: 'ביקורות אחרי', value: '180' },
      { label: 'דירוג', value: '4.7 ⭐' },
    ],
    chartData: [
      { x: 'חודש 1', y: 12 }, { x: 'חודש 2', y: 78 }, { x: 'חודש 3', y: 180 },
    ],
    dataKey: 'ביקורות',
    quote: 'מ-12 ביקורות ל-180 תוך 3 חודשים. אנחנו פשוט לא מפסיקים לקבל לקוחות חדשים.',
    quoteAuthor: 'מוטי ב., בעל Barber King',
  },
  {
    id: 3,
    client: 'StudyPro — קורסי אונליין, ישראל',
    platform: 'YouTube',
    color: '#ff0000',
    emoji: '▶️',
    challenge: 'הערוץ עמד על 200 מנויים. לא עברנו את סף המוניטיזציה של 1,000 מנויים ולא קיבלנו הכנסה מהתוכן.',
    action: 'רכשנו 1,000 מנויים + 5,000 צפיות לסרטונים ישנים. האלגוריתם התחיל לקדם את הסרטונים אורגנית.',
    result: '15,000 מנויים | מוניטיזציה פעילה | הכנסה חודשית מפרסומות: ₪2,400',
    metrics: [
      { label: 'מנויים לפני', value: '200' },
      { label: 'מנויים אחרי', value: '15,000' },
      { label: 'הכנסה חדשה', value: '₪2,400/חודש' },
    ],
    chartData: [
      { x: 'ינו', y: 200 }, { x: 'פבר', y: 1400 }, { x: 'מרץ', y: 3800 },
      { x: 'אפר', y: 7200 }, { x: 'מאי', y: 11000 }, { x: 'יוני', y: 15000 },
    ],
    dataKey: 'מנויים',
    quote: 'הגענו לאלף מנויים בשבוע, וזה גרם לצפיות האורגניות לזנק. עכשיו הערוץ גדל לבד.',
    quoteAuthor: 'ד. ש., מייסד StudyPro',
  },
];

const CaseStudies: React.FC = () => (
  <>
    <SEOHead
      title="סיפורי הצלחה | SocialSniper"
      description="3 סיפורי הצלחה של עסקים ישראליים שגדלו עם SocialSniper. בוטיק אופנה, ספר, קורס אונליין — תוצאות אמיתיות."
      keywords="סיפורי הצלחה SMM, תוצאות SocialSniper, עסקים ישראליים שגדלו, case studies"
      canonicalPath="/case-studies"
    />
    <Header />
    <main>
      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 64, textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>🏆 סיפורי הצלחה</span>
          <h1 className="section-title" style={{ marginBottom: 16 }}>
            לקוחות שהצליחו{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              איתנו
            </span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: 600, margin: '0 auto 16px' }}>
            3 עסקים ישראליים שהפכו את ההשקעה ברשתות החברתיות לתוצאות עסקיות אמיתיות
          </p>
          <p style={{ color: '#475569', fontSize: 12, fontFamily: 'Heebo, sans-serif' }}>
            * שמות לקוחות שונו לבקשתם. הנתונים אמיתיים.
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {cases.map(c => (
            <div
              key={c.id}
              style={{
                borderRadius: 24, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `4px solid ${c.color}`,
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${c.color}15`, border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                  {c.emoji}
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: 17, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>{c.client}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4,
                    background: `${c.color}15`, border: `1px solid ${c.color}30`,
                    borderRadius: 6, padding: '2px 10px',
                    color: c.color, fontSize: 12, fontWeight: 600, fontFamily: 'Heebo, sans-serif',
                  }}>
                    {c.platform}
                  </div>
                </div>
                {/* Metrics */}
                <div style={{ marginRight: 'auto', display: 'flex', gap: 24 }} className="hide-mobile">
                  {c.metrics.map(m => (
                    <div key={m.label} style={{ textAlign: 'center' }}>
                      <div style={{ color: c.color, fontSize: 20, fontWeight: 800, fontFamily: 'Heebo, sans-serif' }}>{m.value}</div>
                      <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'Heebo, sans-serif' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: '#ef4444',
                      fontFamily: 'Heebo, sans-serif', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6,
                    }}>האתגר</div>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>{c.challenge}</p>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: '#f59e0b',
                      fontFamily: 'Heebo, sans-serif', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6,
                    }}>מה עשינו</div>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>{c.action}</p>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: '#10b981',
                      fontFamily: 'Heebo, sans-serif', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6,
                    }}>התוצאה</div>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>{c.result}</p>
                  </div>
                </div>

                {/* Chart */}
                <div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={c.chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="x" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Heebo' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
                        tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="y" name={c.dataKey} stroke={c.color} strokeWidth={3}
                        dot={{ fill: c.color, r: 4 }} isAnimationActive animationDuration={1500} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                margin: '0 32px 32px', padding: 20,
                background: `${c.color}08`, border: `1px solid ${c.color}20`,
                borderRight: `4px solid ${c.color}`, borderRadius: '0 12px 12px 0',
              }}>
                <p style={{ color: '#cbd5e1', fontSize: 14, fontStyle: 'italic', lineHeight: 1.7, fontFamily: 'Heebo, sans-serif', marginBottom: 8 }}>
                  "{c.quote}"
                </p>
                <p style={{ color: c.color, fontSize: 12, fontWeight: 700, fontFamily: 'Heebo, sans-serif' }}>
                  — {c.quoteAuthor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="container" style={{ marginTop: 64 }}>
          <div style={{
            padding: '48px', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.12))',
            border: '1px solid rgba(124,58,237,0.2)', borderRadius: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ color: 'white', fontSize: 28, fontWeight: 700, marginBottom: 12, fontFamily: 'Heebo, sans-serif' }}>
              מוכן לסיפור ההצלחה שלך?
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: 32, fontFamily: 'Heebo, sans-serif' }}>
              הצטרף ל-1,200+ לקוחות מרוצים שכבר שיפרו את הנוכחות הדיגיטלית שלהם
            </p>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram" style={{ fontSize: 16, padding: '14px 36px' }}>
              📱 התחל עכשיו בטלגרם
            </a>
          </div>
        </div>
      </section>
    </main>

    <style>{`
      @media (max-width: 768px) {
        .case-body-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    <Footer />
  </>
);

export default CaseStudies;
