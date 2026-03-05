import React, { useState } from 'react';
import SEOHead from '../../components/SEO/SEOHead';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { services } from '../../data/services';

interface CartItem {
  serviceId: string;
  name: string;
  qty: number;
  pricePerK: number;
  platform: string;
  emoji: string;
}

const platformEmojis: Record<string, string> = {
  instagram: '📸', tiktok: '🎵', youtube: '▶️', facebook: '📘',
  telegram: '✈️', whatsapp: '💬', twitter: '🐦', discord: '🎮',
  spotify: '🎧', google: '🔍',
};

const PRESETS = [
  {
    label: '🌱 סטרטר',
    description: 'להתחיל להיראות רציני',
    serviceIds: ['ig-followers-basic', 'ig-likes', 'tt-followers'],
    color: '#10b981',
  },
  {
    label: '⚡ פרו',
    description: 'לצמוח בצורה משמעותית',
    serviceIds: ['ig-followers-refill', 'ig-likes', 'yt-subscribers', 'fb-page-likes'],
    color: '#7c3aed',
  },
  {
    label: '🚀 בוסטר',
    description: 'לטרנד וויראליות',
    serviceIds: ['ig-followers-premium', 'tt-views', 'yt-views', 'tt-followers'],
    color: '#ef4444',
  },
];

function calcPrice(s: { pricePerK: number }, qty: number) {
  return (s.pricePerK * qty) / 1000;
}

const DEFAULT_PLATFORM = 'הכל';
const platforms = [DEFAULT_PLATFORM, 'instagram', 'tiktok', 'youtube', 'facebook', 'telegram', 'spotify', 'twitter', 'google', 'discord', 'whatsapp'];

