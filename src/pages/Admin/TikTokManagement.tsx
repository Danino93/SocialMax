import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TikTokManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('views');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [dynamicParams, setDynamicParams] = useState<{[key: string]: any}>({});
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // פיצ'רים לטיקטוק
  const tiktokFeatures = {
    views: [
      {
        id: 'video_views',
        name: 'צפיות לסרטון',
        description: 'הוספת צפיות לסרטון טיקטוק',
        min: 1000,
        max: 1000000,
        details: 'צפיות איכותיות לסרטון שלך',
        icon: '👁️',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 1000,
            max: 1000000,
            required: true
          },
          watchTime: {
            label: 'זמן צפייה',
            type: 'select',
            options: ['צפייה מלאה', '75% מהסרטון', '50% מהסרטון', '25% מהסרטון'],
            required: true
          },
          deviceType: {
            label: 'סוג מכשיר',
            type: 'multiselect',
            options: ['נייד', 'דסקטופ', 'טאבלט', 'TV'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 13-17', 'גילאי 18-24', 'גילאי 25-34', 'גילאי 35+'],
            required: true
          }
        }
      },
      {
        id: 'live_views',
        name: 'צפיות בשידור חי',
        description: 'צפיות בשידור חי בטיקטוק',
        min: 100,
        max: 50000,
        details: 'צפיות בשידור חי עם אינטראקציה',
        icon: '📺',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 50000,
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 דקות', '30 דקות', '1 שעה', '2 שעות', 'מלא'],
            required: true
          },
          interaction: {
            label: 'רמת אינטראקציה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          }
        }
      }
    ],
    followers: [
      {
        id: 'account_followers',
        name: 'עוקבים לחשבון',
        description: 'הוספת עוקבים לחשבון הטיקטוק',
        min: 100,
        max: 10000,
        details: 'עוקבים איכותיים לחשבון שלך',
        icon: '👥',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          ageRange: {
            label: 'טווח גילאים',
            type: 'select',
            options: ['13-17', '18-24', '25-34', '35-44', '45+', 'כל הגילאים'],
            required: true
          },
          interests: {
            label: 'תחומי עניין',
            type: 'multiselect',
            options: ['מוזיקה', 'ריקוד', 'קומדיה', 'אוכל', 'ספורט', 'אופנה', 'יופי', 'גיימינג'],
            required: true
          },
          location: {
            label: 'מיקום',
            type: 'select',
            options: ['ישראל', 'ארה"ב', 'בריטניה', 'קנדה', 'אוסטרליה', 'גרמניה', 'צרפת', 'כל העולם'],
            required: true
          }
        }
      },
      {
        id: 'premium_followers',
        name: 'עוקבים פרימיום',
        description: 'עוקבים עם פרופילים מלאים ופעילים',
        min: 50,
        max: 2000,
        details: 'עוקבים איכותיים עם פרופילים מלאים',
        icon: '⭐',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 50,
            max: 2000,
            required: true
          },
          activityLevel: {
            label: 'רמת פעילות',
            type: 'select',
            options: ['גבוהה', 'בינונית', 'נמוכה', 'מעורב'],
            required: true
          },
          profileQuality: {
            label: 'איכות פרופיל',
            type: 'select',
            options: ['מלא', 'חלקי', 'בסיסי', 'מעורב'],
            required: true
          }
        }
      }
    ],
    likes: [
      {
        id: 'video_likes',
        name: 'לייקים לסרטון',
        description: 'הוספת לייקים לסרטון טיקטוק',
        min: 100,
        max: 100000,
        details: 'לייקים איכותיים לסרטון שלך',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 100,
            max: 100000,
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 13-17', 'גילאי 18-24', 'גילאי 25-34', 'גילאי 35+'],
            required: true
          },
          speed: {
            label: 'מהירות',
            type: 'select',
            options: ['איטי (1-2 ימים)', 'בינוני (3-5 ימים)', 'מהיר (6-12 שעות)'],
            required: true
          },
          engagement: {
            label: 'רמת מעורבות',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          }
        }
      },
      {
        id: 'comment_likes',
        name: 'לייקים לתגובות',
        description: 'הוספת לייקים לתגובות',
        min: 10,
        max: 1000,
        details: 'לייקים לתגובות איכותיות',
        icon: '👍',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          commentType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['חיובית', 'נייטרלית', 'הומוריסטית', 'מעורב'],
            required: true
          }
        }
      }
    ],
    comments: [
      {
        id: 'video_comments',
        name: 'תגובות לסרטון',
        description: 'הוספת תגובות לסרטון טיקטוק',
        min: 10,
        max: 500,
        details: 'תגובות איכותיות לסרטון שלך',
        icon: '💬',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 10,
            max: 500,
            required: true
          },
          commentType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['חיובית', 'נייטרלית', 'הומוריסטית', 'שאלה', 'מעורב'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית', 'מעורב'],
            required: true
          },
          customComments: {
            label: 'תגובות מותאמות אישית',
            type: 'textarea',
            required: false
          }
        }
      },
      {
        id: 'trending_comments',
        name: 'תגובות טרנדיות',
        description: 'תגובות עם האשטגים טרנדיים',
        min: 5,
        max: 200,
        details: 'תגובות עם האשטגים פופולריים',
        icon: '🔥',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 5,
            max: 200,
            required: true
          },
          hashtags: {
            label: 'האשטגים',
            type: 'textarea',
            required: true
          },
          trendType: {
            label: 'סוג טרנד',
            type: 'select',
            options: ['מוזיקה', 'ריקוד', 'קומדיה', 'אוכל', 'אופנה', 'מעורב'],
            required: true
          }
        }
      }
    ],
    shares: [
      {
        id: 'video_shares',
        name: 'שיתופים לסרטון',
        description: 'הוספת שיתופים לסרטון טיקטוק',
        min: 10,
        max: 1000,
        details: 'שיתופים איכותיים לסרטון שלך',
        icon: '📤',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          shareType: {
            label: 'סוג שיתוף',
            type: 'select',
            options: ['שיתוף רגיל', 'שיתוף עם תגובה', 'שיתוף לסטורי', 'שיתוף בקבוצה'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 13-17', 'גילאי 18-24', 'גילאי 25-34', 'גילאי 35+'],
            required: true
          }
        }
      },
      {
        id: 'cross_platform_shares',
        name: 'שיתופים חוצי פלטפורמות',
        description: 'שיתוף לפלטפורמות אחרות',
        min: 5,
        max: 500,
        details: 'שיתוף לאינסטגרם, פייסבוק, טוויטר',
        icon: '🔄',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 5,
            max: 500,
            required: true
          },
          platforms: {
            label: 'פלטפורמות',
            type: 'multiselect',
            options: ['אינסטגרם', 'פייסבוק', 'טוויטר', 'יוטיוב', 'לינקדאין'],
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'trend_analysis',
        name: 'ניתוח טרנדים',
        description: 'ניתוח טרנדים פופולריים בטיקטוק',
        min: 1,
        max: 10,
        details: 'זיהוי טרנדים לפני שהם מתפוצצים',
        icon: '📈',
        parameters: {
          keywords: {
            label: 'מילות מפתח',
            type: 'textarea',
            required: true
          },
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', '3 חודשים'],
            required: true
          },
          category: {
            label: 'קטגוריה',
            type: 'select',
            options: ['מוזיקה', 'ריקוד', 'קומדיה', 'אוכל', 'אופנה', 'כל הקטגוריות'],
            required: true
          },
          reportFormat: {
            label: 'פורמט דוח',
            type: 'select',
            options: ['PDF', 'Excel', 'PowerPoint', 'Word'],
            required: true
          }
        }
      },
      {
        id: 'hashtag_challenges',
        name: 'יצירת אתגרי האשטגים',
        description: 'יצירת אתגרי האשטגים ויראליים',
        min: 1,
        max: 5,
        details: 'יצירת אתגרים שיהפכו לוויראליים',
        icon: '🎯',
        parameters: {
          challengeName: {
            label: 'שם האתגר',
            type: 'text',
            required: true
          },
          hashtag: {
            label: 'האשטג',
            type: 'text',
            required: true
          },
          description: {
            label: 'תיאור האתגר',
            type: 'textarea',
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['שבוע', 'חודש', '3 חודשים', '6 חודשים'],
            required: true
          }
        }
      },
      {
        id: 'content_automation',
        name: 'אוטומציה של תוכן',
        description: 'יצירה אוטומטית של תוכן טיקטוק',
        min: 1,
        max: 50,
        details: 'יצירה אוטומטית של סרטונים',
        icon: '🤖',
        parameters: {
          contentType: {
            label: 'סוג תוכן',
            type: 'select',
            options: ['מוזיקה', 'ריקוד', 'קומדיה', 'אוכל', 'אופנה', 'מעורב'],
            required: true
          },
          frequency: {
            label: 'תדירות',
            type: 'select',
            options: ['יומי', 'יומיים', 'שבועי', 'מותאם אישית'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          hashtags: {
            label: 'האשטגים',
            type: 'textarea',
            required: true
          }
        }
      },
      {
        id: 'viral_prediction',
        name: 'חיזוי ויראליות',
        description: 'חיזוי פוטנציאל ויראליות של סרטונים',
        min: 1,
        max: 20,
        details: 'ניתוח פוטנציאל ויראליות',
        icon: '🔮',
        parameters: {
          videoUrl: {
            label: 'קישור לסרטון',
            type: 'text',
            required: true
          },
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['מלא', 'מהיר', 'מפורט', 'מותאם אישית'],
            required: true
          },
          timeFrame: {
            label: 'מסגרת זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', '3 חודשים'],
            required: true
          }
        }
      },
      {
        id: 'competitor_monitoring',
        name: 'מעקב מתחרים',
        description: 'מעקב אחר מתחרים וניתוח האסטרטגיה שלהם',
        min: 1,
        max: 10,
        details: 'ניתוח מתחרים מתקדם',
        icon: '👀',
        parameters: {
          competitorAccounts: {
            label: 'חשבונות מתחרים',
            type: 'textarea',
            required: true
          },
          monitoringType: {
            label: 'סוג מעקב',
            type: 'select',
            options: ['תוכן', 'האשטגים', 'זמני פרסום', 'מעורב'],
            required: true
          },
          frequency: {
            label: 'תדירות דוח',
            type: 'select',
            options: ['יומי', 'שבועי', 'חודשי', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'ai_content_optimization',
        name: 'אופטימיזציה של תוכן עם AI',
        description: 'שימוש ב-AI לאופטימיזציה של תוכן',
        min: 1,
        max: 10,
        details: 'שיפור תוכן עם בינה מלאכותית',
        icon: '🧠',
        parameters: {
          optimizationType: {
            label: 'סוג אופטימיזציה',
            type: 'select',
            options: ['האשטגים', 'זמני פרסום', 'תוכן', 'מלא'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          goals: {
            label: 'מטרות',
            type: 'multiselect',
            options: ['צפיות', 'עוקבים', 'לייקים', 'שיתופים', 'תגובות'],
            required: true
          }
        }
      },
      {
        id: 'topic_management',
        name: 'ניהול נושאים בפיד',
        description: 'הגדרת תדירות הופעת נושאים בפיד',
        min: 1,
        max: 20,
        details: 'שליטה על התוכן המוצג בפיד',
        icon: '📋',
        parameters: {
          topics: {
            label: 'נושאים',
            type: 'multiselect',
            options: ['אומנות', 'טיולים', 'ספורט', 'מוזיקה', 'אוכל', 'אופנה', 'יופי', 'גיימינג'],
            required: true
          },
          frequency: {
            label: 'תדירות הופעה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['שבוע', 'חודש', '3 חודשים', 'קבוע'],
            required: true
          }
        }
      },
      {
        id: 'smart_keyword_filters',
        name: 'פילטרים חכמים של מילות מפתח',
        description: 'סינון תוכן עם בינה מלאכותית',
        min: 1,
        max: 50,
        details: 'מניעת חשיפה לתוכן בלתי רצוי',
        icon: '🔍',
        parameters: {
          keywords: {
            label: 'מילות מפתח לחסימה',
            type: 'textarea',
            required: true
          },
          filterType: {
            label: 'סוג פילטר',
            type: 'select',
            options: ['חסימה מלאה', 'הפחתה', 'התראה', 'מעורב'],
            required: true
          },
          aiLevel: {
            label: 'רמת AI',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מקסימלי'],
            required: true
          }
        }
      },
      {
        id: 'wellbeing_missions',
        name: 'משימות רווחה דיגיטלית',
        description: 'פיתוח הרגלים דיגיטליים מאוזנים',
        min: 1,
        max: 10,
        details: 'עידוד שימוש מודע ובריא',
        icon: '🌱',
        parameters: {
          missionType: {
            label: 'סוג משימה',
            type: 'select',
            options: ['הגבלת זמן', 'הפסקות', 'תוכן חיובי', 'מעורב'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['יום', 'שבוע', 'חודש', 'מותאם אישית'],
            required: true
          },
          rewards: {
            label: 'תגמולים',
            type: 'multiselect',
            options: ['נקודות', 'תעודות', 'הטבות', 'הכרה'],
            required: true
          }
        }
      },
      {
        id: 'creator_chat_rooms',
        name: 'חדרי צ\'אט ליוצרים',
        description: 'יצירת חדרי צ\'אט עם הקהילה',
        min: 1,
        max: 5,
        details: 'אינטראקציה ישירה עם העוקבים',
        icon: '💬',
        parameters: {
          roomName: {
            label: 'שם החדר',
            type: 'text',
            required: true
          },
          maxParticipants: {
            label: 'מספר משתתפים מקסימלי',
            type: 'number',
            min: 10,
            max: 300,
            required: true
          },
          moderation: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['חופשי', 'מנוהל', 'מחמיר', 'אוטומטי'],
            required: true
          },
          topics: {
            label: 'נושאי שיחה',
            type: 'textarea',
            required: false
          }
        }
      },
      {
        id: 'creator_protection_mode',
        name: 'מצב הגנה ליוצרים',
        description: 'סינון תגובות פוגעניות עם AI',
        min: 1,
        max: 20,
        details: 'הגנה מפני תגובות לא הולמות',
        icon: '🛡️',
        parameters: {
          protectionLevel: {
            label: 'רמת הגנה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          },
          filterType: {
            label: 'סוג סינון',
            type: 'multiselect',
            options: ['ספאם', 'הטרדה', 'שפה לא הולמת', 'תוכן פוגעני'],
            required: true
          },
          action: {
            label: 'פעולה',
            type: 'select',
            options: ['הסתרה', 'מחיקה', 'התראה', 'דיווח'],
            required: true
          }
        }
      },
      {
        id: 'quick_content_check',
        name: 'בדיקת תוכן מהירה',
        description: 'בדיקה מראש של כשירות התוכן',
        min: 1,
        max: 10,
        details: 'מניעת בעיות לפני הפרסום',
        icon: '⚡',
        parameters: {
          contentType: {
            label: 'סוג תוכן',
            type: 'select',
            options: ['וידאו', 'תמונה', 'טקסט', 'אודיו'],
            required: true
          },
          checkType: {
            label: 'סוג בדיקה',
            type: 'multiselect',
            options: ['זכויות יוצרים', 'תוכן לא הולם', 'אלגוריתם', 'קהל יעד'],
            required: true
          },
          urgency: {
            label: 'דחיפות',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מיידי'],
            required: true
          }
        }
      },
      {
        id: 'ai_ad_automation',
        name: 'אוטומציית פרסום עם AI',
        description: 'ייעול פרסום עם למידת מכונה',
        min: 1,
        max: 10,
        details: 'שיפור תוצאות הפרסום',
        icon: '🤖',
        parameters: {
          campaignType: {
            label: 'סוג קמפיין',
            type: 'select',
            options: ['מיתוג', 'המרות', 'מעורבות', 'מלא'],
            required: true
          },
          budget: {
            label: 'תקציב יומי',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['שבוע', 'חודש', '3 חודשים', '6 חודשים'],
            required: true
          }
        }
      },
      {
        id: 'tiktok_for_artists',
        name: 'פלטפורמת אמנים',
        description: 'כלים ונתונים לקידום מוזיקה',
        min: 1,
        max: 5,
        details: 'קידום מוזיקה וניתוח ביצועים',
        icon: '🎵',
        parameters: {
          artistName: {
            label: 'שם האמן',
            type: 'text',
            required: true
          },
          songTitle: {
            label: 'כותרת השיר',
            type: 'text',
            required: true
          },
          genre: {
            label: 'ז\'אנר',
            type: 'select',
            options: ['פופ', 'רוק', 'היפ-הופ', 'אלקטרוני', 'מזרחי', 'מעורב'],
            required: true
          },
          promotionType: {
            label: 'סוג קידום',
            type: 'multiselect',
            options: ['צפיות', 'שיתופים', 'שימוש ביצירה', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'post_scheduling',
        name: 'תזמון פוסטים',
        description: 'תזמון פוסטים מראש',
        min: 1,
        max: 100,
        details: 'ניהול תוכן יעיל',
        icon: '⏰',
        parameters: {
          postContent: {
            label: 'תוכן הפוסט',
            type: 'textarea',
            required: true
          },
          scheduleTime: {
            label: 'זמן פרסום',
            type: 'datetime',
            required: true
          },
          frequency: {
            label: 'תדירות',
            type: 'select',
            options: ['פעם אחת', 'יומי', 'שבועי', 'מותאם אישית'],
            required: true
          },
          hashtags: {
            label: 'האשטגים',
            type: 'textarea',
            required: false
          }
        }
      },
      {
        id: 'content_performance_analytics',
        name: 'ניתוח ביצועי תוכן',
        description: 'תובנות מפורטות על ביצועי התוכן',
        min: 1,
        max: 20,
        details: 'הבנת התנהגות הקהל',
        icon: '📊',
        parameters: {
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['צמיחת עוקבים', 'שיעורי מעורבות', 'הופעות', 'מלא'],
            required: true
          },
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', '3 חודשים'],
            required: true
          },
          reportFormat: {
            label: 'פורמט דוח',
            type: 'select',
            options: ['PDF', 'Excel', 'PowerPoint', 'Word'],
            required: true
          },
          includeCharts: {
            label: 'כלול גרפים',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'enhanced_inbox',
        name: 'תיבת דואר משופרת',
        description: 'ניהול מתקדם של הודעות וצ\'אטים',
        min: 1,
        max: 10,
        details: 'ארגון וניהול הודעות יעיל',
        icon: '📬',
        parameters: {
          inboxType: {
            label: 'סוג תיבה',
            type: 'select',
            options: ['כל ההודעות', 'לא נקרא', 'מסומן בכוכבית', 'מעורב'],
            required: true
          },
          autoResponses: {
            label: 'תגובות אוטומטיות',
            type: 'select',
            options: ['פעיל', 'לא פעיל'],
            required: true
          },
          filterType: {
            label: 'סוג פילטר',
            type: 'multiselect',
            options: ['חברים', 'עוקבים', 'לא מוכרים', 'ספאם'],
            required: true
          },
          notificationLevel: {
            label: 'רמת התראות',
            type: 'select',
            options: ['כל ההודעות', 'חברים בלבד', 'חשובות בלבד', 'כבוי'],
            required: true
          }
        }
      },
      {
        id: 'feed_customization_guide',
        name: 'מדריך התאמה אישית של הפיד',
        description: 'מדריך אינטראקטיבי לעיצוב פיד For You',
        min: 1,
        max: 5,
        details: 'הבנת והתאמת הפיד להעדפות',
        icon: '📖',
        parameters: {
          guideType: {
            label: 'סוג מדריך',
            type: 'select',
            options: ['בסיסי', 'מתקדם', 'מלא', 'מותאם אישית'],
            required: true
          },
          topics: {
            label: 'נושאים',
            type: 'multiselect',
            options: ['אומנות', 'טיולים', 'ספורט', 'מוזיקה', 'אוכל', 'אופנה', 'יופי', 'גיימינג'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'],
            required: true
          }
        }
      },
      {
        id: 'screen_time_management',
        name: 'ניהול זמן מסך',
        description: 'הגבלות זמן מסך לבני נוער',
        min: 1,
        max: 5,
        details: 'שמירה על איזון דיגיטלי',
        icon: '⏱️',
        parameters: {
          ageGroup: {
            label: 'קבוצת גיל',
            type: 'select',
            options: ['13-15', '16-17', '18+', 'כל הגילאים'],
            required: true
          },
          timeLimit: {
            label: 'מגבלת זמן יומית',
            type: 'select',
            options: ['30 דקות', '60 דקות', '90 דקות', '120 דקות'],
            required: true
          },
          parentNotifications: {
            label: 'התראות להורים',
            type: 'select',
            options: ['פעיל', 'לא פעיל'],
            required: true
          },
          breakReminders: {
            label: 'תזכורות להפסקות',
            type: 'select',
            options: ['כל 30 דקות', 'כל שעה', 'כל שעתיים', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'business_account_conversion',
        name: 'מעבר לחשבון עסקי',
        description: 'המרת חשבון רגיל לחשבון עסקי',
        min: 1,
        max: 1,
        details: 'גישה לכלים עסקיים מתקדמים',
        icon: '💼',
        parameters: {
          businessType: {
            label: 'סוג עסק',
            type: 'select',
            options: ['עסק מקומי', 'מותג', 'יוצר תוכן', 'ארגון ללא כוונת רווח'],
            required: true
          },
          category: {
            label: 'קטגוריה',
            type: 'select',
            options: ['אוכל ומשקאות', 'אופנה ויופי', 'טכנולוגיה', 'חינוך', 'בידור', 'ספורט'],
            required: true
          },
          website: {
            label: 'אתר אינטרנט',
            type: 'text',
            required: false
          },
          contactEmail: {
            label: 'אימייל ליצירת קשר',
            type: 'text',
            required: true
          }
        }
      },
      {
        id: 'sound_optimization',
        name: 'אופטימיזציה של סאונד',
        description: 'שימוש במנגינות קליטות וצלילים פופולריים',
        min: 1,
        max: 20,
        details: 'הגברת סיכויי גילוי',
        icon: '🎵',
        parameters: {
          soundType: {
            label: 'סוג סאונד',
            type: 'select',
            options: ['מוזיקה פופולרית', 'צלילים ויראליים', 'מוזיקה מקורית', 'מעורב'],
            required: true
          },
          genre: {
            label: 'ז\'אנר',
            type: 'multiselect',
            options: ['פופ', 'היפ-הופ', 'רוק', 'אלקטרוני', 'מזרחי', 'קלאסי'],
            required: true
          },
          trendingLevel: {
            label: 'רמת טרנדיות',
            type: 'select',
            options: ['טרנדי מאוד', 'טרנדי', 'בינוני', 'חדש'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 שניות', '30 שניות', '60 שניות', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'video_length_optimization',
        name: 'אופטימיזציה של אורך סרטון',
        description: 'התאמת אורך הסרטון לביצועים מיטביים',
        min: 1,
        max: 10,
        details: 'שיפור שיעורי צפייה מלאה',
        icon: '⏱️',
        parameters: {
          targetLength: {
            label: 'אורך יעד',
            type: 'select',
            options: ['15 שניות', '30 שניות', '60 שניות', '3 דקות'],
            required: true
          },
          contentType: {
            label: 'סוג תוכן',
            type: 'select',
            options: ['ריקוד', 'קומדיה', 'אוכל', 'אופנה', 'מוזיקה', 'מעורב'],
            required: true
          },
          audienceType: {
            label: 'סוג קהל',
            type: 'select',
            options: ['גילאי 13-17', 'גילאי 18-24', 'גילאי 25-34', 'כל הגילאים'],
            required: true
          },
          optimizationGoal: {
            label: 'מטרת אופטימיזציה',
            type: 'select',
            options: ['צפיות מלאות', 'שיתופים', 'לייקים', 'עוקבים'],
            required: true
          }
        }
      },
      {
        id: 'tiktok_shop_integration',
        name: 'אינטגרציה עם TikTok Shop',
        description: 'קידום מוצרים ומכירות ישירות',
        min: 1,
        max: 10,
        details: 'הפיכת תוכן למכירות',
        icon: '🛍️',
        parameters: {
          productType: {
            label: 'סוג מוצר',
            type: 'select',
            options: ['אופנה', 'יופי', 'אלקטרוניקה', 'בית וגן', 'ספורט', 'מעורב'],
            required: true
          },
          promotionType: {
            label: 'סוג קידום',
            type: 'select',
            options: ['הצגת מוצר', 'ביקורת', 'הדגמה', 'מבצע'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          budget: {
            label: 'תקציב קידום',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          }
        }
      },
      {
        id: 'affiliate_marketing',
        name: 'שיווק שותפים',
        description: 'קידום מוצרים של אחרים תמורת עמלה',
        min: 1,
        max: 20,
        details: 'השגת רווחים מקידום מוצרים',
        icon: '🤝',
        parameters: {
          affiliateProgram: {
            label: 'תוכנית שותפים',
            type: 'select',
            options: ['Amazon', 'Shopify', 'מקומי', 'בינלאומי'],
            required: true
          },
          commissionRate: {
            label: 'שיעור עמלה',
            type: 'select',
            options: ['1-5%', '5-10%', '10-15%', '15%+'],
            required: true
          },
          productCategory: {
            label: 'קטגוריית מוצרים',
            type: 'multiselect',
            options: ['אופנה', 'יופי', 'טכנולוגיה', 'בית', 'ספורט', 'מעורב'],
            required: true
          },
          promotionMethod: {
            label: 'שיטת קידום',
            type: 'select',
            options: ['ביקורת', 'הדגמה', 'השוואה', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'live_streaming_optimization',
        name: 'אופטימיזציה של שידורים חיים',
        description: 'שיפור ביצועי שידורים חיים',
        min: 1,
        max: 10,
        details: 'הגברת מעורבות בשידורים',
        icon: '📺',
        parameters: {
          streamDuration: {
            label: 'משך שידור',
            type: 'select',
            options: ['30 דקות', '1 שעה', '2 שעות', 'מלא'],
            required: true
          },
          interactionType: {
            label: 'סוג אינטראקציה',
            type: 'multiselect',
            options: ['תגובות', 'שאלות', 'הצבעות', 'מתנות'],
            required: true
          },
          quality: {
            label: 'איכות שידור',
            type: 'select',
            options: ['720p', '1080p', '4K'],
            required: true
          },
          monetization: {
            label: 'מונטיזציה',
            type: 'select',
            options: ['מתנות', 'תרומות', 'מודעות', 'מעורב'],
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'views', name: 'צפיות', icon: '👁️', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'followers', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'likes', name: 'לייקים', icon: '❤️', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'comments', name: 'תגובות', icon: '💬', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'shares', name: 'שיתופים', icon: '📤', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'פיצ\'רים מתקדמים', icon: '🚀', color: 'linear-gradient(135deg, #ffd700, #ffed4e)' }
  ];

  const currentFeatures = tiktokFeatures[selectedCategory as keyof typeof tiktokFeatures] || [];
  const selectedFeatureData = (currentFeatures as any[]).find((f: any) => f.id === selectedFeature) as any;

  const handleExecute = async () => {
    if (!selectedFeature) {
      alert('אנא בחר פיצ\'ר');
      return;
    }

    if (!targetUrl) {
      alert('אנא הכנס כתובת יעד');
      return;
    }

    // בדיקת פרמטרים נדרשים
    const requiredParams = selectedFeatureData?.parameters;
    if (requiredParams) {
      for (const [key, param] of Object.entries(requiredParams)) {
        const paramData = param as any;
        if (paramData.required && !dynamicParams[key]) {
          alert(`אנא מלא את השדה: ${paramData.label}`);
          return;
        }
      }
    }

    setIsExecuting(true);

    try {
      if (showAdvancedCampaign && selectedFeatures.length > 0) {
        // קמפיין מתקדם
        const allFeatures = Object.values(tiktokFeatures).flat();
        const campaignActivities = selectedFeatures.map(featureId => {
          const feature = allFeatures.find((f: any) => f.id === featureId);
          return {
            id: Date.now() + Math.random(),
            feature: feature?.name || featureId,
            status: 'pending',
            quantity: dynamicParams.quantity || 0,
            targetUrl,
            sourceUrl: sourceUrl || '',
            timestamp: new Date().toLocaleString('he-IL'),
            params: dynamicParams
          };
        });

        setActivityHistory(prev => [...campaignActivities, ...prev]);

        // סימולציה של ביצוע
        setTimeout(() => {
          setActivityHistory(prev => 
            prev.map(activity => 
              campaignActivities.includes(activity) 
                ? { ...activity, status: 'success' }
                : activity
            )
          );
          setIsExecuting(false);
          alert(`קמפיין מתקדם בוצע בהצלחה! ${selectedFeatures.length} פיצ'רים`);
        }, 2000);
      } else {
        // פיצ'ר יחיד
        const newActivity = {
          id: Date.now(),
          feature: selectedFeatureData?.name || selectedFeature,
          status: 'pending',
          quantity: dynamicParams.quantity || 0,
          targetUrl,
          sourceUrl: sourceUrl || '',
          timestamp: new Date().toLocaleString('he-IL'),
          params: dynamicParams
        };

        setActivityHistory(prev => [newActivity, ...prev]);

        // סימולציה של ביצוע
        setTimeout(() => {
          setActivityHistory(prev => 
            prev.map(activity => 
              activity.id === newActivity.id 
                ? { ...activity, status: 'success' }
                : activity
            )
          );
          setIsExecuting(false);
          alert(`פיצ'ר "${selectedFeatureData?.name}" בוצע בהצלחה!`);
        }, 2000);
      }
    } catch (error) {
      setIsExecuting(false);
      alert('שגיאה בביצוע הפיצ\'ר');
    }
  };

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    setDynamicParams({});
  };

  const handleAdvancedFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const allFeatures = Object.values(tiktokFeatures).flat();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ←
            </button>
            <h1 style={{ color: 'white', margin: 0, fontSize: '2rem' }}>
              🎵 ניהול טיקטוק
            </h1>
          </div>
          <div style={{ color: 'white', fontSize: '1.1rem' }}>
            חינם - אדמין
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Panel - Feature Selection */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {/* Category Selection */}
          <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'right' }}>
            🎯 בחר קטגוריה
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedFeature('');
                  setDynamicParams({});
                }}
                style={{
                  background: selectedCategory === category.id ? category.color : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{category.icon}</div>
                <div>{category.name}</div>
              </button>
            ))}
          </div>

          {/* Feature Selection */}
          <h3 style={{ color: 'white', marginBottom: '15px', textAlign: 'right' }}>
            ⚡ בחר פיצ'ר
          </h3>
          <select
            value={selectedFeature}
            onChange={(e) => handleFeatureSelect(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontSize: '1rem',
              marginBottom: '20px'
            }}
          >
            <option value="" style={{ color: '#000' }}>בחר פיצ'ר...</option>
            {currentFeatures.map((feature: any) => (
              <option key={feature.id} value={feature.id} style={{ color: '#000' }}>
                {feature.icon} {feature.name}
              </option>
            ))}
          </select>

          {/* Target URL */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'white', display: 'block', marginBottom: '8px', textAlign: 'right' }}>
              🔗 כתובת יעד:
            </label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://tiktok.com/@username/video/1234567890"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Dynamic Parameters */}
          {selectedFeatureData?.parameters && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px', textAlign: 'right' }}>
                ⚙️ פרמטרים מותאמים
              </h3>
              
              {Object.entries(selectedFeatureData.parameters).map(([key, param]: [string, any]) => (
                <div key={key} style={{ marginBottom: '20px' }}>
                  <label style={{
                    color: 'white',
                    display: 'block',
                    marginBottom: '8px',
                    textAlign: 'right'
                  }}>
                    {param.label} {param.required && <span style={{ color: '#ff6b6b' }}>*</span>}:
                  </label>

                  {param.type === 'select' ? (
                    <select
                      value={dynamicParams[key] || ''}
                      onChange={(e) => {
                        setDynamicParams(prev => ({ ...prev, [key]: e.target.value }));
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="" style={{ color: '#000' }}>בחר {param.label.toLowerCase()}...</option>
                      {param.options?.map((option: string) => (
                        <option key={option} value={option} style={{ color: '#000' }}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : param.type === 'textarea' ? (
                    <textarea
                      value={dynamicParams[key] || ''}
                      onChange={(e) => {
                        setDynamicParams(prev => ({ ...prev, [key]: e.target.value }));
                      }}
                      placeholder={`הכנס ${param.label.toLowerCase()}...`}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  ) : param.type === 'multiselect' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {param.options?.map((option: string) => (
                        <label key={option} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={dynamicParams[key]?.includes(option) || false}
                            onChange={(e) => {
                              const currentValues = dynamicParams[key] || [];
                              if (e.target.checked) {
                                setDynamicParams(prev => ({ ...prev, [key]: [...currentValues, option] }));
                              } else {
                                setDynamicParams(prev => ({ ...prev, [key]: currentValues.filter((v: string) => v !== option) }));
                              }
                            }}
                            style={{ transform: 'scale(1.2)' }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={param.type === 'number' ? 'number' : 'text'}
                      value={dynamicParams[key] || ''}
                      onChange={(e) => {
                        setDynamicParams(prev => ({
                          ...prev,
                          [key]: param.type === 'number' ? Number(e.target.value) : e.target.value
                        }));
                      }}
                      min={param.min}
                      max={param.max}
                      placeholder={`הכנס ${param.label.toLowerCase()}...`}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Advanced Campaign Toggle */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setShowAdvancedCampaign(!showAdvancedCampaign)}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '15px',
                border: 'none',
                background: showAdvancedCampaign 
                  ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' 
                  : 'rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              🎯 קמפיין מתקדם - מספר פעולות
            </button>
          </div>

          {/* Advanced Campaign Panel */}
          {showAdvancedCampaign && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px', textAlign: 'right' }}>
                🚀 בחר פיצ'רים לקמפיין
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {allFeatures.map((feature: any) => (
                  <label key={feature.id} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => handleAdvancedFeatureToggle(feature.id)}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    {feature.icon} {feature.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Execute Button */}
          <button
            onClick={handleExecute}
            disabled={isExecuting || !selectedFeature || !targetUrl}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '15px',
              border: 'none',
              background: isExecuting 
                ? 'rgba(255,255,255,0.3)' 
                : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              cursor: isExecuting ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            {isExecuting ? 'מבצע...' : '🚀 הפעל פיצ\'ר'}
          </button>
        </div>

        {/* Right Panel - Activity History */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'right' }}>
            📊 היסטוריית פעילות
          </h2>
          
          {activityHistory.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.7)', 
              padding: '40px',
              fontSize: '1.1rem'
            }}>
              עדיין לא בוצעו פעולות
            </div>
          ) : (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {activityHistory.map((activity) => (
                <div key={activity.id} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      {activity.feature}
                    </div>
                    <div style={{
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      background: activity.status === 'success' ? '#4CAF50' : '#FF9800',
                      color: 'white'
                    }}>
                      {activity.status === 'success' ? '✅ הושלם' : '⏳ מתבצע'}
                    </div>
                  </div>
                  
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '5px' }}>
                    כמות: {activity.quantity}
                  </div>
                  
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '5px' }}>
                    יעד: {activity.targetUrl}
                  </div>
                  
                  {activity.sourceUrl && (
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '5px' }}>
                      מקור: {activity.sourceUrl}
                    </div>
                  )}
                  
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TikTokManagement;
