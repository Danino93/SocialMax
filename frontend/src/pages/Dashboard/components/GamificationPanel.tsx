import React, { useState, useEffect } from 'react';

const GamificationPanel: React.FC = () => {
  const [userLevel, setUserLevel] = useState(7);
  const [points, setPoints] = useState(2840);
  const [dailyTasks, setDailyTasks] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    // Mock data for gamification
    setDailyTasks([
      {
        id: 1,
        title: 'הזמן שירות חדש',
        description: 'הזמן שירות כלשהו היום',
        points: 50,
        completed: false,
        icon: '🛒'
      },
      {
        id: 2,
        title: 'השתמש ב-AI Manager',
        description: 'הפעל ניתוח AI לקמפיין',
        points: 100,
        completed: true,
        icon: '🤖'
      },
      {
        id: 3,
        title: 'שתף תוצאות',
        description: 'שתף תוצאות קמפיין ברשתות',
        points: 75,
        completed: false,
        icon: '📤'
      },
      {
        id: 4,
        title: 'הזמן 3 שירותים',
        description: 'הזמן לפחות 3 שירותים שונים',
        points: 150,
        completed: false,
        icon: '🎯'
      }
    ]);

    setAchievements([
      {
        id: 1,
        title: 'מתחיל',
        description: 'הזמנה ראשונה',
        icon: '🎉',
        unlocked: true,
        points: 100,
        date: '2024-01-15'
      },
      {
        id: 2,
        title: 'מקצוען',
        description: '10 הזמנות מושלמות',
        icon: '🏆',
        unlocked: true,
        points: 500,
        date: '2024-02-20'
      },
      {
        id: 3,
        title: 'מאסטר AI',
        description: 'השתמש ב-AI Manager 5 פעמים',
        icon: '🤖',
        unlocked: true,
        points: 300,
        date: '2024-03-10'
      },
      {
        id: 4,
        title: 'מלך הטרנדים',
        description: 'זהה 3 טרנדים חמים',
        icon: '🔥',
        unlocked: false,
        points: 400,
        progress: 2
      },
      {
        id: 5,
        title: 'מלך השקלים',
        description: 'השקע ₪10,000 בשירותים',
        icon: '💰',
        unlocked: false,
        points: 1000,
        progress: 65
      }
    ]);

    setLeaderboard([
      { rank: 1, name: 'דנין', points: 2840, level: 7, avatar: '👑' },
      { rank: 2, name: 'שרה', points: 2150, level: 6, avatar: '🥈' },
      { rank: 3, name: 'מיכאל', points: 1890, level: 5, avatar: '🥉' },
      { rank: 4, name: 'רחל', points: 1650, level: 5, avatar: '⭐' },
      { rank: 5, name: 'יוסי', points: 1420, level: 4, avatar: '⭐' }
    ]);
  }, []);

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'מתחיל', color: '#6b7280', nextPoints: 100 },
      { name: 'מתקדם', color: '#3b82f6', nextPoints: 300 },
      { name: 'מקצוען', color: '#8b5cf6', nextPoints: 600 },
      { name: 'מומחה', color: '#f59e0b', nextPoints: 1000 },
      { name: 'מאסטר', color: '#ef4444', nextPoints: 1500 },
      { name: 'גורו', color: '#10b981', nextPoints: 2000 },
      { name: 'אגדה', color: '#f97316', nextPoints: 3000 },
      { name: 'אל', color: '#ec4899', nextPoints: 5000 }
    ];
    return levels[level - 1] || levels[levels.length - 1];
  };

  const currentLevel = getLevelInfo(userLevel);
  const nextLevel = getLevelInfo(userLevel + 1);
  const progressToNext = ((points % 500) / 500) * 100;

  const handleTaskComplete = (taskId: number) => {
    setDailyTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: true }
          : task
      )
    );
    setPoints(prev => prev + dailyTasks.find(t => t.id === taskId)?.points || 0);
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
          🎮 מערכת משחקיות
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          נקודות נאמנות, משימות יומיות, ליגת משתמשים עם יחס VIP ותחרויות חודשיות
        </p>
      </div>

      {/* User Level & Points */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          alignItems: 'center'
        }}>
          {/* Level Display */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '25px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '15px'
            }}>
              {userLevel >= 7 ? '👑' : userLevel >= 5 ? '🏆' : userLevel >= 3 ? '⭐' : '🎯'}
            </div>
            <h3 style={{
              color: 'white',
              fontSize: '1.8rem',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              רמה {userLevel}
            </h3>
            <div style={{
              color: currentLevel.color,
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              {currentLevel.name}
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '10px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem'
            }}>
              {points.toLocaleString()} נקודות
            </div>
          </div>

          {/* Progress to Next Level */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h4 style={{
              color: 'white',
              fontSize: '1.3rem',
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              התקדמות לרמה הבאה
            </h4>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              height: '20px',
              marginBottom: '15px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                height: '100%',
                width: `${progressToNext}%`,
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem'
            }}>
              <span>{points % 500} / 500</span>
              <span>רמה {userLevel + 1}: {nextLevel.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tasks */}
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
          📋 משימות יומיות
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: task.completed ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: `1px solid ${task.completed ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255,255,255,0.2)'}`,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{task.icon}</span>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: 0,
                    fontWeight: 'bold'
                  }}>
                    {task.title}
                  </h4>
                </div>
                <div style={{
                  background: task.completed ? '#4ade80' : 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '5px 12px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  +{task.points}
                </div>
              </div>
              
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                margin: '0 0 15px 0',
                lineHeight: 1.5
              }}>
                {task.description}
              </p>
              
              {!task.completed && (
                <button
                  onClick={() => handleTaskComplete(task.id)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
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
                  סיים משימה
                </button>
              )}
              
              {task.completed && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#4ade80',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  <span>✅</span>
                  הושלם!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
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
          🏆 הישגים
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                background: achievement.unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                borderRadius: '15px',
                padding: '20px',
                border: `1px solid ${achievement.unlocked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                opacity: achievement.unlocked ? 1 : 0.6,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <span style={{ 
                  fontSize: '2rem',
                  filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                }}>
                  {achievement.icon}
                </span>
                <div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    {achievement.title}
                  </h4>
                  <div style={{
                    color: achievement.unlocked ? '#4ade80' : 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    +{achievement.points} נקודות
                  </div>
                </div>
              </div>
              
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem',
                margin: '0 0 15px 0',
                lineHeight: 1.4
              }}>
                {achievement.description}
              </p>
              
              {achievement.unlocked ? (
                <div style={{
                  color: '#4ade80',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  ✅ נפתח ב-{achievement.date}
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.8rem',
                    marginBottom: '5px'
                  }}>
                    התקדמות: {achievement.progress || 0}%
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '5px',
                    height: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      height: '100%',
                      width: `${achievement.progress || 0}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
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
          🏅 ליגת משתמשים
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          {leaderboard.map((user, index) => (
            <div
              key={index}
              style={{
                background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: `1px solid ${index === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255,255,255,0.2)'}`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div style={{
                  fontSize: '2rem'
                }}>
                  {user.avatar}
                </div>
                <div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    #{user.rank} {user.name}
                  </h4>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem'
                  }}>
                    רמה {user.level}
                  </div>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#4ade80',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}>
                  {user.points.toLocaleString()}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem'
                }}>
                  נקודות
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
