import React, { useState, useEffect } from 'react';

const StatsSection: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      number: 10000,
      label: 'משתמשים פעילים',
      icon: '👥',
      color: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      suffix: '+'
    },
    {
      number: 1000000,
      label: 'הזמנות מושלמות',
      icon: '📋',
      color: 'linear-gradient(135deg, #ff69b4, #ff1493)',
      suffix: '+'
    },
    {
      number: 99.9,
      label: 'זמינות שירות',
      icon: '⚡',
      color: 'linear-gradient(135deg, #00ffff, #0080ff)',
      suffix: '%'
    },
    {
      number: 24,
      label: 'תמיכה טכנית',
      icon: '💬',
      color: 'linear-gradient(135deg, #32cd32, #00ff00)',
      suffix: '/7'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentStep = 0;
        const increment = stat.number / steps;

        const timer = setInterval(() => {
          currentStep++;
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.min(currentStep * increment, stat.number);
            return newStats;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible]);

  return (
    <section 
      id="stats-section"
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Revolutionary Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Floating Particles */}
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
        animation: 'float 25s infinite linear'
      }}></div>

      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'rotate 15s linear infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '60px',
        height: '60px',
        background: 'rgba(255,215,0,0.2)',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        width: '100px',
        height: '100px',
        background: 'rgba(0,255,255,0.1)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Revolutionary Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block',
            position: 'relative',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              color: 'white',
              margin: 0,
              textShadow: '0 0 30px rgba(255,255,255,0.5)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              מספרים שמדברים בעד עצמם
            </h2>
            
            {/* Glowing Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, #fff, #f0f0f0, #fff, #e0e0e0)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(15px)',
              opacity: 0.6,
              animation: 'shimmer 3s ease-in-out infinite'
            }}>
              מספרים שמדברים בעד עצמם
            </div>
          </div>
          
          <p style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: '500'
          }}>
            אלפי משתמשים כבר בחרו ב-SocialMax להגדלת הנוכחות שלהם ברשתות החברתיות
          </p>
        </div>

        {/* Revolutionary Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          perspective: '1000px'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '25px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-20px) rotateX(5deg) scale(1.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Animated Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: stat.color,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Revolutionary Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '2.5rem',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease'
                  }}></div>
                  <span style={{ position: 'relative', zIndex: 2 }}>
                    {stat.icon}
                  </span>
                </div>

                {/* Animated Number */}
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  background: stat.color,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '15px',
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  position: 'relative'
                }}>
                  {stat.number === 1000000 
                    ? `${Math.floor(animatedStats[index] / 1000)}K${stat.suffix}`
                    : stat.number === 99.9
                    ? `${animatedStats[index].toFixed(1)}${stat.suffix}`
                    : stat.number === 24
                    ? `${Math.floor(animatedStats[index])}${stat.suffix}`
                    : `${Math.floor(animatedStats[index]).toLocaleString()}${stat.suffix}`
                  }
                </div>

                {/* Label */}
                <div style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: '600',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  {stat.label}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>
            </div>
          ))}
        </div>

        {/* Revolutionary Bottom CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '25px 50px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '50px',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ position: 'relative', zIndex: 2 }}>
              🚀 הצטרף לאלפי המשתמשים המרוצים
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
        
        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.3); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;