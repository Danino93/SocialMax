import React from 'react';
import { Link } from 'react-router-dom';

const RecentOrders: React.FC = () => {
  // Mock data - in real app this would come from API
  const recentOrders = [
    {
      id: 'ORD-001',
      service: 'עוקבים Instagram',
      platform: 'Instagram',
      quantity: 1000,
      status: 'completed',
      date: '2024-01-15',
      price: 25.00
    },
    {
      id: 'ORD-002',
      service: 'לייקים Facebook',
      platform: 'Facebook',
      quantity: 500,
      status: 'in-progress',
      date: '2024-01-14',
      price: 12.50
    },
    {
      id: 'ORD-003',
      service: 'צפיות TikTok',
      platform: 'TikTok',
      quantity: 2000,
      status: 'pending',
      date: '2024-01-13',
      price: 16.00
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      'pending': 'ממתין',
      'in-progress': 'בביצוע',
      'completed': 'הושלם',
      'cancelled': 'בוטל'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          📋 הזמנות אחרונות
        </h3>
        <Link
          to="/orders"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
        >
          צפה בהכל
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-500 dark:text-gray-400">
            עדיין לא ביצעת הזמנות
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {order.platform.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {order.service}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.quantity.toLocaleString()} • {new Date(order.date).toLocaleDateString('he-IL')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="font-medium text-gray-900 dark:text-white">
                  ₪{order.price.toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;

