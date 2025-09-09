import React, { useState } from 'react';

const GoogleBusinessManagement: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [formData, setFormData] = useState<{[key: string]: any}>({});
  const [showAdvancedCampaign, setShowAdvancedCampaign] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const features = [
    // ביקורות
    {
      id: 'google_reviews',
      name: 'ביקורות Google 5 כוכבים',
      description: 'הוספת ביקורות 5 כוכבים איכותיות - דומיננטיות בגוגל',
      min: 5,
      max: 100,
      details: 'הגברת מוניטין ונראות',
      icon: '⭐',
      category: 'ביקורות',
      parameters: {
        quantity: { label: 'כמות ביקורות', type: 'number', min: 5, max: 100, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        reviewType: { label: 'סוג ביקורה', type: 'select', options: ['ביקורה כללית', 'ביקורה על שירות', 'ביקורה על מוצר', 'ביקורה על חוויה'], required: true },
        language: { label: 'שפה', type: 'select', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'], required: true }
      }
    },
    {
      id: 'review_management',
      name: 'ניהול ביקורות',
      description: 'ניהול חכם של ביקורות - מעקב ותגובות',
      min: 1,
      max: 20,
      details: 'ניהול מקצועי של מוניטין',
      icon: '📝',
      category: 'ביקורות',
      parameters: {
        quantity: { label: 'כמות ביקורות לניהול', type: 'number', min: 1, max: 20, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        managementType: { label: 'סוג ניהול', type: 'select', options: ['מעקב בלבד', 'תגובות אוטומטיות', 'ניהול מלא', 'ניתוח ביצועים'], required: true },
        responseTime: { label: 'זמן תגובה', type: 'select', options: ['מיידי', 'תוך שעה', 'תוך יום', 'תוך שבוע'], required: true }
      }
    },
    {
      id: 'review_monitoring',
      name: 'מעקב ביקורות',
      description: 'מעקב אוטומטי אחר ביקורות - התראות מיידיות',
      min: 1,
      max: 30,
      details: 'מעקב מתמיד אחר מוניטין',
      icon: '👁️',
      category: 'ביקורות',
      parameters: {
        quantity: { label: 'כמות ביקורות למעקב', type: 'number', min: 1, max: 30, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        monitoringType: { label: 'סוג מעקב', type: 'select', options: ['מעקב יומי', 'מעקב שבועי', 'מעקב חודשי', 'מעקב רציף'], required: true },
        alertType: { label: 'סוג התראה', type: 'select', options: ['אימייל', 'SMS', 'התראה באפליקציה', 'כל האפשרויות'], required: true }
      }
    },
    // צפיות
    {
      id: 'photo_views',
      name: 'צפיות בתמונות',
      description: 'הוספת צפיות לתמונות - הגברת חשיפה',
      min: 100,
      max: 10000,
      details: 'הגברת נראות תמונות',
      icon: '📸',
      category: 'צפיות',
      parameters: {
        quantity: { label: 'כמות צפיות', type: 'number', min: 100, max: 10000, required: true },
        targetUrl: { label: 'קישור לתמונה', type: 'text', required: true },
        viewType: { label: 'סוג צפייה', type: 'select', options: ['צפייה רגילה', 'צפייה ממוקדת', 'צפייה אורגנית', 'צפייה מהירה'], required: true },
        duration: { label: 'משך זמן', type: 'select', options: ['מהיר', 'בינוני', 'איטי', 'טבעי'], required: true }
      }
    },
    {
      id: 'profile_views',
      name: 'צפיות בפרופיל',
      description: 'הוספת צפיות בפרופיל העסק - נוכחות דיגיטלית',
      min: 50,
      max: 5000,
      details: 'הגברת נוכחות דיגיטלית',
      icon: '👀',
      category: 'צפיות',
      parameters: {
        quantity: { label: 'כמות צפיות', type: 'number', min: 50, max: 5000, required: true },
        targetUrl: { label: 'קישור לפרופיל', type: 'text', required: true },
        viewType: { label: 'סוג צפייה', type: 'select', options: ['צפייה רגילה', 'צפייה ממוקדת', 'צפייה אורגנית', 'צפייה מהירה'], required: true },
        source: { label: 'מקור צפייה', type: 'select', options: ['חיפוש גוגל', 'מפות גוגל', 'חיפוש ישיר', 'קישור חיצוני'], required: true }
      }
    },
    {
      id: 'website_clicks',
      name: 'קליקים לאתר',
      description: 'הוספת קליקים לאתר - הגברת טרפיק',
      min: 10,
      max: 1000,
      details: 'הגברת טרפיק לאתר',
      icon: '🔗',
      category: 'צפיות',
      parameters: {
        quantity: { label: 'כמות קליקים', type: 'number', min: 10, max: 1000, required: true },
        targetUrl: { label: 'קישור לאתר', type: 'text', required: true },
        clickType: { label: 'סוג קליק', type: 'select', options: ['קליק רגיל', 'קליק ממוקד', 'קליק אורגני', 'קליק מהיר'], required: true },
        device: { label: 'סוג מכשיר', type: 'select', options: ['נייד', 'דסקטופ', 'טאבלט', 'כל המכשירים'], required: true }
      }
    },
    // מיקוד מקומי
    {
      id: 'local_seo',
      name: 'SEO מקומי',
      description: 'אופטימיזציה למנועי חיפוש מקומיים - מיקוד גיאוגרפי',
      min: 1,
      max: 10,
      details: 'אופטימיזציה מקומית מתקדמת',
      icon: '📍',
      category: 'מיקוד מקומי',
      parameters: {
        quantity: { label: 'כמות מילות מפתח', type: 'number', min: 1, max: 10, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        location: { label: 'מיקום', type: 'text', required: true },
        keywords: { label: 'מילות מפתח', type: 'text', required: true },
        radius: { label: 'רדיוס (ק"מ)', type: 'number', min: 1, max: 50, required: true }
      }
    },
    {
      id: 'street_level_targeting',
      name: 'מיקוד רמת רחוב',
      description: 'מיקוד מתקדם ברמת רחוב - דיוק מקסימלי',
      min: 1,
      max: 15,
      details: 'מיקוד מדויק ברמת רחוב',
      icon: '🗺️',
      category: 'מיקוד מקומי',
      parameters: {
        quantity: { label: 'כמות רחובות', type: 'number', min: 1, max: 15, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        streets: { label: 'שמות רחובות', type: 'text', required: true },
        city: { label: 'עיר', type: 'text', required: true },
        precision: { label: 'רמת דיוק', type: 'select', options: ['רחוב', 'בית', 'קומה', 'דירה'], required: true }
      }
    },
    {
      id: 'local_keywords',
      name: 'מילות מפתח מקומיות',
      description: 'אופטימיזציה למילות מפתח מקומיות - רלוונטיות גבוהה',
      min: 1,
      max: 25,
      details: 'מילות מפתח מקומיות ממוקדות',
      icon: '🔍',
      category: 'מיקוד מקומי',
      parameters: {
        quantity: { label: 'כמות מילות מפתח', type: 'number', min: 1, max: 25, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        keywords: { label: 'מילות מפתח', type: 'text', required: true },
        location: { label: 'מיקום', type: 'text', required: true },
        language: { label: 'שפה', type: 'select', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'], required: true }
      }
    },
    // Q&A
    {
      id: 'qa_optimization',
      name: 'אופטימיזציה של Q&A',
      description: 'אופטימיזציה של שאלות ותשובות - מעורבות גבוהה',
      min: 1,
      max: 20,
      details: 'אופטימיזציה של Q&A',
      icon: '❓',
      category: 'Q&A',
      parameters: {
        quantity: { label: 'כמות שאלות', type: 'number', min: 1, max: 20, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        questionType: { label: 'סוג שאלות', type: 'select', options: ['שאלות כלליות', 'שאלות על שירותים', 'שאלות על מוצרים', 'שאלות על מחירים'], required: true },
        language: { label: 'שפה', type: 'select', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'], required: true }
      }
    },
    {
      id: 'qa_management',
      name: 'ניהול Q&A',
      description: 'ניהול חכם של שאלות ותשובות - מעקב ותגובות',
      min: 1,
      max: 30,
      details: 'ניהול מקצועי של Q&A',
      icon: '💬',
      category: 'Q&A',
      parameters: {
        quantity: { label: 'כמות שאלות לניהול', type: 'number', min: 1, max: 30, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        managementType: { label: 'סוג ניהול', type: 'select', options: ['מעקב בלבד', 'תגובות אוטומטיות', 'ניהול מלא', 'ניתוח ביצועים'], required: true },
        responseTime: { label: 'זמן תגובה', type: 'select', options: ['מיידי', 'תוך שעה', 'תוך יום', 'תוך שבוע'], required: true }
      }
    },
    {
      id: 'qa_automation',
      name: 'אוטומציה של Q&A',
      description: 'אוטומציה מתקדמת של שאלות ותשובות - חיסכון בזמן',
      min: 1,
      max: 15,
      details: 'אוטומציה חכמה של Q&A',
      icon: '🤖',
      category: 'Q&A',
      parameters: {
        quantity: { label: 'כמות שאלות לאוטומציה', type: 'number', min: 1, max: 15, required: true },
        targetUrl: { label: 'קישור לעסק', type: 'text', required: true },
        automationType: { label: 'סוג אוטומציה', type: 'select', options: ['תגובות בסיסיות', 'תגובות מתקדמות', 'אוטומציה מלאה', 'AI מתקדם'], required: true },
        language: { label: 'שפה', type: 'select', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'], required: true }
      }
    }
  ];

  const categories = [
    { id: 'ביקורות', name: 'ביקורות', icon: '⭐', color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' },
    { id: 'צפיות', name: 'צפיות', icon: '👁️', color: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    { id: 'מיקוד מקומי', name: 'מיקוד מקומי', icon: '📍', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
    { id: 'Q&A', name: 'Q&A', icon: '❓', color: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
    { id: 'מתקדמים', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #667eea, #764ba2)' }
  ];

  const filteredFeatures = selectedCategory === 'הכל' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const handleInputChange = (featureId: string, paramName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        [paramName]: value
      }
    }));
  };

  const handleExecuteFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    const data = formData[featureId];
    
    if (feature && data) {
      // כאן תהיה הלוגיקה לביצוע הפיצ'ר
      console.log(`Executing ${feature.name}:`, data);
      alert(`בוצע: ${feature.name} - ${JSON.stringify(data)}`);
    }
  };

  const handleAdvancedCampaign = () => {
    if (selectedFeatures.length === 0) {
      alert('אנא בחר לפחות פיצ\'ר אחד לקמפיין המתקדם');
      return;
    }
    
    console.log('Advanced Campaign:', selectedFeatures);
    alert(`קמפיין מתקדם עם ${selectedFeatures.length} פיצ'רים`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '30px',
          background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)',
          borderRadius: '20px',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>
            🏢 ניהול Google Business
          </h1>
          <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.9 }}>
            ניהול מתקדם של Google Business - דומיננטיות בגוגל
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '30px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory('הכל')}
            style={{
              background: selectedCategory === 'הכל' 
                ? 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)'
                : 'rgba(255,255,255,0.8)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '15px',
              padding: '12px 20px',
              color: selectedCategory === 'הכל' ? 'white' : '#333',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            הכל
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                background: selectedCategory === category.id 
                  ? category.color
                  : 'rgba(255,255,255,0.8)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '15px',
                padding: '12px 20px',
                color: selectedCategory === category.id ? 'white' : '#333',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Advanced Campaign Button */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setShowAdvancedCampaign(!showAdvancedCampaign)}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              border: 'none',
              borderRadius: '15px',
              padding: '15px 30px',
              color: 'white',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(255,107,107,0.4)'
            }}
          >
            🚀 קמפיין מתקדם
          </button>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '25px'
        }}>
          {filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '25px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Feature Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)',
                  borderRadius: '15px',
                  padding: '10px',
                  color: 'white'
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    margin: '0 0 5px 0',
                    color: '#333'
                  }}>
                    {feature.name}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    color: '#666'
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Feature Details */}
              <div style={{
                background: 'rgba(66, 133, 244, 0.1)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '20px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  margin: 0,
                  color: '#4285f4',
                  fontWeight: '500'
                }}>
                  {feature.details}
                </p>
              </div>

              {/* Parameters Form */}
              <div style={{ marginBottom: '20px' }}>
                {Object.entries(feature.parameters).map(([paramName, paramConfig]: [string, any]) => (
                  <div key={paramName} style={{ marginBottom: '15px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      marginBottom: '5px',
                      color: '#333'
                    }}>
                      {paramConfig.label} {paramConfig.required && '*'}
                    </label>
                    
                    {paramConfig.type === 'number' ? (
                      <input
                        type="number"
                        min={paramConfig.min}
                        max={paramConfig.max}
                        value={formData[feature.id]?.[paramName] || paramConfig.min}
                        onChange={(e) => handleInputChange(feature.id, paramName, parseInt(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    ) : paramConfig.type === 'select' ? (
                      <select
                        value={formData[feature.id]?.[paramName] || ''}
                        onChange={(e) => handleInputChange(feature.id, paramName, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">בחר אפשרות</option>
                        {paramConfig.options.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData[feature.id]?.[paramName] || ''}
                        onChange={(e) => handleInputChange(feature.id, paramName, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        placeholder={`הכנס ${paramConfig.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Execute Button */}
              <button
                onClick={() => handleExecuteFeature(feature.id)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #4285f4, #34a853)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(66, 133, 244, 0.4)'
                }}
              >
                ⚡ ביצוע
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleBusinessManagement;
