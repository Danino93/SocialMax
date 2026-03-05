import React, { useState } from 'react';
import { Platform } from '../../../data/services';

// Peak hours data for Israeli market (0–23 = hours of day, value 0-3 = intensity)
// 0=quiet 1=low 2=medium 3=peak
const peakData: Record<string, number[]> = {
  instagram: [0,0,0,0,0,0,1,1,2,2,2,2,2,1,1,1,2,3,3,3,3,2,1,0],
  tiktok:    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,3,3,3,3,3,2,1],
  youtube:   [0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,3,3,3,3,2,2,1,0],
  facebook:  [0,0,0,0,0,0,1,2,2,2,2,2,1,1,1,1,2,2,3,3,2,2,1,0],
  telegram:  [0,0,0,0,0,0,1,2,3,3,2,2,2,1,1,1,1,2,2,2,2,2,1,0],
  twitter:   [0,0,0,0,0,0,1,1,2,3,3,2,2,1,1,1,2,3,3,3,2,2,1,0],
  spotify:   [0,0,0,0,0,0,1,2,2,2,1,1,1,1,1,1,2,2,2,3,3,3,2,1],
  whatsapp:  [0,0,0,0,0,0,1,2,3,3,3,2,2,2,2,2,2,3,3,3,3,2,2,1],
  discord:   [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,2,1],
  google:    [0,0,0,0,0,0,1,2,3,3,3,3,2,2,2,2,2,2,2,2,1,1,0,0],
};

const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

const colorMap = ['rgba(255,255,255,0.04)', 'rgba(124,58,237,0.2)', 'rgba(124,58,237,0.5)', 'rgba(124,58,237,1)'];
const labelMap = ['שקט', 'נמוך', 'בינוני', '🔥 שיא'];

interface Props {
  platform: Platform;
  color?: string;
}

const PeakHoursWidget: React.FC<Props> = ({ platform, color = '#7c3aed' }) => {
  const hours = peakData[platform] ?? peakData.instagram;
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();
  const [hovered, setHovered] = useState<number | null>(null);

  const peakHours = hours
    .map((v, i) => ({ h: i, v }))
    .filter(x => x.v === 3)
    .map(x => x.h);

  const peakStart = peakHours.length > 0 ? peakHours[0] : 18;
  const peakEnd = peakHours.length > 0 ? peakHours[peakHours.length - 1] + 1 : 22;
  const currentLevel = hours[currentHour];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 28,
      marginBottom: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>⏰</span>
            <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>מתי הזמן הטוב לבוסט?</h3>
          </div>
          <p style={{ color: '#64748b', fontSize: 12 }}>שעות שיא לשוק הישראלי — מבוסס ניתוח 2025</p>
        </div>
        {/* Current time status */}
        <div style={{
          background: currentLevel === 3 ? `${color}20` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${currentLevel === 3 ? `${color}40` : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 12,
          padding: '8px 14px',
          textAlign: 'center',
        }}>
          <div style={{ color: currentLevel === 3 ? color : '#64748b', fontSize: 11, fontWeight: 700 }}>
            {labelMap[currentLevel]}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 11 }}>עכשיו ({currentHour}:00)</div>
        </div>
      </div>

      {/* Peak recommendation */}
      <div style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 24 }}>🔥</span>
        <div>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
            הזמן הטוב ביותר: {peakStart}:00–{peakEnd}:00
          </div>
          <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
            {currentLevel === 3
              ? '✅ עכשיו הוא זמן מצוין לבוסט!'
              : `עוד ${((peakStart - currentHour + 24) % 24)} שעות עד לשעת השיא`}
          </div>
        </div>
      </div>

      {/* Hour bars */}
      <div>
        <div style={{ color: '#475569', fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
          פעילות לפי שעה — ממוצע שבועי
        </div>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 48 }}>
          {hours.map((level, h) => (
            <div
              key={h}
              onMouseEnter={() => setHovered(h)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                height: `${[8, 25, 55, 100][level]}%`,
                borderRadius: 3,
                background: h === currentHour
                  ? color
                  : level === 3 ? `${color}80`
                  : colorMap[level],
                border: h === currentHour ? `1px solid ${color}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
                transform: hovered === h ? 'scaleY(1.1)' : 'scaleY(1)',
                transformOrigin: 'bottom',
                position: 'relative',
              }}
              title={`${h}:00 — ${labelMap[level]}`}
            />
          ))}
        </div>
        {/* Hour labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {[0, 6, 12, 18, 23].map(h => (
            <span key={h} style={{ color: '#334155', fontSize: 10 }}>{h}:00</span>
          ))}
        </div>
      </div>

      {/* Day badges */}
      <div style={{ marginTop: 20 }}>
        <div style={{ color: '#475569', fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
          ימים מומלצים לבוסט
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {DAYS.map((day, i) => {
            const isToday = i === currentDay;
            const isBest = [0, 1, 4].includes(i); // Sun, Mon, Thu are peak in Israel
            return (
              <div
                key={day}
                style={{
                  padding: '4px 10px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  background: isToday ? `${color}20` : isBest ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: `1px solid ${isToday ? color : isBest ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                  color: isToday ? color : isBest ? '#94a3b8' : '#334155',
                }}
              >
                {day}
                {isBest && !isToday && ' ⭐'}
                {isToday && ' ← היום'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PeakHoursWidget;
