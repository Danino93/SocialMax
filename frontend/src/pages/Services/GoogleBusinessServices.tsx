import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleBusinessServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // ביקורות
    {
      id: 'google_reviews',
      name: 'ביקורות Google 5 כוכבים',
      description: 'הוספת ביקורות 5 כוכבים איכותיות - דומיננטיות בגוגל',
      price: '₪2.50',
      min: 5,
      max: 100,
      icon: '⭐',
      category: 'ביקורות',
      features: ['ביקורות 5 כוכבים', 'איכות גבוהה', 'דומיננטיות בגוגל', 'מסירה מדורגת']
    },
    {
      id: 'review_management',
      name: 'ניהול ביקורות',
      description: 'ניהול חכם של ביקורות - מעקב ותגובות',
      price: '₪1.80',
      min: 1,
      max: 20,
      icon: '📝',
      category: 'ביקורות',
      features: ['ניהול חכם', 'מעקב ותגובות', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'review_monitoring',
      name: 'מעקב ביקורות',
      description: 'מעקב אוטומטי אחר ביקורות - התראות מיידיות',
      price: '₪1.20',
      min: 1,
      max: 30,
      icon: '👁️',
      category: 'ביקורות',
      features: ['מעקב אוטומטי', 'התראות מיידיות', 'ניתוח ביצועים', 'המלצות שיפור']
    },
    // צפיות
    {
      id: 'photo_views',
      name: 'צפיות בתמונות',
      description: 'הוספת צפיות לתמונות - הגברת חשיפה',
      price: '₪0.80',
      min: 100,
      max: 10000,
      icon: '📸',
      category: 'צפיות',
      features: ['צפיות בתמונות', 'הגברת חשיפה', 'מסירה מהירה', 'איכות גבוהה']
    },
    {
      id: 'profile_views',
      name: 'צפיות בפרופיל',
      description: 'הוספת צפיות בפרופיל העסק - נוכחות דיגיטלית',
      price: '₪0.60',
      min: 50,
      max: 5000,
      icon: '👀',
      category: 'צפיות',
      features: ['צפיות בפרופיל', 'נוכחות דיגיטלית', 'מסירה מהירה', 'איכות גבוהה']
    },
    {
      id: 'website_clicks',
      name: 'קליקים לאתר',
      description: 'הוספת קליקים לאתר - הגברת טרפיק',
      price: '₪1.00',
      min: 10,
      max: 1000,
      icon: '🔗',
      category: 'צפיות',
      features: ['קליקים לאתר', 'הגברת טרפיק', 'מסירה מהירה', 'איכות גבוהה']
    },
    // מיקוד מקומי
    {
      id: 'local_seo',
      name: 'SEO מקומי',
      description: 'אופטימיזציה למנועי חיפוש מקומיים - מיקוד גיאוגרפי',
      price: '₪3.00',
      min: 1,
      max: 10,
      icon: '📍',
      category: 'מיקוד מקומי',
      features: ['SEO מקומי', 'מיקוד גיאוגרפי', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'street_level_targeting',
      name: 'מיקוד רמת רחוב',
      description: 'מיקוד מתקדם ברמת רחוב - דיוק מקסימלי',
      price: '₪2.50',
      min: 1,
      max: 15,
      icon: '🗺️',
      category: 'מיקוד מקומי',
      features: ['מיקוד מתקדם', 'רמת רחוב', 'דיוק מקסימלי', 'ניתוח ביצועים']
    },
    {
      id: 'local_keywords',
      name: 'מילות מפתח מקומיות',
      description: 'אופטימיזציה למילות מפתח מקומיות - רלוונטיות גבוהה',
      price: '₪1.50',
      min: 1,
      max: 25,
      icon: '🔍',
      category: 'מיקוד מקומי',
      features: ['מילות מפתח מקומיות', 'רלוונטיות גבוהה', 'אופטימיזציה', 'המלצות מותאמות']
    },
    // Q&A
    {
      id: 'qa_optimization',
      name: 'אופטימיזציה של Q&A',
      description: 'אופטימיזציה של שאלות ותשובות - מעורבות גבוהה',
      price: '₪1.80',
      min: 1,
      max: 20,
      icon: '❓',
      category: 'Q&A',
      features: ['אופטימיזציה Q&A', 'מעורבות גבוהה', 'ניתוח ביצועים', 'המלצות שיפור']
    },
    {
      id: 'qa_management',
      name: 'ניהול Q&A',
      description: 'ניהול חכם של שאלות ותשובות - מעקב ותגובות',
      price: '₪1.20',
      min: 1,
      max: 30,
      icon: '💬',
      category: 'Q&A',
      features: ['ניהול חכם', 'מעקב ותגובות', 'אופטימיזציה', 'המלצות מותאמות']
    },
    {
      id: 'qa_automation',
      name: 'אוטומציה של Q&A',
      description: 'אוטומציה מתקדמת של שאלות ותשובות - חיסכון בזמן',
      price: '₪2.00',
      min: 1,
      max: 15,
      icon: '🤖',
      category: 'Q&A',
      features: ['אוטומציה מתקדמת', 'חיסכון בזמן', 'ניתוח חכם', 'התאמה אוטומטית']
    },
    // פיצ'רים מתקדמים
    {
      id: 'business_hours_optimization',
      name: 'אופטימיזציה של שעות פעילות',
      description: 'אופטימיזציה חכמה של שעות פעילות - זמינות מקסימלית',
      price: '₪0.80',
      min: 1,
      max: 25,
      icon: '🕒',
      category: 'מתקדמים',
      features: ['אופטימיזציה חכמה', 'שעות פעילות', 'זמינות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'contact_info_optimization',
      name: 'אופטימיזציה של פרטי יצירת קשר',
      description: 'אופטימיזציה של פרטי יצירת קשר - נגישות מקסימלית',
      price: '₪0.60',
      min: 1,
      max: 30,
      icon: '📞',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'פרטי יצירת קשר', 'נגישות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'category_optimization',
      name: 'אופטימיזציה של קטגוריות',
      description: 'אופטימיזציה של קטגוריות עסק - רלוונטיות מקסימלית',
      price: '₪1.00',
      min: 1,
      max: 20,
      icon: '📂',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'קטגוריות עסק', 'רלוונטיות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'description_optimization',
      name: 'אופטימיזציה של תיאור',
      description: 'אופטימיזציה של תיאור העסק - תוכן מקצועי',
      price: '₪1.20',
      min: 1,
      max: 25,
      icon: '📄',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'תיאור העסק', 'תוכן מקצועי', 'המלצות מותאמות']
    },
    {
      id: 'posts_optimization',
      name: 'אופטימיזציה של פוסטים',
      description: 'אופטימיזציה של פוסטים - תוכן מקצועי',
      price: '₪1.50',
      min: 1,
      max: 20,
      icon: '📝',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'פוסטים', 'תוכן מקצועי', 'המלצות מותאמות']
    },
    {
      id: 'events_optimization',
      name: 'אופטימיזציה של אירועים',
      description: 'אופטימיזציה של אירועים - תוכן מקצועי',
      price: '₪1.80',
      min: 1,
      max: 15,
      icon: '🎉',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'אירועים', 'תוכן מקצועי', 'המלצות מותאמות']
    },
    {
      id: 'products_optimization',
      name: 'אופטימיזציה של מוצרים',
      description: 'אופטימיזציה של מוצרים - תוכן מקצועי',
      price: '₪2.00',
      min: 1,
      max: 12,
      icon: '🛍️',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'מוצרים', 'תוכן מקצועי', 'המלצות מותאמות']
    },
    {
      id: 'services_optimization',
      name: 'אופטימיזציה של שירותים',
      description: 'אופטימיזציה של שירותים - תוכן מקצועי',
      price: '₪1.80',
      min: 1,
      max: 15,
      icon: '⚙️',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'שירותים', 'תוכן מקצועי', 'המלצות מותאמות']
    },
    {
      id: 'attributes_optimization',
      name: 'אופטימיזציה של תכונות',
      description: 'אופטימיזציה של תכונות עסק - רלוונטיות מקסימלית',
      price: '₪1.00',
      min: 1,
      max: 25,
      icon: '🏷️',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'תכונות עסק', 'רלוונטיות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'accessibility_optimization',
      name: 'אופטימיזציה של נגישות',
      description: 'אופטימיזציה של נגישות - שירות מקסימלי',
      price: '₪1.20',
      min: 1,
      max: 20,
      icon: '♿',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'נגישות', 'שירות מקסימלי', 'המלצות מותאמות']
    },
    {
      id: 'amenities_optimization',
      name: 'אופטימיזציה של שירותים נוספים',
      description: 'אופטימיזציה של שירותים נוספים - ערך מקסימלי',
      price: '₪0.80',
      min: 1,
      max: 30,
      icon: '🎯',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'שירותים נוספים', 'ערך מקסימלי', 'המלצות מותאמות']
    },
    {
      id: 'atmosphere_optimization',
      name: 'אופטימיזציה של אווירה',
      description: 'אופטימיזציה של אווירה - חוויה מקסימלית',
      price: '₪0.60',
      min: 1,
      max: 35,
      icon: '🌟',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'אווירה', 'חוויה מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'crowd_optimization',
      name: 'אופטימיזציה של קהל יעד',
      description: 'אופטימיזציה של קהל יעד - מיקוד מקסימלי',
      price: '₪1.00',
      min: 1,
      max: 25,
      icon: '👥',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'קהל יעד', 'מיקוד מקסימלי', 'המלצות מותאמות']
    },
    {
      id: 'dining_options_optimization',
      name: 'אופטימיזציה של אפשרויות אוכל',
      description: 'אופטימיזציה של אפשרויות אוכל - מגוון מקסימלי',
      price: '₪0.80',
      min: 1,
      max: 30,
      icon: '🍽️',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'אפשרויות אוכל', 'מגוון מקסימלי', 'המלצות מותאמות']
    },
    {
      id: 'from_this_business_optimization',
      name: 'אופטימיזציה של "מהעסק הזה"',
      description: 'אופטימיזציה של "מהעסק הזה" - רלוונטיות מקסימלית',
      price: '₪1.20',
      min: 1,
      max: 20,
      icon: '🏢',
      category: 'מתקדמים',
      features: ['אופטימיזציה', '"מהעסק הזה"', 'רלוונטיות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'highlights_optimization',
      name: 'אופטימיזציה של הדגשים',
      description: 'אופטימיזציה של הדגשים - חשיפה מקסימלית',
      price: '₪1.00',
      min: 1,
      max: 25,
      icon: '✨',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'הדגשים', 'חשיפה מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'payment_options_optimization',
      name: 'אופטימיזציה של אפשרויות תשלום',
      description: 'אופטימיזציה של אפשרויות תשלום - נוחות מקסימלית',
      price: '₪0.80',
      min: 1,
      max: 30,
      icon: '💳',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'אפשרויות תשלום', 'נוחות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'planning_optimization',
      name: 'אופטימיזציה של תכנון',
      description: 'אופטימיזציה של תכנון - יעילות מקסימלית',
      price: '₪1.50',
      min: 1,
      max: 15,
      icon: '📅',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'תכנון', 'יעילות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'popular_for_optimization',
      name: 'אופטימיזציה של "פופולרי עבור"',
      description: 'אופטימיזציה של "פופולרי עבור" - רלוונטיות מקסימלית',
      price: '₪1.20',
      min: 1,
      max: 20,
      icon: '🔥',
      category: 'מתקדמים',
      features: ['אופטימיזציה', '"פופולרי עבור"', 'רלוונטיות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'price_range_optimization',
      name: 'אופטימיזציה של טווח מחירים',
      description: 'אופטימיזציה של טווח מחירים - שקיפות מקסימלית',
      price: '₪0.60',
      min: 1,
      max: 35,
      icon: '💰',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'טווח מחירים', 'שקיפות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'offerings_optimization',
      name: 'אופטימיזציה של הצעות',
      description: 'אופטימיזציה של הצעות - ערך מקסימלי',
      price: '₪1.00',
      min: 1,
      max: 25,
      icon: '🎁',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'הצעות', 'ערך מקסימלי', 'המלצות מותאמות']
    },
    {
      id: 'service_options_optimization',
      name: 'אופטימיזציה של אפשרויות שירות',
      description: 'אופטימיזציה של אפשרויות שירות - גמישות מקסימלית',
      price: '₪0.80',
      min: 1,
      max: 30,
      icon: '⚡',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'אפשרויות שירות', 'גמישות מקסימלית', 'המלצות מותאמות']
    },
    {
      id: 'sustainability_optimization',
      name: 'אופטימיזציה של קיימות',
      description: 'אופטימיזציה של קיימות - אחריות מקסימלית',
      price: '₪1.20',
      min: 1,
      max: 20,
      icon: '🌱',
      category: 'מתקדמים',
      features: ['אופטימיזציה', 'קיימות', 'אחריות מקסימלית', 'המלצות מותאמות']
    }
  ];

  const categories = ['הכל', 'ביקורות', 'צפיות', 'מיקוד מקומי', 'Q&A', 'מתקדמים'];

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
        radial-gradient(circle at 20% 80%, rgba(66, 133, 244, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(52, 168, 83, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(251, 188, 4, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(234, 67, 53, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%)
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
        {[...Array(30)].map((_, i) => (
          <div
            key={`circle-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 180 + 100,
              height: Math.random() * 180 + 100,
              borderRadius: '50%',
              background: `linear-gradient(45deg, 
                rgba(66, 133, 244, ${Math.random() * 0.6 + 0.3}), 
                rgba(52, 168, 83, ${Math.random() * 0.6 + 0.3})
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 18 + 12}s infinite ease-in-out`,
              animationDelay: Math.random() * 10 + 's'
            }}
          />
        ))}
        
        {/* Sparkling Particles */}
        {[...Array(60)].map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#fff',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `sparkle ${Math.random() * 6 + 4}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
        
        {/* Drifting Geometric Shapes */}
        {[...Array(18)].map((_, i) => (
          <div
            key={`shape-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 120 + 60,
              height: Math.random() * 120 + 60,
              background: `linear-gradient(45deg, 
                rgba(66, 133, 244, ${Math.random() * 0.7 + 0.4}), 
                rgba(52, 168, 83, ${Math.random() * 0.7 + 0.4})
              )`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `drift ${Math.random() * 25 + 20}s infinite linear`,
              animationDelay: Math.random() * 10 + 's'
            }}
          />
        ))}
        
        {/* Wave Effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`wave-${i}`}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '350px',
              background: `linear-gradient(45deg, 
                rgba(66, 133, 244, ${0.2 - i * 0.03}), 
                rgba(52, 168, 83, ${0.2 - i * 0.03})
              )`,
              clipPath: `polygon(0 ${100 - i * 10}%, 100% ${85 - i * 6}%, 100% 100%, 0% 100%)`,
              animation: `wave ${15 + i * 5}s infinite ease-in-out`,
              animationDelay: i * 4 + 's'
            }}
          />
        ))}
        
        {/* Breathing Elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`breathe-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 350 + 250,
              height: Math.random() * 350 + 250,
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, ${Math.random() * 0.25 + 0.15}), 
                transparent 70%
              )`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `breathe ${Math.random() * 15 + 12}s infinite ease-in-out`,
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        ))}
        
        {/* Twinkling Stars */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              background: '#fff',
              borderRadius: '50%',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 7 + 5}s infinite ease-in-out`,
              animationDelay: Math.random() * 6 + 's'
            }}
          />
        ))}
        
        {/* Orbital Elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            style={{
              position: 'absolute',
              width: 600 + i * 250,
              height: 600 + i * 250,
              border: `3px solid rgba(255, 255, 255, ${0.2 - i * 0.03})`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `orbit ${35 + i * 25}s infinite linear`,
              animationDelay: i * 10 + 's'
            }}
          />
        ))}
      </div>
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-35px) rotate(180deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(2.5); }
          }
          
          @keyframes drift {
            0% { transform: translateX(-250px) translateY(0px) rotate(0deg); }
            100% { transform: translateX(calc(100vw + 250px)) translateY(-250px) rotate(360deg); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(-125px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.5); opacity: 0.2; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(3); }
          }
          
          @keyframes orbit {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.12); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 35px rgba(66, 133, 244, 0.8); }
            50% { box-shadow: 0 0 70px rgba(66, 133, 244, 1), 0 0 105px rgba(52, 168, 83, 0.9); }
          }
          
          @keyframes slideInUp {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .service-card {
            animation: slideInUp 0.9s ease-out;
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
          .service-card:nth-child(36) { animation-delay: 3.6s; }
          .service-card:nth-child(37) { animation-delay: 3.7s; }
          .service-card:nth-child(38) { animation-delay: 3.8s; }
          .service-card:nth-child(39) { animation-delay: 3.9s; }
          .service-card:nth-child(40) { animation-delay: 4.0s; }
        `}
      </style>
      
      {/* Header */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(30px)',
        borderRadius: '35px',
        padding: '45px',
        marginBottom: '45px',
        border: '4px solid rgba(255,255,255,0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '35px',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          {/* Left Side - Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.25)',
              border: '4px solid rgba(255,255,255,0.3)',
              borderRadius: '25px',
              padding: '18px 30px',
              color: 'white',
              fontSize: '1.3rem',
              cursor: 'pointer',
              transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              backdropFilter: 'blur(20px)',
              textShadow: '0 3px 6px rgba(0,0,0,0.5)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
            }}
          >
            ← חזרה לעמוד הראשי
          </button>

          {/* Right Side - Cart + Auth Buttons */}
          <div style={{
            display: 'flex',
            gap: '25px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                alert(`בסל שלך יש ${cart.length} פריטים`);
              }}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: '4px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                padding: '18px 30px',
                color: 'white',
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(20px)',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
              }}
            >
              🛒 צפייה בסל
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)',
                border: '4px solid rgba(255,255,255,0.5)',
                borderRadius: '25px',
                padding: '18px 30px',
                color: 'white',
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(20px)',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                boxShadow: '0 15px 35px rgba(66, 133, 244, 0.6)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 25px 45px rgba(66, 133, 244, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(66, 133, 244, 0.6)';
              }}
            >
              📝 הרשמה
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: '4px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                padding: '18px 30px',
                color: 'white',
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(20px)',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Center - Google Business Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '35px'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '180px',
            height: '180px',
            background: `
              linear-gradient(45deg, #4285f4 0%, #34a853 50%, #fbbc04 100%),
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)
            `,
            borderRadius: '45px',
            fontSize: '6rem',
            textAlign: 'center',
            boxShadow: `
              0 0 60px rgba(66, 133, 244, 0.9),
              0 0 120px rgba(52, 168, 83, 0.7),
              inset 0 0 35px rgba(255, 255, 255, 0.4)
            `,
            border: '6px solid rgba(255, 255, 255, 0.5)',
            overflow: 'hidden',
            animation: 'glow 6s ease-in-out infinite, pulse 5s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25) rotate(20deg)';
            e.currentTarget.style.boxShadow = `
              0 0 100px rgba(66, 133, 244, 1),
              0 0 200px rgba(52, 168, 83, 0.9),
              inset 0 0 50px rgba(255, 255, 255, 0.5)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = `
              0 0 60px rgba(66, 133, 244, 0.9),
              0 0 120px rgba(52, 168, 83, 0.7),
              inset 0 0 35px rgba(255, 255, 255, 0.4)
            `;
          }}
          >
            {/* Floating particles around icon */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`icon-particle-${i}`}
                style={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  background: '#fff',
                  borderRadius: '50%',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `sparkle ${Math.random() * 5 + 4}s infinite ease-in-out`,
                  animationDelay: Math.random() * 5 + 's'
                }}
              />
            ))}
            🏢
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '4rem',
          fontWeight: 'bold',
          margin: '0 0 25px 0',
          textShadow: '0 5px 10px rgba(0,0,0,0.7)',
          background: 'linear-gradient(45deg, #4285f4, #34a853, #fbbc04, #ffffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          שירותי Google Business
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.98)',
          fontSize: '1.6rem',
          margin: '0 0 35px 0',
          textShadow: '0 3px 6px rgba(0,0,0,0.7)'
        }}>
          השירותים המתקדמים ביותר ל-Google Business בישראל - דומיננטיות בגוגל!
        </p>
        
        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '25px',
          justifyContent: 'center',
          marginTop: '35px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)'
                  : 'rgba(255,255,255,0.2)',
                border: '4px solid rgba(255,255,255,0.3)',
                borderRadius: '30px',
                padding: '18px 35px',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(20px)',
                textShadow: '0 3px 6px rgba(0,0,0,0.5)',
                boxShadow: selectedCategory === category 
                  ? '0 15px 35px rgba(66, 133, 244, 0.6)'
                  : '0 8px 20px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '40px',
        maxWidth: '1600px',
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
                linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%),
                radial-gradient(circle at 20% 20%, rgba(66, 133, 244, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(52, 168, 83, 0.25) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(35px)',
              borderRadius: '40px',
              padding: '45px',
              border: '5px solid rgba(255, 255, 255, 0.25)',
              transition: 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `
                0 25px 60px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
              `
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-25px) rotateX(12deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%),
                radial-gradient(circle at 20% 20%, rgba(66, 133, 244, 0.35) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(52, 168, 83, 0.35) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 50px 100px rgba(0, 0, 0, 0.5),
                0 0 60px rgba(66, 133, 244, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.5)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)';
              e.currentTarget.style.background = `
                linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%),
                radial-gradient(circle at 20% 20%, rgba(66, 133, 244, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(52, 168, 83, 0.25) 0%, transparent 50%)
              `;
              e.currentTarget.style.boxShadow = `
                0 25px 60px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
              `;
            }}
          >
            {/* Service Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              marginBottom: '35px'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '35px',
                background: `
                  linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                boxShadow: `
                  0 30px 60px rgba(0, 0, 0, 0.5),
                  0 0 35px rgba(66, 133, 244, 0.7),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5)
                `,
                border: '5px solid rgba(255, 255, 255, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pulse 6s ease-in-out infinite'
              }}>
                {/* Floating particles around service icon */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`service-particle-${i}`}
                    style={{
                      position: 'absolute',
                      width: 6,
                      height: 6,
                      background: '#fff',
                      borderRadius: '50%',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      animation: `sparkle ${Math.random() * 5 + 4}s infinite ease-in-out`,
                      animationDelay: Math.random() * 5 + 's'
                    }}
                  />
                ))}
                {service.icon}
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    margin: 0,
                    textShadow: '0 4px 8px rgba(0,0,0,0.7)'
                  }}>
                    {service.name}
                  </h3>
                  <span style={{
                    background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)',
                    color: 'white',
                    padding: '10px 25px',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    boxShadow: '0 10px 25px rgba(66, 133, 244, 0.6)'
                  }}>
                    {service.price}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '1.3rem',
                  margin: 0,
                  textShadow: '0 3px 6px rgba(0,0,0,0.7)'
                }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div style={{
              marginBottom: '35px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.4rem',
                margin: '0 0 25px 0',
                textShadow: '0 3px 6px rgba(0,0,0,0.7)'
              }}>
                פיצ'רים:
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '18px'
              }}>
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '15px 25px',
                      borderRadius: '25px',
                      color: 'white',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      border: '3px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(20px)',
                      textShadow: '0 3px 6px rgba(0,0,0,0.7)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
                    }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Calculator */}
            <div style={{
              marginBottom: '35px'
            }}>
              <button
                onClick={() => toggleCalculator(service.id)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.2)',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: '25px',
                  padding: '22px',
                  color: 'white',
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  backdropFilter: 'blur(20px)',
                  textShadow: '0 3px 6px rgba(0,0,0,0.7)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
                }}
              >
                🧮 מחשבון מחירים
              </button>

              {showCalculator === service.id && (
                <div style={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '30px',
                  padding: '35px',
                  marginTop: '30px',
                  border: '4px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(25px)'
                }}>
                  {/* Slider */}
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{
                      color: 'white',
                      fontSize: '1.3rem',
                      marginBottom: '18px',
                      display: 'block',
                      textShadow: '0 3px 6px rgba(0,0,0,0.7)'
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
                        height: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.3)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1.1rem',
                      marginTop: '12px'
                    }}>
                      <span>{service.min.toLocaleString()}</span>
                      <span>{service.max.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Manual Input */}
                  <div style={{ marginBottom: '30px' }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        width: '100%',
                        padding: '18px',
                        borderRadius: '18px',
                        border: '4px solid rgba(255,255,255,0.4)',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '1.3rem',
                        textAlign: 'center',
                        backdropFilter: 'blur(20px)'
                      }}
                      placeholder={`הכנס כמות (${service.min}-${service.max})`}
                    />
                  </div>

                  {/* Total Price */}
                  <div style={{
                    background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04)',
                    borderRadius: '25px',
                    padding: '30px',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(66, 133, 244, 0.6)'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      textShadow: '0 4px 8px rgba(0,0,0,0.7)'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.98)',
                      fontSize: '1.2rem',
                      marginTop: '10px',
                      textShadow: '0 3px 6px rgba(0,0,0,0.7)'
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
                  linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)
                `,
                border: '5px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                padding: '30px',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: `
                  0 30px 60px rgba(66, 133, 244, 0.7),
                  0 0 50px rgba(52, 168, 83, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5)
                `,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                position: 'relative',
                overflow: 'hidden',
                textShadow: '0 4px 8px rgba(0,0,0,0.7)',
                backdropFilter: 'blur(25px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.08)';
                e.currentTarget.style.boxShadow = `
                  0 50px 100px rgba(66, 133, 244, 0.9),
                  0 0 80px rgba(52, 168, 83, 0.8),
                  inset 0 1px 0 rgba(255, 255, 255, 0.6)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `
                  0 30px 60px rgba(66, 133, 244, 0.7),
                  0 0 50px rgba(52, 168, 83, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5)
                `;
                e.currentTarget.style.background = `
                  linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)
                `;
              }}
            >
              <div>🛒 הוסף לסל</div>
              {quantities[service.id] && (
                <div style={{
                  fontSize: '1.2rem',
                  opacity: 0.98,
                  textShadow: '0 3px 6px rgba(0,0,0,0.7)'
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
        marginTop: '70px',
        padding: '50px',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: '1.4rem',
          textShadow: '0 3px 6px rgba(0,0,0,0.7)'
        }}>
          © 2024 SocialMax - השירותים המתקדמים ביותר ל-Google Business בישראל
        </p>
      </div>
    </div>
  );
};

export default GoogleBusinessServices;
