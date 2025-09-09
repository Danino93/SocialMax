import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TwitterServices: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Array<{id: string, name: string, quantity: number, price: number}>>([]);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('twitterCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const services = [
    // עוקבים
    {
      id: 'twitter_followers',
      name: 'עוקבים טוויטר',
      description: 'עוקבים איכותיים ופעילים - דומיננטיות בטוויטר',
      price: 0.15,
      min: 100,
      max: 10000,
      category: 'עוקבים',
      icon: '👥'
    },
    {
      id: 'twitter_followers_premium',
      name: 'עוקבים פרימיום',
      description: 'עוקבים פרימיום עם פרופילים מלאים',
      price: 0.25,
      min: 50,
      max: 5000,
      category: 'עוקבים',
      icon: '⭐'
    },
    {
      id: 'twitter_followers_targeted',
      name: 'עוקבים ממוקדים',
      description: 'עוקבים ממוקדי תחום עניין וגיל',
      price: 0.35,
      min: 25,
      max: 2500,
      category: 'עוקבים',
      icon: '🎯'
    },
    // לייקים
    {
      id: 'twitter_likes',
      name: 'לייקים לטוויטים',
      description: 'לייקים איכותיים לטוויטים - מעורבות גבוהה',
      price: 0.08,
      min: 50,
      max: 5000,
      category: 'לייקים',
      icon: '❤️'
    },
    {
      id: 'twitter_likes_instant',
      name: 'לייקים מיידיים',
      description: 'לייקים מיידיים עם התחלה מהירה',
      price: 0.12,
      min: 25,
      max: 2500,
      category: 'לייקים',
      icon: '⚡'
    },
    {
      id: 'twitter_likes_retention',
      name: 'לייקים עם שימור',
      description: 'לייקים עם שימור גבוה לטווח ארוך',
      price: 0.15,
      min: 20,
      max: 2000,
      category: 'לייקים',
      icon: '🔄'
    },
    // רטוויטים
    {
      id: 'twitter_retweets',
      name: 'רטוויטים',
      description: 'רטוויטים איכותיים - הגברת נראות',
      price: 0.20,
      min: 10,
      max: 1000,
      category: 'רטוויטים',
      icon: '🔄'
    },
    {
      id: 'twitter_retweets_instant',
      name: 'רטוויטים מיידיים',
      description: 'רטוויטים מיידיים עם התחלה מהירה',
      price: 0.30,
      min: 5,
      max: 500,
      category: 'רטוויטים',
      icon: '⚡'
    },
    {
      id: 'twitter_retweets_engagement',
      name: 'רטוויטים עם מעורבות',
      description: 'רטוויטים עם מעורבות גבוהה',
      price: 0.40,
      min: 5,
      max: 250,
      category: 'רטוויטים',
      icon: '💬'
    },
    // תגובות
    {
      id: 'twitter_replies',
      name: 'תגובות לטוויטים',
      description: 'תגובות איכותיות ומעורבות',
      price: 0.50,
      min: 5,
      max: 200,
      category: 'תגובות',
      icon: '💬'
    },
    {
      id: 'twitter_replies_custom',
      name: 'תגובות מותאמות',
      description: 'תגובות מותאמות אישית',
      price: 0.80,
      min: 3,
      max: 100,
      category: 'תגובות',
      icon: '✍️'
    },
    {
      id: 'twitter_replies_engagement',
      name: 'תגובות עם מעורבות',
      description: 'תגובות עם מעורבות גבוהה',
      price: 1.00,
      min: 2,
      max: 50,
      category: 'תגובות',
      icon: '🔥'
    },
    // צפיות
    {
      id: 'twitter_views',
      name: 'צפיות בטוויטים',
      description: 'צפיות איכותיות בטוויטים',
      price: 0.05,
      min: 100,
      max: 10000,
      category: 'צפיות',
      icon: '👁️'
    },
    {
      id: 'twitter_views_instant',
      name: 'צפיות מיידיות',
      description: 'צפיות מיידיות עם התחלה מהירה',
      price: 0.08,
      min: 50,
      max: 5000,
      category: 'צפיות',
      icon: '⚡'
    },
    {
      id: 'twitter_views_retention',
      name: 'צפיות עם שימור',
      description: 'צפיות עם שימור גבוה',
      price: 0.10,
      min: 25,
      max: 2500,
      category: 'צפיות',
      icon: '🔄'
    },
    // מתקדמים
    {
      id: 'twitter_trending',
      name: 'טרנדינג',
      description: 'הגעה לטרנדינג עם האשטגים',
      price: 2.00,
      min: 1,
      max: 10,
      category: 'מתקדמים',
      icon: '🔥'
    },
    {
      id: 'twitter_verification',
      name: 'אימות חשבון',
      description: 'סיוע באימות חשבון טוויטר',
      price: 50.00,
      min: 1,
      max: 1,
      category: 'מתקדמים',
      icon: '✅'
    },
    {
      id: 'twitter_analytics',
      name: 'אנליטיקס מתקדמים',
      description: 'ניתוח ביצועים מפורט',
      price: 5.00,
      min: 1,
      max: 5,
      category: 'מתקדמים',
      icon: '📊'
    }
  ];

  const categories = [
    { id: 'עוקבים', name: 'עוקבים', icon: '👥', color: 'linear-gradient(135deg, #1da1f2, #0c7abf)' },
    { id: 'לייקים', name: 'לייקים', icon: '❤️', color: 'linear-gradient(135deg, #e1306c, #fd1d1d)' },
    { id: 'רטוויטים', name: 'רטוויטים', icon: '🔄', color: 'linear-gradient(135deg, #00c851, #007e33)' },
    { id: 'תגובות', name: 'תגובות', icon: '💬', color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' },
    { id: 'צפיות', name: 'צפיות', icon: '👁️', color: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
    { id: 'מתקדמים', name: 'מתקדמים', icon: '⚡', color: 'linear-gradient(135deg, #667eea, #764ba2)' }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('הכל');

  const filteredServices = selectedCategory === 'הכל' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
  };

  const addToCart = (service: any) => {
    const quantity = quantities[service.id] || service.min;
    const existingItem = cart.find(item => item.id === service.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === service.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('twitterCart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id: service.id,
        name: service.name,
        quantity: quantity,
        price: service.price
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem('twitterCart', JSON.stringify(updatedCart));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1da1f2 0%, #0c7abf 25%, #14171a 50%, #0c7abf 75%, #1da1f2 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Layers */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(29, 161, 242, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(12, 122, 191, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(20, 23, 26, 0.2) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      {/* Floating Circles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            background: `linear-gradient(135deg, rgba(29, 161, 242, ${Math.random() * 0.3 + 0.1}), rgba(12, 122, 191, ${Math.random() * 0.3 + 0.1}))`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            zIndex: 2
          }}
        />
      ))}

      {/* Sparkling Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            background: '#1da1f2',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${Math.random() * 3 + 2}s infinite`,
            zIndex: 3
          }}
        />
      ))}

      {/* Drifting Geometric Shapes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 30 + 20,
            height: Math.random() * 30 + 20,
            background: `linear-gradient(45deg, rgba(29, 161, 242, 0.4), rgba(12, 122, 191, 0.4))`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `drift ${Math.random() * 15 + 10}s infinite linear`,
            zIndex: 2,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Wave Effects */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${Math.random() * 100 + 50}px`,
            background: `linear-gradient(90deg, rgba(29, 161, 242, 0.1), rgba(12, 122, 191, 0.1))`,
            animation: `wave ${Math.random() * 5 + 3}s infinite ease-in-out`,
            zIndex: 2
          }}
        />
      ))}

      {/* Breathing Elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            background: `radial-gradient(circle, rgba(29, 161, 242, 0.1), transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `breathe ${Math.random() * 8 + 4}s infinite ease-in-out`,
            zIndex: 2
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 2,
            height: 2,
            background: '#ffffff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
            zIndex: 3
          }}
        />
      ))}

      {/* Orbital Elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            background: '#1da1f2',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `orbit ${Math.random() * 20 + 15}s infinite linear`,
            zIndex: 3
          }}
        />
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes drift {
          0% { transform: translateX(-100px) rotate(0deg); }
          100% { transform: translateX(calc(100vw + 100px)) rotate(360deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }
          50% { box-shadow: 0 0 40px rgba(29, 161, 242, 0.8); }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #1da1f2, #0c7abf)',
              border: 'none',
              borderRadius: '15px',
              padding: '12px 24px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(29, 161, 242, 0.4)'
            }}
          >
            ← חזרה לעמוד הבית
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <button
              onClick={() => navigate('/cart')}
              style={{
                background: 'linear-gradient(135deg, #1da1f2, #0c7abf)',
                border: 'none',
                borderRadius: '15px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(29, 161, 242, 0.4)'
              }}
            >
              🛒 צפייה בסל ({cart.length})
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #00c851, #007e33)',
                border: 'none',
                borderRadius: '15px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(0, 200, 81, 0.4)'
              }}
            >
              📝 הרשמה
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                border: 'none',
                borderRadius: '15px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(255, 107, 107, 0.4)'
              }}
            >
              🔑 התחברות
            </button>
          </div>
        </div>

        {/* Main Title with Twitter Icon */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '4rem',
              background: 'linear-gradient(135deg, #1da1f2, #0c7abf, #14171a)',
              borderRadius: '25px',
              padding: '20px',
              color: 'white',
              animation: 'glow 3s infinite, pulse 2s infinite',
              boxShadow: '0 10px 30px rgba(29, 161, 242, 0.5)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(29, 161, 242, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 161, 242, 0.5)';
            }}
            >
              🐦
              {/* Floating particles around icon */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 6,
                    height: 6,
                    background: '#1da1f2',
                    borderRadius: '50%',
                    left: `${Math.cos(i * 45 * Math.PI / 180) * 60 + 50}%`,
                    top: `${Math.sin(i * 45 * Math.PI / 180) * 60 + 50}%`,
                    animation: `orbit ${3 + i * 0.5}s infinite linear`,
                    zIndex: -1
                  }}
                />
              ))}
            </div>
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 5px 15px rgba(0,0,0,0.3)',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #1da1f2, #ffffff, #0c7abf)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            שירותי טוויטר
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            הגברת נוכחות ונראות בטוויטר - עוקבים, לייקים, רטוויטים ועוד
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '40px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory('הכל')}
            style={{
              background: selectedCategory === 'הכל' 
                ? 'linear-gradient(135deg, #1da1f2, #0c7abf)'
                : 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '20px',
              padding: '15px 25px',
              color: 'white',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            הכל
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                background: selectedCategory === category.id 
                  ? category.color
                  : 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                padding: '15px 25px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: '30px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(29, 161, 242, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotateX(0deg)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* Service Icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  background: 'linear-gradient(135deg, #1da1f2, #0c7abf)',
                  borderRadius: '20px',
                  padding: '15px',
                  color: 'white',
                  animation: 'pulse 2s infinite',
                  position: 'relative',
                  boxShadow: '0 10px 25px rgba(29, 161, 242, 0.4)'
                }}>
                  {service.icon}
                  {/* Floating particles around service icon */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: 4,
                        height: 4,
                        background: '#1da1f2',
                        borderRadius: '50%',
                        left: `${Math.cos(i * 90 * Math.PI / 180) * 30 + 50}%`,
                        top: `${Math.sin(i * 90 * Math.PI / 180) * 30 + 50}%`,
                        animation: `orbit ${2 + i * 0.3}s infinite linear`,
                        zIndex: -1
                      }}
                    />
                  ))}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: '0 0 5px 0',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    {service.name}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Price and Range */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(29, 161, 242, 0.2)',
                borderRadius: '15px',
                border: '1px solid rgba(29, 161, 242, 0.3)'
              }}>
                <div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#1da1f2',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    ₪{service.price.toFixed(2)}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    לכל יחידה
                  </div>
                </div>
                <div style={{
                  textAlign: 'left',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    טווח: {service.min.toLocaleString()} - {service.max.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'white',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  כמות:
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <input
                    type="range"
                    min={service.min}
                    max={service.max}
                    value={quantities[service.id] || service.min}
                    onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '5px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <input
                    type="number"
                    min={service.min}
                    max={service.max}
                    value={quantities[service.id] || service.min}
                    onChange={(e) => handleQuantityChange(service.id, parseInt(e.target.value))}
                    style={{
                      width: '80px',
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginTop: '5px'
                }}>
                  סה"כ: ₪{((quantities[service.id] || service.min) * service.price).toFixed(2)}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(service)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #1da1f2, #0c7abf, #14171a)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(29, 161, 242, 0.4)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(29, 161, 242, 0.6)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0c7abf, #1da1f2, #14171a)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 161, 242, 0.4)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #1da1f2, #0c7abf, #14171a)';
                }}
              >
                🛒 הוסף לסל
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          marginTop: '50px'
        }}>
          <h3 style={{
            fontSize: '2rem',
            color: 'white',
            margin: '0 0 15px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            🚀 מוכנים להתחיל?
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 25px 0'
          }}>
            בחרו את השירותים המתאימים לכם והוסיפו לסל הקניות
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/cart')}
              style={{
                background: 'linear-gradient(135deg, #1da1f2, #0c7abf)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(29, 161, 242, 0.4)'
              }}
            >
              🛒 צפייה בסל ({cart.length} פריטים)
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #00c851, #007e33)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0, 200, 81, 0.4)'
              }}
            >
              📝 הרשמה עכשיו
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterServices;
