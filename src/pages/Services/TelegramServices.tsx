import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TelegramServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // חברים וחברות
    {
      id: 'regular_members',
      name: 'חברים רגילים',
      description: 'הוספת חברים רגילים לבוט/קבוצה/ערוץ - איכות גבוהה',
      price: '₪0.08',
      min: 50,
      max: 5000,
      icon: '👥',
      category: 'חברים וחברות',
      features: ['חברים אמיתיים', 'פרופילים מלאים', 'מסירה מהירה', 'אחריות למילוי חוזר']
    },
    {
      id: 'premium_members',
      name: 'חברים פרמיום',
      description: 'הוספת חברים פרמיום - איכות גבוהה ביותר',
      price: '₪0.15',
      min: 25,
      max: 2000,
      icon: '⭐',
      category: 'חברים וחברות',
      features: ['חברים פרמיום', 'איכות גבוהה', 'פרופילים מאומתים', 'מסירה מדורגת']
    },
    {
      id: 'auto_group_join',
      name: 'הצטרפות אוטומטית לקבוצות',
      description: 'הצטרפות אוטומטית לקבוצות רלוונטיות - בניית קהילה',
      price: '₪0.12',
      min: 10,
      max: 100,
      icon: '🔄',
      category: 'חברים וחברות',
      features: ['הצטרפות אוטומטית', 'קבוצות רלוונטיות', 'בניית קהילה', 'מעקב אחר פעילות']
    },
    {
      id: 'transfer_members',
      name: 'העברת חברים בין קבוצות',
      description: 'העברת חברים בין קבוצות - ניהול קהילה מתקדם',
      price: '₪0.20',
      min: 5,
      max: 500,
      icon: '↔️',
      category: 'חברים וחברות',
      features: ['העברת חברים', 'ניהול קהילה', 'מעקב אחר העברות', 'אופטימיזציה']
    },
    {
      id: 'bulk_member_import',
      name: 'ייבוא חברים בכמויות גדולות',
      description: 'ייבוא חברים בכמויות גדולות - ניהול יעיל',
      price: '₪0.10',
      min: 100,
      max: 10000,
      icon: '📥',
      category: 'חברים וחברות',
      features: ['ייבוא בכמויות גדולות', 'ניהול יעיל', 'מסירה מהירה', 'מעקב אחר ייבוא']
    },
    {
      id: 'member_verification',
      name: 'אימות חברים',
      description: 'אימות חברים - וידוא איכות',
      price: '₪0.18',
      min: 10,
      max: 1000,
      icon: '✅',
      category: 'חברים וחברות',
      features: ['אימות חברים', 'וידוא איכות', 'סינון אוטומטי', 'דוחות מפורטים']
    },
    {
      id: 'member_cleanup',
      name: 'ניקוי חברים לא פעילים',
      description: 'ניקוי חברים לא פעילים - אופטימיזציה של הקהילה',
      price: '₪0.15',
      min: 1,
      max: 50,
      icon: '🧹',
      category: 'חברים וחברות',
      features: ['ניקוי חברים', 'אופטימיזציה', 'זיהוי לא פעילים', 'ניהול יעיל']
    },
    {
      id: 'member_reactivation',
      name: 'הפעלת חברים מחדש',
      description: 'הפעלת חברים לא פעילים - חידוש הקהילה',
      price: '₪0.22',
      min: 1,
      max: 100,
      icon: '🔄',
      category: 'חברים וחברות',
      features: ['הפעלת חברים', 'חידוש הקהילה', 'תוכן מותאם', 'מעקב אחר פעילות']
    },
    // מיקוד ופילוח
    {
      id: 'geo_targeting',
      name: 'מיקוד גיאוגרפי',
      description: 'מיקוד חברים לפי מיקום גיאוגרפי - דיוק מקסימלי',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '📍',
      category: 'מיקוד ופילוח',
      features: ['מיקוד גיאוגרפי', 'דיוק מקסימלי', 'מיקוד לפי עיר/מדינה', 'דוחות מפורטים']
    },
    {
      id: 'demo_targeting',
      name: 'מיקוד דמוגרפי',
      description: 'מיקוד חברים לפי דמוגרפיה - גיל, מין, תחומי עניין',
      price: '₪0.30',
      min: 1,
      max: 15,
      icon: '👤',
      category: 'מיקוד ופילוח',
      features: ['מיקוד דמוגרפי', 'גיל ומין', 'תחומי עניין', 'ניתוח מפורט']
    },
    {
      id: 'interest_targeting',
      name: 'מיקוד לפי תחומי עניין',
      description: 'מיקוד חברים לפי תחומי עניין - רלוונטיות מקסימלית',
      price: '₪0.28',
      min: 1,
      max: 25,
      icon: '🎯',
      category: 'מיקוד ופילוח',
      features: ['מיקוד תחומי עניין', 'רלוונטיות מקסימלית', 'ניתוח התנהגות', 'דוחות מפורטים']
    },
    {
      id: 'behavior_targeting',
      name: 'מיקוד לפי התנהגות',
      description: 'מיקוד חברים לפי התנהגות - ניתוח התנהגות מתקדם',
      price: '₪0.35',
      min: 1,
      max: 20,
      icon: '🧠',
      category: 'מיקוד ופילוח',
      features: ['מיקוד התנהגות', 'ניתוח מתקדם', 'זיהוי דפוסים', 'אופטימיזציה']
    },
    {
      id: 'device_targeting',
      name: 'מיקוד לפי מכשיר',
      description: 'מיקוד חברים לפי סוג מכשיר - iOS/Android/Desktop',
      price: '₪0.20',
      min: 1,
      max: 30,
      icon: '📱',
      category: 'מיקוד ופילוח',
      features: ['מיקוד מכשיר', 'iOS/Android/Desktop', 'ניתוח שימוש', 'דוחות מפורטים']
    },
    {
      id: 'competitor_analysis',
      name: 'ניתוח מתחרים',
      description: 'ניתוח מתחרים וזיהוי הזדמנויות - אסטרטגיה מתקדמת',
      price: '₪0.40',
      min: 1,
      max: 10,
      icon: '🔍',
      category: 'מיקוד ופילוח',
      features: ['ניתוח מתחרים', 'זיהוי הזדמנויות', 'אסטרטגיה מתקדמת', 'דוחות מפורטים']
    },
    {
      id: 'hashtag_research',
      name: 'מחקר האשטגים',
      description: 'מחקר האשטגים פופולריים - אופטימיזציה של תוכן',
      price: '₪0.22',
      min: 1,
      max: 20,
      icon: '#️⃣',
      category: 'מיקוד ופילוח',
      features: ['מחקר האשטגים', 'אופטימיזציה', 'ניתוח טרנדים', 'המלצות מותאמות']
    },
    // כלי קבוצות וערוצים
    {
      id: 'channel_boost',
      name: 'הגברת ערוץ',
      description: 'הגברת ערוץ - הגדלת חשיפה ומנויים',
      price: '₪0.30',
      min: 1,
      max: 15,
      icon: '📢',
      category: 'כלי קבוצות וערוצים',
      features: ['הגברת ערוץ', 'הגדלת חשיפה', 'מנויים איכותיים', 'מעקב אחר ביצועים']
    },
    {
      id: 'spam_reports',
      name: 'דיווח על ספאם',
      description: 'דיווח אוטומטי על ספאם - שמירה על איכות הקהילה',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '🚫',
      category: 'כלי קבוצות וערוצים',
      features: ['דיווח אוטומטי', 'שמירה על איכות', 'סינון ספאם', 'ניהול קהילה']
    },
    {
      id: 'group_analysis',
      name: 'ניתוח קבוצות',
      description: 'ניתוח קבוצות מתחרות - הבנת השוק',
      price: '₪0.35',
      min: 1,
      max: 10,
      icon: '📊',
      category: 'כלי קבוצות וערוצים',
      features: ['ניתוח קבוצות', 'הבנת השוק', 'דוחות מפורטים', 'אסטרטגיה מתקדמת']
    },
    {
      id: 'retention_tracking',
      name: 'מעקב אחר שימור',
      description: 'מעקב אחר שימור חברים - אופטימיזציה של הקהילה',
      price: '₪0.28',
      min: 1,
      max: 25,
      icon: '📈',
      category: 'כלי קבוצות וערוצים',
      features: ['מעקב שימור', 'אופטימיזציה', 'ניתוח התנהגות', 'שיפור ביצועים']
    },
    {
      id: 'group_creation',
      name: 'יצירת קבוצות',
      description: 'יצירת קבוצות אוטומטית - ניהול קהילה מתקדם',
      price: '₪0.40',
      min: 1,
      max: 15,
      icon: '👥',
      category: 'כלי קבוצות וערוצים',
      features: ['יצירה אוטומטית', 'ניהול קהילה', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'channel_management',
      name: 'ניהול ערוצים',
      description: 'ניהול ערוצים מתקדם - אוטומציה מלאה',
      price: '₪0.45',
      min: 1,
      max: 12,
      icon: '📺',
      category: 'כלי קבוצות וערוצים',
      features: ['ניהול מתקדם', 'אוטומציה מלאה', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'moderator_tools',
      name: 'כלי מנהלים',
      description: 'כלי מנהלים מתקדמים - ניהול קהילה מקצועי',
      price: '₪0.50',
      min: 1,
      max: 10,
      icon: '🛠️',
      category: 'כלי קבוצות וערוצים',
      features: ['כלי מנהלים', 'ניהול מקצועי', 'אוטומציה מתקדמת', 'דוחות מפורטים']
    },
    {
      id: 'content_moderation',
      name: 'ניהול תוכן',
      description: 'ניהול תוכן אוטומטי - שמירה על איכות',
      price: '₪0.32',
      min: 1,
      max: 20,
      icon: '📝',
      category: 'כלי קבוצות וערוצים',
      features: ['ניהול אוטומטי', 'שמירה על איכות', 'סינון תוכן', 'מעקב אחר ביצועים']
    },
    // אוטומציה מתקדמת
    {
      id: 'bot_stars',
      name: 'כוכבים לבוטים',
      description: 'הוספת כוכבים לבוטים - העלאת דירוג',
      price: '₪0.15',
      min: 5,
      max: 100,
      icon: '⭐',
      category: 'אוטומציה מתקדמת',
      features: ['כוכבים לבוטים', 'העלאת דירוג', 'שיפור ביצועים', 'מסירה מהירה']
    },
    {
      id: 'scheduled_messages',
      name: 'הודעות מתוזמנות',
      description: 'שליחת הודעות מתוזמנות - אוטומציה מתקדמת',
      price: '₪0.20',
      min: 1,
      max: 50,
      icon: '⏰',
      category: 'אוטומציה מתקדמת',
      features: ['הודעות מתוזמנות', 'אוטומציה מתקדמת', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_posting',
      name: 'פרסום אוטומטי',
      description: 'פרסום אוטומטי של תוכן - ניהול תוכן יעיל',
      price: '₪0.25',
      min: 1,
      max: 30,
      icon: '📤',
      category: 'אוטומציה מתקדמת',
      features: ['פרסום אוטומטי', 'ניהול תוכן', 'תזמון מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'ai_responses',
      name: 'תגובות AI',
      description: 'תגובות אוטומטיות עם AI - שירות לקוחות מתקדם',
      price: '₪0.35',
      min: 1,
      max: 25,
      icon: '🤖',
      category: 'אוטומציה מתקדמת',
      features: ['תגובות AI', 'שירות לקוחות', 'אוטומציה מתקדמת', 'תוכן מותאם']
    },
    {
      id: 'activity_tracking',
      name: 'מעקב אחר פעילות',
      description: 'מעקב אחר פעילות חברים - ניתוח התנהגות',
      price: '₪0.30',
      min: 1,
      max: 20,
      icon: '📊',
      category: 'אוטומציה מתקדמת',
      features: ['מעקב פעילות', 'ניתוח התנהגות', 'דוחות מפורטים', 'אופטימיזציה']
    },
    {
      id: 'smart_messages',
      name: 'הודעות חכמות',
      description: 'שליחת הודעות חכמות - AI מתקדם',
      price: '₪0.40',
      min: 1,
      max: 15,
      icon: '💬',
      category: 'אוטומציה מתקדמת',
      features: ['הודעות חכמות', 'AI מתקדם', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'admin_detection',
      name: 'זיהוי מנהלים',
      description: 'זיהוי מנהלים ומודרטורים - ניהול צוות',
      price: '₪0.28',
      min: 1,
      max: 20,
      icon: '👮',
      category: 'אוטומציה מתקדמת',
      features: ['זיהוי מנהלים', 'ניהול צוות', 'דוחות פעילות', 'ייעוץ ניהולי']
    },
    {
      id: 'bot_creation',
      name: 'יצירת בוטים',
      description: 'יצירת בוטים מותאמים - אוטומציה מתקדמת',
      price: '₪0.60',
      min: 1,
      max: 8,
      icon: '🤖',
      category: 'אוטומציה מתקדמת',
      features: ['יצירת בוטים', 'אוטומציה מתקדמת', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_reactions',
      name: 'ריאקציות אוטומטיות',
      description: 'ריאקציות אוטומטיות להודעות - אינטראקציה מתקדמת',
      price: '₪0.18',
      min: 10,
      max: 200,
      icon: '👍',
      category: 'אוטומציה מתקדמת',
      features: ['ריאקציות אוטומטיות', 'אינטראקציה מתקדמת', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'message_forwarding',
      name: 'העברת הודעות',
      description: 'העברת הודעות אוטומטית - ניהול תוכן',
      price: '₪0.22',
      min: 5,
      max: 100,
      icon: '↗️',
      category: 'אוטומציה מתקדמת',
      features: ['העברה אוטומטית', 'ניהול תוכן', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_ban',
      name: 'חסימה אוטומטית',
      description: 'חסימה אוטומטית של משתמשים - ניהול קהילה',
      price: '₪0.25',
      min: 1,
      max: 30,
      icon: '🚫',
      category: 'אוטומציה מתקדמת',
      features: ['חסימה אוטומטית', 'ניהול קהילה', 'סינון משתמשים', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_welcome',
      name: 'הודעות ברכה',
      description: 'הודעות ברכה אוטומטיות - חוויית משתמש',
      price: '₪0.20',
      min: 1,
      max: 40,
      icon: '👋',
      category: 'אוטומציה מתקדמת',
      features: ['הודעות ברכה', 'חוויית משתמש', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_backup',
      name: 'גיבוי אוטומטי',
      description: 'גיבוי אוטומטי של תוכן - אבטחת מידע',
      price: '₪0.30',
      min: 1,
      max: 20,
      icon: '💾',
      category: 'אוטומציה מתקדמת',
      features: ['גיבוי אוטומטי', 'אבטחת מידע', 'שמירת תוכן', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_analytics',
      name: 'אנליטיקס אוטומטי',
      description: 'אנליטיקס אוטומטי - ניתוח ביצועים',
      price: '₪0.35',
      min: 1,
      max: 15,
      icon: '📈',
      category: 'אוטומציה מתקדמת',
      features: ['אנליטיקס אוטומטי', 'ניתוח ביצועים', 'דוחות מפורטים', 'המלצות שיפור']
    },
    // צפיות ואינטראקציה
    {
      id: 'story_views',
      name: 'צפיות בסטוריז',
      description: 'הוספת צפיות לסטוריז - הגברת חשיפה',
      price: '₪0.04',
      min: 100,
      max: 5000,
      icon: '👁️',
      category: 'צפיות ואינטראקציה',
      features: ['צפיות בסטוריז', 'הגברת חשיפה', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'post_views',
      name: 'צפיות בפוסטים',
      description: 'הוספת צפיות לפוסטים - הגברת חשיפה',
      price: '₪0.03',
      min: 50,
      max: 3000,
      icon: '📊',
      category: 'צפיות ואינטראקציה',
      features: ['צפיות בפוסטים', 'הגברת חשיפה', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    {
      id: 'content_summary',
      name: 'סיכום תוכן',
      description: 'סיכום אוטומטי של תוכן - ניתוח תוכן',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '📝',
      category: 'צפיות ואינטראקציה',
      features: ['סיכום אוטומטי', 'ניתוח תוכן', 'דוחות מפורטים', 'המלצות שיפור']
    },
    {
      id: 'keyword_responses',
      name: 'תגובות לפי מילות מפתח',
      description: 'תגובות אוטומטיות לפי מילות מפתח - AI מתקדם',
      price: '₪0.30',
      min: 1,
      max: 25,
      icon: '🔑',
      category: 'צפיות ואינטראקציה',
      features: ['תגובות אוטומטיות', 'AI מתקדם', 'מילות מפתח', 'תוכן מותאם']
    },
    {
      id: 'voice_messages',
      name: 'הודעות קוליות',
      description: 'שליחת הודעות קוליות - תוכן מותאם',
      price: '₪0.35',
      min: 1,
      max: 15,
      icon: '🎙️',
      category: 'צפיות ואינטראקציה',
      features: ['הודעות קוליות', 'תוכן מותאם', 'איכות גבוהה', 'מעקב אחר ביצועים']
    },
    {
      id: 'video_messages',
      name: 'הודעות וידאו',
      description: 'שליחת הודעות וידאו - תוכן ויזואלי',
      price: '₪0.40',
      min: 1,
      max: 12,
      icon: '🎥',
      category: 'צפיות ואינטראקציה',
      features: ['הודעות וידאו', 'תוכן ויזואלי', 'איכות גבוהה', 'מעקב אחר ביצועים']
    },
    {
      id: 'file_sharing',
      name: 'שיתוף קבצים',
      description: 'שיתוף קבצים אוטומטי - ניהול תוכן',
      price: '₪0.28',
      min: 1,
      max: 30,
      icon: '📁',
      category: 'צפיות ואינטראקציה',
      features: ['שיתוף אוטומטי', 'ניהול תוכן', 'קבצים מותאמים', 'מעקב אחר ביצועים']
    },
    {
      id: 'poll_creation',
      name: 'יצירת סקרים',
      description: 'יצירת סקרים אוטומטית - אינטראקציה עם הקהל',
      price: '₪0.22',
      min: 1,
      max: 25,
      icon: '📊',
      category: 'צפיות ואינטראקציה',
      features: ['יצירת סקרים', 'אינטראקציה עם הקהל', 'ניתוח תוצאות', 'מעקב אחר ביצועים']
    },
    {
      id: 'sticker_packs',
      name: 'חבילות מדבקות',
      description: 'יצירת חבילות מדבקות - תוכן ויזואלי',
      price: '₪0.45',
      min: 1,
      max: 10,
      icon: '😊',
      category: 'צפיות ואינטראקציה',
      features: ['חבילות מדבקות', 'תוכן ויזואלי', 'עיצוב מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'live_stream_views',
      name: 'צפיות בשידורים חיים',
      description: 'הוספת צפיות לשידורים חיים - הגברת מעורבות',
      price: '₪0.15',
      min: 50,
      max: 2000,
      icon: '📺',
      category: 'צפיות ואינטראקציה',
      features: ['צפיות בשידורים חיים', 'הגברת מעורבות', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'voice_message_views',
      name: 'צפיות בהודעות קוליות',
      description: 'הוספת צפיות להודעות קוליות - הגברת חשיפה',
      price: '₪0.12',
      min: 20,
      max: 1000,
      icon: '🎧',
      category: 'צפיות ואינטראקציה',
      features: ['צפיות בהודעות קוליות', 'הגברת חשיפה', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    // פיצ'רים מתקדמים
    {
      id: 'ai_campaign_manager',
      name: 'מנהל קמפיינים AI',
      description: 'מנהל קמפיינים עם AI - אסטרטגיה מתקדמת',
      price: '₪0.80',
      min: 1,
      max: 5,
      icon: '🤖',
      category: 'מתקדמים',
      features: ['מנהל קמפיינים AI', 'אסטרטגיה מתקדמת', 'אוטומציה מלאה', 'מעקב אחר ביצועים']
    },
    {
      id: 'cross_platform_sync',
      name: 'סנכרון בין פלטפורמות',
      description: 'סנכרון בין פלטפורמות - ניהול מרוכז',
      price: '₪0.60',
      min: 1,
      max: 8,
      icon: '🔄',
      category: 'מתקדמים',
      features: ['סנכרון בין פלטפורמות', 'ניהול מרוכז', 'אוטומציה מלאה', 'מעקב אחר ביצועים']
    },
    {
      id: 'smart_analytics',
      name: 'אנליטיקס חכם',
      description: 'אנליטיקס חכם עם AI - ניתוח מתקדם',
      price: '₪0.70',
      min: 1,
      max: 6,
      icon: '🧠',
      category: 'מתקדמים',
      features: ['אנליטיקס חכם', 'ניתוח מתקדם', 'AI מתקדם', 'המלצות מותאמות']
    },
    {
      id: 'voice_automation',
      name: 'אוטומציה קולית',
      description: 'אוטומציה קולית מתקדמת - AI מתקדם',
      price: '₪0.65',
      min: 1,
      max: 7,
      icon: '🎤',
      category: 'מתקדמים',
      features: ['אוטומציה קולית', 'AI מתקדם', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'security_protection',
      name: 'הגנת אבטחה',
      description: 'הגנת אבטחה מתקדמת - שמירה על מידע',
      price: '₪0.55',
      min: 1,
      max: 10,
      icon: '🔒',
      category: 'מתקדמים',
      features: ['הגנת אבטחה', 'שמירה על מידע', 'אבטחה מתקדמת', 'מעקב אחר ביצועים']
    },
    {
      id: 'israeli_intelligence',
      name: 'אינטליגנציה ישראלית',
      description: 'אינטליגנציה ישראלית - ניתוח שוק מקומי',
      price: '₪0.75',
      min: 1,
      max: 5,
      icon: '🇮🇱',
      category: 'מתקדמים',
      features: ['אינטליגנציה ישראלית', 'ניתוח שוק מקומי', 'אסטרטגיה מותאמת', 'מעקב אחר ביצועים']
    },
    {
      id: 'gamification',
      name: 'גיימיפיקציה',
      description: 'גיימיפיקציה של הקהילה - חוויית משתמש',
      price: '₪0.50',
      min: 1,
      max: 8,
      icon: '🎮',
      category: 'מתקדמים',
      features: ['גיימיפיקציה', 'חוויית משתמש', 'אינטראקציה מתקדמת', 'מעקב אחר ביצועים']
    },
    {
      id: 'community_features',
      name: 'פיצ\'רי קהילה',
      description: 'פיצ\'רי קהילה מתקדמים - ניהול קהילה',
      price: '₪0.45',
      min: 1,
      max: 12,
      icon: '👥',
      category: 'מתקדמים',
      features: ['פיצ\'רי קהילה', 'ניהול קהילה', 'אינטראקציה מתקדמת', 'מעקב אחר ביצועים']
    },
    {
      id: 'ecommerce_integration',
      name: 'אינטגרציה עם מסחר אלקטרוני',
      description: 'אינטגרציה עם מסחר אלקטרוני - מכירות מתקדמות',
      price: '₪0.85',
      min: 1,
      max: 4,
      icon: '🛒',
      category: 'מתקדמים',
      features: ['אינטגרציה מסחר אלקטרוני', 'מכירות מתקדמות', 'אוטומציה מלאה', 'מעקב אחר ביצועים']
    },
    {
      id: 'hebrew_ai',
      name: 'AI בעברית',
      description: 'AI מתקדם בעברית - תוכן מותאם',
      price: '₪0.90',
      min: 1,
      max: 3,
      icon: '🇮🇱',
      category: 'מתקדמים',
      features: ['AI בעברית', 'תוכן מותאם', 'AI מתקדם', 'מעקב אחר ביצועים']
    }
  ];

  const categories = ['הכל', 'חברים וחברות', 'מיקוד ופילוח', 'כלי קבוצות וערוצים', 'אוטומציה מתקדמת', 'צפיות ואינטראקציה', 'מתקדמים'];
  
  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const calculatePrice = (service: any, quantity: number) => {
    const pricePerUnit = parseFloat(service.price.replace('₪', ''));
    return (pricePerUnit * quantity).toFixed(2);
  };

  const handleQuantityChange = (serviceId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: value
    }));
  };

  const handleAddToCart = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    const quantity = quantities[serviceId] || service?.min || 0;

    if (!service || quantity === 0) {
      alert('אנא בחר כמות לפני הוספה לסל');
      return;
    }

    // שמירה ב-localStorage לסל קניות
    const cartItem = {
      id: serviceId,
      name: service.name,
      price: service.price,
      quantity: quantity,
      totalPrice: calculatePrice(service, quantity),
      category: service.category,
      icon: service.icon
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === serviceId);

    if (existingItemIndex >= 0) {
      // עדכון כמות אם הפריט כבר קיים
      existingCart[existingItemIndex].quantity = quantity;
      existingCart[existingItemIndex].totalPrice = calculatePrice(service, quantity);
    } else {
      // הוספת פריט חדש
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // הודעת הצלחה
    alert(`✅ ${service.name} נוסף לסל בהצלחה!\nכמות: ${quantity.toLocaleString()}\nמחיר: ₪${calculatePrice(service, quantity)}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(0, 136, 204, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 85, 128, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0, 170, 255, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(0, 200, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #0088cc 0%, #005580 50%, #003d5c 100%)
      `,
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Animated Background Elements */}
      {/* Floating Circles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(0, 136, 204, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(0, 170, 255, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(0, 85, 128, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 0
      }} />
      
      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
        width: '4px',
        height: '4px',
        background: 'rgba(0, 136, 204, 0.8)',
        borderRadius: '50%',
        animation: 'sparkle 3s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '80%',
        width: '6px',
        height: '6px',
        background: 'rgba(0, 170, 255, 0.9)',
        borderRadius: '50%',
        animation: 'sparkle 4s ease-in-out infinite 1s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '60%',
        width: '3px',
        height: '3px',
        background: 'rgba(0, 200, 255, 0.7)',
        borderRadius: '50%',
        animation: 'sparkle 5s ease-in-out infinite 2s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '40%',
        width: '3px',
        height: '3px',
        background: 'rgba(0, 136, 204, 0.6)',
        borderRadius: '50%',
        animation: 'sparkle 3.5s ease-in-out infinite 0.5s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '15%',
        width: '4px',
        height: '4px',
        background: 'rgba(0, 85, 128, 0.8)',
        borderRadius: '50%',
        animation: 'sparkle 4.5s ease-in-out infinite 1.5s',
        zIndex: 1
      }} />
      
      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '5%',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(45deg, rgba(0, 136, 204, 0.3), rgba(0, 170, 255, 0.3))',
        transform: 'rotate(45deg)',
        animation: 'drift 10s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40%',
        right: '10%',
        width: '30px',
        height: '30px',
        background: 'linear-gradient(45deg, rgba(0, 85, 128, 0.4), rgba(0, 136, 204, 0.4))',
        transform: 'rotate(45deg)',
        animation: 'drift 12s ease-in-out infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '65%',
        left: '25%',
        width: '25px',
        height: '25px',
        background: 'linear-gradient(45deg, rgba(0, 170, 255, 0.3), rgba(0, 200, 255, 0.3))',
        transform: 'rotate(45deg)',
        animation: 'drift 8s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Wave Effects */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 30% 20%, rgba(0, 136, 204, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(0, 170, 255, 0.1) 0%, transparent 50%)
        `,
        animation: 'wave 15s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Breathing Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0, 136, 204, 0.05), transparent)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'breathe 8s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Twinkling Stars */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '20%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        animation: 'twinkle 2s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: '3px',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        animation: 'twinkle 3s ease-in-out infinite 1s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        animation: 'twinkle 2.5s ease-in-out infinite 0.5s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '35%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        animation: 'twinkle 3.5s ease-in-out infinite 1.5s',
        zIndex: 1
      }} />
      
      {/* Orbital Elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '80px',
        height: '80px',
        border: '2px solid rgba(0, 136, 204, 0.2)',
        borderRadius: '50%',
        animation: 'orbit 20s linear infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '4px',
        height: '4px',
        background: 'rgba(0, 170, 255, 0.8)',
        borderRadius: '50%',
        animation: 'orbit 20s linear infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '60px',
        height: '60px',
        border: '1px solid rgba(0, 170, 255, 0.15)',
        borderRadius: '50%',
        animation: 'orbit 15s linear infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '3px',
        height: '3px',
        background: 'rgba(0, 200, 255, 0.7)',
        borderRadius: '50%',
        animation: 'orbit 15s linear infinite reverse',
        zIndex: 1
      }} />
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes slideInUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 136, 204, 0.3); }
            50% { box-shadow: 0 0 40px rgba(0, 136, 204, 0.6); }
          }
          
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }
          
          @keyframes drift {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg); 
            }
            25% { 
              transform: translateX(10px) translateY(-5px) rotate(90deg); 
            }
            50% { 
              transform: translateX(0px) translateY(-10px) rotate(180deg); 
            }
            75% { 
              transform: translateX(-10px) translateY(-5px) rotate(270deg); 
            }
          }
          
          @keyframes wave {
            0%, 100% { 
              transform: scale(1) rotate(0deg); 
              opacity: 0.1; 
            }
            50% { 
              transform: scale(1.1) rotate(180deg); 
              opacity: 0.2; 
            }
          }
          
          @keyframes breathe {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1); 
              opacity: 0.05; 
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.2); 
              opacity: 0.1; 
            }
          }
          
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.5); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes orbit {
            0% { 
              transform: rotate(0deg) translateX(40px) rotate(0deg); 
            }
            100% { 
              transform: rotate(360deg) translateX(40px) rotate(-360deg); 
            }
          }
          
          .service-card {
            animation: slideInUp 0.6s ease-out;
            animation-fill-mode: both;
          }
          
          .service-card:nth-child(1) { animation-delay: 0.1s; }
          .service-card:nth-child(2) { animation-delay: 0.2s; }
          .service-card:nth-child(3) { animation-delay: 0.3s; }
          .service-card:nth-child(4) { animation-delay: 0.4s; }
          .service-card:nth-child(5) { animation-delay: 0.5s; }
          .service-card:nth-child(6) { animation-delay: 0.6s; }
          .service-card:nth-child(7) { animation-delay: 0.7s; }
          .service-card:nth-child(8) { animation-delay: 0.8s; }
          .service-card:nth-child(9) { animation-delay: 0.9s; }
          .service-card:nth-child(10) { animation-delay: 1.0s; }
        `}
      </style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          {/* Left Side - Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 15px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            ← חזרה לעמוד הראשי
          </button>

          {/* Right Side - Cart + Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart.length === 0) {
                  alert('הסל שלך ריק');
                } else {
                  alert(`🛒 יש לך ${cart.length} פריטים בסל\nסה"כ: ₪${cart.reduce((sum: number, item: any) => sum + parseFloat(item.totalPrice), 0).toFixed(2)}`);
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🛒 צפייה בסל
            </button>

            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📝 הרשמה
            </button>

            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Center - Telegram Icon with Special Effects */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          position: 'relative'
        }}>
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 136, 204, 0.3) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
            zIndex: 1
          }} />
          
          {/* Main Icon */}
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '25px',
            background: `
              linear-gradient(135deg, #0088cc, #005580),
              radial-gradient(circle at 30% 30%, rgba(0, 170, 255, 0.3), transparent 70%),
              radial-gradient(circle at 70% 70%, rgba(0, 200, 255, 0.2), transparent 70%)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(0, 136, 204, 0.5), 0 0 50px rgba(0, 170, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.1)',
            position: 'relative',
            zIndex: 2,
            animation: 'glow 2s ease-in-out infinite alternate, pulse 3s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            border: '2px solid rgba(0, 170, 255, 0.3)',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) rotate(8deg)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4), 0 0 60px rgba(0, 136, 204, 0.8), 0 0 80px rgba(0, 170, 255, 0.6), 0 0 100px rgba(0, 200, 255, 0.4), inset 0 0 30px rgba(0, 200, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(0, 136, 204, 0.5), 0 0 50px rgba(0, 170, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.1)';
          }}
          >
            📱
          </div>
          
          {/* Floating Particles */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '8px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite',
            zIndex: 3
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '-15px',
            width: '6px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            animation: 'float 5s ease-in-out infinite reverse',
            zIndex: 3
          }} />
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.8rem',
          fontWeight: 'bold',
          margin: '0 0 15px 0',
          textAlign: 'center',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2ff 50%, #b3e5fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1,
          animation: 'glow 3s ease-in-out infinite alternate'
        }}>
          🚀 שירותי Telegram
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.3rem',
          textAlign: 'center',
          marginBottom: '40px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          position: 'relative',
          zIndex: 1,
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>
          ✨ כל השירותים הדרושים לקידום הטלגרם שלך ✨
        </p>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, rgba(0, 136, 204, 0.4) 0%, rgba(0, 85, 128, 0.3) 100%)' 
                  : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                border: selectedCategory === category 
                  ? '1px solid rgba(0, 136, 204, 0.5)' 
                  : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '30px',
                padding: '12px 25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                boxShadow: selectedCategory === category 
                  ? '0 8px 25px rgba(0, 136, 204, 0.3)' 
                  : '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.4)';
                } else {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 136, 204, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                } else {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 136, 204, 0.3)';
                }
              }}
            >
              {selectedCategory === category && '✨ '}{category}{selectedCategory === category && ' ✨'}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%),
                  radial-gradient(circle at top right, rgba(0, 136, 204, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 170, 255, 0.1) 0%, transparent 50%)
                `,
                borderRadius: '30px',
                padding: '30px',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255,255,255,0.25)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 20px rgba(0, 136, 204, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.05) rotateX(5deg)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%),
                  radial-gradient(circle at top right, rgba(0, 136, 204, 0.25) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 170, 255, 0.2) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25), 0 0 40px rgba(0, 136, 204, 0.4), 0 0 60px rgba(0, 170, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)';
                e.currentTarget.style.border = '2px solid rgba(255,255,255,0.5)';
                e.currentTarget.style.backdropFilter = 'blur(25px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%),
                  radial-gradient(circle at top right, rgba(0, 136, 204, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 170, 255, 0.1) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15), 0 0 20px rgba(0, 136, 204, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
                e.currentTarget.style.border = '2px solid rgba(255,255,255,0.25)';
                e.currentTarget.style.backdropFilter = 'blur(20px)';
              }}
            >
              {/* Hover Effect Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
                pointerEvents: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-100%)';
              }}
              />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginLeft: '15px'
                }}>
                  {service.icon}
                </div>
                <div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    margin: '0 0 5px 0'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    margin: '0'
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: '#4ade80',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {service.price}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  {service.min.toLocaleString()} - {service.max.toLocaleString()}
                </span>
              </div>

              <div style={{
                marginBottom: '20px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1rem',
                  margin: '0 0 10px 0'
                }}>
                  יתרונות:
                </h4>
                <ul style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  margin: '0',
                  paddingRight: '20px'
                }}>
                  {service.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Calculator */}
              {showCalculator === service.id && (
                <div style={{
                  background: `
                    linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
                    radial-gradient(circle at bottom left, rgba(0, 136, 204, 0.1) 0%, transparent 50%)
                  `,
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(15px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'slideInUp 0.5s ease-out'
                }}>
                  {/* Animated Background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(0, 136, 204, 0.05) 50%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                    pointerEvents: 'none'
                  }} />
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    margin: '0 0 15px 0'
                  }}>
                    בחר כמות:
                  </h4>
                  
                  <div style={{
                    marginBottom: '15px'
                  }}>
                    <input
                      type="range"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '5px',
                        background: 'rgba(255,255,255,0.3)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      <span>{service.min.toLocaleString()}</span>
                      <span>{service.max.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '1rem',
                        width: '120px',
                        textAlign: 'center'
                      }}
                      placeholder="כמות"
                    />
                    <span style={{
                      color: 'white',
                      fontSize: '1rem'
                    }}>
                      יחידות
                    </span>
                  </div>

                  <div style={{
                    background: `
                      linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%),
                      radial-gradient(circle at center, rgba(74, 222, 128, 0.1) 0%, transparent 70%)
                    `,
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(74, 222, 128, 0.2)'
                  }}>
                    {/* Animated Background */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(74, 222, 128, 0.1) 50%, transparent 70%)',
                      animation: 'float 6s ease-in-out infinite reverse',
                      pointerEvents: 'none'
                    }} />
                    
                    <div style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.9rem',
                      marginBottom: '8px',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      💰 מחיר כולל:
                    </div>
                    <div style={{
                      color: '#4ade80',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      position: 'relative',
                      zIndex: 1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    
                    {/* Sparkle Effect */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '15px',
                      fontSize: '1.2rem',
                      animation: 'float 3s ease-in-out infinite',
                      zIndex: 1
                    }}>
                      ✨
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '15px',
                      fontSize: '1rem',
                      animation: 'float 4s ease-in-out infinite reverse',
                      zIndex: 1
                    }}>
                      💎
                    </div>
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px',
                position: 'relative',
                zIndex: 2
              }}>
                <button
                  onClick={() => setShowCalculator(showCalculator === service.id ? null : service.id)}
                  style={{
                    flex: 1,
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%),
                      radial-gradient(circle at top left, rgba(0, 136, 204, 0.1) 0%, transparent 50%)
                    `,
                    border: '2px solid rgba(255,255,255,0.35)',
                    borderRadius: '20px',
                    padding: '15px',
                    color: 'white',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15), 0 0 15px rgba(0, 136, 204, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.2) 100%),
                      radial-gradient(circle at top left, rgba(0, 136, 204, 0.2) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25), 0 0 25px rgba(0, 136, 204, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.6)';
                    e.currentTarget.style.backdropFilter = 'blur(20px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%),
                      radial-gradient(circle at top left, rgba(0, 136, 204, 0.1) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15), 0 0 15px rgba(0, 136, 204, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.35)';
                    e.currentTarget.style.backdropFilter = 'blur(15px)';
                  }}
                >
                  {showCalculator === service.id ? 'סגור מחשבון' : 'מחשבון מחיר'}
                </button>
                
                <button
                  onClick={() => handleAddToCart(service.id)}
                  style={{
                    flex: 1,
                    background: `
                      linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 50%)
                    `,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px',
                    padding: '15px',
                    color: 'white',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontWeight: 'bold',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(74, 222, 128, 0.4), 0 0 15px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, #5eea8f 0%, #34d399 50%, #22c55e 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.3) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(74, 222, 128, 0.6), 0 0 25px rgba(34, 197, 94, 0.5), 0 0 35px rgba(22, 163, 74, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.5)';
                    e.currentTarget.style.backdropFilter = 'blur(15px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4), 0 0 15px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                    e.currentTarget.style.backdropFilter = 'blur(10px)';
                  }}
                >
                  🛒 הוסף לסל
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem',
          marginTop: '40px',
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p>© 2024 SocialMax - כל הזכויות שמורות</p>
          <p>שירותי קידום מדיה חברתית מקצועיים</p>
        </div>
      </div>
    </div>
  );
};

export default TelegramServices;
