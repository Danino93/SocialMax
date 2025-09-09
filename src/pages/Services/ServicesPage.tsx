import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'כל השירותים', icon: '🌟', color: '#667eea' },
    { id: 'growth', name: 'צמיחה מהירה', icon: '🚀', color: '#764ba2' },
    { id: 'engagement', name: 'אינטראקציה', icon: '💬', color: '#f093fb' },
    { id: 'visibility', name: 'חשיפה מקסימלית', icon: '👁️', color: '#4facfe' },
    { id: 'conversion', name: 'המרות גבוהות', icon: '💰', color: '#43e97b' }
  ];

  const services = [
    {
      id: 'instagram-followers',
      name: 'עוקבים איכותיים',
      platform: 'Instagram',
      icon: '📷',
      category: 'growth',
      description: 'עוקבים אמיתיים ואיכותיים שיהפכו את הפרופיל שלכם למוביל',
      features: ['עוקבים אמיתיים', 'אינטראקציה גבוהה', 'פרופילים פעילים', 'הגעה אורגנית'],
      color: 'linear-gradient(135deg, #E4405F, #C13584)',
      stats: { number: '1M+', label: 'עוקבים שנוספו' },
      cta: 'התחילו לצמוח!',
      keywords: ['עוקבים', 'איכותיים', 'אמיתיים', 'צמיחה', 'מוביל']
    },
    {
      id: 'instagram-likes',
      name: 'לייקים מתפוצצים',
      platform: 'Instagram',
      icon: '❤️',
      category: 'engagement',
      description: 'לייקים מהירים ואיכותיים שיהפכו כל פוסט לוויראלי',
      features: ['לייקים מהירים', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #E4405F, #F56040)',
      stats: { number: '50M+', label: 'לייקים שנוספו' },
      cta: 'הפכו לוויראליים!',
      keywords: ['לייקים', 'וויראלי', 'מהירים', 'אינטראקציה', 'תוצאות']
    },
    {
      id: 'facebook-followers',
      name: 'עוקבים מקצועיים',
      platform: 'Facebook',
      icon: '📘',
      category: 'growth',
      description: 'עוקבים מקצועיים ואיכותיים שיהפכו את העמוד שלכם למוביל',
      features: ['עוקבים מקצועיים', 'אינטראקציה גבוהה', 'פרופילים פעילים', 'הגעה אורגנית'],
      color: 'linear-gradient(135deg, #1877F2, #42A5F5)',
      stats: { number: '2M+', label: 'עוקבים שנוספו' },
      cta: 'התחילו לגדול!',
      keywords: ['עוקבים', 'מקצועיים', 'איכותיים', 'מוביל', 'צמיחה']
    },
    {
      id: 'tiktok-views',
      name: 'צפיות מתפוצצות',
      platform: 'TikTok',
      icon: '🎵',
      category: 'visibility',
      description: 'צפיות מהירות ואיכותיות שיהפכו כל וידאו לוויראלי',
      features: ['צפיות מהירות', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #000000, #FF0050)',
      stats: { number: '100M+', label: 'צפיות שנוספו' },
      cta: 'הפכו לוויראליים!',
      keywords: ['צפיות', 'וויראלי', 'מהירות', 'אינטראקציה', 'תוצאות']
    },
    {
      id: 'youtube-subscribers',
      name: 'מנויים איכותיים',
      platform: 'YouTube',
      icon: '📺',
      category: 'growth',
      description: 'מנויים אמיתיים ואיכותיים שיהפכו את הערוץ שלכם למוביל',
      features: ['מנויים אמיתיים', 'אינטראקציה גבוהה', 'פרופילים פעילים', 'הגעה אורגנית'],
      color: 'linear-gradient(135deg, #FF0000, #FF4444)',
      stats: { number: '5M+', label: 'מנויים שנוספו' },
      cta: 'התחילו לגדול!',
      keywords: ['מנויים', 'איכותיים', 'אמיתיים', 'מוביל', 'צמיחה']
    },
    {
      id: 'twitter-followers',
      name: 'עוקבים מקצועיים',
      platform: 'Twitter',
      icon: '🐦',
      category: 'growth',
      description: 'עוקבים מקצועיים ואיכותיים שיהפכו את הפרופיל שלכם למוביל',
      features: ['עוקבים מקצועיים', 'אינטראקציה גבוהה', 'פרופילים פעילים', 'הגעה אורגנית'],
      color: 'linear-gradient(135deg, #1DA1F2, #0D8BD9)',
      stats: { number: '3M+', label: 'עוקבים שנוספו' },
      cta: 'התחילו לגדול!',
      keywords: ['עוקבים', 'מקצועיים', 'איכותיים', 'מוביל', 'צמיחה']
    },
    {
      id: 'discord-members',
      name: 'חברים פעילים',
      platform: 'Discord',
      icon: '💬',
      category: 'engagement',
      description: 'חברים פעילים ואיכותיים שיהפכו את השרת שלכם למוביל',
      features: ['חברים פעילים', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #5865F2, #7289DA)',
      stats: { number: '500K+', label: 'חברים שנוספו' },
      cta: 'הפכו למובילים!',
      keywords: ['חברים', 'פעילים', 'איכותיים', 'מוביל', 'אינטראקציה']
    },
    {
      id: 'whatsapp-business',
      name: 'הודעות מתפוצצות',
      platform: 'WhatsApp Business',
      icon: '📱',
      category: 'conversion',
      description: 'הודעות מהירות ואיכותיות שיהפכו כל לקוח לרוכש',
      features: ['הודעות מהירות', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #25D366, #128C7E)',
      stats: { number: '1M+', label: 'הודעות שנשלחו' },
      cta: 'הפכו לרוכשים!',
      keywords: ['הודעות', 'מהירות', 'אינטראקציה', 'רוכשים', 'תוצאות']
    },
    {
      id: 'google-business',
      name: 'ביקורות מקצועיות',
      platform: 'Google Business',
      icon: '🏢',
      category: 'conversion',
      description: 'ביקורות איכותיות ומקצועיות שיהפכו כל לקוח לרוכש',
      features: ['ביקורות איכותיות', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #4285F4, #34A853)',
      stats: { number: '100K+', label: 'ביקורות שנוספו' },
      cta: 'הפכו לרוכשים!',
      keywords: ['ביקורות', 'איכותיות', 'מקצועיות', 'רוכשים', 'תוצאות']
    },
    {
      id: 'telegram-members',
      name: 'חברים פעילים',
      platform: 'Telegram',
      icon: '✈️',
      category: 'engagement',
      description: 'חברים פעילים ואיכותיים שיהפכו את הערוץ שלכם למוביל',
      features: ['חברים פעילים', 'אינטראקציה גבוהה', 'פרופילים אמיתיים', 'תוצאות מיידיות'],
      color: 'linear-gradient(135deg, #0088CC, #229ED9)',
      stats: { number: '2M+', label: 'חברים שנוספו' },
      cta: 'הפכו למובילים!',
      keywords: ['חברים', 'פעילים', 'איכותיים', 'מוביל', 'אינטראקציה']
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const stats = [
    { number: '10M+', label: 'לקוחות מרוצים', icon: '😊', color: '#667eea' },
    { number: '500M+', label: 'אינטראקציות', icon: '📈', color: '#764ba2' },
    { number: '99.9%', label: 'זמינות שירות', icon: '⚡', color: '#f093fb' },
    { number: '24/7', label: 'תמיכה טכנית', icon: '🛠️', color: '#4facfe' },
    { number: '9', label: 'פלטפורמות', icon: '🌐', color: '#43e97b' },
    { number: '150+', label: 'מדינות', icon: '🌍', color: '#fa709a' }
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

  const handleServiceClick = (service: any) => {
    navigate(`/services/${service.platform.toLowerCase()}`, {
      state: { 
        selectedService: service.name,
        source: 'services' 
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
      {Array.from({ length: 40 }).map((_, i) => (
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
            animation: `float ${Math.random() * 35 + 10}s infinite linear`,
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
            fontSize: '4.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe, #43e97b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 20px 0',
            textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }}>
            השירותים הכי חזקים ברשת! 💪
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            <strong>הפלטפורמה הכי מתקדמת</strong> לשירותי רשתות חברתיות! 
            <br />
            <span style={{ color: '#667eea', fontWeight: 'bold' }}>תוצאות מדהימות, שירות מקצועי, תוצאות מיידיות!</span>
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

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                background: activeCategory === category.id 
                  ? category.color 
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
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
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
                overflow: 'hidden',
                transform: hoveredService === service.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredService === service.id 
                  ? '0 25px 50px rgba(102, 126, 234, 0.3)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: service.color,
                opacity: 0.1,
                zIndex: 1
              }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  {service.icon}
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '5px 15px',
                  fontSize: '0.9rem',
                  color: 'white',
                  marginBottom: '15px',
                  display: 'inline-block'
                }}>
                  {service.platform}
                </div>
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 15px 0'
                }}>
                  {service.name}
                </h3>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: '0 0 20px 0'
                }}>
                  {service.description}
                </p>

                {/* Keywords */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {service.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '15px',
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        color: '#667eea',
                        fontWeight: '500'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div style={{
                  textAlign: 'right',
                  marginBottom: '25px'
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px',
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      <span style={{ color: '#43e97b', fontSize: '1rem' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '5px'
                  }}>
                    {service.stats.number}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {service.stats.label}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleServiceClick(service)}
                  style={{
                    background: service.color,
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
                  🚀 {service.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
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
            למה אנחנו הכי חזקים? 💪
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
            מוכנים להיות הכי חזקים? 💪
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 auto 30px',
            maxWidth: '600px'
          }}>
            <strong>התחילו עכשיו</strong> ותראו תוצאות מדהימות תוך 24 שעות! 
            <br />
            <span style={{ color: '#667eea', fontWeight: 'bold' }}>השירות הכי חזק, המהיר והמקצועי ברשת!</span>
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/contact')}
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
              💬 התחילו עכשיו!
            </button>
            <button
              onClick={() => navigate('/pricing')}
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
              💎 ראה מחירים
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

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

export default ServicesPage;
