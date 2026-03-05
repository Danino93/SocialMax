import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { TELEGRAM_LINK } from './Header';
import { platformMeta, Platform } from '../../data/services';

const platforms: Platform[] = [
  'instagram', 'facebook', 'tiktok', 'youtube',
  'telegram', 'whatsapp', 'twitter', 'discord',
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      style={{
        background: '#0a0a0f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '64px 0 32px',
      }}
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SocialSniper',
            url: 'https://socialsniper.co.il',
            description: 'שירותי SMM לשוק הישראלי - עוקבים, לייקים, צפיות לכל הפלטפורמות',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              url: TELEGRAM_LINK,
            },
          }),
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1.5fr',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand column */}
          <div>
            <Link
              to="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Zap size={16} color="white" strokeWidth={2.5} />
              </div>
              <span style={{
                fontSize: 18,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                SocialSniper
              </span>
            </Link>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>
              הפלטפורמה הישראלית לשירותי שיווק ברשתות חברתיות. מחירים נמוכים, שירות מהיר, תמיכה בעברית.
            </p>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-telegram"
              style={{ padding: '10px 20px', fontSize: 14, display: 'inline-flex' }}
            >
              📱 Telegram שלנו
            </a>
          </div>

          {/* Services column */}
          <div>
            <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>שירותים</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {platforms.map(p => (
                <li key={p}>
                  <Link
                    to={`/services/${p}`}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                  >
                    <span>{platformMeta[p].emoji}</span> {platformMeta[p].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links column */}
          <div>
            <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>קישורים</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'דף הבית', href: '/' },
                { label: 'כל השירותים', href: '/services' },
                { label: 'מחירון', href: '/pricing' },
                { label: 'ביקורות', href: '/reviews' },
                { label: 'אודות', href: '/about' },
                { label: 'צור קשר', href: '/contact' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides column */}
          <div>
            <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>מדריכים</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: '📖 כל המדריכים', href: '/guides' },
                { label: '🎓 מה זה SMM?', href: '/guides/what-is-smm' },
                { label: '📸 לגדול באינסטגרם', href: '/guides/grow-instagram' },
                { label: '🎵 שיווק בטיקטוק', href: '/guides/tiktok-marketing' },
                { label: '❓ שאלות נפוצות', href: '/faq' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools column */}
          <div>
            <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>כלים</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: '🎯 קוויז פלטפורמה', href: '/quiz' },
                { label: '📦 בנה חבילה', href: '/build' },
                { label: '🎰 גלגל המזל', href: '/spin' },
                { label: '📊 סיפורי הצלחה', href: '/case-studies' },
                { label: '✅ צ\'קליסט בוסט', href: '/guides/ultimate-boost-checklist' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>צור קשר</h3>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              padding: 20,
            }}>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                יש לך שאלה? אנחנו זמינים בטלגרם ועונים תוך 30 דקות בימי חול.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span style={{ color: '#10b981', fontSize: 13, fontWeight: 600 }}>זמין עכשיו</span>
              </div>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#60a5fa', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                📱 שלח הודעה בטלגרם →
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: 24 }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>
            © {year} SocialSniper. כל הזכויות שמורות.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ color: '#475569', fontSize: 13, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#64748b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              תנאי שימוש
            </Link>
            <Link to="/privacy" style={{ color: '#475569', fontSize: 13, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#64748b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              מדיניות פרטיות
            </Link>
            <p style={{ color: '#475569', fontSize: 12, margin: 0 }}>
              SocialSniper אינה קשורה רשמית לאף פלטפורמה חברתית.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          footer > div > div:first-child { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
