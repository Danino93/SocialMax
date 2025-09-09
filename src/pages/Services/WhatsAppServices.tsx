import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatsAppServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // שירותי בסיס
    {
      id: 'whatsapp_views',
      name: 'צפיות בווצאפ',
      description: 'הוספת צפיות לסטוריז וסטטוסים - הגברת חשיפה',
      price: '₪0.05',
      min: 50,
      max: 5000,
      icon: '👁️',
      category: 'שירותי בסיס',
      features: ['צפיות אמיתיות', 'מסירה מהירה', 'הגברת חשיפה', 'שיפור אלגוריתם']
    },
    {
      id: 'whatsapp_status_views',
      name: 'צפיות בסטטוס',
      description: 'הוספת צפיות לסטטוסים - נוכחות דיגיטלית',
      price: '₪0.04',
      min: 100,
      max: 10000,
      icon: '📱',
      category: 'שירותי בסיס',
      features: ['צפיות בסטטוס', 'נוכחות דיגיטלית', 'מסירה מדורגת', 'איכות גבוהה']
    },
    {
      id: 'whatsapp_story_views',
      name: 'צפיות בסטוריז',
      description: 'הוספת צפיות לסטוריז - תוכן ויזואלי',
      price: '₪0.06',
      min: 25,
      max: 3000,
      icon: '📸',
      category: 'שירותי בסיס',
      features: ['צפיות בסטוריז', 'תוכן ויזואלי', 'מסירה מהירה', 'שיפור ביצועים']
    },
    {
      id: 'whatsapp_contacts',
      name: 'הוספת אנשי קשר',
      description: 'הוספת אנשי קשר לחשבון - הרחבת רשת',
      price: '₪0.08',
      min: 10,
      max: 1000,
      icon: '👥',
      category: 'שירותי בסיס',
      features: ['הוספת אנשי קשר', 'הרחבת רשת', 'איכות גבוהה', 'מעקב אחר ביצועים']
    },
    {
      id: 'whatsapp_groups',
      name: 'הצטרפות לקבוצות',
      description: 'הצטרפות לקבוצות רלוונטיות - בניית קהילה',
      price: '₪0.12',
      min: 5,
      max: 100,
      icon: '👥',
      category: 'שירותי בסיס',
      features: ['הצטרפות לקבוצות', 'בניית קהילה', 'קבוצות רלוונטיות', 'מעקב אחר פעילות']
    },
    {
      id: 'whatsapp_business_profile',
      name: 'פרופיל עסקי',
      description: 'יצירת פרופיל עסקי מקצועי - נוכחות עסקית',
      price: '₪0.15',
      min: 1,
      max: 10,
      icon: '🏢',
      category: 'שירותי בסיס',
      features: ['פרופיל עסקי', 'נוכחות עסקית', 'עיצוב מקצועי', 'מיתוג מתקדם']
    },
    // שיווק מתקדם
    {
      id: 'whatsapp_broadcast',
      name: 'שידור הודעות',
      description: 'שידור הודעות לקהל רחב - שיווק מסיבי',
      price: '₪0.20',
      min: 1,
      max: 50,
      icon: '📢',
      category: 'שיווק מתקדם',
      features: ['שידור הודעות', 'שיווק מסיבי', 'קהל רחב', 'מעקב אחר ביצועים']
    },
    {
      id: 'whatsapp_catalog',
      name: 'קטלוג מוצרים',
      description: 'יצירת קטלוג מוצרים - מכירות מתקדמות',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '🛍️',
      category: 'שיווק מתקדם',
      features: ['קטלוג מוצרים', 'מכירות מתקדמות', 'עיצוב מקצועי', 'ניהול מלאי']
    },
    {
      id: 'whatsapp_automation',
      name: 'אוטומציה עסקית',
      description: 'אוטומציה עסקית מתקדמת - ניהול יעיל',
      price: '₪0.30',
      min: 1,
      max: 15,
      icon: '🤖',
      category: 'שיווק מתקדם',
      features: ['אוטומציה עסקית', 'ניהול יעיל', 'תגובות אוטומטיות', 'שירות לקוחות']
    },
    {
      id: 'whatsapp_analytics',
      name: 'אנליטיקס מתקדם',
      description: 'אנליטיקס מתקדם - ניתוח ביצועים',
      price: '₪0.35',
      min: 1,
      max: 10,
      icon: '📊',
      category: 'שיווק מתקדם',
      features: ['אנליטיקס מתקדם', 'ניתוח ביצועים', 'דוחות מפורטים', 'המלצות שיפור']
    },
    {
      id: 'whatsapp_crm',
      name: 'ניהול לקוחות',
      description: 'ניהול לקוחות מתקדם - CRM מלא',
      price: '₪0.40',
      min: 1,
      max: 8,
      icon: '👤',
      category: 'שיווק מתקדם',
      features: ['ניהול לקוחות', 'CRM מלא', 'מעקב אחר לקוחות', 'ניתוח התנהגות']
    },
    {
      id: 'whatsapp_payments',
      name: 'תשלומים',
      description: 'מערכת תשלומים מתקדמת - מכירות ישירות',
      price: '₪0.45',
      min: 1,
      max: 5,
      icon: '💳',
      category: 'שיווק מתקדם',
      features: ['מערכת תשלומים', 'מכירות ישירות', 'אבטחה מתקדמת', 'מעקב אחר תשלומים']
    },
    // הודעות
    {
      id: 'bulk_messaging',
      name: 'הודעות בכמויות גדולות',
      description: 'שליחת הודעות בכמויות גדולות - שיווק מסיבי',
      price: '₪0.15',
      min: 100,
      max: 10000,
      icon: '📨',
      category: 'הודעות',
      features: ['הודעות בכמויות גדולות', 'שיווק מסיבי', 'מסירה מהירה', 'מעקב אחר ביצועים']
    },
    {
      id: 'auto_replies',
      name: 'תגובות אוטומטיות',
      description: 'תגובות אוטומטיות חכמות - שירות לקוחות מתקדם',
      price: '₪0.25',
      min: 1,
      max: 20,
      icon: '🤖',
      category: 'הודעות',
      features: ['תגובות אוטומטיות', 'שירות לקוחות', 'AI מתקדם', 'תוכן מותאם']
    },
    {
      id: 'welcome_messages',
      name: 'הודעות ברכה',
      description: 'הודעות ברכה אוטומטיות - חוויית משתמש',
      price: '₪0.20',
      min: 1,
      max: 30,
      icon: '👋',
      category: 'הודעות',
      features: ['הודעות ברכה', 'חוויית משתמש', 'תוכן מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'scheduled_messages',
      name: 'הודעות מתוזמנות',
      description: 'שליחת הודעות מתוזמנות - אוטומציה מתקדמת',
      price: '₪0.30',
      min: 1,
      max: 25,
      icon: '⏰',
      category: 'הודעות',
      features: ['הודעות מתוזמנות', 'אוטומציה מתקדמת', 'תזמון מותאם', 'מעקב אחר ביצועים']
    },
    // לקוחות
    {
      id: 'customer_profiles',
      name: 'פרופילי לקוחות',
      description: 'ניהול פרופילי לקוחות מתקדם - CRM מלא',
      price: '₪0.35',
      min: 1,
      max: 15,
      icon: '👤',
      category: 'לקוחות',
      features: ['פרופילי לקוחות', 'CRM מלא', 'מעקב אחר לקוחות', 'ניתוח התנהגות']
    },
    {
      id: 'customer_segmentation',
      name: 'פילוח לקוחות',
      description: 'פילוח לקוחות מתקדם - מיקוד מדויק',
      price: '₪0.40',
      min: 1,
      max: 12,
      icon: '🎯',
      category: 'לקוחות',
      features: ['פילוח לקוחות', 'מיקוד מדויק', 'ניתוח התנהגות', 'אסטרטגיה מותאמת']
    },
    {
      id: 'customer_insights',
      name: 'תובנות לקוחות',
      description: 'תובנות לקוחות מתקדמות - ניתוח התנהגות',
      price: '₪0.45',
      min: 1,
      max: 10,
      icon: '🧠',
      category: 'לקוחות',
      features: ['תובנות לקוחות', 'ניתוח התנהגות', 'דוחות מפורטים', 'המלצות שיפור']
    },
    // קטלוג
    {
      id: 'product_catalog',
      name: 'קטלוג מוצרים',
      description: 'קטלוג מוצרים מתקדם - מכירות מתקדמות',
      price: '₪0.50',
      min: 1,
      max: 8,
      icon: '🛍️',
      category: 'קטלוג',
      features: ['קטלוג מוצרים', 'מכירות מתקדמות', 'עיצוב מקצועי', 'ניהול מלאי']
    },
    {
      id: 'order_management',
      name: 'ניהול הזמנות',
      description: 'ניהול הזמנות מתקדם - מעקב מלא',
      price: '₪0.55',
      min: 1,
      max: 6,
      icon: '📦',
      category: 'קטלוג',
      features: ['ניהול הזמנות', 'מעקב מלא', 'אוטומציה מתקדמת', 'דוחות מפורטים']
    },
    // שידור
    {
      id: 'broadcast_lists',
      name: 'רשימות שידור',
      description: 'ניהול רשימות שידור מתקדם - קמפיינים יעילים',
      price: '₪0.35',
      min: 1,
      max: 20,
      icon: '📢',
      category: 'שידור',
      features: ['רשימות שידור', 'קמפיינים יעילים', 'מיקוד מדויק', 'מעקב אחר ביצועים']
    },
    // ניתוח
    {
      id: 'message_analytics',
      name: 'אנליטיקס הודעות',
      description: 'אנליטיקס הודעות מתקדם - ניתוח ביצועים',
      price: '₪0.40',
      min: 1,
      max: 15,
      icon: '📊',
      category: 'ניתוח',
      features: ['אנליטיקס הודעות', 'ניתוח ביצועים', 'דוחות מפורטים', 'המלצות שיפור']
    },
    // מתקדמים
    {
      id: 'chatbot_integration',
      name: 'אינטגרציה עם בוטים',
      description: 'אינטגרציה עם בוטים חכמים - AI מתקדם',
      price: '₪0.60',
      min: 1,
      max: 5,
      icon: '🤖',
      category: 'מתקדמים',
      features: ['אינטגרציה עם בוטים', 'AI מתקדם', 'תגובות חכמות', 'מעקב אחר ביצועים']
    },
    {
      id: 'payment_integration',
      name: 'אינטגרציה עם תשלומים',
      description: 'אינטגרציה עם מערכות תשלום - מכירות ישירות',
      price: '₪0.65',
      min: 1,
      max: 4,
      icon: '💳',
      category: 'מתקדמים',
      features: ['אינטגרציה עם תשלומים', 'מכירות ישירות', 'אבטחה מתקדמת', 'מעקב אחר תשלומים']
    },
    {
      id: 'api_integration',
      name: 'אינטגרציה עם API',
      description: 'אינטגרציה עם API מתקדמת - חיבור מערכות',
      price: '₪0.70',
      min: 1,
      max: 3,
      icon: '🔗',
      category: 'מתקדמים',
      features: ['אינטגרציה עם API', 'חיבור מערכות', 'אוטומציה מתקדמת', 'מעקב אחר ביצועים']
    },
    {
      id: 'multi_language_support',
      name: 'תמיכה רב-לשונית',
      description: 'תמיכה רב-לשונית מתקדמת - שירות גלובלי',
      price: '₪0.55',
      min: 1,
      max: 6,
      icon: '🌍',
      category: 'מתקדמים',
      features: ['תמיכה רב-לשונית', 'שירות גלובלי', 'תרגום אוטומטי', 'מעקב אחר ביצועים']
    },
    {
      id: 'security_features',
      name: 'פיצ\'רי אבטחה',
      description: 'פיצ\'רי אבטחה מתקדמים - הגנה מקסימלית',
      price: '₪0.50',
      min: 1,
      max: 8,
      icon: '🔒',
      category: 'מתקדמים',
      features: ['פיצ\'רי אבטחה', 'הגנה מקסימלית', 'אבטחה מתקדמת', 'מעקב אחר ביצועים']
    }
  ];

  const categories = ['הכל', 'שירותי בסיס', 'שיווק מתקדם', 'הודעות', 'לקוחות', 'קטלוג', 'שידור', 'ניתוח', 'מתקדמים'];
  
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
    
    if (!service) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalPrice = calculatePrice(service, quantity);
    
    const cartItem = {
      id: serviceId,
      name: service.name,
      quantity: quantity,
      price: service.price,
      totalPrice: totalPrice,
      platform: 'WhatsApp Business'
    };
    
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // הודעת הצלחה
    alert(`✅ ${service.name} נוסף לסל בהצלחה!\nכמות: ${quantity.toLocaleString()}\nמחיר: ₪${calculatePrice(service, quantity)}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(37, 211, 102, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(18, 140, 126, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0, 200, 100, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(0, 255, 120, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #25d366 0%, #128c7e 50%, #075e54 100%)
      `,
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Animated Background Elements */}
      {/* Floating Circles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(37, 211, 102, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(0, 200, 100, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(18, 140, 126, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
        width: '4px',
        height: '4px',
        background: 'rgba(37, 211, 102, 0.8)',
        borderRadius: '50%',
        animation: 'sparkle 3s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '80%',
        width: '6px',
        height: '6px',
        background: 'rgba(0, 200, 100, 0.9)',
        borderRadius: '50%',
        animation: 'sparkle 4s ease-in-out infinite 1s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '60%',
        width: '3px',
        height: '3px',
        background: 'rgba(0, 255, 120, 0.7)',
        borderRadius: '50%',
        animation: 'sparkle 5s ease-in-out infinite 2s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        right: '40%',
        width: '3px',
        height: '3px',
        background: 'rgba(37, 211, 102, 0.6)',
        borderRadius: '50%',
        animation: 'sparkle 3.5s ease-in-out infinite 0.5s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '15%',
        width: '4px',
        height: '4px',
        background: 'rgba(18, 140, 126, 0.8)',
        borderRadius: '50%',
        animation: 'sparkle 4.5s ease-in-out infinite 1.5s',
        zIndex: 1
      }} />
      
      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '5%',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(45deg, rgba(37, 211, 102, 0.3), rgba(0, 200, 100, 0.3))',
        transform: 'rotate(45deg)',
        animation: 'drift 10s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40%',
        right: '10%',
        width: '30px',
        height: '30px',
        background: 'linear-gradient(45deg, rgba(18, 140, 126, 0.4), rgba(37, 211, 102, 0.4))',
        transform: 'rotate(45deg)',
        animation: 'drift 12s ease-in-out infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '65%',
        left: '25%',
        width: '25px',
        height: '25px',
        background: 'linear-gradient(45deg, rgba(0, 200, 100, 0.3), rgba(0, 255, 120, 0.3))',
        transform: 'rotate(45deg)',
        animation: 'drift 8s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Wave Effects */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 30% 20%, rgba(37, 211, 102, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(0, 200, 100, 0.1) 0%, transparent 50%)
        `,
        animation: 'wave 15s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Breathing Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(37, 211, 102, 0.05), transparent)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'breathe 8s ease-in-out infinite',
        zIndex: 1
      }} />
      
      {/* Twinkling Stars */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '20%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        animation: 'twinkle 2s ease-in-out infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: '3px',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        animation: 'twinkle 3s ease-in-out infinite 1s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        animation: 'twinkle 2.5s ease-in-out infinite 0.5s',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '35%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        animation: 'twinkle 3.5s ease-in-out infinite 1.5s',
        zIndex: 1
      }} />
      
      {/* Orbital Elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '80px',
        height: '80px',
        border: '2px solid rgba(37, 211, 102, 0.2)',
        borderRadius: '50%',
        animation: 'orbit 20s linear infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '4px',
        height: '4px',
        background: 'rgba(0, 200, 100, 0.8)',
        borderRadius: '50%',
        animation: 'orbit 20s linear infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '60px',
        height: '60px',
        border: '1px solid rgba(0, 200, 100, 0.15)',
        borderRadius: '50%',
        animation: 'orbit 15s linear infinite reverse',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '3px',
        height: '3px',
        background: 'rgba(0, 255, 120, 0.7)',
        borderRadius: '50%',
        animation: 'orbit 15s linear infinite reverse',
        zIndex: 1
      }} />
      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
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
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.3); }
            50% { box-shadow: 0 0 40px rgba(37, 211, 102, 0.6); }
          }
          
          @keyframes sparkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }
          
          @keyframes drift {
            0%, 100% { 
              transform: translateX(0px) translateY(0px) rotate(0deg); 
            }
            25% { 
              transform: translateX(10px) translateY(-5px) rotate(90deg); 
            }
            50% { 
              transform: translateX(0px) translateY(-10px) rotate(180deg); 
            }
            75% { 
              transform: translateX(-10px) translateY(-5px) rotate(270deg); 
            }
          }
          
          @keyframes wave {
            0%, 100% { 
              transform: scale(1) rotate(0deg); 
              opacity: 0.1; 
            }
            50% { 
              transform: scale(1.1) rotate(180deg); 
              opacity: 0.2; 
            }
          }
          
          @keyframes breathe {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1); 
              opacity: 0.05; 
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.2); 
              opacity: 0.1; 
            }
          }
          
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.5); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes orbit {
            0% { 
              transform: rotate(0deg) translateX(40px) rotate(0deg); 
            }
            100% { 
              transform: rotate(360deg) translateX(40px) rotate(-360deg); 
            }
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
          .service-card:nth-child(24) { animation-delay: 2.4s; }
          .service-card:nth-child(25) { animation-delay: 2.5s; }
          .service-card:nth-child(26) { animation-delay: 2.6s; }
          .service-card:nth-child(27) { animation-delay: 2.7s; }
          .service-card:nth-child(28) { animation-delay: 2.8s; }
        `}
      </style>

      {/* Header */}
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
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(74, 222, 128, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🛒 צפייה בסל
          </button>
          
          <button
            onClick={() => navigate('/register')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 15px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            📝 הרשמה
          </button>
          
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 15px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🔑 התחברות
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* WhatsApp Icon and Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* Background Glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(37, 211, 102, 0.1), transparent)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite',
            zIndex: 1
          }} />
          
          {/* Main Icon */}
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '25px',
            background: `
              linear-gradient(135deg, #25d366, #128c7e),
              radial-gradient(circle at 30% 30%, rgba(0, 200, 100, 0.3), transparent 70%),
              radial-gradient(circle at 70% 70%, rgba(0, 255, 120, 0.2), transparent 70%)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(37, 211, 102, 0.5), 0 0 50px rgba(0, 200, 100, 0.3), inset 0 0 20px rgba(0, 255, 120, 0.1)',
            position: 'relative',
            zIndex: 2,
            animation: 'glow 2s ease-in-out infinite alternate, pulse 3s ease-in-out infinite',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            border: '2px solid rgba(0, 200, 100, 0.3)',
            overflow: 'hidden',
            margin: '0 auto 20px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) rotate(8deg)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4), 0 0 60px rgba(37, 211, 102, 0.8), 0 0 80px rgba(0, 200, 100, 0.6), 0 0 100px rgba(0, 255, 120, 0.4), inset 0 0 30px rgba(0, 255, 120, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(37, 211, 102, 0.5), 0 0 50px rgba(0, 200, 100, 0.3), inset 0 0 20px rgba(0, 255, 120, 0.1)';
          }}
          >
            💬
          </div>
          
          {/* Floating Particles */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '8px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite',
            zIndex: 3
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '-15px',
            width: '6px',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            animation: 'float 5s ease-in-out infinite reverse',
            zIndex: 3
          }} />
        </div>

        {/* Title and Description */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '15px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3), 0 0 20px rgba(37, 211, 102, 0.5)',
            background: 'linear-gradient(135deg, #ffffff, #e0f7fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'glow 3s ease-in-out infinite alternate'
          }}>
            שירותי WhatsApp Business
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            הפלטפורמה המתקדמת ביותר לשיווק וניהול עסקי בווצאפ - כלים מקצועיים להצלחה דיגיטלית
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '40px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, rgba(37, 211, 102, 0.3), rgba(0, 200, 100, 0.2))'
                  : 'rgba(255,255,255,0.1)',
                border: selectedCategory === category 
                  ? '2px solid rgba(37, 211, 102, 0.5)'
                  : '2px solid rgba(255,255,255,0.2)',
                borderRadius: '25px',
                padding: '12px 25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                boxShadow: selectedCategory === category 
                  ? '0 8px 25px rgba(37, 211, 102, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : '0 4px 15px rgba(0,0,0,0.1)',
                fontWeight: '600',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.border = '2px solid rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.border = '2px solid rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%),
                  radial-gradient(circle at top right, rgba(37, 211, 102, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 200, 100, 0.1) 0%, transparent 50%)
                `,
                borderRadius: '30px',
                padding: '30px',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255,255,255,0.25)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 20px rgba(37, 211, 102, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.05) rotateX(5deg)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%),
                  radial-gradient(circle at top right, rgba(37, 211, 102, 0.25) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 200, 100, 0.2) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25), 0 0 40px rgba(37, 211, 102, 0.4), 0 0 60px rgba(0, 200, 100, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)';
                e.currentTarget.style.border = '2px solid rgba(255,255,255,0.5)';
                e.currentTarget.style.backdropFilter = 'blur(25px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%),
                  radial-gradient(circle at top right, rgba(37, 211, 102, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at bottom left, rgba(0, 200, 100, 0.1) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15), 0 0 20px rgba(37, 211, 102, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
                e.currentTarget.style.border = '2px solid rgba(255,255,255,0.25)';
                e.currentTarget.style.backdropFilter = 'blur(20px)';
              }}
            >
              {/* Hover Effect Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
                zIndex: 1
              }} />
              
              {/* Service Icon */}
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '15px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                {service.icon}
              </div>
              
              {/* Service Name */}
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '10px',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 2
              }}>
                {service.name}
              </h3>
              
              {/* Service Description */}
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '15px',
                lineHeight: '1.5',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                {service.description}
              </p>
              
              {/* Service Price */}
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#4ade80',
                textAlign: 'center',
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 2
              }}>
                {service.price}
              </div>
              
              {/* Service Features */}
              <div style={{
                marginBottom: '20px',
                position: 'relative',
                zIndex: 2
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '10px',
                  textAlign: 'center'
                }}>
                  תכונות:
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '5px',
                      paddingRight: '15px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#4ade80',
                        fontSize: '0.8rem'
                      }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Calculator */}
              {showCalculator === service.id && (
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <h4 style={{
                    color: 'white',
                    marginBottom: '15px',
                    textAlign: 'center',
                    fontSize: '1.1rem'
                  }}>
                    מחשבון מחיר
                  </h4>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '15px',
                    flexWrap: 'wrap'
                  }}>
                    <label style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      כמות:
                    </label>
                    
                    <input
                      type="range"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                      style={{
                        flex: 1,
                        minWidth: '150px',
                        height: '6px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        width: '80px',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    textAlign: 'center',
                    padding: '15px',
                    background: 'rgba(37, 211, 102, 0.2)',
                    borderRadius: '10px',
                    border: '1px solid rgba(37, 211, 102, 0.3)'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      color: '#4ade80',
                      fontWeight: 'bold',
                      marginBottom: '5px'
                    }}>
                      סה"כ: ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      {quantities[service.id] || service.min} × {service.price}
                    </div>
                  </div>
                  
                  {/* Floating Icons */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '1.5rem',
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                    💎
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px',
                position: 'relative',
                zIndex: 2
              }}>
                <button
                  onClick={() => setShowCalculator(showCalculator === service.id ? null : service.id)}
                  style={{
                    flex: 1,
                    background: `
                      linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%),
                      radial-gradient(circle at top left, rgba(37, 211, 102, 0.1) 0%, transparent 50%)
                    `,
                    border: '2px solid rgba(255,255,255,0.35)',
                    borderRadius: '20px',
                    padding: '15px',
                    color: 'white',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15), 0 0 15px rgba(37, 211, 102, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.2) 100%),
                      radial-gradient(circle at top left, rgba(37, 211, 102, 0.2) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25), 0 0 25px rgba(37, 211, 102, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.6)';
                    e.currentTarget.style.backdropFilter = 'blur(20px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%),
                      radial-gradient(circle at top left, rgba(37, 211, 102, 0.1) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15), 0 0 15px rgba(37, 211, 102, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.35)';
                    e.currentTarget.style.backdropFilter = 'blur(15px)';
                  }}
                >
                  {showCalculator === service.id ? 'סגור מחשבון' : 'מחשבון מחיר'}
                </button>
                
                <button
                  onClick={() => handleAddToCart(service.id)}
                  style={{
                    flex: 1,
                    background: `
                      linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 50%)
                    `,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '20px',
                    padding: '15px',
                    color: 'white',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontWeight: 'bold',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(74, 222, 128, 0.4), 0 0 15px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, #5eea8f 0%, #34d399 50%, #22c55e 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.3) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(74, 222, 128, 0.6), 0 0 25px rgba(34, 197, 94, 0.5), 0 0 35px rgba(22, 163, 74, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.5)';
                    e.currentTarget.style.backdropFilter = 'blur(15px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = `
                      linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%),
                      radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 50%)
                    `;
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4), 0 0 15px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                    e.currentTarget.style.backdropFilter = 'blur(10px)';
                  }}
                >
                  🛒 הוסף לסל
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.9rem',
          marginTop: '40px',
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p>© 2024 SocialMax - כל הזכויות שמורות</p>
          <p>שירותי קידום מדיה חברתית מקצועיים</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppServices;
