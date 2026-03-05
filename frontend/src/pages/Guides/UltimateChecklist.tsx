import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

interface Step {
  id: string;
  phase: string;
  title: string;
  desc: string;
  icon: string;
  hasCTA?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
}

const steps: Step[] = [
  {
    id: '1',
    phase: 'הכנה',
    title: 'הגדר פרופיל מקצועי',
    desc: 'תמונת פרופיל איכותית, ביו ברור עם מילות מפתח, ולינק לאתר/וואטסאפ. הפרופיל הוא הדף הנחיתה שלך.',
    icon: '🖼️',
  },
  {
    id: '2',
    phase: 'הכנה',
    title: 'בחר נישה ברורה',
    desc: 'פוסטים עקביים בנישה אחת מקבלים 3× יותר חשיפה אורגנית. הגדר: מה אתה מפרסם? למי? למה?',
    icon: '🎯',
  },
  {
    id: '3',
    phase: 'הכנה',
    title: 'פרסם 3–5 פוסטים לפני הבוסט',
    desc: 'עוקבים חדשים יגיעו ויראו פרופיל ריק — זה מרתיע. צור לפחות 3 פוסטים איכותיים לפני שתתחיל.',
    icon: '📝',
  },
  {
    id: '4',
    phase: 'בוסט',
    title: 'הזמן שירות SMM מתאים',
    desc: 'בחר שירות בהתאם למטרה: עוקבים לאמינות, לייקים לאלגוריתם, צפיות לחשיפה. מומלץ להתחיל עם 500–1,000.',
    icon: '🚀',
    hasCTA: true,
    ctaLabel: '📱 הזמן שירות עכשיו',
    ctaLink: TELEGRAM_LINK,
  },
  {
    id: '5',
    phase: 'בוסט',
    title: 'הזמן בשעת שיא',
    desc: 'האלגוריתם רגיש לעוקבים חדשים שמגיעים כשהפרופיל פעיל. מומלץ: 18:00–22:00 בישראל.',
    icon: '⏰',
    hasCTA: true,
    ctaLabel: '🕐 בדוק שעות שיא',
    ctaLink: '/quiz',
  },
  {
    id: '6',
    phase: 'אחרי הבוסט',
    title: 'פרסם תוכן 24 שעות אחרי',
    desc: 'הדחיפה הגדולה ביותר באלגוריתם מגיעה כשיש activity מיד אחרי גידול בעוקבים. פרסם פוסט טוב תוך 24 שעות.',
    icon: '📣',
  },
  {
    id: '7',
    phase: 'אחרי הבוסט',
    title: 'בדוק engagement rate',
    desc: 'ER = (לייקים + תגובות) / עוקבים × 100%. ER טוב: 3%+. אם נמוך — הזמן גם לייקים/תגובות.',
    icon: '📊',
    hasCTA: true,
    ctaLabel: '💡 מחשבון ER',
    ctaLink: '/quiz',
  },
  {
    id: '8',
    phase: 'אחרי הבוסט',
    title: 'חזור על התהליך כל 2–4 שבועות',
    desc: 'בוסט חד-פעמי עוזר, אבל צמיחה עקבית = בוסטים קטנים קבועים. תקציב מינימלי: ₪100–200/חודש.',
    icon: '🔄',
    hasCTA: true,
    ctaLabel: '📦 בנה חבילה חודשית',
    ctaLink: '/build',
  },
];

const phases = ['הכנה', 'בוסט', 'אחרי הבוסט'];
const phaseColors: Record<string, string> = {
  הכנה: '#60a5fa',
  בוסט: '#a78bfa',
  'אחרי הבוסט': '#10b981',
};

const STORAGE_KEY = 'ss_checklist_progress';

