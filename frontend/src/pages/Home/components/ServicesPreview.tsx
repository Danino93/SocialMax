import React from 'react';
import { Link } from 'react-router-dom';
import { platformMeta, Platform, getServicesByPlatform } from '../../../data/services';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const platforms: Platform[] = [
  'instagram', 'facebook', 'tiktok', 'youtube',
  'telegram', 'whatsapp', 'twitter', 'discord', 'spotify', 'google',
];

// Brand color per platform for hover glow
const brandColors: Record<Platform, string> = {
  instagram: '#e1306c',
  facebook:  '#1877f2',
  tiktok:    '#ff0050',
  youtube:   '#ff0000',
  telegram:  '#2aabee',
  whatsapp:  '#25d366',
  twitter:   '#1da1f2',
  discord:   '#5865f2',
  spotify:   '#1db954',
  google:    '#4285f4',
};

const ServicesPreview: React.FC = () => {
  const gridRef = useScrollReveal(55);

  return (
    <section className="section" aria-label="פלטפורמות">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
            🚀 10 פלטפורמות מובילות
          </span>
          <h2 className="section-title">
            שירותים לכל{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              הרשתות
            </span>
          </h2>
          <p className="section-subtitle">
            נוכחות חזקה בכל הפלטפורמות החברתיות - מאינסטגרם ועד ספוטיפיי
          </p>
        </div>

        {/* Platform grid with scroll-reveal */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}
        >
          {platforms.map((platform, idx) => {
            const meta = platformMeta[platform];
            const services = getServicesByPlatform(platform);
            const brandColor = brandColors[platform];
            const startPrice = services.length > 0
              ? Math.min(...services.map(s => s.pricePerK))
              : 0;

            return (
              <Link
                key={platform}
                to={`/services/${platform}`}
                className="reveal-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  padding: '28px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease, opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(-8px) scale(1.02)';
                  el.style.borderColor = `${brandColor}60`;
                  el.style.background = `${brandColor}10`;
                  el.style.boxShadow = `0 16px 48px ${brandColor}25`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(0) scale(1)';
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Platform icon with staggered float */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: meta.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    boxShadow: `0 6px 20px ${meta.color}35`,
                    animation: `iconFloat ${3.5 + idx * 0.25}s ease-in-out infinite ${idx * 0.3}s`,
                  }}
                >
                  {meta.emoji}
                </div>

                {/* Name */}
                <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>
                  {meta.label}
                </span>

                {/* Services count */}
                <span style={{ color: '#64748b', fontSize: 12 }}>
                  {services.length} שירותים
                </span>

                {/* Starting price with brand color */}
                {startPrice > 0 && (
                  <div style={{
                    background: `${brandColor}15`,
                    border: `1px solid ${brandColor}30`,
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 12,
                    color: brandColor,
                    fontWeight: 700,
                  }}>
                    מ-₪{startPrice < 0.01 ? startPrice.toFixed(4) : startPrice < 1 ? startPrice.toFixed(3) : startPrice.toFixed(2)}/1K
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            to="/services"
            className="btn-primary"
            style={{ fontSize: 16, padding: '13px 32px' }}
          >
            צפה בכל השירותים →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-label="פלטפורמות"] .container > div:nth-child(2) {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          section[aria-label="פלטפורמות"] .container > div:nth-child(2) {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 400px) {
          section[aria-label="פלטפורמות"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesPreview;
