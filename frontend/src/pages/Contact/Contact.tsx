import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState('form');

  const services = [
    'Instagram', 'Facebook', 'TikTok', 'YouTube', 'Twitter', 
    'Discord', 'WhatsApp Business', 'Google Business', 'כל השירותים'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', 
        subject: '', message: '', service: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'אימייל',
      details: 'info@socialmax.co.il',
      description: 'נענה תוך 24 שעות',
      color: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      icon: '📱',
      title: 'טלפון',
      details: '+972-50-123-4567',
      description: 'א-ה 9:00-18:00',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '+972-50-123-4567',
      description: 'תמיד זמין',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    },
    {
      icon: '📍',
      title: 'כתובת',
      details: 'תל אביב, ישראל',
      description: 'משרדים פתוחים',
      color: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    }
  ];

  const teamMembers = [
    {
      name: 'דני כהן',
      role: 'מנכ"ל ומייסד',
      image: '👨‍💼',
      description: 'מומחה לשיווק דיגיטלי עם 10+ שנות ניסיון',
      specialties: ['אסטרטגיה', 'ניהול', 'פיתוח עסקי']
    },
    {
      name: 'שרה לוי',
      role: 'מנהלת טכנולוגיה',
      image: '👩‍💻',
      description: 'מפתחת מובילה עם התמחות בפלטפורמות חברתיות',
      specialties: ['פיתוח', 'אוטומציה', 'AI']
    },
    {
      name: 'מיכל אברהם',
      role: 'מנהלת שיווק',
      image: '👩‍🎨',
      description: 'מומחית תוכן ויצירתיות עם ניסיון ב-5 פלטפורמות',
      specialties: ['תוכן', 'יצירתיות', 'קמפיינים']
    },
    {
      name: 'יוסי מזרחי',
      role: 'מנהל תמיכה',
      image: '👨‍🔧',
      description: 'מומחה תמיכה טכנית עם זמינות 24/7',
      specialties: ['תמיכה', 'פתרון בעיות', 'הדרכה']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'לקוחות מרוצים', icon: '😊' },
    { number: '50M+', label: 'אינטראקציות', icon: '📈' },
    { number: '99.9%', label: 'זמינות שירות', icon: '⚡' },
    { number: '24/7', label: 'תמיכה טכנית', icon: '🛠️' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0c0c0c 100%)',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Header onMenuClick={() => {}} />

      {/* Dynamic Background Effects */}
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
        zIndex: 1
      }} />

      {/* Floating Elements */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.02})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s infinite linear`,
            zIndex: 2
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '100px 20px 20px'
      }}>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ← חזרה לדף הבית
        </button>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 20px 0',
            textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }}>
            בואו נכיר! 👋
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            אנחנו כאן לעזור לכם להצליח ברשתות החברתיות. 
            צרו איתנו קשר ונבנה יחד אסטרטגיה מושלמת עבורכם!
          </p>
          
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '60px'
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '30px 20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '5px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'form', label: 'צור קשר', icon: '📝' },
            { id: 'team', label: 'הצוות שלנו', icon: '👥' },
            { id: 'methods', label: 'דרכי התקשרות', icon: '📞' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                background: activeSection === tab.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                color: 'white',
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'form' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '25px',
            padding: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            animation: 'slideInUp 0.6s ease'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 40px 0',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              בואו נתחיל! 🚀
            </h2>

            {submitStatus === 'success' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.2), rgba(56, 249, 215, 0.2))',
                border: '1px solid rgba(67, 233, 123, 0.3)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '30px',
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  הודעתכם נשלחה בהצלחה!
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                  נחזור אליכם תוך 24 שעות
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  שם מלא *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  אימייל *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  טלפון
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Company */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  חברה
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Service */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  שירות מבוקש
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">בחרו שירות</option>
                  {services.map((service, index) => (
                    <option key={index} value={service} style={{ background: '#1a1a2e', color: 'white' }}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  נושא
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  הודעה *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid #667eea';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting 
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    padding: '18px 50px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ marginLeft: '10px' }}>⏳</span>
                      שולח...
                    </>
                  ) : (
                    <>
                      <span style={{ marginLeft: '10px' }}>🚀</span>
                      שלח הודעה
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSection === 'team' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            animation: 'slideInUp 0.6s ease'
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '25px',
                  padding: '40px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  animation: 'pulse 2s infinite'
                }}>
                  {member.image}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 10px 0'
                }}>
                  {member.name}
                </h3>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#667eea',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {member.role}
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  margin: '0 0 20px 0'
                }}>
                  {member.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        fontSize: '0.9rem',
                        color: '#667eea',
                        fontWeight: '500'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'methods' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            animation: 'slideInUp 0.6s ease'
          }}>
            {contactMethods.map((method, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '25px',
                  padding: '40px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease ${index * 0.1}s both`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Background Gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: method.color,
                  opacity: 0.1,
                  zIndex: 1
                }} />
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '20px',
                    animation: 'pulse 2s infinite'
                  }}>
                    {method.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: '0 0 15px 0'
                  }}>
                    {method.title}
                  </h3>
                  <div style={{
                    fontSize: '1.2rem',
                    color: '#667eea',
                    fontWeight: '600',
                    marginBottom: '10px'
                  }}>
                    {method.details}
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0
                  }}>
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
