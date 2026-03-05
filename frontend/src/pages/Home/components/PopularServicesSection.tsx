import React, { useState } from 'react';
import { getServiceById } from '../../../data/services';
import OrderModal from '../../Services/components/OrderModal';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const POPULAR = [
  {
    serviceId: 'ig-followers-basic',
    keyword:   'עוקבים לאינסטגרם',
    subtext:   'הכי נחפש בישראל',
    icon:      '📸',
    color:     '#e1306c',
    bg:        'linear-gradient(135deg, rgba(225,48,108,0.15), rgba(225,48,108,0.05))',
    border:    'rgba(225,48,108,0.25)',
    tag:       '🔥 #1 פופולרי',
    tagColor:  '#f87171',
    tagBg:     'rgba(239,68,68,0.12)',
  },
  {
    serviceId: 'ig-likes',
    keyword:   'לייקים לאינסטגרם',
    subtext:   'מחיר מ-₪1.10 לאלף',
    icon:      '❤️',
    color:     '#e1306c',
    bg:        'linear-gradient(135deg, rgba(225,48,108,0.12), rgba(225,48,108,0.04))',
    border:    'rgba(225,48,108,0.2)',
    tag:       '⚡ מסירה מהירה',
    tagColor:  '#fbbf24',
    tagBg:     'rgba(251,191,36,0.1)',
  },
  {
    serviceId: 'tt-followers',
    keyword:   'עוקבים לטיקטוק',
    subtext:   'מחיר מ-₪0.90 לאלף',
    icon:      '🎵',
    color:     '#ff0050',
    bg:        'linear-gradient(135deg, rgba(255,0,80,0.15), rgba(255,0,80,0.05))',
    border:    'rgba(255,0,80,0.25)',
    tag:       '🚀 עולה בפופולריות',
    tagColor:  '#a78bfa',
    tagBg:     'rgba(167,139,250,0.1)',
  },
  {
    serviceId: 'fb-post-likes',
    keyword:   'לייקים לפייסבוק',
    subtext:   'מחיר מ-₪0.90 לאלף',
    icon:      '👍',
    color:     '#1877f2',
    bg:        'linear-gradient(135deg, rgba(24,119,242,0.15), rgba(24,119,242,0.05))',
    border:    'rgba(24,119,242,0.25)',
    tag:       '💰 הכי זול',
    tagColor:  '#34d399',
    tagBg:     'rgba(52,211,153,0.1)',
  },
  {
    serviceId: 'tt-views',
    keyword:   'צפיות לטיקטוק',
    subtext:   'מ-₪0.003 לאלף צפיות',
    icon:      '👁️',
    color:     '#ff0050',
    bg:        'linear-gradient(135deg, rgba(255,0,80,0.12), rgba(255,0,80,0.04))',
    border:    'rgba(255,0,80,0.2)',
    tag:       '⚡ זול מאד',
    tagColor:  '#fbbf24',
    tagBg:     'rgba(251,191,36,0.1)',
  },
  {
    serviceId: 'yt-subscribers',
    keyword:   'מנויים ליוטיוב',
    subtext:   'מחיר מ-₪1.30 לאלף',
    icon:      '▶️',
    color:     '#ff0000',
    bg:        'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,0,0,0.05))',
    border:    'rgba(255,0,0,0.25)',
    tag:       '✅ Non-Drop',
    tagColor:  '#34d399',
    tagBg:     'rgba(52,211,153,0.12)',
  },
];

const PopularServicesSection: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const selectedService = selectedServiceId ? getServiceById(selectedServiceId) : null;
  const gridRef = useScrollReveal(80);

  return (
    <section className="section" aria-label="שירותים פופולריים">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
            🔥 הכי נקנים
          </span>
          <h2 className="section-title">
            השירותים{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              הפופולריים
            </span>
            {' '}ביותר
          </h2>
          <p className="section-subtitle">
            המוצרים שהישראלים מחפשים הכי הרבה — במחירים הכי נמוכים שתמצא
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {POPULAR.map((item) => {
            const service = getServiceById(item.serviceId);
            if (!service) return null;

            const priceDisplay = service.pricePerK < 0.01
              ? `₪${service.pricePerK.toFixed(4)}/K`
              : service.pricePerK < 1
              ? `₪${service.pricePerK.toFixed(3)}/K`
              : `₪${service.pricePerK.toFixed(2)}/K`;

            return (
              <div
                key={item.serviceId}
                className="reveal-card"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  borderRadius: 20,
                  padding: '28px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease, opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 16px 40px ${item.color}20`;
                  el.style.borderColor = item.color + '60';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = item.border;
                }}
                onClick={() => setSelectedServiceId(item.serviceId)}
              >
                {/* Glow corner */}
                <div style={{
                  position: 'absolute', top: -30, left: -30,
                  width: 100, height: 100, borderRadius: '50%',
                  background: `radial-gradient(circle, ${item.color}25, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Tag */}
                <div style={{ marginBottom: 16 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: item.tagColor,
                    background: item.tagBg, padding: '3px 10px', borderRadius: 100,
                    border: `1px solid ${item.tagColor}30`,
                  }}>
                    {item.tag}
                  </span>
                </div>

                {/* Icon + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${item.color}20`,
                    border: `1px solid ${item.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ color: 'white', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                      {item.keyword}
                    </h3>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{item.subtext}</div>
                  </div>
                </div>

                {/* Price + min */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <div style={{
                    fontSize: 20, fontWeight: 900,
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}aa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {priceDisplay}
                  </div>
                  <div style={{ color: '#475569', fontSize: 12 }}>
                    מינ׳ {service.minOrder.toLocaleString('he-IL')}
                  </div>
                </div>

                {/* CTA */}
                <button
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                    border: 'none',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Heebo, sans-serif',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLButtonElement).style.opacity = '0.85')}
                  onMouseLeave={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
                  onClick={e => { e.stopPropagation(); setSelectedServiceId(item.serviceId); }}
                >
                  הזמן עכשיו →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <OrderModal service={selectedService} onClose={() => setSelectedServiceId(null)} />
      )}

      <style>{`
        @media (max-width: 900px) {
          section[aria-label="שירותים פופולריים"] .container > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          section[aria-label="שירותים פופולריים"] .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularServicesSection;
