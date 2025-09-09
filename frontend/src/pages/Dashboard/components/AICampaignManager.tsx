import React, { useState, useEffect } from 'react';

const AICampaignManager: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);

  const israeliTrends = [
    {
      platform: 'Instagram',
      trend: 'קפה קון לצ\'ה',
      growth: '+340%',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      description: 'טרנד הקפה הישראלי מתפוצץ ברשתות החברתיות'
    },
    {
      platform: 'TikTok',
      trend: 'ריקוד ישראלי מקומי',
      growth: '+280%',
      color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      description: 'ריקודים עם מוזיקה ישראלית זוכים לפופולריות'
    },
    {
      platform: 'Facebook',
      trend: 'קבוצות קהילה מקומיות',
      growth: '+190%',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      description: 'עלייה בפעילות בקבוצות קהילה ישראליות'
    },
    {
      platform: 'WhatsApp',
      trend: 'שיווק מקומי',
      growth: '+450%',
      color: 'linear-gradient(135deg, #25d366, #128c7e)',
      description: 'שיווק מקומי דרך WhatsApp Business צומח במהירות'
    }
  ];

  const aiRecommendations = [
    {
      type: 'הזדמנות חמה',
      title: 'קמפיין פסח',
      description: 'הזמן המושלם לקמפיין פסח - 3 שבועות לפני החג',
      impact: 'גבוה',
      platforms: ['Instagram', 'Facebook', 'WhatsApp'],
      budget: '₪2,500',
      expectedROI: '340%'
    },
    {
      type: 'טרנד מתפתח',
      title: 'תוכן מקומי ישראלי',
      description: 'עלייה של 280% בתוכן מקומי - הזדמנות לקמפיין ויראלי',
      impact: 'בינוני',
      platforms: ['TikTok', 'Instagram'],
      budget: '₪1,800',
      expectedROI: '280%'
    },
    {
      type: 'אופטימיזציה',
      title: 'שיפור קמפיין קיים',
      description: 'הקמפיין הנוכחי יכול להשתפר ב-45% עם שינויים קטנים',
      impact: 'נמוך',
      platforms: ['Facebook', 'Instagram'],
      budget: '₪500',
      expectedROI: '145%'
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResults({
        audienceInsights: {
          ageGroups: { '18-24': 35, '25-34': 40, '35-44': 20, '45+': 5 },
          interests: ['טכנולוגיה', 'אוכל', 'ספורט', 'מוזיקה', 'תיירות'],
          locations: { 'תל אביב': 30, 'ירושלים': 20, 'חיפה': 15, 'אחר': 35 }
        },
        optimalTiming: {
          bestHours: ['09:00-11:00', '14:00-16:00', '20:00-22:00'],
          bestDays: ['ראשון', 'שלישי', 'חמישי'],
          avoidDays: ['שבת']
        },
        contentSuggestions: [
          'תוכן על אוכל ישראלי מקומי',
          'סרטונים על תרבות ישראלית',
          'פוסטים על טכנולוגיה ישראלית',
          'תוכן על חגים יהודיים'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
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
          🤖 AI Campaign Manager
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          מנוע AI מתקדם שמנתח טרנדים ישראליים, מנבא ביצועים וממקסם קמפיינים אוטומטית
        </p>
      </div>

      {/* Analysis Button */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '15px',
            padding: '20px 40px',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: isAnalyzing ? 'not-allowed' : 'pointer',
            opacity: isAnalyzing ? 0.7 : 1,
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isAnalyzing) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isAnalyzing) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }
          }}
        >
          {isAnalyzing ? 'מנתח טרנדים...' : '🔍 נתח טרנדים ישראליים עכשיו'}
        </button>
      </div>

      {/* Israeli Trends */}
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
          🇮🇱 טרנדים ישראליים חמים
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {israeliTrends.map((trend, index) => (
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
                  {trend.platform}
                </h4>
                <div style={{
                  background: trend.color,
                  borderRadius: '20px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {trend.growth}
                </div>
              </div>
              <h5 style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.1rem',
                margin: '0 0 10px 0',
                fontWeight: '600'
              }}>
                {trend.trend}
              </h5>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                margin: 0,
                lineHeight: 1.5
              }}>
                {trend.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
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
          🎯 המלצות AI חכמות
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {aiRecommendations.map((rec, index) => (
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
                marginBottom: '15px'
              }}>
                <span style={{
                  background: rec.impact === 'גבוה' ? 'linear-gradient(135deg, #43e97b, #38f9d7)' :
                             rec.impact === 'בינוני' ? 'linear-gradient(135deg, #f093fb, #f5576c)' :
                             'linear-gradient(135deg, #4facfe, #00f2fe)',
                  borderRadius: '15px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {rec.type}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  השפעה: {rec.impact}
                </span>
              </div>
              
              <h4 style={{
                color: 'white',
                fontSize: '1.3rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                {rec.title}
              </h4>
              
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                margin: '0 0 15px 0',
                lineHeight: 1.5
              }}>
                {rec.description}
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '15px'
              }}>
                {rec.platforms.map((platform, pIndex) => (
                  <span
                    key={pIndex}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '10px',
                      padding: '4px 10px',
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    {platform}
                  </span>
                ))}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem'
                  }}>
                    תקציב: 
                  </span>
                  <span style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginRight: '5px'
                  }}>
                    {rec.budget}
                  </span>
                </div>
                <div>
                  <span style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem'
                  }}>
                    ROI צפוי: 
                  </span>
                  <span style={{
                    color: '#4ade80',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginRight: '5px'
                  }}>
                    {rec.expectedROI}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
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
            📊 תוצאות ניתוח AI
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {/* Audience Insights */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                margin: '0 0 15px 0',
                fontWeight: 'bold'
              }}>
                👥 תובנות קהל
              </h4>
              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', margin: '0 0 8px 0' }}>
                  קבוצות גיל:
                </h5>
                {Object.entries(analysisResults.audienceInsights.ageGroups).map(([age, percent]) => (
                  <div key={age} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: 'white', fontSize: '0.9rem' }}>{age}</span>
                    <span style={{ color: '#4ade80', fontSize: '0.9rem', fontWeight: 'bold' }}>{String(percent)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimal Timing */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                margin: '0 0 15px 0',
                fontWeight: 'bold'
              }}>
                ⏰ זמנים אופטימליים
              </h4>
              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', margin: '0 0 8px 0' }}>
                  שעות מומלצות:
                </h5>
                {analysisResults.optimalTiming.bestHours.map((hour: string, index: number) => (
                  <div key={index} style={{ color: 'white', fontSize: '0.9rem', marginBottom: '3px' }}>
                    {hour}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Suggestions */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                margin: '0 0 15px 0',
                fontWeight: 'bold'
              }}>
                💡 הצעות תוכן
              </h4>
              {analysisResults.contentSuggestions.map((suggestion: string, index: number) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '8px',
                  color: 'white',
                  fontSize: '0.9rem'
                }}>
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICampaignManager;
