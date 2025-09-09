import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstagramManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('posts');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<Record<string, any>>({});
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const instagramFeatures = {
    posts: [
      {
        id: 'post_likes',
        name: 'לייקים לפוסטים',
        description: 'הוספת לייקים לפוסטים',
        min: 10,
        max: 1000,
        details: 'הגברת מעורבות בפוסטים',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetUrl: {
            label: 'קישור לפוסט',
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
      },
      {
        id: 'post_views',
        name: 'צפיות בפוסטים',
        description: 'הוספת צפיות לפוסטים',
        min: 50,
        max: 5000,
        details: 'הגברת חשיפה לפוסטים',
        icon: '👁️',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 50,
            max: 5000,
            required: true
          },
          targetUrl: {
            label: 'קישור לפוסט',
            type: 'text',
            required: true
          },
          retention: {
            label: 'שיעור צפייה',
            type: 'select',
            options: ['30%', '50%', '70%', '90%'],
            required: true
          }
        }
      },
      {
        id: 'post_saves',
        name: 'שמירות לפוסטים',
        description: 'הוספת שמירות לפוסטים - boost לאלגוריתם',
        min: 10,
        max: 1000,
        details: 'הגברת חשיפה אורגנית',
        icon: '💾',
        parameters: {
          quantity: {
            label: 'כמות שמירות',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetUrl: {
            label: 'קישור לפוסט',
            type: 'text',
            required: true
          },
          targetType: {
            label: 'סוג שמירה',
            type: 'select',
            options: ['שמירה רגילה', 'שמירה למועדפים', 'שמירה לספרייה'],
            required: true
          }
        }
      },
      {
        id: 'post_shares',
        name: 'שיתופים לפוסטים',
        description: 'הוספת שיתופים לפוסטים - ויראליות',
        min: 5,
        max: 500,
        details: 'הגברת ויראליות',
        icon: '📤',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 5,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לפוסט',
            type: 'text',
            required: true
          },
          shareType: {
            label: 'סוג שיתוף',
            type: 'select',
            options: ['שיתוף לסטורי', 'שיתוף ישיר', 'שיתוף לפרטי'],
            required: true
          }
        }
      }
    ],
    stories: [
      {
        id: 'story_views',
        name: 'צפיות בסטוריז',
        description: 'הוספת צפיות לסטוריז',
        min: 20,
        max: 2000,
        details: 'הגברת חשיפה לסטוריז',
        icon: '📱',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 20,
            max: 2000,
            required: true
          },
          targetUrl: {
            label: 'קישור לסטורי',
            type: 'text',
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['15 שניות', '30 שניות', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'story_likes',
        name: 'לייקים לסטוריז',
        description: 'הוספת לייקים לסטוריז - hearts animation',
        min: 10,
        max: 1000,
        details: 'הגברת מעורבות בסטוריז',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetUrl: {
            label: 'קישור לסטורי',
            type: 'text',
            required: true
          },
          targetType: {
            label: 'סוג לייק',
            type: 'select',
            options: ['לייק רגיל', 'לייק מהיר', 'לייק מתוזמן'],
            required: true
          }
        }
      },
      {
        id: 'story_replies',
        name: 'תגובות לסטוריז',
        description: 'הוספת תגובות לסטוריז - מעורבות גבוהה',
        min: 5,
        max: 200,
        details: 'הגברת מעורבות',
        icon: '💬',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 5,
            max: 200,
            required: true
          },
          targetUrl: {
            label: 'קישור לסטורי',
            type: 'text',
            required: true
          },
          replyType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['טקסט', 'אמוג\'י', 'סטיקר', 'תמונה'],
            required: true
          }
        }
      }
    ],
    reels: [
      {
        id: 'reel_views',
        name: 'צפיות ברילסים',
        description: 'הוספת צפיות לרילסים',
        min: 100,
        max: 10000,
        details: 'הגברת חשיפה לרילסים',
        icon: '🎬',
        parameters: {
          quantity: {
            label: 'כמות צפיות',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          },
          targetUrl: {
            label: 'קישור לרילס',
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
        id: 'reel_likes',
        name: 'לייקים לרילסים',
        description: 'הוספת לייקים לרילסים - אלגוריתם boost',
        min: 50,
        max: 5000,
        details: 'הגברת מעורבות ברילסים',
        icon: '❤️',
        parameters: {
          quantity: {
            label: 'כמות לייקים',
            type: 'number',
            min: 50,
            max: 5000,
            required: true
          },
          targetUrl: {
            label: 'קישור לרילס',
            type: 'text',
            required: true
          },
          targetType: {
            label: 'סוג לייק',
            type: 'select',
            options: ['לייק רגיל', 'לייק מהיר', 'לייק מתוזמן'],
            required: true
          }
        }
      },
      {
        id: 'reel_comments',
        name: 'תגובות לרילסים',
        description: 'הוספת תגובות לרילסים - מעורבות גבוהה',
        min: 10,
        max: 1000,
        details: 'הגברת מעורבות',
        icon: '💬',
        parameters: {
          quantity: {
            label: 'כמות תגובות',
            type: 'number',
            min: 10,
            max: 1000,
            required: true
          },
          targetUrl: {
            label: 'קישור לרילס',
            type: 'text',
            required: true
          },
          commentType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['טקסט', 'אמוג\'י', 'סטיקר', 'תמונה'],
            required: true
          }
        }
      },
      {
        id: 'reel_shares',
        name: 'שיתופים לרילסים',
        description: 'הוספת שיתופים לרילסים - ויראליות',
        min: 5,
        max: 500,
        details: 'הגברת ויראליות',
        icon: '📤',
        parameters: {
          quantity: {
            label: 'כמות שיתופים',
            type: 'number',
            min: 5,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לרילס',
            type: 'text',
            required: true
          },
          shareType: {
            label: 'סוג שיתוף',
            type: 'select',
            options: ['שיתוף לסטורי', 'שיתוף ישיר', 'שיתוף לפרטי'],
            required: true
          }
        }
      }
    ],
    followers: [
      {
        id: 'account_followers',
        name: 'עוקבים לחשבון',
        description: 'הוספת עוקבים לחשבון',
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
            label: 'קישור לחשבון',
            type: 'text',
            required: true
          },
          quality: {
            label: 'איכות עוקבים',
            type: 'select',
            options: ['רגיל', 'איכותי', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'follow_unfollow',
        name: 'מעקב/הפסקת מעקב אוטומטי',
        description: 'אסטרטגיית follow/unfollow אוטומטית',
        min: 10,
        max: 500,
        details: 'הגברת חשיפה אורגנית',
        icon: '🔄',
        parameters: {
          quantity: {
            label: 'כמות פעולות',
            type: 'number',
            min: 10,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לחשבון',
            type: 'text',
            required: true
          },
          strategy: {
            label: 'אסטרטגיה',
            type: 'select',
            options: ['follow בלבד', 'unfollow בלבד', 'follow + unfollow'],
            required: true
          }
        }
      },
      {
        id: 'hashtag_following',
        name: 'מעקב אחר תגיות',
        description: 'מעקב אוטומטי אחר תגיות רלוונטיות',
        min: 5,
        max: 100,
        details: 'הגברת חשיפה לתגיות',
        icon: '#️⃣',
        parameters: {
          quantity: {
            label: 'כמות תגיות',
            type: 'number',
            min: 5,
            max: 100,
            required: true
          },
          hashtags: {
            label: 'רשימת תגיות',
            type: 'text',
            required: true
          },
          action: {
            label: 'פעולה',
            type: 'select',
            options: ['מעקב', 'לייק', 'תגובה', 'שיתוף'],
            required: true
          }
        }
      }
    ],
    comments: [
      {
        id: 'post_comments',
        name: 'תגובות לפוסטים',
        description: 'הוספת תגובות לפוסטים',
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
            label: 'קישור לפוסט',
            type: 'text',
            required: true
          },
          commentType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['חיובי', 'שאלה', 'אמוג\'י', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'dm_automation',
        name: 'DM אוטומטיים',
        description: 'שליחת הודעות פרטיות אוטומטיות',
        min: 1,
        max: 50,
        details: 'הגברת מעורבות אישית',
        icon: '📩',
        parameters: {
          quantity: {
            label: 'כמות הודעות',
            type: 'number',
            min: 1,
            max: 50,
            required: true
          },
          targetUrl: {
            label: 'קישור לחשבון',
            type: 'text',
            required: true
          },
          messageType: {
            label: 'סוג הודעה',
            type: 'select',
            options: ['ברכה', 'הזמנה', 'מידע', 'מעורב'],
            required: true
          }
        }
      },
      {
        id: 'engagement_pods',
        name: 'קבוצות מעורבות',
        description: 'הצטרפות לקבוצות מעורבות - engagement pods',
        min: 1,
        max: 20,
        details: 'הגברת מעורבות קבוצתית',
        icon: '🤝',
        parameters: {
          quantity: {
            label: 'כמות קבוצות',
            type: 'number',
            min: 1,
            max: 20,
            required: true
          },
          targetUrl: {
            label: 'קישור לחשבון',
            type: 'text',
            required: true
          },
          podType: {
            label: 'סוג קבוצה',
            type: 'select',
            options: ['לייקים', 'תגובות', 'שיתופים', 'מעורב'],
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'post_scheduling',
        name: 'תזמון פוסטים',
        description: 'תזמון פוסטים וסטוריז מראש',
        min: 1,
        max: 50,
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
          hashtags: {
            label: 'האשטגים',
            type: 'textarea',
            required: false
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          }
        }
      },
      {
        id: 'visual_feed_planning',
        name: 'תכנון ויזואלי של הפיד',
        description: 'תצוגה מקדימה של הפיד לפני פרסום',
        min: 1,
        max: 20,
        details: 'תכנון עיצוב הפיד',
        icon: '🎨',
        parameters: {
          gridSize: {
            label: 'גודל רשת',
            type: 'select',
            options: ['3x3', '4x4', '5x5', 'מותאם אישית'],
            required: true
          },
          theme: {
            label: 'נושא עיצוב',
            type: 'select',
            options: ['מינימליסטי', 'צבעוני', 'מונוכרום', 'מעורב'],
            required: true
          },
          previewMode: {
            label: 'מצב תצוגה',
            type: 'select',
            options: ['תצוגה מקדימה', 'עריכה', 'פרסום'],
            required: true
          }
        }
      },
      {
        id: 'hashtag_management',
        name: 'ניהול האשטגים',
        description: 'מעקב ובחירת האשטגים פופולריים',
        min: 1,
        max: 30,
        details: 'אופטימיזציה של האשטגים',
        icon: '#️⃣',
        parameters: {
          hashtagType: {
            label: 'סוג האשטג',
            type: 'select',
            options: ['פופולרי', 'נישה', 'מקומי', 'מעורב'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'מעורב'],
            required: true
          },
          trendingLevel: {
            label: 'רמת טרנדיות',
            type: 'select',
            options: ['טרנדי מאוד', 'טרנדי', 'בינוני', 'חדש'],
            required: true
          }
        }
      },
      {
        id: 'engagement_analytics',
        name: 'ניתוח מעורבות',
        description: 'מעקב אחר ביצועי הפוסטים והסטוריז',
        min: 1,
        max: 20,
        details: 'הבנת התנהגות הקהל',
        icon: '📊',
        parameters: {
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['מעורבות', 'צפיות', 'שיתופים', 'מלא'],
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
          }
        }
      },
      {
        id: 'instagram_shopping',
        name: 'חנות אינסטגרם',
        description: 'הצגת מוצרים ורכישות ישירות',
        min: 1,
        max: 10,
        details: 'הפיכת תוכן למכירות',
        icon: '🛍️',
        parameters: {
          productType: {
            label: 'סוג מוצר',
            type: 'select',
            options: ['אופנה', 'יופי', 'אלקטרוניקה', 'בית', 'ספורט'],
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
          }
        }
      },
      {
        id: 'influencer_collaborations',
        name: 'שיתופי פעולה עם משפיענים',
        description: 'ניהול והקמת קמפיינים משותפים',
        min: 1,
        max: 5,
        details: 'הרחבת השפעה',
        icon: '🤝',
        parameters: {
          collaborationType: {
            label: 'סוג שיתוף פעולה',
            type: 'select',
            options: ['פוסט משותף', 'סטורי', 'רילס', 'מעורב'],
            required: true
          },
          influencerSize: {
            label: 'גודל משפיען',
            type: 'select',
            options: ['מיקרו (1K-10K)', 'בינוני (10K-100K)', 'מאקרו (100K+)'],
            required: true
          },
          budget: {
            label: 'תקציב',
            type: 'number',
            min: 100,
            max: 10000,
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'posts', name: 'פוסטים', icon: '📸', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'stories', name: 'סטוריז', icon: '📱', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'reels', name: 'רילסים', icon: '🎬', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'followers', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'comments', name: 'תגובות', icon: '💬', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
  ];

  const currentFeatures = (instagramFeatures[selectedCategory as keyof typeof instagramFeatures] || []) as any[];
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
              📸 ניהול אינסטגרם
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
              
              {Object.entries(instagramFeatures).map(([categoryId, features]) => (
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

export default InstagramManagement;
