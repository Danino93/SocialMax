import React from 'react';

interface ServiceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ServiceSearch: React.FC<ServiceSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="חפש שירותים..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pr-10 pl-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        dir="rtl"
      />
    </div>
  );
};

export default ServiceSearch;

