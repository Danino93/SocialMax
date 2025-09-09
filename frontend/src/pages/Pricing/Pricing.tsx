import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      id: 'starter',
      name: 'חבילת התחלה',
      icon: '🌱',
      description: 'מושלם לעסקים קטנים שמתחילים את המסע הדיגיטלי',
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      features: [
        'ניהול 2 פלטפורמות',
        'עד 5,000 אינטראקציות חודשיות',
        'תמיכה טכנית 24/7',
        'דוחות שבועיים',
        'קמפיינים בסיסיים',
        'עדכונים יומיים'
      ],
      popular: false,
      cta: 'בואו נתחיל!',
      ctaIcon: '🚀'
    },
    {
      id: 'professional',
      name: 'חבילת מקצועית',
      icon: '💼',
      description: 'הפתרון המושלם לעסקים בינוניים שרוצים לגדול',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      features: [
        'ניהול 5 פלטפורמות',
        'עד 25,000 אינטראקציות חודשיות',
        'תמיכה עדיפות גבוהה',
        'דוחות יומיים מפורטים',
        'קמפיינים מתקדמים',
        'עדכונים בזמן אמת',
        'ניתוח מתחרים',
        'תוכן מותאם אישית'
      ],
      popular: true,
      cta: 'התחילו לגדול!',
      ctaIcon: '📈'
    },
    {
      id: 'enterprise',
      name: 'חבילת ארגונית',
      icon: '🏢',
      description: 'הפתרון המלא לחברות גדולות עם צרכים מורכבים',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      features: [
        'ניהול כל הפלטפורמות',
        'אינטראקציות ללא הגבלה',
        'מנהל חשבון אישי',
        'דוחות בזמן אמת',
        'קמפיינים מותאמים אישית',
        'עדכונים מיידיים',
        'ניתוח מתחרים מתקדם',
        'תוכן מקצועי בלעדי',
        'אוטומציה מתקדמת',
        'שילוב API מלא'
      ],
      popular: false,
      cta: 'בואו נדבר!',
      ctaIcon: '💬'
    }
  ];

  const platforms = [
    { name: 'Instagram', icon: '📷', color: '#E4405F' },
    { name: 'Facebook', icon: '📘', color: '#1877F2' },
    { name: 'TikTok', icon: '🎵', color: '#000000' },
    { name: 'YouTube', icon: '📺', color: '#FF0000' },
    { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
    { name: 'Discord', icon: '💬', color: '#5865F2' },
    { name: 'WhatsApp', icon: '📱', color: '#25D366' },
    { name: 'Google Business', icon: '🏢', color: '#4285F4' },
    { name: 'Telegram', icon: '✈️', color: '#0088CC' }
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'תוצאות מהירות',
      description: 'תחילת תוצאות תוך 24-48 שעות',
      color: '#667eea'
    },
    {
      icon: '🎯',
      title: 'דיוק מקסימלי',
      description: 'קמפיינים מותאמים אישית למטרות שלכם',
      color: '#764ba2'
    },
    {
      icon: '🛡️',
      title: 'בטיחות מלאה',
      description: 'שירותים מאובטחים עם אחריות מלאה',
      color: '#f093fb'
    },
    {
      icon: '📊',
      title: 'דוחות מפורטים',
      description: 'מעקב אחר כל אינטראקציה ותוצאה',
      color: '#4facfe'
    },
    {
      icon: '🤝',
      title: 'תמיכה 24/7',
      description: 'צוות מומחים זמין תמיד לעזרה',
      color: '#43e97b'
    },
    {
      icon: '🚀',
      title: 'חדשנות מתמדת',
      description: 'טכנולוגיה מתקדמת ועדכונים שוטפים',
      color: '#fa709a'
    }
  ];

  const testimonials = [
    {
      name: 'שרה כהן',
      company: 'בוטיק שרה',
      text: 'SocialMax שינתה את העסק שלי! תוך חודש ראיתי עלייה של 300% במכירות',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'דוד לוי',
      company: 'מסעדת דוד',
      text: 'השירות הכי מקצועי שפגשתי. תוצאות מדהימות ותמיכה מעולה',
      rating: 5,
      avatar: '👨‍🍳'
    },
    {
      name: 'מיכל אברהם',
      company: 'סטודיו מיכל',
      text: 'הקמפיינים שלהם מביאים לי לקוחות חדשים כל יום. מומלץ בחום!',
      rating: 5,
      avatar: '👩‍🎨'
    }
  ];

  const handleContactClick = (planName: string) => {
    // Navigate to contact page with plan info
    navigate('/contact', { 
      state: { 
        selectedPlan: planName,
        source: 'pricing' 
      } 
    });
  };

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
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 70 + 20,
            height: Math.random() * 70 + 20,
            background: `rgba(255, 255, 255, ${Math.random() * 0.06 + 0.02})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 30 + 10}s infinite linear`,
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
            בחרו את החבילה המושלמת! 💎
          </h1>
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            כל חבילה מותאמת אישית לצרכים שלכם. 
            בואו נדבר ונמצא את הפתרון המושלם עבורכם! 🎯
          </p>
          
          {/* CTA Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '20px',
            padding: '30px',
            margin: '40px auto',
            maxWidth: '600px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🎉</div>
            <h3 style={{
              fontSize: '1.5rem',
              color: 'white',
              margin: '0 0 10px 0'
            }}>
              הצעה מיוחדת!
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 20px 0'
            }}>
              צרו איתנו קשר עכשיו וקבלו ייעוץ חינם + הצעת מחיר מותאמת אישית!
            </p>
            <button
              onClick={() => handleContactClick('ייעוץ חינם')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
            >
              🎁 קבלו ייעוץ חינם
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '25px',
                padding: '40px 30px',
                border: plan.popular 
                  ? '2px solid #667eea' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                animation: `slideInUp 0.6s ease ${index * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden',
                transform: hoveredPlan === plan.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredPlan === plan.id 
                  ? '0 25px 50px rgba(102, 126, 234, 0.3)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
                }}>
                  ⭐ הכי פופולרי
                </div>
              )}

              {/* Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: plan.color,
                opacity: 0.1,
                zIndex: 1
              }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  {plan.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 15px 0'
                }}>
                  {plan.name}
                </h3>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: '0 0 30px 0'
                }}>
                  {plan.description}
                </p>

                {/* Features */}
                <div style={{
                  textAlign: 'right',
                  marginBottom: '30px'
                }}>
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '12px',
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      <span style={{ color: '#43e97b', fontSize: '1.2rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleContactClick(plan.name)}
                  style={{
                    background: plan.color,
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <span style={{ marginLeft: '10px' }}>{plan.ctaIcon}</span>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Platforms Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '25px',
          padding: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          marginBottom: '80px',
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
            כל הפלטפורמות במקום אחד! 🌐
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {platforms.map((platform, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.05}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = `0 10px 25px ${platform.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {platform.icon}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {platform.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{
          marginBottom: '80px'
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
            למה לבחור בנו? 🌟
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${benefit.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 15px 0'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '25px',
          padding: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          marginBottom: '80px',
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
            מה הלקוחות שלנו אומרים? 💬
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.2rem',
                      color: 'white',
                      margin: '0 0 5px 0'
                    }}>
                      {testimonial.name}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0
                    }}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '5px',
                  marginBottom: '15px'
                }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#FFD700', fontSize: '1.2rem' }}>⭐</span>
                  ))}
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '25px',
          padding: '50px',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          animation: 'slideInUp 0.6s ease'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 20px 0'
          }}>
            מוכנים להתחיל? 🚀
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 auto 30px',
            maxWidth: '600px'
          }}>
            בואו נדבר ונמצא את הפתרון המושלם עבורכם. 
            ייעוץ חינם ללא התחייבות!
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => handleContactClick('ייעוץ חינם')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '15px',
                color: 'white',
                padding: '18px 40px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }}
            >
              💬 צרו קשר עכשיו
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '15px',
                color: 'white',
                padding: '18px 40px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📞 התקשרו אלינו
            </button>
          </div>
        </div>
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

export default Pricing;
