import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button';

const BalanceCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">💰 יתרת החשבון</h3>
        <div className="text-2xl">💳</div>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold mb-1">
          ₪{user?.balance?.toFixed(2) || '0.00'}
        </div>
        <div className="text-green-100 text-sm">
          זמין לשימוש
        </div>
      </div>

      <div className="space-y-3">
        <Link to="/add-funds" className="block">
          <Button
            fullWidth
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
          >
            הוסף כסף
          </Button>
        </Link>
        
        <div className="text-center">
          <Link
            to="/transactions"
            className="text-green-100 hover:text-white text-sm font-medium transition-colors"
          >
            צפה בהיסטוריית עסקאות
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

