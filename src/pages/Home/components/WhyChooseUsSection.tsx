import React, { useState, useEffect } from 'react';

const WhyChooseUsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const advantages = [
    {
      icon: '📱',
      title: 'שירותי טלגרם מתקדמים',
      description: 'הפלטפורמה הכי מתקדמת לטלגרם בישראל - בוטים חכמים, אוטומציה מלאה וניהול קבוצות',
      features: ['בוטים חכמים', 'אוטומציה מלאה', 'ניהול קבוצות עד 200K', 'מיקוד גיאוגרפי', 'הודעות מתוזמנות'],
      color: 'linear-gradient(135deg, #0088cc, #00a8ff)',
      stats: '18,500+ הזמנות'
    },
    {
      icon: '💬',
      title: 'WhatsApp Business Pro',
      description: 'שיווק מסיבי עם WhatsApp Business API - הפתרון הכי מתקדם ל-WhatsApp בישראל',
      features: ['שיווק מסיבי', 'בוט שירות לקוחות', 'קטלוג מוצרים', 'הודעות בתפזורת', 'מיקוד שכונתי'],
      color: 'linear-gradient(135deg, #25d366, #128c7e)',
      stats: '22,100+ הזמנות'
    },
    {
      icon: '🤖',
      title: 'AI Campaign Manager',
      description: 'מנוע AI מתקדם שמנתח טרנדים ישראליים, מנבא ביצועים וממקסם קמפיינים אוטומטית',
      features: ['ניתוח טרנדים בזמן אמת', 'חיזוי טרנדים ישראליים', 'אופטימיזציה אוטומטית', 'הצעות אסטרטגיות', 'זיהוי הזדמנויות'],
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      stats: '99.9% דיוק'
    },
    {
      icon: '⚡',
      title: 'מהירות שיא',
      description: 'הפלטפורמה הכי מהירה בשוק - הזמנות מתבצעות תוך שניות, לא שעות',
      features: ['הזמנה תוך 30 שניות', 'ביצוע מיידי', 'דוחות בזמן אמת', 'אוטומציה מלאה', 'תמיכה 24/7'],
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      stats: '30 שניות'
    },
    {
      icon: '🛡️',
      title: 'אבטחה מקסימלית',
      description: 'הגנה מתקדמת על החשבונות שלך עם טכנולוגיית הצפנה צבאית והגנה מפני חסימות',
      features: ['הצפנה צבאית', 'VPN מובנה', 'הגנה מפני באנים', 'זיהוי בוטים מתחרים', 'בקאפ אוטומטי'],
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      stats: '100% בטוח'
    },
    {
      icon: '🎯',
      title: 'תוצאות מובטחות',
      description: 'אנו מבטיחים תוצאות או החזר כספי מלא - אין סיכון, רק רווח',
      features: ['הבטחת תוצאות', 'החזר כספי מלא', 'תמיכה 24/7', 'מעקב ביצועים', 'דוחות מפורטים'],
      color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      stats: '100% החזר'
    },
    {
      icon: '🇮🇱',
      title: 'התמחות ישראלית',
      description: 'התמחות מיוחדת בשוק הישראלי - עברית, ערבית, חגים יהודיים ותרבות מקומית',
      features: ['תמיכה בעברית וערבית', 'חגים יהודיים', 'תרבות ישראלית', 'תשלומים מקומיים', 'מיקוד גיאוגרפי'],
      color: 'linear-gradient(135deg, #fa709a, #fee140)',
      stats: '100% ישראלי'
    },
    {
      icon: '💎',
      title: 'איכות פרמיום',
      description: 'רק שירותים איכותיים עם ספקים מוסמכים ובדיקת איכות מתמדת',
      features: ['ספקים מוסמכים בלבד', 'בדיקת איכות 24/7', 'תמיכה VIP', 'מעקב איכות', 'סטנדרטים גבוהים'],
      color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      stats: '100% איכות'
    },
    {
      icon: '🎮',
      title: 'גיימינג & מוזיקה',
      description: 'קידום מוזיקה, פודקאסטים, קהילות גיימינג ואספורט - הפלטפורמה הכי מתקדמת',
      features: ['קידום מוזיקה', 'פודקאסטים עברית', 'קהילות גיימינג', 'אספורט ישראלי', 'שרתים מובוסטים'],
      color: 'linear-gradient(135deg, #1db954, #7289da)',
      stats: '5,600+ הזמנות'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('why-choose-us-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="why-choose-us-section"
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Revolutionary Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)
        `,
        animation: 'float 25s ease-in-out infinite'
      }}></div>

      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'rotate 20s linear infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,215,0,0.2)',
        borderRadius: '50%',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '120px',
        height: '120px',
        background: 'rgba(0,255,255,0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Revolutionary Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            position: 'relative',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              color: 'white',
              margin: 0,
              textShadow: '0 0 30px rgba(255,255,255,0.5)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              למה SocialMax היא הבחירה הנכונה?
            </h2>
            
            {/* Glowing Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, #fff, #f0f0f0, #fff, #e0e0e0)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(15px)',
              opacity: 0.6,
              animation: 'shimmer 3s ease-in-out infinite'
            }}>
              למה לבחור ב-SocialMax?
            </div>
          </div>
          
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: '500'
          }}>
            הפלטפורמה הכי מתקדמת בישראל עם שירותי טלגרם, WhatsApp Business, AI מתקדם והתמחות מקומית ייחודית
          </p>
        </div>

        {/* Revolutionary Advantages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          perspective: '1000px'
        }}>
          {advantages.map((advantage, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '40px 30px',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isVisible 
                  ? `translateY(0) rotateX(0deg) scale(1)` 
                  : `translateY(50px) rotateX(10deg) scale(0.95)`,
                opacity: isVisible ? 1 : 0,
                animationDelay: `${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                setHoveredCard(index);
                e.currentTarget.style.transform = 'translateY(-15px) rotateX(-5deg) scale(1.03)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                setHoveredCard(null);
                e.currentTarget.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Animated Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: advantage.color,
                opacity: hoveredCard === index ? 0.1 : 0.05,
                transition: 'opacity 0.3s ease'
              }}></div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Icon and Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: advantage.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transform: hoveredCard === index ? 'translateX(100%)' : 'translateX(-100%)',
                      transition: 'transform 0.6s ease'
                    }}></div>
                    <span style={{ position: 'relative', zIndex: 2 }}>
                      {advantage.icon}
                    </span>
                  </div>

                  {/* Stats Badge */}
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}>
                    {advantage.stats}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 15px 0',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  {advantage.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6,
                  margin: '0 0 25px 0'
                }}>
                  {advantage.description}
                </p>

                {/* Features List */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {advantage.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        fontSize: '0.95rem',
                        color: 'rgba(255,255,255,0.8)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{
                        color: '#4ade80',
                        marginLeft: '8px',
                        fontSize: '1rem',
                        filter: 'drop-shadow(0 0 5px #4ade80)'
                      }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Glow Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                opacity: hoveredCard === index ? 1 : 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>
            </div>
          ))}
        </div>

        {/* Revolutionary Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '25px 50px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '50px',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ position: 'relative', zIndex: 2 }}>
              🚀 הצטרף לאלפי המשתמשים המרוצים - התחל עכשיו!
            </span>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s ease'
            }}></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.3); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
