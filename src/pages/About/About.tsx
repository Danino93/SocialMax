import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('story');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'story', label: 'הסיפור שלנו', icon: '📖' },
    { id: 'mission', label: 'המשימה שלנו', icon: '🎯' },
    { id: 'values', label: 'הערכים שלנו', icon: '💎' },
    { id: 'timeline', label: 'המסע שלנו', icon: '🚀' },
    { id: 'team', label: 'הצוות', icon: '👥' }
  ];

  const values = [
    {
      icon: '🚀',
      title: 'חדשנות',
      description: 'אנחנו תמיד מחפשים דרכים חדשות ומתקדמות לקדם את הלקוחות שלנו',
      color: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      icon: '🤝',
      title: 'אמינות',
      description: 'מחויבים לשקיפות מלאה, תוצאות אמיתיות ושירות מקצועי',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)'
    },
    {
      icon: '⚡',
      title: 'מהירות',
      description: 'תוצאות מהירות ואיכותיות עם זמינות 24/7 לכל הלקוחות',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    },
    {
      icon: '🎯',
      title: 'דיוק',
      description: 'כל קמפיין מותאם אישית למטרות הספציפיות של כל לקוח',
      color: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    },
    {
      icon: '💡',
      title: 'יצירתיות',
      description: 'פתרונות יצירתיים וייחודיים שמבדלים את הלקוחות מהמתחרים',
      color: 'linear-gradient(135deg, #fa709a, #fee140)'
    },
    {
      icon: '🌍',
      title: 'גלובליות',
      description: 'שירותים בכל רחבי העולם עם הבנה של תרבויות שונות',
      color: 'linear-gradient(135deg, #a8edea, #fed6e3)'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'ההתחלה',
      description: 'SocialMax נוסדה על ידי דני כהן עם חזון להפוך את השיווק הדיגיטלי לנגיש לכולם',
      icon: '🌱',
      color: '#667eea'
    },
    {
      year: '2021',
      title: 'הרחבת הצוות',
      description: 'הצטרפו שרה לוי ומיכל אברהם, והתחלנו לפתח פלטפורמות מתקדמות',
      icon: '👥',
      color: '#764ba2'
    },
    {
      year: '2022',
      title: 'פריצת דרך',
      description: 'השגנו 1,000 לקוחות ראשונים והתחלנו לספק שירותים ל-5 פלטפורמות',
      icon: '📈',
      color: '#f093fb'
    },
    {
      year: '2023',
      title: 'התרחבות',
      description: 'הוספנו 3 פלטפורמות נוספות והגענו ל-5,000 לקוחות פעילים',
      icon: '🌍',
      color: '#4facfe'
    },
    {
      year: '2024',
      title: 'העתיד',
      description: 'ממשיכים לחדש עם AI, אוטומציה מתקדמת ושירותים גלובליים',
      icon: '🚀',
      color: '#43e97b'
    }
  ];

  const teamMembers = [
    {
      name: 'דני כהן',
      role: 'מנכ"ל ומייסד',
      image: '👨‍💼',
      bio: 'מומחה לשיווק דיגיטלי עם 10+ שנות ניסיון. הקים את SocialMax מתוך אמונה שכל עסק יכול להצליח ברשתות החברתיות.',
      experience: '10+ שנים',
      specialties: ['אסטרטגיה', 'ניהול', 'פיתוח עסקי'],
      quote: '"הצלחה ברשתות חברתיות היא לא רק מספרים - זה קשר אמיתי עם הקהל"'
    },
    {
      name: 'שרה לוי',
      role: 'מנהלת טכנולוגיה',
      image: '👩‍💻',
      bio: 'מפתחת מובילה עם התמחות בפלטפורמות חברתיות ואוטומציה. אחראית על כל הטכנולוגיה המתקדמת שלנו.',
      experience: '8+ שנים',
      specialties: ['פיתוח', 'אוטומציה', 'AI'],
      quote: '"טכנולוגיה טובה היא זו שלא מרגישים בה - היא פשוט עובדת"'
    },
    {
      name: 'מיכל אברהם',
      role: 'מנהלת שיווק',
      image: '👩‍🎨',
      bio: 'מומחית תוכן ויצירתיות עם ניסיון ב-5 פלטפורמות. יוצרת קמפיינים שמדברים ישירות ללב הקהל.',
      experience: '6+ שנים',
      specialties: ['תוכן', 'יצירתיות', 'קמפיינים'],
      quote: '"כל פוסט הוא הזדמנות לספר סיפור שמחבר אנשים"'
    },
    {
      name: 'יוסי מזרחי',
      role: 'מנהל תמיכה',
      image: '👨‍🔧',
      bio: 'מומחה תמיכה טכנית עם זמינות 24/7. עוזר ללקוחות להצליח בכל שלב של המסע הדיגיטלי.',
      experience: '7+ שנים',
      specialties: ['תמיכה', 'פתרון בעיות', 'הדרכה'],
      quote: '"הצלחת הלקוח היא ההצלחה שלנו"'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'לקוחות מרוצים', icon: '😊', color: '#667eea' },
    { number: '50M+', label: 'אינטראקציות', icon: '📈', color: '#764ba2' },
    { number: '99.9%', label: 'זמינות שירות', icon: '⚡', color: '#f093fb' },
    { number: '24/7', label: 'תמיכה טכנית', icon: '🛠️', color: '#4facfe' },
    { number: '9', label: 'פלטפורמות', icon: '🌐', color: '#43e97b' },
    { number: '150+', label: 'מדינות', icon: '🌍', color: '#fa709a' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0c0c0c 100%)',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Header onMenuClick={() => {}} />

      {/* Dynamic Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(240, 147, 251, 0.05) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      {/* Floating Elements */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 80 + 20,
            height: Math.random() * 80 + 20,
            background: `rgba(255, 255, 255, ${Math.random() * 0.08 + 0.02})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 25 + 10}s infinite linear`,
            zIndex: 2
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '100px 20px 20px'
      }}>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ← חזרה לדף הבית
        </button>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 20px 0',
            textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }}>
            מי אנחנו? 🤔
          </h1>
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            SocialMax היא יותר מסתם פלטפורמה לשיווק דיגיטלי - 
            אנחנו השותפים שלכם להצלחה ברשתות החברתיות! 🌟
          </p>
          
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '25px',
            marginTop: '60px'
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '25px 15px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '5px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                background: activeSection === section.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                color: 'white',
                padding: '12px 25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'story' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '25px',
            padding: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            animation: 'slideInUp 0.6s ease'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 40px 0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              הסיפור שלנו 📖
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#667eea',
                  marginBottom: '20px'
                }}>
                  איך הכל התחיל? 🌱
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.8',
                  marginBottom: '20px'
                }}>
                  בשנת 2020, דני כהן, מומחה לשיווק דיגיטלי עם 10+ שנות ניסיון, 
                  הבחין בבעיה: עסקים קטנים ובינוניים לא יכלו להרשות לעצמם שירותי 
                  שיווק דיגיטלי מקצועיים.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.8',
                  marginBottom: '20px'
                }}>
                  מתוך אמונה שכל עסק יכול להצליח ברשתות החברתיות, הוא הקים את 
                  SocialMax - פלטפורמה שתהפוך את השיווק הדיגיטלי לנגיש, יעיל וחכם.
                </p>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginTop: '20px'
                }}>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#667eea',
                    fontWeight: '600',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    "החזון שלנו הוא להפוך כל עסק למותג דיגיטלי מצליח, 
                    ללא קשר לגודל או לתקציב שלו" - דני כהן, מייסד
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  החזון שלנו
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6'
                }}>
                  להיות הפלטפורמה המובילה בעולם לשירותי רשתות חברתיות, 
                  שמאפשרת לכל עסק להצליח בעידן הדיגיטלי
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'mission' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '25px',
            padding: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            animation: 'slideInUp 0.6s ease'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 40px 0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              המשימה שלנו 🎯
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  המשימה
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6'
                }}>
                  לספק שירותי שיווק דיגיטלי מתקדמים, איכותיים ונגישים 
                  לכל סוגי העסקים, תוך שימוש בטכנולוגיה החדישה ביותר
                </p>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(240, 147, 251, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌟</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  המטרה
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6'
                }}>
                  לעזור לעסקים לבנות נוכחות דיגיטלית חזקה, להגיע לקהל היעד 
                  שלהם ולהגביר את המכירות באמצעות רשתות חברתיות
                </p>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(79, 172, 254, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💡</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '15px'
                }}>
                  הגישה
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6'
                }}>
                  שילוב של טכנולוגיה מתקדמת, יצירתיות וניסיון מקצועי 
                  כדי ליצור פתרונות מותאמים אישית לכל לקוח
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'values' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            animation: 'slideInUp 0.6s ease'
          }}>
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '25px',
                  padding: '40px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Background Gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: value.color,
                  opacity: 0.1,
                  zIndex: 1
                }} />
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '20px',
                    animation: 'pulse 2s infinite'
                  }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: '0 0 15px 0'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'timeline' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '25px',
            padding: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            animation: 'slideInUp 0.6s ease'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 50px 0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              המסע שלנו 🚀
            </h2>
            
            <div style={{
              position: 'relative',
              paddingRight: '50px'
            }}>
              {/* Timeline Line */}
              <div style={{
                position: 'absolute',
                right: '20px',
                top: '0',
                bottom: '0',
                width: '3px',
                background: 'linear-gradient(180deg, #667eea, #764ba2, #f093fb, #4facfe, #43e97b)',
                borderRadius: '2px'
              }} />
              
              {timeline.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    marginBottom: '40px',
                    paddingRight: '80px',
                    animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                  }}
                >
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    right: '8px',
                    top: '20px',
                    width: '25px',
                    height: '25px',
                    background: item.color,
                    borderRadius: '50%',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    zIndex: 2,
                    animation: 'pulse 2s infinite'
                  }} />
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    padding: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateX(-10px)';
                    e.currentTarget.style.boxShadow = `0 15px 30px ${item.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                      <div>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: item.color,
                          marginBottom: '5px'
                        }}>
                          {item.year}
                        </div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          color: 'white',
                          margin: 0
                        }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'team' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            animation: 'slideInUp 0.6s ease'
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '25px',
                  padding: '40px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  {member.image}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 10px 0'
                }}>
                  {member.name}
                </h3>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#667eea',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {member.role}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '15px'
                }}>
                  {member.experience} ניסיון
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: '0 0 20px 0'
                }}>
                  {member.bio}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        fontSize: '0.9rem',
                        color: '#667eea',
                        fontWeight: '500'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '15px',
                  padding: '15px',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5'
                }}>
                  "{member.quote}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default About;