const PackageBuilder: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterPlatform, setFilterPlatform] = useState(DEFAULT_PLATFORM);
  const [qtys, setQtys] = useState<Record<string, number>>({});

  const filteredServices = filterPlatform === DEFAULT_PLATFORM
    ? services
    : services.filter(s => s.platform === filterPlatform);

  function addToCart(svcId: string) {
    const svc = services.find(s => s.id === svcId);
    if (!svc) return;
    const qty = qtys[svcId] ?? svc.minOrder;
    setCart(prev => {
      const existing = prev.find(c => c.serviceId === svcId);
      if (existing) return prev.map(c => c.serviceId === svcId ? { ...c, qty } : c);
      return [...prev, {
        serviceId: svcId,
        name: svc.name,
        qty,
        pricePerK: svc.pricePerK,
        platform: svc.platform,
        emoji: platformEmojis[svc.platform] ?? '🌐',
      }];
    });
  }

  function removeFromCart(svcId: string) {
    setCart(prev => prev.filter(c => c.serviceId !== svcId));
  }

  function applyPreset(preset: typeof PRESETS[0]) {
    const newItems: CartItem[] = [];
    preset.serviceIds.forEach(id => {
      const svc = services.find(s => s.id === id);
      if (!svc) return;
      const exists = cart.find(c => c.serviceId === id);
      if (!exists) {
        newItems.push({
          serviceId: id,
          name: svc.name,
          qty: svc.minOrder,
          pricePerK: svc.pricePerK,
          platform: svc.platform,
          emoji: platformEmojis[svc.platform] ?? '🌐',
        });
      }
    });
    setCart(prev => [...prev, ...newItems]);
  }

  const total = cart.reduce((sum, c) => sum + calcPrice(c, c.qty), 0);

  function buildTelegramMsg() {
    const lines = cart.map(c => `• ${c.name}: ${c.qty.toLocaleString('he-IL')} יחידות — ₪${calcPrice(c, c.qty).toFixed(0)}`);
    const msg = `שלום! אני רוצה לבנות חבילה מותאמת:\n${lines.join('\n')}\n\nסה"כ: ₪${total.toFixed(0)}`;
    return encodeURIComponent(msg);
  }

  const telegramUrl = `https://t.me/socialsniper93_bot?text=${buildTelegramMsg()}`;

  return (
    <>
      <SEOHead
        title="בנה את החבילה שלך | SocialSniper"
        description="בנה חבילת SMM מותאמת אישית — בחר שירותים, הגדר כמויות, וראה מחיר חי. הזמן בטלגרם בקליק."
        keywords="חבילת SMM ישראל, עוקבים לייקים צפיות במחיר מיוחד, package builder"
      />
      <Header />

      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
              📦 בונה חבילות
            </span>
            <h1 className="section-title" style={{ marginBottom: 12 }}>
              בנה את{' '}
              <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                החבילה שלך
              </span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: 460, margin: '0 auto' }}>
              בחר שירותים, הגדר כמויות, וקבל מחיר בזמן אמת — ואז הזמן בקליק אחד
            </p>
          </div>

          {/* Presets */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>
              ⚡ חבילות מוכנות (לחץ להוסיף לעגלה)
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  style={{
                    padding: '12px 20px',
                    background: `${p.color}12`,
                    border: `1px solid ${p.color}30`,
                    borderRadius: 14,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Heebo, sans-serif',
                    transition: 'all 0.15s',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${p.color}25`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${p.color}12`; }}
                >
                  <div>{p.label}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

            {/* Left — catalog */}
            <div>
              {/* Platform filter */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {platforms.map(p => (
                  <button
                    key={p}
                    onClick={() => setFilterPlatform(p)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: `1px solid ${filterPlatform === p ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                      background: filterPlatform === p ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                      color: filterPlatform === p ? '#a78bfa' : '#64748b',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'Heebo, sans-serif',
                    }}
                  >
                    {p === DEFAULT_PLATFORM ? 'הכל' : `${platformEmojis[p]} ${p}`}
                  </button>
                ))}
              </div>

              {/* Services */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filteredServices.map(svc => {
                  const qty = qtys[svc.id] ?? svc.minOrder;
                  const price = calcPrice(svc, qty);
                  const inCart = cart.some(c => c.serviceId === svc.id);

                  return (
                    <div
                      key={svc.id}
                      className="glass-card"
                      style={{
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        borderColor: inCart ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.08)',
                        background: inCart ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <div style={{ fontSize: 22, flexShrink: 0 }}>{platformEmojis[svc.platform]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: 'white', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{svc.name}</div>
                        <div style={{ color: '#64748b', fontSize: 11 }}>{svc.startTime} · מינ׳ {svc.minOrder.toLocaleString()}</div>
                      </div>
                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                          type="number"
                          min={svc.minOrder}
                          max={svc.maxOrder}
                          step={100}
                          value={qty}
                          onChange={e => setQtys(prev => ({ ...prev, [svc.id]: Number(e.target.value) }))}
                          style={{
                            width: 76,
                            background: '#1a1a2e',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: 'white',
                            padding: '5px 8px',
                            fontSize: 12,
                            fontFamily: 'Heebo, sans-serif',
                            textAlign: 'center',
                          }}
                        />
                      </div>
                      <div style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700, minWidth: 52, textAlign: 'left' }}>
                        ₪{price.toFixed(0)}
                      </div>
                      <button
                        onClick={() => inCart ? removeFromCart(svc.id) : addToCart(svc.id)}
                        style={{
                          padding: '6px 14px',
                          background: inCart ? 'rgba(239,68,68,0.12)' : 'rgba(124,58,237,0.15)',
                          border: `1px solid ${inCart ? 'rgba(239,68,68,0.3)' : 'rgba(124,58,237,0.3)'}`,
                          borderRadius: 10,
                          color: inCart ? '#f87171' : '#a78bfa',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Heebo, sans-serif',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s',
                        }}
                      >
                        {inCart ? '✗ הסר' : '+ הוסף'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Cart */}
            <div style={{
              position: 'sticky',
              top: 90,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 24,
            }}>
              <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
                🛒 העגלה שלך
                {cart.length > 0 && (
                  <span style={{
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 20,
                    marginRight: 8,
                  }}>
                    {cart.length}
                  </span>
                )}
              </h3>

              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: '#334155' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
                  <div style={{ fontSize: 13 }}>הוסף שירותים לעגלה</div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    {cart.map(c => (
                      <div key={c.serviceId} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <div>
                          <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                            {c.emoji} {c.name}
                          </div>
                          <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>
                            × {c.qty.toLocaleString('he-IL')} יחידות
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>
                            ₪{calcPrice(c, c.qty).toFixed(0)}
                          </span>
                          <button
                            onClick={() => removeFromCart(c.serviceId)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#475569',
                              cursor: 'pointer',
                              fontSize: 16,
                              padding: 2,
                            }}
                          >×</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    marginBottom: 20,
                  }}>
                    <span style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600 }}>סה"כ</span>
                    <span style={{
                      fontSize: 22,
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      ₪{total.toFixed(0)}
                    </span>
                  </div>

                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-telegram"
                    style={{ width: '100%', textAlign: 'center', justifyContent: 'center', display: 'flex' }}
                  >
                    📱 הזמן חבילה זו בטלגרם
                  </a>

                  <button
                    onClick={() => setCart([])}
                    style={{
                      width: '100%',
                      marginTop: 8,
                      padding: '8px',
                      background: 'none',
                      border: 'none',
                      color: '#475569',
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: 'Heebo, sans-serif',
                    }}
                  >
                    נקה עגלה
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pkg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default PackageBuilder;
