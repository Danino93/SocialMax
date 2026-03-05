import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import { Platform, platformMeta, getServicesByPlatform } from '../../data/services';
import { TELEGRAM_LINK } from '../../components/Layout/Header';
import ComparisonTable from './components/ComparisonTable';

const platforms: Platform[] = [
  'instagram', 'facebook', 'tiktok', 'youtube',
  'telegram', 'whatsapp', 'twitter', 'discord', 'spotify', 'google',
];

const Pricing: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>('instagram');
  const platformServices = getServicesByPlatform(activePlatform);
  const meta = platformMeta[activePlatform];

  return (
    <>
      <SEOHead
        title="מחירון שירותים - SocialSniper"
        description="מחירון שקוף ומלא לכל שירותי SMM. עוקבים, לייקים, צפיות לכל הפלטפורמות. מחירים לפי כמות ללא הפתעות."
        canonicalPath="/pricing"
      />
      <Header />
      <main>
        {/* Page Header */}
        <section style={{
          paddingTop: 120,
          paddingBottom: 60,
          textAlign: 'center',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 65%)',
        }}>
          <div className="container">
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
              💰 מחירון שקוף
            </span>
            <h1 className="section-title" style={{ marginBottom: 12 }}>
              מחירים{' '}
              <span style={{
                background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                שקופים
              </span>
            </h1>
            <p className="section-subtitle">
              ללא הפתעות, ללא תשלומים נסתרים. מחיר לפי כמות, ברור וישיר.
            </p>
          </div>
        </section>

        {/* Platform Tabs */}
        <div style={{ background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 72, zIndex: 50 }}>
          <div className="container" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
              {platforms.map(p => {
                const m = platformMeta[p];
                return (
                  <button
                    key={p}
                    onClick={() => setActivePlatform(p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '9px 18px',
                      borderRadius: 10,
                      background: activePlatform === p
                        ? `linear-gradient(135deg, ${m.color}25, ${m.color}10)`
                        : 'none',
                      border: activePlatform === p
                        ? `1px solid ${m.color}50`
                        : '1px solid transparent',
                      color: activePlatform === p ? 'white' : '#64748b',
                      fontSize: 14,
                      fontWeight: activePlatform === p ? 700 : 400,
                      cursor: 'pointer',
                      fontFamily: 'Heebo, sans-serif',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{m.emoji}</span> {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <section className="section" aria-label="טבלת מחירים">
          <div className="container">
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              overflow: 'hidden',
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 100px 140px 120px',
                gap: 0,
                background: 'rgba(124,58,237,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                padding: '14px 24px',
                fontSize: 12,
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                <span>שירות</span>
                <span style={{ textAlign: 'center' }}>מחיר/1K</span>
                <span style={{ textAlign: 'center' }}>מינימום</span>
                <span style={{ textAlign: 'center' }}>התחלה</span>
                <span style={{ textAlign: 'center' }}>פעולה</span>
              </div>

              {/* Table Rows */}
              {platformServices.map((service, i) => {
                const displayPrice = service.pricePerK < 0.01
                  ? `₪${service.pricePerK.toFixed(4)}`
                  : service.pricePerK < 1
                  ? `₪${service.pricePerK.toFixed(3)}`
                  : `₪${service.pricePerK.toFixed(2)}`;

                return (
                  <div
                    key={service.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 100px 100px 140px 120px',
                      padding: '16px 24px',
                      borderBottom: i < platformServices.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      alignItems: 'center',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <div>
                      <div style={{ color: 'white', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                        {service.name}
                        {service.badges.includes('popular') && (
                          <span style={{ marginRight: 8, fontSize: 11, color: '#f87171', background: 'rgba(239,68,68,0.15)', padding: '2px 7px', borderRadius: 100 }}>🔥</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {service.badges.includes('non-drop') && <span style={{ fontSize: 11, color: '#34d399' }}>✅ Non-Drop</span>}
                        {service.badges.includes('refill') && <span style={{ fontSize: 11, color: '#60a5fa' }}>🔄 Refill</span>}
                      </div>
                    </div>
                    <div style={{
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: 800,
                      background: meta.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {displayPrice}
                    </div>
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                      {service.minOrder.toLocaleString('he-IL')}
                    </div>
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                      {service.startTime}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Link
                        to={`/services/${activePlatform}`}
                        className="btn-primary"
                        style={{ padding: '7px 16px', fontSize: 13 }}
                      >
                        הזמן
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <p style={{ color: '#94a3b8', marginBottom: 16 }}>רוצה מחיר מיוחד על כמות גדולה?</p>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram"
                style={{ fontSize: 16, padding: '13px 32px' }}
              >
                📱 דבר איתנו בטלגרם
              </a>
            </div>
          </div>
        </section>
        <ComparisonTable />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="טבלת מחירים"] .container > div:first-child > div {
            grid-template-columns: 1fr 80px 80px !important;
          }
          section[aria-label="טבלת מחירים"] .container > div:first-child > div > span:nth-child(4),
          section[aria-label="טבלת מחירים"] .container > div:first-child > div > span:nth-child(5) { display: none; }
          section[aria-label="טבלת מחירים"] .container > div:first-child > div:not(:first-child) > div:nth-child(4),
          section[aria-label="טבלת מחירים"] .container > div:first-child > div:not(:first-child) > div:nth-child(5) { display: none; }
        }
      `}</style>
    </>
  );
};

export default Pricing;
