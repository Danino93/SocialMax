import React, { useEffect, useRef, useState } from 'react';
import { TELEGRAM_LINK } from '../Layout/Header';

const conversation = [
  { id: 1, side: 'contact', name: 'יוסי 🤙', text: 'אחי שמעת על SocialSniper?', time: '18:42' },
  { id: 2, side: 'me', text: 'לא, מה זה?', time: '18:43' },
  { id: 3, side: 'contact', text: 'שירות SMM ישראלי — קניתי 1,000 עוקבים ב-₪90 🔥', time: '18:43' },
  { id: 4, side: 'contact', text: 'הגיעו תוך שעה! הפרופיל שלי טס קדימה 🚀', time: '18:44' },
  { id: 5, side: 'me', text: 'רציני?? לא ידעתי שזה עובד כל כך מהר', time: '18:44' },
  { id: 6, side: 'contact', text: 'גם תוצאות יש! +400 צפיות בפוסט הבא, עוד לייקים, הכל ✅', time: '18:45' },
  { id: 7, side: 'me', text: 'שלח לי לינק!', time: '18:45' },
  { id: 8, side: 'contact', text: 'socialsniper.co.il — יש ביקורות 4.9/5 ⭐ שווה לנסות', time: '18:46' },
];

const WhatsAppMockup: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          conversation.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCount(i + 1);
            }, i * 500);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        background: 'radial-gradient(ellipse, rgba(37,211,102,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56 }}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-flex', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366' }}>
            💬 מה חברים אומרים
          </span>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            ישראלים ממליצים{' '}
            <span style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              לישראלים
            </span>
          </h2>
          <p className="section-subtitle">
            כשחבר שלך ממליץ — אתה יודע שזה אמיתי
          </p>
        </div>

        {/* Phone Mockup */}
        <div style={{
          position: 'relative',
          maxWidth: 380,
          width: '100%',
        }}>
          {/* Phone frame */}
          <div style={{
            background: '#1a1a2e',
            borderRadius: 40,
            border: '2px solid rgba(255,255,255,0.12)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            overflow: 'hidden',
            fontFamily: '-apple-system, "Segoe UI", sans-serif',
          }}>
            {/* Status bar */}
            <div style={{
              background: '#075e54',
              padding: '10px 20px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  🤙
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>יוסי 🤙</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>מחובר</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, color: 'rgba(255,255,255,0.8)', fontSize: 18 }}>
                📹 📞
              </div>
            </div>

            {/* Chat body */}
            <div style={{
              background: '#0d0d0d',
              backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(7,94,84,0.05) 0%, transparent 50%)',
              padding: '12px 12px 16px',
              minHeight: 420,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              {/* Date separator */}
              <div style={{ textAlign: 'center', margin: '4px 0 8px' }}>
                <span style={{ background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: 8, color: '#8a9bb0', fontSize: 11 }}>
                  היום
                </span>
              </div>

              {conversation.map((msg, i) => {
                const isVisible = i < visibleCount;
                const isMe = msg.side === 'me';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: isMe ? 'flex-start' : 'flex-end',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    <div style={{
                      maxWidth: '80%',
                      background: isMe ? '#202c33' : '#005c4b',
                      borderRadius: isMe ? '12px 12px 12px 2px' : '12px 12px 2px 12px',
                      padding: '7px 10px 4px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}>
                      <div style={{ color: '#e9edef', fontSize: 13, lineHeight: 1.5, direction: 'rtl' }}>
                        {msg.text}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginTop: 2, alignItems: 'center' }}>
                        <span style={{ color: '#8a9bb0', fontSize: 10 }}>{msg.time}</span>
                        {!isMe && <span style={{ color: '#53bdeb', fontSize: 12 }}>✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {visibleCount >= conversation.length && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0, animation: 'fadeIn 0.4s ease 0.5s forwards' }}>
                  <div style={{ background: '#005c4b', borderRadius: '12px 12px 2px 12px', padding: '8px 12px', display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: '50%', background: '#8a9bb0',
                        animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div style={{
              background: '#1f2c34',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ flex: 1, background: '#2a3942', borderRadius: 20, padding: '8px 14px', color: '#8a9bb0', fontSize: 13 }}>
                הקלד הודעה...
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                🎤
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div style={{
            position: 'absolute',
            top: -16,
            left: -20,
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            borderRadius: 16,
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            color: 'white',
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>
            💬 847 המלצות בשבוע האחרון
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>
            גם אתה רוצה שחברים ימליצו עליך? תתחיל היום
          </p>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-telegram">
            📱 הזמן עכשיו בטלגרם
          </a>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .badge-green {
          background: rgba(37,211,102,0.12) !important;
          border: 1px solid rgba(37,211,102,0.3) !important;
          color: #25d366 !important;
        }
      `}</style>
    </section>
  );
};

export default WhatsAppMockup;
