import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SpotifyManagement: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('playlists');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [dynamicParams, setDynamicParams] = useState<{[key: string]: any}>({});
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  const spotifyFeatures = {
    playlists: [
      {
        id: 'playlist_plays',
        name: 'Plays לפלייליסטים',
        description: 'הגדלת מספר ההשמעות לפלייליסטים',
        min: 100,
        max: 100000,
        details: 'השמעות איכותיות עם retention גבוה',
        icon: '🎵',
        parameters: {
          quantity: { label: 'כמות השמעות', min: 100, max: 100000, required: true, type: 'number' },
          playlistId: { label: 'ID הפלייליסט', required: true, type: 'text' },
          targetType: { label: 'סוג יעד', required: true, type: 'select', options: ['פלייליסט ציבורי', 'פלייליסט פרטי', 'פלייליסט קולבורטיבי'] }
        }
      },
      {
        id: 'playlist_followers',
        name: 'עוקבים לפלייליסטים',
        description: 'הוספת עוקבים לפלייליסטים',
        min: 50,
        max: 10000,
        details: 'עוקבים אמיתיים עם טעם מוזיקלי דומה',
        icon: '👥',
        parameters: {
          quantity: { label: 'כמות עוקבים', min: 50, max: 10000, required: true, type: 'number' },
          playlistId: { label: 'ID הפלייליסט', required: true, type: 'text' },
          musicTaste: { label: 'טעם מוזיקלי', required: true, type: 'select', options: ['פופ', 'רוק', 'היפ הופ', 'אלקטרוני', 'קלאסי', 'ג\'אז', 'All'] }
        }
      }
    ],
    artists: [
      {
        id: 'artist_followers',
        name: 'עוקבים לאמנים',
        description: 'הוספת עוקבים לפרופילי אמנים',
        min: 100,
        max: 50000,
        details: 'עוקבים איכותיים עם עניין במוזיקה',
        icon: '🎤',
        parameters: {
          quantity: { label: 'כמות עוקבים', min: 100, max: 50000, required: true, type: 'number' },
          artistId: { label: 'ID האמן', required: true, type: 'text' },
          genre: { label: 'ז\'אנר', required: true, type: 'select', options: ['פופ', 'רוק', 'היפ הופ', 'אלקטרוני', 'R&B', 'קאנטרי', 'All'] }
        }
      },
      {
        id: 'artist_monthly_listeners',
        name: 'מאזינים חודשיים',
        description: 'הגדלת מספר המאזינים החודשיים',
        min: 1000,
        max: 1000000,
        details: 'מאזינים אמיתיים עם פעילות קבועה',
        icon: '👂',
        parameters: {
          quantity: { label: 'כמות מאזינים', min: 1000, max: 1000000, required: true, type: 'number' },
          artistId: { label: 'ID האמן', required: true, type: 'text' },
          retention: { label: 'רמת שמירה', required: true, type: 'select', options: ['גבוהה', 'בינונית', 'נמוכה'] }
        }
      }
    ],
    albums: [
      {
        id: 'album_streams',
        name: 'סטרימינג לאלבומים',
        description: 'הגדלת מספר הסטרימינג לאלבומים',
        min: 500,
        max: 500000,
        details: 'סטרימינג איכותי עם זמן האזנה מלא',
        icon: '💿',
        parameters: {
          quantity: { label: 'כמות סטרימינג', min: 500, max: 500000, required: true, type: 'number' },
          albumId: { label: 'ID האלבום', required: true, type: 'text' },
          playType: { label: 'סוג השמעה', required: true, type: 'select', options: ['השמעה מלאה', 'השמעה חלקית', 'השמעה חוזרת'] }
        }
      },
      {
        id: 'album_saves',
        name: 'שמירות לאלבומים',
        description: 'הוספת שמירות לאלבומים',
        min: 50,
        max: 25000,
        details: 'שמירות אמיתיות של משתמשים פעילים',
        icon: '❤️',
        parameters: {
          quantity: { label: 'כמות שמירות', min: 50, max: 25000, required: true, type: 'number' },
          albumId: { label: 'ID האלבום', required: true, type: 'text' },
          saveType: { label: 'סוג שמירה', required: true, type: 'select', options: ['שמירה לפלייליסט', 'שמירה לספרייה', 'שמירה להורדה'] }
        }
      }
    ],
    podcasts: [
      {
        id: 'podcast_listeners',
        name: 'מאזינים לפודקאסטים',
        description: 'הוספת מאזינים לפודקאסטים',
        min: 100,
        max: 100000,
        details: 'מאזינים איכותיים עם עניין בתוכן',
        icon: '🎙️',
        parameters: {
          quantity: { label: 'כמות מאזינים', min: 100, max: 100000, required: true, type: 'number' },
          podcastId: { label: 'ID הפודקאסט', required: true, type: 'text' },
          category: { label: 'קטגוריה', required: true, type: 'select', options: ['חדשות', 'טכנולוגיה', 'בידור', 'ספורט', 'חינוך', 'עסקים', 'All'] }
        }
      },
      {
        id: 'podcast_episode_plays',
        name: 'השמעות לפרקי פודקאסט',
        description: 'הגדלת מספר ההשמעות לפרקים',
        min: 200,
        max: 200000,
        details: 'השמעות איכותיות עם זמן האזנה מלא',
        icon: '▶️',
        parameters: {
          quantity: { label: 'כמות השמעות', min: 200, max: 200000, required: true, type: 'number' },
          episodeId: { label: 'ID הפרק', required: true, type: 'text' },
          listenDuration: { label: 'משך האזנה', required: true, type: 'select', options: ['האזנה מלאה', 'האזנה חלקית', 'האזנה חוזרת'] }
        }
      }
    ],
    analytics: [
      {
        id: 'streaming_analytics',
        name: 'אנליטיקס סטרימינג',
        description: 'ניתוח מתקדם של נתוני סטרימינג',
        min: 1,
        max: 1,
        details: 'דוחות מפורטים על ביצועי המוזיקה',
        icon: '📊',
        parameters: {
          artistId: { label: 'ID האמן', required: true, type: 'text' },
          reportType: { label: 'סוג דוח', required: true, type: 'select', options: ['דוח חודשי', 'דוח שבועי', 'דוח יומי', 'דוח מפורט'] },
          metrics: { label: 'מדדים', required: true, type: 'multiselect', options: ['השמעות', 'עוקבים', 'שמירות', 'שיתופים', 'דמוגרפיה', 'גיאוגרפיה'] }
        }
      },
      {
        id: 'playlist_optimization',
        name: 'אופטימיזציה לפלייליסטים',
        description: 'שיפור ביצועי פלייליסטים',
        min: 1,
        max: 1,
        details: 'אופטימיזציה אוטומטית של סדר השירים',
        icon: '⚡',
        parameters: {
          playlistId: { label: 'ID הפלייליסט', required: true, type: 'text' },
          optimizationType: { label: 'סוג אופטימיזציה', required: true, type: 'select', options: ['סדר שירים', 'הוספת שירים', 'הסרת שירים', 'אופטימיזציה מלאה'] },
          targetAudience: { label: 'קהל יעד', required: true, type: 'select', options: ['כללי', 'גיל ספציפי', 'טעם מוזיקלי', 'מיקום גיאוגרפי'] }
        }
      }
    ],
    advanced: [
      {
        id: 'israeli_music_promotion',
        name: 'קידום מוזיקה ישראלית',
        description: 'קידום מיוחד למוזיקה ישראלית',
        min: 1000,
        max: 100000,
        details: 'קידום ממוקד לשוק הישראלי',
        icon: '🇮🇱',
        parameters: {
          quantity: { label: 'כמות השמעות', min: 1000, max: 100000, required: true, type: 'number' },
          trackId: { label: 'ID השיר', required: true, type: 'text' },
          language: { label: 'שפה', required: true, type: 'select', options: ['עברית', 'ערבית', 'רוסית', 'אנגלית', 'All'] },
          region: { label: 'אזור', required: true, type: 'select', options: ['ישראל', 'ארה"ב', 'אירופה', 'כל העולם'] }
        }
      },
      {
        id: 'hebrew_podcasts',
        name: 'פודקאסטים בעברית',
        description: 'קידום פודקאסטים בעברית',
        min: 500,
        max: 50000,
        details: 'קידום ממוקד לפודקאסטים ישראליים',
        icon: '🎧',
        parameters: {
          quantity: { label: 'כמות מאזינים', min: 500, max: 50000, required: true, type: 'number' },
          podcastId: { label: 'ID הפודקאסט', required: true, type: 'text' },
          topic: { label: 'נושא', required: true, type: 'select', options: ['חדשות ישראל', 'טכנולוגיה', 'בידור', 'ספורט', 'חינוך', 'עסקים', 'All'] },
          targetAge: { label: 'גיל יעד', required: true, type: 'select', options: ['18-25', '26-35', '36-45', '46-55', '55+', 'All'] }
        }
      }
    ]
  };

  const currentFeatures = spotifyFeatures[selectedCategory as keyof typeof spotifyFeatures] || [];
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
      target: dynamicParams.playlistId || dynamicParams.artistId || dynamicParams.albumId || dynamicParams.podcastId || 'N/A',
      source: 'Admin Panel',
      targetType: dynamicParams.targetType || dynamicParams.genre || 'N/A',
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
            background: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 10px 30px rgba(29, 185, 84, 0.3)'
          }}>
            🎵
          </div>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              ניהול Spotify
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.2rem',
              margin: 0
            }}>
              שליטה מלאה על מוזיקה ופודקאסטים
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
            🎵 פיצ'רים זמינים
          </h2>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '25px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {Object.keys(spotifyFeatures).map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedFeature('');
                  setDynamicParams({});
                }}
                style={{
                  background: selectedCategory === category 
                    ? 'linear-gradient(135deg, #1db954, #1ed760)' 
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
                {category === 'playlists' && '🎵 פלייליסטים'}
                {category === 'artists' && '🎤 אמנים'}
                {category === 'albums' && '💿 אלבומים'}
                {category === 'podcasts' && '🎙️ פודקאסטים'}
                {category === 'analytics' && '📊 אנליטיקס'}
                {category === 'advanced' && '🚀 מתקדם'}
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
                    ? 'rgba(29, 185, 84, 0.3)' 
                    : 'rgba(255,255,255,0.1)',
                  border: selectedFeature === feature.id 
                    ? '2px solid #1db954' 
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
                      ) : param.type === 'multiselect' ? (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          maxHeight: '120px',
                          overflowY: 'auto',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          padding: '10px'
                        }}>
                          {param.options?.map((option: string) => (
                            <label key={option} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              color: 'white',
                              fontSize: '0.9rem',
                              cursor: 'pointer'
                            }}>
                              <input
                                type="checkbox"
                                checked={dynamicParams[key]?.includes(option) || false}
                                onChange={(e) => {
                                  const currentValues = dynamicParams[key] || [];
                                  if (e.target.checked) {
                                    setDynamicParams(prev => ({ ...prev, [key]: [...currentValues, option] }));
                                  } else {
                                    setDynamicParams(prev => ({ ...prev, [key]: currentValues.filter((v: string) => v !== option) }));
                                  }
                                }}
                                style={{ transform: 'scale(1.2)' }}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
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
                  background: 'linear-gradient(135deg, #1db954, #1ed760)',
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

export default SpotifyManagement;
