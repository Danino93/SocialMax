import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TikTokServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // צפיות
    {
      id: 'video_views',
      name: 'צפיות לסרטונים',
      description: 'הוספת צפיות מסיביות לסרטונים - עד 10M צפיות',
      price: '₪0.01',
      min: 1000,
      max: 10000000,
      icon: '👁️',
      category: 'צפיות',
      features: ['צפיות מסיביות', 'עד 10M צפיות', 'מסירה מהירה', 'הגדלת ויראליות']
    },
    {
      id: 'live_views',
      name: 'צפיות בשידורים חיים',
      description: 'הוספת צפיות לשידורים חיים - הגברת מעורבות',
      price: '₪0.02',
      min: 100,
      max: 50000,
      icon: '📺',
      category: 'צפיות',
      features: ['צפיות בשידורים חיים', 'הגברת מעורבות', 'מסירה מהירה', 'איכות גבוהה']
    },
    // עוקבים
    {
      id: 'account_followers',
      name: 'עוקבים לחשבון',
      description: 'הוספת עוקבים ממוקדי גיל - דור Z',
      price: '₪0.03',
      min: 100,
      max: 100000,
      icon: '👥',
      category: 'עוקבים',
      features: ['עוקבים ממוקדי גיל', 'דור Z', 'פרופילים אמיתיים', 'מסירה מדורגת']
    },
    {
      id: 'premium_followers',
      name: 'עוקבים פרימיום',
      description: 'עוקבים פרימיום איכותיים - מעורבות גבוהה',
      price: '₪0.05',
      min: 50,
      max: 50000,
      icon: '⭐',
      category: 'עוקבים',
      features: ['עוקבים פרימיום', 'איכות גבוהה', 'מעורבות גבוהה', 'אחריות למילוי']
    },
    // לייקים
    {
      id: 'video_likes',
      name: 'לייקים לסרטונים',
      description: 'הוספת לייקים לסרטונים - אלגוריתם boost',
      price: '₪0.02',
      min: 100,
      max: 1000000,
      icon: '❤️',
      category: 'לייקים',
      features: ['לייקים לסרטונים', 'אלגוריתם boost', 'מסירה מהירה', 'הגדלת ויראליות']
    },
    {
      id: 'comment_likes',
      name: 'לייקים לתגובות',
      description: 'הוספת לייקים לתגובות - הגברת מעורבות',
      price: '₪0.01',
      min: 50,
      max: 10000,
      icon: '👍',
      category: 'לייקים',
      features: ['לייקים לתגובות', 'הגברת מעורבות', 'מסירה מהירה', 'איכות גבוהה']
    },
    // תגובות
    {
      id: 'video_comments',
      name: 'תגובות לסרטונים',
      description: 'הוספת תגובות לסרטונים - מעורבות גבוהה',
      price: '₪0.03',
      min: 10,
      max: 5000,
      icon: '💬',
      category: 'תגובות',
      features: ['תגובות לסרטונים', 'מעורבות גבוהה', 'תוכן מותאם', 'מסירה מדורגת']
    },
    {
      id: 'trending_comments',
      name: 'תגובות טרנדיות',
      description: 'תגובות טרנדיות - hashtag challenges',
      price: '₪0.04',
      min: 5,
      max: 1000,
      icon: '🔥',
      category: 'תגובות',
      features: ['תגובות טרנדיות', 'hashtag challenges', 'תוכן ויראלי', 'מסירה מהירה']
    },
    // שיתופים
    {
      id: 'video_shares',
      name: 'שיתופים לסרטונים',
      description: 'הוספת שיתופים לסרטונים - ויראליות',
      price: '₪0.04',
      min: 10,
      max: 10000,
      icon: '📤',
      category: 'שיתופים',
      features: ['שיתופים לסרטונים', 'ויראליות', 'מסירה מהירה', 'הגדלת חשיפה']
    },
    {
      id: 'cross_platform_shares',
      name: 'שיתופים לפלטפורמות אחרות',
      description: 'שיתוף לפלטפורמות אחרות - cross-promotion',
      price: '₪0.05',
      min: 5,
      max: 5000,
      icon: '🌐',
      category: 'שיתופים',
      features: ['שיתוף לפלטפורמות אחרות', 'cross-promotion', 'הגדלת חשיפה', 'מסירה מדורגת']
    },
    // פיצ'רים מתקדמים
    {
      id: 'trend_analysis',
      name: 'ניתוח טרנדים',
      description: 'מעקב טרנדים אוטומטי - viral content alerts',
      price: '₪0.10',
      min: 1,
      max: 10,
      icon: '📊',
      category: 'פיצ\'רים מתקדמים',
      features: ['מעקב טרנדים אוטומטי', 'viral content alerts', 'ניתוח מתקדם', 'המלצות חכמות']
    },
    {
      id: 'hashtag_challenges',
      name: 'יצירת challenges ויראליים',
      description: 'יצירת challenges ויראליים מותאמים לישראל',
      price: '₪0.15',
      min: 1,
      max: 5,
      icon: '🎯',
      category: 'פיצ\'רים מתקדמים',
      features: ['יצירת challenges ויראליים', 'מותאמים לישראל', 'ניתוח התנהגות', 'המלצות מותאמות']
    },
    {
      id: 'content_automation',
      name: 'אוטומציה של תוכן',
      description: 'אוטומציה מתקדמת של יצירת תוכן',
      price: '₪0.20',
      min: 1,
      max: 3,
      icon: '🤖',
      category: 'פיצ\'רים מתקדמים',
      features: ['אוטומציה מתקדמת', 'יצירת תוכן', 'ניתוח חכם', 'התאמה אוטומטית']
    },
    {
      id: 'viral_prediction',
      name: 'חיזוי ויראליות',
      description: 'חיזוי תוכן שיתפוצץ - AI מתקדם',
      price: '₪0.25',
      min: 1,
      max: 3,
      icon: '🔮',
      category: 'פיצ\'רים מתקדמים',
      features: ['חיזוי ויראליות', 'AI מתקדם', 'ניתוח התנהגות', 'המלצות מדויקות']
    },
    {
      id: 'competitor_monitoring',
      name: 'מעקב מתחרים',
      description: 'מעקב אחר מתחרים - ניתוח אסטרטגי',
      price: '₪0.30',
      min: 1,
      max: 5,
      icon: '👁️‍🗨️',
      category: 'פיצ\'רים מתקדמים',
      features: ['מעקב מתחרים', 'ניתוח אסטרטגי', 'דוחות מפורטים', 'המלצות שיפור']
    },
    {
      id: 'ai_content_optimization',
      name: 'אופטימיזציה של תוכן עם AI',
      description: 'אופטימיזציה מתקדמת של תוכן עם בינה מלאכותית',
      price: '₪0.35',
      min: 1,
      max: 3,
      icon: '🧠',
      category: 'פיצ\'רים מתקדמים',
      features: ['אופטימיזציה מתקדמת', 'בינה מלאכותית', 'ניתוח חכם', 'התאמה אוטומטית']
    },
    {
      id: 'topic_management',
      name: 'ניהול נושאים',
      description: 'ניהול חכם של נושאים ותגיות',
      price: '₪0.12',
      min: 1,
      max: 10,
      icon: '📝',
      category: 'פיצ\'רים מתקדמים',
      features: ['ניהול חכם', 'נושאים ותגיות', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'smart_keyword_filters',
      name: 'מסנני מילות מפתח חכמים',
      description: 'מסננים חכמים למילות מפתח רלוונטיות',
      price: '₪0.08',
      min: 1,
      max: 15,
      icon: '🔍',
      category: 'פיצ\'רים מתקדמים',
      features: ['מסננים חכמים', 'מילות מפתח רלוונטיות', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'wellbeing_missions',
      name: 'משימות רווחה',
      description: 'משימות רווחה וקידום בריאות נפשית',
      price: '₪0.06',
      min: 1,
      max: 20,
      icon: '💚',
      category: 'פיצ\'רים מתקדמים',
      features: ['משימות רווחה', 'קידום בריאות נפשית', 'תוכן חיובי', 'השפעה חברתית']
    },
    {
      id: 'creator_chat_rooms',
      name: 'חדרי צ\'אט ליוצרים',
      description: 'חדרי צ\'אט מיוחדים ליוצרים',
      price: '₪0.10',
      min: 1,
      max: 10,
      icon: '💬',
      category: 'פיצ\'רים מתקדמים',
      features: ['חדרי צ\'אט מיוחדים', 'יוצרים', 'קהילה', 'שיתוף ידע']
    },
    {
      id: 'creator_protection_mode',
      name: 'מצב הגנה ליוצרים',
      description: 'מצב הגנה מתקדם ליוצרים',
      price: '₪0.15',
      min: 1,
      max: 5,
      icon: '🛡️',
      category: 'פיצ\'רים מתקדמים',
      features: ['מצב הגנה מתקדם', 'יוצרים', 'אבטחה', 'הגנה מפני הטרדה']
    },
    {
      id: 'quick_content_check',
      name: 'בדיקה מהירה של תוכן',
      description: 'בדיקה מהירה ואוטומטית של תוכן',
      price: '₪0.05',
      min: 1,
      max: 25,
      icon: '⚡',
      category: 'פיצ\'רים מתקדמים',
      features: ['בדיקה מהירה', 'אוטומטית', 'איכות תוכן', 'המלצות שיפור']
    },
    {
      id: 'ai_ad_automation',
      name: 'אוטומציה של פרסומות עם AI',
      description: 'אוטומציה מתקדמת של פרסומות עם בינה מלאכותית',
      price: '₪0.40',
      min: 1,
      max: 3,
      icon: '🎯',
      category: 'פיצ\'רים מתקדמים',
      features: ['אוטומציה מתקדמת', 'פרסומות', 'בינה מלאכותית', 'אופטימיזציה']
    },
    {
      id: 'tiktok_for_artists',
      name: 'TikTok לאמנים',
      description: 'פיצ\'רים מיוחדים לאמנים ויוצרי מוזיקה',
      price: '₪0.20',
      min: 1,
      max: 5,
      icon: '🎵',
      category: 'פיצ\'רים מתקדמים',
      features: ['פיצ\'רים מיוחדים', 'אמנים', 'יוצרי מוזיקה', 'קידום מוזיקה']
    },
    {
      id: 'post_scheduling',
      name: 'תזמון פוסטים',
      description: 'תזמון חכם של פוסטים וסרטונים',
      price: '₪0.08',
      min: 1,
      max: 20,
      icon: '⏰',
      category: 'פיצ\'רים מתקדמים',
      features: ['תזמון חכם', 'פוסטים וסרטונים', 'אופטימיזציה', 'המלצות זמנים']
    },
    {
      id: 'content_performance_analytics',
      name: 'אנליטיקס ביצועי תוכן',
      description: 'ניתוח מתקדם של ביצועי תוכן',
      price: '₪0.12',
      min: 1,
      max: 10,
      icon: '📈',
      category: 'פיצ\'רים מתקדמים',
      features: ['ניתוח מתקדם', 'ביצועי תוכן', 'דוחות מפורטים', 'המלצות שיפור']
    },
    {
      id: 'enhanced_inbox',
      name: 'תיבת הודעות משופרת',
      description: 'תיבת הודעות משופרת עם פיצ\'רים מתקדמים',
      price: '₪0.06',
      min: 1,
      max: 15,
      icon: '📨',
      category: 'פיצ\'רים מתקדמים',
      features: ['תיבת הודעות משופרת', 'פיצ\'רים מתקדמים', 'ניהול הודעות', 'אוטומציה']
    },
    {
      id: 'feed_customization_guide',
      name: 'מדריך התאמת פיד',
      description: 'מדריך התאמה אישית של הפיד',
      price: '₪0.04',
      min: 1,
      max: 25,
      icon: '🎨',
      category: 'פיצ\'רים מתקדמים',
      features: ['מדריך התאמה אישית', 'התאמת פיד', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'screen_time_management',
      name: 'ניהול זמן מסך',
      description: 'ניהול חכם של זמן מסך ושימוש',
      price: '₪0.03',
      min: 1,
      max: 30,
      icon: '⏱️',
      category: 'פיצ\'רים מתקדמים',
      features: ['ניהול חכם', 'זמן מסך', 'שימוש', 'המלצות בריאות']
    },
    {
      id: 'business_account_conversion',
      name: 'המרה לחשבון עסקי',
      description: 'המרה חכמה לחשבון עסקי',
      price: '₪0.10',
      min: 1,
      max: 10,
      icon: '🏢',
      category: 'פיצ\'רים מתקדמים',
      features: ['המרה חכמה', 'חשבון עסקי', 'פיצ\'רים עסקיים', 'אופטימיזציה']
    },
    {
      id: 'sound_optimization',
      name: 'אופטימיזציה של סאונד',
      description: 'אופטימיזציה מתקדמת של סאונד ומוזיקה',
      price: '₪0.08',
      min: 1,
      max: 15,
      icon: '🔊',
      category: 'פיצ\'רים מתקדמים',
      features: ['אופטימיזציה מתקדמת', 'סאונד ומוזיקה', 'איכות גבוהה', 'המלצות מותאמות']
    },
    {
      id: 'video_length_optimization',
      name: 'אופטימיזציה של אורך סרטון',
      description: 'אופטימיזציה חכמה של אורך סרטונים',
      price: '₪0.06',
      min: 1,
      max: 20,
      icon: '📏',
      category: 'פיצ\'רים מתקדמים',
      features: ['אופטימיזציה חכמה', 'אורך סרטונים', 'ניתוח ביצועים', 'המלצות מותאמות']
    },
    {
      id: 'tiktok_shop_integration',
      name: 'אינטגרציה עם TikTok Shop',
      description: 'אינטגרציה מלאה עם TikTok Shop - מכירות ישירות',
      price: '₪0.25',
      min: 1,
      max: 5,
      icon: '🛍️',
      category: 'פיצ\'רים מתקדמים',
      features: ['אינטגרציה מלאה', 'TikTok Shop', 'מכירות ישירות', 'אופטימיזציה']
    },
    {
      id: 'affiliate_marketing',
      name: 'שיווק שותפים',
      description: 'שיווק שותפים מתקדם - affiliate marketing',
      price: '₪0.20',
      min: 1,
      max: 8,
      icon: '🤝',
      category: 'פיצ\'רים מתקדמים',
      features: ['שיווק שותפים מתקדם', 'affiliate marketing', 'ניתוח ביצועים', 'המלצות שיפור']
    },
    {
      id: 'live_streaming_optimization',
      name: 'אופטימיזציה של שידורים חיים',
      description: 'אופטימיזציה מתקדמת של שידורים חיים',
      price: '₪0.15',
      min: 1,
      max: 8,
      icon: '📡',
      category: 'פיצ\'רים מתקדמים',
      features: ['אופטימיזציה מתקדמת', 'שידורים חיים', 'ניתוח ביצועים', 'המלצות שיפור']
    }
  ];

  const categories = ['הכל', 'צפיות', 'עוקבים', 'לייקים', 'תגובות', 'שיתופים', 'פיצ\'רים מתקדמים'];

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
        radial-gradient(circle at 20% 80%, rgba(255, 0, 80, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 242, 254, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(0, 0, 0, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #ff0050 0%, #00f2fe 50%, #000000 100%)
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
        {[...Array(20)].map((_, i) => (
          <div
            key={`circle-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 120 + 60,
              height: Math.random() * 120 + 60,
              borderRadius: '50%',
              background: `linear-gradient(45deg, 
                rgba(255, 0, 80, ${Math.random() * 0.4 + 0.1}), 
                rgba(0, 242, 254, ${Math.random() * 0.4 + 0.1})
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 12 + 8}s infinite ease-in-out`,
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        ))}
        
        {/* Sparkling Particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#fff',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `sparkle ${Math.random() * 4 + 2}s infinite ease-in-out`,
              animationDelay: Math.random() * 3 + 's'
            }}
          />
        ))}
        
        {/* Drifting Geometric Shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
              background: `linear-gradient(45deg, 
                rgba(255, 0, 80, ${Math.random() * 0.5 + 0.2}), 
                rgba(0, 242, 254, ${Math.random() * 0.5 + 0.2})
              )`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `drift ${Math.random() * 18 + 12}s infinite linear`,
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        ))}
        
        {/* Wave Effects */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`wave-${i}`}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '250px',
              background: `linear-gradient(45deg, 
                rgba(255, 0, 80, ${0.1 - i * 0.02}), 
                rgba(0, 242, 254, ${0.1 - i * 0.02})
              )`,
              clipPath: `polygon(0 ${100 - i * 15}%, 100% ${85 - i * 10}%, 100% 100%, 0% 100%)`,
              animation: `wave ${10 + i * 3}s infinite ease-in-out`,
              animationDelay: i * 2.5 + 's'
            }}
          />
        ))}
        
        {/* Breathing Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`breathe-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 250 + 150,
              height: Math.random() * 250 + 150,
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05}), 
                transparent 70%
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `breathe ${Math.random() * 10 + 8}s infinite ease-in-out`,
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
        
        {/* Twinkling Stars */}
        {[...Array(30)].map((_, i) => (
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
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
              animationDelay: Math.random() * 4 + 's'
            }}
          />
        ))}
        
        {/* Orbital Elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              width: 400 + i * 150,
              height: 400 + i * 150,
              border: `1px solid rgba(255, 255, 255, ${0.1 - i * 0.02})`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `orbit ${25 + i * 15}s infinite linear`,
              animationDelay: i * 6 + 's'
            }}
          />
        ))}
      </div>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(180deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          
          @keyframes drift {
            0% { transform: translateX(-150px) translateY(0px) rotate(0deg); }
            100% { transform: translateX(calc(100vw + 150px)) translateY(-150px) rotate(360deg); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-75px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.3); opacity: 0.1; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(2); }
          }
          
          @keyframes orbit {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 25px rgba(255, 0, 80, 0.6); }
            50% { box-shadow: 0 0 50px rgba(255, 0, 80, 0.9), 0 0 75px rgba(0, 242, 254, 0.7); }
          }
          
          @keyframes slideInUp {
            0% { transform: translateY(60px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .service-card {
            animation: slideInUp 0.7s ease-out;
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
          .service-card:nth-child(24) { animation-delay: 2.4s; }
          .service-card:nth-child(25) { animation-delay: 2.5s; }
          .service-card:nth-child(26) { animation-delay: 2.6s; }
          .service-card:nth-child(27) { animation-delay: 2.7s; }
          .service-card:nth-child(28) { animation-delay: 2.8s; }
          .service-card:nth-child(29) { animation-delay: 2.9s; }
          .service-card:nth-child(30) { animation-delay: 3.0s; }
          .service-card:nth-child(31) { animation-delay: 3.1s; }
          .service-card:nth-child(32) { animation-delay: 3.2s; }
          .service-card:nth-child(33) { animation-delay: 3.3s; }
          .service-card:nth-child(34) { animation-delay: 3.4s; }
          .service-card:nth-child(35) { animation-delay: 3.5s; }
        `}
      </style>
      
      {/* Header */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: '25px',
        padding: '35px',
        marginBottom: '35px',
        border: '2px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Left Side - Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '15px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              backdropFilter: 'blur(10px)',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ← חזרה לעמוד הראשי
          </button>

          {/* Right Side - Cart + Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                alert(`בסל שלך יש ${cart.length} פריטים`);
              }}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '15px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🛒 צפייה בסל
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #ff0050, #00f2fe)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '15px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                boxShadow: '0 8px 25px rgba(255, 0, 80, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 0, 80, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 0, 80, 0.4)';
              }}
            >
              📝 הרשמה
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '15px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Center - TikTok Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '140px',
            height: '140px',
            background: `
              linear-gradient(45deg, #ff0050 0%, #00f2fe 50%, #000000 100%),
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
            `,
            borderRadius: '35px',
            fontSize: '4.5rem',
            textAlign: 'center',
            boxShadow: `
              0 0 40px rgba(255, 0, 80, 0.7),
              0 0 80px rgba(0, 242, 254, 0.5),
              inset 0 0 25px rgba(255, 255, 255, 0.2)
            `,
            border: '4px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            animation: 'glow 4s ease-in-out infinite, pulse 3s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
            e.currentTarget.style.boxShadow = `
              0 0 60px rgba(255, 0, 80, 0.9),
              0 0 120px rgba(0, 242, 254, 0.7),
              inset 0 0 35px rgba(255, 255, 255, 0.3)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = `
              0 0 40px rgba(255, 0, 80, 0.7),
              0 0 80px rgba(0, 242, 254, 0.5),
              inset 0 0 25px rgba(255, 255, 255, 0.2)
            `;
          }}
          >
            {/* Floating particles around icon */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`icon-particle-${i}`}
                style={{
                  position: 'absolute',
                  width: 5,
                  height: 5,
                  background: '#fff',
                  borderRadius: '50%',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `sparkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
                  animationDelay: Math.random() * 3 + 's'
                }}
              />
            ))}
            🎵
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          margin: '0 0 15px 0',
          textShadow: '0 3px 6px rgba(0,0,0,0.5)',
          background: 'linear-gradient(45deg, #ff0050, #00f2fe, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          שירותי TikTok
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.4rem',
          margin: '0 0 25px 0',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          השירותים המתקדמים ביותר ל-TikTok בישראל - ויראליות מובטחת!
        </p>
        
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '25px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #ff0050, #00f2fe)'
                  : 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '12px 25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                boxShadow: selectedCategory === category 
                  ? '0 8px 25px rgba(255, 0, 80, 0.4)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
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
        gap: '30px',
        maxWidth: '1400px',
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
                linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 80, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 242, 254, 0.15) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(25px)',
              borderRadius: '30px',
              padding: '35px',
              border: '3px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `
                0 15px 40px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px) rotateX(8deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 80, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 242, 254, 0.25) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 30px 60px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(255, 0, 80, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%),
                radial-gradient(circle at 20% 20%, rgba(255, 0, 80, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 242, 254, 0.15) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 15px 40px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `;
            }}
          >
            {/* Service Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '25px',
                background: `
                  linear-gradient(135deg, #ff0050 0%, #00f2fe 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                boxShadow: `
                  0 20px 40px rgba(0, 0, 0, 0.3),
                  0 0 25px rgba(255, 0, 80, 0.5),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                border: '3px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pulse 4s ease-in-out infinite'
              }}>
                {/* Floating particles around service icon */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`service-particle-${i}`}
                    style={{
                      position: 'absolute',
                      width: 4,
                      height: 4,
                      background: '#fff',
                      borderRadius: '50%',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      animation: `sparkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
                      animationDelay: Math.random() * 3 + 's'
                    }}
                  />
                ))}
                {service.icon}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    margin: 0,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {service.name}
                  </h3>
                  <span style={{
                    background: 'linear-gradient(135deg, #ff0050, #00f2fe)',
                    color: 'white',
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    boxShadow: '0 5px 15px rgba(255, 0, 80, 0.4)'
                  }}>
                    {service.price}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.1rem',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div style={{
              marginBottom: '25px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                margin: '0 0 15px 0',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}>
                פיצ'רים:
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px'
              }}>
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      padding: '8px 15px',
                      borderRadius: '15px',
                      color: 'white',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Calculator */}
            <div style={{
              marginBottom: '25px'
            }}>
              <button
                onClick={() => toggleCalculator(service.id)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  backdropFilter: 'blur(10px)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🧮 מחשבון מחירים
              </button>

              {showCalculator === service.id && (
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '20px',
                  padding: '25px',
                  marginTop: '20px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(15px)'
                }}>
                  {/* Slider */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      color: 'white',
                      fontSize: '1.1rem',
                      marginBottom: '10px',
                      display: 'block',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
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
                      fontSize: '0.9rem',
                      marginTop: '8px'
                    }}>
                      <span>{service.min.toLocaleString()}</span>
                      <span>{service.max.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Manual Input */}
                  <div style={{ marginBottom: '20px' }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)'
                      }}
                      placeholder={`הכנס כמות (${service.min}-${service.max})`}
                    />
                  </div>

                  {/* Total Price */}
                  <div style={{
                    background: 'linear-gradient(135deg, #ff0050, #00f2fe)',
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px rgba(255, 0, 80, 0.4)'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1rem',
                      marginTop: '5px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
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
                  linear-gradient(135deg, #ff0050 0%, #00f2fe 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
                `,
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                padding: '20px',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `
                  0 20px 40px rgba(255, 0, 80, 0.5),
                  0 0 30px rgba(0, 242, 254, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                position: 'relative',
                overflow: 'hidden',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(15px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                e.currentTarget.style.boxShadow = `
                  0 30px 60px rgba(255, 0, 80, 0.7),
                  0 0 40px rgba(0, 242, 254, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #ff0050 0%, #00f2fe 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 20px 40px rgba(255, 0, 80, 0.5),
                  0 0 30px rgba(0, 242, 254, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #ff0050 0%, #00f2fe 50%, #000000 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)
                `;
              }}
            >
              <div>🛒 הוסף לסל</div>
              {quantities[service.id] && (
                <div style={{
                  fontSize: '1rem',
                  opacity: 0.9,
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
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
        marginTop: '50px',
        padding: '30px',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          © 2024 SocialMax - השירותים המתקדמים ביותר ל-TikTok בישראל
        </p>
      </div>
    </div>
  );
};

export default TikTokServices;
