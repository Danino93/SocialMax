import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/UI/Button';
import OrderModal from './OrderModal';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  price: number;
  currency: string;
  minQuantity: number;
  maxQuantity: number;
  averageTime: string;
  quality: number;
  isActive: boolean;
  features: string[];
  image?: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { user } = useAuth();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const getPlatformIcon = (platform: string) => {
    const icons: {[key: string]: string} = {
      'instagram': '📷',
      'facebook': '📘',
      'tiktok': '🎵',
      'youtube': '📺',
      'twitter': '🐦',
      'linkedin': '💼',
      'telegram': '✈️',
      'whatsapp': '💬'
    };
    return icons[platform.toLowerCase()] || '📱';
  };

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'followers': 'from-blue-500 to-blue-600',
      'likes': 'from-red-500 to-pink-500',
      'views': 'from-green-500 to-teal-500',
      'comments': 'from-purple-500 to-purple-600',
      'shares': 'from-yellow-500 to-orange-500',
      'subscribers': 'from-indigo-500 to-indigo-600'
    };
    return colors[category.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  const canAfford = user?.balance && user.balance >= service.price;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Header */}
        <div className={`h-32 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-t-xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-2xl">{getPlatformIcon(service.platform)}</span>
              <span className="text-white font-semibold capitalize">{service.platform}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < service.quality ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {service.name}
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ₪{service.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                לכל {service.minQuantity}
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {service.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {service.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {service.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                  +{service.features.length - 3} עוד
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">כמות:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {service.minQuantity.toLocaleString()} - {service.maxQuantity.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">זמן ממוצע:</span>
              <div className="font-medium text-gray-900 dark:text-white">
                {service.averageTime}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            fullWidth
            onClick={() => setShowOrderModal(true)}
            disabled={!canAfford || !service.isActive}
            className={`${
              canAfford && service.isActive
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            }`}
          >
            {!service.isActive ? 'לא זמין' : !canAfford ? 'יתרה לא מספקת' : 'הזמן עכשיו'}
          </Button>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          service={service}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  );
};

export default ServiceCard;

