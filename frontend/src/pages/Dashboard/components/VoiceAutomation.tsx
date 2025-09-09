import React, { useState, useEffect } from 'react';

const VoiceAutomation: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState<any[]>([]);
  const [recentCommands, setRecentCommands] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Mock voice commands data
    setVoiceCommands([
      {
        id: 1,
        command: 'הזמן לייקים לאינסטגרם',
        description: 'הזמן שירות לייקים לאינסטגרם',
        category: 'הזמנות',
        icon: '📱',
        example: 'הזמן לייקים לאינסטגרם 1000 לייקים'
      },
      {
        id: 2,
        command: 'נתח את הקמפיין שלי',
        description: 'הפעל ניתוח AI לקמפיין הנוכחי',
        category: 'ניתוח',
        icon: '🤖',
        example: 'נתח את הקמפיין שלי ותן לי המלצות'
      },
      {
        id: 3,
        command: 'הצג לי את הסטטיסטיקות',
        description: 'הצג סטטיסטיקות עדכניות',
        category: 'דוחות',
        icon: '📊',
        example: 'הצג לי את הסטטיסטיקות של השבוע'
      },
      {
        id: 4,
        command: 'הוסף כסף לחשבון',
        description: 'הוסף כסף ליתרה',
        category: 'כספים',
        icon: '💰',
        example: 'הוסף 500 שקלים לחשבון שלי'
      },
      {
        id: 5,
        command: 'הזמן שירות לטלגרם',
        description: 'הזמן שירות לטלגרם',
        category: 'הזמנות',
        icon: '📱',
        example: 'הזמן חברים לטלגרם 500 חברים'
      },
      {
        id: 6,
        command: 'הצג הזדמנויות חמות',
        description: 'הצג הזדמנויות שיווקיות חמות',
        category: 'הזדמנויות',
        icon: '🔥',
        example: 'הצג לי הזדמנויות חמות לשיווק'
      }
    ]);

    setRecentCommands([
      {
        id: 1,
        command: 'הזמן לייקים לאינסטגרם 1000 לייקים',
        timestamp: '2024-03-15 14:30',
        status: 'הושלם',
        result: 'הזמנה נוצרה בהצלחה - 1000 לייקים'
      },
      {
        id: 2,
        command: 'נתח את הקמפיין שלי',
        timestamp: '2024-03-15 13:45',
        status: 'הושלם',
        result: 'ניתוח הושלם - ROI 320%'
      },
      {
        id: 3,
        command: 'הצג סטטיסטיקות',
        timestamp: '2024-03-15 12:20',
        status: 'הושלם',
        result: 'הכנסות: ₪2,500 השבוע'
      }
    ]);
  }, []);

  const handleStartListening = () => {
    setIsListening(true);
    setIsProcessing(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsProcessing(false);
      setIsListening(false);
      
      // Add new command to recent commands
      const newCommand = {
        id: Date.now(),
        command: 'הזמן לייקים לפייסבוק 500 לייקים',
        timestamp: new Date().toLocaleString('he-IL'),
        status: 'הושלם',
        result: 'הזמנה נוצרה בהצלחה - 500 לייקים לפייסבוק'
      };
      
      setRecentCommands(prev => [newCommand, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'הזמנות': 'linear-gradient(135deg, #4ade80, #22c55e)',
      'ניתוח': 'linear-gradient(135deg, #667eea, #764ba2)',
      'דוחות': 'linear-gradient(135deg, #f093fb, #f5576c)',
      'כספים': 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      'הזדמנויות': 'linear-gradient(135deg, #ef4444, #dc2626)'
    };
    return colors[category] || 'linear-gradient(135deg, #6b7280, #4b5563)';
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
          🎙️ אוטומציה קולית בעברית
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          הזמנות בקול בעברית, דיווחים קוליים, אלרטים חכמים והבנת סלנג ישראלי
        </p>
      </div>

      {/* Voice Control */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: isListening 
            ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
            : 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none',
          boxShadow: isListening 
            ? '0 0 50px rgba(239, 68, 68, 0.5)' 
            : '0 10px 30px rgba(102, 126, 234, 0.3)'
        }}
        onClick={isListening ? handleStopListening : handleStartListening}
        onMouseEnter={(e) => {
          if (!isListening) {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isListening) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        >
          <span style={{
            fontSize: '3rem',
            color: 'white'
          }}>
            {isListening ? '🛑' : '🎤'}
          </span>
        </div>

        <h3 style={{
          color: 'white',
          fontSize: '1.8rem',
          margin: '0 0 15px 0',
          fontWeight: 'bold'
        }}>
          {isListening ? 'מאזין לך...' : 'לחץ כדי לדבר'}
        </h3>
        
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '1.1rem',
          margin: '0 0 20px 0'
        }}>
          {isListening 
            ? 'אמור את הפקודה שלך בעברית' 
            : 'אמור "הזמן לייקים לאינסטגרם" או כל פקודה אחרת'
          }
        </p>

        {isProcessing && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              color: 'white'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 1s ease-in-out infinite'
              }}></div>
              <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                מעבד את הפקודה שלך...
              </span>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '15px',
          padding: '20px',
          marginTop: '20px',
          textAlign: 'right'
        }}>
          <h4 style={{
            color: 'white',
            fontSize: '1.2rem',
            margin: '0 0 15px 0',
            fontWeight: 'bold'
          }}>
            דוגמאות לפקודות:
          </h4>
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>
            "הזמן לייקים לאינסטגרם 1000 לייקים"<br/>
            "נתח את הקמפיין שלי"<br/>
            "הצג לי את הסטטיסטיקות"<br/>
            "הוסף 500 שקלים לחשבון"
          </div>
        </div>
      </div>

      {/* Voice Commands */}
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
          🗣️ פקודות קוליות זמינות
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {voiceCommands.map((command) => (
            <div
              key={command.id}
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
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <span style={{ fontSize: '1.8rem' }}>{command.icon}</span>
                <div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    {command.command}
                  </h4>
                  <div style={{
                    background: getCategoryColor(command.category),
                    borderRadius: '10px',
                    padding: '3px 8px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}>
                    {command.category}
                  </div>
                </div>
              </div>
              
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                margin: '0 0 15px 0',
                lineHeight: 1.5
              }}>
                {command.description}
              </p>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem',
                  marginBottom: '5px',
                  fontWeight: 'bold'
                }}>
                  דוגמה:
                </div>
                <div style={{
                  color: '#4ade80',
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}>
                  "{command.example}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Commands */}
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
          📝 פקודות אחרונות
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {recentCommands.map((command) => (
            <div
              key={command.id}
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
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
                  fontSize: '1.1rem',
                  margin: 0,
                  fontWeight: 'bold'
                }}>
                  {command.command}
                </h4>
                <div style={{
                  background: command.status === 'הושלם' ? '#4ade80' : '#fbbf24',
                  borderRadius: '10px',
                  padding: '4px 10px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {command.status}
                </div>
              </div>
              
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.95rem',
                margin: '0 0 10px 0',
                lineHeight: 1.4
              }}>
                {command.result}
              </p>
              
              <div style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.8rem'
              }}>
                {command.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default VoiceAutomation;
