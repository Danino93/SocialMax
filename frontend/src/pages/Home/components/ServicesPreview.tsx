import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServicesPreview: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      name: 'שירותי טלגרם מתקדמים',
      description: 'ניהול קבוצות, בוטים חכמים, אוטומציה מלאה - הפלטפורמה הכי מתקדמת לטלגרם בישראל',
      price: '₪1.50',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #0088cc 0%, #00a8ff 100%)',
      stats: { orders: '18,500+', rating: '4.9' },
      keywords: ['בוטים חכמים', 'אוטומציה מלאה', 'ניהול קבוצות', 'שיווק טלגרם', 'הודעות מתוזמנות', 'מיקוד גיאוגרפי'],
      link: '/services/telegram'
    },
    {
      name: 'WhatsApp Business Pro',
      description: 'שיווק מסיבי, בוט שירות לקוחות, קטלוג מוצרים - הפתרון הכי מתקדם ל-WhatsApp',
      price: '₪2.20',
      icon: '💬',
      gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
      stats: { orders: '22,100+', rating: '4.9' },
      keywords: ['שיווק מסיבי', 'בוט שירות לקוחות', 'קטלוג מוצרים', 'הודעות בתפזורת', 'אוטומציה עסקית', 'מיקוד שכונתי'],
      link: '/services/whatsapp'
    },
    {
      name: 'עוקבים Instagram Premium',
      description: 'עוקבים אמיתיים ואיכותיים עם AI מתקדם - הגדל את הנוכחות הדיגיטלית שלך',
      price: '₪2.50',
      icon: '📷',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: { orders: '12,500+', rating: '4.9' },
      keywords: ['AI מתקדם', 'נוכחות דיגיטלית', 'אינגייג\'מנט גבוה', 'אלגוריתם חכם', 'רילס ויראליים', 'סטוריז ממוקדים'],
      link: '/services/instagram'
    },
    {
      name: 'צפיות TikTok Pro',
      description: 'צפיות ויראליות עם ניתוח טרנדים - הפוך לוויראלי ב-TikTok עם AI',
      price: '₪0.80',
      icon: '🎵',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      stats: { orders: '15,200+', rating: '4.9' },
      keywords: ['צפיות ויראליות', 'ניתוח טרנדים', 'תוכן ויראלי', 'אלגוריתם TikTok', 'TikTok Shop', 'challenges ויראליים'],
      link: '/services/tiktok'
    },
    {
      name: 'לייקים Facebook VIP',
      description: 'לייקים איכותיים עם ניתוח טרנדים - שפר את הרלוונטיות של העמוד שלך',
      price: '₪1.20',
      icon: '📘',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: { orders: '8,900+', rating: '4.8' },
      keywords: ['ניתוח טרנדים', 'רלוונטיות גבוהה', 'ביצועים משופרים', 'אלגוריתם Facebook', 'ניהול אירועים', 'קבוצות קהילה'],
      link: '/services/facebook'
    },
    {
      name: 'עוקבים YouTube Elite',
      description: 'מנויים פעילים עם אנליטיקס מתקדם - בנה קהילה נאמנה ומונטיזציה',
      price: '₪3.00',
      icon: '📺',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      stats: { orders: '6,800+', rating: '4.7' },
      keywords: ['מנויים פעילים', 'אנליטיקס מתקדם', 'קהילה נאמנה', 'מונטיזציה', 'thumbnails מותאמים', 'SEO tags'],
      link: '/services/youtube'
    },
    {
      name: 'Google Business Pro',
      description: 'ביקורות 5 כוכבים, צפיות בתמונות, מיקוד מקומי - דומיננטיות בגוגל',
      price: '₪1.80',
      icon: '🏢',
      gradient: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
      stats: { orders: '7,400+', rating: '4.8' },
      keywords: ['ביקורות 5 כוכבים', 'מיקוד מקומי', 'דומיננטיות גוגל', 'Q&A optimization', 'מיקוד רמת רחוב', 'ביקורות בעברית'],
      link: '/services/google-business'
    },
    {
      name: 'ריטוויטים Twitter Boost',
      description: 'ריטוויטים איכותיים עם השפעה דיגיטלית - הגבר את הנוכחות בטוויטר',
      price: '₪1.80',
      icon: '🐦',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      stats: { orders: '9,300+', rating: '4.8' },
      keywords: ['השפעה דיגיטלית', 'נוכחות טוויטר', 'אינגייג\'מנט גבוה', 'טרנדים ויראליים', 'מעקב שיח ציבורי', 'משפיעים טכנולוגיה'],
      link: '/services/twitter'
    },
    {
      name: 'Spotify & Discord Elite',
      description: 'קידום מוזיקה, פודקאסטים, קהילות גיימינג - הפלטפורמה הכי מתקדמת',
      price: '₪2.10',
      icon: '🎮',
      gradient: 'linear-gradient(135deg, #1db954 0%, #7289da 100%)',
      stats: { orders: '5,600+', rating: '4.7' },
      keywords: ['קידום מוזיקה', 'פודקאסטים עברית', 'קהילות גיימינג', 'אספורט ישראלי', 'plays איכותיים', 'שרתים מובוסטים'],
      link: '/services/discord'
    }
  ];

  return (
    <section style={{
      padding: '120px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
        `,
        animation: 'float 15s ease-in-out infinite'
      }}></div>

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px',
        animation: 'float 20s infinite linear'
      }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Revolutionary Section Header */}
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
              השירותים המתקדמים ביותר בישראל
            </h2>
          </div>
          
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: '500'
          }}>
            טלגרם, WhatsApp Business, Instagram, TikTok, Facebook, YouTube, Google Business, Twitter, Spotify, Discord - הכל במקום אחד!
          </p>
        </div>

        {/* Revolutionary Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '40px 30px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
                opacity: isLoaded ? 1 : 0,
                transitionDelay: `${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                setHoveredService(index);
                e.currentTarget.style.transform = 'translateY(-20px) scale(1.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                setHoveredService(null);
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                if (service.link) {
                  window.location.href = service.link;
                }
              }}
            >
              {/* Animated Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: service.gradient,
                opacity: hoveredService === index ? 0.1 : 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Revolutionary Icon */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: service.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  fontSize: '3rem',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredService === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transform: hoveredService === index ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  }}></div>
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {service.icon}
                  </span>
                </div>
                
                {/* Service Info */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '15px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  {service.name}
                </h3>
                
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '20px',
                  lineHeight: 1.6,
                  fontSize: '1.1rem'
                }}>
                  {service.description}
                </p>

                {/* Keywords Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '25px',
                  justifyContent: 'center'
                }}>
                  {service.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '15px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,0.9)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '25px',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  <span>📊 {service.stats.orders} הזמנות</span>
                  <span>⭐ {service.stats.rating} דירוג</span>
                </div>
                
                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <span style={{
                    fontSize: '2.2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {service.price}
                  </span>
                  <span style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    לכל 1000
                  </span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                opacity: hoveredService === index ? 1 : 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>
            </div>
          ))}
        </div>

        {/* Revolutionary CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(45deg, #fff, #f8f9fa)',
              color: '#667eea',
              border: 'none',
              padding: '20px 40px',
              borderRadius: '50px',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ position: 'relative', zIndex: 2 }}>
                🚀 צפה בכל השירותים
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transition: 'left 0.5s ease'
              }}></div>
            </button>
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.3); }
        }
        
        button:hover > div {
          left: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default ServicesPreview;