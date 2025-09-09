import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: user?.businessName || '',
    businessType: user?.businessType || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      businessName: user?.businessName || '',
      businessType: user?.businessType || ''
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'פרופיל', icon: '👤' },
    { id: 'settings', label: 'הגדרות', icon: '⚙️' },
    { id: 'security', label: 'אבטחה', icon: '🔒' },
    { id: 'notifications', label: 'התראות', icon: '🔔' }
  ];

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
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
            background: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s infinite linear`,
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
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '100px 20px 20px'
      }}>
        {/* Back to Home Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '30px'
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

        {/* Profile Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px',
          textAlign: 'center',
          animation: 'slideInUp 0.6s ease-out 0.1s both'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            {/* Profile Avatar */}
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '48px',
              boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
              animation: 'pulse 2s infinite'
            }}>
              {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              {/* Sparkle Effects */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    left: `${50 + 60 * Math.cos((i * 45) * Math.PI / 180)}%`,
                    top: `${50 + 60 * Math.sin((i * 45) * Math.PI / 180)}%`,
                    animation: `sparkle ${Math.random() * 2 + 1}s infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 10px 0',
                textShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}>
                {user?.firstName} {user?.lastName}
              </h1>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: '0 0 15px 0'
              }}>
                {user?.email}
              </p>
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  💰 יתרה: ₪{user?.balance?.toFixed(2) || '0.00'}
                </div>
                <div style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  ⭐ נקודות: {user?.loyaltyPoints || 0}
                </div>
                <div style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  color: '#8b5cf6',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  📋 הזמנות: {user?.totalOrders || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '10px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px',
          animation: 'slideInUp 0.6s ease-out 0.2s both'
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  animation: `slideInUp 0.6s ease-out ${0.3 + index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          animation: 'slideInUp 0.6s ease-out 0.4s both'
        }}>
          {activeTab === 'profile' && (
            <div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                מידע אישי
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '25px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    שם פרטי
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="הזן שם פרטי"
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    שם משפחה
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="הזן שם משפחה"
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    אימייל
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="הזן אימייל"
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    טלפון
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="הזן מספר טלפון"
                  />
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                marginTop: '30px',
                flexWrap: 'wrap'
              }}>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '15px 30px',
                      color: 'white',
                      fontSize: '1rem',
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
                    ✏️ ערוך פרופיל
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '15px 30px',
                        color: 'white',
                        fontSize: '1rem',
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
                      💾 שמור שינויים
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '15px 30px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 5px 15px rgba(239, 68, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(239, 68, 68, 0.3)';
                      }}
                    >
                      ❌ ביטול
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                הגדרות מערכת
              </h2>
              
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    🌙 מצב כהה
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    החלף בין מצב בהיר לכהה
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    הפעל מצב כהה
                  </button>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    🌍 שפה
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    בחר את שפת הממשק
                  </p>
                  <select style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '10px',
                    color: 'white',
                    width: '200px'
                  }}>
                    <option value="he">עברית</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                אבטחה ופרטיות
              </h2>
              
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    🔐 שנה סיסמה
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    עדכן את הסיסמה שלך לביטחון מקסימלי
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    שנה סיסמה
                  </button>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    🔑 אימות דו-שלבי
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    הוסף שכבת אבטחה נוספת לחשבון שלך
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    הפעל 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 30px 0',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                התראות והעדפות
              </h2>
              
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    📧 התראות אימייל
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    קבל עדכונים על הזמנות ופעילות
                  </p>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                    הפעל התראות אימייל
                  </label>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 15px 0'
                  }}>
                    🔔 התראות דחיפה
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 15px 0'
                  }}>
                    קבל התראות ישירות בדפדפן
                  </p>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>
                    <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
                    הפעל התראות דחיפה
                  </label>
                </div>
              </div>
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

export default Profile;