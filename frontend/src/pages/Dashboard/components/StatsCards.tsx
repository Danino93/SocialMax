import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const StatsCards: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'סה"כ הזמנות',
      value: user?.totalOrders || 0,
      icon: '📋',
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'סה"כ הוצאות',
      value: `₪${(user?.totalSpent || 0).toFixed(2)}`,
      icon: '💰',
      color: 'from-green-500 to-green-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'הזמנות פעילות',
      value: 3,
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'נקודות נאמנות',
      value: user?.loyaltyPoints || 0,
      icon: '⭐',
      color: 'from-purple-500 to-pink-500',
      change: '+50',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
                  מהחודש שעבר
                </span>
              </div>
            </div>
            <div className={`h-12 w-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

