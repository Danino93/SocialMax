import React, { useRef, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';

const months = ['אוג', 'ספט', 'אוק', 'נוב', 'דצמ', 'ינו', 'פבר', 'מרץ'];
const sniperData = [1200, 2800, 5100, 8400, 13000, 18500, 25000, 34000];
const marketData = [800, 1500, 2400, 3600, 5100, 7000, 9200, 11800];

const data = months.map((m, i) => ({
  month: m,
  'SocialSniper': sniperData[i],
  'ממוצע שוק': marketData[i],
}));

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: 'rgba(15,15,26,0.95)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '10px 14px', fontFamily: 'Heebo, sans-serif', direction: 'rtl',
    }}>
      <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 700 }}>
          {p.name}: {p.value.toLocaleString('he-IL')} עוקבים
        </p>
      ))}
    </div>
  );
};

const GrowthChart: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" aria-label="גרף צמיחה">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge badge-purple" style={{ marginBottom: 16, display: 'inline-flex' }}>📈 נתוני צמיחה</span>
          <h2 className="section-title">
            לקוחות שלנו{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              גדלים מהר יותר
            </span>
          </h2>
          <p className="section-subtitle">השוואת צמיחת עוקבים: לקוחות SocialSniper לעומת ממוצע שוק</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, padding: '32px 24px',
        }}>
          {triggered && (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Heebo' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontFamily: 'Heebo, sans-serif', fontSize: 13, color: '#94a3b8', paddingTop: 16 }} />
                <Line
                  type="monotone" dataKey="SocialSniper" stroke="#a855f7" strokeWidth={3}
                  dot={{ fill: '#a855f7', r: 5 }} activeDot={{ r: 7 }}
                  isAnimationActive={true} animationDuration={1500}
                />
                <Line
                  type="monotone" dataKey="ממוצע שוק" stroke="#475569" strokeWidth={2}
                  strokeDasharray="5 5" dot={{ fill: '#475569', r: 4 }}
                  isAnimationActive={true} animationDuration={1500} animationBegin={300}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          <p style={{ color: '#475569', fontSize: 11, fontFamily: 'Heebo, sans-serif', textAlign: 'center', marginTop: 16 }}>
            * נתונים מייצגים ממוצע עוקבים שנצברו ללקוחות פעילים ב-2024-2025. אין ערובה לתוצאות זהות.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowthChart;
