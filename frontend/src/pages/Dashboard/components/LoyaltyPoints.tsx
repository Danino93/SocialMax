import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const LoyaltyPoints: React.FC = () => {
  const { user } = useAuth();

  const points = user?.loyaltyPoints || 0;
  const nextReward = 1000; // Points needed for next reward
  const progress = (points / nextReward) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          ⭐ נקודות נאמנות
        </h3>
        <div className="text-2xl">🏆</div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {points.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            נקודות
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>{nextReward.toLocaleString()} נקודות</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">לפרס הבא:</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {Math.max(0, nextReward - points)} נקודות
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">ערך נקודות:</span>
          <span className="text-gray-900 dark:text-white font-medium">
            ₪{(points * 0.01).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          כל ₪1 = 1 נקודה • 100 נקודות = ₪1 הנחה
        </p>
      </div>
    </div>
  );
};

export default LoyaltyPoints;

