import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacebookManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('likes');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [dynamicParams, setDynamicParams] = useState<{[key: string]: any}>({});
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // פיצ'רים לפייסבוק
  const facebookFeatures = {
    likes: [
      {
        id: 'page_likes',
        name: 'לייקים לדף',
        description: 'הוספת לייקים לדף הפייסבוק',
        min: 100,
        max: 10000,
        details: 'לייקים איכותיים לדף הפייסבוק שלך',
        icon: '👍',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 18-25', 'גילאי 26-35', 'גילאי 36-45', 'גילאי 46+'],
            required: true
          },
          location: {
            label: 'מיקום',
            type: 'select',
            options: ['ישראל', 'ארה"ב', 'בריטניה', 'קנדה', 'אוסטרליה', 'גרמניה', 'צרפת'],
            required: true
          },
          speed: {
            label: 'מהירות',
            type: 'select',
            options: ['איטי (1-2 ימים)', 'בינוני (3-5 ימים)', 'מהיר (6-12 שעות)'],
            required: true
          }
        }
      },
      {
        id: 'post_likes',
        name: 'לייקים לפוסט',
        description: 'הוספת לייקים לפוסט ספציפי',
        min: 50,
        max: 5000,
        details: 'לייקים איכותיים לפוסט שלך',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 50,
            max: 5000,
            required: true
          },
          postType: {
            label: 'סוג פוסט',
            type: 'select',
            options: ['תמונה', 'וידאו', 'טקסט', 'לינק', 'סטורי'],
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
        id: 'reaction_likes',
        name: 'ריאקציות לפוסט',
        description: 'הוספת ריאקציות שונות לפוסט',
        min: 20,
        max: 1000,
        details: 'ריאקציות מגוונות לפוסט שלך',
        icon: '😍',
        parameters: {
          quantity: {
            label: 'כמות ריאקציות',
            type: 'number',
            min: 20,
            max: 1000,
            required: true
          },
          reactionType: {
            label: 'סוג ריאקציה',
            type: 'multiselect',
            options: ['לייק', 'אהבה', 'צחוק', 'וואו', 'עצב', 'כעס'],
            required: true
          },
          distribution: {
            label: 'התפלגות',
            type: 'select',
            options: ['מעורב', 'לייק דומיננטי', 'אהבה דומיננטית', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'photo_likes',
        name: 'לייקים לתמונות',
        description: 'הוספת לייקים לתמונות בגלריה',
        min: 30,
        max: 2000,
        details: 'לייקים לתמונות ספציפיות',
        icon: '📸',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 30,
            max: 2000,
            required: true
          },
          photoType: {
            label: 'סוג תמונה',
            type: 'select',
            options: ['תמונה בודדת', 'אלבום', 'כל התמונות', 'מותאם אישית'],
            required: true
          },
          timing: {
            label: 'זמן פרסום',
            type: 'select',
            options: ['מיידי', 'מדורג (שעה)', 'מדורג (יום)', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'video_likes',
        name: 'לייקים לוידאו',
        description: 'הוספת לייקים לוידאו',
        min: 50,
        max: 3000,
        details: 'לייקים לוידאו עם זמן צפייה',
        icon: '🎬',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 50,
            max: 3000,
            required: true
          },
          watchTime: {
            label: 'זמן צפייה',
            type: 'select',
            options: ['צפייה מלאה', '75% מהסרטון', '50% מהסרטון', '25% מהסרטון'],
            required: true
          },
          videoType: {
            label: 'סוג וידאו',
            type: 'select',
            options: ['וידאו רגיל', 'שידור חי', 'סטורי', 'ריל'],
            required: true
          }
        }
      }
    ],
    followers: [
      {
        id: 'page_followers',
        name: 'עוקבים לדף',
        description: 'הוספת עוקבים לדף הפייסבוק',
        min: 100,
        max: 5000,
        details: 'עוקבים איכותיים לדף שלך',
        icon: '👥',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 100,
            max: 5000,
            required: true
          },
          interests: {
            label: 'תחומי עניין',
            type: 'multiselect',
            options: ['טכנולוגיה', 'אופנה', 'ספורט', 'מוזיקה', 'אוכל', 'נסיעות', 'בידור', 'חינוך'],
            required: true
          },
          ageRange: {
            label: 'טווח גילאים',
            type: 'select',
            options: ['18-25', '26-35', '36-45', '46-55', '55+', 'כל הגילאים'],
            required: true
          },
          gender: {
            label: 'מין',
            type: 'select',
            options: ['כל המינים', 'גברים', 'נשים'],
            required: true
          }
        }
      },
      {
        id: 'premium_followers',
        name: 'עוקבים פרימיום',
        description: 'עוקבים עם פרופילים מלאים ומאומתים',
        min: 50,
        max: 1000,
        details: 'עוקבים איכותיים עם פרופילים מלאים',
        icon: '⭐',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 50,
            max: 1000,
            required: true
          },
          profileQuality: {
            label: 'איכות פרופיל',
            type: 'select',
            options: ['מאומת', 'פרופיל מלא', 'פעיל', 'מעורב'],
            required: true
          },
          activityLevel: {
            label: 'רמת פעילות',
            type: 'select',
            options: ['גבוהה', 'בינונית', 'נמוכה', 'מעורב'],
            required: true
          },
          verification: {
            label: 'אימות',
            type: 'select',
            options: ['מאומת', 'לא מאומת', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'local_followers',
        name: 'עוקבים מקומיים',
        description: 'עוקבים ממיקום ספציפי',
        min: 100,
        max: 2000,
        details: 'עוקבים ממיקום גיאוגרפי ספציפי',
        icon: '📍',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 100,
            max: 2000,
            required: true
          },
          location: {
            label: 'מיקום',
            type: 'select',
            options: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'נתניה', 'אשדוד', 'כל הארץ'],
            required: true
          },
          radius: {
            label: 'רדיוס',
            type: 'select',
            options: ['5 ק"מ', '10 ק"מ', '25 ק"מ', '50 ק"מ', 'כל האזור'],
            required: true
          },
          interests: {
            label: 'תחומי עניין מקומיים',
            type: 'multiselect',
            options: ['אירועים מקומיים', 'עסקים מקומיים', 'חדשות מקומיות', 'ספורט מקומי'],
            required: true
          }
        }
      },
      {
        id: 'business_followers',
        name: 'עוקבים עסקיים',
        description: 'עוקבים עם עניין עסקי',
        min: 50,
        max: 1000,
        details: 'עוקבים עם עניין עסקי ומקצועי',
        icon: '💼',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 50,
            max: 1000,
            required: true
          },
          businessType: {
            label: 'סוג עסק',
            type: 'multiselect',
            options: ['טכנולוגיה', 'פיננסים', 'נדל"ן', 'ייעוץ', 'שיווק', 'מכירות'],
            required: true
          },
          position: {
            label: 'תפקיד',
            type: 'select',
            options: ['מנהלים', 'עובדים', 'עצמאיים', 'מעורב'],
            required: true
          },
          companySize: {
            label: 'גודל חברה',
            type: 'select',
            options: ['סטארט-אפ', 'קטנה', 'בינונית', 'גדולה', 'מעורב'],
            required: true
          }
        }
      }
    ],
    comments: [
      {
        id: 'post_comments',
        name: 'תגובות לפוסט',
        description: 'הוספת תגובות איכותיות לפוסט',
        min: 10,
        max: 500,
        details: 'תגובות טבעיות ואיכותיות',
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
            label: 'סוג תגובות',
            type: 'select',
            options: ['חיוביות', 'נייטרליות', 'שאלות', 'תגובות מעורבות'],
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
        id: 'advanced_comments',
        name: 'תגובות מתקדמות',
        description: 'תגובות עם תמונות ו-GIFs',
        min: 5,
        max: 200,
        details: 'תגובות מושכות עין',
        icon: '🎨',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 5,
            max: 200,
            required: true
          },
          commentStyle: {
            label: 'סגנון תגובה',
            type: 'select',
            options: ['תמונה', 'GIF', 'מדבקה', 'אמוג\'י', 'מעורב'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 18-25', 'גילאי 26-35', 'גילאי 36+'],
            required: true
          },
          timing: {
            label: 'זמן פרסום',
            type: 'select',
            options: ['מיידי', 'מדורג (שעה)', 'מדורג (יום)', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'comment_replies',
        name: 'תגובות לתגובות',
        description: 'תגובות לתגובות קיימות',
        min: 1,
        max: 100,
        details: 'יצירת שיחות עמוקות',
        icon: '🔄',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          replyType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['תמיכה', 'שאלה', 'הוספת מידע', 'הומור', 'מעורב'],
            required: true
          },
          depth: {
            label: 'עומק שיחה',
            type: 'select',
            options: ['רמה 1', 'רמה 2', 'רמה 3+', 'מעורב'],
            required: true
          }
        }
      }
    ],
    shares: [
      {
        id: 'post_shares',
        name: 'שיתופים לפוסט',
        description: 'הוספת שיתופים לפוסט',
        min: 5,
        max: 200,
        details: 'שיתופים איכותיים לפוסט שלך',
        icon: '📤',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 5,
            max: 200,
            required: true
          },
          shareType: {
            label: 'סוג שיתוף',
            type: 'select',
            options: ['שיתוף רגיל', 'שיתוף עם תגובה', 'שיתוף לסטורי', 'שיתוף בקבוצה'],
            required: true
          },
          privacy: {
            label: 'רמת פרטיות',
            type: 'select',
            options: ['ציבורי', 'חברים', 'חברים של חברים', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'targeted_shares',
        name: 'שיתופים ממוקדי קהל',
        description: 'שיתופים לפי דמוגרפיה',
        min: 10,
        max: 500,
        details: 'שיתופים ממוקדים לפי קהל יעד',
        icon: '🎯',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 10,
            max: 500,
            required: true
          },
          targetDemographics: {
            label: 'דמוגרפיה',
            type: 'multiselect',
            options: ['גילאי 18-25', 'גילאי 26-35', 'גילאי 36-45', 'גילאי 46+', 'גברים', 'נשים'],
            required: true
          },
          interests: {
            label: 'תחומי עניין',
            type: 'multiselect',
            options: ['טכנולוגיה', 'אופנה', 'ספורט', 'מוזיקה', 'אוכל', 'נסיעות', 'בידור'],
            required: true
          },
          location: {
            label: 'מיקום',
            type: 'select',
            options: ['ישראל', 'תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'כל הארץ'],
            required: true
          }
        }
      },
      {
        id: 'group_shares',
        name: 'שיתופים בקבוצות',
        description: 'שיתוף בקבוצות רלוונטיות',
        min: 5,
        max: 100,
        details: 'שיתוף בקבוצות ממוקדות',
        icon: '👥',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 5,
            max: 100,
            required: true
          },
          groupType: {
            label: 'סוג קבוצות',
            type: 'select',
            options: ['עסקיות', 'קהילתיות', 'מקצועיות', 'תחביבים', 'מעורב'],
            required: true
          },
          groupSize: {
            label: 'גודל קבוצה',
            type: 'select',
            options: ['קטנות (עד 1K)', 'בינוניות (1K-10K)', 'גדולות (10K+)', 'כל הגדלים'],
            required: true
          },
          timing: {
            label: 'זמן שיתוף',
            type: 'select',
            options: ['מיידי', 'מדורג (שעה)', 'מדורג (יום)', 'מותאם אישית'],
            required: true
          }
        }
      }
    ],
    views: [
      {
        id: 'video_views',
        name: 'צפיות בוידאו',
        description: 'הוספת צפיות לוידאו',
        min: 100,
        max: 10000,
        details: 'צפיות איכותיות בוידאו שלך',
        icon: '📹',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 10000,
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
          }
        }
      },
      {
        id: 'story_views',
        name: 'צפיות בסטוריז',
        description: 'צפיות בסטוריז של 24 שעות',
        min: 50,
        max: 5000,
        details: 'צפיות בסטוריז עם מעקב 24 שעות',
        icon: '📱',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 50,
            max: 5000,
            required: true
          },
          storyType: {
            label: 'סוג סטורי',
            type: 'select',
            options: ['תמונה', 'וידאו', 'טקסט', 'סקר', 'שאלה'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כללי', 'גילאי 18-25', 'גילאי 26-35', 'גילאי 36+'],
            required: true
          },
          timing: {
            label: 'זמן צפייה',
            type: 'select',
            options: ['מיידי', 'מדורג (שעה)', 'מדורג (יום)', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'page_views',
        name: 'צפיות בדף',
        description: 'צפיות בדף הפייסבוק',
        min: 100,
        max: 10000,
        details: 'הגברת צפיות בדף העסקי',
        icon: '👁️',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          viewType: {
            label: 'סוג צפייה',
            type: 'select',
            options: ['צפייה בדף', 'צפייה במידע', 'צפייה בפוסטים', 'צפייה בתמונות'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['30 שניות', '1 דקה', '2 דקות', '5 דקות+'],
            required: true
          },
          source: {
            label: 'מקור צפייה',
            type: 'select',
            options: ['חיפוש', 'פיד', 'שיתוף', 'ישיר', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'photo_views',
        name: 'צפיות בתמונות',
        description: 'צפיות בתמונות בגלריה',
        min: 50,
        max: 2000,
        details: 'הגברת צפיות בתמונות',
        icon: '🖼️',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 50,
            max: 2000,
            required: true
          },
          photoType: {
            label: 'סוג תמונה',
            type: 'select',
            options: ['תמונה בודדת', 'אלבום', 'כל התמונות', 'מותאם אישית'],
            required: true
          },
          engagement: {
            label: 'רמת מעורבות',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'competitor_analysis',
        name: 'ניתוח מתחרים',
        description: 'ניתוח מתחרים וקבלת תובנות',
        min: 1,
        max: 10,
        details: 'ניתוח מתחרים מתקדם',
        icon: '🔍',
        parameters: {
          competitorPages: {
            label: 'דפי מתחרים',
            type: 'textarea',
            required: true
          },
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['ניתוח פוסטים', 'ניתוח קהל', 'ניתוח תגובות', 'ניתוח מלא'],
            required: true
          },
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['שבוע אחרון', 'חודש אחרון', '3 חודשים אחרונים', 'שנה אחרונה'],
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
        id: 'auto_posting',
        name: 'פרסום אוטומטי',
        description: 'פרסום אוטומטי של תוכן',
        min: 1,
        max: 100,
        details: 'פרסום אוטומטי מתקדם',
        icon: '🤖',
        parameters: {
          postContent: {
            label: 'תוכן הפוסטים',
            type: 'textarea',
            required: true
          },
          schedule: {
            label: 'לוח זמנים',
            type: 'select',
            options: ['יומי', 'יומיים', 'שבועי', 'מותאם אישית'],
            required: true
          },
          postType: {
            label: 'סוג פוסט',
            type: 'multiselect',
            options: ['טקסט', 'תמונה', 'וידאו', 'לינק', 'סטורי'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: false
          }
        }
      },
      {
        id: 'admin_assist',
        name: 'עזרה אדמין אוטומטית',
        description: 'בקרה אוטומטית על תכנים לפי מילות מפתח',
        min: 1,
        max: 50,
        details: 'מניעת פרסום תוכן לא רצוי',
        icon: '🛡️',
        parameters: {
          keywords: {
            label: 'מילות מפתח לחסימה',
            type: 'textarea',
            required: true
          },
          action: {
            label: 'פעולה',
            type: 'select',
            options: ['מניעת פרסום', 'התראה', 'מחיקה אוטומטית', 'העברה לבדיקה'],
            required: true
          },
          severity: {
            label: 'רמת חומרה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'קריטית'],
            required: true
          }
        }
      },
      {
        id: 'member_cleanup',
        name: 'ניקוי חברים לא פעילים',
        description: 'הסרת חברים שלא היו פעילים',
        min: 1,
        max: 1000,
        details: 'שמירה על קהילה אקטיבית',
        icon: '🧹',
        parameters: {
          inactivityDays: {
            label: 'ימי חוסר פעילות',
            type: 'number',
            min: 30,
            max: 365,
            required: true
          },
          action: {
            label: 'פעולה',
            type: 'select',
            options: ['הסרה', 'התראה', 'השהיה', 'דיווח'],
            required: true
          },
          backupList: {
            label: 'רשימת גיבוי',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'member_reactivation',
        name: 'הפעלת חברים רדומים',
        description: 'שליחת הודעות לחברים לא פעילים',
        min: 1,
        max: 500,
        details: 'החזרת חברים לפעילות',
        icon: '⚡',
        parameters: {
          message: {
            label: 'הודעת הפעלה',
            type: 'textarea',
            required: true
          },
          inactivityDays: {
            label: 'ימי חוסר פעילות',
            type: 'number',
            min: 7,
            max: 90,
            required: true
          },
          schedule: {
            label: 'לוח זמנים',
            type: 'select',
            options: ['מיידי', 'יומי', 'שבועי', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'auto_reports',
        name: 'דוחות אוטומטיים',
        description: 'יצירת דוחות ביצועים אוטומטיים',
        min: 1,
        max: 10,
        details: 'מעקב אחר ביצועי הדף',
        icon: '📊',
        parameters: {
          reportType: {
            label: 'סוג דוח',
            type: 'select',
            options: ['ביצועים יומיים', 'ביצועים שבועיים', 'ביצועים חודשיים', 'דוח מלא'],
            required: true
          },
          frequency: {
            label: 'תדירות',
            type: 'select',
            options: ['יומי', 'שבועי', 'חודשי', 'רבעוני'],
            required: true
          },
          recipients: {
            label: 'נמענים',
            type: 'textarea',
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
        id: 'live_stream_views',
        name: 'צפיות בשידורים חיים',
        description: 'מעקב אחר צפיות בשידורים חיים',
        min: 100,
        max: 10000,
        details: 'הגברת צפיות בשידורים',
        icon: '📺',
        parameters: {
          streamUrl: {
            label: 'קישור לשידור',
            type: 'text',
            required: true
          },
          viewsQuantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 דקות', '30 דקות', '1 שעה', '2 שעות', 'מלא'],
            required: true
          },
          quality: {
            label: 'איכות צפייה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'HD'],
            required: true
          }
        }
      },
      {
        id: 'voice_message_listening',
        name: 'האזנה להודעות קוליות',
        description: 'מעקב והאזנה להודעות קוליות',
        min: 1,
        max: 100,
        details: 'ניהול הודעות קוליות',
        icon: '🎧',
        parameters: {
          messageUrl: {
            label: 'קישור להודעה',
            type: 'text',
            required: true
          },
          listensQuantity: {
            label: 'כמות האזנות',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          listenDuration: {
            label: 'משך האזנה',
            type: 'select',
            options: ['10 שניות', '30 שניות', '1 דקה', 'מלא'],
            required: true
          },
          transcription: {
            label: 'תמלול אוטומטי',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'bot_stars',
        name: 'הוספת סטארים לבוטים',
        description: 'הוספת דירוגי כוכבים לבוטים',
        min: 1,
        max: 100,
        details: 'שיפור חוויית המשתמש',
        icon: '⭐',
        parameters: {
          botUrl: {
            label: 'קישור לבוט',
            type: 'text',
            required: true
          },
          starsQuantity: {
            label: 'כמות סטארים',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          starType: {
            label: 'סוג סטאר',
            type: 'select',
            options: ['5 כוכבים', '4 כוכבים', '3 כוכבים', 'מעורב'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', 'קבוע'],
            required: true
          }
        }
      },
      {
        id: 'privacy_management',
        name: 'ניהול פרטיות מתקדם',
        description: 'כלים לניהול הגדרות פרטיות',
        min: 1,
        max: 50,
        details: 'שליטה מלאה בפרטיות',
        icon: '🔒',
        parameters: {
          privacyLevel: {
            label: 'רמת פרטיות',
            type: 'select',
            options: ['ציבורי', 'חברים', 'חברים של חברים', 'מותאם אישית'],
            required: true
          },
          contentType: {
            label: 'סוג תוכן',
            type: 'multiselect',
            options: ['פוסטים', 'תמונות', 'וידאו', 'מידע אישי', 'פעילות'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'select',
            options: ['כולם', 'חברים', 'חברים של חברים', 'רשימה מותאמת'],
            required: true
          }
        }
      },
      {
        id: 'moderator_monitoring',
        name: 'ניטור פעולות אדמינים',
        description: 'מעקב אחר פעולות הצוות הניהולי',
        min: 1,
        max: 20,
        details: 'שקיפות בניהול הקהילה',
        icon: '👥',
        parameters: {
          monitorType: {
            label: 'סוג ניטור',
            type: 'select',
            options: ['כל הפעולות', 'מחיקות בלבד', 'אישורים בלבד', 'הערות בלבד'],
            required: true
          },
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', 'כל הזמן'],
            required: true
          },
          reportFormat: {
            label: 'פורמט דוח',
            type: 'select',
            options: ['רשימה', 'טבלה', 'גרף', 'דוח מפורט'],
            required: true
          }
        }
      },
      {
        id: 'group_chats',
        name: 'צ\'אטים קבוצתיים',
        description: 'פתיחת צ\'אטים קבוצתיים בזמן אמת',
        min: 1,
        max: 10,
        details: 'הגברת מעורבות הקהילה',
        icon: '💬',
        parameters: {
          chatTopic: {
            label: 'נושא הצ\'אט',
            type: 'text',
            required: true
          },
          participants: {
            label: 'מספר משתתפים',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['30 דקות', '1 שעה', '2 שעות', 'ללא הגבלה'],
            required: true
          },
          moderation: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['חופשי', 'מנוהל', 'מחמיר', 'אוטומטי'],
            required: true
          }
        }
      },
      {
        id: 'qa_sessions',
        name: 'שאלות ותשובות',
        description: 'עריכת סשנים של שאלות ותשובות',
        min: 1,
        max: 5,
        details: 'חיזוק הקשר עם הקהילה',
        icon: '❓',
        parameters: {
          sessionTopic: {
            label: 'נושא הסשן',
            type: 'text',
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['30 דקות', '1 שעה', '2 שעות', 'ללא הגבלה'],
            required: true
          },
          questionLimit: {
            label: 'מגבלת שאלות',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          moderation: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['חופשי', 'מנוהל', 'מחמיר'],
            required: true
          }
        }
      },
      {
        id: 'content_cleanup',
        name: 'ניקוי תוכן אוטומטי',
        description: 'מחיקת תוכן של חברים שהוסרו',
        min: 1,
        max: 100,
        details: 'שמירה על סדר וניקיון',
        icon: '🧽',
        parameters: {
          cleanupType: {
            label: 'סוג ניקוי',
            type: 'multiselect',
            options: ['פוסטים', 'תגובות', 'הזמנות', 'הודעות'],
            required: true
          },
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', 'כל הזמן'],
            required: true
          },
          backup: {
            label: 'גיבוי',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'ai_optimization',
        name: 'אופטימיזציה מבוססת AI',
        description: 'שימוש ב-AI לייעול ביצועי המודעות',
        min: 1,
        max: 10,
        details: 'שיפור ROI אוטומטי',
        icon: '🤖',
        parameters: {
          optimizationType: {
            label: 'סוג אופטימיזציה',
            type: 'select',
            options: ['מעורבות', 'המרות', 'טווח הגעה', 'מלא'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          budget: {
            label: 'תקציב יומי',
            type: 'number',
            min: 10,
            max: 1000,
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
        id: 'facebook_reels',
        name: 'פייסבוק רילס',
        description: 'יצירת סרטונים קצרים בפייסבוק',
        min: 1,
        max: 50,
        details: 'יצירת תוכן ויראלי',
        icon: '🎬',
        parameters: {
          videoType: {
            label: 'סוג וידאו',
            type: 'select',
            options: ['ריקוד', 'קומדיה', 'אוכל', 'אופנה', 'מוזיקה', 'מעורב'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 שניות', '30 שניות', '60 שניות', 'מקסימלי'],
            required: true
          },
          hashtags: {
            label: 'האשטגים',
            type: 'textarea',
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          }
        }
      },
      {
        id: 'messenger_chatbots',
        name: 'בוטים במסנג\'ר',
        description: 'אינטראקציה אוטומטית עם משתמשים',
        min: 1,
        max: 10,
        details: 'מענה אוטומטי וניהול תסריטי שיחה',
        icon: '🤖',
        parameters: {
          botType: {
            label: 'סוג בוט',
            type: 'select',
            options: ['שירות לקוחות', 'מכירות', 'מידע', 'תמיכה', 'מעורב'],
            required: true
          },
          responseType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['אוטומטי', 'חצי אוטומטי', 'מנוהל', 'מעורב'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית', 'מעורב'],
            required: true
          },
          features: {
            label: 'תכונות',
            type: 'multiselect',
            options: ['תשובות מהירות', 'תפריטים', 'תמונות', 'קישורים', 'תיעוד'],
            required: true
          }
        }
      },
      {
        id: 'live_stream_filters',
        name: 'פילטרים לשידורים חיים',
        description: 'הוספת פילטרים בזמן אמת לשידורים',
        min: 1,
        max: 20,
        details: 'שיפור חוויית הצפייה',
        icon: '🎭',
        parameters: {
          filterType: {
            label: 'סוג פילטר',
            type: 'select',
            options: ['יופי', 'קומדיה', 'אפקטים', 'מעורב'],
            required: true
          },
          intensity: {
            label: 'עוצמה',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 דקות', '30 דקות', '1 שעה', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'group_reels_sharing',
        name: 'שיתוף רילס בקבוצות',
        description: 'שיתוף סרטוני רילס בקבוצות',
        min: 1,
        max: 10,
        details: 'ביטוי יצירתי וחיבור עמוק יותר',
        icon: '👥',
        parameters: {
          groupType: {
            label: 'סוג קבוצה',
            type: 'select',
            options: ['עסקית', 'קהילתית', 'מקצועית', 'תחביבים', 'מעורב'],
            required: true
          },
          sharingType: {
            label: 'סוג שיתוף',
            type: 'select',
            options: ['אישי', 'קבוצתי', 'ציבורי', 'מעורב'],
            required: true
          },
          moderation: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['חופשי', 'מנוהל', 'מחמיר', 'אוטומטי'],
            required: true
          }
        }
      },
      {
        id: 'event_story_sharing',
        name: 'שיתוף אירועים בסטורי',
        description: 'שיתוף אירועים ציבוריים בסטורי',
        min: 1,
        max: 5,
        details: 'הגדלת חשיפה ומשיכת חברים חדשים',
        icon: '📅',
        parameters: {
          eventType: {
            label: 'סוג אירוע',
            type: 'select',
            options: ['עסקי', 'חברתי', 'תרבותי', 'ספורט', 'מעורב'],
            required: true
          },
          sharingTime: {
            label: 'זמן שיתוף',
            type: 'select',
            options: ['לפני האירוע', 'במהלך האירוע', 'אחרי האירוע', 'מעורב'],
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          }
        }
      },
      {
        id: 'custom_group_profiles',
        name: 'פרופילי קבוצות מותאמים',
        description: 'התאמה אישית של פרופילי קבוצות',
        min: 1,
        max: 10,
        details: 'טפוח קשרים חזקים יותר בין חברים',
        icon: '👤',
        parameters: {
          profileType: {
            label: 'סוג פרופיל',
            type: 'select',
            options: ['אישי', 'מקצועי', 'עסקי', 'קהילתי', 'מעורב'],
            required: true
          },
          customizationLevel: {
            label: 'רמת התאמה',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מלא'],
            required: true
          },
          includeLinks: {
            label: 'כלול קישורים',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'advanced_post_editing',
        name: 'עריכת פוסטים מתקדמת',
        description: 'כלי עריכה מתקדמים לפוסטים',
        min: 1,
        max: 20,
        details: 'שיפור איכות התוכן המשותף',
        icon: '✏️',
        parameters: {
          editingType: {
            label: 'סוג עריכה',
            type: 'select',
            options: ['טקסט', 'תמונה', 'וידאו', 'מעורב'],
            required: true
          },
          features: {
            label: 'תכונות עריכה',
            type: 'multiselect',
            options: ['הדגשה', 'הטיה', 'כותרות', 'מספור', 'רשימות'],
            required: true
          },
          style: {
            label: 'סגנון',
            type: 'select',
            options: ['מודרני', 'קלאסי', 'יצירתי', 'מקצועי'],
            required: true
          }
        }
      },
      {
        id: 'improved_post_approval',
        name: 'שיפור ממשק אישור פוסטים',
        description: 'ממשק משופר לאישור פוסטים ואכיפת חוקים',
        min: 1,
        max: 10,
        details: 'ניהול יעיל של תוכן הקבוצה',
        icon: '✅',
        parameters: {
          approvalType: {
            label: 'סוג אישור',
            type: 'select',
            options: ['אוטומטי', 'מנוהל', 'מעורב'],
            required: true
          },
          responseMethod: {
            label: 'שיטת תגובה',
            type: 'select',
            options: ['פיצ\'ר ייעודי', 'הודעה פרטית', 'תגובה ציבורית', 'מעורב'],
            required: true
          },
          moderationLevel: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['נמוכה', 'בינונית', 'גבוהה', 'מקסימלית'],
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'likes', name: 'לייקים', icon: '👍', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'followers', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'comments', name: 'תגובות', icon: '💬', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'shares', name: 'שיתופים', icon: '📤', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'views', name: 'צפיות', icon: '📹', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'פיצ\'רים מתקדמים', icon: '🚀', color: 'linear-gradient(135deg, #ffd700, #ffed4e)' }
  ];

  const currentFeatures = facebookFeatures[selectedCategory as keyof typeof facebookFeatures] || [];
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
        const allFeatures = Object.values(facebookFeatures).flat();
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

  const allFeatures = Object.values(facebookFeatures).flat();

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
              📘 ניהול פייסבוק
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
              placeholder="https://facebook.com/your-page"
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

          {/* Source URL (for transfer features) */}
          {selectedFeature === 'transfer_members' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'white', display: 'block', marginBottom: '8px', textAlign: 'right' }}>
                📤 מקור:
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://facebook.com/source-page"
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
          )}

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

export default FacebookManagement;
