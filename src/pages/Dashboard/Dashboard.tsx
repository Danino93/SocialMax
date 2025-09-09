import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'עוקבים, לייקים, תגובות וסטוריז',
      stats: { orders: '2,450', revenue: '₪12,500' },
      features: ['עוקבים איכותיים', 'לייקים לפוסטים', 'תגובות מותאמות', 'צפיות בסטוריז', 'רילס ויראליים']
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'דפים עסקיים, קבוצות ופרסום',
      stats: { orders: '1,890', revenue: '₪9,200' },
      features: ['לייקים לדף', 'עוקבים איכותיים', 'ביקורות חיוביות', 'שיתופים אוטומטיים', 'הודעות פרטיות']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'צפיות, עוקבים וויראליות',
      stats: { orders: '3,200', revenue: '₪18,900' },
      features: ['צפיות מסיביות', 'עוקבים ממוקדי גיל', 'לייקים ושיתופים', 'תגובות טרנדיות', 'מיקוד גיאוגרפי']
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '📱',
      color: 'linear-gradient(135deg, #0088cc 0%, #00a8ff 100%)',
      description: 'חברים, קבוצות ובוטים חכמים',
      stats: { orders: '1,650', revenue: '₪8,100' },
      features: ['הוספת חברים', 'ניהול קבוצות', 'בוטים חכמים', 'הודעות מתוזמנות', 'מיקוד דמוגרפי']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: '💬',
      color: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
      description: 'שיווק מסיבי ובוט שירות לקוחות',
      stats: { orders: '2,100', revenue: '₪15,600' },
      features: ['שיווק מסיבי', 'בוט שירות לקוחות', 'קטלוג מוצרים', 'הודעות בתפזורת', 'מיקוד שכונתי']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '🎥',
      color: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
      description: 'צפיות, מנויים וצמיחה ויראלית',
      stats: { orders: '980', revenue: '₪6,800' },
      features: ['צפיות איכותיות', 'מנויים אמיתיים', 'לייקים ותגובות', 'זמן צפייה', 'מונטיזציה']
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: '🐦',
      color: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
      description: 'עוקבים, רטוויטים והשפעה',
      stats: { orders: '750', revenue: '₪4,200' },
      features: ['עוקבים ממוקדי תחום', 'רטוויטים ולייקים', 'תגובות חכמות', 'מעקב שיח ציבורי', 'זיהוי משפיעים']
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: '🎵',
      color: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
      description: 'מוזיקה, פודקאסטים ופלייליסטים',
      stats: { orders: '420', revenue: '₪2,800' },
      features: ['plays לשירים', 'עוקבים לאמנים', 'שמירות לשירים', 'קידום מוזיקה ישראלית', 'פודקאסטים עברית']
    },
    {
      id: 'discord',
      name: 'Discord & Gaming',
      icon: '🎮',
      color: 'linear-gradient(135deg, #7289da 0%, #5865f2 100%)',
      description: 'קהילות גיימינג ואספורט',
      stats: { orders: '680', revenue: '₪3,900' },
      features: ['חברים לשרתים', 'boost לשרתים', 'אקטיביות בצ\'אטים', 'קהילות גיימינג ישראליות', 'שרתי אספורט']
    },
    {
      id: 'google-business',
      name: 'Google Business',
      icon: '🏢',
      color: 'linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%)',
      description: 'ביקורות, SEO מקומי ומיקוד גיאוגרפי',
      stats: { orders: '1,200', revenue: '₪7,800' },
      features: ['ביקורות 5 כוכבים', 'SEO מקומי', 'מיקוד רמת רחוב', 'ניהול Q&A', 'מעקב ביקורות']
    }
  ];

  const handlePlatformClick = (platformId: string) => {
    // הפניה לדפי ניהול ספציפיים לכל פלטפורמה
    switch(platformId) {
                case 'instagram':
                  navigate('/admin/instagram');
                  break;
      case 'facebook':
        navigate('/admin/facebook');
        break;
      case 'tiktok':
        navigate('/admin/tiktok');
        break;
        case 'telegram':
          navigate('/admin/telegram');
          break;
      case 'whatsapp':
        navigate('/admin/whatsapp');
        break;
                case 'youtube':
                  navigate('/admin/youtube');
                  break;
      case 'twitter':
        navigate('/admin/twitter');
        break;
      case 'spotify':
        navigate('/admin/spotify');
        break;
      case 'discord':
        navigate('/admin/discord');
        break;
      case 'google-business':
        navigate('/admin/google-business');
        break;
      default:
        navigate('/admin/services');
    }
  };

  if (isLoading) {
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
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}>
            🚀
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
            טוען את הדשבורד שלך...
          </h2>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px'
    }}>
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
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '15px'
        }}>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: 0
        }}>
          דשבורד ניהול SocialMax 👑
        </h1>
        <div style={{
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          borderRadius: '20px',
          padding: '8px 16px',
          color: '#000',
          fontSize: '1rem',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(255, 215, 0, 0.3)',
          marginTop: '10px'
        }}>
          ברוך הבא, {user?.firstName || 'דנין'} - מנהל מערכת
        </div>
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: 0
        }}>
          דשבורד ניהול מלא - גישה לכל הפלטפורמות והפיצ'רים
        </p>
      </div>

      {/* Admin Tools */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '25px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          textAlign: 'center'
        }}>
          🛠️ פאנל ניהול מלא - שליטה בכל המערכת
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          <button
            onClick={() => navigate('/admin/execute')}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: '15px',
              padding: '20px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <div style={{ textAlign: 'right' }}>
              <div>הפעלת פיצ'רים</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>הפעל פיצ'רים ישירות למשתמשים</div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/admin/services')}
            style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              border: 'none',
              borderRadius: '15px',
              padding: '20px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>⚙️</span>
            <div style={{ textAlign: 'right' }}>
              <div>ניהול שירותים</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>הוספה, עריכה, מחיקה של שירותים</div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/admin/users')}
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              border: 'none',
              borderRadius: '15px',
              padding: '20px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>👥</span>
            <div style={{ textAlign: 'right' }}>
              <div>ניהול משתמשים</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>משתמשים, הרשאות ויתרות</div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/admin/financial')}
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              border: 'none',
              borderRadius: '15px',
              padding: '20px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>💰</span>
            <div style={{ textAlign: 'right' }}>
              <div>ניהול כספי</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>הכנסות, תשלומים ודוחות</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💰</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            ₪{user?.balance?.toLocaleString() || '5,000'}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            יתרה
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📋</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {user?.totalOrders || '45'}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            הזמנות
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⭐</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {user?.loyaltyPoints || '1,250'}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            נקודות
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎯</div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {platforms.length}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            פלטפורמות
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handlePlatformClick(platform.id)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Background Gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: platform.color,
              opacity: 0.1,
              zIndex: 1
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  background: platform.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}>
                  {platform.icon}
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
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {platform.name}
                  </h3>
                  <div style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    borderRadius: '10px',
                    padding: '2px 6px',
                    color: '#000',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    ADMIN
                  </div>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {platform.description}
                </p>
              </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {platform.stats.orders}
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem'
                  }}>
                    הזמנות
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {platform.stats.revenue}
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem'
                  }}>
                    הכנסות
                  </div>
                </div>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  margin: '0 0 10px 0'
                }}>
                  שירותים זמינים:
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                  {platform.features.length > 3 && (
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      +{platform.features.length - 3} עוד
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <span>התחל לעבוד</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Notice */}
      <div style={{
        background: 'rgba(255, 215, 0, 0.1)',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        borderRadius: '20px',
        padding: '25px',
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <span style={{ fontSize: '2rem' }}>👑</span>
          <h3 style={{
            color: '#ffd700',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            דשבורד מנהל מערכת
          </h3>
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          margin: '0 0 15px 0',
          lineHeight: 1.6
        }}>
          זהו דשבורד ניהול מלא עם גישה לכל הפיצ'רים והפלטפורמות.<br/>
          <strong>רק למנהל המערכת - לא למשתמשים רגילים!</strong>
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            color: '#ffd700',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            ✅ גישה מלאה לכל הפלטפורמות
          </div>
          <div style={{
            background: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            color: '#ffd700',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            ✅ כלי ניהול מתקדמים
          </div>
          <div style={{
            background: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            color: '#ffd700',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            ✅ AI Campaign Manager
          </div>
          <div style={{
            background: 'rgba(255, 215, 0, 0.2)',
            borderRadius: '10px',
            padding: '10px 15px',
            color: '#ffd700',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            ✅ ניהול משתמשים וכספים
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '20px'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.9rem',
          margin: 0
        }}>
          SocialMax Admin Dashboard - הפלטפורמה הכי מתקדמת לשיווק ברשתות החברתיות בישראל
        </p>
      </div>
    </div>
  );
};

export default Dashboard;