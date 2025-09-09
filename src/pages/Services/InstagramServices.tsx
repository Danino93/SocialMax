import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstagramServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // פוסטים
    {
      id: 'post_likes',
      name: 'לייקים לפוסטים',
      description: 'הוספת לייקים לפוסטים - הגברת מעורבות',
      price: '₪0.02',
      min: 10,
      max: 1000,
      icon: '❤️',
      category: 'פוסטים',
      features: ['לייקים אמיתיים מקהל רלוונטי', 'מהירות מותאמת', 'מסירה מיידית', 'הגדלת חשיפה אורגנית']
    },
    {
      id: 'post_views',
      name: 'צפיות בפוסטים',
      description: 'הוספת צפיות לפוסטים - הגברת חשיפה',
      price: '₪0.03',
      min: 50,
      max: 5000,
      icon: '👁️',
      category: 'פוסטים',
      features: ['צפיות איכותיות', 'שיעור צפייה גבוה', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    {
      id: 'post_saves',
      name: 'שמירות לפוסטים',
      description: 'הוספת שמירות לפוסטים - boost לאלגוריתם',
      price: '₪0.04',
      min: 10,
      max: 1000,
      icon: '💾',
      category: 'פוסטים',
      features: ['שמירות איכותיות', 'boost לאלגוריתם', 'הגברת חשיפה אורגנית', 'מסירה מדורגת']
    },
    {
      id: 'post_shares',
      name: 'שיתופים לפוסטים',
      description: 'הוספת שיתופים לפוסטים - ויראליות',
      price: '₪0.05',
      min: 5,
      max: 500,
      icon: '📤',
      category: 'פוסטים',
      features: ['שיתופים איכותיים', 'הגברת ויראליות', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    // סטוריז
    {
      id: 'story_views',
      name: 'צפיות בסטוריז',
      description: 'הוספת צפיות לסטוריז - הגברת חשיפה',
      price: '₪0.03',
      min: 20,
      max: 2000,
      icon: '📱',
      category: 'סטוריז',
      features: ['צפיות אמיתיות', 'משך זמן מותאם', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'story_likes',
      name: 'לייקים לסטוריז',
      description: 'הוספת לייקים לסטוריז - hearts animation',
      price: '₪0.04',
      min: 10,
      max: 1000,
      icon: '❤️',
      category: 'סטוריז',
      features: ['לייקים איכותיים', 'hearts animation', 'הגברת מעורבות', 'מסירה מדורגת']
    },
    {
      id: 'story_replies',
      name: 'תגובות לסטוריז',
      description: 'הוספת תגובות לסטוריז - מעורבות גבוהה',
      price: '₪0.06',
      min: 5,
      max: 200,
      icon: '💬',
      category: 'סטוריז',
      features: ['תגובות מותאמות', 'מעורבות גבוהה', 'תוכן בעברית', 'מסירה מדורגת']
    },
    // רילסים
    {
      id: 'reel_views',
      name: 'צפיות ברילסים',
      description: 'הוספת צפיות לרילסים - הגברת חשיפה',
      price: '₪0.04',
      min: 100,
      max: 10000,
      icon: '🎬',
      category: 'רילסים',
      features: ['צפיות איכותיות', 'שיעור השלמה גבוה', 'מסירה מדורגת', 'הגדלת ויראליות']
    },
    {
      id: 'reel_likes',
      name: 'לייקים לרילסים',
      description: 'הוספת לייקים לרילסים - אלגוריתם boost',
      price: '₪0.05',
      min: 50,
      max: 5000,
      icon: '❤️',
      category: 'רילסים',
      features: ['לייקים איכותיים', 'אלגוריתם boost', 'הגברת מעורבות', 'מסירה מדורגת']
    },
    {
      id: 'reel_comments',
      name: 'תגובות לרילסים',
      description: 'הוספת תגובות לרילסים - מעורבות גבוהה',
      price: '₪0.07',
      min: 10,
      max: 1000,
      icon: '💬',
      category: 'רילסים',
      features: ['תגובות מותאמות', 'מעורבות גבוהה', 'תוכן בעברית', 'מסירה מדורגת']
    },
    {
      id: 'reel_shares',
      name: 'שיתופים לרילסים',
      description: 'הוספת שיתופים לרילסים - ויראליות',
      price: '₪0.08',
      min: 5,
      max: 500,
      icon: '📤',
      category: 'רילסים',
      features: ['שיתופים איכותיים', 'הגברת ויראליות', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    // עוקבים
    {
      id: 'account_followers',
      name: 'עוקבים לחשבון',
      description: 'הוספת עוקבים לחשבון - הגברת מספר העוקבים',
      price: '₪0.05',
      min: 50,
      max: 2000,
      icon: '👥',
      category: 'עוקבים',
      features: ['עוקבים איכותיים', 'פרופילים אמיתיים', 'מסירה מהירה ומדורגת', 'אחריות למילוי חוזר']
    },
    {
      id: 'follow_unfollow',
      name: 'מעקב/הפסקת מעקב אוטומטי',
      description: 'אסטרטגיית follow/unfollow אוטומטית',
      price: '₪0.08',
      min: 10,
      max: 500,
      icon: '🔄',
      category: 'עוקבים',
      features: ['אסטרטגיה אוטומטית', 'הגברת חשיפה אורגנית', 'מסירה מדורגת', 'ניהול חכם']
    },
    {
      id: 'hashtag_following',
      name: 'מעקב אחר תגיות',
      description: 'מעקב אוטומטי אחר תגיות רלוונטיות',
      price: '₪0.10',
      min: 5,
      max: 100,
      icon: '#️⃣',
      category: 'עוקבים',
      features: ['מעקב אוטומטי', 'הגברת חשיפה לתגיות', 'מסירה מדורגת', 'ניהול חכם']
    },
    // תגובות
    {
      id: 'post_comments',
      name: 'תגובות לפוסטים',
      description: 'הוספת תגובות לפוסטים - הגברת מעורבות',
      price: '₪0.08',
      min: 5,
      max: 100,
      icon: '💬',
      category: 'תגובות',
      features: ['תגובות מותאמות', 'תוכן בעברית ואנגלית', 'פרופילים אמיתיים', 'מסירה מדורגת']
    },
    {
      id: 'dm_automation',
      name: 'DM אוטומטיים',
      description: 'שליחת הודעות פרטיות אוטומטיות',
      price: '₪0.12',
      min: 1,
      max: 50,
      icon: '📩',
      category: 'תגובות',
      features: ['הודעות אוטומטיות', 'הגברת מעורבות אישית', 'תוכן מותאם', 'מסירה מדורגת']
    },
    {
      id: 'engagement_pods',
      name: 'קבוצות מעורבות',
      description: 'הצטרפות לקבוצות מעורבות - engagement pods',
      price: '₪0.15',
      min: 1,
      max: 20,
      icon: '🤝',
      category: 'תגובות',
      features: ['הצטרפות לקבוצות', 'הגברת מעורבות קבוצתית', 'מסירה מדורגת', 'ניהול חכם']
    },
    // פיצ'רים מתקדמים
    {
      id: 'post_scheduling',
      name: 'תזמון פוסטים',
      description: 'תזמון פוסטים וסטוריז מראש - ניהול תוכן יעיל',
      price: '₪0.15',
      min: 1,
      max: 50,
      icon: '⏰',
      category: 'מתקדמים',
      features: ['תזמון אוטומטי', 'ניהול תוכן', 'האשטגים מותאמים', 'קהל יעד ממוקד']
    },
    {
      id: 'visual_feed_planning',
      name: 'תכנון ויזואלי של הפיד',
      description: 'תצוגה מקדימה של הפיד לפני פרסום - תכנון עיצוב הפיד',
      price: '₪0.20',
      min: 1,
      max: 20,
      icon: '🎨',
      category: 'מתקדמים',
      features: ['תצוגה מקדימה', 'תכנון עיצוב', 'רשת מותאמת', 'נושא עיצוב']
    },
    {
      id: 'hashtag_management',
      name: 'ניהול האשטגים',
      description: 'מעקב ובחירת האשטגים פופולריים - אופטימיזציה של האשטגים',
      price: '₪0.12',
      min: 1,
      max: 30,
      icon: '#️⃣',
      category: 'מתקדמים',
      features: ['האשטגים פופולריים', 'ניתוח טרנדים', 'שפות מותאמות', 'רמת טרנדיות']
    },
    {
      id: 'engagement_analytics',
      name: 'ניתוח מעורבות',
      description: 'מעקב אחר ביצועי הפוסטים והסטוריז - הבנת התנהגות הקהל',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '📊',
      category: 'מתקדמים',
      features: ['ניתוח ביצועים', 'מעקב אחר קהל', 'דוחות מפורטים', 'המלצות שיפור']
    },
    {
      id: 'instagram_shopping',
      name: 'Instagram Shopping',
      description: 'ניהול חנות אינסטגרם - אופטימיזציה למכירות',
      price: '₪0.30',
      min: 1,
      max: 15,
      icon: '🛍️',
      category: 'מתקדמים',
      features: ['ניהול מוצרים', 'אופטימיזציה למכירות', 'מעקב אחר מכירות', 'שיפור ביצועים']
    },
    {
      id: 'influencer_collaborations',
      name: 'שיתופי פעולה עם אינפלואנסרים',
      description: 'חיבור עם אינפלואנסרים רלוונטיים - הזדמנויות שיתוף פעולה',
      price: '₪0.40',
      min: 1,
      max: 25,
      icon: '⭐',
      category: 'מתקדמים',
      features: ['חיבור עם אינפלואנסרים', 'הזדמנויות שיתוף פעולה', 'ניתוח פוטנציאל', 'מעקב אחר צמיחה']
    }
  ];

  const categories = ['הכל', 'פוסטים', 'סטוריז', 'רילסים', 'עוקבים', 'תגובות', 'מתקדמים'];
  
  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const calculatePrice = (service: any, quantity: number) => {
    const pricePerUnit = parseFloat(service.price.replace('₪', ''));
    return (pricePerUnit * quantity).toFixed(2);
  };

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [serviceId]: quantity }));
  };

  const handleAddToCart = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    const quantity = quantities[serviceId] || service?.min || 0;
    
    if (!service || quantity === 0) {
      alert('אנא בחר כמות לפני הוספה לסל');
      return;
    }

    // שמירה ב-localStorage לסל קניות
    const cartItem = {
      id: serviceId,
      name: service.name,
      price: service.price,
      quantity: quantity,
      totalPrice: calculatePrice(service, quantity),
      category: service.category,
      icon: service.icon
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === serviceId);
    
    if (existingItemIndex >= 0) {
      // עדכון כמות אם הפריט כבר קיים
      existingCart[existingItemIndex].quantity = quantity;
      existingCart[existingItemIndex].totalPrice = calculatePrice(service, quantity);
    } else {
      // הוספת פריט חדש
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // הודעת הצלחה
    alert(`✅ ${service.name} נוסף לסל בהצלחה!\nכמות: ${quantity.toLocaleString()}\nמחיר: ₪${calculatePrice(service, quantity)}`);
  };

  const toggleCalculator = (serviceId: string) => {
    setShowCalculator(showCalculator === serviceId ? null : serviceId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(240, 147, 251, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 105, 180, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(255, 20, 147, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff1493 100%)
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
        {[...Array(15)].map((_, i) => (
          <div
            key={`circle-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: `linear-gradient(45deg, 
                rgba(255, 105, 180, ${Math.random() * 0.3 + 0.1}), 
                rgba(240, 147, 251, ${Math.random() * 0.3 + 0.1})
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
        
        {/* Sparkling Particles */}
        {[...Array(30)].map((_, i) => (
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
              animation: `sparkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
        
        {/* Drifting Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              background: `linear-gradient(45deg, 
                rgba(255, 20, 147, ${Math.random() * 0.4 + 0.2}), 
                rgba(245, 87, 108, ${Math.random() * 0.4 + 0.2})
              )`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `drift ${Math.random() * 15 + 10}s infinite linear`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
        
        {/* Wave Effects */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '200px',
              background: `linear-gradient(45deg, 
                rgba(240, 147, 251, ${0.1 - i * 0.03}), 
                rgba(255, 105, 180, ${0.1 - i * 0.03})
              )`,
              clipPath: `polygon(0 ${100 - i * 20}%, 100% ${80 - i * 15}%, 100% 100%, 0% 100%)`,
              animation: `wave ${8 + i * 2}s infinite ease-in-out`,
              animationDelay: i * 2 + 's'
            }}
          />
        ))}
        
        {/* Breathing Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`breathe-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05}), 
                transparent 70%
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `breathe ${Math.random() * 8 + 6}s infinite ease-in-out`,
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
        
        {/* Twinkling Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              width: 2,
              height: 2,
              background: '#fff',
              borderRadius: '50%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out`,
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
        
        {/* Orbital Elements */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              width: 300 + i * 100,
              height: 300 + i * 100,
              border: `1px solid rgba(255, 255, 255, ${0.1 - i * 0.03})`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `orbit ${20 + i * 10}s infinite linear`,
              animationDelay: i * 5 + 's'
            }}
          />
        ))}
      </div>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes drift {
            0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
            100% { transform: translateX(calc(100vw + 100px)) translateY(-100px) rotate(360deg); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-50px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.1; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          
          @keyframes orbit {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.5); }
            50% { box-shadow: 0 0 40px rgba(255, 105, 180, 0.8), 0 0 60px rgba(240, 147, 251, 0.6); }
          }
          
          @keyframes slideInUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .service-card {
            animation: slideInUp 0.6s ease-out;
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
          .service-card:nth-child(21) { animation-delay: 2.1s; }
          .service-card:nth-child(22) { animation-delay: 2.2s; }
          .service-card:nth-child(23) { animation-delay: 2.3s; }
        `}
      </style>
      
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
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          {/* Left Side - Back Button */}
          <button
            onClick={() => navigate('/')}
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
            ← חזרה לעמוד הראשי
          </button>

          {/* Right Side - Cart + Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart.length === 0) {
                  alert('הסל שלך ריק');
                } else {
                  alert(`🛒 יש לך ${cart.length} פריטים בסל\nסה"כ: ₪${cart.reduce((sum: number, item: any) => sum + parseFloat(item.totalPrice), 0).toFixed(2)}`);
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🛒 צפייה בסל
            </button>

            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📝 הרשמה
            </button>
            
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 15px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Center - Instagram Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            background: `
              linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%),
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
            `,
            borderRadius: '30px',
            fontSize: '4rem',
            textAlign: 'center',
            boxShadow: `
              0 0 30px rgba(255, 105, 180, 0.6),
              0 0 60px rgba(240, 147, 251, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.2)
            `,
            border: '3px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            animation: 'glow 3s ease-in-out infinite, pulse 2s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
            e.currentTarget.style.boxShadow = `
              0 0 40px rgba(255, 105, 180, 0.8),
              0 0 80px rgba(240, 147, 251, 0.6),
              inset 0 0 30px rgba(255, 255, 255, 0.3)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = `
              0 0 30px rgba(255, 105, 180, 0.6),
              0 0 60px rgba(240, 147, 251, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.2)
            `;
          }}
          >
            {/* Floating particles around icon */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`icon-particle-${i}`}
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  background: '#fff',
                  borderRadius: '50%',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `sparkle ${Math.random() * 2 + 1}s infinite ease-in-out`,
                  animationDelay: Math.random() * 2 + 's'
                }}
              />
            ))}
            📸
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          שירותי Instagram
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: '0 0 20px 0'
        }}>
          השירותים המתקדמים ביותר ל-Instagram בישראל
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
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '30px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 105, 180, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.2) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 20px 40px rgba(0, 0, 0, 0.2),
                0 0 30px rgba(255, 105, 180, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `;
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
                width: '70px',
                height: '70px',
                borderRadius: '20px',
                background: `
                  linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ff1493 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: `
                  0 15px 35px rgba(0, 0, 0, 0.2),
                  0 0 20px rgba(255, 105, 180, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pulse 3s ease-in-out infinite'
              }}>
                {/* Floating particles around service icon */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`service-particle-${i}`}
                    style={{
                      position: 'absolute',
                      width: 3,
                      height: 3,
                      background: '#fff',
                      borderRadius: '50%',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      animation: `sparkle ${Math.random() * 2 + 1}s infinite ease-in-out`,
                      animationDelay: Math.random() * 2 + 's'
                    }}
                  />
                ))}
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

            {/* Price Calculator */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {service.price}
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem'
                  }}>
                    לכל יחידה
                  </div>
                </div>
                <button
                  onClick={() => toggleCalculator(service.id)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {showCalculator === service.id ? '📊 סגור' : '🧮 מחשבון'}
                </button>
              </div>

              {showCalculator === service.id && (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '15px',
                  marginTop: '15px'
                }}>
                  {/* Quantity Slider */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{
                      display: 'block',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginBottom: '10px'
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
                        height: '8px',
                        borderRadius: '5px',
                        background: 'rgba(255,255,255,0.2)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      <span>{service.min.toLocaleString()}</span>
                      <span>{service.max.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Manual Input */}
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        textAlign: 'center'
                      }}
                      placeholder={`הכנס כמות (${service.min}-${service.max})`}
                    />
                  </div>

                  {/* Total Price */}
                  <div style={{
                    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                    borderRadius: '10px',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>
                      סה"כ מחיר
                    </div>
                    <div style={{
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                  </div>
                </div>
              )}
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

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(service.id)}
              style={{
                width: '100%',
                background: `
                  linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
                `,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '15px',
                padding: '18px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `
                  0 15px 35px rgba(74, 222, 128, 0.4),
                  0 0 20px rgba(34, 197, 94, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `
                  0 25px 50px rgba(74, 222, 128, 0.6),
                  0 0 30px rgba(34, 197, 94, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 15px 35px rgba(74, 222, 128, 0.4),
                  0 0 20px rgba(34, 197, 94, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
                `;
              }}
            >
              <div>🛒 הוסף לסל</div>
              {quantities[service.id] && (
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.9
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

export default InstagramServices;
