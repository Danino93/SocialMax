import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SEOHead from '../../components/SEO/SEOHead';
import OrderModal from './components/OrderModal';
import { Service, Platform, platformMeta, getServicesByPlatform } from '../../data/services';
import PeakHoursWidget from './components/PeakHoursWidget';
import GrowthJourneyMap from './components/GrowthJourneyMap';
import ServiceComparison from './components/ServiceComparison';

// SEO internal linking: platform → related guide articles
const platformGuides: Partial<Record<Platform, { label: string; href: string }[]>> = {
  instagram: [
    { label: '📸 איך לגדול באינסטגרם 2026', href: '/guides/grow-instagram' },
    { label: '🤖 אלגוריתם אינסטגרם 2026', href: '/guides/instagram-algorithm-2026' },
    { label: '⚖️ האם קניית עוקבים חוקית?', href: '/guides/is-buying-followers-legal-israel' },
  ],
  tiktok: [
    { label: '🎵 שיווק בטיקטוק 2026', href: '/guides/tiktok-marketing' },
    { label: '💰 איך לעשות כסף בטיקטוק', href: '/guides/how-to-make-money-tiktok' },
    { label: '⚖️ האם קניית עוקבים חוקית?', href: '/guides/is-buying-followers-legal-israel' },
  ],
  youtube: [
    { label: '▶️ יוטיוב: ממנויים לרווח 2026', href: '/guides/youtube-growth-guide' },
    { label: '⚡ SMM vs פרסום ממומן', href: '/guides/smm-vs-facebook-ads' },
  ],
  facebook: [
    { label: '📘 שיווק בפייסבוק לעסקים', href: '/guides/facebook-marketing-israel' },
    { label: '⚡ SMM vs פרסום בפייסבוק', href: '/guides/smm-vs-facebook-ads' },
  ],
  google: [
    { label: '⭐ מדריך ביקורות גוגל', href: '/guides/google-reviews-guide' },
  ],
  whatsapp: [
    { label: '💬 10 טיפים לוואטסאפ עסקי', href: '/guides/whatsapp-business-tips' },
  ],
  discord: [
    { label: '🎮 דיסקורד לעסקים — המדריך', href: '/guides/discord-for-businesses' },
  ],
  telegram: [
    { label: '🎓 מה זה SMM?', href: '/guides/what-is-smm' },
    { label: '🚀 SMM למתחילים', href: '/guides/smm-beginners-guide' },
  ],
  twitter: [
    { label: '🚀 SMM למתחילים', href: '/guides/smm-beginners-guide' },
    { label: '⚡ SMM vs פרסום ממומן', href: '/guides/smm-vs-facebook-ads' },
  ],
  spotify: [
    { label: '🎓 מה זה SMM?', href: '/guides/what-is-smm' },
    { label: '🚀 SMM למתחילים', href: '/guides/smm-beginners-guide' },
  ],
};

interface PlatformServicePageProps {
  platform: Platform;
  faqItems?: { q: string; a: string }[];
}

