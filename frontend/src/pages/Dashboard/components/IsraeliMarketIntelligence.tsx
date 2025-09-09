import React, { useState, useEffect } from 'react';

const IsraeliMarketIntelligence: React.FC = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<any[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMarketData({
        marketSize: 2500000,
        growthRate: 15.8,
        averageSpend: 450,
        topPlatforms: ['Instagram', 'TikTok', 'WhatsApp', 'Facebook'],
        marketTrends: [
          { trend: 'שיווק מקומי', growth: 45, impact: 'גבוה' },
          { trend: 'AI Marketing', growth: 38, impact: 'בינוני' },
          { trend: 'Voice Commerce', growth: 25, impact: 'נמוך' }
        ]
      });

      setCompetitorAnalysis([
        {
          name: 'LikeBooster',
          marketShare: 35,
          pricing: '₪2.50-5.00',
          strengths: ['מחירים נמוכים', 'שירות מהיר'],
          weaknesses: ['איכות נמוכה', 'תמיכה לקויה'],
          threat: 'בינוני'
        },
        {
          name: 'SocialBoost',
          marketShare: 25,
          pricing: '₪3.00-6.00',
          strengths: ['איכות טובה', 'מגוון שירותים'],
          weaknesses: ['מחירים גבוהים', 'זמני המתנה'],
          threat: 'גבוה'
        },
        {
          name: 'InstaGrow',
          marketShare: 20,
          pricing: '₪2.00-4.50',
          strengths: ['מחירים תחרותיים', 'ממשק נוח'],
          weaknesses: ['שירותים מוגבלים', 'אמינות נמוכה'],
          threat: 'נמוך'
        }
      ]);

      setTrendingTopics([
        {
          topic: 'קפה קון לצ\'ה',
          platform: 'Instagram',
          engagement: 95,
          growth: 340,
          sentiment: 'חיובי',
          opportunity: 'גבוהה'
        },
        {
          topic: 'ריקוד ישראלי מקומי',
          platform: 'TikTok',
          engagement: 88,
          growth: 280,
          sentiment: 'חיובי',
          opportunity: 'בינונית'
        },
        {
          topic: 'טכנולוגיה ישראלית',
          platform: 'LinkedIn',
          engagement: 75,
          growth: 120,
          sentiment: 'חיובי',
          opportunity: 'גבוהה'
        },
        {
          topic: 'אוכל ישראלי',
          platform: 'Facebook',
          engagement: 82,
          growth: 150,
          sentiment: 'חיובי',
          opportunity: 'בינונית'
        }
      ]);

      setIsLoading(false);
    }, 2000);
  }, []);

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'גבוה': return '#ef4444';
      case 'בינוני': return '#fbbf24';
      case 'נמוך': return '#4ade80';
      default: return '#6b7280';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'גבוהה': return '#4ade80';
      case 'בינונית': return '#fbbf24';
      case 'נמוכה': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '50px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.2)'
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
          🎯
        </div>
        <h3 style={{
          color: 'white',
          fontSize: '1.5rem',
          margin: 0
        }}>
          אוסף מודיעין שוק...
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          margin: '10px 0 0 0'
        }}>
          מנתח נתונים על המתחרים והטרנדים
        </p>
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
          🎯 מודיעין שוק ישראלי
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          מעקב מחירי מתחרים בזמן אמת, זיהוי טרנדים ישראליים וניתוח התנהגות הקהל הישראלי
        </p>
      </div>

      {/* Market Overview */}
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
          📊 סקירת שוק SMM בישראל
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💰</div>
            <h4 style={{
              color: 'white',
              fontSize: '1.3rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              גודל שוק
            </h4>
            <div style={{
              color: '#4ade80',
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              ₪{marketData.marketSize.toLocaleString()}
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem'
            }}>
              שנתי
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📈</div>
            <h4 style={{
              color: 'white',
              fontSize: '1.3rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              קצב צמיחה
            </h4>
            <div style={{
              color: '#4ade80',
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              +{marketData.growthRate}%
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem'
            }}>
              שנתי
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>💳</div>
            <h4 style={{
              color: 'white',
              fontSize: '1.3rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              הוצאה ממוצעת
            </h4>
            <div style={{
              color: '#fbbf24',
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              ₪{marketData.averageSpend}
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.9rem'
            }}>
              לקוח
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📱</div>
            <h4 style={{
              color: 'white',
              fontSize: '1.3rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              פלטפורמות מובילות
            </h4>
            <div style={{
              color: 'white',
              fontSize: '1rem',
              lineHeight: 1.4
            }}>
              {marketData.topPlatforms.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
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
          🏆 ניתוח מתחרים
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {competitorAnalysis.map((competitor, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '25px',
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
                marginBottom: '20px'
              }}>
                <h4 style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  {competitor.name}
                </h4>
                <div style={{
                  background: getThreatColor(competitor.threat),
                  borderRadius: '15px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  איום: {competitor.threat}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    marginBottom: '5px'
                  }}>
                    נתח שוק
                  </div>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {competitor.marketShare}%
                  </div>
                </div>
                <div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    marginBottom: '5px'
                  }}>
                    מחירים
                  </div>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {competitor.pricing}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  נקודות חוזק:
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px'
                }}>
                  {competitor.strengths.map((strength: string, sIndex: number) => (
                    <span
                      key={sIndex}
                      style={{
                        background: 'rgba(74, 222, 128, 0.2)',
                        borderRadius: '8px',
                        padding: '3px 8px',
                        color: '#4ade80',
                        fontSize: '0.8rem'
                      }}
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  נקודות חולשה:
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px'
                }}>
                  {competitor.weaknesses.map((weakness: string, wIndex: number) => (
                    <span
                      key={wIndex}
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        borderRadius: '8px',
                        padding: '3px 8px',
                        color: '#ef4444',
                        fontSize: '0.8rem'
                      }}
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
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
          🔥 נושאים טרנדיים בישראל
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
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
                  fontSize: '1.2rem',
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  {topic.topic}
                </h4>
                <div style={{
                  background: getOpportunityColor(topic.opportunity),
                  borderRadius: '15px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {topic.opportunity}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem'
                }}>
                  {topic.platform}
                </span>
                <span style={{
                  color: '#4ade80',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}>
                  +{topic.growth}%
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '15px'
              }}>
                <div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    marginBottom: '3px'
                  }}>
                    מעורבות
                  </div>
                  <div style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {topic.engagement}%
                  </div>
                </div>
                <div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    marginBottom: '3px'
                  }}>
                    סנטימנט
                  </div>
                  <div style={{
                    color: topic.sentiment === 'חיובי' ? '#4ade80' : '#ef4444',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {topic.sentiment}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '8px',
                textAlign: 'center'
              }}>
                <button style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  יצור קמפיין
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends */}
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
          📈 מגמות שוק
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {marketData.marketTrends.map((trend: any, index: number) => (
            <div
              key={index}
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
                  fontSize: '1.2rem',
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  {trend.trend}
                </h4>
                <div style={{
                  background: trend.impact === 'גבוה' ? '#4ade80' : 
                             trend.impact === 'בינוני' ? '#fbbf24' : '#ef4444',
                  borderRadius: '15px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {trend.impact}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem'
                }}>
                  צמיחה
                </span>
                <span style={{
                  color: '#4ade80',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}>
                  +{trend.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IsraeliMarketIntelligence;
