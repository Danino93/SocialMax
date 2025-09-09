import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Instagram', href: '/services/instagram' },
      { name: 'Facebook', href: '/services/facebook' },
      { name: 'TikTok', href: '/services/tiktok' },
      { name: 'YouTube', href: '/services/youtube' },
      { name: 'Twitter', href: '/services/twitter' }
    ],
    company: [
      { name: 'אודותינו', href: '/about' },
      { name: 'צור קשר', href: '/contact' },
      { name: 'בלוג', href: '/blog' },
      { name: 'קריירה', href: '/careers' },
      { name: 'שותפים', href: '/partners' }
    ],
    support: [
      { name: 'מרכז עזרה', href: '/help' },
      { name: 'מדריכים', href: '/guides' },
      { name: 'API', href: '/api' },
      { name: 'סטטוס שירות', href: '/status' },
      { name: 'דיווח באג', href: '/bug-report' }
    ],
    legal: [
      { name: 'תנאי שימוש', href: '/terms' },
      { name: 'מדיניות פרטיות', href: '/privacy' },
      { name: 'מדיניות החזרים', href: '/refund' },
      { name: 'הצהרת נגישות', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com/socialmax' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/socialmax' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/socialmax' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/socialmax' },
    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/socialmax' }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Revolutionary Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(240, 147, 251, 0.05) 0%, transparent 50%)
        `,
        animation: 'float 30s ease-in-out infinite'
      }}></div>

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.1), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.08), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.12), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.1), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.08), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px',
        animation: 'float 35s infinite linear'
      }}></div>

      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '60px',
        height: '60px',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '15px',
        transform: 'rotate(45deg)',
        animation: 'rotate 20s linear infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '40px',
        height: '40px',
        background: 'rgba(240, 147, 251, 0.2)',
        borderRadius: '50%',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(79, 172, 254, 0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'float 12s ease-in-out infinite'
      }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Main Footer Content */}
        <div style={{
          padding: '80px 20px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '50px'
        }}>
          {/* Company Info */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginLeft: '15px',
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
              }}>
                SM
              </div>
              <div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  margin: 0,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  SocialMax
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.8)',
                  margin: '5px 0 0 0',
                  fontWeight: '500'
                }}>
                  הפלטפורמה המובילה לשיווק ברשתות חברתיות
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.8,
              marginBottom: '30px',
              maxWidth: '400px'
            }}>
              אנו עוזרים לעסקים ולמשפיענים להגדיל את הנוכחות שלהם ברשתות החברתיות 
              עם כלים מתקדמים, שירותים איכותיים ותמיכה 24/7.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {social.icon}
                  </span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  }}></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([sectionName, links], index) => (
            <div key={sectionName}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                margin: '0 0 25px 0',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                {sectionName === 'services' && 'שירותים'}
                {sectionName === 'company' && 'החברה'}
                {sectionName === 'support' && 'תמיכה'}
                {sectionName === 'legal' && 'משפטי'}
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.href}
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        display: 'inline-block',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateX(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.name}
                      <span style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: 0,
                        height: '2px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        transition: 'width 0.3s ease'
                      }}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div style={{
          padding: '40px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              margin: '0 0 15px 0',
              color: 'white'
            }}>
              📧 הישאר מעודכן עם הטיפים והחדשות שלנו
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)',
              margin: '0 0 30px 0'
            }}>
              קבל טיפים שיווקיים, עדכונים על תכונות חדשות והצעות מיוחדות
            </p>
            <div style={{
              display: 'flex',
              gap: '15px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="הכנס את כתובת המייל שלך"
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  borderRadius: '25px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(102, 126, 234, 0.5)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              />
              <button style={{
                padding: '15px 30px',
                borderRadius: '25px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{ position: 'relative', zIndex: 2 }}>
                  הרשמה
                </span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s ease'
                }}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          padding: '30px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1rem'
          }}>
            © {currentYear} SocialMax. כל הזכויות שמורות.
          </div>
          
          <div style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.7)'
              }}>
                🇮🇱 ישראל
              </span>
              <span style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.7)'
              }}>
                💬 עברית
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '20px'
            }}>
              <a href="/terms" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}>
                תנאי שימוש
              </a>
              <a href="/privacy" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}>
                פרטיות
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;