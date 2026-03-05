import React, { useEffect, useRef, useState } from 'react';

interface Particle { id: number; x: number; y: number; size: number; color: string; ox: number; oy: number; }

const COLORS = ['#a855f7', '#7c3aed', '#60a5fa', '#f9a8d4'];

const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouch, setIsTouch] = useState(true);
  const lastFire = useRef(0);
  const counter = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    setIsTouch(false);

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastFire.current < 50) return;
      lastFire.current = now;
      const batch: Particle[] = Array.from({ length: 8 }, () => {
        counter.current++;
        return {
          id: counter.current,
          x: e.clientX, y: e.clientY,
          size: 5 + Math.random() * 5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          ox: (Math.random() - 0.5) * 24,
          oy: (Math.random() - 0.5) * 24,
        };
      });
      setParticles(prev => [...prev, ...batch]);
      setTimeout(() => {
        const ids = new Set(batch.map(p => p.id));
        setParticles(prev => prev.filter(p => !ids.has(p.id)));
      }, 650);
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        @keyframes sparkle { 0% { opacity:0.85; transform:translateY(0) scale(1); } 100% { opacity:0; transform:translateY(-18px) scale(0.2); } }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }} aria-hidden="true">
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: p.x + p.ox - p.size / 2,
            top: p.y + p.oy - p.size / 2,
            width: p.size, height: p.size,
            borderRadius: '50%', background: p.color,
            animation: 'sparkle 0.65s ease-out forwards',
            boxShadow: `0 0 6px ${p.color}`,
          }} />
        ))}
      </div>
    </>
  );
};

export default CursorTrail;
