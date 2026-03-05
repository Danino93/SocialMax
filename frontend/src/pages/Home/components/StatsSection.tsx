import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'פלטפורמות נתמכות', icon: '🌐' },
  { value: 50, suffix: '+', label: 'שירותים זמינים', icon: '⚡' },
  { value: 1000, suffix: '+', label: 'לקוחות מרוצים', icon: '😊' },
  { value: 30, suffix: ' דק׳', label: 'זמן מענה ממוצע', icon: '💬' },
];

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, trigger]);
  return count;
}

const StatCard: React.FC<{ stat: Stat; trigger: boolean }> = ({ stat, trigger }) => {
  const count = useCountUp(stat.value, 1600, trigger);
  return (
    <div
      className="glass-card"
      style={{
        padding: '32px 24px',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(124,58,237,0.2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{stat.icon}</div>
      <div style={{
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #a855f7, #60a5fa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {count.toLocaleString('he-IL')}{stat.suffix}
      </div>
      <div style={{ color: '#94a3b8', fontSize: 15, fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-sm" aria-label="סטטיסטיקות">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} trigger={triggered} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="סטטיסטיקות"] .container > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section[aria-label="סטטיסטיקות"] .container > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
