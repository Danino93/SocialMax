import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import HeroSection from './components/HeroSection';
import LiveTicker from './components/LiveTicker';
import StatsSection from './components/StatsSection';
import PopularServicesSection from './components/PopularServicesSection';
import ServicesPreview from './components/ServicesPreview';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CountdownTimer from './components/CountdownTimer';
import OrderToast from './components/OrderToast';
import ROICalculatorSection from './components/ROICalculatorSection';
import GrowthChart from './components/GrowthChart';
import PlatformFlipCards from './components/PlatformFlipCards';
import { TELEGRAM_LINK } from '../../components/Layout/Header';
import WhatsAppMockup from '../../components/Marketing/WhatsAppMockup';
import ProfileValueCalculator from './components/ProfileValueCalculator';
import LiveResultsWall from './components/LiveResultsWall';

const HowItWorksSection: React.FC = () => {
  const steps = [
    { num: '1', icon: '🔍', title: 'בחר שירות', description: 'עיין בקטלוג השירותים שלנו ובחר את הפלטפורמה והשירות המתאים לך.' },
    { num: '2', icon: '📱', title: 'שלח הזמנה בטלגרם', description: 'פנה אלינו בטלגרם עם פרטי ההזמנה. נחזור אליך תוך 30 דקות.' },
    { num: '3', icon: '⚡', title: 'קבל תוצאות', description: 'השירות מתחיל לפעול ותראה תוצאות תוך שעות ספורות.' },
  ];

  return (
    <section className="section" aria-label="איך זה עובד" style={{ background: 'rgba(255,255,255,0.015)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>🚀 פשוט ומהיר</span>
          <h2 className="section-title">
            איך זה{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>עובד?</span>
          </h2>
          <p className="section-subtitle">3 שלבים פשוטים ואתה בדרך להצלחה</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 40, right: '16.7%', left: '16.7%', height: 2, background: 'linear-gradient(90deg, #7c3aed, #2563eb)', opacity: 0.3, zIndex: 0 }} className="hide-mobile" />
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, position: 'relative', zIndex: 1 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 16, boxShadow: '0 4px 20px rgba(124,58,237,0.4)', flexShrink: 0 }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{step.icon}</div>
              <h3 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { section[aria-label="איך זה עובד"] .container > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

const CTASection: React.FC = () => (
  <section className="section" aria-label="קריאה לפעולה" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.10) 100%)', borderTop: '1px solid rgba(124,58,237,0.2)', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 16, color: 'white' }}>מוכן להגדיל את הנוכחות שלך?</h2>
      <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 36, lineHeight: 1.7 }}>הצטרף ל-1,000+ לקוחות מרוצים שכבר שיפרו את הנוכחות הדיגיטלית שלהם</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/services" className="btn-primary" style={{ fontSize: 17, padding: '15px 36px' }}>צפה בשירותים</Link>
        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram" style={{ fontSize: 17, padding: '15px 36px' }}>📱 התחל עכשיו בטלגרם</a>
      </div>
    </div>
  </section>
);

const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="SocialSniper - קנה עוקבים, לייקים וצפיות לרשתות החברתיות"
        description="קנה עוקבים לאינסטגרם, לייקים לפייסבוק, צפיות לטיקטוק ומנויים ליוטיוב. המחירים הכי נמוכים בישראל. מסירה מהירה, תמיכה בעברית, 1,000+ לקוחות מרוצים."
        keywords="קנה עוקבים, לייקים לאינסטגרם, עוקבים לאינסטגרם, צפיות לטיקטוק, לייקים לפייסבוק, מנויים ליוטיוב, עוקבים לטיקטוק, SMM ישראל"
        canonicalPath="/"
      />
      <Header />
      <OrderToast />
      <main>
        <HeroSection />
        <CountdownTimer />
        <LiveTicker />
        <StatsSection />
        <PopularServicesSection />
        <PlatformFlipCards />
        <ServicesPreview />
        <HowItWorksSection />
        <ROICalculatorSection />
        <LiveResultsWall />
        <WhyChooseUsSection />
        <GrowthChart />
        <ProfileValueCalculator />
        <WhatsAppMockup />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
