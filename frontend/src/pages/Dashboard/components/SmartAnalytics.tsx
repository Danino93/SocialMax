import React, { useState, useEffect } from 'react';

const SmartAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const periods = [
    { id: 'day', name: 'היום', icon: '📅' },
    { id: 'week', name: 'השבוע', icon: '📊' },
    { id: 'month', name: 'החודש', icon: '📈' },
    { id: 'quarter', name: 'הרבעון', icon: '🎯' }
  ];

  const mockData = {
    day: {
      revenue: 1250,
      orders: 45,
      roi: 280,
      conversion: 12.5,
      platforms: {
        'Instagram': { revenue: 450, orders: 18, growth: 15 },
        'Facebook': { revenue: 320, orders: 12, growth: 8 },
        'TikTok': { revenue: 280, orders: 10, growth: 25 },
        'WhatsApp': { revenue: 200, orders: 5, growth: 40 }
      }
    },
    week: {
      revenue: 8750,
      orders: 315,
      roi: 320,
      conversion: 14.2,
      platforms: {
        'Instagram': { revenue: 3150, orders: 126, growth: 18 },
        'Facebook': { revenue: 2240, orders: 84, growth: 12 },
        'TikTok': { revenue: 1960, orders: 70, growth: 35 },
        'WhatsApp': { revenue: 1400, orders: 35, growth: 45 }
      }
    },
    month: {
      revenue: 35000,
      orders: 1260,
      roi: 380,
      conversion: 16.8,
      platforms: {
        'Instagram': { revenue: 12600, orders: 504, growth: 22 },
        'Facebook': { revenue: 8960, orders: 336, growth: 15 },
        'TikTok': { revenue: 7840, orders: 280, growth: 42 },
        'WhatsApp': { revenue: 5600, orders: 140, growth: 55 }
      }
    },
    quarter: {
      revenue: 105000,
      orders: 3780,
      roi: 420,
      conversion: 18.5,
      platforms: {
        'Instagram': { revenue: 37800, orders: 1512, growth: 28 },
        'Facebook': { revenue: 26880, orders: 1008, growth: 18 },
        'TikTok': { revenue: 23520, orders: 840, growth: 48 },
        'WhatsApp': { revenue: 16800, orders: 420, growth: 65 }
      }
    }
  };

  useEffect(() => {
    setAnalyticsData(mockData[selectedPeriod as keyof typeof mockData]);
  }, [selectedPeriod]);

  const getGrowthColor = (growth: number) => {
    if (growth >= 30) return '#4ade80';
    if (growth >= 15) return '#fbbf24';
    return '#ef4444';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 350) return '#4ade80';
    if (roi >= 250) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div>
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
        <h2 style={{
          color: 'white',
          fontSize: '2.2rem',
          margin: '0 0 15px 0',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          📊 Smart Analytics Dashboard
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          ניתוח ROI בזמן אמת בשקלים, מפות חום של אינטראקציה בישראל ודוחות חיזוי מבוססי מגמות ישראליות
        </p>
      </div>

      {/* Period Selector */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '1.3rem',
          margin: '0 0 15px 0',
          fontWeight: 'bold'
        }}>
          📅 בחר תקופה לניתוח:
        </h3>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              style={{
                background: selectedPeriod === period.id 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (selectedPeriod !== period.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPeriod !== period.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <span>{period.icon}</span>
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {analyticsData && (
        <>
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '10px'
              }}>
                💰
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                הכנסות
              </h3>
              <div style={{
                color: '#4ade80',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                ₪{analyticsData.revenue.toLocaleString()}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                +12% מהתקופה הקודמת
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '10px'
              }}>
                📋
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                הזמנות
              </h3>
              <div style={{
                color: '#4ade80',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                {analyticsData.orders.toLocaleString()}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                +8% מהתקופה הקודמת
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '10px'
              }}>
                🎯
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                ROI
              </h3>
              <div style={{
                color: getROIColor(analyticsData.roi),
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                {analyticsData.roi}%
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                +15% מהתקופה הקודמת
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '10px'
              }}>
                🔄
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                המרות
              </h3>
              <div style={{
                color: '#4ade80',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '5px'
              }}>
                {analyticsData.conversion}%
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}>
                +3% מהתקופה הקודמת
              </div>
            </div>
          </div>

          {/* Platform Performance */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.8rem',
              margin: '0 0 25px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              📱 ביצועי פלטפורמות
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {Object.entries(analyticsData.platforms).map(([platform, data]: [string, any]) => (
                <div
                  key={platform}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '1.3rem',
                      margin: 0,
                      fontWeight: 'bold'
                    }}>
                      {platform}
                    </h4>
                    <div style={{
                      background: getGrowthColor(data.growth),
                      borderRadius: '15px',
                      padding: '5px 12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      +{data.growth}%
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px'
                  }}>
                    <div>
                      <div style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.9rem',
                        marginBottom: '5px'
                      }}>
                        הכנסות
                      </div>
                      <div style={{
                        color: '#4ade80',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        ₪{data.revenue.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.9rem',
                        marginBottom: '5px'
                      }}>
                        הזמנות
                      </div>
                      <div style={{
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        {data.orders}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Israeli Market Heat Map */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.8rem',
              margin: '0 0 25px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🗺️ מפת חום אינטראקציה בישראל
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              {[
                { city: 'תל אביב', activity: 95, color: '#4ade80' },
                { city: 'ירושלים', activity: 78, color: '#fbbf24' },
                { city: 'חיפה', activity: 65, color: '#fbbf24' },
                { city: 'באר שבע', activity: 45, color: '#ef4444' },
                { city: 'אשדוד', activity: 38, color: '#ef4444' },
                { city: 'נתניה', activity: 42, color: '#ef4444' }
              ].map((city, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '15px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    margin: '0 0 10px 0',
                    fontWeight: 'bold'
                  }}>
                    {city.city}
                  </h4>
                  <div style={{
                    background: city.color,
                    borderRadius: '10px',
                    padding: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '5px'
                  }}>
                    {city.activity}%
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem'
                  }}>
                    פעילות גבוהה
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Analytics */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.8rem',
              margin: '0 0 25px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🔮 תחזיות מבוססות מגמות ישראליות
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  📈 תחזית הכנסות
                </h4>
                <div style={{
                  color: '#4ade80',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  ₪{(analyticsData.revenue * 1.25).toLocaleString()}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  +25% צמיחה צפויה בחודש הבא
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  🎯 הזדמנויות חמות
                </h4>
                <div style={{
                  color: '#fbbf24',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  WhatsApp Business
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  צמיחה של 65% - הזדמנות לקמפיין חדש
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  ⚠️ אזהרות
                </h4>
                <div style={{
                  color: '#ef4444',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  Facebook
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  צמיחה איטית - שקול הפחתת תקציב
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SmartAnalytics;
