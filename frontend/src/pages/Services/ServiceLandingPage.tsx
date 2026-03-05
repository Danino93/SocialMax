import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import { getServiceById } from '../../data/services';
import OrderModal from './components/OrderModal';
import { TELEGRAM_LINK } from '../../components/Layout/Header';

interface LandingConfig {
  serviceId: string;
  h1: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalPath: string;
  platformPath: string;
  color: string;
  gradient: string;
  emoji: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; path: string }[];
}

export const LANDING_PAGES: Record<string, LandingConfig> = {
  'instagram-followers': {
    serviceId: 'ig-followers-basic',
    h1: 'קנה עוקבים לאינסטגרם',
    description: 'הגדל את מספר העוקבים שלך באינסטגרם במהירות. עוקבים אמיתיים, מחירים נמוכים, מסירה תוך שעות.',
    seoTitle: 'קנה עוקבים לאינסטגרם - מחירים נמוכים מ-₪1.90/1000 | SocialSniper',
    seoDescription: 'קנה עוקבים לאינסטגרם במחיר הכי נמוך בישראל. מ-₪1.90 לאלף עוקבים. מסירה מהירה, Non-Drop, תמיכה בעברית. קנייה מאובטחת 100%.',
    seoKeywords: 'קנייה עוקבים אינסטגרם, עוקבים לאינסטגרם, לקנות עוקבים אינסטגרם, עוקבים זולים אינסטגרם',
    canonicalPath: '/buy/instagram-followers',
    platformPath: '/services/instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    emoji: '📸',
    benefits: [
      'עוקבים אמיתיים מגדילים את האמינות ומשיכים עוד עוקבים אורגניים',
      'פרופיל עם יותר עוקבים נראה מהימן יותר ומגדיל סיכוי שיתופי פעולה',
      'האלגוריתם של אינסטגרם מקדם חשבונות עם engagement גבוה',
      'מסירה מהירה - תוצאות ניראות תוך שעות ספורות',
      'ללא צורך בסיסמא - רק קישור לפרופיל',
      'אפשרות Refill - אם יורדים, אנחנו מחזירים',
    ],
    faqs: [
      { q: 'כמה זמן לוקח לקבל עוקבים לאינסטגרם?', a: 'רוב ההזמנות מתחילות תוך 1-6 שעות. בהזמנות גדולות עלול לקחת עד 24 שעות.' },
      { q: 'האם העוקבים אמיתיים?', a: 'אנחנו מספקים עוקבים מחשבונות פעילים. לעוקבים אמיתיים ואיכותיים ביותר, בחר בחבילת Non-Drop.' },
      { q: 'האם זה בטוח לאינסטגרם שלי?', a: 'כן! אנחנו לא מבקשים סיסמא ולא ניגשים לחשבון. רק הקישור הציבורי לפרופיל נדרש.' },
      { q: 'מה אם העוקבים יורדים אחרי קנייה?', a: 'שירות ה-Refill שלנו מכסה ירידה של עוקבים. אם הכמות יורדת, נחדש בחינם.' },
      { q: 'כמה עוקבים אפשר לקנות?', a: 'ניתן לקנות מ-100 עד 100,000 עוקבים בהזמנה אחת. לכמויות גדולות יותר, פנה אלינו בטלגרם.' },
    ],
    relatedLinks: [
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'כל שירותי אינסטגרם', path: '/services/instagram' },
    ],
  },

  'instagram-likes': {
    serviceId: 'ig-likes',
    h1: 'קנה לייקים לאינסטגרם',
    description: 'קנה לייקים לפוסטים שלך באינסטגרם. מחיר מ-₪1.10 לאלף לייקים. מסירה מהירה, ללא סיסמא.',
    seoTitle: 'קנה לייקים לאינסטגרם - מ-₪1.10/1000 לייקים | SocialSniper',
    seoDescription: 'קנה לייקים לפוסטים שלך באינסטגרם. מ-₪1.10 לאלף לייקים. מסירה תוך שעות, ללא סיסמא, תמיכה בעברית. הכי זול בישראל.',
    seoKeywords: 'לייקים לאינסטגרם, קנייה לייקים אינסטגרם, לקנות לייקים אינסטגרם, לייקים זולים',
    canonicalPath: '/buy/instagram-likes',
    platformPath: '/services/instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    emoji: '❤️',
    benefits: [
      'פוסטים עם לייקים רבים מקבלים יותר נראות בפיד ובחיפוש',
      'engagement גבוה שולח אות חיובי לאלגוריתם של אינסטגרם',
      'מסירה מהירה - לייקים מגיעים תוך 1-3 שעות',
      'תואם לכל סוג פוסט: תמונות, ריילס, IGTV',
      'ללא צורך בסיסמא - רק קישור לפוסט הספציפי',
      'אפשר לקנות לייקים לכמה פוסטים במקביל',
    ],
    faqs: [
      { q: 'כמה לייקים אפשר לקנות לאינסטגרם?', a: 'ניתן לקנות מ-50 עד 500,000 לייקים לפוסט אחד.' },
      { q: 'לאיזה סוגי פוסטים אפשר לקנות לייקים?', a: 'לכל סוג: תמונות, וידאו, ריילס, קרוסלות. רק צריך את הקישור לפוסט.' },
      { q: 'כמה זמן מחזיקים הלייקים?', a: 'הלייקים נשארים לצמיתות ברוב המקרים. לשירות עם ערבות, בחר Non-Drop.' },
      { q: 'האם הלייקים נראים אמיתיים?', a: 'כן, הלייקים מגיעים מחשבונות עם פרופיל מלא ופעילות. לא ניתן להבדיל מלייקים אורגניים.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'צפיות לטיקטוק', path: '/buy/tiktok-views' },
      { label: 'כל שירותי אינסטגרם', path: '/services/instagram' },
    ],
  },

  'tiktok-followers': {
    serviceId: 'tt-followers',
    h1: 'קנה עוקבים לטיקטוק',
    description: 'הגדל את מספר העוקבים שלך בטיקטוק. מחיר מ-₪0.90 לאלף. מסירה מהירה ומאובטחת.',
    seoTitle: 'קנה עוקבים לטיקטוק - מ-₪0.90/1000 | SocialSniper',
    seoDescription: 'קנה עוקבים לטיקטוק במחיר נמוך. מ-₪0.90 לאלף עוקבים. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לטיקטוק, קנייה עוקבים טיקטוק, לקנות עוקבים טיקטוק, עוקבים זולים טיקטוק',
    canonicalPath: '/buy/tiktok-followers',
    platformPath: '/services/tiktok',
    color: '#ff0050',
    gradient: 'linear-gradient(135deg, #010101, #ff0050)',
    emoji: '🎵',
    benefits: [
      'חשבון עם עוקבים רבים מגיע יותר מהר לדף "בשבילך" (FYP)',
      'creator fund ותשלומים דורשים מינימום עוקבים',
      'שותפויות ומיתוגים נוצרים הרבה יותר קל עם עוקבים',
      'מחיר נמוך להפליא - מ-90 אגורות לאלף עוקבים',
      'ללא סיסמא - רק קישור לפרופיל',
      'תואם לחשבונות ציבוריים בלבד',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות לטיקטוק?', a: 'ניתן לקנות מ-100 עד 100,000 עוקבים.' },
      { q: 'האם הטיקטוק שלי יוגבל?', a: 'לא. השירות שלנו בטוח לחלוטין. אנחנו לא ניגשים לחשבון ולא מבקשים סיסמא.' },
      { q: 'הפרופיל שלי צריך להיות ציבורי?', a: 'כן, הפרופיל חייב להיות ציבורי כדי לקבל עוקבים.' },
      { q: 'כמה זמן לוקח?', a: 'מרבית ההזמנות מתחילות תוך 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'צפיות לטיקטוק', path: '/buy/tiktok-views' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי טיקטוק', path: '/services/tiktok' },
    ],
  },

  'tiktok-views': {
    serviceId: 'tt-views',
    h1: 'קנה צפיות לטיקטוק',
    description: 'מיליוני צפיות לסרטוני הטיקטוק שלך. המחיר הכי נמוך בשוק - מ-₪0.003 לאלף צפיות.',
    seoTitle: 'קנה צפיות לטיקטוק - מ-₪0.003/1000 | SocialSniper',
    seoDescription: 'קנה צפיות לטיקטוק במחיר שיא נמוך. מ-₪0.003 לאלף צפיות. מסירה תוך 30 דקות. הכי זול בישראל.',
    seoKeywords: 'צפיות לטיקטוק, קנייה צפיות טיקטוק, לקנות צפיות טיקטוק, צפיות זולות טיקטוק',
    canonicalPath: '/buy/tiktok-views',
    platformPath: '/services/tiktok',
    color: '#ff0050',
    gradient: 'linear-gradient(135deg, #010101, #ff0050)',
    emoji: '👁️',
    benefits: [
      'צפיות מרובות מגדילות את הסיכוי להגיע לדף FYP',
      'אחד המחירים הנמוכים ביותר בשוק - פחות מ-1 אגורה לצפייה',
      'מסירה מהירה מאוד - תוך 30 דקות',
      'תואם לכל סרטון טיקטוק',
      'אין צורך בסיסמא',
      'ניתן להזמין מיליוני צפיות',
    ],
    faqs: [
      { q: 'כמה צפיות אפשר לקנות לסרטון טיקטוק?', a: 'ניתן לקנות מ-5,000 עד 10,000,000 צפיות.' },
      { q: 'מה זמן ההתחלה?', a: 'בדרך כלל תוך 30 דקות עד שעה.' },
      { q: 'האם זה יעזור לי לויראלי?', a: 'כן! צפיות רבות מסמנות לאלגוריתם שהתוכן פופולרי, מה שמגדיל חשיפה אורגנית.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'כל שירותי טיקטוק', path: '/services/tiktok' },
    ],
  },

  'facebook-likes': {
    serviceId: 'fb-post-likes',
    h1: 'קנה לייקים לפייסבוק',
    description: 'לייקים לדף הפייסבוק ולפוסטים שלך. מחיר מ-₪0.90 לאלף. מסירה מהירה.',
    seoTitle: 'קנה לייקים לפייסבוק - מ-₪0.90/1000 | SocialSniper',
    seoDescription: 'קנה לייקים לפייסבוק. לדף ולפוסטים. מ-₪0.90 לאלף לייקים. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'לייקים לפייסבוק, קנייה לייקים פייסבוק, לקנות לייקים פייסבוק, לייקים זולים פייסבוק',
    canonicalPath: '/buy/facebook-likes',
    platformPath: '/services/facebook',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5ecc)',
    emoji: '👍',
    benefits: [
      'דפי פייסבוק עם לייקים רבים נראים אמינים ומקצועיים',
      'פוסטים עם engagement גבוה מקבלים יותר הפצה אורגנית',
      'לקוחות חדשים נוטים יותר לעסק שנראה פעיל ומוכר',
      'מחיר הזול ביותר בשוק - ₪0.90 לאלף',
      'מסירה מהירה - תוך 1-6 שעות',
      'ללא סיסמא - רק קישור לפוסט/דף',
    ],
    faqs: [
      { q: 'אפשר לקנות לייקים לדף פייסבוק?', a: 'כן! יש לנו שירות נפרד ללייקים לדף ולייקים לפוסטים ספציפיים.' },
      { q: 'כמה לייקים אפשר לקנות?', a: 'מ-50 עד 100,000 לייקים לפוסט.' },
      { q: 'האם פייסבוק יחסום את הדף שלי?', a: 'לא. השירות שלנו עוקב אחר הנחיות פייסבוק ומגיע בצורה הדרגתית וטבעית.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לפייסבוק', path: '/services/facebook' },
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'כל שירותי פייסבוק', path: '/services/facebook' },
    ],
  },

  'youtube-subscribers': {
    serviceId: 'yt-subscribers',
    h1: 'קנה מנויים ליוטיוב',
    description: 'הגדל את מספר המנויים לערוץ היוטיוב שלך. מחיר מ-₪1.30 לאלף מנויים. מסירה מהירה.',
    seoTitle: 'קנה מנויים ליוטיוב - מ-₪1.30/1000 | SocialSniper',
    seoDescription: 'קנה מנויים לערוץ יוטיוב. מ-₪1.30 לאלף מנויים. עמידה בדרישות מוניטיזציה. תמיכה בעברית.',
    seoKeywords: 'מנויים ליוטיוב, קנייה מנויים יוטיוב, לקנות מנויים יוטיוב, מנויים זולים יוטיוב',
    canonicalPath: '/buy/youtube-subscribers',
    platformPath: '/services/youtube',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    emoji: '▶️',
    benefits: [
      'לעמוד בדרישות מוניטיזציה צריך 1,000 מנויים לפחות',
      'ערוצים עם מנויים רבים מקבלים יותר חשיפה ב-Suggested Videos',
      'מנויים מגדילים אמינות ומשיכים מנויים אורגניים נוספים',
      'מחיר נמוך - מ-₪1.30 לאלף מנויים',
      'ללא צורך בסיסמא',
      'מסירה ב-6-48 שעות',
    ],
    faqs: [
      { q: 'האם אפשר לעמוד בדרישות מוניטיזציה ע"י קנייה?', a: 'כן, הגעה ל-1,000 מנויים בשילוב עם 4,000 שעות צפייה. לשעות צפייה יש לנו שירות נפרד.' },
      { q: 'כמה מנויים אפשר לקנות?', a: 'מ-50 עד 50,000 מנויים.' },
      { q: 'האם המנויים ישארו לאורך זמן?', a: 'ברוב המקרים כן. לשירות עם ערבות מקסימלית, בחר את חבילת Non-Drop.' },
    ],
    relatedLinks: [
      { label: 'צפיות ליוטיוב', path: '/buy/youtube-views' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי יוטיוב', path: '/services/youtube' },
    ],
  },

  'youtube-views': {
    serviceId: 'yt-views',
    h1: 'קנה צפיות ליוטיוב',
    description: 'מיליוני צפיות איכותיות לסרטוני היוטיוב שלך. מחיר מ-₪4.40 לאלף. מסירה תוך שעות.',
    seoTitle: 'קנה צפיות ליוטיוב - מ-₪4.40/1000 | SocialSniper',
    seoDescription: 'קנה צפיות לסרטוני יוטיוב. מ-₪4.40 לאלף צפיות. שיפור הדירוג, תמיכה בעברית, ללא סיסמא.',
    seoKeywords: 'צפיות ליוטיוב, קנייה צפיות יוטיוב, לקנות צפיות יוטיוב, צפיות זולות יוטיוב',
    canonicalPath: '/buy/youtube-views',
    platformPath: '/services/youtube',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    emoji: '▶️',
    benefits: [
      'צפיות רבות משפרות את הדירוג ביוטיוב ומביאות לחשיפה אורגנית',
      'יוטיוב מקדם סרטונים עם צפיות גבוהות בממשק Suggested Videos',
      'מחיר נמוך - ₪4.40 לאלף צפיות',
      'מסירה תוך 1-6 שעות',
      'תואם לכל סרטון יוטיוב',
      'ללא צורך בסיסמא - רק קישור לסרטון',
    ],
    faqs: [
      { q: 'כמה צפיות אפשר לקנות ליוטיוב?', a: 'ניתן לקנות מ-500 עד 100,000,000 צפיות.' },
      { q: 'האם הצפיות ייחשבו לשעות צפייה?', a: 'חלק מהצפיות כן. לצבירת שעות מדויקת, יש לנו שירות ייעודי לשעות צפייה.' },
      { q: 'כמה זמן לוקח?', a: 'מרבית ההזמנות מתחילות תוך 1-6 שעות.' },
      { q: 'האם זה יועיל לדירוג הסרטון?', a: 'כן! צפיות רבות שולחות אות חיובי לאלגוריתם של יוטיוב.' },
    ],
    relatedLinks: [
      { label: 'מנויים ליוטיוב', path: '/buy/youtube-subscribers' },
      { label: 'צפיות לטיקטוק', path: '/buy/tiktok-views' },
      { label: 'כל שירותי יוטיוב', path: '/services/youtube' },
    ],
  },

  'telegram-members': {
    serviceId: 'tg-members',
    h1: 'קנה מנויים לטלגרם',
    description: 'הגדל את הערוץ או הקבוצה שלך בטלגרם. מחיר מ-₪4.50 לאלף חברים. Non-Drop.',
    seoTitle: 'קנה מנויים לטלגרם - מ-₪4.50/1000 | SocialSniper',
    seoDescription: 'קנה מנויים לערוץ או קבוצת טלגרם. מ-₪4.50 לאלף. Non-Drop, מסירה מהירה, תמיכה בעברית.',
    seoKeywords: 'מנויים לטלגרם, קנייה מנויים טלגרם, לקנות מנויים טלגרם, חברים לקבוצת טלגרם',
    canonicalPath: '/buy/telegram-members',
    platformPath: '/services/telegram',
    color: '#2aabee',
    gradient: 'linear-gradient(135deg, #229ed9, #1a7fc7)',
    emoji: '✈️',
    benefits: [
      'ערוצים גדולים נראים מהימנים ומושכים מנויים אורגניים',
      'Non-Drop - החברים נשארים לאורך זמן',
      'לא נדרשת הזמנה אישית - קישור לערוץ ציבורי בלבד',
      'מחיר נמוך - ₪4.50 לאלף חברים',
      'מסירה תוך 1-24 שעות',
      'תואם לערוצים וקבוצות ציבוריות',
    ],
    faqs: [
      { q: 'האם החברים אמיתיים?', a: 'כן, חשבונות פעילים. לאיכות הגבוהה ביותר - Non-Drop.' },
      { q: 'כמה מנויים אפשר לקנות לטלגרם?', a: 'מ-50 עד 200,000 חברים.' },
      { q: 'האם הערוץ צריך להיות ציבורי?', a: 'כן, הערוץ חייב להיות ציבורי לקבלת חברים.' },
      { q: 'כמה זמן לוקח?', a: 'מרבית ההזמנות מגיעות תוך 1-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'צפיות לפוסטים בטלגרם', path: '/services/telegram' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי טלגרם', path: '/services/telegram' },
    ],
  },

  'whatsapp-members': {
    serviceId: 'wa-group-members',
    h1: 'קנה עוקבים לוואטסאפ',
    description: 'הוסף חברים אמיתיים לקבוצת ה-WhatsApp שלך. מחיר מ-₪12 לאלף חברים.',
    seoTitle: 'קנה חברים לקבוצת WhatsApp - מ-₪12/1000 | SocialSniper',
    seoDescription: 'קנה חברים לקבוצת WhatsApp. מ-₪12 לאלף. מסירה מהירה, תמיכה בעברית, ללא סיסמא.',
    seoKeywords: 'חברים לוואטסאפ, מנויים לוואטסאפ, קנייה חברים וואטסאפ, לקנות מנויים לוואטסאפ',
    canonicalPath: '/buy/whatsapp-members',
    platformPath: '/services/whatsapp',
    color: '#25d366',
    gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
    emoji: '💬',
    benefits: [
      'קבוצות גדולות מושכות חברים נוספים - אפקט "social proof"',
      'קבוצה גדולה נראית אמינה יותר ומקצועית',
      'ללא צורך בסיסמא - רק קישור לקבוצה',
      'מסירה תוך 6-24 שעות',
      'ניתן לקנות עד 50,000 חברים',
      'מחיר ₪12 לאלף חברים',
    ],
    faqs: [
      { q: 'האם הקבוצה צריכה להיות ציבורית?', a: 'כן, הקבוצה חייבת להיות פתוחה לקישור הזמנה.' },
      { q: 'כמה חברים אפשר לקנות?', a: 'מ-50 עד 50,000 חברים.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'מנויים לטלגרם', path: '/buy/telegram-members' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי WhatsApp', path: '/services/whatsapp' },
    ],
  },

  'tiktok-likes': {
    serviceId: 'tt-likes',
    h1: 'קנה לייקים לטיקטוק',
    description: 'לייקים אמיתיים לסרטוני הטיקטוק שלך. מחיר מ-₪1.10 לאלף לייקים. מסירה מהירה.',
    seoTitle: 'קנה לייקים לטיקטוק - מ-₪1.10/1000 | SocialSniper',
    seoDescription: 'קנה לייקים לסרטוני טיקטוק. מ-₪1.10 לאלף. מסירה תוך שעות, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'לייקים לטיקטוק, קנייה לייקים טיקטוק, לקנות לייקים טיקטוק, לייקים זולים טיקטוק',
    canonicalPath: '/buy/tiktok-likes',
    platformPath: '/services/tiktok',
    color: '#ff0050',
    gradient: 'linear-gradient(135deg, #010101, #ff0050)',
    emoji: '❤️',
    benefits: [
      'לייקים רבים שולחים אות חיובי לאלגוריתם ומגדילים סיכוי להגיע ל-FYP',
      'engagement גבוה מגדיל חשיפה אורגנית',
      'מסירה מהירה - 1-6 שעות',
      'תואם לכל סרטון טיקטוק',
      'ללא צורך בסיסמא - רק קישור לסרטון',
      'מחיר ₪1.10 לאלף לייקים',
    ],
    faqs: [
      { q: 'כמה לייקים אפשר לקנות לטיקטוק?', a: 'מ-100 עד 500,000 לייקים.' },
      { q: 'כמה זמן לוקח?', a: 'מרבית ההזמנות מתחילות תוך 1-6 שעות.' },
      { q: 'האם זה יעזור לסרטון להגיע ל-FYP?', a: 'כן! engagement גבוה הוא אחד הגורמים שהאלגוריתם בוחן.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'צפיות לטיקטוק', path: '/buy/tiktok-views' },
      { label: 'כל שירותי טיקטוק', path: '/services/tiktok' },
    ],
  },

  'instagram-reels': {
    serviceId: 'ig-views-reels',
    h1: 'קנה צפיות לריילס',
    description: 'מיליוני צפיות לסרטוני ריילס ופוסטי וידאו באינסטגרם. המחיר הנמוך ביותר בישראל.',
    seoTitle: 'קנה צפיות ריילס אינסטגרם - מ-₪0.02/1000 | SocialSniper',
    seoDescription: 'קנה צפיות לריילס ופוסטי וידאו באינסטגרם. מ-₪0.02 לאלף. מסירה תוך 30 דקות. הכי זול בישראל.',
    seoKeywords: 'צפיות ריילס, קנייה צפיות ריילס, לקנות צפיות ריילס, צפיות וידאו אינסטגרם',
    canonicalPath: '/buy/instagram-reels',
    platformPath: '/services/instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    emoji: '🎬',
    benefits: [
      'ריילס עם צפיות גבוהות מגיעים לדף Explore וחשיפה אורגנית',
      'מחיר שיא נמוך - ₪0.02 לאלף צפיות בלבד',
      'מסירה מהירה מאוד - תוך 30 דקות',
      'תואם לריילס, IGTV ופוסטי וידאו',
      'ניתן לקנות עד 50,000,000 צפיות',
      'ללא צורך בסיסמא',
    ],
    faqs: [
      { q: 'כמה צפיות אפשר לקנות לריילס?', a: 'מ-1,000 עד 50,000,000 צפיות.' },
      { q: 'מה זמן ההתחלה?', a: 'מרבית ההזמנות מתחילות תוך 30 דקות.' },
      { q: 'האם זה יעזור לריילס להגיע לחשיפה?', a: 'כן! ריילס עם views גבוהים מקבלים קידום מהאלגוריתם של אינסטגרם.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'כל שירותי אינסטגרם', path: '/services/instagram' },
    ],
  },

  'twitter-followers': {
    serviceId: 'tw-followers',
    h1: 'קנה עוקבים לטוויטר',
    description: 'הגדל את מספר העוקבים שלך ב-X (טוויטר). מסירה תוך 24-72 שעות.',
    seoTitle: 'קנה עוקבים לטוויטר X - | SocialSniper',
    seoDescription: 'קנה עוקבים לחשבון X (טוויטר). מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לטוויטר, קנייה עוקבים טוויטר, לקנות עוקבים X, עוקבים לאקס',
    canonicalPath: '/buy/twitter-followers',
    platformPath: '/services/twitter',
    color: '#1da1f2',
    gradient: 'linear-gradient(135deg, #1da1f2, #0d8bd0)',
    emoji: '🐦',
    benefits: [
      'חשבון עם עוקבים רבים נראה מהימן ומשפיע יותר',
      'עוקבים רבים מגדילים את הסיכוי שתגובותיך יוצגו בראש',
      'ללא צורך בסיסמא',
      'מסירה תוך 24-72 שעות',
      'תואם לחשבונות ציבוריים',
      'מינימום הזמנה 100 עוקבים',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות לטוויטר?', a: 'מ-100 עד 100,000 עוקבים.' },
      { q: 'האם הפרופיל צריך להיות ציבורי?', a: 'כן, הפרופיל חייב להיות ציבורי.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 24-72 שעות.' },
    ],
    relatedLinks: [
      { label: 'לייקים לטוויטר', path: '/services/twitter' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי X/טוויטר', path: '/services/twitter' },
    ],
  },

  'spotify-followers': {
    serviceId: 'sp-followers',
    h1: 'קנה עוקבים לספוטיפיי',
    description: 'הגדל את מספר העוקבים שלך בספוטיפיי. מחיר זול, מסירה מהירה, ללא סיסמא.',
    seoTitle: 'קנה עוקבים לספוטיפיי — SocialSniper',
    seoDescription: 'קנה עוקבים לפרופיל האמן שלך בספוטיפיי. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לספוטיפיי, קנייה עוקבים ספוטיפיי, עוקבים לאמן ספוטיפיי',
    canonicalPath: '/buy/spotify-followers',
    platformPath: '/services/spotify',
    color: '#1db954',
    gradient: 'linear-gradient(135deg, #1db954, #1aa34a)',
    emoji: '🎧',
    benefits: [
      'עוקבים רבים מגדילים את הנוכחות שלך בספוטיפיי ובפלייליסטים',
      'אמנים עם עוקבים רבים מקבלים יותר הצעות לפלייליסטים',
      'ללא סיסמא - רק קישור לפרופיל',
      'מסירה מהירה תוך שעות',
      'מחיר נמוך',
      'תואם לאמנים ופודקאסטים',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות לספוטיפיי?', a: 'מ-100 עד 50,000 עוקבים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא, רק קישור ציבורי לפרופיל.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'השמעות לספוטיפיי', path: '/services/spotify' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי ספוטיפיי', path: '/services/spotify' },
    ],
  },

  'discord-members': {
    serviceId: 'disc-members',
    h1: 'קנה חברים לדיסקורד',
    description: 'הגדל את השרת שלך בדיסקורד. חברים אמיתיים, מחיר זול, מסירה מהירה.',
    seoTitle: 'קנה חברים לשרת דיסקורד — SocialSniper',
    seoDescription: 'קנה חברים לשרת Discord שלך. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'חברים לדיסקורד, קנייה חברים דיסקורד, לקנות חברים Discord',
    canonicalPath: '/buy/discord-members',
    platformPath: '/services/discord',
    color: '#5865f2',
    gradient: 'linear-gradient(135deg, #5865f2, #3c45c5)',
    emoji: '🎮',
    benefits: [
      'שרת עם חברים רבים נראה פעיל ואמין',
      'חברים רבים מגדילים את הסיכוי שאנשים ישארו',
      'ללא סיסמא - רק קישור הזמנה לשרת',
      'מסירה מהירה תוך 6-24 שעות',
      'מינימום הזמנה 50 חברים',
      'תואם לשרתים ציבוריים',
    ],
    faqs: [
      { q: 'כמה חברים אפשר לקנות לדיסקורד?', a: 'מ-50 עד 100,000 חברים.' },
      { q: 'השרת צריך להיות ציבורי?', a: 'כן, צריך לשתף לינק הזמנה.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'מנויים לטלגרם', path: '/buy/telegram-members' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי דיסקורד', path: '/services/discord' },
    ],
  },

  'google-reviews': {
    serviceId: 'gb-reviews',
    h1: 'קנה ביקורות לגוגל',
    description: 'הגדל את מספר ביקורות הגוגל לעסק שלך. שיפור דירוג מקומי ואמינות.',
    seoTitle: 'קנה ביקורות גוגל לעסק — SocialSniper',
    seoDescription: 'קנה ביקורות לגוגל לעסק שלך. שיפור דירוג מקומי, אמינות, לקוחות חדשים.',
    seoKeywords: 'ביקורות גוגל, קנייה ביקורות גוגל, לקנות ביקורות גוגל לעסק',
    canonicalPath: '/buy/google-reviews',
    platformPath: '/services/google-business',
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4, #1a73e8)',
    emoji: '⭐',
    benefits: [
      'ביקורות גוגל משפרות ישירות את הדירוג בחיפוש מקומי',
      'עסקים עם 4.5+ כוכבים מקבלים 28% יותר לחיצות',
      'ביקורות רבות בונות אמינות מיידית',
      'ללא צורך בסיסמא - רק קישור לדף העסק',
      'מסירה מהירה תוך 24-72 שעות',
      'ניתן לבחור דירוג 4 או 5 כוכבים',
    ],
    faqs: [
      { q: 'כמה ביקורות אפשר לקנות לגוגל?', a: 'מ-5 עד 500 ביקורות.' },
      { q: 'הביקורות נשארות לאורך זמן?', a: 'ברוב המקרים כן.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 24-72 שעות.' },
    ],
    relatedLinks: [
      { label: 'ביקורות Google Business', path: '/services/google-business' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי גוגל', path: '/services/google-business' },
    ],
  },

  'instagram-comments': {
    serviceId: 'ig-comments',
    h1: 'קנה תגובות לאינסטגרם',
    description: 'הוסף תגובות אמיתיות לפוסטים שלך באינסטגרם. מגדיל engagement ואמינות.',
    seoTitle: 'קנה תגובות לאינסטגרם — SocialSniper',
    seoDescription: 'קנה תגובות לפוסטים באינסטגרם. תגובות בעברית או אנגלית. מסירה מהירה.',
    seoKeywords: 'תגובות לאינסטגרם, קנייה תגובות אינסטגרם, לקנות תגובות Instagram',
    canonicalPath: '/buy/instagram-comments',
    platformPath: '/services/instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    emoji: '💬',
    benefits: [
      'תגובות רבות מגדילות את engagement rate ומשפיעות על האלגוריתם',
      'פוסטים עם תגובות נראים אמינים ומעוררים סקרנות',
      'ניתן להזמין תגובות מותאמות אישית',
      'מסירה תוך 1-6 שעות',
      'ללא סיסמא - רק קישור לפוסט',
      'תואם לתמונות, ריילס וקרוסלות',
    ],
    faqs: [
      { q: 'כמה תגובות אפשר לקנות?', a: 'מ-10 עד 1,000 תגובות לפוסט.' },
      { q: 'האם אפשר לבקש תוכן ספציפי?', a: 'כן! פנה אלינו בטלגרם.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-6 שעות.' },
    ],
    relatedLinks: [
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי אינסטגרם', path: '/services/instagram' },
    ],
  },

  'instagram-stories': {
    serviceId: 'ig-story-views',
    h1: 'קנה צפיות לסטורי אינסטגרם',
    description: 'מיליוני צפיות לסטוריז שלך באינסטגרם. מחיר שיא נמוך, מסירה תוך 30 דקות.',
    seoTitle: 'קנה צפיות לסטורי אינסטגרם — SocialSniper',
    seoDescription: 'קנה צפיות לסטוריז באינסטגרם. מחיר נמוך, מסירה תוך 30 דקות, ללא סיסמא.',
    seoKeywords: 'צפיות סטורי אינסטגרם, קנייה צפיות story Instagram, לקנות סטורי',
    canonicalPath: '/buy/instagram-stories',
    platformPath: '/services/instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    emoji: '📖',
    benefits: [
      'צפיות גבוהות בסטורי שולחות אות חיובי לאלגוריתם',
      'מחיר שיא נמוך - פחות מאגורה לצפייה',
      'מסירה מהירה מאוד - תוך 30 דקות',
      'תואם לכל סטורי: תמונות, וידאו',
      'ללא צורך בסיסמא',
      'ניתן לקנות עד 100 מיליון צפיות',
    ],
    faqs: [
      { q: 'כמה צפיות אפשר לקנות לסטורי?', a: 'מ-1,000 עד 100,000,000 צפיות.' },
      { q: 'הסטורי צריך להיות פעיל?', a: 'כן, הסטורי חייב להיות פעיל בזמן ההזמנה.' },
      { q: 'מה זמן ההתחלה?', a: 'בדרך כלל תוך 30 דקות.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'צפיות לריילס', path: '/buy/instagram-reels' },
      { label: 'כל שירותי אינסטגרם', path: '/services/instagram' },
    ],
  },

  'facebook-followers': {
    serviceId: 'fb-followers',
    h1: 'קנה עוקבים לפייסבוק',
    description: 'הגדל את מספר העוקבים לדף הפייסבוק שלך. מסירה מהירה, ללא סיסמא.',
    seoTitle: 'קנה עוקבים לפייסבוק — SocialSniper',
    seoDescription: 'קנה עוקבים לדף פייסבוק. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לפייסבוק, קנייה עוקבים פייסבוק, לקנות עוקבים Facebook',
    canonicalPath: '/buy/facebook-followers',
    platformPath: '/services/facebook',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5ecc)',
    emoji: '👥',
    benefits: [
      'דף עם עוקבים רבים נראה אמין ומקצועי',
      'עוקבים מגדילים את הreach האורגני של פוסטים',
      'ללא סיסמא - רק קישור לדף',
      'מסירה תוך 6-24 שעות',
      'תואם לדפים עסקיים ואישיים',
      'מינימום הזמנה 100 עוקבים',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות לפייסבוק?', a: 'מ-100 עד 100,000 עוקבים.' },
      { q: 'ההבדל בין לייקים לעוקבים?', a: 'לייקים הם לחיצות לדף, עוקבים רואים את הפוסטים בפיד.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'לייקים לפייסבוק', path: '/buy/facebook-likes' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי פייסבוק', path: '/services/facebook' },
    ],
  },

  'facebook-comments': {
    serviceId: 'fb-comments',
    h1: 'קנה תגובות לפייסבוק',
    description: 'הוסף תגובות לפוסטים שלך בפייסבוק. מגדיל engagement ואמינות.',
    seoTitle: 'קנה תגובות לפייסבוק — SocialSniper',
    seoDescription: 'קנה תגובות לפוסטים בפייסבוק. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'תגובות לפייסבוק, קנייה תגובות פייסבוק, לקנות תגובות Facebook',
    canonicalPath: '/buy/facebook-comments',
    platformPath: '/services/facebook',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5ecc)',
    emoji: '💬',
    benefits: [
      'תגובות רבות מגדילות reach אורגני בפייסבוק',
      'פוסטים עם תגובות מוצגים ליותר אנשים',
      'ניתן להזמין תגובות בעברית',
      'מסירה תוך 1-12 שעות',
      'ללא סיסמא',
      'תואם לתמונות, וידאו ופוסטים',
    ],
    faqs: [
      { q: 'כמה תגובות אפשר לקנות?', a: 'מ-10 עד 1,000 תגובות.' },
      { q: 'האם אפשר לבקש תוכן ספציפי?', a: 'כן, פנה אלינו בטלגרם.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-12 שעות.' },
    ],
    relatedLinks: [
      { label: 'לייקים לפייסבוק', path: '/buy/facebook-likes' },
      { label: 'עוקבים לפייסבוק', path: '/buy/facebook-followers' },
      { label: 'כל שירותי פייסבוק', path: '/services/facebook' },
    ],
  },

  'tiktok-comments': {
    serviceId: 'tt-comments',
    h1: 'קנה תגובות לטיקטוק',
    description: 'הוסף תגובות אמיתיות לסרטוני הטיקטוק שלך. מגדיל engagement ומגיע ל-FYP.',
    seoTitle: 'קנה תגובות לטיקטוק — SocialSniper',
    seoDescription: 'קנה תגובות לסרטוני טיקטוק. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'תגובות לטיקטוק, קנייה תגובות טיקטוק, לקנות תגובות TikTok',
    canonicalPath: '/buy/tiktok-comments',
    platformPath: '/services/tiktok',
    color: '#ff0050',
    gradient: 'linear-gradient(135deg, #010101, #ff0050)',
    emoji: '💬',
    benefits: [
      'תגובות הן אחד הסיגנלים החזקים לאלגוריתם טיקטוק',
      'סרטונים עם תגובות מקבלים יותר חשיפה ב-FYP',
      'ניתן להזמין תגובות בעברית',
      'מסירה תוך 1-6 שעות',
      'ללא סיסמא',
      'תואם לכל סרטוני טיקטוק',
    ],
    faqs: [
      { q: 'כמה תגובות אפשר לקנות לטיקטוק?', a: 'מ-10 עד 1,000 תגובות.' },
      { q: 'האם אפשר לבקש תוכן ספציפי?', a: 'כן, פנה אלינו בטלגרם.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-6 שעות.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'לייקים לטיקטוק', path: '/buy/tiktok-likes' },
      { label: 'כל שירותי טיקטוק', path: '/services/tiktok' },
    ],
  },

  'twitter-likes': {
    serviceId: 'tw-likes',
    h1: 'קנה לייקים לטוויטר',
    description: 'לייקים לציוצים שלך ב-X (טוויטר). מחיר זול, מסירה מהירה.',
    seoTitle: 'קנה לייקים לטוויטר X — SocialSniper',
    seoDescription: 'קנה לייקים לציוצים ב-X (טוויטר). מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'לייקים לטוויטר, קנייה לייקים טוויטר, לקנות לייקים X',
    canonicalPath: '/buy/twitter-likes',
    platformPath: '/services/twitter',
    color: '#1da1f2',
    gradient: 'linear-gradient(135deg, #1da1f2, #0d8bd0)',
    emoji: '❤️',
    benefits: [
      'ציוצים עם לייקים רבים מקבלים יותר חשיפה ב-X',
      'לייקים רבים מגדילים את engagement rate',
      'ללא צורך בסיסמא',
      'מסירה תוך 1-24 שעות',
      'תואם לכל ציוץ',
      'מינימום הזמנה 50 לייקים',
    ],
    faqs: [
      { q: 'כמה לייקים אפשר לקנות לטוויטר?', a: 'מ-50 עד 100,000 לייקים.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-24 שעות.' },
      { q: 'האם הלייקים נשארים?', a: 'ברוב המקרים כן.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לטוויטר', path: '/buy/twitter-followers' },
      { label: 'ריטוויטים לטוויטר', path: '/buy/twitter-retweets' },
      { label: 'כל שירותי X/טוויטר', path: '/services/twitter' },
    ],
  },

  'twitter-retweets': {
    serviceId: 'tw-retweets',
    h1: 'קנה ריטוויטים לטוויטר',
    description: 'ריטוויטים לציוצים שלך ב-X. מגדיל reach אורגני בצורה מהירה.',
    seoTitle: 'קנה ריטוויטים לטוויטר X — SocialSniper',
    seoDescription: 'קנה ריטוויטים לציוצים ב-X (טוויטר). מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'ריטוויטים לטוויטר, קנייה retweets, לקנות ריטוויטים X',
    canonicalPath: '/buy/twitter-retweets',
    platformPath: '/services/twitter',
    color: '#1da1f2',
    gradient: 'linear-gradient(135deg, #1da1f2, #0d8bd0)',
    emoji: '🔁',
    benefits: [
      'ריטוויטים מפיצים את הציוץ שלך לרשת רחבה יותר',
      'ריטוויטים מגדילים חשיפה אורגנית מאסיבית',
      'ללא צורך בסיסמא',
      'מסירה תוך 1-24 שעות',
      'תואם לכל ציוץ',
      'מינימום הזמנה 20 ריטוויטים',
    ],
    faqs: [
      { q: 'כמה ריטוויטים אפשר לקנות?', a: 'מ-20 עד 50,000 ריטוויטים.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-24 שעות.' },
      { q: 'מה ההבדל בין לייק לריטוויט?', a: 'ריטוויט מפיץ לכלל עוקבי המשתמש, לייק רק מסמן שאהבתם.' },
    ],
    relatedLinks: [
      { label: 'לייקים לטוויטר', path: '/buy/twitter-likes' },
      { label: 'עוקבים לטוויטר', path: '/buy/twitter-followers' },
      { label: 'כל שירותי X/טוויטר', path: '/services/twitter' },
    ],
  },

  'youtube-likes': {
    serviceId: 'yt-likes',
    h1: 'קנה לייקים ליוטיוב',
    description: 'לייקים לסרטוני היוטיוב שלך. מגדיל engagement ומשפר דירוג.',
    seoTitle: 'קנה לייקים ליוטיוב — SocialSniper',
    seoDescription: 'קנה לייקים לסרטוני יוטיוב. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'לייקים ליוטיוב, קנייה לייקים יוטיוב, לקנות לייקים YouTube',
    canonicalPath: '/buy/youtube-likes',
    platformPath: '/services/youtube',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    emoji: '👍',
    benefits: [
      'לייקים רבים שולחים אות חיובי לאלגוריתם יוטיוב',
      'סרטונים עם engagement גבוה מקבלים יותר חשיפה',
      'ללא סיסמא - רק קישור לסרטון',
      'מסירה תוך 1-6 שעות',
      'תואם לכל סרטוני יוטיוב',
      'מינימום הזמנה 50 לייקים',
    ],
    faqs: [
      { q: 'כמה לייקים אפשר לקנות ליוטיוב?', a: 'מ-50 עד 100,000 לייקים.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-6 שעות.' },
      { q: 'האם לייקים עוזרים לדירוג?', a: 'כן! לייקים הם אחד הגורמים שיוטיוב בוחן.' },
    ],
    relatedLinks: [
      { label: 'מנויים ליוטיוב', path: '/buy/youtube-subscribers' },
      { label: 'צפיות ליוטיוב', path: '/buy/youtube-views' },
      { label: 'כל שירותי יוטיוב', path: '/services/youtube' },
    ],
  },

  'youtube-comments': {
    serviceId: 'yt-comments',
    h1: 'קנה תגובות ליוטיוב',
    description: 'תגובות לסרטוני היוטיוב שלך. מגדיל engagement ומשפר את הדירוג.',
    seoTitle: 'קנה תגובות ליוטיוב — SocialSniper',
    seoDescription: 'קנה תגובות לסרטוני יוטיוב. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'תגובות ליוטיוב, קנייה תגובות יוטיוב, לקנות תגובות YouTube',
    canonicalPath: '/buy/youtube-comments',
    platformPath: '/services/youtube',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    emoji: '💬',
    benefits: [
      'תגובות הן סיגנל חזק לאלגוריתם יוטיוב',
      'סרטונים עם תגובות מקבלים יותר Suggested Videos',
      'ניתן להזמין תגובות בעברית',
      'מסירה תוך 1-12 שעות',
      'ללא סיסמא',
      'תואם לכל סרטון',
    ],
    faqs: [
      { q: 'כמה תגובות אפשר לקנות ליוטיוב?', a: 'מ-10 עד 1,000 תגובות.' },
      { q: 'האם אפשר לבקש תגובות בעברית?', a: 'כן! פנה אלינו בטלגרם.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-12 שעות.' },
    ],
    relatedLinks: [
      { label: 'מנויים ליוטיוב', path: '/buy/youtube-subscribers' },
      { label: 'לייקים ליוטיוב', path: '/buy/youtube-likes' },
      { label: 'כל שירותי יוטיוב', path: '/services/youtube' },
    ],
  },

  'telegram-views': {
    serviceId: 'tg-views',
    h1: 'קנה צפיות לטלגרם',
    description: 'צפיות לפוסטים בערוץ הטלגרם שלך. מחיר נמוך, מסירה תוך 30 דקות.',
    seoTitle: 'קנה צפיות לפוסטים בטלגרם — SocialSniper',
    seoDescription: 'קנה צפיות לפוסטים בערוץ טלגרם. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'צפיות לטלגרם, קנייה צפיות טלגרם, לקנות צפיות Telegram',
    canonicalPath: '/buy/telegram-views',
    platformPath: '/services/telegram',
    color: '#2aabee',
    gradient: 'linear-gradient(135deg, #229ed9, #1a7fc7)',
    emoji: '👁️',
    benefits: [
      'צפיות גבוהות בונות אמינות לערוץ',
      'ערוצים עם צפיות גבוהות נראים פופולריים',
      'מחיר שיא נמוך',
      'מסירה תוך 30 דקות',
      'ללא סיסמא - רק קישור לפוסט',
      'ניתן לקנות עד 100,000,000 צפיות',
    ],
    faqs: [
      { q: 'כמה צפיות אפשר לקנות לטלגרם?', a: 'מ-500 עד 100,000,000 צפיות.' },
      { q: 'מה זמן ההתחלה?', a: 'בדרך כלל תוך 30 דקות.' },
      { q: 'האם אפשר לקנות לכמה פוסטים?', a: 'כן, פנה אלינו בטלגרם לחבילת פוסטים.' },
    ],
    relatedLinks: [
      { label: 'מנויים לטלגרם', path: '/buy/telegram-members' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי טלגרם', path: '/services/telegram' },
    ],
  },

  'whatsapp-group': {
    serviceId: 'wa-group-members',
    h1: 'קנה חברים לקבוצת וואטסאפ',
    description: 'הוסף חברים אמיתיים לקבוצת ה-WhatsApp שלך. מחיר מ-₪12 לאלף חברים.',
    seoTitle: 'קנה חברים לקבוצת WhatsApp — SocialSniper',
    seoDescription: 'קנה חברים לקבוצת WhatsApp. מ-₪12 לאלף. מסירה מהירה, תמיכה בעברית.',
    seoKeywords: 'חברים לקבוצת וואטסאפ, קנייה חברים WhatsApp, לקנות חברים לוואטסאפ',
    canonicalPath: '/buy/whatsapp-group',
    platformPath: '/services/whatsapp',
    color: '#25d366',
    gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
    emoji: '👥',
    benefits: [
      'קבוצות גדולות מושכות חברים נוספים',
      'קבוצה גדולה נראית אמינה יותר',
      'ללא צורך בסיסמא - רק קישור לקבוצה',
      'מסירה תוך 6-24 שעות',
      'ניתן לקנות עד 50,000 חברים',
      'תואם לקבוצות ציבוריות',
    ],
    faqs: [
      { q: 'האם הקבוצה צריכה להיות ציבורית?', a: 'כן, הקבוצה חייבת להיות פתוחה לקישור הזמנה.' },
      { q: 'כמה חברים אפשר לקנות?', a: 'מ-50 עד 50,000 חברים.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 6-24 שעות.' },
    ],
    relatedLinks: [
      { label: 'מנויים לטלגרם', path: '/buy/telegram-members' },
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'כל שירותי WhatsApp', path: '/services/whatsapp' },
    ],
  },

  'linkedin-followers': {
    serviceId: 'ig-followers-basic',
    h1: 'קנה עוקבים ללינקדאין',
    description: 'הגדל את מספר העוקבים שלך בלינקדאין. בניית נוכחות מקצועית ואמינות.',
    seoTitle: 'קנה עוקבים ללינקדאין — SocialSniper',
    seoDescription: 'קנה עוקבים לפרופיל LinkedIn. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים ללינקדאין, קנייה עוקבים LinkedIn, לקנות עוקבים לינקדאין',
    canonicalPath: '/buy/linkedin-followers',
    platformPath: '/services',
    color: '#0a66c2',
    gradient: 'linear-gradient(135deg, #0a66c2, #004182)',
    emoji: '💼',
    benefits: [
      'פרופיל עם עוקבים רבים נראה מקצועי ואמין',
      'עוקבים רבים מגדילים חשיפה לפוסטים',
      'ללא סיסמא',
      'מסירה מהירה',
      'מתאים לפרופילים עסקיים',
      'תמיכה בעברית',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות ללינקדאין?', a: 'פנה אלינו בטלגרם לפרטים מלאים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
      { q: 'כמה זמן לוקח?', a: 'פנה אלינו בטלגרם לפרטים.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'עוקבים לטוויטר', path: '/buy/twitter-followers' },
      { label: 'כל השירותים', path: '/services' },
    ],
  },

  'pinterest-followers': {
    serviceId: 'ig-followers-basic',
    h1: 'קנה עוקבים לפינטרסט',
    description: 'הגדל את מספר העוקבים שלך בפינטרסט. פלטפורמה ויזואלית עם 450M משתמשים.',
    seoTitle: 'קנה עוקבים לפינטרסט — SocialSniper',
    seoDescription: 'קנה עוקבים לפרופיל Pinterest. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לפינטרסט, קנייה עוקבים Pinterest, לקנות עוקבים פינטרסט',
    canonicalPath: '/buy/pinterest-followers',
    platformPath: '/services',
    color: '#e60023',
    gradient: 'linear-gradient(135deg, #e60023, #b8001b)',
    emoji: '📌',
    benefits: [
      'פינטרסט הוא מנוע חיפוש ויזואלי עם 450M משתמשים',
      'עוקבים רבים מגדילים חשיפה לפינים',
      'ללא סיסמא',
      'מסירה מהירה',
      'מתאים לעסקי אופנה, עיצוב ובישול',
      'תמיכה בעברית',
    ],
    faqs: [
      { q: 'כמה עוקבים אפשר לקנות לפינטרסט?', a: 'פנה אלינו בטלגרם לפרטים מלאים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
      { q: 'כמה זמן לוקח?', a: 'פנה אלינו בטלגרם לפרטים.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'כל השירותים', path: '/services' },
    ],
  },

  'snapchat-followers': {
    serviceId: 'ig-followers-basic',
    h1: "קנה עוקבים לסנאפצ'אט",
    description: "הגדל את מספר החברים שלך בסנאפצ'אט. בניית נוכחות בפלטפורמה הצעירה.",
    seoTitle: "קנה עוקבים לסנאפצ'אט — SocialSniper",
    seoDescription: "קנה עוקבים ל-Snapchat שלך. מסירה מהירה, ללא סיסמא, תמיכה בעברית.",
    seoKeywords: 'עוקבים לסנאפ, קנייה עוקבים Snapchat, לקנות עוקבים סנאפ',
    canonicalPath: '/buy/snapchat-followers',
    platformPath: '/services',
    color: '#fffc00',
    gradient: 'linear-gradient(135deg, #fffc00, #f5c700)',
    emoji: '👻',
    benefits: [
      "סנאפצ'אט פופולרי מאוד בקרב גיל 18-30",
      'חברים רבים מגדילים חשיפה לתוכן',
      'ללא סיסמא',
      'מסירה מהירה',
      'מתאים לאינפלואנסרים',
      'תמיכה בעברית',
    ],
    faqs: [
      { q: "כמה חברים אפשר לקנות לסנאפצ'אט?", a: 'פנה אלינו בטלגרם לפרטים מלאים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
      { q: 'כמה זמן לוקח?', a: 'פנה אלינו בטלגרם לפרטים.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'עוקבים לטיקטוק', path: '/buy/tiktok-followers' },
      { label: 'כל השירותים', path: '/services' },
    ],
  },

  'soundcloud-plays': {
    serviceId: 'sp-streams',
    h1: 'קנה השמעות לסאונדקלאוד',
    description: 'מיליוני השמעות לטראקים שלך בסאונדקלאוד. מחיר נמוך, מסירה מהירה.',
    seoTitle: 'קנה השמעות לסאונדקלאוד — SocialSniper',
    seoDescription: 'קנה השמעות לטראקים שלך ב-SoundCloud. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'השמעות לסאונדקלאוד, קנייה plays SoundCloud, לקנות השמעות',
    canonicalPath: '/buy/soundcloud-plays',
    platformPath: '/services/spotify',
    color: '#ff5500',
    gradient: 'linear-gradient(135deg, #ff5500, #cc4400)',
    emoji: '🎵',
    benefits: [
      'השמעות רבות מגדילות את הדירוג בחיפוש SoundCloud',
      'טראקים עם plays גבוהים נראים פופולריים',
      'ללא סיסמא - רק קישור לטראק',
      'מסירה מהירה תוך שעות',
      'מחיר נמוך',
      'תואם לכל ג\'אנר מוזיקלי',
    ],
    faqs: [
      { q: 'כמה השמעות אפשר לקנות?', a: 'מ-1,000 עד 10,000,000 השמעות.' },
      { q: 'כמה זמן לוקח?', a: 'בדרך כלל 1-12 שעות.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
    ],
    relatedLinks: [
      { label: 'השמעות לספוטיפיי', path: '/services/spotify' },
      { label: 'עוקבים לספוטיפיי', path: '/buy/spotify-followers' },
      { label: 'כל שירותי מוזיקה', path: '/services/spotify' },
    ],
  },

  'twitch-followers': {
    serviceId: 'yt-subscribers',
    h1: "קנה עוקבים לטוויץ'",
    description: "הגדל את מספר העוקבים שלך בטוויץ'. בניית קהל למשחקים ולייב סטרימינג.",
    seoTitle: "קנה עוקבים לטוויץ' — SocialSniper",
    seoDescription: 'קנה עוקבים לערוץ Twitch שלך. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'עוקבים לטוויץ, קנייה עוקבים Twitch, לקנות עוקבים סטרימינג',
    canonicalPath: '/buy/twitch-followers',
    platformPath: '/services',
    color: '#9147ff',
    gradient: 'linear-gradient(135deg, #9147ff, #6c2bd9)',
    emoji: '🎮',
    benefits: [
      "עוקבים רבים מגדילים הסיכוי שטוויץ' יקדם הערוץ",
      'Affiliate status דורש 50 עוקבים',
      'ללא סיסמא',
      'מסירה מהירה',
      'מתאים לגיימרים ויוצרי תוכן',
      'תמיכה בעברית',
    ],
    faqs: [
      { q: "כמה עוקבים אפשר לקנות לטוויץ'?", a: 'פנה אלינו בטלגרם לפרטים מלאים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
      { q: 'כמה זמן לוקח?', a: 'פנה אלינו בטלגרם לפרטים.' },
    ],
    relatedLinks: [
      { label: 'מנויים ליוטיוב', path: '/buy/youtube-subscribers' },
      { label: 'חברים לדיסקורד', path: '/buy/discord-members' },
      { label: 'כל השירותים', path: '/services' },
    ],
  },

  'reddit-upvotes': {
    serviceId: 'ig-likes',
    h1: 'קנה אפ-וואוטס לרדיט',
    description: 'הגדל את מספר האפ-וואוטס לפוסטים שלך ברדיט. מגדיל חשיפה ואמינות.',
    seoTitle: 'קנה אפ-וואוטס לרדיט — SocialSniper',
    seoDescription: 'קנה upvotes לפוסטים ב-Reddit. מסירה מהירה, ללא סיסמא, תמיכה בעברית.',
    seoKeywords: 'אפ-וואוטס לרדיט, קנייה upvotes Reddit, לקנות הצבעות רדיט',
    canonicalPath: '/buy/reddit-upvotes',
    platformPath: '/services',
    color: '#ff4500',
    gradient: 'linear-gradient(135deg, #ff4500, #cc3700)',
    emoji: '⬆️',
    benefits: [
      'אפ-וואוטס רבים מקדמים פוסט לראש הסאברדיט',
      'פוסטים בעמוד הראשון מקבלים עשרות אלפי צפיות',
      'ללא סיסמא',
      'מסירה מהירה',
      'מתאים לפוסטים ולתגובות',
      'תמיכה בעברית',
    ],
    faqs: [
      { q: 'כמה אפ-וואוטס אפשר לקנות?', a: 'פנה אלינו בטלגרם לפרטים מלאים.' },
      { q: 'האם זה בטוח?', a: 'כן, ללא סיסמא.' },
      { q: 'כמה זמן לוקח?', a: 'פנה אלינו בטלגרם לפרטים.' },
    ],
    relatedLinks: [
      { label: 'עוקבים לאינסטגרם', path: '/buy/instagram-followers' },
      { label: 'לייקים לאינסטגרם', path: '/buy/instagram-likes' },
      { label: 'כל השירותים', path: '/services' },
    ],
  },
};

interface Props {
  slug: string;
}

const ServiceLandingPage: React.FC<Props> = ({ slug }) => {
  const [showModal, setShowModal] = useState(false);
  const config = LANDING_PAGES[slug];

  if (!config) return null;

  const service = getServiceById(config.serviceId);
  if (!service) return null;

  const priceDisplay = service.pricePerK < 0.01
    ? `₪${service.pricePerK.toFixed(4)}`
    : service.pricePerK < 1
    ? `₪${service.pricePerK.toFixed(3)}`
    : `₪${service.pricePerK.toFixed(2)}`;

  return (
    <>
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.seoKeywords}
        canonicalPath={config.canonicalPath}
      />
      <Header />
      <main>
        {/* Hero */}
        <section style={{
          paddingTop: 120,
          paddingBottom: 60,
          textAlign: 'center',
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${config.color}18 0%, transparent 65%)`,
        }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{config.emoji}</div>
            <span className="badge" style={{
              marginBottom: 20,
              display: 'inline-flex',
              background: `${config.color}18`,
              border: `1px solid ${config.color}40`,
              color: config.color,
              fontSize: 13,
              padding: '7px 18px',
              borderRadius: 100,
            }}>
              🔥 הכי נקנה בישראל
            </span>
            <h1 className="section-title" style={{ marginBottom: 16 }}>
              {config.h1.replace('קנה ', '')}{' '}
              <span style={{
                background: config.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                במחירים נמוכים
              </span>
            </h1>
            <p className="section-subtitle" style={{ marginBottom: 36 }}>
              {config.description}
            </p>

            {/* Price highlight */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '20px 36px',
              marginBottom: 36,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>מחיר ל-1,000</div>
                <div style={{
                  fontSize: 32, fontWeight: 900,
                  background: config.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {priceDisplay}
                </div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>מינימום הזמנה</div>
                <div style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>
                  {service.minOrder.toLocaleString('he-IL')}
                </div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>התחלה</div>
                <div style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>
                  {service.startTime}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
                style={{ fontSize: 17, padding: '15px 38px', borderRadius: 14 }}
              >
                🛒 הזמן עכשיו
              </button>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram"
                style={{ fontSize: 17, padding: '15px 38px', borderRadius: 14 }}
              >
                📱 שאל בטלגרם
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-sm" aria-label="יתרונות">
          <div className="container" style={{ maxWidth: 760 }}>
            <h2 style={{
              color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 24, textAlign: 'center',
            }}>
              למה לקנות מ-SocialSniper?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {config.benefits.map((b, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <span style={{ color: '#10b981', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" aria-label="שאלות נפוצות" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <h2 className="section-title" style={{ marginBottom: 36, textAlign: 'center' }}>
              שאלות נפוצות
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {config.faqs.map((faq, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                  <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="section-sm">
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>שירותים קשורים:</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {config.relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="btn-outline"
                  style={{ fontSize: 13, padding: '8px 20px' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {showModal && <OrderModal service={service} onClose={() => setShowModal(false)} />}

      <style>{`
        @media (max-width: 600px) {
          section[aria-label="יתרונות"] .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceLandingPage;
