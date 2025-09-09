import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YouTubeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('videos');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<Record<string, any>>({});
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const youtubeFeatures = {
    videos: [
      {
        id: 'video_views',
        name: 'צפיות בסרטונים',
        description: 'הוספת צפיות לסרטונים',
        min: 100,
        max: 10000,
        details: 'הגברת חשיפה לסרטונים',
        icon: '👁️',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          targetUrl: {
            label: 'קישור לסרטון',
            type: 'text',
            required: true
          },
          retention: {
            label: 'שיעור צפייה',
            type: 'select',
            options: ['30%', '50%', '70%', '90%'],
            required: true
          },
          watchTime: {
            label: 'זמן צפייה ממוצע',
            type: 'select',
            options: ['2 דקות', '5 דקות', '10 דקות', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'video_likes',
        name: 'לייקים לסרטונים',
        description: 'הוספת לייקים לסרטונים',
        min: 10,
        max: 1000,
        details: 'הגברת מעורבות בסרטונים',
        icon: '👍',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetUrl: {
            label: 'קישור לסרטון',
            type: 'text',
            required: true
          },
          speed: {
            label: 'מהירות',
            type: 'select',
            options: ['איטי', 'בינוני', 'מהיר'],
            required: true
          }
        }
      }
    ],
    shorts: [
      {
        id: 'shorts_views',
        name: 'צפיות בשורטס',
        description: 'הוספת צפיות לסרטוני שורטס',
        min: 50,
        max: 5000,
        details: 'הגברת חשיפה לשורטס',
        icon: '📱',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 50,
            max: 5000,
            required: true
          },
          targetUrl: {
            label: 'קישור לשורטס',
            type: 'text',
            required: true
          },
          completionRate: {
            label: 'שיעור השלמה',
            type: 'select',
            options: ['40%', '60%', '80%', '95%'],
            required: true
          }
        }
      },
      {
        id: 'shorts_likes',
        name: 'לייקים לשורטס',
        description: 'הוספת לייקים לסרטוני שורטס',
        min: 5,
        max: 500,
        details: 'הגברת מעורבות בשורטס',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 5,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לשורטס',
            type: 'text',
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
    subscribers: [
      {
        id: 'channel_subscribers',
        name: 'עוקבים לערוץ',
        description: 'הוספת עוקבים לערוץ',
        min: 50,
        max: 2000,
        details: 'הגברת מספר העוקבים',
        icon: '👥',
        parameters: {
          quantity: {
            label: 'כמות עוקבים',
            type: 'number',
            min: 50,
            max: 2000,
            required: true
          },
          targetUrl: {
            label: 'קישור לערוץ',
            type: 'text',
            required: true
          },
          quality: {
            label: 'איכות עוקבים',
            type: 'select',
            options: ['רגיל', 'איכותי', 'מעורב'],
            required: true
          },
          retention: {
            label: 'שיעור שמירה',
            type: 'select',
            options: ['70%', '80%', '90%', '95%'],
            required: true
          }
        }
      }
    ],
    comments: [
      {
        id: 'video_comments',
        name: 'תגובות לסרטונים',
        description: 'הוספת תגובות לסרטונים',
        min: 5,
        max: 100,
        details: 'הגברת מעורבות בתגובות',
        icon: '💬',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 5,
            max: 100,
            required: true
          },
          targetUrl: {
            label: 'קישור לסרטון',
            type: 'text',
            required: true
          },
          commentType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['חיובי', 'שאלה', 'דיון', 'מעורב'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'מעורב'],
            required: true
          }
        }
      }
    ],
    shares: [
      {
        id: 'video_shares',
        name: 'שיתופי סרטונים',
        description: 'הוספת שיתופים לסרטונים',
        min: 10,
        max: 500,
        details: 'הגברת ויראליות',
        icon: '📤',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 10,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לסרטון',
            type: 'text',
            required: true
          },
          platform: {
            label: 'פלטפורמת שיתוף',
            type: 'multiselect',
            options: ['פייסבוק', 'טוויטר', 'ווטסאפ', 'טלגרם', 'אינסטגרם'],
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'video_scheduling',
        name: 'תזמון סרטונים',
        description: 'תזמון פרסום סרטונים מראש',
        min: 1,
        max: 50,
        details: 'ניהול תוכן יעיל',
        icon: '⏰',
        parameters: {
          videoTitle: {
            label: 'כותרת הסרטון',
            type: 'text',
            required: true
          },
          videoDescription: {
            label: 'תיאור הסרטון',
            type: 'textarea',
            required: true
          },
          scheduleTime: {
            label: 'זמן פרסום',
            type: 'datetime',
            required: true
          },
          tags: {
            label: 'תגיות',
            type: 'textarea',
            required: false
          },
          category: {
            label: 'קטגוריה',
            type: 'select',
            options: ['בידור', 'חינוך', 'מוזיקה', 'ספורט', 'טכנולוגיה', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'playlist_management',
        name: 'ניהול פלייליסטים',
        description: 'יצירה וניהול פלייליסטים',
        min: 1,
        max: 20,
        details: 'ארגון תוכן יעיל',
        icon: '📋',
        parameters: {
          playlistName: {
            label: 'שם הפלייליסט',
            type: 'text',
            required: true
          },
          playlistDescription: {
            label: 'תיאור הפלייליסט',
            type: 'textarea',
            required: true
          },
          privacy: {
            label: 'פרטיות',
            type: 'select',
            options: ['ציבורי', 'לא רשום', 'פרטי'],
            required: true
          },
          videoOrder: {
            label: 'סדר סרטונים',
            type: 'select',
            options: ['תאריך העלאה', 'אלפביתי', 'פופולריות', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'live_streaming',
        name: 'שידורים חיים',
        description: 'ניהול שידורים חיים',
        min: 1,
        max: 10,
        details: 'אינטראקציה ישירה עם הקהל',
        icon: '📺',
        parameters: {
          streamTitle: {
            label: 'כותרת השידור',
            type: 'text',
            required: true
          },
          streamDescription: {
            label: 'תיאור השידור',
            type: 'textarea',
            required: true
          },
          streamType: {
            label: 'סוג שידור',
            type: 'select',
            options: ['רגיל', 'שורטס', 'מעורב'],
            required: true
          },
          monetization: {
            label: 'מונטיזציה',
            type: 'multiselect',
            options: ['Super Chat', 'Super Stickers', 'Memberships', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'ai_background_generator',
        name: 'מחולל רקעים מבוסס AI',
        description: 'יצירת רקעים לסרטוני שורטס עם AI',
        min: 1,
        max: 10,
        details: 'רקעים מונפשים בזמן אמת',
        icon: '🎨',
        parameters: {
          backgroundType: {
            label: 'סוג רקע',
            type: 'select',
            options: ['טבע', 'עיר', 'חלל', 'אבסטרקטי', 'מעורב'],
            required: true
          },
          animationStyle: {
            label: 'סגנון אנימציה',
            type: 'select',
            options: ['חלק', 'דינמי', 'סטטי', 'מעורב'],
            required: true
          },
          colorScheme: {
            label: 'סכמת צבעים',
            type: 'select',
            options: ['חם', 'קר', 'ניטרלי', 'צבעוני'],
            required: true
          }
        }
      },
      {
        id: 'youtube_create_editing',
        name: 'עריכת סרטונים - YouTube Create',
        description: 'עריכת סרטונים דרך הסמארטפון',
        min: 1,
        max: 20,
        details: 'כלי עריכה מתקדמים במובייל',
        icon: '✂️',
        parameters: {
          editingType: {
            label: 'סוג עריכה',
            type: 'select',
            options: ['חיתוך', 'הוספת אפקטים', 'סטיקרים', 'סאונד', 'מעורב'],
            required: true
          },
          videoLength: {
            label: 'אורך סרטון',
            type: 'select',
            options: ['15 שניות', '30 שניות', '1 דקה', '3 דקות', 'מלא'],
            required: true
          },
          quality: {
            label: 'איכות וידאו',
            type: 'select',
            options: ['720p', '1080p', '4K'],
            required: true
          }
        }
      },
      {
        id: 'collab_feature',
        name: 'שיתוף פעולה (Collab)',
        description: 'שילוב בין שני סרטונים שונים',
        min: 1,
        max: 5,
        details: 'שיתוף פעולה עם יוצרי תוכן אחרים',
        icon: '🤝',
        parameters: {
          collabType: {
            label: 'סוג שיתוף פעולה',
            type: 'select',
            options: ['אופקי', 'אנכי', 'מעורב'],
            required: true
          },
          partnerChannel: {
            label: 'ערוץ שותף',
            type: 'text',
            required: true
          },
          contentType: {
            label: 'סוג תוכן',
            type: 'select',
            options: ['בידור', 'חינוך', 'מוזיקה', 'ספורט', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'qa_stickers',
        name: 'סטיקר שאלות ותשובות',
        description: 'מדבקות לשאלות ותשובות',
        min: 1,
        max: 10,
        details: 'אינטראקציה עם הקהל',
        icon: '❓',
        parameters: {
          questionType: {
            label: 'סוג שאלה',
            type: 'select',
            options: ['כללי', 'טכני', 'אישי', 'מעורב'],
            required: true
          },
          responseTime: {
            label: 'זמן תגובה',
            type: 'select',
            options: ['מיידי', '24 שעות', 'שבוע', 'מותאם אישית'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'ai_video_summaries',
        name: 'תקצירי סרטונים מבוססי AI',
        description: 'יצירת תקצירים אובייקטיביים לסרטונים',
        min: 1,
        max: 20,
        details: 'סיכום תוכן עם בינה מלאכותית',
        icon: '📝',
        parameters: {
          summaryLength: {
            label: 'אורך תקציר',
            type: 'select',
            options: ['קצר (30 שניות)', 'בינוני (1 דקה)', 'ארוך (3 דקות)', 'מלא'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'],
            required: true
          },
          includeTimestamps: {
            label: 'כלול חותמות זמן',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'hype_feature',
        name: 'פיצ\'ר "הייפ"',
        description: 'הגדלת חשיפה לסרטונים של יוצרים חדשים',
        min: 1,
        max: 10,
        details: 'קידום יוצרים חדשים',
        icon: '🚀',
        parameters: {
          hypeType: {
            label: 'סוג הייפ',
            type: 'select',
            options: ['חדש', 'טרנדי', 'ויראלי', 'מעורב'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', 'מתמשך'],
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
        id: 'youtube_communities',
        name: 'קהילות יוטיוב',
        description: 'יצירת קהילות ייחודיות ליוצרי תוכן',
        min: 1,
        max: 5,
        details: 'שמירה על קשר עם הצופים',
        icon: '👥',
        parameters: {
          communityName: {
            label: 'שם הקהילה',
            type: 'text',
            required: true
          },
          communityType: {
            label: 'סוג קהילה',
            type: 'select',
            options: ['כללי', 'מקצועי', 'תחביבים', 'מעורב'],
            required: true
          },
          privacy: {
            label: 'פרטיות',
            type: 'select',
            options: ['ציבורי', 'פרטי', 'מוגבל'],
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
        id: 'auto_dubbing',
        name: 'דיבוב אוטומטי',
        description: 'הוספת דיבוב לסרטונים במגוון שפות',
        min: 1,
        max: 10,
        details: 'הרחבת הקהל הבינלאומי',
        icon: '🎙️',
        parameters: {
          targetLanguages: {
            label: 'שפות יעד',
            type: 'multiselect',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית', 'ספרדית', 'צרפתית'],
            required: true
          },
          voiceType: {
            label: 'סוג קול',
            type: 'select',
            options: ['גברי', 'נשי', 'ניטרלי', 'מותאם אישית'],
            required: true
          },
          quality: {
            label: 'איכות דיבוב',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מקצועי'],
            required: true
          }
        }
      },
      {
        id: 'youtube_music_playlist_covers',
        name: 'מחולל תמונות ליוטיוב מיוזיק',
        description: 'יצירת עטיפות אלבום מותאמות אישית',
        min: 1,
        max: 10,
        details: 'עיצוב רשימות השמעה',
        icon: '🎵',
        parameters: {
          coverStyle: {
            label: 'סגנון עטיפה',
            type: 'select',
            options: ['מינימליסטי', 'צבעוני', 'אבסטרקטי', 'מעורב'],
            required: true
          },
          colorScheme: {
            label: 'סכמת צבעים',
            type: 'select',
            options: ['חם', 'קר', 'ניטרלי', 'צבעוני'],
            required: true
          },
          includeText: {
            label: 'כלול טקסט',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'videos', name: 'סרטונים', icon: '🎥', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'shorts', name: 'שורטס', icon: '📱', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'subscribers', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'comments', name: 'תגובות', icon: '💬', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'shares', name: 'שיתופים', icon: '📤', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
  ];

  const currentFeatures = (youtubeFeatures[selectedCategory as keyof typeof youtubeFeatures] || []) as any[];
  const selectedFeatureData = currentFeatures.find((f: any) => f.id === selectedFeature) as any;

  const handleExecute = async () => {
    if (!selectedFeature) {
      alert('אנא בחר פיצ\'ר');
      return;
    }

    // בדיקת פרמטרים נדרשים
    const requiredParams = selectedFeatureData?.parameters;
    if (requiredParams) {
      for (const [key, param] of Object.entries(requiredParams)) {
        if ((param as any).required && !dynamicParams[key]) {
          alert(`אנא מלא את השדה: ${(param as any).label}`);
          return;
        }
      }
    }

    setIsExecuting(true);

    // סימולציה של ביצוע
    await new Promise(resolve => setTimeout(resolve, 2000));

    // הוספה להיסטוריית פעילות
    const newActivity = {
      id: Date.now(),
      feature: selectedFeatureData.name,
      category: categories.find(c => c.id === selectedCategory)?.name,
      params: dynamicParams,
      timestamp: new Date().toLocaleString('he-IL'),
      status: 'הושלם בהצלחה'
    };

    setActivityHistory(prev => [newActivity, ...prev]);
    setIsExecuting(false);
    setDynamicParams({});
    setSelectedFeature('');
  };

  const handleAdvancedCampaign = async () => {
    if (selectedFeatures.length === 0) {
      alert('אנא בחר לפחות פיצ\'ר אחד');
      return;
    }

    setIsExecuting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newActivity = {
      id: Date.now(),
      feature: `קמפיין מתקדם (${selectedFeatures.length} פיצ\'רים)`,
      category: 'מעורב',
      params: { features: selectedFeatures },
      timestamp: new Date().toLocaleString('he-IL'),
      status: 'הושלם בהצלחה'
    };

    setActivityHistory(prev => [newActivity, ...prev]);
    setIsExecuting(false);
    setSelectedFeatures([]);
    setShowAdvancedCampaign(false);
  };

  const calculateCost = () => {
    return 'חינם - אדמין';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        height: '100vh'
      }}>
        {/* צד שמאל - בחירת פיצ'רים */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            color: 'white'
          }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                marginRight: '15px',
                cursor: 'pointer',
                color: 'white',
                fontSize: '18px'
              }}
            >
              ←
            </button>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
              🎥 ניהול יוטיוב
            </h1>
          </div>

          {/* בחירת קטגוריה */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '18px' }}>
              בחר קטגוריה:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px'
            }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedFeature('');
                    setDynamicParams({});
                  }}
                  style={{
                    background: selectedCategory === category.id 
                      ? category.color 
                      : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* בחירת פיצ'ר */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '18px' }}>
              בחר פיצ'ר:
            </h3>
            <select
              value={selectedFeature}
              onChange={(e) => {
                setSelectedFeature(e.target.value);
                setDynamicParams({});
              }}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '16px',
                background: 'rgba(255,255,255,0.9)',
                color: '#333'
              }}
            >
              <option value="" style={{ color: '#000' }}>בחר פיצ'ר...</option>
              {currentFeatures.map((feature) => (
                <option key={feature.id} value={feature.id} style={{ color: '#000' }}>
                  {feature.icon} {feature.name}
                </option>
              ))}
            </select>
          </div>

          {/* פרמטרים דינמיים */}
          {selectedFeatureData?.parameters && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '30px'
            }}>
              <h3 style={{
                color: 'white',
                marginBottom: '20px',
                fontSize: '18px',
                textAlign: 'center'
              }}>
                הגדרות פיצ'ר
              </h3>
              
              {Object.entries(selectedFeatureData.parameters).map(([key, param]: [string, any]) => (
                <div key={key} style={{ marginBottom: '20px' }}>
                  <label style={{
                    color: 'white',
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {param.label} {param.required && <span style={{ color: '#ff6b6b' }}>*</span>}
                  </label>
                  
                  {param.type === 'number' && (
                    <input
                      type="number"
                      min={param.min}
                      max={param.max}
                      value={dynamicParams[key] || ''}
                      onChange={(e) => setDynamicParams(prev => ({
                        ...prev,
                        [key]: parseInt(e.target.value) || 0
                      }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    />
                  )}
                  
                  {param.type === 'text' && (
                    <input
                      type="text"
                      value={dynamicParams[key] || ''}
                      onChange={(e) => setDynamicParams(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    />
                  )}
                  
                  {param.type === 'textarea' && (
                    <textarea
                      value={dynamicParams[key] || ''}
                      onChange={(e) => setDynamicParams(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.9)',
                        resize: 'vertical'
                      }}
                    />
                  )}
                  
                  {param.type === 'select' && (
                    <select
                      value={dynamicParams[key] || ''}
                      onChange={(e) => setDynamicParams(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    >
                      <option value="">בחר...</option>
                      {param.options.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  
                  {param.type === 'multiselect' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {param.options.map((option: string) => (
                        <label key={option} style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'white',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={dynamicParams[key]?.includes(option) || false}
                            onChange={(e) => {
                              const current = dynamicParams[key] || [];
                              const updated = e.target.checked
                                ? [...current, option]
                                : current.filter((item: string) => item !== option);
                              setDynamicParams(prev => ({ ...prev, [key]: updated }));
                            }}
                            style={{ marginRight: '5px' }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {param.type === 'datetime' && (
                    <input
                      type="datetime-local"
                      value={dynamicParams[key] || ''}
                      onChange={(e) => setDynamicParams(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '14px',
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* כפתור ביצוע */}
          <button
            onClick={handleExecute}
            disabled={isExecuting || !selectedFeature}
            style={{
              width: '100%',
              background: isExecuting 
                ? 'rgba(255,255,255,0.3)' 
                : 'linear-gradient(135deg, #43e97b, #38f9d7)',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: isExecuting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
          >
            {isExecuting ? 'מבצע...' : '🚀 בצע פיצ\'ר'}
          </button>

          {/* קמפיין מתקדם */}
          <button
            onClick={() => setShowAdvancedCampaign(!showAdvancedCampaign)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #fa709a, #fee140)',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {showAdvancedCampaign ? 'סגור קמפיין מתקדם' : '🎯 קמפיין מתקדם'}
          </button>

          {/* פאנל קמפיין מתקדם */}
          {showAdvancedCampaign && (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginTop: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px', textAlign: 'center' }}>
                בחר פיצ'רים לקמפיין
              </h3>
              
              {Object.entries(youtubeFeatures).map(([categoryId, features]) => (
                <div key={categoryId} style={{ marginBottom: '15px' }}>
                  <h4 style={{ 
                    color: 'white', 
                    fontSize: '14px', 
                    marginBottom: '8px',
                    textAlign: 'center'
                  }}>
                    {categories.find(c => c.id === categoryId)?.name}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {features.map((feature) => (
                      <label key={feature.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '11px',
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '5px 8px',
                        borderRadius: '8px'
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFeatures(prev => [...prev, feature.id]);
                            } else {
                              setSelectedFeatures(prev => prev.filter(id => id !== feature.id));
                            }
                          }}
                          style={{ marginRight: '5px' }}
                        />
                        {feature.icon} {feature.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleAdvancedCampaign}
                disabled={isExecuting || selectedFeatures.length === 0}
                style={{
                  width: '100%',
                  background: isExecuting 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: isExecuting ? 'not-allowed' : 'pointer',
                  marginTop: '15px'
                }}
              >
                {isExecuting ? 'מבצע קמפיין...' : `🚀 בצע קמפיין (${selectedFeatures.length} פיצ'רים)`}
              </button>
            </div>
          )}
        </div>

        {/* צד ימין - היסטוריית פעילות */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          overflow: 'hidden'
        }}>
          <h2 style={{
            color: 'white',
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            📋 היסטוריית פעילות
          </h2>
          
          <div style={{
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            paddingRight: '10px'
          }}>
            {activityHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '16px',
                marginTop: '50px'
              }}>
                עדיין לא בוצעו פעולות
              </div>
            ) : (
              activityHistory.map((activity) => (
                <div key={activity.id} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{
                      color: 'white',
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      {activity.feature}
                    </h3>
                    <span style={{
                      background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {activity.status}
                    </span>
                  </div>
                  
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px' }}>
                    <strong>קטגוריה:</strong> {activity.category}
                  </div>
                  
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '8px' }}>
                    <strong>זמן:</strong> {activity.timestamp}
                  </div>
                  
                  {Object.keys(activity.params).length > 0 && (
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                      <strong>פרמטרים:</strong>
                      <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '10px',
                        marginTop: '5px',
                        fontSize: '12px'
                      }}>
                        {Object.entries(activity.params).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeManagement;

