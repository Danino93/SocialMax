import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacebookServices: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showCalculator, setShowCalculator] = useState<string | null>(null);

  const services = [
    // לייקים
    {
      id: 'page_likes',
      name: 'לייקים לדף',
      description: 'הוספת לייקים לדף הפייסבוק - הגברת מעורבות',
      price: '₪0.08',
      min: 100,
      max: 50000,
      icon: '👍',
      category: 'לייקים',
      features: ['לייקים ממוקדי מיקום', 'תחומי עניין רלוונטיים', 'פרופילים אמיתיים', 'מסירה מדורגת']
    },
    {
      id: 'post_likes',
      name: 'לייקים לפוסטים',
      description: 'הוספת לייקים לפוסטים - הגברת מעורבות',
      price: '₪0.03',
      min: 50,
      max: 10000,
      icon: '❤️',
      category: 'לייקים',
      features: ['כל סוגי הריאקציות', 'לייקים אמיתיים', 'מסירה מהירה', 'הגדלת חשיפה']
    },
    {
      id: 'reaction_likes',
      name: 'ריאקציות לפוסטים',
      description: 'הוספת ריאקציות לפוסטים - הגברת מעורבות',
      price: '₪0.04',
      min: 20,
      max: 5000,
      icon: '😍',
      category: 'לייקים',
      features: ['ריאקציות מגוונות', 'אמוג\'ים מותאמים', 'מסירה מהירה', 'הגדלת אינטראקציה']
    },
    {
      id: 'photo_likes',
      name: 'לייקים לתמונות',
      description: 'הוספת לייקים לתמונות - הגברת מעורבות',
      price: '₪0.03',
      min: 30,
      max: 3000,
      icon: '📸',
      category: 'לייקים',
      features: ['לייקים לתמונות', 'מסירה מהירה', 'הגדלת חשיפה', 'שיפור אלגוריתם']
    },
    {
      id: 'video_likes',
      name: 'לייקים לסרטונים',
      description: 'הוספת לייקים לסרטונים - הגברת מעורבות',
      price: '₪0.05',
      min: 50,
      max: 5000,
      icon: '🎥',
      category: 'לייקים',
      features: ['לייקים לסרטונים', 'מסירה מהירה', 'הגדלת חשיפה', 'שיפור אלגוריתם']
    },
    // עוקבים
    {
      id: 'page_followers',
      name: 'עוקבים לדף',
      description: 'הוספת עוקבים לדף הפייסבוק - הגברת מספר העוקבים',
      price: '₪0.12',
      min: 50,
      max: 25000,
      icon: '👥',
      category: 'עוקבים',
      features: ['פרופילים מלאים', 'עוקבים פעילים', 'מיקוד דמוגרפי', 'אחריות למילוי חוזר']
    },
    {
      id: 'premium_followers',
      name: 'עוקבים פרמיום',
      description: 'הוספת עוקבים פרמיום - איכות גבוהה',
      price: '₪0.18',
      min: 25,
      max: 10000,
      icon: '⭐',
      category: 'עוקבים',
      features: ['עוקבים פרמיום', 'איכות גבוהה', 'פרופילים מאומתים', 'מסירה מדורגת']
    },
    {
      id: 'local_followers',
      name: 'עוקבים מקומיים',
      description: 'הוספת עוקבים מקומיים - מיקוד גיאוגרפי',
      price: '₪0.15',
      min: 30,
      max: 8000,
      icon: '📍',
      category: 'עוקבים',
      features: ['עוקבים מקומיים', 'מיקוד גיאוגרפי', 'רלוונטיות מקומית', 'מסירה מדורגת']
    },
    {
      id: 'business_followers',
      name: 'עוקבים עסקיים',
      description: 'הוספת עוקבים עסקיים - קהל מקצועי',
      price: '₪0.20',
      min: 20,
      max: 5000,
      icon: '🏢',
      category: 'עוקבים',
      features: ['עוקבים עסקיים', 'קהל מקצועי', 'מיקוד תעשייתי', 'מסירה מדורגת']
    },
    // תגובות
    {
      id: 'post_comments',
      name: 'תגובות לפוסטים',
      description: 'הוספת תגובות לפוסטים - הגברת מעורבות',
      price: '₪0.08',
      min: 10,
      max: 500,
      icon: '💬',
      category: 'תגובות',
      features: ['טקסט מותאם', 'תמונות מותאמות', 'תוכן איכותי', 'מסירה מדורגת']
    },
    {
      id: 'advanced_comments',
      name: 'תגובות מתקדמות',
      description: 'הוספת תגובות מתקדמות - תוכן מותאם',
      price: '₪0.12',
      min: 5,
      max: 200,
      icon: '🎭',
      category: 'תגובות',
      features: ['תגובות מתקדמות', 'תוכן מותאם', 'GIFs ומדבקות', 'מסירה מהירה']
    },
    {
      id: 'comment_replies',
      name: 'תשובות לתגובות',
      description: 'הוספת תשובות לתגובות - אינטראקציה מתמשכת',
      price: '₪0.10',
      min: 5,
      max: 100,
      icon: '↩️',
      category: 'תגובות',
      features: ['תשובות לתגובות', 'אינטראקציה מתמשכת', 'תוכן מותאם', 'מסירה מדורגת']
    },
    // שיתופים
    {
      id: 'post_shares',
      name: 'שיתופים לפוסטים',
      description: 'הוספת שיתופים לפוסטים - הגדלת ויראליות',
      price: '₪0.06',
      min: 20,
      max: 2000,
      icon: '📤',
      category: 'שיתופים',
      features: ['שיתופים אורגניים', 'שיתופים מזויפים', 'הגדלת ויראליות', 'מסירה מדורגת']
    },
    {
      id: 'targeted_shares',
      name: 'שיתופים ממוקדים',
      description: 'הוספת שיתופים ממוקדים - מיקוד דמוגרפי',
      price: '₪0.10',
      min: 10,
      max: 500,
      icon: '🎯',
      category: 'שיתופים',
      features: ['שיתופים ממוקדים', 'מיקוד דמוגרפי', 'קהל רלוונטי', 'מסירה מדורגת']
    },
    {
      id: 'group_shares',
      name: 'שיתופים בקבוצות',
      description: 'הוספת שיתופים בקבוצות - הגברת חשיפה',
      price: '₪0.08',
      min: 15,
      max: 300,
      icon: '👥',
      category: 'שיתופים',
      features: ['שיתופים בקבוצות', 'הגברת חשיפה', 'קהילות רלוונטיות', 'מסירה מדורגת']
    },
    // צפיות
    {
      id: 'video_views',
      name: 'צפיות בסרטונים',
      description: 'הוספת צפיות לסרטונים - הגברת חשיפה',
      price: '₪0.04',
      min: 100,
      max: 10000,
      icon: '📹',
      category: 'צפיות',
      features: ['צפיות איכותיות', 'זמן צפייה גבוה', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    {
      id: 'story_views',
      name: 'צפיות בסטוריז',
      description: 'הוספת צפיות בסטוריז - הגברת חשיפה',
      price: '₪0.04',
      min: 100,
      max: 5000,
      icon: '👁️',
      category: 'צפיות',
      features: ['מעקב 24 שעות', 'צפיות אמיתיות', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'page_views',
      name: 'צפיות בדף',
      description: 'הוספת צפיות בדף הפייסבוק - הגברת חשיפה',
      price: '₪0.05',
      min: 200,
      max: 15000,
      icon: '📊',
      category: 'צפיות',
      features: ['צפיות בדף', 'הגברת חשיפה', 'מסירה מדורגת', 'שיפור אלגוריתם']
    },
    {
      id: 'photo_views',
      name: 'צפיות בתמונות',
      description: 'הוספת צפיות בתמונות - הגברת חשיפה',
      price: '₪0.03',
      min: 50,
      max: 3000,
      icon: '🖼️',
      category: 'צפיות',
      features: ['צפיות בתמונות', 'הגברת חשיפה', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    // פיצ'רים מתקדמים
    {
      id: 'competitor_analysis',
      name: 'ניתוח מתחרים',
      description: 'ניתוח מתחרים וזיהוי הזדמנויות - אסטרטגיה מתקדמת',
      price: '₪0.35',
      min: 1,
      max: 50,
      icon: '🔍',
      category: 'מתקדמים',
      features: ['ניתוח מתחרים', 'זיהוי הזדמנויות', 'דוחות מפורטים', 'אסטרטגיה מתקדמת']
    },
    {
      id: 'auto_posting',
      name: 'פרסום אוטומטי',
      description: 'פרסום אוטומטי של תוכן - ניהול תוכן יעיל',
      price: '₪0.25',
      min: 1,
      max: 30,
      icon: '⏰',
      category: 'מתקדמים',
      features: ['פרסום אוטומטי', 'ניהול תוכן', 'תזמון מותאם', 'מעקב אחר ביצועים']
    },
    {
      id: 'admin_assist',
      name: 'עזרה בניהול',
      description: 'עזרה בניהול הדף והקבוצות - ניהול מקצועי',
      price: '₪0.30',
      min: 1,
      max: 20,
      icon: '🛠️',
      category: 'מתקדמים',
      features: ['עזרה בניהול', 'ניהול מקצועי', 'תמיכה 24/7', 'ייעוץ אסטרטגי']
    },
    {
      id: 'member_cleanup',
      name: 'ניקוי חברים',
      description: 'ניקוי חברים לא פעילים - אופטימיזציה של הקהילה',
      price: '₪0.20',
      min: 1,
      max: 25,
      icon: '🧹',
      category: 'מתקדמים',
      features: ['ניקוי חברים', 'אופטימיזציה של הקהילה', 'זיהוי לא פעילים', 'ניהול יעיל']
    },
    {
      id: 'member_reactivation',
      name: 'הפעלת חברים מחדש',
      description: 'הפעלת חברים לא פעילים - חידוש הקהילה',
      price: '₪0.22',
      min: 1,
      max: 30,
      icon: '🔄',
      category: 'מתקדמים',
      features: ['הפעלת חברים', 'חידוש הקהילה', 'תוכן מותאם', 'מעקב אחר פעילות']
    },
    {
      id: 'auto_reports',
      name: 'דוחות אוטומטיים',
      description: 'יצירת דוחות אוטומטיים - מעקב אחר ביצועים',
      price: '₪0.28',
      min: 1,
      max: 20,
      icon: '📊',
      category: 'מתקדמים',
      features: ['דוחות אוטומטיים', 'מעקב אחר ביצועים', 'ניתוח נתונים', 'המלצות שיפור']
    },
    {
      id: 'live_stream_views',
      name: 'צפיות בשידורים חיים',
      description: 'הוספת צפיות לשידורים חיים - הגברת מעורבות',
      price: '₪0.15',
      min: 50,
      max: 2000,
      icon: '📺',
      category: 'מתקדמים',
      features: ['צפיות בשידורים חיים', 'הגברת מעורבות', 'מסירה מהירה', 'שיפור אלגוריתם']
    },
    {
      id: 'voice_message_listening',
      name: 'האזנה להודעות קוליות',
      description: 'האזנה להודעות קוליות - מעקב אחר תוכן',
      price: '₪0.18',
      min: 10,
      max: 100,
      icon: '🎙️',
      category: 'מתקדמים',
      features: ['האזנה להודעות קוליות', 'מעקב אחר תוכן', 'ניתוח תוכן', 'דוחות מפורטים']
    },
    {
      id: 'bot_stars',
      name: 'כוכבים לבוטים',
      description: 'הוספת כוכבים לבוטים - העלאת דירוג',
      price: '₪0.12',
      min: 5,
      max: 50,
      icon: '⭐',
      category: 'מתקדמים',
      features: ['כוכבים לבוטים', 'העלאת דירוג', 'שיפור ביצועים', 'מסירה מהירה']
    },
    {
      id: 'privacy_management',
      name: 'ניהול פרטיות',
      description: 'ניהול פרטיות הדף והקבוצות - אבטחה מתקדמת',
      price: '₪0.25',
      min: 1,
      max: 15,
      icon: '🔒',
      category: 'מתקדמים',
      features: ['ניהול פרטיות', 'אבטחה מתקדמת', 'הגנה על תוכן', 'ניהול הרשאות']
    },
    {
      id: 'moderator_monitoring',
      name: 'מעקב אחר מנהלים',
      description: 'מעקב אחר מנהלים ומודרטורים - ניהול צוות',
      price: '₪0.30',
      min: 1,
      max: 20,
      icon: '👮',
      category: 'מתקדמים',
      features: ['מעקב אחר מנהלים', 'ניהול צוות', 'דוחות פעילות', 'ייעוץ ניהולי']
    },
    {
      id: 'group_chats',
      name: 'ניהול צ\'אטים בקבוצות',
      description: 'ניהול צ\'אטים בקבוצות - אוטומציה מתקדמת',
      price: '₪0.35',
      min: 1,
      max: 25,
      icon: '💬',
      category: 'מתקדמים',
      features: ['ניהול צ\'אטים', 'אוטומציה מתקדמת', 'תוכן מותאם', 'מעקב אחר שיחות']
    },
    {
      id: 'qa_sessions',
      name: 'מפגשי שאלות ותשובות',
      description: 'ניהול מפגשי שאלות ותשובות - אינטראקציה עם הקהל',
      price: '₪0.40',
      min: 1,
      max: 15,
      icon: '❓',
      category: 'מתקדמים',
      features: ['מפגשי שאלות ותשובות', 'אינטראקציה עם הקהל', 'ניהול תוכן', 'מעקב אחר ביצועים']
    },
    {
      id: 'content_cleanup',
      name: 'ניקוי תוכן',
      description: 'ניקוי תוכן לא רלוונטי - אופטימיזציה של הדף',
      price: '₪0.20',
      min: 1,
      max: 30,
      icon: '🧽',
      category: 'מתקדמים',
      features: ['ניקוי תוכן', 'אופטימיזציה של הדף', 'זיהוי תוכן לא רלוונטי', 'ניהול יעיל']
    },
    {
      id: 'ai_optimization',
      name: 'אופטימיזציה ב-AI',
      description: 'אופטימיזציה של תוכן באמצעות AI - טכנולוגיה מתקדמת',
      price: '₪0.45',
      min: 1,
      max: 20,
      icon: '🤖',
      category: 'מתקדמים',
      features: ['אופטימיזציה ב-AI', 'טכנולוגיה מתקדמת', 'ניתוח תוכן', 'המלצות מותאמות']
    },
    {
      id: 'facebook_reels',
      name: 'Facebook Reels',
      description: 'יצירה וקידום של Facebook Reels - תוכן ויראלי',
      price: '₪0.35',
      min: 1,
      max: 25,
      icon: '🎬',
      category: 'מתקדמים',
      features: ['יצירת Facebook Reels', 'קידום תוכן ויראלי', 'אופטימיזציה לויראליות', 'מעקב אחר ביצועים']
    },
    {
      id: 'messenger_chatbots',
      name: 'בוטים למסנג\'ר',
      description: 'יצירה וניהול של בוטים למסנג\'ר - אוטומציה מתקדמת',
      price: '₪0.50',
      min: 1,
      max: 15,
      icon: '🤖',
      category: 'מתקדמים',
      features: ['בוטים למסנג\'ר', 'אוטומציה מתקדמת', 'תוכן מותאם', 'מעקב אחר שיחות']
    },
    {
      id: 'live_stream_filters',
      name: 'מסננים לשידורים חיים',
      description: 'יצירה וניהול של מסננים לשידורים חיים - תוכן אינטראקטיבי',
      price: '₪0.30',
      min: 1,
      max: 20,
      icon: '🎭',
      category: 'מתקדמים',
      features: ['מסננים לשידורים חיים', 'תוכן אינטראקטיבי', 'יצירה מותאמת', 'מעקב אחר שימוש']
    },
    {
      id: 'group_reels_sharing',
      name: 'שיתוף רילס בקבוצות',
      description: 'שיתוף אוטומטי של רילס בקבוצות - הגברת חשיפה',
      price: '₪0.25',
      min: 1,
      max: 30,
      icon: '📤',
      category: 'מתקדמים',
      features: ['שיתוף אוטומטי של רילס', 'הגברת חשיפה', 'קבוצות רלוונטיות', 'מעקב אחר ביצועים']
    },
    {
      id: 'event_story_sharing',
      name: 'שיתוף סטוריז של אירועים',
      description: 'שיתוף אוטומטי של סטוריז של אירועים - קידום אירועים',
      price: '₪0.28',
      min: 1,
      max: 25,
      icon: '📅',
      category: 'מתקדמים',
      features: ['שיתוף סטוריז של אירועים', 'קידום אירועים', 'תוכן מותאם', 'מעקב אחר השתתפות']
    },
    {
      id: 'custom_group_profiles',
      name: 'פרופילים מותאמים לקבוצות',
      description: 'יצירה וניהול של פרופילים מותאמים לקבוצות - מותאמות אישית',
      price: '₪0.35',
      min: 1,
      max: 20,
      icon: '👤',
      category: 'מתקדמים',
      features: ['פרופילים מותאמים', 'מותאמות אישית', 'עיצוב מותאם', 'ניהול יעיל']
    },
    {
      id: 'advanced_post_editing',
      name: 'עריכת פוסטים מתקדמת',
      description: 'עריכת פוסטים מתקדמת - אופטימיזציה של תוכן',
      price: '₪0.20',
      min: 1,
      max: 40,
      icon: '✏️',
      category: 'מתקדמים',
      features: ['עריכת פוסטים מתקדמת', 'אופטימיזציה של תוכן', 'שיפור ביצועים', 'מעקב אחר תוצאות']
    },
    {
      id: 'improved_post_approval',
      name: 'שיפור אישור פוסטים',
      description: 'שיפור תהליך אישור פוסטים - ניהול תוכן יעיל',
      price: '₪0.25',
      min: 1,
      max: 30,
      icon: '✅',
      category: 'מתקדמים',
      features: ['שיפור אישור פוסטים', 'ניהול תוכן יעיל', 'תהליך מהיר', 'מעקב אחר אישורים']
    }
  ];

  const categories = ['הכל', 'לייקים', 'עוקבים', 'תגובות', 'שיתופים', 'צפיות', 'מתקדמים'];
  
  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const calculatePrice = (service: any, quantity: number) => {
    const pricePerUnit = parseFloat(service.price.replace('₪', ''));
    return (pricePerUnit * quantity).toFixed(2);
  };

  const handleQuantityChange = (serviceId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: value
    }));
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

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%)
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
        background: 'radial-gradient(circle, rgba(24, 119, 242, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(255, 119, 198, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(120, 219, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '30%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40%',
        right: '10%',
        width: '90px',
        height: '90px',
        background: 'radial-gradient(circle, rgba(255, 193, 7, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 9s ease-in-out infinite',
        zIndex: 0
      }} />
      
      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
        width: '4px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '80%',
        width: '6px',
        height: '6px',
        background: 'rgba(24, 119, 242, 0.6)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '60%',
        width: '3px',
        height: '3px',
        background: 'rgba(255, 119, 198, 0.7)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '15%',
        width: '5px',
        height: '5px',
        background: 'rgba(74, 222, 128, 0.8)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '60%',
        right: '40%',
        width: '4px',
        height: '4px',
        background: 'rgba(255, 193, 7, 0.9)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }} />
      
      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '70%',
        width: '40px',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'rotate(45deg)',
        animation: 'float 12s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '25%',
        width: '30px',
        height: '30px',
        background: 'rgba(24, 119, 242, 0.15)',
        transform: 'rotate(45deg)',
        animation: 'float 14s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      
      {/* Wave-like Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '0%',
        width: '200px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
        animation: 'wave 8s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '0%',
        width: '150px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(24, 119, 242, 0.4) 50%, transparent 100%)',
        animation: 'wave 10s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        width: '180px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.3) 50%, transparent 100%)',
        animation: 'wave 12s ease-in-out infinite',
        zIndex: 0
      }} />
      
      {/* Sparkle Effects */}
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '25%',
        fontSize: '1.5rem',
        animation: 'sparkle 3s ease-in-out infinite',
        zIndex: 0
      }}>
        ✨
      </div>
      <div style={{
        position: 'absolute',
        top: '65%',
        right: '35%',
        fontSize: '1.2rem',
        animation: 'sparkle 4s ease-in-out infinite reverse',
        zIndex: 0
      }}>
        ⭐
      </div>
      <div style={{
        position: 'absolute',
        bottom: '35%',
        left: '45%',
        fontSize: '1rem',
        animation: 'sparkle 5s ease-in-out infinite',
        zIndex: 0
      }}>
        💫
      </div>
      <div style={{
        position: 'absolute',
        top: '45%',
        right: '20%',
        fontSize: '1.3rem',
        animation: 'sparkle 6s ease-in-out infinite reverse',
        zIndex: 0
      }}>
        🌟
      </div>
      
      {/* Drifting Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '0%',
        width: '8px',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        animation: 'drift 15s linear infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '80%',
        left: '0%',
        width: '6px',
        height: '6px',
        background: 'rgba(24, 119, 242, 0.7)',
        borderRadius: '50%',
        animation: 'drift 18s linear infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '0%',
        width: '4px',
        height: '4px',
        background: 'rgba(255, 119, 198, 0.8)',
        borderRadius: '50%',
        animation: 'drift 20s linear infinite',
        zIndex: 0
      }} />
      
      {/* Breathing Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        width: '50px',
        height: '50px',
        background: 'radial-gradient(circle, rgba(255, 193, 7, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'breathe 6s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '50%',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(120, 219, 255, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'breathe 8s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      
      {/* Twinkling Stars */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '85%',
        fontSize: '1rem',
        animation: 'twinkle 2s ease-in-out infinite',
        zIndex: 0
      }}>
        ✨
      </div>
      <div style={{
        position: 'absolute',
        top: '75%',
        left: '10%',
        fontSize: '0.8rem',
        animation: 'twinkle 3s ease-in-out infinite reverse',
        zIndex: 0
      }}>
        ⭐
      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '90%',
        fontSize: '0.9rem',
        animation: 'twinkle 4s ease-in-out infinite',
        zIndex: 0
      }}>
        💫
      </div>
      
      {/* Orbital Elements */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '5%',
        width: '2px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        animation: 'orbit 10s linear infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '5%',
        width: '3px',
        height: '3px',
        background: 'rgba(24, 119, 242, 0.8)',
        borderRadius: '50%',
        animation: 'orbit 12s linear infinite reverse',
        zIndex: 0
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
            0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(-100px) scaleX(0); opacity: 0; }
            50% { transform: translateX(0px) scaleX(1); opacity: 1; }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
          }
          
          @keyframes drift {
            0% { transform: translateX(-100px) translateY(0px); }
            25% { transform: translateX(100px) translateY(-20px); }
            50% { transform: translateX(200px) translateY(0px); }
            75% { transform: translateX(100px) translateY(20px); }
            100% { transform: translateX(-100px) translateY(0px); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
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
        `}
      </style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white'
      }}>
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

        {/* Center - Facebook Icon with Special Effects */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          position: 'relative'
        }}>
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 119, 242, 0.3) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
            zIndex: 1
          }} />
          
          {/* Main Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1877f2, #42a5f5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(24, 119, 242, 0.5)',
            position: 'relative',
            zIndex: 2,
            animation: 'glow 2s ease-in-out infinite alternate',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 50px rgba(24, 119, 242, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3), 0 0 30px rgba(24, 119, 242, 0.5)';
          }}
          >
            📘
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
        <h1 style={{
          color: 'white',
          fontSize: '2.8rem',
          fontWeight: 'bold',
          margin: '0 0 15px 0',
          textAlign: 'center',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1,
          animation: 'glow 3s ease-in-out infinite alternate'
        }}>
          🚀 שירותי Facebook
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.3rem',
          textAlign: 'center',
          marginBottom: '40px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          position: 'relative',
          zIndex: 1,
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>
          ✨ כל השירותים הדרושים לקידום עמוד הפייסבוק שלך ✨
        </p>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, rgba(24, 119, 242, 0.4) 0%, rgba(66, 165, 245, 0.3) 100%)' 
                  : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                border: selectedCategory === category 
                  ? '1px solid rgba(24, 119, 242, 0.5)' 
                  : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '30px',
                padding: '12px 25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backdropFilter: 'blur(10px)',
                boxShadow: selectedCategory === category 
                  ? '0 8px 25px rgba(24, 119, 242, 0.3)' 
                  : '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.4)';
                } else {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(24, 119, 242, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                } else {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(24, 119, 242, 0.3)';
                }
              }}
            >
              {selectedCategory === category && '✨ '}{category}{selectedCategory === category && ' ✨'}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
                  radial-gradient(circle at top right, rgba(24, 119, 242, 0.1) 0%, transparent 50%)
                `,
                borderRadius: '25px',
                padding: '25px',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%),
                  radial-gradient(circle at top right, rgba(24, 119, 242, 0.2) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2), 0 0 30px rgba(24, 119, 242, 0.3)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = `
                  linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
                  radial-gradient(circle at top right, rgba(24, 119, 242, 0.1) 0%, transparent 50%)
                `;
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
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
                pointerEvents: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-100%)';
              }}
              />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginLeft: '15px'
                }}>
                  {service.icon}
                </div>
                <div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    margin: '0 0 5px 0'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    margin: '0'
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: '#4ade80',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {service.price}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  {service.min.toLocaleString()} - {service.max.toLocaleString()}
                </span>
              </div>

              <div style={{
                marginBottom: '20px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1rem',
                  margin: '0 0 10px 0'
                }}>
                  יתרונות:
                </h4>
                <ul style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  margin: '0',
                  paddingRight: '20px'
                }}>
                  {service.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Calculator */}
              {showCalculator === service.id && (
                <div style={{
                  background: `
                    linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%),
                    radial-gradient(circle at bottom left, rgba(24, 119, 242, 0.1) 0%, transparent 50%)
                  `,
                  borderRadius: '20px',
                  padding: '25px',
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(15px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'slideInUp 0.5s ease-out'
                }}>
                  {/* Animated Background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(24, 119, 242, 0.05) 50%, transparent 70%)',
                    animation: 'float 8s ease-in-out infinite',
                    pointerEvents: 'none'
                  }} />
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    margin: '0 0 15px 0'
                  }}>
                    בחר כמות:
                  </h4>
                  
                  <div style={{
                    marginBottom: '15px'
                  }}>
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
                        background: 'rgba(255,255,255,0.3)',
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

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <input
                      type="number"
                      min={service.min}
                      max={service.max}
                      value={quantities[service.id] || service.min}
                      onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value) || service.min)}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '1rem',
                        width: '120px',
                        textAlign: 'center'
                      }}
                      placeholder="כמות"
                    />
                    <span style={{
                      color: 'white',
                      fontSize: '1rem'
                    }}>
                      יחידות
                    </span>
                  </div>

                  <div style={{
                    background: `
                      linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%),
                      radial-gradient(circle at center, rgba(74, 222, 128, 0.1) 0%, transparent 70%)
                    `,
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(74, 222, 128, 0.2)'
                  }}>
                    {/* Animated Background */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(74, 222, 128, 0.1) 50%, transparent 70%)',
                      animation: 'float 6s ease-in-out infinite reverse',
                      pointerEvents: 'none'
                    }} />
                    
                    <div style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.9rem',
                      marginBottom: '8px',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      💰 מחיר כולל:
                    </div>
                    <div style={{
                      color: '#4ade80',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      position: 'relative',
                      zIndex: 1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      ₪{calculatePrice(service, quantities[service.id] || service.min)}
                    </div>
                    
                    {/* Sparkle Effect */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '15px',
                      fontSize: '1.2rem',
                      animation: 'float 3s ease-in-out infinite',
                      zIndex: 1
                    }}>
                      ✨
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '15px',
                      fontSize: '1rem',
                      animation: 'float 4s ease-in-out infinite reverse',
                      zIndex: 1
                    }}>
                      💎
                    </div>
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
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '15px',
                    padding: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
                  }}
                >
                  {showCalculator === service.id ? 'סגור מחשבון' : 'מחשבון מחיר'}
                </button>
                
                <button
                  onClick={() => handleAddToCart(service.id)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontWeight: 'bold',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5eea8f 0%, #34d399 50%, #22c55e 100%)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(74, 222, 128, 0.5), 0 0 20px rgba(74, 222, 128, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 222, 128, 0.3)';
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

export default FacebookServices;