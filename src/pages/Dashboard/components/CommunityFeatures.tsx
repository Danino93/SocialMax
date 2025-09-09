import React, { useState, useEffect } from 'react';

const CommunityFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [whatsappGroups, setWhatsappGroups] = useState<any[]>([]);
  const [aiMentor, setAiMentor] = useState<any>(null);
  const [networkingEvents, setNetworkingEvents] = useState<any[]>([]);

  useEffect(() => {
    // Mock forum posts
    setForumPosts([
      {
        id: 1,
        title: 'איך להגדיל לייקים באינסטגרם?',
        author: 'שרה',
        replies: 15,
        views: 234,
        lastActivity: '2024-03-15 14:30',
        category: 'Instagram',
        isHot: true
      },
      {
        id: 2,
        title: 'טיפים לשיווק בטלגרם',
        author: 'מיכאל',
        replies: 8,
        views: 156,
        lastActivity: '2024-03-15 12:45',
        category: 'Telegram',
        isHot: false
      },
      {
        id: 3,
        title: 'האם AI Manager באמת עובד?',
        author: 'רחל',
        replies: 22,
        views: 445,
        lastActivity: '2024-03-15 11:20',
        category: 'AI',
        isHot: true
      },
      {
        id: 4,
        title: 'השוואת מחירים בין ספקים',
        author: 'יוסי',
        replies: 12,
        views: 189,
        lastActivity: '2024-03-15 10:15',
        category: 'כללי',
        isHot: false
      }
    ]);

    // Mock WhatsApp groups
    setWhatsappGroups([
      {
        id: 1,
        name: 'Instagram Masters',
        members: 245,
        description: 'קבוצה למומחי אינסטגרם',
        category: 'Instagram',
        isActive: true
      },
      {
        id: 2,
        name: 'TikTok Creators',
        members: 189,
        description: 'יוצרי תוכן לטיקטוק',
        category: 'TikTok',
        isActive: true
      },
      {
        id: 3,
        name: 'WhatsApp Business',
        members: 156,
        description: 'שיווק דרך WhatsApp',
        category: 'WhatsApp',
        isActive: true
      },
      {
        id: 4,
        name: 'AI Marketing',
        members: 98,
        description: 'שיווק עם AI',
        category: 'AI',
        isActive: false
      }
    ]);

    // Mock AI Mentor
    setAiMentor({
      name: 'מנטור AI',
      avatar: '🤖',
      status: 'זמין',
      lastMessage: 'איך אני יכול לעזור לך היום?',
      suggestions: [
        'הזמן לייקים לאינסטגרם',
        'נתח את הקמפיין שלי',
        'הצג הזדמנויות חמות',
        'עזור לי עם אסטרטגיה'
      ]
    });

    // Mock networking events
    setNetworkingEvents([
      {
        id: 1,
        title: 'מפגש SocialMax VIP',
        date: '2024-03-25',
        time: '19:00',
        location: 'תל אביב',
        attendees: 45,
        maxAttendees: 50,
        description: 'מפגש networking לחברי VIP',
        isRegistered: true
      },
      {
        id: 2,
        title: 'סדנת שיווק דיגיטלי',
        date: '2024-04-02',
        time: '14:00',
        location: 'ירושלים',
        attendees: 23,
        maxAttendees: 30,
        description: 'סדנה מתקדמת לשיווק דיגיטלי',
        isRegistered: false
      },
      {
        id: 3,
        title: 'האקאתון AI Marketing',
        date: '2024-04-15',
        time: '09:00',
        location: 'חיפה',
        attendees: 67,
        maxAttendees: 100,
        description: 'האקאתון לפיתוח כלי AI לשיווק',
        isRegistered: false
      }
    ]);
  }, []);

  const tabs = [
    { id: 'forum', name: 'פורום', icon: '💬' },
    { id: 'whatsapp', name: 'קבוצות WhatsApp', icon: '📱' },
    { id: 'mentor', name: 'מנטור AI', icon: '🤖' },
    { id: 'events', name: 'אירועי Networking', icon: '🤝' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Instagram': 'linear-gradient(135deg, #f093fb, #f5576c)',
      'Telegram': 'linear-gradient(135deg, #0088cc, #00a8ff)',
      'AI': 'linear-gradient(135deg, #667eea, #764ba2)',
      'TikTok': 'linear-gradient(135deg, #43e97b, #38f9d7)',
      'WhatsApp': 'linear-gradient(135deg, #25d366, #128c7e)',
      'כללי': 'linear-gradient(135deg, #6b7280, #4b5563)'
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
          🤝 קהילת SocialMax
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.2rem',
          margin: 0,
          lineHeight: 1.6
        }}>
          פורום משתמשים בעברית, קבוצות WhatsApp אוטומטיות, מנטור AI אישי ומפגשי networking
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id 
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
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Forum Tab */}
      {activeTab === 'forum' && (
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
            💬 פורום משתמשים
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px'
          }}>
            {forumPosts.map((post) => (
              <div
                key={post.id}
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
                    {post.title}
                  </h4>
                  {post.isHot && (
                    <div style={{
                      background: '#ef4444',
                      borderRadius: '10px',
                      padding: '3px 8px',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      🔥 חם
                    </div>
                  )}
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
                    על ידי {post.author}
                  </span>
                  <div style={{
                    background: getCategoryColor(post.category),
                    borderRadius: '10px',
                    padding: '3px 8px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {post.category}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      color: '#4ade80',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {post.replies}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem'
                    }}>
                      תגובות
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      color: '#fbbf24',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {post.views}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem'
                    }}>
                      צפיות
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {post.lastActivity}
                    </div>
                    <div style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem'
                    }}>
                      פעילות אחרונה
                    </div>
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
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
                  הצג דיון
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Groups Tab */}
      {activeTab === 'whatsapp' && (
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
            📱 קבוצות WhatsApp
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {whatsappGroups.map((group) => (
              <div
                key={group.id}
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
                    {group.name}
                  </h4>
                  <div style={{
                    background: group.isActive ? '#4ade80' : '#6b7280',
                    borderRadius: '10px',
                    padding: '3px 8px',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {group.isActive ? 'פעיל' : 'לא פעיל'}
                  </div>
                </div>

                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.95rem',
                  margin: '0 0 15px 0',
                  lineHeight: 1.4
                }}>
                  {group.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    background: getCategoryColor(group.category),
                    borderRadius: '10px',
                    padding: '3px 8px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {group.category}
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem'
                  }}>
                    {group.members} חברים
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  background: group.isActive 
                    ? 'linear-gradient(135deg, #25d366, #128c7e)' 
                    : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: group.isActive ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  opacity: group.isActive ? 1 : 0.6
                }}
                disabled={!group.isActive}
                onMouseEnter={(e) => {
                  if (group.isActive) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (group.isActive) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                >
                  {group.isActive ? 'הצטרף לקבוצה' : 'קבוצה לא פעילה'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Mentor Tab */}
      {activeTab === 'mentor' && (
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
            🤖 מנטור AI אישי
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px'
          }}>
            {/* Mentor Chat */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  {aiMentor.avatar}
                </div>
                <div>
                  <h4 style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    {aiMentor.name}
                  </h4>
                  <div style={{
                    color: aiMentor.status === 'זמין' ? '#4ade80' : '#fbbf24',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {aiMentor.status}
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <p style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1rem',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {aiMentor.lastMessage}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  placeholder="שאל את המנטור שלך..."
                  style={{
                    flex: 1,
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '1rem',
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
                  שלח
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.3rem',
                margin: '0 0 20px 0',
                fontWeight: 'bold'
              }}>
                הצעות מהירות
              </h4>
              <div style={{
                display: 'grid',
                gap: '10px'
              }}>
                {aiMentor.suggestions.map((suggestion: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '10px',
                      padding: '12px 15px',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'right'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Networking Events Tab */}
      {activeTab === 'events' && (
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
            🤝 אירועי Networking
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {networkingEvents.map((event) => (
              <div
                key={event.id}
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
                    {event.title}
                  </h4>
                  {event.isRegistered && (
                    <div style={{
                      background: '#4ade80',
                      borderRadius: '10px',
                      padding: '3px 8px',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      רשום
                    </div>
                  )}
                </div>

                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.95rem',
                  margin: '0 0 15px 0',
                  lineHeight: 1.4
                }}>
                  {event.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <div style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem',
                      marginBottom: '3px'
                    }}>
                      תאריך
                    </div>
                    <div style={{
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {event.date} {event.time}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8rem',
                      marginBottom: '3px'
                    }}>
                      מיקום
                    </div>
                    <div style={{
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {event.location}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.9rem',
                    marginBottom: '5px'
                  }}>
                    נרשמו: {event.attendees} / {event.maxAttendees}
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '5px',
                    height: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                      height: '100%',
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                <button style={{
                  width: '100%',
                  background: event.isRegistered 
                    ? 'rgba(255,255,255,0.2)' 
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  cursor: event.isRegistered ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: event.isRegistered ? 0.6 : 1
                }}
                disabled={event.isRegistered}
                onMouseEnter={(e) => {
                  if (!event.isRegistered) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!event.isRegistered) {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                >
                  {event.isRegistered ? 'רשום לאירוע' : 'הירשם לאירוע'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeatures;
