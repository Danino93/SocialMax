import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    {
      name: 'דשבורד',
      href: '/dashboard',
      icon: '📊',
      current: location.pathname === '/dashboard'
    },
    {
      name: 'שירותים',
      href: '/services',
      icon: '🛍️',
      current: location.pathname === '/services'
    },
    {
      name: 'הזמנות',
      href: '/orders',
      icon: '📋',
      current: location.pathname === '/orders'
    },
    {
      name: 'פרופיל',
      href: '/profile',
      icon: '👤',
      current: location.pathname === '/profile'
    },
    ...(user?.role === 'admin' || user?.role === 'super-admin' ? [{
      name: 'ניהול',
      href: '/admin',
      icon: '⚙️',
      current: location.pathname === '/admin'
    }] : [])
  ];

  const quickActions = [
    {
      name: 'הוסף כסף',
      href: '/add-funds',
      icon: '💰',
      color: 'text-green-600'
    },
    {
      name: 'הזמן עכשיו',
      href: '/services',
      icon: '🚀',
      color: 'text-blue-600'
    },
    {
      name: 'תמיכה',
      href: '/support',
      icon: '💬',
      color: 'text-purple-600'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
        backdropFilter: 'blur(20px)',
        borderLeft: '2px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            padding: '0 24px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}>
                SM
              </div>
              <span style={{
                marginRight: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                SocialMax
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.7)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="lg:hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div style={{
            padding: '24px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}>
                {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  margin: '0 0 4px 0',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {user?.email}
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                יתרה: ₪{user?.balance?.toFixed(2) || '0.00'}
              </div>
              <div style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                נקודות: {user?.loyaltyPoints || 0}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: isActive 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    color: isActive 
                      ? 'white' 
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isActive 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid transparent',
                    boxShadow: isActive 
                      ? '0 4px 15px rgba(255, 255, 255, 0.1)' 
                      : 'none'
                  })}
                  onClick={onClose}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.style.background.includes('rgba(255, 255, 255, 0.2)')) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.style.background.includes('rgba(255, 255, 255, 0.2)')) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    }
                  }}
                >
                  <span style={{ marginLeft: '12px', fontSize: '16px' }}>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ paddingTop: '24px' }}>
              <h3 style={{
                padding: '0 12px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}>
                פעולות מהירות
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {quickActions.map((action) => (
                  <NavLink
                    key={action.name}
                    to={action.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onClick={onClose}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    }}
                  >
                    <span style={{ marginLeft: '12px', fontSize: '16px' }}>{action.icon}</span>
                    {action.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div style={{
            padding: '16px',
            borderTop: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>SocialMax v1.0.0</p>
              <p style={{ margin: '4px 0 0 0' }}>© 2024 כל הזכויות שמורות</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

