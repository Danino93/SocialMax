import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwitterManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('tweets');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<Record<string, any>>({});
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const twitterFeatures = {
    tweets: [
      {
        id: 'tweet_likes',
        name: 'לייקים לציוצים',
        description: 'הוספת לייקים לציוצים',
        min: 10,
        max: 1000,
        details: 'הגברת מעורבות בציוצים',
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
            label: 'קישור לציוץ',
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
        id: 'tweet_retweets',
        name: 'רטוויטים',
        description: 'הוספת רטוויטים לציוצים',
        min: 5,
        max: 500,
        details: 'הגברת ויראליות',
        icon: '🔄',
        parameters: {
          quantity: {
            label: 'כמות רטוויטים',
            type: 'number',
            min: 5,
            max: 500,
            required: true
          },
          targetUrl: {
            label: 'קישור לציוץ',
            type: 'text',
            required: true
          },
          includeComments: {
            label: 'כלול תגובות',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'tweet_replies',
        name: 'תגובות לציוצים',
        description: 'הוספת תגובות לציוצים',
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
            label: 'קישור לציוץ',
            type: 'text',
            required: true
          },
          replyType: {
            label: 'סוג תגובה',
            type: 'select',
            options: ['חיובי', 'שאלה', 'דיון', 'מעורב'],
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
          },
          interests: {
            label: 'תחומי עניין',
            type: 'multiselect',
            options: ['טכנולוגיה', 'ספורט', 'מוזיקה', 'אופנה', 'אוכל', 'מעורב'],
            required: true
          }
        }
      }
    ],
    spaces: [
      {
        id: 'spaces_creation',
        name: 'יצירת Spaces',
        description: 'יצירה וניהול של Twitter Spaces',
        min: 1,
        max: 5,
        details: 'אינטראקציה ישירה עם הקהל',
        icon: '🎙️',
        parameters: {
          spaceTitle: {
            label: 'כותרת Space',
            type: 'text',
            required: true
          },
          spaceDescription: {
            label: 'תיאור Space',
            type: 'textarea',
            required: true
          },
          spaceType: {
            label: 'סוג Space',
            type: 'select',
            options: ['פתוח', 'מוגבל', 'פרטי'],
            required: true
          },
          duration: {
            label: 'משך זמן',
            type: 'select',
            options: ['30 דקות', '1 שעה', '2 שעות', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'spaces_participants',
        name: 'משתתפים ב-Spaces',
        description: 'הוספת משתתפים ל-Spaces',
        min: 10,
        max: 100,
        details: 'הגברת מעורבות ב-Spaces',
        icon: '👥',
        parameters: {
          quantity: {
            label: 'כמות משתתפים',
            type: 'number',
            min: 10,
            max: 100,
            required: true
          },
          targetSpace: {
            label: 'קישור ל-Space',
            type: 'text',
            required: true
          },
          participationLevel: {
            label: 'רמת השתתפות',
            type: 'select',
            options: ['מאזין', 'משתתף פעיל', 'מעורב'],
            required: true
          }
        }
      }
    ],
    analytics: [
      {
        id: 'tweet_analytics',
        name: 'ניתוח ציוצים',
        description: 'מעקב אחר ביצועי ציוצים',
        min: 1,
        max: 20,
        details: 'הבנת התנהגות הקהל',
        icon: '📊',
        parameters: {
          timeRange: {
            label: 'טווח זמן',
            type: 'select',
            options: ['24 שעות', 'שבוע', 'חודש', '3 חודשים'],
            required: true
          },
          metrics: {
            label: 'מדדים',
            type: 'multiselect',
            options: ['לייקים', 'רטוויטים', 'תגובות', 'צפיות', 'מעורבות'],
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
        id: 'hashtag_analytics',
        name: 'ניתוח האשטגים',
        description: 'מעקב אחר ביצועי האשטגים',
        min: 1,
        max: 10,
        details: 'אופטימיזציה של האשטגים',
        icon: '#️⃣',
        parameters: {
          hashtags: {
            label: 'האשטגים לניתוח',
            type: 'textarea',
            required: true
          },
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['פופולריות', 'מעורבות', 'טרנדיות', 'מלא'],
            required: true
          },
          competitorAnalysis: {
            label: 'ניתוח מתחרים',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      }
    ],
    automation: [
      {
        id: 'tweet_scheduling',
        name: 'תזמון ציוצים',
        description: 'תזמון ציוצים לפרסום עתידי',
        min: 1,
        max: 50,
        details: 'ניהול תוכן יעיל',
        icon: '⏰',
        parameters: {
          tweetContent: {
            label: 'תוכן הציוץ',
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
          includeMedia: {
            label: 'כלול מדיה',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'auto_replies',
        name: 'תגובות אוטומטיות',
        description: 'הגדרת תגובות אוטומטיות',
        min: 1,
        max: 20,
        details: 'מענה אוטומטי למזכרים',
        icon: '🤖',
        parameters: {
          triggerWords: {
            label: 'מילות מפתח',
            type: 'textarea',
            required: true
          },
          autoReplyMessage: {
            label: 'הודעה אוטומטית',
            type: 'textarea',
            required: true
          },
          responseDelay: {
            label: 'עיכוב תגובה (שניות)',
            type: 'number',
            min: 1,
            max: 60,
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'multiple_accounts',
        name: 'ניהול חשבונות מרובים',
        description: 'ניהול מספר חשבונות טוויטר במקביל',
        min: 1,
        max: 10,
        details: 'ניהול יעיל של מספר חשבונות',
        icon: '👤',
        parameters: {
          accountCount: {
            label: 'מספר חשבונות',
            type: 'number',
            min: 2,
            max: 10,
            required: true
          },
          accountTypes: {
            label: 'סוגי חשבונות',
            type: 'multiselect',
            options: ['אישי', 'עסקי', 'מותג', 'מעורב'],
            required: true
          },
          managementLevel: {
            label: 'רמת ניהול',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מלא'],
            required: true
          }
        }
      },
      {
        id: 'encrypted_messages',
        name: 'הודעות מוצפנות',
        description: 'שליחת הודעות פרטיות מוצפנות',
        min: 1,
        max: 10,
        details: 'שמירה על פרטיות התקשורת',
        icon: '🔒',
        parameters: {
          encryptionLevel: {
            label: 'רמת הצפנה',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מקסימלי'],
            required: true
          },
          messageType: {
            label: 'סוג הודעה',
            type: 'select',
            options: ['טקסט', 'מדיה', 'מעורב'],
            required: true
          },
          autoDelete: {
            label: 'מחיקה אוטומטית',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'voice_video_calls',
        name: 'שיחות קוליות ווידאו',
        description: 'שיחות קוליות ווידאו עם משתמשים',
        min: 1,
        max: 5,
        details: 'תקשורת ישירה ומאובטחת',
        icon: '📞',
        parameters: {
          callType: {
            label: 'סוג שיחה',
            type: 'select',
            options: ['קולית', 'וידאו', 'מעורב'],
            required: true
          },
          maxParticipants: {
            label: 'מספר משתתפים מקסימלי',
            type: 'number',
            min: 2,
            max: 10,
            required: true
          },
          recording: {
            label: 'הקלטה',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      },
      {
        id: 'tips_feature',
        name: 'פיצ\'ר "טיפים"',
        description: 'קבלת תשלומים ישירים מעוקבים',
        min: 1,
        max: 10,
        details: 'מונטיזציה של תוכן',
        icon: '💰',
        parameters: {
          paymentMethods: {
            label: 'אמצעי תשלום',
            type: 'multiselect',
            options: ['PayPal', 'Bitcoin', 'Ethereum', 'מזומן', 'מעורב'],
            required: true
          },
          tipAmounts: {
            label: 'סכומי טיפים',
            type: 'multiselect',
            options: ['$1', '$5', '$10', '$25', '$50', 'מותאם אישית'],
            required: true
          },
          currency: {
            label: 'מטבע',
            type: 'select',
            options: ['דולר', 'יורו', 'שקל', 'Bitcoin'],
            required: true
          }
        }
      },
      {
        id: 'super_follows',
        name: 'מנויים בתשלום (Super Follows)',
        description: 'הצעת תוכן בלעדי למנויים בתשלום',
        min: 1,
        max: 5,
        details: 'מונטיזציה מתקדמת',
        icon: '⭐',
        parameters: {
          subscriptionTiers: {
            label: 'רמות מנוי',
            type: 'multiselect',
            options: ['בסיסי', 'פרימיום', 'VIP', 'מותאם אישית'],
            required: true
          },
          monthlyPrice: {
            label: 'מחיר חודשי',
            type: 'number',
            min: 1,
            max: 100,
            required: true
          },
          exclusiveContent: {
            label: 'תוכן בלעדי',
            type: 'multiselect',
            options: ['ציוצים פרטיים', 'מדיה בלעדית', 'גישה מוקדמת', 'תוכן מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'sub_profiles',
        name: 'פרופילי משנה',
        description: 'יצירת פרופילים נפרדים לנושאים שונים',
        min: 1,
        max: 5,
        details: 'ארגון תוכן יעיל',
        icon: '👤',
        parameters: {
          profileName: {
            label: 'שם פרופיל',
            type: 'text',
            required: true
          },
          profileTopic: {
            label: 'נושא פרופיל',
            type: 'select',
            options: ['טכנולוגיה', 'ספורט', 'מוזיקה', 'אופנה', 'אוכל', 'מעורב'],
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
        id: 'word_filtering',
        name: 'סינון מילים בתגובות',
        description: 'הגדרת מילים אסורות בתגובות',
        min: 1,
        max: 20,
        details: 'שליטה על התגובות',
        icon: '🚫',
        parameters: {
          blockedWords: {
            label: 'מילים חסומות',
            type: 'textarea',
            required: true
          },
          filterAction: {
            label: 'פעולת סינון',
            type: 'select',
            options: ['הסתרה', 'מחיקה', 'התראה', 'אישור ידני'],
            required: true
          },
          notificationLevel: {
            label: 'רמת התראה',
            type: 'select',
            options: ['כל התגובות', 'תגובות חשודות', 'כבוי'],
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'tweets', name: 'ציוצים', icon: '🐦', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'followers', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'spaces', name: 'Spaces', icon: '🎙️', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'analytics', name: 'ניתוח', icon: '📊', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'automation', name: 'אוטומציה', icon: '🤖', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
  ];

  const currentFeatures = (twitterFeatures[selectedCategory as keyof typeof twitterFeatures] || []) as any[];
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
              🐦 ניהול טוויטר
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
              
              {Object.entries(twitterFeatures).map(([categoryId, features]) => (
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

export default TwitterManagement;

