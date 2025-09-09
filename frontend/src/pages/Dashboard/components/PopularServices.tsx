import React from 'react';
import { Link } from 'react-router-dom';

const PopularServices: React.FC = () => {
  const popularServices = [
    {
      name: 'עוקבים Instagram',
      platform: 'Instagram',
      price: 2.50,
      orders: 1250,
      icon: '📷',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'לייקים Facebook',
      platform: 'Facebook',
      price: 1.20,
      orders: 980,
      icon: '📘',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'צפיות TikTok',
      platform: 'TikTok',
      price: 0.80,
      orders: 750,
      icon: '🎵',
      color: 'from-black to-gray-800'
    },
    {
      name: 'עוקבים YouTube',
      platform: 'YouTube',
      price: 3.00,
      orders: 650,
      icon: '📺',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🔥 השירותים הפופולריים
        </h3>
        <Link
          to="/services"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
        >
          צפה בהכל
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popularServices.map((service, index) => (
          <Link
            key={index}
            to={`/services?service=${encodeURIComponent(service.name)}`}
            className="group block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="text-white text-xl">{service.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {service.orders.toLocaleString()} הזמנות
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  ₪{service.price.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  לכל 1000
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;

