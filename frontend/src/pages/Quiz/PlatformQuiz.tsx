import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import Header, { TELEGRAM_LINK } from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

interface Question {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 'business',
    question: 'מה מתאר אותך הכי טוב?',
    emoji: '💼',
    options: [
      { label: 'בעל עסק / מותג', value: 'business', emoji: '🏪' },
      { label: 'אינפלואנסר / יוצר תוכן', value: 'influencer', emoji: '🌟' },
      { label: 'אמן / מוזיקאי', value: 'artist', emoji: '🎨' },
      { label: 'פרילנסר / מקצוען', value: 'freelancer', emoji: '💻' },
    ],
  },
  {
    id: 'audience',
    question: 'מה קהל היעד שלך?',
    emoji: '🎯',
    options: [
      { label: 'גיל 13–24 (Gen Z)', value: 'genz', emoji: '📱' },
      { label: 'גיל 25–35 (Millennials)', value: 'millennials', emoji: '☕' },
      { label: 'גיל 35+ (בוגרים)', value: 'adults', emoji: '👔' },
      { label: 'מעורב / הכל', value: 'mixed', emoji: '👥' },
    ],
  },
  {
    id: 'goal',
    question: 'מה המטרה העיקרית שלך?',
    emoji: '🚀',
    options: [
      { label: 'יותר מכירות ולקוחות', value: 'sales', emoji: '💰' },
      { label: 'ביאות וגדילת קהל', value: 'growth', emoji: '📈' },
      { label: 'בניית קהילה', value: 'community', emoji: '🤝' },
      { label: 'להיות טרנד / ויראלי', value: 'viral', emoji: '🔥' },
    ],
  },
];

interface Recommendation {
  platform: string;
  emoji: string;
  path: string;
  color: string;
  reason: string;
  services: string[];
  score: number;
}

function calcRecommendations(answers: Record<string, string>): Recommendation[] {
  const recs: Record<string, number> = {
    instagram: 0, tiktok: 0, youtube: 0, facebook: 0,
    telegram: 0, twitter: 0, spotify: 0, google: 0,
  };

  const biz = answers.business;
  const aud = answers.audience;
  const goal = answers.goal;

  // Business type weights
  if (biz === 'business') { recs.facebook += 3; recs.instagram += 2; recs.google += 2; }
  if (biz === 'influencer') { recs.instagram += 3; recs.tiktok += 3; recs.youtube += 2; }
  if (biz === 'artist') { recs.spotify += 3; recs.youtube += 3; recs.tiktok += 2; }
  if (biz === 'freelancer') { recs.twitter += 2; recs.instagram += 2; recs.telegram += 1; }

  // Audience weights
  if (aud === 'genz') { recs.tiktok += 3; recs.instagram += 2; recs.discord += 1; }
  if (aud === 'millennials') { recs.instagram += 2; recs.facebook += 1; recs.twitter += 1; }
  if (aud === 'adults') { recs.facebook += 3; recs.google += 2; recs.twitter += 1; }
  if (aud === 'mixed') { recs.instagram += 1; recs.facebook += 1; recs.tiktok += 1; recs.youtube += 1; }

  // Goal weights
  if (goal === 'sales') { recs.facebook += 2; recs.instagram += 2; recs.google += 3; }
  if (goal === 'growth') { recs.instagram += 2; recs.tiktok += 3; recs.youtube += 2; }
  if (goal === 'community') { recs.telegram += 3; recs.discord += 2; recs.facebook += 1; }
  if (goal === 'viral') { recs.tiktok += 4; recs.instagram += 2; recs.youtube += 1; }

  const platformData: Record<string, { emoji: string; color: string; services: string[] }> = {
    instagram: { emoji: '📸', color: '#e1306c', services: ['עוקבים', 'לייקים', 'צפיות Stories'] },
    tiktok:    { emoji: '🎵', color: '#ff0050', services: ['עוקבים', 'צפיות', 'לייקים'] },
    youtube:   { emoji: '▶️', color: '#ff0000', services: ['מנויים', 'צפיות', 'לייקים'] },
    facebook:  { emoji: '📘', color: '#1877f2', services: ['לייקים לדף', 'עוקבים', 'תגובות'] },
    telegram:  { emoji: '✈️', color: '#2aabee', services: ['חברי קבוצה', 'צפיות', 'תגובות'] },
    twitter:   { emoji: '🐦', color: '#1da1f2', services: ['עוקבים', 'לייקים', 'ריטוויטים'] },
    spotify:   { emoji: '🎧', color: '#1db954', services: ['השמעות', 'עוקבים', 'שמירות'] },
    google:    { emoji: '🔍', color: '#4285f4', services: ['ביקורות Google', 'דירוג'] },
  };

  const reasons: Record<string, string> = {
    instagram: 'אינסטגרם היא הפלטפורמה הויזואלית הגדולה בישראל — מושלמת לבניית מותג',
    tiktok: 'טיקטוק היא מנוע הצמיחה המהיר ביותר — האלגוריתם מועדף על פרופילים צומחים',
    youtube: 'יוטיוב = פוטנציאל הכנסה פסיבית. מנויים = מוניטיזציה. שווה להשקיע',
    facebook: 'פייסבוק עדיין #1 בגיל 35+ ולעסקים עם אפשרויות Retargeting מדהימות',
    telegram: 'קהילת טלגרם = הנאמנות הגבוהה ביותר. חברים פעילים ומעורבים',
    twitter: 'X/טוויטר מצוין לבנייה מהירה של מוניטין מקצועי ונוכחות עסקית',
    spotify: 'ספוטיפיי = הפלטפורמה המוזיקלית הגדולה — כניסה לפלייליסטים = חשיפה אורגנית',
    google: 'ביקורות גוגל = אמינות עסקית. לקוחות חדשים תמיד בודקים גוגל ראשון',
  };

  const sorted = Object.entries(recs)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 3)
    .map(([p, score]) => ({
      platform: p,
      emoji: platformData[p]?.emoji ?? '🌐',
      path: `/services/${p}`,
      color: platformData[p]?.color ?? '#7c3aed',
      reason: reasons[p] ?? '',
      services: platformData[p]?.services ?? [],
      score,
    }));

  return sorted;
}

const PlatformQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [recs, setRecs] = useState<Recommendation[]>([]);

  function handleAnswer(qId: string, val: string) {
    const next = { ...answers, [qId]: val };
    setAnswers(next);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      const result = calcRecommendations(next);
      setRecs(result);
      setTimeout(() => setDone(true), 300);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
    setRecs([]);
  }

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  return (
    <>
      <SEOHead
        title="לאיזו פלטפורמה מתאים לי? | SocialSniper Quiz"
        description="ענה על 3 שאלות קצרות וגלה איזו רשת חברתית הכי מתאימה לך ולעסק שלך. קבל המלצה מותאמת אישית."
        keywords="איזו רשת חברתית מתאימה לי, פלטפורמה SMM ישראל, Instagram TikTok YouTube"
      />
      <Header />

      <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 580, width: '100%', padding: '0 20px' }}>

          {!done ? (
            <>
              {/* Progress */}
              <div style={{ marginBottom: 40, textAlign: 'center' }}>
                <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>
                  🎯 שאלה {step + 1} מתוך {questions.length}
                </span>
                <div style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginTop: 16,
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(to left, #7c3aed, #2563eb)',
                    width: `${progress}%`,
                    transition: 'width 0.4s ease',
                    borderRadius: 4,
                  }} />
                </div>
              </div>

              {/* Question */}
              <div
                key={step}
                style={{
                  animation: 'slideIn 0.3s ease',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>{q.emoji}</div>
                  <h2 style={{ color: 'white', fontSize: 26, fontWeight: 800, lineHeight: 1.3 }}>
                    {q.question}
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {q.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(q.id, opt.value)}
                      style={{
                        padding: '20px 16px',
                        background: answers[q.id] === opt.value
                          ? 'rgba(124,58,237,0.2)'
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${answers[q.id] === opt.value ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 16,
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'Heebo, sans-serif',
                        transition: 'all 0.15s',
                        textAlign: 'center',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.15)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#7c3aed';
                      }}
                      onMouseLeave={e => {
                        if (answers[q.id] !== opt.value) {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        }
                      }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.emoji}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div style={{ animation: 'fadeInUp 0.5s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
                <h2 className="section-title" style={{ marginBottom: 12 }}>
                  הפלטפורמות{' '}
                  <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    המומלצות לך
                  </span>
                </h2>
                <p className="section-subtitle">מבוסס על הנתונים שסיפקת — מותאם אישית לך</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {recs.map((r, i) => (
                  <div
                    key={r.platform}
                    className="glass-card"
                    style={{
                      padding: 24,
                      border: `1px solid ${i === 0 ? r.color + '40' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: i === 0 ? `0 8px 32px ${r.color}20` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: `${r.color}15`,
                        border: `1px solid ${r.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }}>
                        {r.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: 'white', fontSize: 16, fontWeight: 800, textTransform: 'capitalize' }}>
                            {r.platform}
                          </span>
                          {i === 0 && (
                            <span style={{
                              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                              color: 'white',
                              fontSize: 10,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 20,
                            }}>
                              🏆 #1 המלצה
                            </span>
                          )}
                        </div>
                        <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{r.reason}</div>
                      </div>
                    </div>

                    {/* Recommended services */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                      {r.services.map(svc => (
                        <span key={svc} style={{
                          background: `${r.color}12`,
                          border: `1px solid ${r.color}25`,
                          color: r.color,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                        }}>
                          {svc}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={r.path}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        color: r.color,
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      צפה בשירותי {r.platform} ←
                    </Link>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                  📱 הזמן שירות עכשיו
                </a>
                <button
                  onClick={reset}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#94a3b8',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Heebo, sans-serif',
                  }}
                >
                  🔄 עשה את הקוויז שוב
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Footer />
    </>
  );
};

export default PlatformQuiz;
