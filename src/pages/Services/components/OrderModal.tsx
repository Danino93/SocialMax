import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/UI/Button';

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

interface OrderModalProps {
  service: Service;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ service, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    link: '',
    quantity: service.minQuantity,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(service.minQuantity, Math.min(service.maxQuantity, Number(e.target.value)));
    setFormData(prev => ({
      ...prev,
      quantity
    }));
  };

  const totalPrice = (formData.quantity / service.minQuantity) * service.price;
  const canAfford = user?.balance && user.balance >= totalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAfford) {
      alert('יתרת החשבון לא מספקת');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement order creation
      console.log('Creating order:', {
        serviceId: service._id,
        ...formData,
        totalPrice
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('ההזמנה נוצרה בהצלחה!');
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('שגיאה ביצירת ההזמנה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  הזמנת שירות
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Service Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.platform} • {service.averageTime}
                </p>
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  קישור {service.platform} *
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                  placeholder={`הכנס קישור ${service.platform} שלך`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                />
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  כמות *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleQuantityChange}
                  min={service.minQuantity}
                  max={service.maxQuantity}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  מינימום: {service.minQuantity.toLocaleString()} • מקסימום: {service.maxQuantity.toLocaleString()}
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  הערות (אופציונלי)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="הוסף הערות מיוחדות..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    מחיר ל-{service.minQuantity.toLocaleString()}:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₪{service.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    כמות: {formData.quantity.toLocaleString()}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₪{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-blue-200 dark:border-blue-800 mt-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      סה"כ לתשלום:
                    </span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ₪{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Balance Check */}
              {!canAfford && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400">⚠️</span>
                    </div>
                    <div className="mr-3">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        יתרת החשבון לא מספקת. נדרש: ₪{totalPrice.toFixed(2)}, זמין: ₪{user?.balance?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3 space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!canAfford || loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? 'יוצר הזמנה...' : 'הזמן עכשיו'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

