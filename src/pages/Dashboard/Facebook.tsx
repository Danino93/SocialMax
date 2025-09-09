import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Facebook: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');

  const services = [
    // ניהול דפים עסקיים
    {
      id: 'page-likes',
      name: 'לייקים לדף עסקי',
      description: 'ממוקדי מיקום ותחומי עניין - לייקים איכותיים',
      price: '₪0.07',
      min: 50,
      max: 50000,
      icon: '👍',
      category: 'ניהול דפים עסקיים',
      features: ['לייקים ממוקדים', 'פרופילים פעילים', 'מסירה אורגנית', 'הגדלת רלוונטיות']
    },
    {
      id: 'followers',
      name: 'עוקבים איכותיים',
      description: 'פרופילים מלאים - עוקבים אמיתיים לדף הפייסבוק',
      price: '₪0.06',
      min: 50,
      max: 25000,
      icon: '👥',
      category: 'ניהול דפים עסקיים',
      features: ['עוקבים אמיתיים', 'פרופילים מלאים', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    {
      id: 'reviews',
      name: 'ביקורות חיוביות',
      description: '5 כוכבים מאומתים - ביקורות איכותיות',
      price: '₪0.15',
      min: 5,
      max: 100,
      icon: '⭐',
      category: 'ניהול דפים עסקיים',
      features: ['5 כוכבים מאומתים', 'ביקורות איכותיות', 'תוכן מותאם', 'נראה טבעי']
    },
    {
      id: 'check-ins',
      name: 'צ\'ק-אינים',
      description: 'הגדלת רלוונטיות מקומית - צ\'ק-אינים אוטומטיים',
      price: '₪0.12',
      min: 10,
      max: 500,
      icon: '📍',
      category: 'ניהול דפים עסקיים',
      features: ['צ\'ק-אינים אוטומטיים', 'מיקוד מקומי', 'הגדלת רלוונטיות', 'פרופילים אמיתיים']
    },
    {
      id: 'event-management',
      name: 'ניהול אירועים אוטומטי',
      description: 'ניהול אירועים אוטומטי - פיצ\'ר חדש',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '📅',
      category: 'ניהול דפים עסקיים',
      features: ['ניהול אוטומטי', 'יצירת אירועים', 'הזמנות אוטומטיות', 'מעקב אחר השתתפות']
    },
    {
      id: 'community-groups',
      name: 'יצירת קבוצות קהילה',
      description: 'יצירת קבוצות קהילה ממוקדות - פיצ\'ר חדש',
      price: '₪0.30',
      min: 1,
      max: 15,
      icon: '👥',
      category: 'ניהול דפים עסקיים',
      features: ['יצירת קבוצות', 'מיקוד קהילה', 'ניהול אוטומטי', 'הגדלת מעורבות']
    },
    // אינטראקציה בפוסטים
    {
      id: 'post-likes',
      name: 'לייקים לפוסטים',
      description: 'כל סוגי הריאקציות - לייקים איכותיים לפוסטים',
      price: '₪0.05',
      min: 50,
      max: 10000,
      icon: '❤️',
      category: 'אינטראקציה בפוסטים',
      features: ['כל סוגי הריאקציות', 'פרופילים אמיתיים', 'מיקוד לפי נושא', 'מסירה מהירה']
    },
    {
      id: 'advanced-comments',
      name: 'תגובות מתקדמות',
      description: 'טקסט מותאם + תמונות - תגובות איכותיות',
      price: '₪0.08',
      min: 10,
      max: 500,
      icon: '💬',
      category: 'אינטראקציה בפוסטים',
      features: ['טקסט מותאם', 'תמונות', 'תגובות איכותיות', 'נראה טבעי']
    },
    {
      id: 'shares',
      name: 'שיתופים אוטומטיים',
      description: 'אורגניים ומזויפים - שיתופים ממוקדי קהל',
      price: '₪0.06',
      min: 20,
      max: 1000,
      icon: '📤',
      category: 'אינטראקציה בפוסטים',
      features: ['שיתופים אורגניים', 'מיקוד דמוגרפי', 'תוכן מותאם', 'אלגוריתם boost']
    },
    {
      id: 'story-views',
      name: 'צפיות בסטוריז',
      description: '24h tracking - צפיות איכותיות בסטוריז',
      price: '₪0.04',
      min: 100,
      max: 10000,
      icon: '👁️',
      category: 'אינטראקציה בפוסטים',
      features: ['24h tracking', 'צפיות איכותיות', 'מיקוד דמוגרפי', 'מסירה מהירה']
    },
    {
      id: 'gif-sticker-reactions',
      name: 'תגובות מושכות עין',
      description: 'GIFs ומדבקות - תגובות מושכות עין',
      price: '₪0.10',
      min: 5,
      max: 200,
      icon: '🎭',
      category: 'אינטראקציה בפוסטים',
      features: ['GIFs ומדבקות', 'תגובות מושכות עין', 'תוכן ויזואלי', 'הגדלת מעורבות']
    },
    {
      id: 'demographic-shares',
      name: 'שיתופים ממוקדי קהל',
      description: 'לפי דמוגרפיה - שיתופים ממוקדי קהל',
      price: '₪0.12',
      min: 10,
      max: 300,
      icon: '📊',
      category: 'אינטראקציה בפוסטים',
      features: ['מיקוד דמוגרפי', 'שיתופים ממוקדים', 'הגדלת רלוונטיות', 'תוצאות מובטחות']
    },
    // כלים עסקיים
    {
      id: 'event-rsvp',
      name: 'הזמנות לאירועים',
      description: 'Auto RSVP - הזמנות אוטומטיות לאירועים',
      price: '₪0.15',
      min: 10,
      max: 500,
      icon: '📅',
      category: 'כלים עסקיים',
      features: ['Auto RSVP', 'הזמנות אוטומטיות', 'מיקוד לפי תחומי עניין', 'פרופילים אמיתיים']
    },
    {
      id: 'group-joins',
      name: 'הצטרפות לקבוצות',
      description: 'ניהול קהילות - הצטרפות אוטומטית לקבוצות',
      price: '₪0.20',
      min: 5,
      max: 100,
      icon: '👥',
      category: 'כלים עסקיים',
      features: ['הצטרפות אוטומטית', 'ניהול קהילות', 'מיקוד לפי נושא', 'פרופילים אמיתיים']
    },
    {
      id: 'messenger-automation',
      name: 'הודעות פרטיות בתפזורת',
      description: 'Messenger automation - הודעות אוטומטיות',
      price: '₪0.18',
      min: 10,
      max: 200,
      icon: '💬',
      category: 'כלים עסקיים',
      features: ['Messenger automation', 'הודעות אוטומטיות', 'מיקוד לפי קהל', 'תוכן מותאם']
    },
    {
      id: 'competitor-analysis',
      name: 'זיהוי משתמשים פוטנציאליים',
      description: 'בקבוצות תחרותיות - זיהוי משתמשים פוטנציאליים',
      price: '₪0.35',
      min: 1,
      max: 25,
      icon: '🔍',
      category: 'כלים עסקיים',
      features: ['זיהוי משתמשים', 'ניתוח תחרות', 'הזדמנויות שיווק', 'מעקב אחר פעילות']
    },
    {
      id: 'messenger-tracking',
      name: 'מעקב אחר שיחות במסנג\'ר',
      description: 'ותגובות אוטומטיות - מעקב אחר שיחות',
      price: '₪0.40',
      min: 1,
      max: 20,
      icon: '📞',
      category: 'כלים עסקיים',
      features: ['מעקב אחר שיחות', 'תגובות אוטומטיות', 'ניתוח שיחות', 'שיפור שירות לקוחות']
    }
  ];

  const categories = ['הכל', 'ניהול דפים עסקיים', 'אינטראקציה בפוסטים', 'כלים עסקיים'];
  
  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleOrder = (serviceId: string) => {
    alert(`הזמנה לשירות: ${services.find(s => s.id === serviceId)?.name}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            📘
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          Facebook Services
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: '0 0 20px 0'
        }}>
          שירותי Facebook המתקדמים ביותר בישראל
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
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
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
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(79, 172, 254, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(79, 172, 254, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 172, 254, 0.3)';
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

export default Facebook;