const UltimateChecklist: React.FC = () => {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
  }, [checked]);

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const progress = Math.round((checked.size / steps.length) * 100);

  function reset() {
    setChecked(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      <SEOHead
        title="מדריך הבוסט האולטימטיבי — Checklist מלא | SocialSniper"
        description="8 צעדים מוכחים לבוסט מוצלח ברשתות החברתיות. צ'קליסט אינטראקטיבי עם מדריך שלב אחר שלב."
        keywords="מדריך SMM ישראל, checklist רשתות חברתיות, איך לבוסט פרופיל, עוקבים אינסטגרם מדריך"
      />
      <Header />

      <div style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 760 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
              ✅ מדריך מעשי
            </span>
            <h1 className="section-title" style={{ marginBottom: 12 }}>
              מדריך הבוסט{' '}
              <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                האולטימטיבי
              </span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: 480, margin: '0 auto 32px' }}>
              8 צעדים מוכחים לבוסט מוצלח. סמן כל שלב ועקוב אחר ההתקדמות שלך.
            </p>

            {/* Progress bar */}
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>
                  השלמת {checked.size}/{steps.length} שלבים
                </span>
                <span style={{
                  color: progress === 100 ? '#10b981' : '#a78bfa',
                  fontSize: 14,
                  fontWeight: 800,
                }}>
                  {progress}%
                </span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: progress === 100
                    ? 'linear-gradient(to left, #10b981, #06b6d4)'
                    : 'linear-gradient(to left, #7c3aed, #2563eb)',
                  width: `${progress}%`,
                  transition: 'width 0.5s ease',
                  borderRadius: 8,
                }} />
              </div>
              {progress === 100 && (
                <div style={{ marginTop: 12, color: '#10b981', fontSize: 14, fontWeight: 700 }}>
                  🎉 מדהים! השלמת את כל השלבים — זמן לבוסט!
                </div>
              )}
            </div>
          </div>

          {/* Steps by phase */}
          {phases.map(phase => {
            const phaseSteps = steps.filter(s => s.phase === phase);
            const phaseColor = phaseColors[phase];
            const allDone = phaseSteps.every(s => checked.has(s.id));

            return (
              <div key={phase} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{
                    width: 4,
                    height: 24,
                    background: phaseColor,
                    borderRadius: 2,
                  }} />
                  <h2 style={{
                    color: allDone ? phaseColor : '#94a3b8',
                    fontSize: 15,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}>
                    {phase} {allDone && '✓'}
                  </h2>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {phaseSteps.map(step => {
                    const isChecked = checked.has(step.id);
                    return (
                      <div
                        key={step.id}
                        onClick={() => toggle(step.id)}
                        style={{
                          display: 'flex',
                          gap: 16,
                          padding: '18px 20px',
                          background: isChecked ? `${phaseColor}0a` : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${isChecked ? phaseColor + '30' : 'rgba(255,255,255,0.07)'}`,
                          borderRadius: 16,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          userSelect: 'none',
                        }}
                        onMouseEnter={e => {
                          if (!isChecked) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={e => {
                          if (!isChecked) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          border: `2px solid ${isChecked ? phaseColor : 'rgba(255,255,255,0.2)'}`,
                          background: isChecked ? phaseColor : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                          transition: 'all 0.2s',
                        }}>
                          {isChecked && <span style={{ color: 'white', fontSize: 14, lineHeight: 1 }}>✓</span>}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 18 }}>{step.icon}</span>
                            <span style={{
                              color: isChecked ? '#64748b' : 'white',
                              fontSize: 14,
                              fontWeight: 700,
                              textDecoration: isChecked ? 'line-through' : 'none',
                              transition: 'all 0.2s',
                            }}>
                              {step.title}
                            </span>
                          </div>
                          <p style={{
                            color: isChecked ? '#334155' : '#94a3b8',
                            fontSize: 13,
                            lineHeight: 1.6,
                            marginBottom: step.hasCTA ? 12 : 0,
                            transition: 'color 0.2s',
                          }}>
                            {step.desc}
                          </p>
                          {step.hasCTA && step.ctaLink && (
                            step.ctaLink.startsWith('http')
                              ? <a
                                  href={step.ctaLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    background: `${phaseColor}15`,
                                    border: `1px solid ${phaseColor}30`,
                                    color: phaseColor,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: '6px 14px',
                                    borderRadius: 10,
                                    textDecoration: 'none',
                                  }}
                                >
                                  {step.ctaLabel}
                                </a>
                              : <Link
                                  to={step.ctaLink}
                                  onClick={e => e.stopPropagation()}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    background: `${phaseColor}15`,
                                    border: `1px solid ${phaseColor}30`,
                                    color: phaseColor,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: '6px 14px',
                                    borderRadius: 10,
                                    textDecoration: 'none',
                                  }}
                                >
                                  {step.ctaLabel}
                                </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Reset + share */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-telegram"
            >
              📱 הזמן שירות עכשיו
            </a>
            <button
              onClick={reset}
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                color: '#64748b',
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'Heebo, sans-serif',
              }}
            >
              🔄 אפס התקדמות
            </button>
          </div>

          {/* Related guides */}
          <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ color: '#64748b', fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              מדריכים קשורים
            </h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { label: '🤖 אלגוריתם אינסטגרם', href: '/guides/instagram-algorithm-2026' },
                { label: '🎵 שיווק בטיקטוק', href: '/guides/tiktok-marketing' },
                { label: '📋 כל המדריכים', href: '/guides' },
              ].map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20,
                    color: '#94a3b8',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UltimateChecklist;
