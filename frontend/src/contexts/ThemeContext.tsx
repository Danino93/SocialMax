import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  direction: 'rtl' | 'ltr';
  setDirection: (direction: 'rtl' | 'ltr') => void;
  language: 'he' | 'en';
  setLanguage: (language: 'he' | 'en') => void;
  isRTL: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');
  const [language, setLanguage] = useState<'he' | 'en'>('he');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedDirection = localStorage.getItem('direction') as 'rtl' | 'ltr' | null;
    const savedLanguage = localStorage.getItem('language') as 'he' | 'en' | null;

    if (savedTheme) setTheme(savedTheme);
    if (savedDirection) setDirection(savedDirection);
    if (savedLanguage) setLanguage(savedLanguage);

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme || 'light');
    document.documentElement.setAttribute('dir', savedDirection || 'rtl');
    document.documentElement.setAttribute('lang', savedLanguage || 'he');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSetDirection = (newDirection: 'rtl' | 'ltr') => {
    setDirection(newDirection);
    localStorage.setItem('direction', newDirection);
    document.documentElement.setAttribute('dir', newDirection);
  };

  const handleSetLanguage = (newLanguage: 'he' | 'en') => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.setAttribute('lang', newLanguage);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    direction,
    setDirection: handleSetDirection,
    language,
    setLanguage: handleSetLanguage,
    isRTL: direction === 'rtl',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

