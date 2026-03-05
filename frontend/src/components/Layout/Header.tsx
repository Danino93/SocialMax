import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { platformMeta, Platform } from '../../data/services';
import { useTheme } from '../../contexts/ThemeContext';
import TrustBar from '../UI/TrustBar';

export const TELEGRAM_LINK = 'https://t.me/socialsniper93_bot';

const platforms: Platform[] = [
  'instagram', 'facebook', 'tiktok', 'youtube',
  'telegram', 'whatsapp', 'twitter', 'discord', 'spotify', 'google',
];

const guidesItems = [
  { emoji: '🎓', label: 'מה זה SMM?', href: '/guides/what-is-smm' },
  { emoji: '📸', label: 'איך לגדול באינסטגרם', href: '/guides/grow-instagram' },
  { emoji: '🎵', label: 'שיווק בטיקטוק', href: '/guides/tiktok-marketing' },
  { emoji: '🤖', label: 'אלגוריתם אינסטגרם', href: '/guides/instagram-algorithm-2026' },
  { emoji: '⚖️', label: 'האם קניית עוקבים חוקית?', href: '/guides/is-buying-followers-legal-israel' },
  { emoji: '⚡', label: 'SMM vs פרסום פייסבוק', href: '/guides/smm-vs-facebook-ads' },
  { emoji: '🚀', label: 'SMM למתחילים', href: '/guides/smm-beginners-guide' },
  { emoji: '❓', label: 'שאלות נפוצות', href: '/faq' },
  { emoji: '📖', label: 'כל המדריכים', href: '/guides' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setGuidesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'מחירון', href: '/pricing' },
    { label: 'ביקורות', href: '/reviews' },
    { label: 'אודות', href: '/about' },
    { label: 'צור קשר', href: '/contact' },
  ];

  const dropdownBtn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '8px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: 500,
    fontFamily: 'Heebo, sans-serif',
    borderRadius: 8,
    transition: 'all 0.2s',
  };

  const dropdownPanel: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    right: 0,
    background: '#13131f',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
    zIndex: 200,
  };

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}>

          {/* Logo */}
          <Link
            to="/"
            aria-label="SocialSniper - דף הבית"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
              flexShrink: 0,
            }}>
              <Zap size={20} color="white" strokeWidth={2.5} />
            </div>
            <span style={{
              fontSize: 20,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              SocialSniper
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            role="navigation"
            aria-label="תפריט ראשי"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flex: 1,
              justifyContent: 'center',
            }}
            className="hide-mobile"
          >
            {/* Services Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button style={dropdownBtn} aria-haspopup="true" aria-expanded={servicesOpen}>
                שירותים
                <ChevronDown
                  size={14}
                  style={{
                    transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {servicesOpen && (
                <div
                  style={{
                    ...dropdownPanel,
                    minWidth: 340,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 4,
                  }}
                >
                  <div style={{
                    gridColumn: '1 / -1',
                    padding: '2px 8px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: 6,
                    color: '#64748b',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}>
                    כל הפלטפורמות
                  </div>
                  {platforms.map(p => {
                    const meta = platformMeta[p];
                    return (
                      <Link
                        key={p}
                        to={`/services/${p}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 10,
                          color: '#94a3b8',
                          fontSize: 14,
                          fontWeight: 500,
                          transition: 'all 0.15s',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                          (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = 'none';
                          (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{meta.emoji}</span>
                        {meta.label}
                      </Link>
                    );
                  })}
                  <Link
                    to="/services"
                    style={{
                      gridColumn: '1 / -1',
                      marginTop: 8,
                      padding: '10px 16px',
                      background: 'rgba(124,58,237,0.12)',
                      border: '1px solid rgba(124,58,237,0.25)',
                      borderRadius: 10,
                      color: '#a78bfa',
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    צפה בכל השירותים →
                  </Link>
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setGuidesOpen(true)}
              onMouseLeave={() => setGuidesOpen(false)}
            >
              <button style={dropdownBtn} aria-haspopup="true" aria-expanded={guidesOpen}>
                מדריכים
                <ChevronDown
                  size={14}
                  style={{
                    transform: guidesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {guidesOpen && (
                <div style={{ ...dropdownPanel, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{
                    padding: '2px 8px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: 4,
                    color: '#64748b',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}>
                    מדריכים ומאמרים
                  </div>
                  {guidesItems.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 12px',
                        borderRadius: 10,
                        color: '#94a3b8',
                        fontSize: 14,
                        fontWeight: 500,
                        transition: 'all 0.15s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                        (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = 'none';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{item.emoji}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quiz link */}
            <Link
              to="/quiz"
              style={{
                padding: '8px 14px',
                color: '#94a3b8',
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 8,
                background: 'none',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#a78bfa';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(167,139,250,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLAnchorElement).style.background = 'none';
              }}
            >
              🎯 קוויז
            </Link>

            {/* Package Builder link */}
            <Link
              to="/build"
              style={{
                padding: '8px 14px',
                color: '#94a3b8',
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 8,
                background: 'none',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#10b981';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(16,185,129,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLAnchorElement).style.background = 'none';
              }}
            >
              📦 בנה חבילה
            </Link>

            {/* SpinWheel link */}
            <Link
              to="/spin"
              style={{
                padding: '8px 14px',
                color: '#94a3b8',
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 8,
                background: 'none',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#fbbf24';
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLAnchorElement).style.background = 'none';
              }}
            >
              🎰 גלגל המזל
            </Link>

            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  padding: '8px 14px',
                  color: location.pathname === link.href ? 'white' : '#94a3b8',
                  fontSize: 15,
                  fontWeight: 500,
                  borderRadius: 8,
                  background: location.pathname === link.href ? 'rgba(255,255,255,0.05)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
              style={{
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                transition: 'all 0.2s',
                color: 'white',
                fontFamily: 'Heebo, sans-serif',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>

          {/* CTA */}
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram hide-mobile"
            style={{ padding: '10px 20px', fontSize: 14, flexShrink: 0 }}
            aria-label="הזמן שירות דרך טלגרם"
          >
            📱 הזמן עכשיו
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              padding: 8,
              display: 'none',
            }}
            className="show-mobile"
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* TrustBar below header */}
      <TrustBar />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: '#0a0a0f',
            padding: '88px 20px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            overflowY: 'auto',
          }}
        >
          <Link to="/services" style={mobileLink}>📋 כל השירותים</Link>
          <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, padding: '12px 16px 4px' }}>פלטפורמות</p>
          {platforms.map(p => (
            <Link key={p} to={`/services/${p}`} style={mobileLink}>
              {platformMeta[p].emoji}&nbsp;&nbsp;{platformMeta[p].label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />
          <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, padding: '4px 16px' }}>מדריכים</p>
          {guidesItems.map(item => (
            <Link key={item.href} to={item.href} style={mobileLink}>
              {item.emoji}&nbsp;&nbsp;{item.label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />
          <Link to="/spin"  style={{ ...mobileLink, color: '#fbbf24' }}>🎰&nbsp;&nbsp;גלגל המזל</Link>
          <Link to="/quiz"  style={{ ...mobileLink, color: '#a78bfa' }}>🎯&nbsp;&nbsp;קוויז — לאיזו פלטפורמה מתאים לי?</Link>
          <Link to="/build" style={{ ...mobileLink, color: '#10b981' }}>📦&nbsp;&nbsp;בנה חבילה מותאמת</Link>
          {navLinks.map(l => <Link key={l.href} to={l.href} style={mobileLink}>{l.label}</Link>)}
          {/* Theme toggle in mobile */}
          <button
            onClick={toggleTheme}
            style={{
              ...mobileLink,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              fontFamily: 'Heebo, sans-serif',
              width: '100%',
              textAlign: 'right',
              justifyContent: 'flex-start',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}&nbsp;&nbsp;{theme === 'dark' ? 'מצב בהיר' : 'מצב כהה'}
          </button>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram"
            style={{ marginTop: 12, textAlign: 'center', justifyContent: 'center' }}
          >
            📱 הזמן עכשיו בטלגרם
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};

const mobileLink: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '13px 16px',
  color: '#94a3b8',
  fontSize: 15,
  fontWeight: 500,
  borderRadius: 10,
  background: 'rgba(255,255,255,0.03)',
  textDecoration: 'none',
  gap: 4,
};

export default Header;
