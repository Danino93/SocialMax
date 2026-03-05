import React, { useState, useEffect } from 'react';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { Service, calculatePrice } from '../../../data/services';
import { platformMeta } from '../../../data/services';

interface OrderModalProps {
  service: Service;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ service, onClose }) => {
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(service.minOrder);
  const [urlError, setUrlError] = useState('');
  const [sent, setSent] = useState(false);

  const meta = platformMeta[service.platform];
  const price = calculatePrice(service, quantity);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleQuantityChange = (val: number) => {
    const clamped = Math.max(service.minOrder, Math.min(service.maxOrder, val));
    setQuantity(clamped);
  };

  const buildTelegramMessage = () => {
    const priceFormatted = price < 1 ? `${(price * 100).toFixed(0)} אגורות` : `₪${price.toFixed(2)}`;
    return encodeURIComponent(
      `🛒 הזמנה חדשה מ-SocialSniper\n\n` +
      `📦 שירות: ${service.name}\n` +
      `📱 פלטפורמה: ${meta.label}\n` +
      `🔢 כמות: ${quantity.toLocaleString('he-IL')}\n` +
      `🔗 קישור: ${url || '[יש לצרף קישור]'}\n` +
      `💰 מחיר: ${priceFormatted}`
    );
  };

  const handleOrder = () => {
    if (!url.trim()) {
      setUrlError('נא להזין קישור או שם משתמש');
      return;
    }
    setUrlError('');
    setSent(true);
    const msg = buildTelegramMessage();
    window.open(`https://t.me/socialsniper93_bot?text=${msg}`, '_blank');
  };

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`הזמנת ${service.name}`}
    >
      <div className="modal-content">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: meta.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
            }}>
              {meta.emoji}
            </div>
            <div>
              <h2 style={{ color: 'white', fontSize: 17, fontWeight: 700, marginBottom: 2 }}>
                {service.name}
              </h2>
              <span style={{ color: '#64748b', fontSize: 13 }}>
                {meta.label} · מ-{service.minOrder.toLocaleString('he-IL')} יחידות
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
            aria-label="סגור חלון"
          >
            <X size={20} />
          </button>
        </div>

        {!sent ? (
          <>
            {/* URL Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                🔗 קישור לדף / שם משתמש *
              </label>
              <input
                className="input-field"
                type="text"
                placeholder="https://instagram.com/username או @username"
                value={url}
                onChange={e => { setUrl(e.target.value); setUrlError(''); }}
                dir="ltr"
                style={{ textAlign: 'right' }}
              />
              {urlError && (
                <p style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{urlError}</p>
              )}
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
                  🔢 כמות
                </label>
                <span style={{
                  background: 'rgba(124,58,237,0.15)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: 6,
                  padding: '2px 10px',
                  color: '#a78bfa',
                  fontSize: 14,
                  fontWeight: 700,
                }}>
                  {quantity.toLocaleString('he-IL')}
                </span>
              </div>
              <input
                type="range"
                min={service.minOrder}
                max={Math.min(service.maxOrder, service.minOrder * 100)}
                value={quantity}
                onChange={e => handleQuantityChange(Number(e.target.value))}
                style={{ marginBottom: 8 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 11 }}>
                <span>מינ׳: {service.minOrder.toLocaleString('he-IL')}</span>
                <span>מקס׳: {service.maxOrder.toLocaleString('he-IL')}</span>
              </div>
            </div>

            {/* Price Card */}
            <div style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>מחיר משוער</div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {price < 0.01 ? `${(price * 100).toFixed(2)} אג'` : price < 1 ? `${(price * 100).toFixed(0)} אג'` : `₪${price.toFixed(2)}`}
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>מחיר ל-1K</div>
                <div style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>
                  ₪{service.pricePerK < 0.01 ? service.pricePerK.toFixed(4) : service.pricePerK.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              {[
                { icon: '⏱️', text: service.startTime },
                ...(service.badges.includes('non-drop') ? [{ icon: '✅', text: 'Non-Drop' }] : []),
                ...(service.badges.includes('refill') ? [{ icon: '🔄', text: 'Refill' }] : []),
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: 13,
                  color: '#94a3b8',
                }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={handleOrder}
              className="btn-telegram"
              style={{ width: '100%', fontSize: 16, padding: '14px', borderRadius: 12, justifyContent: 'center' }}
            >
              📱 המשך להזמנה בטלגרם
              <ExternalLink size={16} />
            </button>
            <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 10 }}>
              לאחר שליחת ההודעה, נציג שלנו יחזור אליך תוך 30 דקות
            </p>
          </>
        ) : (
          /* Sent State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              הטלגרם נפתח! 🎉
            </h3>
            <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              ההזמנה שלך הועברה לטלגרם. נציג שלנו יחזור אליך תוך 30 דקות בימי חול.
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
            >
              סגור
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
