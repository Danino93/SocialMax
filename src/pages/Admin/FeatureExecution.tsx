import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureExecution: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(100);
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'linear-gradient(135deg, #0088cc, #00a8ff)' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'linear-gradient(135deg, #25d366, #128c7e)' }
  ];

  const features = {
    instagram: [
      { id: 'followers', name: 'הוספת עוקבים', description: 'הוספת עוקבים איכותיים לפרופיל', price: '₪0.05', min: 100, max: 100000 },
      { id: 'likes', name: 'הוספת לייקים', description: 'הוספת לייקים לפוסטים', price: '₪0.02', min: 50, max: 50000 },
      { id: 'comments', name: 'הוספת תגובות', description: 'הוספת תגובות לפוסטים', price: '₪0.08', min: 10, max: 1000 },
      { id: 'story_views', name: 'צפיות בסטוריז', description: 'הוספת צפיות לסטוריז', price: '₪0.03', min: 100, max: 10000 },
      { id: 'reels_views', name: 'צפיות ברילס', description: 'הוספת צפיות לרילס', price: '₪0.04', min: 100, max: 50000 }
    ],
    facebook: [
      { id: 'page_likes', name: 'לייקים לדף', description: 'הוספת לייקים לדף עסקי', price: '₪0.07', min: 50, max: 50000 },
      { id: 'followers', name: 'עוקבים לדף', description: 'הוספת עוקבים לדף', price: '₪0.06', min: 50, max: 25000 },
      { id: 'post_likes', name: 'לייקים לפוסטים', description: 'הוספת לייקים לפוסטים', price: '₪0.05', min: 50, max: 10000 },
      { id: 'shares', name: 'שיתופים', description: 'הוספת שיתופים לפוסטים', price: '₪0.06', min: 20, max: 1000 }
    ],
    telegram: [
      { id: 'group_members', name: 'חברים לקבוצה', description: 'הוספת חברים לקבוצת טלגרם', price: '₪0.10', min: 50, max: 200000 },
      { id: 'channel_subscribers', name: 'מנויים לערוץ', description: 'הוספת מנויים לערוץ טלגרם', price: '₪0.08', min: 100, max: 100000 },
      { id: 'views', name: 'צפיות בהודעות', description: 'הוספת צפיות להודעות', price: '₪0.05', min: 100, max: 50000 }
    ],
    tiktok: [
      { id: 'followers', name: 'עוקבים', description: 'הוספת עוקבים לחשבון טיקטוק', price: '₪0.12', min: 100, max: 100000 },
      { id: 'likes', name: 'לייקים', description: 'הוספת לייקים לוידאו', price: '₪0.08', min: 100, max: 50000 },
      { id: 'views', name: 'צפיות', description: 'הוספת צפיות לוידאו', price: '₪0.06', min: 1000, max: 1000000 }
    ],
    whatsapp: [
      { id: 'group_members', name: 'חברים לקבוצה', description: 'הוספת חברים לקבוצת וואטסאפ', price: '₪0.15', min: 10, max: 1000 },
      { id: 'status_views', name: 'צפיות בסטטוס', description: 'הוספת צפיות לסטטוס', price: '₪0.10', min: 50, max: 5000 }
    ]
  };

  const mockUsers = [
    { id: '1', name: 'יוסי כהן', email: 'yossi@example.com', balance: 500 },
    { id: '2', name: 'שרה לוי', email: 'sara@example.com', balance: 1200 },
    { id: '3', name: 'דוד ישראלי', email: 'david@example.com', balance: 800 },
    { id: '4', name: 'מיכל אברהם', email: 'michal@example.com', balance: 2000 }
  ];

  const currentFeatures = features[selectedPlatform as keyof typeof features] || [];
  const selectedFeatureData = currentFeatures.find(f => f.id === selectedFeature);

  const handleExecute = async () => {
    if (!selectedFeature || !selectedUser || !targetUrl) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    setIsExecuting(true);
    
    // סימולציה של הפעלת הפיצ'ר
    setTimeout(() => {
      setIsExecuting(false);
      alert(`✅ הפיצ'ר הופעל בהצלחה!\n\nפלטפורמה: ${platforms.find(p => p.id === selectedPlatform)?.name}\nפיצ'ר: ${selectedFeatureData?.name}\nכמות: ${quantity}\nמשתמש: ${mockUsers.find(u => u.id === selectedUser)?.name}\nיעד: ${targetUrl}`);
    }, 2000);
  };

  const calculateCost = () => {
    if (!selectedFeatureData) return 0;
    return (quantity * parseFloat(selectedFeatureData.price.replace('₪', ''))).toFixed(2);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      direction: 'rtl'
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
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
            ← חזרה לדשבורד
          </button>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            🚀
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          הפעלת פיצ'רים
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: 0
        }}>
          הפעל פיצ'רים ישירות למשתמשים - שליטה מלאה במערכת
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          {/* Configuration Panel */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: '0 0 25px 0',
              textAlign: 'center'
            }}>
              הגדרת פיצ'ר
            </h2>

            {/* Platform Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                בחר פלטפורמה:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '10px'
              }}>
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setSelectedFeature('');
                    }}
                    style={{
                      background: selectedPlatform === platform.id 
                        ? 'rgba(255,255,255,0.3)' 
                        : 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      padding: '15px',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPlatform !== platform.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPlatform !== platform.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{platform.icon}</span>
                    <span style={{ fontWeight: 'bold' }}>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                בחר פיצ'ר:
              </label>
              <select
                value={selectedFeature}
                onChange={(e) => setSelectedFeature(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">בחר פיצ'ר...</option>
                {currentFeatures.map((feature) => (
                  <option key={feature.id} value={feature.id} style={{ color: '#000' }}>
                    {feature.name} - {feature.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                כמות:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                min={selectedFeatureData?.min || 0}
                max={selectedFeatureData?.max || 100000}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="הזן כמות..."
              />
              {selectedFeatureData && (
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  marginTop: '5px'
                }}>
                  טווח: {selectedFeatureData.min.toLocaleString()} - {selectedFeatureData.max.toLocaleString()}
                </div>
              )}
            </div>

            {/* Target URL */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                URL יעד:
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="https://instagram.com/username"
              />
            </div>

            {/* User Selection */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                display: 'block'
              }}>
                בחר משתמש:
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="">בחר משתמש...</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id} style={{ color: '#000' }}>
                    {user.name} - יתרה: ₪{user.balance}
                  </option>
                ))}
              </select>
            </div>

            {/* Execute Button */}
            <button
              onClick={handleExecute}
              disabled={isExecuting || !selectedFeature || !selectedUser || !targetUrl}
              style={{
                width: '100%',
                background: isExecuting 
                  ? 'rgba(255,255,255,0.3)' 
                  : 'linear-gradient(135deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: isExecuting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isExecuting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isExecuting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isExecuting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isExecuting ? '🔄 מפעיל...' : '🚀 הפעל פיצ\'ר'}
            </button>
          </div>

          {/* Summary Panel */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: '0 0 25px 0',
              textAlign: 'center'
            }}>
              סיכום הזמנה
            </h2>

            {selectedFeatureData ? (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: '0 0 15px 0'
                }}>
                  {selectedFeatureData.name}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  margin: '0 0 15px 0'
                }}>
                  {selectedFeatureData.description}
                </p>
                <div style={{
                  display: 'grid',
                  gap: '10px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span>כמות:</span>
                    <span style={{ fontWeight: 'bold' }}>{quantity.toLocaleString()}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span>מחיר ליחידה:</span>
                    <span style={{ fontWeight: 'bold' }}>{selectedFeatureData.price}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#4ade80',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    paddingTop: '10px'
                  }}>
                    <span>סה"כ עלות:</span>
                    <span>₪{calculateCost()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1.1rem',
                padding: '40px 20px'
              }}>
                בחר פיצ'ר כדי לראות פרטים
              </div>
            )}

            {selectedUser && (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  margin: '0 0 10px 0'
                }}>
                  פרטי משתמש
                </h3>
                {(() => {
                  const user = mockUsers.find(u => u.id === selectedUser);
                  return user ? (
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '5px' }}>
                        שם: {user.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '5px' }}>
                        אימייל: {user.email}
                      </div>
                      <div style={{ color: '#4ade80', fontWeight: 'bold' }}>
                        יתרה: ₪{user.balance}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureExecution;
