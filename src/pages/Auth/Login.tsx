import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // בדיקה פשוטה - רק האימייל והסיסמה שלך
    if (formData.email === 'danino93@gmail.com' && formData.password === '151548') {
      try {
        // Mock login - יוצר משתמש דמה
        const mockUser = {
          _id: '1',
          username: 'danin',
          email: 'danino93@gmail.com',
          firstName: 'דנין',
          lastName: 'כהן',
          role: 'admin' as const,
          balance: 5000,
          currency: 'ILS',
          isEmailVerified: true,
          language: 'he',
          timezone: 'Asia/Jerusalem',
          phone: '+972501234567',
          businessName: 'SocialMax',
          businessType: 'SMM',
          referralCode: 'DANIN2024',
          referredBy: null,
          totalSpent: 2500,
          totalOrders: 45,
          loyaltyPoints: 1250,
          preferences: {
            notifications: true,
            marketing: true,
            language: 'he',
            theme: 'dark' as const
          }
        };

        // שמור את המשתמש ב-localStorage
        localStorage.setItem('token', 'mock-token-123');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // עדכן את ה-context
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setError('שגיאה בהתחברות. אנא נסה שוב.');
      }
    } else {
      setError('פרטי התחברות שגויים. רק דנין יכול להיכנס.');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '50px 40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)
          `,
          zIndex: 1
        }}></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
            }}>
              SM
            </div>
            <h1 style={{
              color: '#333',
              fontSize: '2.2rem',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }}>
              ברוך הבא ל-SocialMax
            </h1>
            <p style={{
              color: '#666',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              התחבר לחשבון שלך
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '25px',
              color: '#dc2626',
              fontSize: '0.95rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                color: '#374151',
                marginBottom: '8px',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                כתובת אימייל
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="הכנס את כתובת האימייל שלך"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                color: '#374151',
                marginBottom: '8px',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                סיסמה
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  background: '#fff',
                  color: '#374151',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="הכנס את הסיסמה שלך"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              {isLoading ? 'מתחבר...' : '🚀 התחבר לחשבון'}
            </button>
          </form>

          {/* Admin Notice */}
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            padding: '15px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <p style={{
              color: '#667eea',
              margin: 0,
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              🔒 גישה מוגבלת - רק למנהל המערכת
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;