import React from 'react';

interface ServiceFiltersProps {
  filters: {
    category: string;
    platform: string;
    minPrice: number;
    maxPrice: number;
  };
  onChange: (filters: any) => void;
}

const ServiceFilters: React.FC<ServiceFiltersProps> = ({ filters, onChange }) => {
  const categories = [
    { value: '', label: 'כל הקטגוריות' },
    { value: 'followers', label: 'עוקבים' },
    { value: 'likes', label: 'לייקים' },
    { value: 'views', label: 'צפיות' },
    { value: 'comments', label: 'תגובות' },
    { value: 'shares', label: 'שיתופים' },
    { value: 'subscribers', label: 'מנויים' }
  ];

  const platforms = [
    { value: '', label: 'כל הפלטפורמות' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          קטגוריה
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Platform Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          פלטפורמה
        </label>
        <select
          value={filters.platform}
          onChange={(e) => onChange({ platform: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {platforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          טווח מחירים
        </label>
        <div className="flex items-center space-x-2 space-x-reverse">
          <input
            type="number"
            placeholder="מ-"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <span className="text-gray-500 dark:text-gray-400">-</span>
          <input
            type="number"
            placeholder="עד"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;

