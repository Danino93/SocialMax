import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YouTubeServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // סרטונים
    {
      id: 'video_views',
      name: 'צפיות לסרטונים',
      description: 'הוספת צפיות מסיביות לסרטונים - עד 10M צפיות',
      price: '₪0.02',
      min: 1000,
      max: 10000000,
      icon: '🎥',
      category: 'סרטונים',
      features: ['צפיות מסיביות', 'עד 10M צפיות', 'מסירה מהירה', 'הגדלת ויראליות']
    },
    {
      id: 'video_likes',
      name: 'לייקים לסרטונים',
      description: 'הוספת לייקים לסרטונים - אלגוריתם boost',
      price: '₪0.03',
      min: 100,
      max: 1000000,
      icon: '👍',
      category: 'סרטונים',
      features: ['לייקים לסרטונים', 'אלגוריתם boost', 'מסירה מהירה', 'הגדלת ויראליות']
    },
    {
      id: 'video_comments',
      name: 'תגובות לסרטונים',
      description: 'הוספת תגובות לסרטונים - מעורבות גבוהה',
      price: '₪0.05',
      min: 10,
      max: 5000,
      icon: '💬',
      category: 'סרטונים',
      features: ['תגובות לסרטונים', 'מעורבות גבוהה', 'תוכן מותאם', 'מסירה מדורגת']
    },
    {
      id: 'video_shares',
      name: 'שיתופים לסרטונים',
      description: 'הוספת שיתופים לסרטונים - ויראליות',
      price: '₪0.06',
      min: 10,
      max: 10000,
      icon: '📤',
      category: 'סרטונים',
      features: ['שיתופים לסרטונים', 'ויראליות', 'מסירה מהירה', 'הגדלת חשיפה']
    },
    {
      id: 'video_scheduling',
      name: 'תזמון סרטונים',
      description: 'תזמון חכם של סרטונים - אופטימיזציה',
      price: '₪0.08',
      min: 1,
      max: 20,
      icon: '⏰',
      category: 'סרטונים',
      features: ['תזמון חכם', 'אופטימיזציה', 'המלצות זמנים', 'ניתוח ביצועים']
    },
    {
      id: 'playlist_management',
      name: 'ניהול פלייליסטים',
      description: 'ניהול חכם של פלייליסטים - ארגון מתקדם',
      price: '₪0.10',
      min: 1,
      max: 15,
      icon: '📋',
      category: 'סרטונים',
      features: ['ניהול חכם', 'ארגון מתקדם', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'live_streaming',
      name: 'שידורים חיים',
      description: 'אופטימיזציה של שידורים חיים - מעורבות גבוהה',
      price: '₪0.12',
      min: 1,
      max: 10,
      icon: '📡',
      category: 'סרטונים',
      features: ['אופטימיזציה', 'שידורים חיים', 'מעורבות גבוהה', 'ניתוח ביצועים']
    },
    // שורטס
    {
      id: 'shorts_views',
      name: 'צפיות לשורטס',
      description: 'הוספת צפיות לשורטס - ויראליות מהירה',
      price: '₪0.01',
      min: 1000,
      max: 5000000,
      icon: '📱',
      category: 'שורטס',
      features: ['צפיות לשורטס', 'ויראליות מהירה', 'מסירה מהירה', 'הגדלת חשיפה']
    },
    {
      id: 'shorts_likes',
      name: 'לייקים לשורטס',
      description: 'הוספת לייקים לשורטס - אלגוריתם boost',
      price: '₪0.02',
      min: 100,
      max: 500000,
      icon: '❤️',
      category: 'שורטס',
      features: ['לייקים לשורטס', 'אלגוריתם boost', 'מסירה מהירה', 'הגדלת ויראליות']
    },
    // עוקבים
    {
      id: 'channel_subscribers',
      name: 'עוקבים לערוץ',
      description: 'הוספת עוקבים לערוץ - צמיחה אורגנית',
      price: '₪0.04',
      min: 100,
      max: 100000,
      icon: '👥',
      category: 'עוקבים',
      features: ['עוקבים לערוץ', 'צמיחה אורגנית', 'פרופילים אמיתיים', 'מסירה מדורגת']
    },
    // פיצ'רים מתקדמים
    {
      id: 'ai_background_generator',
      name: 'מחולל רקעים AI',
      description: 'מחולל רקעים עם בינה מלאכותית - יצירתיות מתקדמת',
      price: '₪0.15',
      min: 1,
      max: 5,
      icon: '🎨',
      category: 'מתקדמים',
      features: ['מחולל רקעים AI', 'יצירתיות מתקדמת', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'youtube_create_editing',
      name: 'עריכת YouTube Create',
      description: 'עריכה מתקדמת עם YouTube Create - כלים מקצועיים',
      price: '₪0.20',
      min: 1,
      max: 3,
      icon: '✂️',
      category: 'מתקדמים',
      features: ['עריכה מתקדמת', 'YouTube Create', 'כלים מקצועיים', 'אופטימיזציה']
    },
    {
      id: 'collab_feature',
      name: 'פיצ\'ר שיתוף פעולה',
      description: 'שיתוף פעולה עם יוצרים אחרים - קהילה מתקדמת',
      price: '₪0.18',
      min: 1,
      max: 8,
      icon: '🤝',
      category: 'מתקדמים',
      features: ['שיתוף פעולה', 'יוצרים אחרים', 'קהילה מתקדמת', 'ניתוח ביצועים']
    },
    {
      id: 'qa_stickers',
      name: 'סטיקרים Q&A',
      description: 'סטיקרים Q&A אינטראקטיביים - מעורבות גבוהה',
      price: '₪0.12',
      min: 1,
      max: 10,
      icon: '❓',
      category: 'מתקדמים',
      features: ['סטיקרים Q&A', 'אינטראקטיביים', 'מעורבות גבוהה', 'ניתוח ביצועים']
    },
    {
      id: 'ai_video_summaries',
      name: 'סיכומי סרטונים AI',
      description: 'סיכומים אוטומטיים של סרטונים עם AI - חיסכון בזמן',
      price: '₪0.25',
      min: 1,
      max: 5,
      icon: '📝',
      category: 'מתקדמים',
      features: ['סיכומים אוטומטיים', 'AI מתקדם', 'חיסכון בזמן', 'ניתוח חכם']
    },
    {
      id: 'hype_feature',
      name: 'פיצ\'ר Hype',
      description: 'פיצ\'ר Hype מתקדם - הגברת מעורבות',
      price: '₪0.14',
      min: 1,
      max: 8,
      icon: '🔥',
      category: 'מתקדמים',
      features: ['פיצ\'ר Hype', 'מתקדם', 'הגברת מעורבות', 'ניתוח ביצועים']
    },
    {
      id: 'youtube_communities',
      name: 'קהילות YouTube',
      description: 'ניהול קהילות YouTube - קהילה מתקדמת',
      price: '₪0.16',
      min: 1,
      max: 10,
      icon: '👥',
      category: 'מתקדמים',
      features: ['ניהול קהילות', 'YouTube', 'קהילה מתקדמת', 'ניתוח ביצועים']
    },
    {
      id: 'auto_dubbing',
      name: 'דיבוב אוטומטי',
      description: 'דיבוב אוטומטי מתקדם - רב-לשוני',
      price: '₪0.30',
      min: 1,
      max: 3,
      icon: '🎤',
      category: 'מתקדמים',
      features: ['דיבוב אוטומטי', 'מתקדם', 'רב-לשוני', 'איכות גבוהה']
    },
    {
      id: 'youtube_music_playlist_covers',
      name: 'עטיפות פלייליסטים YouTube Music',
      description: 'יצירת עטיפות פלייליסטים - עיצוב מקצועי',
      price: '₪0.08',
      min: 1,
      max: 15,
      icon: '🎵',
      category: 'מתקדמים',
      features: ['יצירת עטיפות', 'פלייליסטים', 'עיצוב מקצועי', 'אופטימיזציה']
    }
  ];

  const categories = ['הכל', 'סרטונים', 'שורטס', 'עוקבים', 'מתקדמים'];

  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
  };

  const calculatePrice = (service: any, quantity: number) => {
    const pricePerUnit = parseFloat(service.price.replace('₪', ''));
    return (pricePerUnit * quantity).toFixed(2);
  };

  const handleAddToCart = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    const quantity = quantities[serviceId] || service?.min || 1;
    
    if (service) {
      const cartItem = {
        id: serviceId,
        name: service.name,
        quantity: quantity,
        price: service.price,
        total: calculatePrice(service, quantity)
      };
      
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      existingCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      alert(`נוסף לסל: ${service.name} - ${quantity} יחידות`);
    }
  };

  const toggleCalculator = (serviceId: string) => {
    setShowCalculator(showCalculator === serviceId ? null : serviceId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(255, 0, 0, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #000000 100%)
      `,
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Floating Circles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`circle-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 150 + 80,
              height: Math.random() * 150 + 80,
              borderRadius: '50%',
              background: `linear-gradient(45deg, 
                rgba(255, 0, 0, ${Math.random() * 0.5 + 0.2}), 
                rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 8 + 's'
            }}
          />
        ))}
        
        {/* Sparkling Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#fff',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `sparkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
        
        {/* Drifting Geometric Shapes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 40,
              height: Math.random() * 100 + 40,
              background: `linear-gradient(45deg, 
                rgba(255, 0, 0, ${Math.random() * 0.6 + 0.3}), 
                rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})
              )`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `drift ${Math.random() * 20 + 15}s infinite linear`,
              animationDelay: Math.random() * 8 + 's'
            }}
          />
        ))}
        
        {/* Wave Effects */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`wave-${i}`}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '300px',
              background: `linear-gradient(45deg, 
                rgba(255, 0, 0, ${0.15 - i * 0.03}), 
                rgba(255, 255, 255, ${0.15 - i * 0.03})
              )`,
              clipPath: `polygon(0 ${100 - i * 12}%, 100% ${85 - i * 8}%, 100% 100%, 0% 100%)`,
              animation: `wave ${12 + i * 4}s infinite ease-in-out`,
              animationDelay: i * 3 + 's'
            }}
          />
        ))}
        
        {/* Breathing Elements */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`breathe-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 300 + 200,
              height: Math.random() * 300 + 200,
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1}), 
                transparent 70%
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `breathe ${Math.random() * 12 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
        
        {/* Twinkling Stars */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              width: 3,
              height: 3,
              background: '#fff',
              borderRadius: '50%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 6 + 4}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
        
        {/* Orbital Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              width: 500 + i * 200,
              height: 500 + i * 200,
              border: `2px solid rgba(255, 255, 255, ${0.15 - i * 0.03})`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `orbit ${30 + i * 20}s infinite linear`,
              animationDelay: i * 8 + 's'
            }}
          />
        ))}
      </div>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(2); }
          }
          
          @keyframes drift {
            0% { transform: translateX(-200px) translateY(0px) rotate(0deg); }
            100% { transform: translateX(calc(100vw + 200px)) translateY(-200px) rotate(360deg); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-100px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.4); opacity: 0.15; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(2.5); }
          }
          
          @keyframes orbit {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.7); }
            50% { box-shadow: 0 0 60px rgba(255, 0, 0, 1), 0 0 90px rgba(255, 255, 255, 0.8); }
          }
          
          @keyframes slideInUp {
            0% { transform: translateY(80px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .service-card {
            animation: slideInUp 0.8s ease-out;
            animation-fill-mode: both;
          }
          
          .service-card:nth-child(1) { animation-delay: 0.1s; }
          .service-card:nth-child(2) { animation-delay: 0.2s; }
          .service-card:nth-child(3) { animation-delay: 0.3s; }
          .service-card:nth-child(4) { animation-delay: 0.4s; }
          .service-card:nth-child(5) { animation-delay: 0.5s; }
          .service-card:nth-child(6) { animation-delay: 0.6s; }
          .service-card:nth-child(7) { animation-delay: 0.7s; }
          .service-card:nth-child(8) { animation-delay: 0.8s; }
          .service-card:nth-child(9) { animation-delay: 0.9s; }
          .service-card:nth-child(10) { animation-delay: 1.0s; }
          .service-card:nth-child(11) { animation-delay: 1.1s; }
          .service-card:nth-child(12) { animation-delay: 1.2s; }
          .service-card:nth-child(13) { animation-delay: 1.3s; }
          .service-card:nth-child(14) { animation-delay: 1.4s; }
          .service-card:nth-child(15) { animation-delay: 1.5s; }
          .service-card:nth-child(16) { animation-delay: 1.6s; }
          .service-card:nth-child(17) { animation-delay: 1.7s; }
          .service-card:nth-child(18) { animation-delay: 1.8s; }
          .service-card:nth-child(19) { animation-delay: 1.9s; }
          .service-card:nth-child(20) { animation-delay: 2.0s; }
        `}
      </style>
      
      {/* Header */}
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(25px)',
        borderRadius: '30px',
        padding: '40px',
        marginBottom: '40px',
        border: '3px solid rgba(255,255,255,0.15)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '25px'
        }}>
          {/* Left Side - Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.25)',
              borderRadius: '20px',
              padding: '15px 25px',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              backdropFilter: 'blur(15px)',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            }}
          >
            ← חזרה לעמוד הראשי
          </button>

          {/* Right Side - Cart + Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                alert(`בסל שלך יש ${cart.length} פריטים`);
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '3px solid rgba(255,255,255,0.25)',
                borderRadius: '20px',
                padding: '15px 25px',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(15px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              }}
            >
              🛒 צפייה בסל
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #ff0000, #ffffff, #000000)',
                border: '3px solid rgba(255,255,255,0.4)',
                borderRadius: '20px',
                padding: '15px 25px',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(15px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                boxShadow: '0 10px 30px rgba(255, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.5)';
              }}
            >
              📝 הרשמה
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '3px solid rgba(255,255,255,0.25)',
                borderRadius: '20px',
                padding: '15px 25px',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(15px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Center - YouTube Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '160px',
            height: '160px',
            background: `
              linear-gradient(45deg, #ff0000 0%, #ffffff 50%, #000000 100%),
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
            `,
            borderRadius: '40px',
            fontSize: '5rem',
            textAlign: 'center',
            boxShadow: `
              0 0 50px rgba(255, 0, 0, 0.8),
              0 0 100px rgba(255, 255, 255, 0.6),
              inset 0 0 30px rgba(255, 255, 255, 0.3)
            `,
            border: '5px solid rgba(255, 255, 255, 0.4)',
            overflow: 'hidden',
            animation: 'glow 5s ease-in-out infinite, pulse 4s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2) rotate(15deg)';
            e.currentTarget.style.boxShadow = `
              0 0 80px rgba(255, 0, 0, 1),
              0 0 150px rgba(255, 255, 255, 0.8),
              inset 0 0 40px rgba(255, 255, 255, 0.4)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = `
              0 0 50px rgba(255, 0, 0, 0.8),
              0 0 100px rgba(255, 255, 255, 0.6),
              inset 0 0 30px rgba(255, 255, 255, 0.3)
            `;
          }}
          >
            {/* Floating particles around icon */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`icon-particle-${i}`}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  background: '#fff',
                  borderRadius: '50%',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `sparkle ${Math.random() * 4 + 3}s infinite ease-in-out`,
                  animationDelay: Math.random() * 4 + 's'
                }}
              />
            ))}
            🎬
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '3.5rem',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          textShadow: '0 4px 8px rgba(0,0,0,0.6)',
          background: 'linear-gradient(45deg, #ff0000, #ffffff, #000000)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          שירותי YouTube
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: '1.5rem',
          margin: '0 0 30px 0',
          textShadow: '0 2px 4px rgba(0,0,0,0.6)'
        }}>
          השירותים המתקדמים ביותר ל-YouTube בישראל - ויראליות מובטחת!
        </p>
        
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '30px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #ff0000, #ffffff, #000000)'
                  : 'rgba(255,255,255,0.15)',
                border: '3px solid rgba(255,255,255,0.25)',
                borderRadius: '25px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(15px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                boxShadow: selectedCategory === category 
                  ? '0 10px 30px rgba(255, 0, 0, 0.5)'
                  : '0 5px 15px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '35px',
        maxWidth: '1500px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="service-card"
            style={{
              background: `
                linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(30px)',
              borderRadius: '35px',
              padding: '40px',
              border: '4px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-20px) rotateX(10deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 40px 80px rgba(0, 0, 0, 0.4),
                0 0 50px rgba(255, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
          >
            {/* Service Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '25px',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '30px',
                background: `
                  linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                boxShadow: `
                  0 25px 50px rgba(0, 0, 0, 0.4),
                  0 0 30px rgba(255, 0, 0, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `,
                border: '4px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pulse 5s ease-in-out infinite'
              }}>
                {/* Floating particles around service icon */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`service-particle-${i}`}
                    style={{
                      position: 'absolute',
                      width: 5,
                      height: 5,
                      background: '#fff',
                      borderRadius: '50%',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      animation: `sparkle ${Math.random() * 4 + 3}s infinite ease-in-out`,
                      animationDelay: Math.random() * 4 + 's'
                    }}
                  />
                ))}
                {service.icon}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '10px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    margin: 0,
                    textShadow: '0 3px 6px rgba(0,0,0,0.6)'
                  }}>
                    {service.name}
                  </h3>
                  <span style={{
                    background: 'linear-gradient(135deg, #ff0000, #ffffff, #000000)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                    boxShadow: '0 8px 20px rgba(255, 0, 0, 0.5)'
                  }}>
                    {service.price}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.2rem',
                  margin: 0,
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div style={{
              marginBottom: '30px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.3rem',
                margin: '0 0 20px 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)'
              }}>
                פיצ'רים:
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '15px'
              }}>
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '12px 20px',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'center',
                      border: '2px solid rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(15px)',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Calculator */}
            <div style={{
              marginBottom: '30px'
            }}>
              <button
                onClick={() => toggleCalculator(service.id)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.15)',
                  border: '3px solid rgba(255,255,255,0.25)',
                  borderRadius: '20px',
                  padding: '18px',
                  color: 'white',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  backdropFilter: 'blur(15px)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                }}
              >
                🧮 מחשבון מחירים
              </button>

              {showCalculator === service.id && (
                <div style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '25px',
                  padding: '30px',
                  marginTop: '25px',
                  border: '3px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)'
                }}>
                  {/* Slider */}
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      color: 'white',
                      fontSize: '1.2rem',
                      marginBottom: '15px',
                      display: 'block',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                    }}>
                      כמות: {quantities[service.id] || service.min}
                    </label>
                    <input
                      type="range"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.25)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '1rem',
                      marginTop: '10px'
                    }}>
                      <span>{service.min.toLocaleString()}</span>
                      <span>{service.max.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Manual Input */}
                  <div style={{ marginBottom: '25px' }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '15px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        backdropFilter: 'blur(15px)'
                      }}
                      placeholder={`הכנס כמות (${service.min}-${service.max})`}
                    />
                  </div>

                  {/* Total Price */}
                  <div style={{
                    background: 'linear-gradient(135deg, #ff0000, #ffffff, #000000)',
                    borderRadius: '20px',
                    padding: '25px',
                    textAlign: 'center',
                    boxShadow: '0 15px 35px rgba(255, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      textShadow: '0 3px 6px rgba(0,0,0,0.6)'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.1rem',
                      marginTop: '8px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                    }}>
                      {quantities[service.id] || service.min} יחידות
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(service.id)}
              style={{
                width: '100%',
                background: `
                  linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `,
                border: '4px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '25px',
                padding: '25px',
                color: 'white',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `
                  0 25px 50px rgba(255, 0, 0, 0.6),
                  0 0 40px rgba(255, 255, 255, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden',
                textShadow: '0 3px 6px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(20px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = `
                  0 40px 80px rgba(255, 0, 0, 0.8),
                  0 0 60px rgba(255, 255, 255, 0.7),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 25px 50px rgba(255, 0, 0, 0.6),
                  0 0 40px rgba(255, 255, 255, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `;
              }}
            >
              <div>🛒 הוסף לסל</div>
              {quantities[service.id] && (
                <div style={{
                  fontSize: '1.1rem',
                  opacity: 0.95,
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}>
                  ₪{calculatePrice(service, quantities[service.id])} - {quantities[service.id].toLocaleString()} יחידות
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '40px',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.3rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.6)'
        }}>
          © 2024 SocialMax - השירותים המתקדמים ביותר ל-YouTube בישראל
        </p>
      </div>
    </div>
  );
};

export default YouTubeServices;
