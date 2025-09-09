import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'linear-gradient(135deg, #0088cc, #00a8ff)' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'linear-gradient(135deg, #25d366, #128c7e)' },
    { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'linear-gradient(135deg, #ff0000, #c4302b)' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'linear-gradient(135deg, #1da1f2, #0c7abf)' },
    { id: 'spotify', name: 'Spotify', icon: '🎧', color: 'linear-gradient(135deg, #1db954, #1ed760)' },
    { id: 'discord', name: 'Discord', icon: '🎮', color: 'linear-gradient(135deg, #7289da, #5865f2)' }
  ];

  const mockServices = {
    instagram: [
      { id: 1, name: 'עוקבים איכותיים', price: '₪0.05', min: 100, max: 100000, active: true },
      { id: 2, name: 'לייקים לפוסטים', price: '₪0.02', min: 50, max: 100000, active: true },
      { id: 3, name: 'תגובות מותאמות', price: '₪0.08', min: 10, max: 1000, active: false },
      { id: 4, name: 'צפיות בסטוריז', price: '₪0.03', min: 100, max: 10000, active: true }
    ],
    facebook: [
      { id: 1, name: 'לייקים לדף עסקי', price: '₪0.07', min: 50, max: 50000, active: true },
      { id: 2, name: 'עוקבים איכותיים', price: '₪0.06', min: 50, max: 25000, active: true },
      { id: 3, name: 'ביקורות חיוביות', price: '₪0.15', min: 5, max: 100, active: true },
      { id: 4, name: 'שיתופים אוטומטיים', price: '₪0.06', min: 20, max: 1000, active: false }
    ]
  };

  const currentServices = mockServices[selectedPlatform as keyof typeof mockServices] || [];

  const handleAddService = () => {
    alert('פתיחת טופס הוספת שירות חדש');
  };

  const handleEditService = (serviceId: number) => {
    alert(`עריכת שירות ID: ${serviceId}`);
  };

  const handleToggleService = (serviceId: number) => {
    alert(`הפעלה/השבתה של שירות ID: ${serviceId}`);
  };

  const handleDeleteService = (serviceId: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את השירות?')) {
      alert(`מחיקת שירות ID: ${serviceId}`);
    }
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
            ⚙️
          </div>
        </div>
        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          ניהול שירותים
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.2rem',
          margin: 0
        }}>
          ניהול מלא של כל השירותים בכל הפלטפורמות
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Platform Selection */}
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
            בחר פלטפורמה לניהול
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                style={{
                  background: selectedPlatform === platform.id 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '20px',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
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
                <span style={{ fontSize: '2rem' }}>{platform.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold' }}>{platform.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {currentServices.length} שירותים
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Services Management */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '25px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              שירותי {platforms.find(p => p.id === selectedPlatform)?.name}
            </h2>
            <button
              onClick={handleAddService}
              style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
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
              ➕ הוסף שירות חדש
            </button>
          </div>

          {/* Services List */}
          <div style={{
            display: 'grid',
            gap: '15px'
          }}>
            {currentServices.map((service) => (
              <div
                key={service.id}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      {service.name}
                    </h3>
                    <div style={{
                      background: service.active ? '#4ade80' : '#ef4444',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {service.active ? 'פעיל' : 'לא פעיל'}
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem'
                  }}>
                    <span>מחיר: {service.price}</span>
                    <span>מינימום: {service.min.toLocaleString()}</span>
                    <span>מקסימום: {service.max.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={() => handleEditService(service.id)}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '0.9rem',
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
                    ✏️ ערוך
                  </button>
                  <button
                    onClick={() => handleToggleService(service.id)}
                    style={{
                      background: service.active ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {service.active ? '⏸️ השבת' : '▶️ הפעל'}
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)';
                    }}
                  >
                    🗑️ מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
