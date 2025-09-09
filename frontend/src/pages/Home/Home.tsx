import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/UI/Button';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <Header onMenuClick={() => {}} />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Preview */}
        <ServicesPreview />
        
        {/* Why Choose Us */}
        <WhyChooseUsSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Pricing */}
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;

