import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import OrderModal from './components/OrderModal';
import { services, Service, Platform, platformMeta } from '../../data/services';

const platforms: { key: 'all' | Platform; label: string; emoji: string }[] = [
  { key: 'all', label: 'הכל', emoji: '🌐' },
  { key: 'instagram', label: 'Instagram', emoji: '📸' },
  { key: 'facebook', label: 'Facebook', emoji: '👥' },
  { key: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { key: 'youtube', label: 'YouTube', emoji: '▶️' },
  { key: 'telegram', label: 'Telegram', emoji: '✈️' },
  { key: 'whatsapp', label: 'WhatsApp', emoji: '💬' },
  { key: 'twitter', label: 'X', emoji: '🐦' },
  { key: 'discord', label: 'Discord', emoji: '🎮' },
  { key: 'spotify', label: 'Spotify', emoji: '🎶' },
  { key: 'google', label: 'Google', emoji: '📍' },
];

const badgeLabel: Record<string, string> = {
  popular: '🔥 פופולרי',
  'non-drop': '✅ Non-Drop',
  refill: '🔄 Refill',
  fast: '⚡ מהיר',
  premium: '💎 פרמיום',
};

const ServiceCard: React.FC<{ service: Service; onOrder: (s: Service) => void }> = ({ service, onOrder }) => {
  const meta = platformMeta[service.platform];
  const displayPrice = service.pricePerK < 0.01
    ? `₪${service.pricePerK.toFixed(4)}`
    : service.pricePerK < 1
    ? `₪${service.pricePerK.toFixed(3)}`
    : `₪${service.pricePerK.toFixed(2)}`;

  return (
    <article
      className="glass-card"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'rgba(124,58,237,0.35)';
        el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Platform + Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          background: meta.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
        }}>
          {meta.emoji}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {service.badges.slice(0, 2).map(b => (
            <span
              key={b}
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 100,
                fontWeight: 600,
                background: b === 'popular' ? 'rgba(239,68,68,0.15)' :
                            b === 'non-drop' ? 'rgba(16,185,129,0.15)' :
                            b === 'refill' ? 'rgba(59,130,246,0.15)' :
                            b === 'premium' ? 'rgba(168,85,247,0.15)' :
                            'rgba(245,158,11,0.15)',
                color: b === 'popular' ? '#f87171' :
                       b === 'non-drop' ? '#34d399' :
                       b === 'refill' ? '#60a5fa' :
                       b === 'premium' ? '#a78bfa' :
                       '#fbbf24',
                border: `1px solid ${
                  b === 'popular' ? 'rgba(239,68,68,0.25)' :
                  b === 'non-drop' ? 'rgba(16,185,129,0.25)' :
                  b === 'refill' ? 'rgba(59,130,246,0.25)' :
                  b === 'premium' ? 'rgba(168,85,247,0.25)' :
                  'rgba(245,158,11,0.25)'
                }`,
              }}
            >
              {badgeLabel[b] || b}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
        {service.name}
      </h3>

      {/* Description */}
      <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
        {service.description}
      </p>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 12, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '4px 8px' }}>
          ⏱️ {service.startTime}
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '4px 8px' }}>
          מינ׳: {service.minOrder.toLocaleString('he-IL')}
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '4px 8px' }}>
          מקס׳: {service.maxOrder.toLocaleString('he-IL')}
        </span>
      </div>

      {/* Price + CTA */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 2 }}>מחיר ל-1,000</div>
          <div style={{
            fontSize: 22,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {displayPrice}
          </div>
        </div>
        <button
          onClick={() => onOrder(service)}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: 14 }}
          aria-label={`הזמן ${service.name}`}
        >
          הזמן עכשיו
        </button>
      </div>
    </article>
  );
};

const ServicesPage: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'all' | Platform>('all');
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filtered = services.filter(s => {
    const matchPlatform = activePlatform === 'all' || s.platform === activePlatform;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchSearch;
  });

  return (
    <>
      <SEOHead
        title="כל השירותים - שיווק ברשתות חברתיות"
        description="קטלוג שלם של שירותי SMM לכל הפלטפורמות. עוקבים, לייקים, צפיות, תגובות ועוד. מחירים שקופים ומסירה מהירה."
        canonicalPath="/services"
      />
      <Header />
      <main>
        {/* Page Header */}
        <section
          style={{
            paddingTop: 120,
            paddingBottom: 48,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
              📋 קטלוג שירותים
            </span>
            <h1 className="section-title" style={{ marginBottom: 12 }}>
              כל{' '}
              <span style={{
                background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                השירותים שלנו
              </span>
            </h1>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              {services.length} שירותים לכל הפלטפורמות. בחר, הזמן, ותן לנו לעשות את העבודה.
            </p>

            {/* Search */}
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
              <input
                className="input-field"
                type="search"
                placeholder="🔍 חפש שירות..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Platform Filter Tabs */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.9)', position: 'sticky', top: 72, zIndex: 50 }}>
          <div className="container" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
              {platforms.map(p => (
                <button
                  key={p.key}
                  onClick={() => setActivePlatform(p.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: activePlatform === p.key
                      ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))'
                      : 'none',
                    border: activePlatform === p.key
                      ? '1px solid rgba(124,58,237,0.4)'
                      : '1px solid transparent',
                    color: activePlatform === p.key ? 'white' : '#64748b',
                    fontSize: 14,
                    fontWeight: activePlatform === p.key ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Heebo, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{p.emoji}</span>
                  {p.label}
                  <span style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 100,
                    padding: '1px 7px',
                    fontSize: 11,
                  }}>
                    {p.key === 'all' ? services.length : services.filter(s => s.platform === p.key).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <section className="section" aria-label="רשימת שירותים">
          <div className="container">
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: 18 }}>לא נמצאו שירותים</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}>
                {filtered.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onOrder={setSelectedService}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Order Modal */}
        {selectedService && (
          <OrderModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          section[aria-label="רשימת שירותים"] .container > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section[aria-label="רשימת שירותים"] .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default ServicesPage;
