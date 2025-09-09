import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';

interface Order {
  id: string;
  platform: string;
  service: string;
  quantity: number;
  price: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  progress?: number;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading orders
    const timer = setTimeout(() => {
      setOrders(generateMockOrders());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const generateMockOrders = (): Order[] => {
    const platforms = ['instagram', 'facebook', 'telegram', 'whatsapp', 'tiktok', 'youtube', 'google-business', 'twitter', 'discord'];
    const services = [
      'עוקבים איכותיים', 'לייקים לפוסטים', 'תגובות מותאמות', 'צפיות בסטוריז',
      'חברים לקבוצות', 'הודעות מסיביות', 'צפיות וידאו', 'ביקורות 5 כוכבים',
      'רטוויטים', 'Boost לשרת', 'אקטיביות בצ\'אט', 'קהילות גיימינג'
    ];
    const statuses: Array<'pending' | 'processing' | 'completed' | 'cancelled'> = ['pending', 'processing', 'completed', 'cancelled'];

    return Array.from({ length: 15 }, (_, i) => {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const service = services[Math.floor(Math.random() * services.length)];
      const quantity = Math.floor(Math.random() * 1000) + 10;
      const price = Math.random() * 2 + 0.1;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      return {
        id: `ORD-${String(i + 1).padStart(4, '0')}`,
        platform,
        service,
        quantity,
        price,
        totalPrice: quantity * price,
        status,
        createdAt: createdAt.toISOString(),
        completedAt: status === 'completed' ? new Date(createdAt.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        progress: status === 'processing' ? Math.floor(Math.random() * 100) : status === 'completed' ? 100 : 0
      };
    });
  };

  const getPlatformIcon = (platform: string) => {
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
    return icons[platform] || '🛍️';
  };

  const getPlatformName = (platform: string) => {
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
    return names[platform] || 'כללי';
  };

  const getStatusInfo = (status: string) => {
    const statusInfo = {
      'pending': { text: 'ממתין', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', icon: '⏳' },
      'processing': { text: 'בביצוע', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)', icon: '⚙️' },
      'completed': { text: 'הושלם', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', icon: '✅' },
      'cancelled': { text: 'בוטל', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', icon: '❌' }
    };
    return statusInfo[status as keyof typeof statusInfo] || statusInfo.pending;
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getTotalSpent = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.totalPrice, 0);
  };

  const getActiveOrders = () => {
    return orders.filter(order => order.status === 'pending' || order.status === 'processing').length;
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
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📋</div>
          <h2>טוען הזמנות...</h2>
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
      {/* Header */}
      <Header onMenuClick={() => {}} />
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
      {Array.from({ length: 25 }).map((_, i) => (
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
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
        }
      `}</style>

       <div style={{
         position: 'relative',
         zIndex: 10,
         maxWidth: '1400px',
         margin: '0 auto',
         padding: '100px 20px 20px'
       }}>
         {/* User Profile Section */}
         <div style={{
           background: 'rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(20px)',
           borderRadius: '25px',
           padding: '30px',
           border: '2px solid rgba(255, 255, 255, 0.2)',
           marginBottom: '30px',
           animation: 'slideInUp 0.6s ease-out 0.1s both'
         }}>
           <div style={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between',
             flexWrap: 'wrap',
             gap: '20px'
           }}>
             {/* User Info */}
             <div style={{
               display: 'flex',
               alignItems: 'center',
               gap: '20px'
             }}>
               <div style={{
                 width: '60px',
                 height: '60px',
                 background: 'linear-gradient(135deg, #667eea, #764ba2)',
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'white',
                 fontWeight: 'bold',
                 fontSize: '24px',
                 boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
               }}>
                 {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
               </div>
               <div>
                 <h2 style={{
                   fontSize: '1.8rem',
                   fontWeight: 'bold',
                   color: 'white',
                   margin: '0 0 5px 0',
                   textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                 }}>
                   {user?.firstName} {user?.lastName}
                 </h2>
                 <p style={{
                   fontSize: '1rem',
                   color: 'rgba(255, 255, 255, 0.8)',
                   margin: 0,
                   textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                 }}>
                   {user?.email}
                 </p>
               </div>
             </div>

             {/* Balance and Points */}
             <div style={{
               display: 'flex',
               gap: '15px',
               flexWrap: 'wrap'
             }}>
               <div style={{
                 background: 'rgba(16, 185, 129, 0.2)',
                 color: '#10b981',
                 padding: '12px 20px',
                 borderRadius: '15px',
                 fontSize: '1rem',
                 fontWeight: '600',
                 border: '1px solid rgba(16, 185, 129, 0.3)',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 💰 יתרה: ₪{user?.balance?.toFixed(2) || '0.00'}
               </div>
               <div style={{
                 background: 'rgba(59, 130, 246, 0.2)',
                 color: '#3b82f6',
                 padding: '12px 20px',
                 borderRadius: '15px',
                 fontSize: '1rem',
                 fontWeight: '600',
                 border: '1px solid rgba(59, 130, 246, 0.3)',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '8px'
               }}>
                 ⭐ נקודות: {user?.loyaltyPoints || 0}
               </div>
             </div>
           </div>

           {/* Quick Actions */}
           <div style={{
             marginTop: '25px',
             paddingTop: '25px',
             borderTop: '2px solid rgba(255, 255, 255, 0.1)'
           }}>
             <h3 style={{
               fontSize: '1.2rem',
               color: 'white',
               margin: '0 0 15px 0',
               textShadow: '0 2px 4px rgba(0,0,0,0.3)'
             }}>
               פעולות מהירות
             </h3>
             <div style={{
               display: 'flex',
               gap: '15px',
               flexWrap: 'wrap'
             }}>
               <button
                 onClick={() => navigate('/add-funds')}
                 style={{
                   background: 'linear-gradient(135deg, #10b981, #059669)',
                   border: 'none',
                   borderRadius: '15px',
                   padding: '12px 20px',
                   color: 'white',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   boxShadow: '0 5px 15px rgba(16, 185, 129, 0.3)',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.3)';
                 }}
               >
                 💰 הוסף כסף
               </button>
               <button
                 onClick={() => navigate('/services')}
                 style={{
                   background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                   border: 'none',
                   borderRadius: '15px',
                   padding: '12px 20px',
                   color: 'white',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   boxShadow: '0 5px 15px rgba(59, 130, 246, 0.3)',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 5px 15px rgba(59, 130, 246, 0.3)';
                 }}
               >
                 ⏱️ הזמן עכשיו
               </button>
               <button
                 onClick={() => navigate('/support')}
                 style={{
                   background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                   border: 'none',
                   borderRadius: '15px',
                   padding: '12px 20px',
                   color: 'white',
                   fontSize: '0.9rem',
                   fontWeight: '600',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   boxShadow: '0 5px 15px rgba(139, 92, 246, 0.3)',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
                 }}
               >
                 💬 תמיכה
               </button>
             </div>
           </div>
         </div>

         {/* Back to Home Button */}
         <div style={{
           display: 'flex',
           justifyContent: 'flex-start',
           marginBottom: '20px'
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
               transition: 'all 0.3s ease',
               boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
               display: 'flex',
               alignItems: 'center',
               gap: '8px'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-2px)';
               e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
             }}
           >
             ← חזרה לעמוד הבית
           </button>
         </div>

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
              animation: 'pulse 2s infinite'
            }}>
              📋
            </div>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 10px 0',
                textShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}>
                הזמנות שלי
              </h1>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0
              }}>
                {orders.length} הזמנות • ₪{getTotalSpent().toFixed(2)} הוצאה כוללת
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '25px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            animation: 'slideInUp 0.6s ease-out 0.1s both'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.5rem' }}>
              {orders.length}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              סה"כ הזמנות
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '25px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            animation: 'slideInUp 0.6s ease-out 0.2s both'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⚡</div>
            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.5rem' }}>
              {getActiveOrders()}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              הזמנות פעילות
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '25px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            animation: 'slideInUp 0.6s ease-out 0.3s both'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.5rem' }}>
              ₪{getTotalSpent().toFixed(2)}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              הוצאה כוללת
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '25px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            animation: 'slideInUp 0.6s ease-out 0.4s both'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✅</div>
            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.5rem' }}>
              {orders.filter(o => o.status === 'completed').length}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              הזמנות הושלמו
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '30px',
          justifyContent: 'center'
        }}>
          {[
            { id: 'all', label: 'הכל', icon: '📋' },
            { id: 'pending', label: 'ממתין', icon: '⏳' },
            { id: 'processing', label: 'בביצוע', icon: '⚙️' },
            { id: 'completed', label: 'הושלם', icon: '✅' },
            { id: 'cancelled', label: 'בוטל', icon: '❌' }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              style={{
                background: filter === filterOption.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {filterOption.icon} {filterOption.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
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
            רשימת הזמנות
          </h2>

          {filteredOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
              <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>
                אין הזמנות
              </h3>
              <p style={{ margin: 0 }}>
                לא נמצאו הזמנות עם הפילטר שנבחר
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              {filteredOrders.map((order, index) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div
                    key={order.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      padding: '25px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto auto',
                      gap: '20px',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      {/* Platform Icon */}
                      <div style={{
                        fontSize: '2.5rem',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '15px',
                        padding: '12px',
                        color: 'white',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {getPlatformIcon(order.platform)}
                      </div>

                      {/* Order Details */}
                      <div style={{ minWidth: '200px' }}>
                        <h3 style={{
                          fontSize: '1.3rem',
                          color: 'white',
                          margin: '0 0 5px 0'
                        }}>
                          {order.service}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          margin: '0 0 5px 0'
                        }}>
                          {getPlatformName(order.platform)}
                        </p>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: 0
                        }}>
                          כמות: {order.quantity.toLocaleString()} • מחיר: ₪{order.price.toFixed(2)}
                        </p>
                        <p style={{
                          fontSize: '0.8rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          margin: '5px 0 0 0'
                        }}>
                          הזמנה #{order.id} • {new Date(order.createdAt).toLocaleDateString('he-IL')}
                        </p>
                      </div>

                      {/* Status */}
                      <div style={{
                        textAlign: 'center',
                        minWidth: '120px'
                      }}>
                        <div style={{
                          background: statusInfo.bgColor,
                          color: statusInfo.color,
                          padding: '8px 16px',
                          borderRadius: '15px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          marginBottom: '10px'
                        }}>
                          {statusInfo.icon} {statusInfo.text}
                        </div>
                        {order.status === 'processing' && order.progress !== undefined && (
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            height: '8px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                              height: '100%',
                              width: `${order.progress}%`,
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                        )}
                      </div>

                      {/* Total Price */}
                      <div style={{
                        textAlign: 'left',
                        minWidth: '100px'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#667eea',
                          marginBottom: '5px'
                        }}>
                          ₪{order.totalPrice.toFixed(2)}
                        </div>
                        {order.completedAt && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}>
                            הושלם: {new Date(order.completedAt).toLocaleDateString('he-IL')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
         </div>
       </div>

       {/* Footer */}
       <footer style={{
         background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
         color: 'white',
         position: 'relative',
         overflow: 'hidden',
         marginTop: '60px'
       }}>
         {/* Background Effects */}
         <div style={{
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           background: `
             radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
           `,
           zIndex: 1
         }} />

         {/* Floating Elements */}
         {Array.from({ length: 15 }).map((_, i) => (
           <div
             key={i}
             style={{
               position: 'absolute',
               width: Math.random() * 40 + 20,
               height: Math.random() * 40 + 20,
               background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
               borderRadius: '50%',
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animation: `float ${Math.random() * 15 + 10}s infinite linear`,
               zIndex: 2
             }}
           />
         ))}

         <div style={{
           position: 'relative',
           zIndex: 10,
           maxWidth: '1400px',
           margin: '0 auto',
           padding: '60px 20px 40px'
         }}>
           {/* Main Footer Content */}
           <div style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
             gap: '40px',
             marginBottom: '40px'
           }}>
             {/* Company Info */}
             <div>
               <div style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '15px',
                 marginBottom: '20px'
               }}>
                 <div style={{
                   width: '50px',
                   height: '50px',
                   background: 'linear-gradient(135deg, #667eea, #764ba2)',
                   borderRadius: '15px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   color: 'white',
                   fontWeight: 'bold',
                   fontSize: '20px',
                   boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                 }}>
                   SM
                 </div>
                 <div>
                   <h3 style={{
                     fontSize: '1.5rem',
                     fontWeight: 'bold',
                     margin: '0 0 5px 0',
                     background: 'linear-gradient(45deg, #667eea, #764ba2)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text'
                   }}>
                     SocialMax
                   </h3>
                   <p style={{
                     fontSize: '0.9rem',
                     color: 'rgba(255, 255, 255, 0.7)',
                     margin: 0
                   }}>
                     הפלטפורמה המובילה לשירותי רשתות חברתיות
                   </p>
                 </div>
               </div>
               <p style={{
                 fontSize: '0.9rem',
                 color: 'rgba(255, 255, 255, 0.8)',
                 lineHeight: '1.6',
                 margin: '0 0 20px 0'
               }}>
                 SocialMax מספקת שירותי איכות גבוהה לכל הפלטפורמות החברתיות המובילות. 
                 אנו מתמחים בהגברת נוכחות דיגיטלית וקידום עסקים ברשת.
               </p>
               <div style={{
                 display: 'flex',
                 gap: '15px'
               }}>
                 {[
                   { name: 'Facebook', icon: '📘', href: 'https://facebook.com/socialmax' },
                   { name: 'Instagram', icon: '📷', href: 'https://instagram.com/socialmax' },
                   { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/socialmax' },
                   { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/socialmax' },
                   { name: 'YouTube', icon: '📺', href: 'https://youtube.com/socialmax' }
                 ].map((social, index) => (
                   <a
                     key={index}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={{
                       width: '40px',
                       height: '40px',
                       background: 'rgba(255, 255, 255, 0.1)',
                       borderRadius: '50%',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       fontSize: '18px',
                       textDecoration: 'none',
                       transition: 'all 0.3s ease',
                       backdropFilter: 'blur(10px)',
                       border: '1px solid rgba(255, 255, 255, 0.2)'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                       e.currentTarget.style.transform = 'translateY(-3px)';
                       e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                   >
                     {social.icon}
                   </a>
                 ))}
               </div>
             </div>

             {/* Services */}
             <div>
               <h4 style={{
                 fontSize: '1.2rem',
                 fontWeight: 'bold',
                 margin: '0 0 20px 0',
                 color: 'white'
               }}>
                 שירותים
               </h4>
               <div style={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '12px'
               }}>
                 {[
                   { name: 'Instagram', href: '/services/instagram' },
                   { name: 'Facebook', href: '/services/facebook' },
                   { name: 'TikTok', href: '/services/tiktok' },
                   { name: 'YouTube', href: '/services/youtube' },
                   { name: 'Twitter', href: '/services/twitter' }
                 ].map((service, index) => (
                   <a
                     key={index}
                     href={service.href}
                     style={{
                       color: 'rgba(255, 255, 255, 0.8)',
                       textDecoration: 'none',
                       fontSize: '0.9rem',
                       transition: 'all 0.3s ease',
                       padding: '5px 0'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = '#667eea';
                       e.currentTarget.style.transform = 'translateX(5px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                       e.currentTarget.style.transform = 'translateX(0)';
                     }}
                   >
                     {service.name}
                   </a>
                 ))}
               </div>
             </div>

             {/* Company */}
             <div>
               <h4 style={{
                 fontSize: '1.2rem',
                 fontWeight: 'bold',
                 margin: '0 0 20px 0',
                 color: 'white'
               }}>
                 החברה
               </h4>
               <div style={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '12px'
               }}>
                 {[
                   { name: 'אודותינו', href: '/about' },
                   { name: 'צור קשר', href: '/contact' },
                   { name: 'בלוג', href: '/blog' },
                   { name: 'קריירה', href: '/careers' },
                   { name: 'שותפים', href: '/partners' }
                 ].map((link, index) => (
                   <a
                     key={index}
                     href={link.href}
                     style={{
                       color: 'rgba(255, 255, 255, 0.8)',
                       textDecoration: 'none',
                       fontSize: '0.9rem',
                       transition: 'all 0.3s ease',
                       padding: '5px 0'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = '#667eea';
                       e.currentTarget.style.transform = 'translateX(5px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                       e.currentTarget.style.transform = 'translateX(0)';
                     }}
                   >
                     {link.name}
                   </a>
                 ))}
               </div>
             </div>

             {/* Support */}
             <div>
               <h4 style={{
                 fontSize: '1.2rem',
                 fontWeight: 'bold',
                 margin: '0 0 20px 0',
                 color: 'white'
               }}>
                 תמיכה
               </h4>
               <div style={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '12px'
               }}>
                 {[
                   { name: 'מרכז עזרה', href: '/help' },
                   { name: 'מדריכים', href: '/guides' },
                   { name: 'API', href: '/api' },
                   { name: 'סטטוס שירות', href: '/status' },
                   { name: 'דיווח באג', href: '/bug-report' }
                 ].map((link, index) => (
                   <a
                     key={index}
                     href={link.href}
                     style={{
                       color: 'rgba(255, 255, 255, 0.8)',
                       textDecoration: 'none',
                       fontSize: '0.9rem',
                       transition: 'all 0.3s ease',
                       padding: '5px 0'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = '#667eea';
                       e.currentTarget.style.transform = 'translateX(5px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                       e.currentTarget.style.transform = 'translateX(0)';
                     }}
                   >
                     {link.name}
                   </a>
                 ))}
               </div>
             </div>
           </div>

           {/* Bottom Section */}
           <div style={{
             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
             paddingTop: '30px',
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             flexWrap: 'wrap',
             gap: '20px'
           }}>
             <div style={{
               fontSize: '0.9rem',
               color: 'rgba(255, 255, 255, 0.7)'
             }}>
               <p style={{ margin: '0 0 5px 0' }}>
                 © {new Date().getFullYear()} SocialMax. כל הזכויות שמורות.
               </p>
               <p style={{ margin: 0 }}>
                 פותח עם ❤️ בישראל
               </p>
             </div>
             <div style={{
               display: 'flex',
               gap: '30px',
               flexWrap: 'wrap'
             }}>
               {[
                 { name: 'תנאי שימוש', href: '/terms' },
                 { name: 'מדיניות פרטיות', href: '/privacy' },
                 { name: 'מדיניות החזרים', href: '/refund' }
               ].map((link, index) => (
                 <a
                   key={index}
                   href={link.href}
                   style={{
                     color: 'rgba(255, 255, 255, 0.7)',
                     textDecoration: 'none',
                     fontSize: '0.8rem',
                     transition: 'all 0.3s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.color = '#667eea';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                   }}
                 >
                   {link.name}
                 </a>
               ))}
             </div>
           </div>
         </div>
       </footer>
     </div>
   );
 };
 
 export default Orders;