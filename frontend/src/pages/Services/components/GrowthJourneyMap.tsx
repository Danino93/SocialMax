import React, { useState } from 'react';

interface Milestone {
  count: string;
  label: string;
  insight: string;
  icon: string;
  color: string;
}

const MILESTONES: Milestone[] = [
  {
    count: '0',
    label: 'התחלה',
    insight: 'פרופיל חדש — האלגוריתם עדיין לא מכיר אותך',
    icon: '🌱',
    color: '#475569',
  },
  {
    count: '100',
    label: 'צעדים ראשונים',
    insight: 'הפרופיל מתחיל להיראות אמיתי. חברים ומשפחה מתחילים לעקוב',
    icon: '👣',
    color: '#60a5fa',
  },
  {
    count: '500',
    label: 'Social Proof',
    insight: 'אנשים מתחילים לסמוך. פוסטים מקבלים יותר נראות אורגנית',
    icon: '✅',
    color: '#818cf8',
  },
  {
    count: '1K',
    label: '🚀 נקודת האצה',
    insight: 'האלגוריתם מתחיל לדחוף אותך! YouTube: Monetization. Instagram: swipe-up',
    icon: '🚀',
    color: '#a78bfa',
  },
  {
    count: '5K',
    label: 'מאמץ אמין',
    insight: 'ברג הפנייה לעסקאות. מותגים מתחילים לשים לב. ערך כינוי גדל פי 5',
    icon: '💼',
    color: '#c084fc',
  },
  {
    count: '10K',
    label: '⭐ Influencer Threshold',
    insight: 'Instagram Verification זמין. Collab בתשלום מתחיל. אמינות מקסימלית',
    icon: '⭐',
    color: '#f59e0b',
  },
  {
    count: '50K+',
    label: 'מאקרו אינפלואנסר',
    insight: 'מותגים גדולים. פרסומות. הכנסה פסיבית משמעותית. חלום של כל יוצר',
    icon: '👑',
    color: '#ef4444',
  },
];

interface Props {
  currentFollowers?: number;
  color?: string;
}

const GrowthJourneyMap: React.FC<Props> = ({ currentFollowers = 0, color = '#7c3aed' }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  function parseCount(c: string) {
    if (c.endsWith('K+')) return parseInt(c) * 1000;
    if (c.endsWith('K')) return parseInt(c) * 1000;
    return parseInt(c) || 0;
  }

  const currentIdx = MILESTONES.reduce((acc, m, i) => {
    return currentFollowers >= parseCount(m.count) ? i : acc;
  }, 0);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 28,
      marginBottom: 24,
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 20 }}>🗺️</span>
          <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>מסלול הצמיחה שלך</h3>
        </div>
        <p style={{ color: '#64748b', fontSize: 12 }}>הנקודות הקריטיות בדרך לפרופיל ויראלי</p>
      </div>

      {/* Journey path */}
      <div style={{ position: 'relative', paddingBottom: 16 }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: 24,
          right: 24,
          left: 24,
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          zIndex: 0,
        }} />
        {/* Progress line */}
        <div style={{
          position: 'absolute',
          top: 24,
          right: 24,
          height: 2,
          background: `linear-gradient(to left, ${color}, #2563eb)`,
          width: `${(currentIdx / (MILESTONES.length - 1)) * (100 - (48 / 400) * 100)}%`,
          zIndex: 1,
          transition: 'width 1s ease',
        }} />

        {/* Milestones */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MILESTONES.length}, 1fr)`,
          position: 'relative',
          zIndex: 2,
        }}>
          {MILESTONES.map((m, i) => {
            const isReached = i <= currentIdx;
            const isCurrent = i === currentIdx;
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={i}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Node */}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: isReached
                    ? `linear-gradient(135deg, ${m.color}, ${color})`
                    : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${isReached ? m.color : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: isCurrent ? `0 0 20px ${m.color}60` : isReached ? `0 4px 12px ${m.color}30` : 'none',
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}>
                  {isReached ? m.icon : '🔒'}
                  {isCurrent && (
                    <div style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: `2px solid ${m.color}`,
                      animation: 'pulseRing 2s ease infinite',
                    }} />
                  )}
                </div>

                {/* Count label */}
                <div style={{
                  color: isReached ? m.color : '#334155',
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: 'center',
                }}>
                  {m.count}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hovered tooltip */}
        {hoveredIdx !== null && (
          <div style={{
            marginTop: 20,
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${MILESTONES[hoveredIdx].color}35`,
            borderRadius: 14,
            padding: '14px 18px',
            textAlign: 'center',
            transition: 'all 0.2s',
          }}>
            <div style={{ color: MILESTONES[hoveredIdx].color, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
              {MILESTONES[hoveredIdx].icon} {MILESTONES[hoveredIdx].label} — {MILESTONES[hoveredIdx].count} עוקבים
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>
              {MILESTONES[hoveredIdx].insight}
            </div>
          </div>
        )}
      </div>

      {/* Next milestone CTA */}
      {currentIdx < MILESTONES.length - 1 && (
        <div style={{
          marginTop: 16,
          background: `${color}10`,
          border: `1px solid ${color}25`,
          borderRadius: 12,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🎯</span>
          <div>
            <div style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
              המטרה הבאה: {MILESTONES[currentIdx + 1].count} עוקבים
            </div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
              {MILESTONES[currentIdx + 1].insight}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulseRing {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default GrowthJourneyMap;
