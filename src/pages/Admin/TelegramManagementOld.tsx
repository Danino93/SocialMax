import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TelegramManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(100);
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('members');
  const [showTargetType, setShowTargetType] = useState<boolean>(false);
  const [selectedTargetType, setSelectedTargetType] = useState<string>('');
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState<boolean>(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<Array<{
    id: string;
    feature: string;
    quantity: number;
    targetUrl: string;
    sourceUrl: string;
    targetType: string;
    timestamp: string;
    status: 'success' | 'pending' | 'failed';
  }>>([]);


  const targetTypes = [
    { id: 'bot', name: 'בוט', icon: '🤖', description: 'הוספת חברים לבוט' },
    { id: 'group', name: 'קבוצה', icon: '👥', description: 'הוספת חברים לקבוצה' },
    { id: 'channel', name: 'ערוץ', icon: '📢', description: 'הוספת מנויים לערוץ' },
    { id: 'private', name: 'משתמש פרטי', icon: '👤', description: 'הוספת חברים למשתמש פרטי' }
  ];

  const telegramFeatures = {
    members: [
      {
        id: 'regular_members',
        name: 'הוספת חברים רגילים',
        description: 'הוספת חברים רגילים (בוטים + אמיתיים)',
        min: 50,
        max: 10000,
        details: 'חברים איכותיים עם פרופילים מלאים',
        icon: '👥',
        parameters: {
          quantity: { label: 'כמות חברים', min: 50, max: 10000, required: true },
          targetType: { label: 'סוג יעד', required: true },
          url: { label: 'URL יעד', required: true }
        }
      },
      {
        id: 'premium_members',
        name: 'הוספת חברי פרמיום',
        description: 'הוספת חברי פרמיום (חשבונות מאומתים)',
        min: 20,
        max: 5000,
        details: 'חשבונות מאומתים עם טיק כחול',
        icon: '⭐',
        parameters: {
          quantity: { label: 'כמות חברים פרמיום', min: 20, max: 5000, required: true },
          targetType: { label: 'סוג יעד', required: true },
          url: { label: 'URL יעד', required: true }
        }
      },
      {
        id: 'auto_group_join',
        name: 'הוספה אוטומטית לקבוצות',
        description: 'הוספה אוטומטית לקבוצות (עד 200K משתמשים)',
        min: 100,
        max: 200000,
        details: 'הצטרפות אוטומטית לקבוצות גדולות',
        icon: '🚀',
        parameters: {
          quantity: { label: 'כמות קבוצות להצטרף', min: 1, max: 50, required: true },
          groupList: { label: 'רשימת קבוצות (CSV)', required: true, type: 'file' },
          delay: { label: 'עיכוב בין הצטרפות (דקות)', required: true, type: 'number', min: 1, max: 60 },
          maxMembers: { label: 'מקסימום חברים בקבוצה', required: true, type: 'number', min: 100, max: 200000 }
        }
      },
      {
        id: 'transfer_members',
        name: 'העברת חברים בין קבוצות',
        description: 'העברת חברים בין קבוצות',
        min: 10,
        max: 1000,
        details: 'העברה חכמה בין קבוצות קשורות',
        icon: '🔄',
        parameters: {
          quantity: { label: 'כמות חברים להעביר', min: 10, max: 1000, required: true },
          sourceUrl: { label: 'קבוצה מקור', required: true },
          targetUrl: { label: 'קבוצה יעד', required: true },
          transferType: { label: 'סוג העברה', required: true, type: 'select', options: ['כל החברים', 'חברים אקטיביים', 'חברים לפי קריטריון'] },
          delay: { label: 'עיכוב בין העברות (שניות)', required: true, type: 'number', min: 1, max: 300 }
        }
      },
      {
        id: 'bulk_member_import',
        name: 'ייבוא חברים מהרשימה',
        description: 'ייבוא חברים מרשימת קשרים או CSV',
        min: 10,
        max: 50000,
        details: 'ייבוא אוטומטי של רשימות משתמשים',
        icon: '📋',
        parameters: {
          file: { label: 'קובץ CSV/רשימה', required: true, type: 'file' },
          targetUrl: { label: 'קבוצה/ערוץ יעד', required: true },
          importType: { label: 'סוג ייבוא', required: true, type: 'select', options: ['רשימת קשרים', 'קובץ CSV', 'רשימת משתמשים'] },
          delay: { label: 'עיכוב בין הוספות (שניות)', required: true, type: 'number', min: 1, max: 60 },
          verifyAccounts: { label: 'אימות חשבונות', required: true, type: 'select', options: ['כן', 'לא'] }
        }
      },
      {
        id: 'member_verification',
        name: 'אימות חברים אוטומטי',
        description: 'אימות אוטומטי של חברים חדשים',
        min: 1,
        max: 1000,
        details: 'בדיקת אמינות ואיכות חברים',
        icon: '✅',
        parameters: {
          url: { label: 'קבוצה/ערוץ לבדיקה', required: true },
          criteria: { label: 'קריטריוני בדיקה', required: true, type: 'multiselect', options: ['פרופיל מלא', 'תמונת פרופיל', 'היסטוריית פעילות', 'גיל החשבון', 'מספר חברים'] },
          action: { label: 'פעולה לחברים לא מאומתים', required: true, type: 'select', options: ['הסרה', 'חסימה', 'התראה למנהל'] },
          autoRemove: { label: 'הסרה אוטומטית', required: true, type: 'select', options: ['כן', 'לא'] }
        }
      }
    ],
    targeting: [
      {
        id: 'geo_targeting',
        name: 'מיקוד גיאוגרפי',
        description: 'מיקוד גיאוגרפי (ישראל, ארה"ב, אירופה, כל העולם)',
        min: 100,
        max: 50000,
        details: 'מיקוד מדויק לפי מיקום גיאוגרפי',
        icon: '🌍',
        parameters: {
          location: { label: 'מיקום גיאוגרפי', required: true, type: 'select', options: ['ישראל', 'ארה"ב', 'אירופה', 'כל העולם'] },
          quantity: { label: 'כמות משתמשים', min: 100, max: 50000, required: true },
          url: { label: 'קבוצה/ערוץ יעד', required: true }
        }
      },
      {
        id: 'demo_targeting',
        name: 'מיקוד דמוגרפי',
        description: 'מיקוד דמוגרפי (גיל, מין, תחומי עניין)',
        min: 50,
        max: 25000,
        details: 'מיקוד לפי גיל, מין ותחומי עניין',
        icon: '🎯',
        parameters: {
          ageRange: { label: 'טווח גיל', required: true, type: 'select', options: ['18-25', '26-35', '36-45', '46+'] },
          gender: { label: 'מין', required: true, type: 'select', options: ['גברים', 'נשים', 'כולם'] },
          quantity: { label: 'כמות משתמשים', min: 50, max: 25000, required: true },
          url: { label: 'קבוצה/ערוץ יעד', required: true }
        }
      },
      {
        id: 'interest_targeting',
        name: 'מיקוד תחומי עניין',
        description: 'מיקוד לפי תחומי עניין ספציפיים',
        min: 100,
        max: 100000,
        details: 'מיקוד לפי תחומי עניין ופעילות',
        icon: '💡',
        parameters: {
          interests: { label: 'תחומי עניין', required: true, type: 'multiselect', options: ['טכנולוגיה', 'ספורט', 'מוזיקה', 'אוכל', 'טיולים', 'אופנה'] },
          quantity: { label: 'כמות משתמשים', min: 100, max: 100000, required: true },
          url: { label: 'קבוצה/ערוץ יעד', required: true }
        }
      },
      {
        id: 'behavior_targeting',
        name: 'מיקוד התנהגותי',
        description: 'מיקוד לפי התנהגות משתמשים',
        min: 50,
        max: 50000,
        details: 'מיקוד לפי דפוסי התנהגות',
        icon: '🧠',
        parameters: {
          behavior: { label: 'דפוס התנהגות', required: true, type: 'select', options: ['אקטיביים', 'צופים בלבד', 'מגיבים', 'משתפים'] },
          quantity: { label: 'כמות משתמשים', min: 50, max: 50000, required: true },
          url: { label: 'קבוצה/ערוץ יעד', required: true }
        }
      },
      {
        id: 'device_targeting',
        name: 'מיקוד מכשירים',
        description: 'מיקוד לפי סוג מכשיר (iOS/Android)',
        min: 100,
        max: 75000,
        details: 'מיקוד לפי פלטפורמת מכשיר',
        icon: '📱',
        parameters: {
          device: { label: 'סוג מכשיר', required: true, type: 'select', options: ['iOS', 'Android', 'כולם'] },
          quantity: { label: 'כמות משתמשים', min: 100, max: 75000, required: true },
          url: { label: 'קבוצה/ערוץ יעד', required: true }
        }
      }
    ],
    groups: [
      {
        id: 'channel_boost',
        name: 'בוסטים לערוצים',
        description: 'בוסטים לערוצים (העלאת דירוג אלגוריתם)',
        min: 1000,
        max: 100000,
        details: 'העלאת דירוג אלגוריתם של הערוץ',
        icon: '📈',
        parameters: {
          channelUrl: { label: 'URL הערוץ', required: true },
          boostType: { label: 'סוג בוסט', required: true, type: 'select', options: ['צפיות בפוסטים', 'מנויים חדשים', 'אינטראקציה', 'שיתופים'] },
          quantity: { label: 'כמות בוסטים', min: 1000, max: 100000, required: true },
          duration: { label: 'משך הבוסט (ימים)', required: true, type: 'number', min: 1, max: 30 },
          targetAudience: { label: 'קהל יעד', required: true, type: 'select', options: ['כל העולם', 'ישראל', 'ארה"ב', 'אירופה'] }
        }
      },
      {
        id: 'spam_reports',
        name: 'דיווחי ספאם אוטומטיים',
        description: 'דיווחי ספאם אוטומטיים (להורדת קבוצות מתחרות)',
        min: 1,
        max: 100,
        details: 'דיווחים אוטומטיים לקבוצות מתחרות',
        icon: '🚨',
        parameters: {
          targetGroups: { label: 'רשימת קבוצות לדיווח', required: true, type: 'textarea' },
          reportType: { label: 'סוג דיווח', required: true, type: 'select', options: ['ספאם', 'תוכן לא הולם', 'הטרדה', 'הונאה'] },
          quantity: { label: 'כמות דיווחים', min: 1, max: 100, required: true },
          delay: { label: 'עיכוב בין דיווחים (דקות)', required: true, type: 'number', min: 1, max: 60 },
          accounts: { label: 'חשבונות לדיווח', required: true, type: 'select', options: ['חשבונות אמיתיים', 'חשבונות בוטים', 'מעורב'] }
        }
      },
      {
        id: 'group_analysis',
        name: 'ניתוח איכות קבוצות',
        description: 'ניתוח איכות קבוצות לפני הצטרפות',
        min: 1,
        max: 50,
        details: 'ניתוח מפורט של איכות הקבוצה',
        icon: '🔍',
        parameters: {
          groupList: { label: 'רשימת קבוצות לניתוח', required: true, type: 'textarea' },
          analysisType: { label: 'סוג ניתוח', required: true, type: 'multiselect', options: ['איכות חברים', 'רמת אקטיביות', 'תוכן הקבוצה', 'מנהלים', 'גיל הקבוצה'] },
          reportFormat: { label: 'פורמט דוח', required: true, type: 'select', options: ['PDF', 'Excel', 'CSV', 'JSON'] },
          includeRecommendations: { label: 'כלול המלצות', required: true, type: 'select', options: ['כן', 'לא'] }
        }
      },
      {
        id: 'retention_tracking',
        name: 'מעקב שיעור השמירה',
        description: 'מעקב אחר שיעור השמירה של חברים חדשים',
        min: 100,
        max: 10000,
        details: 'מעקב אחר שיעור השמירה של חברים',
        icon: '📊',
        parameters: {
          groupUrl: { label: 'URL הקבוצה', required: true },
          trackingPeriod: { label: 'תקופת מעקב (ימים)', required: true, type: 'number', min: 1, max: 365 },
          memberThreshold: { label: 'כמות חברים מינימלית', min: 100, max: 10000, required: true },
          reportFrequency: { label: 'תדירות דוחות', required: true, type: 'select', options: ['יומי', 'שבועי', 'חודשי'] },
          alertThreshold: { label: 'סף התראה (אחוז יציאה)', required: true, type: 'number', min: 1, max: 100 }
        }
      },
      {
        id: 'group_creation',
        name: 'יצירת קבוצות אוטומטית',
        description: 'יצירת קבוצות חדשות עם הגדרות מותאמות',
        min: 1,
        max: 100,
        details: 'יצירה אוטומטית של קבוצות עם תבניות',
        icon: '🏗️',
        parameters: {
          groupName: { label: 'שם הקבוצה', required: true },
          groupDescription: { label: 'תיאור הקבוצה', required: true, type: 'textarea' },
          groupType: { label: 'סוג קבוצה', required: true, type: 'select', options: ['פרטית', 'ציבורית', 'ערוץ'] },
          initialMembers: { label: 'חברים ראשוניים', required: true, type: 'textarea' },
          groupRules: { label: 'חוקי הקבוצה', required: true, type: 'textarea' },
          autoModeration: { label: 'מודרציה אוטומטית', required: true, type: 'select', options: ['כן', 'לא'] }
        }
      },
      {
        id: 'channel_management',
        name: 'ניהול ערוצים מתקדם',
        description: 'ניהול ערוצים עם כלים מתקדמים',
        min: 1,
        max: 50,
        details: 'כלים מתקדמים לניהול ערוצים',
        icon: '⚙️',
        parameters: {
          channelUrl: { label: 'URL הערוץ', required: true },
          managementType: { label: 'סוג ניהול', required: true, type: 'multiselect', options: ['פרסום אוטומטי', 'ניהול מנויים', 'מודרציה', 'סטטיסטיקות'] },
          schedule: { label: 'לוח זמנים', required: true, type: 'select', options: ['יומי', 'שבועי', 'חודשי', 'מותאם אישית'] },
          contentType: { label: 'סוג תוכן', required: true, type: 'select', options: ['טקסט', 'תמונה', 'וידאו', 'מעורב'] }
        }
      },
      {
        id: 'moderator_tools',
        name: 'כלי מנהלים מתקדמים',
        description: 'כלים מתקדמים למנהלי קבוצות',
        min: 1,
        max: 20,
        details: 'כלים מתקדמים לניהול קבוצות',
        icon: '👑',
        parameters: {
          url: { label: 'קבוצה/ערוץ לניהול', required: true },
          tools: { label: 'כלים להפעלה', required: true, type: 'multiselect', options: ['חסימה אוטומטית', 'הסרת ספאם', 'ניהול הרשאות', 'סטטיסטיקות'] }
        }
      },
      {
        id: 'content_moderation',
        name: 'סינון תוכן אוטומטי',
        description: 'סינון והסרת תוכן לא רצוי',
        min: 1,
        max: 100,
        details: 'סינון אוטומטי של תוכן לא מתאים',
        icon: '🛡️'
      }
    ],
    automation: [
      {
        id: 'scheduled_messages',
        name: 'בוט שליחת הודעות מתוזמן',
        description: 'בוט שליחת הודעות מתוזמן (לאלפי משתמשים)',
        min: 100,
        max: 100000,
        details: 'שליחת הודעות מתוזמנות לאלפי משתמשים',
        icon: '⏰',
        parameters: {
          message: { label: 'תוכן ההודעה', required: true, type: 'textarea' },
          schedule: { label: 'זמן שליחה', required: true, type: 'datetime' },
          recipients: { label: 'רשימת נמענים', required: true, type: 'textarea' },
          repeat: { label: 'חזרה', required: false, type: 'select', options: ['פעם אחת', 'יומי', 'שבועי', 'חודשי'] }
        }
      },
      {
        id: 'auto_posting',
        name: 'פרסום אוטומטי לקבוצות',
        description: 'פרסום אוטומטי לקבוצות (רשימות ממוקדות)',
        min: 10,
        max: 1000,
        details: 'פרסום אוטומטי לקבוצות ממוקדות',
        icon: '📢'
      },
      {
        id: 'ai_responses',
        name: 'תשובות אוטומטיות חכמות',
        description: 'תשובות אוטומטיות חכמות (AI responses)',
        min: 1,
        max: 100,
        details: 'תשובות אוטומטיות מבוססות AI',
        icon: '🤖'
      },
      {
        id: 'activity_tracking',
        name: 'מעקב אקטיביות הקבוצה',
        description: 'מעקב אחר אקטיביות הקבוצה',
        min: 1,
        max: 50,
        details: 'מעקב מפורט אחר אקטיביות הקבוצה',
        icon: '📈'
      },
      {
        id: 'smart_messages',
        name: 'הודעות מותאמות לפי זמן',
        description: 'שליחת הודעות מותאמות לפי זמן פעילות המשתמש',
        min: 100,
        max: 50000,
        details: 'הודעות מותאמות לזמן הפעילות',
        icon: '⏱️'
      },
      {
        id: 'admin_detection',
        name: 'זיהוי אדמינים חוסמים',
        description: 'זיהוי וטיפול באדמינים שחוסמים בוטים',
        min: 1,
        max: 20,
        details: 'זיהוי אוטומטי של אדמינים חוסמים',
        icon: '🛡️'
      },
      {
        id: 'bot_creation',
        name: 'יצירת בוטים מותאמים',
        description: 'יצירת בוטים מותאמים אישית עם פונקציונליות מתקדמת',
        min: 1,
        max: 10,
        details: 'יצירת בוטים עם פונקציות מותאמות',
        icon: '🔧'
      },
      {
        id: 'auto_reactions',
        name: 'ריאקציות אוטומטיות',
        description: 'ריאקציות אוטומטיות להודעות מסוימות',
        min: 1,
        max: 1000,
        details: 'ריאקציות אוטומטיות לפי מילות מפתח',
        icon: '😊'
      },
      {
        id: 'message_forwarding',
        name: 'העברת הודעות אוטומטית',
        description: 'העברת הודעות בין קבוצות וערוצים',
        min: 1,
        max: 1000,
        details: 'העברה אוטומטית של הודעות',
        icon: '↗️'
      },
      {
        id: 'auto_ban',
        name: 'חסימה אוטומטית',
        description: 'חסימה אוטומטית של משתמשים לפי קריטריונים',
        min: 1,
        max: 100,
        details: 'חסימה אוטומטית לפי כללים מוגדרים',
        icon: '🚫'
      }
    ],
    views: [
      {
        id: 'story_views',
        name: 'צפיות בסטוריז',
        description: 'צפיות בסטוריז (מיידי או מדורג)',
        min: 100,
        max: 10000,
        details: 'צפיות איכותיות בסטוריז',
        icon: '👁️'
      },
      {
        id: 'post_views',
        name: 'צפיות בפוסטים',
        description: 'צפיות בפוסטים (אורגני או מזויף)',
        min: 100,
        max: 50000,
        details: 'צפיות בפוסטים עם אפשרות אורגנית',
        icon: '📱'
      },
      {
        id: 'auto_reactions',
        name: 'ריאקציות אוטומטיות',
        description: 'ריאקציות אוטומטיות (אמוג\'ים מותאמים)',
        min: 50,
        max: 10000,
        details: 'ריאקציות אוטומטיות עם אמוג\'ים מותאמים',
        icon: '😊'
      },
      {
        id: 'content_summary',
        name: 'תקציר חכם של תוכן',
        description: 'תקציר חכם של תוכן הקבוצה',
        min: 1,
        max: 10,
        details: 'תקציר אוטומטי של תוכן הקבוצה',
        icon: '📝'
      },
      {
        id: 'keyword_responses',
        name: 'תגובות אוטומטיות לפי מילות מפתח',
        description: 'הגדרת תגובות אוטומטיות לפי מילות מפתח',
        min: 1,
        max: 50,
        details: 'תגובות אוטומטיות לפי מילות מפתח',
        icon: '🔑'
      },
      {
        id: 'voice_messages',
        name: 'הודעות קוליות אוטומטיות',
        description: 'שליחת הודעות קוליות אוטומטיות',
        min: 1,
        max: 1000,
        details: 'הודעות קוליות מותאמות אישית',
        icon: '🎤'
      },
      {
        id: 'video_messages',
        name: 'הודעות וידאו אוטומטיות',
        description: 'שליחת הודעות וידאו אוטומטיות',
        min: 1,
        max: 500,
        details: 'הודעות וידאו מותאמות אישית',
        icon: '🎥'
      },
      {
        id: 'file_sharing',
        name: 'שיתוף קבצים אוטומטי',
        description: 'שיתוף קבצים אוטומטי בקבוצות',
        min: 1,
        max: 100,
        details: 'שיתוף אוטומטי של קבצים',
        icon: '📎'
      },
      {
        id: 'poll_creation',
        name: 'יצירת סקרים אוטומטית',
        description: 'יצירת סקרים ושאלונים אוטומטית',
        min: 1,
        max: 50,
        details: 'יצירה אוטומטית של סקרים',
        icon: '📊'
      },
      {
        id: 'sticker_packs',
        name: 'חבילות מדבקות מותאמות',
        description: 'יצירת חבילות מדבקות מותאמות אישית',
        min: 1,
        max: 10,
        details: 'חבילות מדבקות מותאמות למותג',
        icon: '🎭'
      }
    ],
    advanced: [
      {
        id: 'ai_campaign_manager',
        name: 'מנהל קמפיינים AI',
        description: 'ניהול קמפיינים חכם מבוסס AI',
        min: 1,
        max: 10,
        details: 'ניהול קמפיינים אוטומטי עם AI',
        icon: '🧠',
        parameters: {
          campaignGoal: { label: 'מטרת הקמפיין', required: true, type: 'select', options: ['הגדלת עוקבים', 'הגדלת אינטראקציה', 'מכירות', 'הכרת המותג'] },
          targetAudience: { label: 'קהל יעד', required: true, type: 'textarea' },
          budget: { label: 'תקציב (שקלים)', required: true, type: 'number' },
          duration: { label: 'משך הקמפיין (ימים)', required: true, type: 'number' }
        }
      },
      {
        id: 'cross_platform_sync',
        name: 'סינכרון בין פלטפורמות',
        description: 'סינכרון עם פלטפורמות אחרות',
        min: 1,
        max: 5,
        details: 'סינכרון אוטומטי בין פלטפורמות',
        icon: '🔄'
      },
      {
        id: 'smart_analytics',
        name: 'דשבורד אנליטיקס חכם',
        description: 'דשבורד אנליטיקס חכם',
        min: 1,
        max: 1,
        details: 'ניתוח מתקדם של ביצועים',
        icon: '📊'
      },
      {
        id: 'voice_automation',
        name: 'אוטומציה קולית',
        description: 'אוטומציה קולית בעברית',
        min: 1,
        max: 10,
        details: 'אוטומציה קולית מתקדמת',
        icon: '🎙️'
      },
      {
        id: 'security_protection',
        name: 'אבטחה והגנה',
        description: 'הגנה מפני חסימות ודיווחים',
        min: 1,
        max: 5,
        details: 'הגנה מתקדמת מפני חסימות',
        icon: '🛡️'
      },
      {
        id: 'israeli_intelligence',
        name: 'מודיעין שוק ישראלי',
        description: 'מודיעין שוק ישראלי',
        min: 1,
        max: 1,
        details: 'ניתוח שוק ישראלי מתקדם',
        icon: '🇮🇱'
      },
      {
        id: 'gamification',
        name: 'מערכת גיימיפיקציה',
        description: 'מערכת גיימיפיקציה',
        min: 1,
        max: 1,
        details: 'מערכת נקודות ותגמולים',
        icon: '🎮'
      },
      {
        id: 'community_features',
        name: 'פיצ\'רים קהילתיים',
        description: 'פיצ\'רים קהילתיים',
        min: 1,
        max: 5,
        details: 'כלים לקהילה ומשתמשים',
        icon: '🤝'
      },
      {
        id: 'ecommerce_integration',
        name: 'אינטגרציה מסחרית',
        description: 'אינטגרציה עם מסחר אלקטרוני',
        min: 1,
        max: 3,
        details: 'אינטגרציה עם פלטפורמות מסחר',
        icon: '🛍️'
      },
      {
        id: 'hebrew_ai',
        name: 'AI בעברית ובערבית',
        description: 'AI בעברית ובערבית',
        min: 1,
        max: 1,
        details: 'עיבוד שפה טבעית בעברית',
        icon: '🗣️'
      }
    ]
  };

  const categories = [
    { id: 'members', name: 'חברים וחברות', icon: '👥', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'targeting', name: 'מיקוד ופילוח', icon: '🎯', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'groups', name: 'כלי קבוצות וערוצים', icon: '📢', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'automation', name: 'אוטומציה מתקדמת', icon: '🤖', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'views', name: 'צפיות ואינטראקציה', icon: '👁️', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'פיצ\'רים מתקדמים', icon: '🚀', color: 'linear-gradient(135deg, #ffd700, #ffed4e)' }
  ];

  const currentFeatures = telegramFeatures[selectedCategory as keyof typeof telegramFeatures] || [];
  const selectedFeatureData = currentFeatures.find(f => f.id === selectedFeature);

  const handleExecute = async () => {
    if (!selectedFeature || !targetUrl) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    // בדיקה אם צריך לבחור סוג יעד
    if ((selectedFeature === 'regular_members' || selectedFeature === 'premium_members') && !selectedTargetType) {
      setShowTargetType(true);
      return;
    }

    setIsExecuting(true);
    
    // קמפיין מתקדם - מספר פיצ'רים
    if (showAdvancedCampaign && selectedFeatures.length > 0) {
      const campaignActivities = selectedFeatures.map(featureId => {
        // חיפוש הפיצ'ר בכל הקטגוריות
        const feature = Object.values(telegramFeatures).flat().find(f => f.id === featureId);
        return {
          id: `${Date.now()}_${featureId}`,
          feature: feature?.name || '',
          quantity: quantity,
          targetUrl: targetUrl,
          sourceUrl: sourceUrl,
          targetType: selectedTargetType ? targetTypes.find(t => t.id === selectedTargetType)?.name || '' : '',
          timestamp: new Date().toLocaleString('he-IL'),
          status: 'pending' as const
        };
      });
      
      setActivityHistory(prev => [...campaignActivities, ...prev]);
      
      // סימולציה של הפעלת הקמפיין
      setTimeout(() => {
        setIsExecuting(false);
        
        // עדכון סטטוס לכל הפעולות בקמפיין
        setActivityHistory(prev => 
          prev.map(activity => 
            campaignActivities.some(ca => ca.id === activity.id)
              ? { ...activity, status: 'success' as const }
              : activity
          )
        );
        
        alert(`✅ הקמפיין הופעל בהצלחה!\n\nפלטפורמה: Telegram\nפיצ'רים: ${selectedFeatures.length}\nכמות: ${quantity}\nיעד: ${targetUrl}\nמקור: ${sourceUrl || 'לא נבחר'}\nסוג יעד: ${selectedTargetType ? targetTypes.find(t => t.id === selectedTargetType)?.name : 'לא נבחר'}`);
        
        // איפוס הקמפיין
        setSelectedFeatures([]);
        setShowAdvancedCampaign(false);
      }, 3000);
      
    } else {
      // פיצ'ר יחיד
      const newActivity = {
        id: Date.now().toString(),
        feature: selectedFeatureData?.name || '',
        quantity: quantity,
        targetUrl: targetUrl,
        sourceUrl: sourceUrl,
        targetType: selectedTargetType ? targetTypes.find(t => t.id === selectedTargetType)?.name || '' : '',
        timestamp: new Date().toLocaleString('he-IL'),
        status: 'pending' as const
      };
      
      setActivityHistory(prev => [newActivity, ...prev]);
      
      // סימולציה של הפעלת הפיצ'ר
      setTimeout(() => {
        setIsExecuting(false);
        
        // עדכון סטטוס להיסטוריה
        setActivityHistory(prev => 
          prev.map(activity => 
            activity.id === newActivity.id 
              ? { ...activity, status: 'success' as const }
              : activity
          )
        );
        
        alert(`✅ הפיצ'ר הופעל בהצלחה!\n\nפלטפורמה: Telegram\nפיצ'ר: ${selectedFeatureData?.name}\nכמות: ${quantity}\nיעד: ${targetUrl}\nמקור: ${sourceUrl || 'לא נבחר'}\nסוג יעד: ${selectedTargetType ? targetTypes.find(t => t.id === selectedTargetType)?.name : 'לא נבחר'}`);
      }, 2000);
    }
  };

  const calculateCost = () => {
    return 'חינם - אדמין';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      direction: 'rtl'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
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
            ← חזרה לדשבורד
          </button>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0088cc, #00a8ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            ✈️
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          ניהול Telegram
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: 0
        }}>
          שליטה מלאה בכל הפיצ'רים של טלגרם - חברים, קבוצות, אוטומציה וצפיות
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          {/* Features Panel */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: '0 0 25px 0',
              textAlign: 'center'
            }}>
              בחר קטגוריה
            </h2>

            {/* Category Selection */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '30px'
            }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedFeature('');
                  }}
                  style={{
                    background: selectedCategory === category.id 
                      ? 'rgba(255,255,255,0.3)' 
                      : 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '15px',
                    padding: '20px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                  <span style={{ fontWeight: 'bold', textAlign: 'center' }}>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Feature Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                בחר פיצ'ר:
              </label>
              <select
                value={selectedFeature}
                onChange={(e) => setSelectedFeature(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">בחר פיצ'ר...</option>
                {currentFeatures.map((feature) => (
                  <option key={feature.id} value={feature.id} style={{ color: '#000' }}>
                    {feature.icon} {feature.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Details */}
            {selectedFeatureData && (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '25px'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: '0 0 10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>{selectedFeatureData.icon}</span>
                  {selectedFeatureData.name}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  margin: '0 0 15px 0'
                }}>
                  {selectedFeatureData.description}
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {selectedFeatureData.details}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                כמות:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                min={selectedFeatureData?.min || 0}
                max={selectedFeatureData?.max || 100000}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="הזן כמות..."
              />
              {selectedFeatureData && (
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  marginTop: '5px'
                }}>
                  טווח: {selectedFeatureData.min.toLocaleString()} - {selectedFeatureData.max.toLocaleString()}
                </div>
              )}
            </div>

            {/* Target URL */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                URL יעד:
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="https://t.me/username"
              />
            </div>

            {/* User Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                קבוצה מקור (אופציונלי):
              </label>
              <input
                type="text"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="הכנס URL של קבוצה מקור (לפיצ'רים כמו העברת חברים)"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Target Type Selection */}
            {showTargetType && (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '25px',
                border: '2px solid #4ade80'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  margin: '0 0 15px 0',
                  textAlign: 'center'
                }}>
                  בחר סוג יעד
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '10px'
                }}>
                  {targetTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedTargetType(type.id);
                        setShowTargetType(false);
                      }}
                      style={{
                        background: selectedTargetType === type.id 
                          ? 'rgba(255,255,255,0.3)' 
                          : 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        padding: '15px',
                        color: 'white',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTargetType !== type.id) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTargetType !== type.id) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        }
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                      <span style={{ fontWeight: 'bold' }}>{type.name}</span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced Campaign Button */}
            <button
              onClick={() => setShowAdvancedCampaign(!showAdvancedCampaign)}
              style={{
                width: '100%',
                background: showAdvancedCampaign 
                  ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                  : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '15px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {showAdvancedCampaign ? '❌ סגור קמפיין מתקדם' : '🎯 קמפיין מתקדם - מספר פעולות'}
            </button>

            {/* Advanced Campaign Panel */}
            {showAdvancedCampaign && (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '25px',
                border: '2px solid #ffd700'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  margin: '0 0 15px 0',
                  textAlign: 'center'
                }}>
                  בחר פיצ'רים מכל הקטגוריות
                </h3>
                
                {/* Category Tabs */}
                <div style={{
                  display: 'flex',
                  gap: '5px',
                  marginBottom: '15px',
                  overflowX: 'auto',
                  paddingBottom: '5px'
                }}>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      style={{
                        background: selectedCategory === category.id 
                          ? 'rgba(255,255,255,0.3)' 
                          : 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Features List */}
                <div style={{
                  display: 'grid',
                  gap: '10px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  {Object.values(telegramFeatures).flat().map((feature) => (
                    <label key={feature.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: selectedFeatures.includes(feature.id) ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFeatures([...selectedFeatures, feature.id]);
                          } else {
                            setSelectedFeatures(selectedFeatures.filter(id => id !== feature.id));
                          }
                        }}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>{feature.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                          {feature.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {selectedFeatures.length > 0 && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: 'rgba(76, 222, 128, 0.2)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>
                      נבחרו {selectedFeatures.length} פיצ'רים לקמפיין
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Execute Button */}
            <button
              onClick={handleExecute}
              disabled={isExecuting || !selectedFeature || !targetUrl}
              style={{
                width: '100%',
                background: isExecuting 
                  ? 'rgba(255,255,255,0.3)' 
                  : 'linear-gradient(135deg, #0088cc, #00a8ff)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: isExecuting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isExecuting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isExecuting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isExecuting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isExecuting ? '🔄 מפעיל...' : 
               showAdvancedCampaign && selectedFeatures.length > 0 ? 
               `🚀 הפעל קמפיין (${selectedFeatures.length} פיצ'רים)` : 
               '🚀 הפעל פיצ\'ר Telegram'}
            </button>
          </div>

          {/* Activity History Panel */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: '0 0 25px 0',
              textAlign: 'center'
            }}>
              היסטוריית פעילות
            </h2>

            {activityHistory.length > 0 ? (
              <div style={{
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                {activityHistory.map((activity) => (
                  <div key={activity.id} style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    padding: '15px',
                    marginBottom: '15px',
                    border: `2px solid ${
                      activity.status === 'success' ? '#4ade80' : 
                      activity.status === 'pending' ? '#fbbf24' : '#ef4444'
                    }`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <h4 style={{
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        margin: 0
                      }}>
                        {activity.feature}
                      </h4>
                      <span style={{
                        background: activity.status === 'success' ? '#4ade80' : 
                                   activity.status === 'pending' ? '#fbbf24' : '#ef4444',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {activity.status === 'success' ? '✅ הושלם' : 
                         activity.status === 'pending' ? '⏳ בתהליך' : '❌ נכשל'}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gap: '5px',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                        <strong>כמות:</strong> {activity.quantity.toLocaleString()}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                        <strong>יעד:</strong> {activity.targetUrl}
                      </div>
                      {activity.sourceUrl && (
                        <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                          <strong>מקור:</strong> {activity.sourceUrl}
                        </div>
                      )}
                      {activity.targetType && (
                        <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                          <strong>סוג יעד:</strong> {activity.targetType}
                        </div>
                      )}
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1.1rem',
                padding: '40px 20px'
              }}>
                עדיין לא בוצעו פעולות
                <br />
                <span style={{ fontSize: '0.9rem' }}>
                  הפעל פיצ'ר כדי לראות את ההיסטוריה
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramManagement;
