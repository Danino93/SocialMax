import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Instagram: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');

  const services = [
    // בניית קהילה
    {
      id: 'followers',
      name: 'עוקבים איכותיים',
      description: 'פרופילים אמיתיים מישראל/עולם - בניית קהילה איכותית',
      price: '₪0.05',
      min: 100,
      max: 100000,
      icon: '👥',
      category: 'בניית קהילה',
      features: ['פרופילים אמיתיים ופעילים', 'מיקוד גיאוגרפי (ישראל/עולם)', 'מסירה מהירה ומדורגת', 'אחריות למילוי חוזר']
    },
    {
      id: 'likes',
      name: 'לייקים לפוסטים',
      description: 'עד 100K לייקים לפוסט - הגדלת אינגייג\'מנט',
      price: '₪0.02',
      min: 50,
      max: 100000,
      icon: '❤️',
      category: 'בניית קהילה',
      features: ['לייקים אמיתיים מקהל רלוונטי', 'כל סוגי הריאקציות', 'מסירה מיידית', 'הגדלת חשיפה אורגנית']
    },
    {
      id: 'comments',
      name: 'תגובות מותאמות',
      description: 'תגובות בעברית/אנגלית/שפות נוספות - תוכן מותאם',
      price: '₪0.08',
      min: 10,
      max: 1000,
      icon: '💬',
      category: 'בניית קהילה',
      features: ['תגובות בעברית ואנגלית', 'תוכן מותאם לפוסט', 'פרופילים אמיתיים', 'מסירה מדורגת']
    },
    {
      id: 'saves',
      name: 'שמירות לפוסטים',
      description: 'Saves for algorithm boost - שיפור אלגוריתם',
      price: '₪0.06',
      min: 20,
      max: 5000,
      icon: '🔖',
      category: 'בניית קהילה',
      features: ['שמירות אמיתיות', 'שיפור אלגוריתם', 'הגדלת חשיפה', 'מסירה מדורגת']
    },
    // סטוריז ורילס
    {
      id: 'story-views',
      name: 'צפיות בסטוריז',
      description: 'מיקוד פילוח קהל - צפיות אמיתיות בסטוריז',
      price: '₪0.03',
      min: 100,
      max: 10000,
      icon: '👁️',
      category: 'סטוריז ורילס',
      features: ['צפיות אמיתיות', 'מיקוד דמוגרפי', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'story-likes',
      name: 'לייקים לסטוריז',
      description: 'Hearts animation - אינטראקציה בסטוריז',
      price: '₪0.04',
      min: 50,
      max: 5000,
      icon: '💖',
      category: 'סטוריז ורילס',
      features: ['לייקים אמיתיים', 'אנימציית לבבות', 'מסירה מהירה', 'הגדלת אינטראקציה']
    },
    {
      id: 'reels-views',
      name: 'צפיות ברילס',
      description: 'אלגוריתם boost - צפיות איכותיות ברילס',
      price: '₪0.04',
      min: 100,
      max: 50000,
      icon: '🎬',
      category: 'סטוריז ורילס',
      features: ['צפיות איכותיות', 'זמן צפייה גבוה', 'מסירה מדורגת', 'הגדלת ויראליות']
    },
    {
      id: 'reels-likes',
      name: 'לייקים לרילס',
      description: 'הגדלת אינגייג\'מנט ברילס - אלגוריתם boost',
      price: '₪0.03',
      min: 100,
      max: 25000,
      icon: '❤️',
      category: 'סטוריז ורילס',
      features: ['לייקים אמיתיים', 'שיפור אלגוריתם', 'מסירה מהירה', 'הגדלת חשיפה']
    },
    // אוטומציה חכמה
    {
      id: 'follow-unfollow',
      name: 'מעקב/הפסקת מעקב אוטומטי',
      description: 'Follow/unfollow strategy - אסטרטגיה אוטומטית',
      price: '₪0.20',
      min: 50,
      max: 1000,
      icon: '🔄',
      category: 'אוטומציה חכמה',
      features: ['אסטרטגיה אוטומטית', 'מיקוד לפי תגיות', 'מעקב אחר ביצועים', 'התאמה לקהל']
    },
    {
      id: 'hashtag-automation',
      name: 'לייקים אוטומטיים לתגיות',
      description: '#hashtag automation - אוטומציה לתגיות',
      price: '₪0.15',
      min: 100,
      max: 2000,
      icon: '#️⃣',
      category: 'אוטומציה חכמה',
      features: ['אוטומציה לתגיות', 'מיקוד לפי תחום', 'מסירה מתוזמנת', 'מעקב אחר תוצאות']
    },
    {
      id: 'engagement-pods',
      name: 'תגובות מתוזמנות',
      description: 'Engagement pods - קבוצות אינגייג\'מנט',
      price: '₪0.25',
      min: 10,
      max: 100,
      icon: '👥',
      category: 'אוטומציה חכמה',
      features: ['קבוצות אינגייג\'מנט', 'תגובות מתוזמנות', 'שיפור אלגוריתם', 'קהילה פעילה']
    },
    {
      id: 'dm-automation',
      name: 'DM אוטומטיים',
      description: 'הודעות פרטיות למעקב חדש - אוטומציה',
      price: '₪0.15',
      min: 10,
      max: 500,
      icon: '📩',
      category: 'אוטומציה חכמה',
      features: ['הודעות מותאמות', 'שליחה מתוזמנת', 'תוכן בעברית', 'מעקב אחר תגובות']
    },
    // פיצ'רים מתקדמים
    {
      id: 'viral-tracking',
      name: 'מעקב אחר פוסטים ויראליים',
      description: 'מעקב אחר הפוסטים הויראליים בישראל',
      price: '₪0.30',
      min: 1,
      max: 50,
      icon: '📈',
      category: 'פיצ\'רים מתקדמים',
      features: ['מעקב ויראליות', 'ניתוח טרנדים', 'התראות בזמן אמת', 'הזדמנויות שיווק']
    },
    {
      id: 'influence-mapping',
      name: 'יצירת רשימות השפעה',
      description: 'מי עוקב אחרי מי - מיפוי השפעה',
      price: '₪0.40',
      min: 1,
      max: 20,
      icon: '🗺️',
      category: 'פיצ\'רים מתקדמים',
      features: ['מיפוי השפעה', 'ניתוח קשרים', 'זיהוי מנהיגי דעה', 'אסטרטגיות שיווק']
    },
    {
      id: 'viral-reels',
      name: 'יצירת רילס ויראליים',
      description: 'יצירת רילס ויראליים אוטומטית',
      price: '₪0.50',
      min: 1,
      max: 10,
      icon: '🎵',
      category: 'פיצ\'רים מתקדמים',
      features: ['יצירה אוטומטית', 'ניתוח טרנדים', 'מוזיקה פופולרית', 'אופטימיזציה לויראליות']
    },
    {
      id: 'music-analysis',
      name: 'ניתוח מוזיקה פופולרית',
      description: 'ניתוח מוזיקה פופולרית בישראל לרילס',
      price: '₪0.35',
      min: 1,
      max: 30,
      icon: '🎶',
      category: 'פיצ\'רים מתקדמים',
      features: ['ניתוח מוזיקה', 'טרנדים ישראליים', 'המלצות מותאמות', 'אופטימיזציה לרילס']
    },
    {
      id: 'influencer-detection',
      name: 'זיהוי אינפלואנסרים מתחילים',
      description: 'זיהוי אינפלואנסרים מתחילים בישראל',
      price: '₪0.45',
      min: 1,
      max: 25,
      icon: '⭐',
      category: 'פיצ\'רים מתקדמים',
      features: ['זיהוי אינפלואנסרים', 'ניתוח פוטנציאל', 'הזדמנויות שיתוף פעולה', 'מעקב אחר צמיחה']
    },
    {
      id: 'shopping-automation',
      name: 'אוטומציה של Instagram Shopping',
      description: 'אוטומציה של Instagram Shopping (עד שמטא תתקן)',
      price: '₪0.60',
      min: 1,
      max: 15,
      icon: '🛍️',
      category: 'פיצ\'רים מתקדמים',
      features: ['אוטומציה של Shopping', 'ניהול מוצרים', 'מעקב אחר מכירות', 'אופטימיזציה למכירות']
    }
  ];

  const categories = ['הכל', 'בניית קהילה', 'סטוריז ורילס', 'אוטומציה חכמה', 'פיצ\'רים מתקדמים'];
  
  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleOrder = (serviceId: string) => {
    // כאן תהיה לוגיקה להזמנה
    alert(`הזמנה לשירות: ${services.find(s => s.id === serviceId)?.name}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px'
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
            ← חזור לדשבורד
          </button>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            📸
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          Instagram Services
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: '0 0 20px 0'
        }}>
          שירותי Instagram המתקדמים ביותר בישראל
        </p>
        
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginTop: '20px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'rgba(255,255,255,0.3)' 
                  : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '25px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredServices.map((service) => (
          <div
            key={service.id}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            {/* Service Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}>
                {service.icon}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '5px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {service.name}
                  </h3>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    padding: '2px 8px',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {service.category}
                  </div>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Price */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                color: '#4ade80',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                {service.price}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                לכל {service.min} יחידות
              </div>
            </div>

            {/* Range */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                טווח הזמנה:
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem'
              }}>
                <span>מינימום: {service.min.toLocaleString()}</span>
                <span>מקסימום: {service.max.toLocaleString()}</span>
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                margin: '0 0 10px 0'
              }}>
                מה כלול:
              </h4>
              <div style={{
                display: 'grid',
                gap: '8px'
              }}>
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span style={{ color: '#4ade80', fontSize: '1rem' }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={() => handleOrder(service.id)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(240, 147, 251, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(240, 147, 251, 0.3)';
              }}
            >
              הזמן עכשיו
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.9rem',
          margin: 0
        }}>
          כל השירותים מובטחים עם החזר כספי מלא במקרה של בעיה
        </p>
      </div>
    </div>
  );
};

export default Instagram;
