import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'הזמן עוקבים',
      description: 'הגדל את מספר העוקבים שלך',
      icon: '👥',
      href: '/services?category=followers',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'הוסף לייקים',
      description: 'הגבר את האינטראקציה',
      icon: '❤️',
      href: '/services?category=likes',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'הגדל צפיות',
      description: 'הגבר את החשיפה',
      icon: '👁️',
      href: '/services?category=views',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'הוסף כסף',
      description: 'הטען את החשבון שלך',
      icon: '💰',
      href: '/add-funds',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🚀 פעולות מהירות
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-transparent hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-3">
              <div className={`h-10 w-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className="text-xl">{action.icon}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

