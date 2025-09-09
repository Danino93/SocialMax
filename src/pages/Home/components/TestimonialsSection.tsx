import React, { useState, useEffect } from 'react';

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      name: 'דוד כהן',
      role: 'מנכ"ל, סטארטאפ טכנולוגיה',
      avatar: '👨‍💼',
      rating: 5,
      text: 'SocialMax שינה לי את המשחק! תוך חודשיים הכפלתי את העוקבים שלי ב-Instagram מ-5,000 ל-50,000. השירות מהיר, אמין ומחיר הוגן.',
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      company: 'TechStart Israel'
    },
    {
      name: 'שרה לוי',
      role: 'יועצת שיווק דיגיטלי',
      avatar: '👩‍💻',
      rating: 5,
      text: 'הפלטפורמה הכי מתקדמת שפגשתי! האנליטיקס מדהימים, התמיכה 24/7, והתוצאות מדברות בעד עצמן. כל הלקוחות שלי מרוצים.',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      company: 'Digital Marketing Pro'
    },
    {
      name: 'אמיר אברהם',
      role: 'בעל עסק מקומי',
      avatar: '👨‍🍳',
      rating: 5,
      text: 'המסעדה שלי הפכה לוויראלית! SocialMax עזר לי להגיע ל-100,000 צפיות ב-TikTok תוך שבוע. עכשיו יש לי תור של 3 שעות!',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      company: 'מסעדת אברהם'
    },
    {
      name: 'מיכל רוזן',
      role: 'אינפלואנסרית',
      avatar: '👩‍🎨',
      rating: 5,
      text: 'כמעט 2 מיליון עוקבים ב-Instagram! SocialMax לא רק הגדיל את העוקבים שלי, אלא גם שיפר את האינגייג\'מנט ב-300%. פשוט מדהים!',
      color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      company: 'Fashion Influencer'
    },
    {
      name: 'יוסי גולדברג',
      role: 'מנהל רשתות חברתיות',
      avatar: '👨‍💼',
      rating: 5,
      text: 'אני מנהל 20 עמודים שונים, ו-SocialMax חוסך לי 80% מהזמן! הכל אוטומטי, חכם, ומביא תוצאות מדהימות. מומלץ בחום!',
      color: 'linear-gradient(135deg, #fa709a, #fee140)',
      company: 'Social Media Agency'
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

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible, testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          fontSize: '1.5rem',
          color: i < rating ? '#ffd700' : '#ddd',
          textShadow: '0 0 10px rgba(255,215,0,0.5)',
          filter: i < rating ? 'drop-shadow(0 0 5px #ffd700)' : 'none'
        }}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section 
      id="testimonials-section"
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
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
          radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)
        `,
        animation: 'float 25s ease-in-out infinite'
      }}></div>

      {/* Floating Quote Marks */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        fontSize: '8rem',
        color: 'rgba(255,255,255,0.1)',
        fontFamily: 'serif',
        animation: 'float 15s ease-in-out infinite'
      }}>
        "
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        fontSize: '8rem',
        color: 'rgba(255,255,255,0.1)',
        fontFamily: 'serif',
        animation: 'float 15s ease-in-out infinite reverse'
      }}>
        "
      </div>

      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,215,0,0.2)',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'rotate 20s linear infinite'
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
              מה הלקוחות שלנו אומרים
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
              מה הלקוחות שלנו אומרים
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
            אלפי לקוחות מרוצים כבר בחרו ב-SocialMax להצלחה ברשתות החברתיות
          </p>
        </div>

        {/* Revolutionary Testimonials Carousel */}
        <div style={{
          position: 'relative',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Main Testimonial Card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              padding: '60px 50px',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
              opacity: isVisible ? 1 : 0
            }}
          >
            {/* Animated Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: testimonials[currentTestimonial].color,
              opacity: 0.1,
              transition: 'opacity 0.5s ease'
            }}></div>

            {/* Quote Icon */}
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '40px',
              fontSize: '4rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'serif'
            }}>
              "
            </div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Rating */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px',
                gap: '5px'
              }}>
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote style={{
                fontSize: '1.6rem',
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.8,
                fontStyle: 'italic',
                marginBottom: '40px',
                fontWeight: '500',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                {testimonials[currentTestimonial].text}
              </blockquote>

              {/* Author Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: testimonials[currentTestimonial].color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                    {testimonials[currentTestimonial].avatar}
                  </span>
                </div>

                {/* Author Details */}
                <div style={{ textAlign: 'right' }}>
                  <h4 style={{
                    fontSize: '1.4rem',
                    color: 'white',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.8)',
                    margin: '0 0 3px 0',
                    fontWeight: '500'
                  }}>
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.6)',
                    margin: 0,
                    fontWeight: '400'
                  }}>
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
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

          {/* Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '40px'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentTestimonial 
                    ? 'rgba(255,255,255,0.9)' 
                    : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: index === currentTestimonial 
                    ? '0 0 20px rgba(255,255,255,0.5)' 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentTestimonial) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentTestimonial) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              />
            ))}
          </div>
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
              🎯 הצטרף לאלפי הלקוחות המרוצים
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

export default TestimonialsSection;