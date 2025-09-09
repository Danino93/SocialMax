import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  platform?: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const allCartItems: CartItem[] = [];
      
      // Load from all platform carts
      const platforms = ['instagram', 'facebook', 'telegram', 'whatsapp', 'tiktok', 'youtube', 'google-business', 'twitter', 'discord'];
      
      platforms.forEach(platform => {
        const platformCart = localStorage.getItem(`${platform}Cart`);
        if (platformCart) {
          try {
            const items = JSON.parse(platformCart);
            items.forEach((item: any) => {
              allCartItems.push({
                ...item,
                platform: platform
              });
            });
          } catch (error) {
            console.error(`Error parsing ${platform} cart:`, error);
          }
        }
      });
      
      setCartItems(allCartItems);
      setLoading(false);
    };

    loadCartItems();
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const updateLocalStorage = (items: CartItem[]) => {
    // Group items by platform and update localStorage
    const platformGroups: { [key: string]: CartItem[] } = {};
    
    items.forEach(item => {
      const platform = item.platform || 'general';
      if (!platformGroups[platform]) {
        platformGroups[platform] = [];
      }
      platformGroups[platform].push(item);
    });

    // Update each platform's cart
    Object.keys(platformGroups).forEach(platform => {
      if (platform !== 'general') {
        localStorage.setItem(`${platform}Cart`, JSON.stringify(platformGroups[platform]));
      }
    });

    // Clear empty platform carts
    const platforms = ['instagram', 'facebook', 'telegram', 'whatsapp', 'tiktok', 'youtube', 'google-business', 'twitter', 'discord'];
    platforms.forEach(platform => {
      if (!platformGroups[platform] || platformGroups[platform].length === 0) {
        localStorage.removeItem(`${platform}Cart`);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    const platforms = ['instagram', 'facebook', 'telegram', 'whatsapp', 'tiktok', 'youtube', 'google-business', 'twitter', 'discord'];
    platforms.forEach(platform => {
      localStorage.removeItem(`${platform}Cart`);
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getPlatformIcon = (platform?: string) => {
    const icons: { [key: string]: string } = {
      'instagram': '📸',
      'facebook': '📘',
      'telegram': '✈️',
      'whatsapp': '💬',
      'tiktok': '🎵',
      'youtube': '▶️',
      'google-business': '🏢',
      'twitter': '🐦',
      'discord': '🎮'
    };
    return icons[platform || ''] || '🛍️';
  };

  const getPlatformName = (platform?: string) => {
    const names: { [key: string]: string } = {
      'instagram': 'Instagram',
      'facebook': 'Facebook',
      'telegram': 'Telegram',
      'whatsapp': 'WhatsApp',
      'tiktok': 'TikTok',
      'youtube': 'YouTube',
      'google-business': 'Google Business',
      'twitter': 'Twitter',
      'discord': 'Discord'
    };
    return names[platform || ''] || 'כללי';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🛒</div>
          <h2>טוען סל קניות...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      {/* Floating Elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 60 + 30,
            height: Math.random() * 60 + 30,
            background: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s infinite linear`,
            zIndex: 2
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              padding: '15px',
              color: 'white',
              animation: 'float 3s infinite'
            }}>
              🛒
            </div>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 10px 0',
                textShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}>
                סל הקניות שלי
              </h1>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0
              }}>
                {getTotalItems()} פריטים • ₪{getTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '15px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ← חזרה לעמוד הבית
            </button>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '12px 24px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🗑️ נקה סל
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
            <h2 style={{
              fontSize: '2rem',
              color: 'white',
              margin: '0 0 15px 0'
            }}>
              הסל שלך ריק
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 30px 0'
            }}>
              התחל להוסיף שירותים לסל הקניות שלך
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🛍️ התחל לקנות
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '30px'
          }}>
            {/* Cart Items */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '30px',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: 'white',
                margin: '0 0 25px 0',
                textAlign: 'center'
              }}>
                פריטים בסל
              </h2>
              
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      flexWrap: 'wrap'
                    }}>
                      {/* Platform Icon */}
                      <div style={{
                        fontSize: '2rem',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '15px',
                        padding: '10px',
                        color: 'white',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {getPlatformIcon(item.platform)}
                      </div>

                      {/* Item Details */}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{
                          fontSize: '1.2rem',
                          color: 'white',
                          margin: '0 0 5px 0'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: 0
                        }}>
                          {getPlatformName(item.platform)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '5px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '8px',
                            width: '35px',
                            height: '35px',
                            color: 'white',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          minWidth: '30px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '8px',
                            width: '35px',
                            height: '35px',
                            color: 'white',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{
                        textAlign: 'left',
                        minWidth: '120px'
                      }}>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          color: '#667eea',
                          marginBottom: '5px'
                        }}>
                          ₪{(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}>
                          ₪{item.price.toFixed(2)} לכל יחידה
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                          border: 'none',
                          borderRadius: '10px',
                          width: '40px',
                          height: '40px',
                          color: 'white',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '30px',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: 'white',
                margin: '0 0 25px 0',
                textAlign: 'center'
              }}>
                סיכום הזמנה
              </h2>

              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
                    סה"כ פריטים:
                  </span>
                  <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {getTotalItems()}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
                    סה"כ מחיר:
                  </span>
                  <span style={{ color: '#667eea', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ₪{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    background: 'linear-gradient(135deg, #43b581, #3ca374)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    minWidth: '200px'
                  }}
                >
                  📝 הרשמה והזמנה
                </button>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '15px 30px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    minWidth: '200px'
                  }}
                >
                  🔑 התחבר והזמן
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
