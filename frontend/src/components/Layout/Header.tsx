import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled 
        ? 'rgba(102, 126, 234, 0.95)' 
        : 'rgba(102, 126, 234, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: isScrolled 
        ? '1px solid rgba(255,255,255,0.2)' 
        : '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.3s ease',
      padding: '20px 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Revolutionary Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease'
              }}></div>
              <span style={{ position: 'relative', zIndex: 2 }}>SM</span>
            </div>
            <span style={{
              fontSize: '28px',
              fontWeight: '900',
              color: 'white',
              textShadow: '0 0 20px rgba(255,255,255,0.5)'
            }}>
              SocialMax
            </span>
          </div>
        </Link>

        {/* Revolutionary Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }}>
          {[
            { name: 'שירותים', href: '/services' },
            { name: 'מחירים', href: '/pricing' },
            { name: 'אודות', href: '/about' },
            { name: 'צור קשר', href: '/contact' }
          ].map((item, index) => (
            <Link
              key={index}
              to={item.href}
              style={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '600',
                fontSize: '16px',
                position: 'relative',
                transition: 'all 0.3s ease',
                padding: '8px 0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item.name}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
                transformOrigin: 'left'
              }}></div>
            </Link>
          ))}
        </nav>

        {/* Revolutionary User Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Revolutionary Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              {/* Revolutionary Balance */}
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
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
                <span style={{ position: 'relative', zIndex: 2 }}>
                  ₪{user.balance?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Revolutionary User Menu */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  }}></div>
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                  </span>
                </button>

                {/* Revolutionary Dropdown Menu */}
                {isMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    minWidth: '220px',
                    padding: '15px 0',
                    marginTop: '15px',
                    animation: 'slideDown 0.3s ease'
                  }}>
                    {[
                      { name: 'דשבורד', href: '/dashboard', icon: '📊' },
                      { name: 'פרופיל', href: '/profile', icon: '👤' },
                      { name: 'הזמנות', href: '/orders', icon: '📋' },
                      { name: 'סל קניות', href: '/cart', icon: '🛒' }
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '15px 20px',
                          textDecoration: 'none',
                          color: '#374151',
                          transition: 'all 0.3s ease',
                          borderLeft: '3px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                          e.currentTarget.style.borderLeftColor = '#667eea';
                          e.currentTarget.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{item.icon}</span>
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                      </Link>
                    ))}
                    <hr style={{ 
                      margin: '10px 0', 
                      border: 'none', 
                      borderTop: '1px solid rgba(0,0,0,0.1)' 
                    }} />
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '15px 20px',
                        textAlign: 'right',
                        color: '#ef4444',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderLeft: '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.borderLeftColor = '#ef4444';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>🚪</span>
                      <span style={{ fontWeight: '500' }}>התנתק</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <Link to="/cart" style={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🛒 סל קניות
              </Link>
              <Link to="/login" style={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                התחבר
              </Link>
              <Link to="/register" style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 24px',
                borderRadius: '25px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
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
                <span style={{ position: 'relative', zIndex: 2 }}>הרשמה</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .logo-shine:hover > div > div {
          transform: translateX(100%);
        }
        
        .balance-shine:hover > div {
          transform: translateX(100%);
        }
        
        .user-shine:hover > div {
          transform: translateX(100%);
        }
        
        .register-shine:hover > div {
          transform: translateX(100%);
        }
      `}</style>
    </header>
  );
};

export default Header;