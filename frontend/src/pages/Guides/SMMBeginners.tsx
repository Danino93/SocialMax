import React from 'react';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';

const TipBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: 'rgba(124,58,237,0.08)', borderRight: '4px solid #7c3aed', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0', color: '#a78bfa', fontSize: 14, lineHeight: 1.7, fontFamily: 'Heebo, sans-serif' }}>
    🚀 {children}
  </div>
);

const SMMBeginners: React.FC = () => (
  <>
    <SEOHead
      title="SMM למתחילים — כל מה שצריך לדעת ב-2026 | SocialSniper"
      description="מה זה SMM? סוגי שירותים, איך לבחור ספק, סיכונים ואיך להימנע מהם. המדריך למתחילים."
      keywords="SMM מתחילים, שירותי SMM ישראל, קנה עוקבים מדריך, Social Media Marketing"
      canonicalPath="/guides/smm-beginners-guide"
    />
    <Header />
    <main style={{ paddingTop: 96 }}>
      <section style={{ padding: '64px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex', fontFamily: 'Heebo, sans-serif' }}>🎓 מתחילים</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', margin: '20px 0 16px', fontFamily: 'Heebo, sans-serif' }}>SMM למתחילים — כל מה שצריך לדעת ב-2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto', fontFamily: 'Heebo, sans-serif' }}>מה זה SMM, איך זה עובד, ואיך לבחור שירות שלא ישרוף לך את הכסף</p>
        </div>
      </section>
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: 800, fontFamily: 'Heebo, sans-serif', direction: 'rtl' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 0, marginBottom: 12 }}>מה זה SMM?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>SMM — Social Media Marketing — הוא תחום שמתאר את כל הפעילות שיווקית ברשתות חברתיות. בהקשר של שירותי SMM, הכוונה היא לשירותים שמגדילים מדדים ברשתות חברתיות: עוקבים, לייקים, צפיות, תגובות, ביקורות. זו תעשייה עולמית שנאמדת ב-$13 מיליארד ב-2026.</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>סוגי שירותי SMM</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
            <li><strong style={{ color: 'white' }}>עוקבים</strong> — הגדלת מספר המנויים לפרופיל/דף/ערוץ</li>
            <li><strong style={{ color: 'white' }}>לייקים</strong> — לייקים לפוסטים, תמונות, סרטונים</li>
            <li><strong style={{ color: 'white' }}>צפיות</strong> — צפיות לסרטונים ולStories</li>
            <li><strong style={{ color: 'white' }}>תגובות</strong> — תגובות לפוסטים (ממוחזרות מחשבונות)</li>
            <li><strong style={{ color: 'white' }}>ביקורות</strong> — דירוגים בגוגל, Yelp, TripAdvisor</li>
            <li><strong style={{ color: 'white' }}>השמעות</strong> — plays לSpotify, Apple Music</li>
            <li><strong style={{ color: 'white' }}>חברים לקבוצה</strong> — Telegram, WhatsApp, Discord</li>
          </ul>
          <TipBox>התחל עם עוקבים ולייקים — הם הכי משפיעים על social proof ועל האלגוריתם. תגובות ואינטראקציות מורכבות יותר לקנות ופחות קריטיות בשלב ראשון.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>5 דברים לבדוק לפני שקונים</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.2, paddingRight: 20 }}>
            <li><strong style={{ color: 'white' }}>Refill guarantee</strong> — אם עוקבים יורדים, הספק מחזיר. SocialSniper מציעה 30 יום Refill.</li>
            <li><strong style={{ color: 'white' }}>ללא סיסמא</strong> — ספק שמבקש סיסמא = סכנה. רק URL נדרש.</li>
            <li><strong style={{ color: 'white' }}>Gradual delivery</strong> — מסירה הדרגתית, לא חד-פעמית. 500 עוקבים בשעה אחת = חשוד.</li>
            <li><strong style={{ color: 'white' }}>תמיכה זמינה</strong> — צ'אט או טלגרם. תמיכה בעברית = בונוס גדול.</li>
            <li><strong style={{ color: 'white' }}>ביקורות אמיתיות</strong> — חפש ביקורות מחוץ לאתר הספק.</li>
          </ul>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>תקציב מומלץ לישראלים</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>עסק קטן שרק מתחיל: ₪100-200/חודש. מספיק לקנות 500-1,000 עוקבים + לייקים לפוסטים חשובים. עסק בינוני: ₪300-600/חודש. עסק שרוצה להיות dominant בniche: ₪1,000-2,000/חודש על פני מספר פלטפורמות.</p>
          <TipBox>אל תשקיע הכל ביום הראשון. התחל עם ₪100, ראה תוצאות, ואז הגדל. SMM הוא השקעה — לא הימור.</TipBox>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>איך למדוד ROI</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>מדוד: כמה פניות קיבלת השבוע vs. לפני SMM? כמה לקוחות חדשים אמרו שמצאו אותך בסושיאל? האם יש עלייה בreach האורגני? אם ₪200 ב-SMM הביאו לך לקוח אחד שאצלך שווה ₪1,000 — ROI = 400%. חשב זאת.</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginTop: 40, marginBottom: 12 }}>למה SocialSniper?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: 16 }}>שירות ישראלי עם תמיכה בעברית. 35 שירותים ב-10 פלטפורמות. Refill guarantee. ללא סיסמא. מסירה הדרגתית. תמיכה דרך טלגרם 24/7. מחירים הכי נמוכים בשוק הישראלי.</p>
        </div>
      </section>
      <section style={{ padding: '48px 0', textAlign: 'center', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Heebo, sans-serif' }}>מוכן להתחיל?</h2>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">📱 פנה אלינו עכשיו</a>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SMMBeginners;
