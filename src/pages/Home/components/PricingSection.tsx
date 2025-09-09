import React, { useState, useEffect } from 'react';

const PricingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: 'בסיסי',
      subtitle: 'מושלם להתחלה',
      price: 'חינם',
      originalPrice: null,
      period: '',
      description: 'התחל את המסע שלך עם הכלים הבסיסיים',
      features: [
        '10 ₪ בונוס הרשמה',
        'גישה לכל השירותים',
        'תמיכה 24/7',
        'דשבורד מתקדם',
        'עד 5 הזמנות בחודש',
        'דוחות בסיסיים'
      ],
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      popular: false,
      cta: 'התחל עכשיו',
      icon: '🚀'
    },
    {
      name: 'מקצועי',
      subtitle: 'לעסקים קטנים',
      price: '99',
      originalPrice: '149',
      period: '/חודש',
      description: 'הכל שאתה צריך כדי לגדול',
      features: [
        'הכל מהתוכנית הבסיסית',
        'עד 50 הזמנות בחודש',
        'דוחות מתקדמים',
        'תמיכה עדיפות',
        'אינטגרציות מתקדמות',
        'ניתוח AI בסיסי',
        'הדרכה אישית'
      ],
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      popular: true,
      cta: 'התחל חינם',
      icon: '💼'
    },
    {
      name: 'עסקי',
      subtitle: 'לחברות גדולות',
      price: '299',
      originalPrice: '399',
      period: '/חודש',
      description: 'פתרון מלא לעסקים גדולים',
      features: [
        'הכל מהתוכנית המקצועית',
        'הזמנות ללא הגבלה',
        'דוחות מותאמים אישית',
        'מנהל חשבון אישי',
        'ניתוח AI מתקדם',
        'אינטגרציות מותאמות',
        'תמיכה טלפונית',
        'הדרכה קבוצתית'
      ],
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      popular: false,
      cta: 'צור קשר',
      icon: '🏢'
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

    const element = document.getElementById('pricing-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="pricing-section"
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'rotate 15s linear infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '60px',
        height: '60px',
        background: 'rgba(255,215,0,0.2)',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '100px',
        height: '100px',
        background: 'rgba(0,255,255,0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'float 8s ease-in-out infinite'
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
              תוכניות גמישות לכל סוג של עסק
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
              תוכניות גמישות לכל סוג של עסק
            </div>
          </div>
          
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: '500'
          }}>
            מהסטארטאפ הקטן ועד הארגון הגדול - יש לנו פתרון מושלם עבורך
          </p>
        </div>

        {/* Revolutionary Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          perspective: '1000px'
        }}>
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '50px 30px',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isVisible 
                  ? `translateY(0) rotateX(0deg) scale(1)` 
                  : `translateY(50px) rotateX(10deg) scale(0.95)`,
                opacity: isVisible ? 1 : 0,
                animationDelay: `${index * 0.2}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                setHoveredPlan(index);
                e.currentTarget.style.transform = 'translateY(-20px) rotateX(-5deg) scale(1.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                setHoveredPlan(null);
                e.currentTarget.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  color: '#333',
                  padding: '10px 30px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 25px rgba(255,215,0,0.4)',
                  zIndex: 10
                }}>
                  הכי פופולרי ⭐
                </div>
              )}

              {/* Animated Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: plan.color,
                opacity: hoveredPlan === index ? 0.1 : 0.05,
                transition: 'opacity 0.3s ease'
              }}></div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Plan Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: plan.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
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
                    transform: hoveredPlan === index ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  }}></div>
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {plan.icon}
                  </span>
                </div>

                {/* Plan Name */}
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: 'white',
                  textAlign: 'center',
                  margin: '0 0 10px 0',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  {plan.name}
                </h3>

                {/* Plan Subtitle */}
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  margin: '0 0 20px 0',
                  fontWeight: '500'
                }}>
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px'
                }}>
                  {plan.originalPrice && (
                    <div style={{
                      fontSize: '1.2rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'line-through',
                      marginBottom: '5px'
                    }}>
                      ₪{plan.originalPrice}{plan.period}
                    </div>
                  )}
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    background: plan.color,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                    lineHeight: 1
                  }}>
                    {plan.price === 'חינם' ? 'חינם' : `₪${plan.price}`}
                    {plan.period && <span style={{ fontSize: '1.5rem' }}>{plan.period}</span>}
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  margin: '0 0 30px 0',
                  lineHeight: 1.6
                }}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 40px 0'
                }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.9)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{
                        color: '#4ade80',
                        marginLeft: '10px',
                        fontSize: '1.2rem',
                        filter: 'drop-shadow(0 0 5px #4ade80)'
                      }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '18px 30px',
                    background: plan.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {plan.cta}
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
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                opacity: hoveredPlan === index ? 1 : 0,
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
              💎 התחל את המסע שלך עכשיו - ללא התחייבות!
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

export default PricingSection;