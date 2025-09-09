import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeServices: 0
  });

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'super-admin') {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'דשבורד', icon: '📊' },
    { id: 'users', label: 'משתמשים', icon: '👥' },
    { id: 'orders', label: 'הזמנות', icon: '📋' },
    { id: 'services', label: 'שירותים', icon: '🛍️' },
    { id: 'analytics', label: 'אנליטיקס', icon: '📈' }
  ];

  if (user?.role !== 'admin' && user?.role !== 'super-admin') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          גישה נדחתה
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          אין לך הרשאות גישה לאזור הניהול
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">⚙️ פאנל ניהול</h1>
        <p className="text-red-100 text-lg">
          ניהול הפלטפורמה והמשתמשים
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="ml-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="large" />
                </div>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm font-medium">סה"כ משתמשים</p>
                          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                        <div className="text-4xl opacity-80">👥</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm font-medium">סה"כ הזמנות</p>
                          <p className="text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                        </div>
                        <div className="text-4xl opacity-80">📋</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm font-medium">סה"כ הכנסות</p>
                          <p className="text-3xl font-bold">₪{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="text-4xl opacity-80">💰</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm font-medium">שירותים פעילים</p>
                          <p className="text-3xl font-bold">{stats.activeServices}</p>
                        </div>
                        <div className="text-4xl opacity-80">🛍️</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      פעולות מהירות
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-right">
                        <div className="text-2xl mb-2">➕</div>
                        <h4 className="font-medium text-gray-900 dark:text-white">הוסף שירות חדש</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">צור שירות חדש לפלטפורמה</p>
                      </button>
                      <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-right">
                        <div className="text-2xl mb-2">👤</div>
                        <h4 className="font-medium text-gray-900 dark:text-white">נהל משתמשים</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">צפה וערוך משתמשים</p>
                      </button>
                      <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-right">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-medium text-gray-900 dark:text-white">דוחות מפורטים</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">צפה באנליטיקס מתקדמים</p>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ניהול משתמשים
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל לנהל את כל המשתמשים בפלטפורמה
              </p>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ניהול הזמנות
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל לנהל את כל ההזמנות בפלטפורמה
              </p>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ניהול שירותים
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל לנהל את כל השירותים בפלטפורמה
              </p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                אנליטיקס מתקדמים
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                כאן תוכל לצפות בדוחות ואנליטיקס מפורטים
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

