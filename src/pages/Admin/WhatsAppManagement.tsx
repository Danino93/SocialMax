import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatsAppManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('messages');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<Record<string, any>>({});
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const whatsappFeatures = {
    messages: [
      {
        id: 'bulk_messaging',
        name: 'הודעות המוניות',
        description: 'שליחת הודעות למספר רב של לקוחות',
        min: 10,
        max: 1000,
        details: 'שיווק יעיל ללקוחות',
        icon: '📢',
        parameters: {
          messageContent: {
            label: 'תוכן ההודעה',
            type: 'textarea',
            required: true
          },
          recipientList: {
            label: 'רשימת נמענים',
            type: 'textarea',
            required: true
          },
          scheduleTime: {
            label: 'זמן שליחה',
            type: 'datetime',
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
        description: 'הגדרת תגובות אוטומטיות להודעות',
        min: 1,
        max: 20,
        details: 'מענה אוטומטי ללקוחות',
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
          },
          businessHours: {
            label: 'שעות פעילות',
            type: 'select',
            options: ['24/7', 'שעות עסק', 'מותאם אישית'],
            required: true
          }
        }
      },
      {
        id: 'welcome_messages',
        name: 'הודעות ברוכים הבאים',
        description: 'הודעות אוטומטיות ללקוחות חדשים',
        min: 1,
        max: 5,
        details: 'חוויית לקוח משופרת',
        icon: '👋',
        parameters: {
          welcomeText: {
            label: 'טקסט ברכה',
            type: 'textarea',
            required: true
          },
          includeMenu: {
            label: 'כלול תפריט',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'],
            required: true
          }
        }
      }
    ],
    customers: [
      {
        id: 'customer_profiles',
        name: 'פרופילי לקוחות',
        description: 'ניהול מידע לקוחות מפורט',
        min: 1,
        max: 100,
        details: 'מעקב אחר לקוחות',
        icon: '👤',
        parameters: {
          customerName: {
            label: 'שם לקוח',
            type: 'text',
            required: true
          },
          phoneNumber: {
            label: 'מספר טלפון',
            type: 'text',
            required: true
          },
          customerTags: {
            label: 'תוויות לקוח',
            type: 'multiselect',
            options: ['VIP', 'חדש', 'חוזר', 'פוטנציאלי', 'לא פעיל'],
            required: true
          },
          notes: {
            label: 'הערות',
            type: 'textarea',
            required: false
          }
        }
      },
      {
        id: 'customer_segmentation',
        name: 'פילוח לקוחות',
        description: 'חלוקת לקוחות לקבוצות',
        min: 1,
        max: 10,
        details: 'שיווק ממוקד',
        icon: '🎯',
        parameters: {
          segmentName: {
            label: 'שם קבוצה',
            type: 'text',
            required: true
          },
          criteria: {
            label: 'קריטריונים',
            type: 'multiselect',
            options: ['גיל', 'מיקום', 'היסטוריית רכישות', 'תדירות שימוש', 'סכום רכישה'],
            required: true
          },
          targetMessage: {
            label: 'הודעה מותאמת',
            type: 'textarea',
            required: true
          }
        }
      }
    ],
    catalog: [
      {
        id: 'product_catalog',
        name: 'קטלוג מוצרים',
        description: 'ניהול מוצרים ושירותים',
        min: 1,
        max: 50,
        details: 'הצגת מוצרים ללקוחות',
        icon: '🛍️',
        parameters: {
          productName: {
            label: 'שם מוצר',
            type: 'text',
            required: true
          },
          productDescription: {
            label: 'תיאור מוצר',
            type: 'textarea',
            required: true
          },
          price: {
            label: 'מחיר',
            type: 'number',
            min: 0,
            max: 10000,
            required: true
          },
          category: {
            label: 'קטגוריה',
            type: 'select',
            options: ['אלקטרוניקה', 'אופנה', 'בית', 'ספורט', 'יופי', 'מעורב'],
            required: true
          },
          availability: {
            label: 'זמינות',
            type: 'select',
            options: ['במלאי', 'אזל מהמלאי', 'הזמנה מראש'],
            required: true
          }
        }
      },
      {
        id: 'order_management',
        name: 'ניהול הזמנות',
        description: 'מעקב אחר הזמנות לקוחות',
        min: 1,
        max: 20,
        details: 'ניהול מכירות יעיל',
        icon: '📦',
        parameters: {
          orderNumber: {
            label: 'מספר הזמנה',
            type: 'text',
            required: true
          },
          customerInfo: {
            label: 'פרטי לקוח',
            type: 'text',
            required: true
          },
          orderItems: {
            label: 'פריטים בהזמנה',
            type: 'textarea',
            required: true
          },
          orderStatus: {
            label: 'סטטוס הזמנה',
            type: 'select',
            options: ['התקבלה', 'בטיפול', 'נשלחה', 'הושלמה', 'בוטלה'],
            required: true
          }
        }
      }
    ],
    broadcast: [
      {
        id: 'broadcast_lists',
        name: 'רשימות שידור',
        description: 'יצירת רשימות שידור מותאמות',
        min: 1,
        max: 10,
        details: 'שיווק ממוקד לקבוצות',
        icon: '📋',
        parameters: {
          listName: {
            label: 'שם רשימה',
            type: 'text',
            required: true
          },
          targetAudience: {
            label: 'קהל יעד',
            type: 'textarea',
            required: true
          },
          messageTemplate: {
            label: 'תבנית הודעה',
            type: 'textarea',
            required: true
          },
          sendFrequency: {
            label: 'תדירות שליחה',
            type: 'select',
            options: ['פעם אחת', 'יומי', 'שבועי', 'חודשי'],
            required: true
          }
        }
      },
      {
        id: 'scheduled_messages',
        name: 'הודעות מתוזמנות',
        description: 'תזמון הודעות לשליחה מאוחר יותר',
        min: 1,
        max: 50,
        details: 'שליחה בזמן אופטימלי',
        icon: '⏰',
        parameters: {
          messageContent: {
            label: 'תוכן הודעה',
            type: 'textarea',
            required: true
          },
          sendDateTime: {
            label: 'זמן שליחה',
            type: 'datetime',
            required: true
          },
          recipientType: {
            label: 'סוג נמענים',
            type: 'select',
            options: ['כל הלקוחות', 'רשימה ספציפית', 'לקוחות מסוימים'],
            required: true
          },
          timezone: {
            label: 'אזור זמן',
            type: 'select',
            options: ['ישראל', 'GMT', 'EST', 'PST'],
            required: true
          }
        }
      }
    ],
    analytics: [
      {
        id: 'message_analytics',
        name: 'ניתוח הודעות',
        description: 'מעקב אחר ביצועי הודעות',
        min: 1,
        max: 20,
        details: 'הבנת התנהגות לקוחות',
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
            options: ['הודעות נשלחו', 'הודעות נמסרו', 'הודעות נקראו', 'תגובות', 'שיתופים'],
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
        id: 'customer_insights',
        name: 'תובנות לקוחות',
        description: 'ניתוח התנהגות לקוחות',
        min: 1,
        max: 10,
        details: 'הבנת צרכי הלקוחות',
        icon: '🔍',
        parameters: {
          analysisType: {
            label: 'סוג ניתוח',
            type: 'select',
            options: ['דמוגרפיה', 'התנהגות', 'העדפות', 'מלא'],
            required: true
          },
          customerSegment: {
            label: 'קטע לקוחות',
            type: 'select',
            options: ['כל הלקוחות', 'לקוחות פעילים', 'לקוחות חדשים', 'לקוחות VIP'],
            required: true
          },
          includeRecommendations: {
            label: 'כלול המלצות',
            type: 'select',
            options: ['כן', 'לא'],
            required: true
          }
        }
      }
    ],
    advanced: [
      {
        id: 'chatbot_integration',
        name: 'אינטגרציה עם צ\'אטבוט',
        description: 'חיבור בוטים חכמים לווטסאפ',
        min: 1,
        max: 5,
        details: 'מענה אוטומטי מתקדם',
        icon: '🤖',
        parameters: {
          botType: {
            label: 'סוג בוט',
            type: 'select',
            options: ['שירות לקוחות', 'מכירות', 'תמיכה טכנית', 'מעורב'],
            required: true
          },
          aiLevel: {
            label: 'רמת AI',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מקצועי'],
            required: true
          },
          language: {
            label: 'שפה',
            type: 'select',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית', 'מעורב'],
            required: true
          },
          fallbackOption: {
            label: 'אפשרות גיבוי',
            type: 'select',
            options: ['העברה לאנושי', 'הודעה אוטומטית', 'המתנה'],
            required: true
          }
        }
      },
      {
        id: 'payment_integration',
        name: 'אינטגרציה עם תשלומים',
        description: 'קבלת תשלומים דרך ווטסאפ',
        min: 1,
        max: 10,
        details: 'מכירות ישירות דרך הצ\'אט',
        icon: '💳',
        parameters: {
          paymentMethod: {
            label: 'אמצעי תשלום',
            type: 'multiselect',
            options: ['אשראי', 'העברה בנקאית', 'PayPal', 'Bitcoin', 'מזומן'],
            required: true
          },
          currency: {
            label: 'מטבע',
            type: 'select',
            options: ['שקל', 'דולר', 'יורו', 'לירה טורקית'],
            required: true
          },
          invoiceTemplate: {
            label: 'תבנית חשבונית',
            type: 'select',
            options: ['פשוטה', 'מפורטת', 'מותאמת אישית'],
            required: true
          }
        }
      },
      {
        id: 'api_integration',
        name: 'אינטגרציה עם API',
        description: 'חיבור למערכות חיצוניות',
        min: 1,
        max: 5,
        details: 'אוטומציה מתקדמת',
        icon: '🔗',
        parameters: {
          systemType: {
            label: 'סוג מערכת',
            type: 'select',
            options: ['CRM', 'ERP', 'מערכת הזמנות', 'מערכת מלאי', 'מעורב'],
            required: true
          },
          syncFrequency: {
            label: 'תדירות סנכרון',
            type: 'select',
            options: ['זמן אמת', 'כל שעה', 'יומי', 'שבועי'],
            required: true
          },
          dataTypes: {
            label: 'סוגי נתונים',
            type: 'multiselect',
            options: ['לקוחות', 'הזמנות', 'מוצרים', 'הודעות', 'סטטיסטיקות'],
            required: true
          }
        }
      },
      {
        id: 'multi_language_support',
        name: 'תמיכה רב-לשונית',
        description: 'תמיכה במספר שפות',
        min: 1,
        max: 10,
        details: 'שירות לקוחות בינלאומי',
        icon: '🌍',
        parameters: {
          supportedLanguages: {
            label: 'שפות נתמכות',
            type: 'multiselect',
            options: ['עברית', 'אנגלית', 'ערבית', 'רוסית', 'ספרדית', 'צרפתית'],
            required: true
          },
          autoTranslation: {
            label: 'תרגום אוטומטי',
            type: 'select',
            options: ['פעיל', 'לא פעיל'],
            required: true
          },
          languageDetection: {
            label: 'זיהוי שפה אוטומטי',
            type: 'select',
            options: ['פעיל', 'לא פעיל'],
            required: true
          }
        }
      },
      {
        id: 'security_features',
        name: 'פיצ\'רי אבטחה',
        description: 'הגנה על נתונים ופרטיות',
        min: 1,
        max: 10,
        details: 'אבטחת מידע מתקדמת',
        icon: '🔒',
        parameters: {
          encryptionLevel: {
            label: 'רמת הצפנה',
            type: 'select',
            options: ['בסיסי', 'בינוני', 'מתקדם', 'מקסימלי'],
            required: true
          },
          accessControl: {
            label: 'בקרת גישה',
            type: 'multiselect',
            options: ['הרשאות משתמש', 'הגבלת IP', 'אימות דו-שלבי', 'הצפנת הודעות'],
            required: true
          },
          dataRetention: {
            label: 'שמירת נתונים',
            type: 'select',
            options: ['30 יום', '3 חודשים', 'שנה', 'לצמיתות'],
            required: true
          }
        }
      }
    ]
  };

  const categories = [
    { id: 'messages', name: 'הודעות', icon: '💬', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'customers', name: 'לקוחות', icon: '👥', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'catalog', name: 'קטלוג', icon: '🛍️', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'broadcast', name: 'שידור', icon: '📢', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'analytics', name: 'ניתוח', icon: '📊', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'advanced', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
  ];

  const currentFeatures = (whatsappFeatures[selectedCategory as keyof typeof whatsappFeatures] || []) as any[];
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
              💬 ניהול ווטסאפ ביזנס
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
              
              {Object.entries(whatsappFeatures).map(([categoryId, features]) => (
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

export default WhatsAppManagement;

