import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const DiscordManagement: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('servers');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<{[key: string]: any}>({});
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  const discordFeatures = {
    servers: [
      {
        id: 'server_members',
        name: 'הוספת חברים לשרת',
        description: 'הוספת חברים איכותיים לשרת הדיסקורד',
        min: 10,
        max: 1000,
        details: 'חברים אמיתיים עם פרופילים מלאים',
        icon: '👥',
        parameters: {
          quantity: { label: 'כמות חברים', min: 10, max: 1000, required: true, type: 'number' },
          serverId: { label: 'ID השרת', required: true, type: 'text' },
          targetType: { label: 'סוג יעד', required: true, type: 'select', options: ['חברים רגילים', 'חברים פעילים', 'חברים עם ניסיון'] }
        }
      },
      {
        id: 'server_boost',
        name: 'Boost לשרת',
        description: 'העלאת רמת השרת עם Nitro Boosts',
        min: 1,
        max: 14,
        details: 'Boost איכותי עם חשבונות אמיתיים',
        icon: '🚀',
        parameters: {
          quantity: { label: 'כמות Boosts', min: 1, max: 14, required: true, type: 'number' },
          serverId: { label: 'ID השרת', required: true, type: 'text' },
          duration: { label: 'משך זמן', required: true, type: 'select', options: ['חודש', '3 חודשים', '6 חודשים', 'שנה'] }
        }
      }
    ],
    gaming: [
      {
        id: 'gaming_communities',
        name: 'קהילות גיימינג ישראליות',
        description: 'יצירת קהילות גיימינג ממוקדות',
        min: 50,
        max: 5000,
        details: 'קהילות איכותיות עם גיימרים ישראליים',
        icon: '🎮',
        parameters: {
          quantity: { label: 'כמות חברים', min: 50, max: 5000, required: true, type: 'number' },
          gameType: { label: 'סוג משחק', required: true, type: 'select', options: ['FPS', 'MOBA', 'RPG', 'Strategy', 'Sports', 'All'] },
          language: { label: 'שפה', required: true, type: 'select', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'] }
        }
      }
    ],
    esports: [
      {
        id: 'esports_servers',
        name: 'שרתי אספורט ישראליים',
        description: 'שרתים מקצועיים לאספורט',
        min: 100,
        max: 10000,
        details: 'שרתים עם תשתית מקצועית',
        icon: '🏆',
        parameters: {
          quantity: { label: 'כמות חברים', min: 100, max: 10000, required: true, type: 'number' },
          esportType: { label: 'סוג אספורט', required: true, type: 'select', options: ['CS:GO', 'Valorant', 'League of Legends', 'Dota 2', 'Overwatch', 'All'] },
          level: { label: 'רמה', required: true, type: 'select', options: ['חובבני', 'חצי מקצועי', 'מקצועי'] }
        }
      }
    ]
  };

  const currentFeatures = discordFeatures[selectedCategory as keyof typeof discordFeatures] || [];
  const selectedFeatureData = (currentFeatures as any[]).find((f: any) => f.id === selectedFeature) as any;

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
    setDynamicParams({});
  };

  const handleExecuteFeature = () => {
    if (!selectedFeatureData) return;

    const activity = {
      id: Date.now(),
      feature: selectedFeatureData.name,
      quantity: dynamicParams.quantity || 0,
      target: dynamicParams.serverId || dynamicParams.gameType || 'N/A',
      source: 'Admin Panel',
      targetType: dynamicParams.targetType || 'N/A',
      timestamp: new Date().toLocaleString('he-IL'),
      status: 'בוצע בהצלחה',
      category: selectedCategory
    };

    setActivityHistory(prev => [activity, ...prev]);
    setDynamicParams({});
    setSelectedFeature('');
  };

  const handleAdvancedCampaign = () => {
    if (selectedFeatures.length === 0) return;

    const campaign = {
      id: Date.now(),
      features: selectedFeatures,
      timestamp: new Date().toLocaleString('he-IL'),
      status: 'קמפיין מתקדם בוצע',
      type: 'Advanced Campaign'
    };

    setActivityHistory(prev => [campaign, ...prev]);
    setSelectedFeatures([]);
    setIsAdvancedMode(false);
  };

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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #7289da 0%, #5865f2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 10px 30px rgba(114, 137, 218, 0.3)'
          }}>
            🎮
          </div>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              ניהול Discord & Gaming
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.2rem',
              margin: 0
            }}>
              שליטה מלאה על קהילות גיימינג ואספורט
            </p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Left Panel - Features */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '25px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            textAlign: 'center'
          }}>
            🎮 פיצ'רים זמינים
          </h2>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '25px',
            justifyContent: 'center'
          }}>
            {Object.keys(discordFeatures).map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedFeature('');
                  setDynamicParams({});
                }}
                style={{
                  background: selectedCategory === category 
                    ? 'linear-gradient(135deg, #7289da, #5865f2)' 
                    : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category === 'servers' && '🖥️ שרתים'}
                {category === 'gaming' && '🎮 גיימינג'}
                {category === 'esports' && '🏆 אספורט'}
              </button>
            ))}
          </div>

          {/* Features List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {currentFeatures.map((feature: any) => (
              <div
                key={feature.id}
                onClick={() => handleFeatureSelect(feature.id)}
                style={{
                  background: selectedFeature === feature.id 
                    ? 'rgba(114, 137, 218, 0.3)' 
                    : 'rgba(255,255,255,0.1)',
                  border: selectedFeature === feature.id 
                    ? '2px solid #7289da' 
                    : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      {feature.name}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem',
                      margin: 0
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem'
                }}>
                  {feature.details}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Parameters & Execution */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '25px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            textAlign: 'center'
          }}>
            ⚙️ הגדרות פיצ'ר
          </h2>

          {selectedFeatureData ? (
            <div>
              {/* Dynamic Parameters */}
              {selectedFeatureData.parameters && (
                <div style={{ marginBottom: '25px' }}>
                  {Object.entries(selectedFeatureData.parameters).map(([key, param]: [string, any]) => (
                    <div key={key} style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                      }}>
                        {param.label} {param.required && <span style={{ color: '#ff6b6b' }}>*</span>}:
                      </label>
                      {param.type === 'select' ? (
                        <select
                          value={dynamicParams[key] || ''}
                          onChange={(e) => setDynamicParams(prev => ({ ...prev, [key]: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '1rem'
                          }}
                        >
                          <option value="" style={{ color: '#000' }}>בחר {param.label.toLowerCase()}...</option>
                          {param.options?.map((option: string) => (
                            <option key={option} value={option} style={{ color: '#000' }}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={param.type === 'number' ? 'number' : 'text'}
                          value={dynamicParams[key] || ''}
                          onChange={(e) => setDynamicParams(prev => ({ 
                            ...prev, 
                            [key]: param.type === 'number' ? Number(e.target.value) : e.target.value 
                          }))}
                          min={param.min}
                          max={param.max}
                          placeholder={`הכנס ${param.label.toLowerCase()}...`}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '1rem'
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Execute Button */}
              <button
                onClick={handleExecuteFeature}
                disabled={!Object.values(selectedFeatureData.parameters || {}).every((param: any) => 
                  !param.required || dynamicParams[Object.keys(selectedFeatureData.parameters || {}).find(key => 
                    selectedFeatureData.parameters[key] === param
                  ) || '']
                )}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7289da, #5865f2)',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '15px',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '20px'
                }}
              >
                🚀 הפעל פיצ'ר
              </button>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.1rem',
              padding: '40px 20px'
            }}>
              בחר פיצ'ר מהרשימה כדי להתחיל
            </div>
          )}

          {/* Advanced Campaign Mode */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setIsAdvancedMode(!isAdvancedMode)}
              style={{
                width: '100%',
                background: isAdvancedMode 
                  ? 'linear-gradient(135deg, #f093fb, #f5576c)' 
                  : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '15px'
              }}
            >
              {isAdvancedMode ? '❌ סגור קמפיין מתקדם' : '🎯 קמפיין מתקדם'}
            </button>

            {isAdvancedMode && (
              <div>
                <p style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  בחר פיצ'רים מרובים לביצוע קמפיין מתקדם
                </p>
                <button
                  onClick={handleAdvancedCampaign}
                  disabled={selectedFeatures.length === 0}
                  style={{
                    width: '100%',
                    background: selectedFeatures.length > 0 
                      ? 'linear-gradient(135deg, #4ade80, #22c55e)' 
                      : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: selectedFeatures.length > 0 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🎯 הפעל קמפיין ({selectedFeatures.length} פיצ'רים)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '25px',
        marginTop: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          textAlign: 'center'
        }}>
          📊 היסטוריית פעילות
        </h2>
        
        {activityHistory.length > 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {activityHistory.map((activity) => (
              <div
                key={activity.id}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '15px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {activity.feature || activity.type}
                  </span>
                  <span style={{
                    color: '#4ade80',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {activity.status}
                  </span>
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem'
                }}>
                  כמות: {activity.quantity || 'N/A'} | יעד: {activity.target} | זמן: {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            padding: '40px 20px'
          }}>
            עדיין לא בוצעו פעולות
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscordManagement;