const PlatformServicePage: React.FC<PlatformServicePageProps> = ({ platform, faqItems = [] }) => {
  const meta = platformMeta[platform];
  const platformServices = getServicesByPlatform(platform);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const defaultFaq = [
    {
      q: `האם שירותי ${meta.label} שלכם בטוחים?`,
      a: `כן, כל שירותי ${meta.label} שלנו בטוחים לחלוטין. אנחנו לא מבקשים סיסמאות ופועלים בשיטות אורגניות בלבד.`,
    },
    {
      q: 'כמה זמן לוקח עד שרואים תוצאות?',
      a: 'רוב השירותים מתחילים תוך 1-6 שעות. שירותים מסוימים יכולים לקחת עד 24-48 שעות.',
    },
    {
      q: 'מה קורה אם המספרים יורדים?',
      a: 'שירותים עם תווית Refill מגיעים עם ערבות החזר. אם המספרים יורדים, נחזיר אותם ללא תשלום נוסף.',
    },
    {
      q: 'איך אני מבצע הזמנה?',
      a: 'לחץ על כפתור "הזמן עכשיו" על השירות הרצוי, מלא את הפרטים, ותועבר לטלגרם שלנו לסיום ההזמנה.',
    },
  ];

  const faq = faqItems.length > 0 ? faqItems : defaultFaq;

  return (
    <>
      <SEOHead
        title={`שירותי ${meta.label} - עוקבים, לייקים, צפיות`}
        description={`קנה שירותי ${meta.label} איכותיים - עוקבים, לייקים, צפיות ועוד. מחירים נמוכים, מסירה מהירה, תמיכה בעברית.`}
        canonicalPath={`/services/${platform}`}
      />
      <Header />
      <main>
        {/* Platform Banner */}
        <section
          style={{
            paddingTop: 100,
            paddingBottom: 60,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${meta.color}18 0%, transparent 65%)`,
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              background: meta.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              margin: '0 auto 20px',
              boxShadow: `0 10px 40px ${meta.color}40`,
            }}>
              {meta.emoji}
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: 'white',
              marginBottom: 14,
            }}>
              שירותי{' '}
              <span style={{
                background: meta.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {meta.label}
              </span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 28 }}>
              {platformServices.length} שירותים מקצועיים. מחירים הכי נמוכים בישראל.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              {[
                '⚡ מסירה מהירה',
                '🔒 בטוח 100%',
                '🇮🇱 תמיכה בעברית',
              ].map((badge, i) => (
                <span key={i} style={{
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-sm" aria-label={`שירותי ${meta.label}`}>
          <div className="container">
            {platformServices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                <p>שירותים יתווספו בקרוב</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}>
                {platformServices.map(service => {
                  const displayPrice = service.pricePerK < 0.01
                    ? `₪${service.pricePerK.toFixed(4)}`
                    : service.pricePerK < 1
                    ? `₪${service.pricePerK.toFixed(3)}`
                    : `₪${service.pricePerK.toFixed(2)}`;

                  return (
                    <article
                      key={service.id}
                      className="glass-card"
                      style={{ padding: '24px', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(-4px)';
                        el.style.borderColor = `${meta.color}50`;
                        el.style.boxShadow = `0 8px 30px ${meta.color}20`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translateY(0)';
                        el.style.borderColor = 'rgba(255,255,255,0.08)';
                        el.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                        <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
                          {service.name}
                        </h3>
                        {service.badges.includes('popular') && (
                          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'rgba(239,68,68,0.15)', color: '#f87171', fontWeight: 600, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                            🔥 פופולרי
                          </span>
                        )}
                      </div>
                      <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                        {service.description}
                      </p>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '4px 8px' }}>
                          ⏱️ {service.startTime}
                        </span>
                        <span style={{ fontSize: 12, color: '#94a3b8', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '4px 8px' }}>
                          מ-{service.minOrder.toLocaleString('he-IL')}
                        </span>
                        {service.badges.includes('non-drop') && (
                          <span style={{ fontSize: 12, color: '#34d399', background: 'rgba(16,185,129,0.1)', borderRadius: 6, padding: '4px 8px' }}>
                            ✅ Non-Drop
                          </span>
                        )}
                        {service.badges.includes('refill') && (
                          <span style={{ fontSize: 12, color: '#60a5fa', background: 'rgba(59,130,246,0.1)', borderRadius: 6, padding: '4px 8px' }}>
                            🔄 Refill
                          </span>
                        )}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 16,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <div>
                          <div style={{ color: '#64748b', fontSize: 11 }}>ל-1,000 יחידות</div>
                          <div style={{
                            fontSize: 22,
                            fontWeight: 900,
                            background: meta.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}>
                            {displayPrice}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedService(service)}
                          className="btn-primary"
                          style={{ padding: '10px 20px', fontSize: 14 }}
                        >
                          הזמן
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="section" aria-label={`שאלות נפוצות ${meta.label}`} style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              שאלות נפוצות
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '20px 24px' }}
                >
                  <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                    {item.q}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Extra Widgets */}
      <section className="section-sm">
        <div className="container" style={{ maxWidth: 900 }}>
          <PeakHoursWidget platform={platform} color={meta.color} />
          <GrowthJourneyMap color={meta.color} />
          <ServiceComparison services={platformServices} color={meta.color} />
        </div>
      </section>

      {/* Related Guides — SEO internal linking */}
      <section style={{ paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28 }}>
            <h3 style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
              מדריכים וכלים קשורים
            </h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(platformGuides[platform] ?? []).map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, color: '#94a3b8', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#a78bfa'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,58,237,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/quiz"
                style={{ padding: '6px 14px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 20, color: '#a78bfa', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
              >
                🎯 קוויז: לאיזו פלטפורמה מתאים לי?
              </Link>
              <Link
                to="/build"
                style={{ padding: '6px 14px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 20, color: '#a78bfa', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
              >
                📦 בנה חבילת SMM
              </Link>
              <Link
                to="/guides/ultimate-boost-checklist"
                style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, color: '#94a3b8', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
              >
                ✅ מדריך הבוסט האולטימטיבי
              </Link>
              <Link
                to="/case-studies"
                style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, color: '#94a3b8', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
              >
                📊 סיפורי הצלחה
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedService && (
        <OrderModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="${`שירותי ${meta.label}`}"] .container > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section[aria-label="${`שירותי ${meta.label}`}"] .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default PlatformServicePage;
