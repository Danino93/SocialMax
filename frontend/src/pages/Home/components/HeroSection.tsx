import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.3), transparent 50%),
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
      `,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px',
        animation: 'float 20s infinite linear'
      }}></div>

      {/* Floating Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, rgba(255,215,0,0.3), rgba(255,105,180,0.2))',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, rgba(0,255,255,0.2), rgba(138,43,226,0.3))',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'rotate 8s linear infinite'
      }}></div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 20px',
        transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1s ease-out'
      }}>
        {/* Revolutionary Title */}
        <div style={{
          position: 'relative',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '900',
            background: 'linear-gradient(45deg, #fff, #f0f0f0, #fff, #e0e0e0)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255,255,255,0.5)',
            marginBottom: '20px',
            animation: 'shimmer 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate'
          }}>
            SocialMax
          </h1>
          
          <div style={{
            position: 'relative',
            display: 'inline-block'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ffd700, #ff69b4, #00ffff, #ffd700)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              animation: 'rainbow 4s ease-in-out infinite, float 3s ease-in-out infinite'
            }}>
              המפלצה של הרשתות החברתיות
            </h2>
            
            {/* Glowing Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, #ffd700, #ff69b4, #00ffff, #ffd700)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(10px)',
              opacity: 0.7,
              animation: 'rainbow 4s ease-in-out infinite'
            }}>
              המפלצה של הרשתות החברתיות
            </div>
          </div>
        </div>

        {/* Revolutionary Description */}
        <p style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '800px',
          margin: '0 auto 50px',
          lineHeight: 1.6,
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.3s'
        }}>
          הפלטפורמה המתקדמת ביותר בישראל לשיווק ברשתות החברתיות. 
          עוקבים, לייקים, צפיות ועוד - הכל במקום אחד!
        </p>

        {/* Revolutionary CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '60px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.6s'
        }}>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(45deg, #fff, #f8f9fa)',
                color: '#667eea',
                border: 'none',
                padding: '20px 40px',
                borderRadius: '50px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{ position: 'relative', zIndex: 2 }}>🚀 היכנס לדשבורד</span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transition: 'left 0.5s ease'
                }}></div>
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e, #ff6b6b)',
                  backgroundSize: '200% 200%',
                  color: 'white',
                  border: 'none',
                  padding: '20px 40px',
                  borderRadius: '50px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 15px 35px rgba(255,107,107,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  animation: 'gradientShift 3s ease infinite',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{ position: 'relative', zIndex: 2 }}>🎯 התחל עכשיו - חינם!</span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s ease'
                  }}></div>
                </button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '18px 38px',
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <span style={{ position: 'relative', zIndex: 2 }}>🔐 התחבר</span>
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
              </Link>
            </>
          )}
        </div>

        {/* Revolutionary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          maxWidth: '800px',
          margin: '0 auto',
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.9s'
        }}>
          {[
            { number: '10,000+', label: 'משתמשים פעילים', icon: '👥', color: '#ffd700' },
            { number: '1M+', label: 'הזמנות מושלמות', icon: '📋', color: '#ff69b4' },
            { number: '99.9%', label: 'זמינות שירות', icon: '⚡', color: '#00ffff' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '10px',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '10px',
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
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
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.3); }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        button:hover > div {
          left: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;