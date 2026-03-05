import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const orders = [
  { name: 'אבי כהן', city: 'תל אביב', service: '500 עוקבים לאינסטגרם', mins: 3, color: '#e1306c', initials: 'א' },
  { name: 'שרה לוי', city: 'חיפה', service: '1,000 לייקים לפייסבוק', mins: 7, color: '#1877f2', initials: 'ש' },
  { name: 'יוסי מזרחי', city: 'ירושלים', service: '200 מנויים ליוטיוב', mins: 12, color: '#ff0000', initials: 'י' },
  { name: 'רחל ברק', city: 'ראשל"צ', service: '2,000 צפיות לטיקטוק', mins: 5, color: '#ff0050', initials: 'ר' },
  { name: 'נועם אדרי', city: "פ\"ת", service: '100 חברים לטלגרם', mins: 18, color: '#2aabee', initials: 'נ' },
  { name: 'תמר גולן', city: 'נתניה', service: '500 עוקבים לטיקטוק', mins: 2, color: '#ff0050', initials: 'ת' },
  { name: 'דוד שפירא', city: 'באר שבע', service: '50 ביקורות גוגל', mins: 25, color: '#4285f4', initials: 'ד' },
  { name: 'מיכל אברהם', city: 'אשדוד', service: '1,000 עוקבים לאינסטגרם', mins: 8, color: '#e1306c', initials: 'מ' },
  { name: 'עידו פרץ', city: 'רמת גן', service: '5,000 השמעות לספוטיפיי', mins: 33, color: '#1db954', initials: 'ע' },
  { name: 'הילה כץ', city: 'הרצליה', service: '300 לייקים לאינסטגרם', mins: 4, color: '#e1306c', initials: 'ה' },
  { name: 'אמיר ניר', city: 'גבעתיים', service: '1,000 מנויים ליוטיוב', mins: 41, color: '#ff0000', initials: 'א' },
  { name: 'לימור שם טוב', city: 'חולון', service: '2,000 עוקבים לאינסטגרם', mins: 6, color: '#e1306c', initials: 'ל' },
  { name: 'רן ביטון', city: 'עפולה', service: '500 חברים לדיסקורד', mins: 15, color: '#5865f2', initials: 'ר' },
  { name: 'גלית רוזן', city: "כפ\"ס", service: '300 עוקבים לטוויטר', mins: 22, color: '#1da1f2', initials: 'ג' },
  { name: 'איתי מור', city: 'מודיעין', service: '100 חברים לוואטסאפ', mins: 9, color: '#25d366', initials: 'א' },
];

const OrderToast: React.FC = () => {
  const [current, setCurrent] = useState<typeof orders[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const show = () => {
      setCurrent(orders[indexRef.current % orders.length]);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          indexRef.current++;
          show();
        }, 8000);
      }, 4500);
    };
    const initial = setTimeout(show, 5000);
    return () => clearTimeout(initial);
  }, []);

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          key={indexRef.current}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9000,
            background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
            padding: '14px 18px', maxWidth: 300, width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', gap: 12, direction: 'rtl',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${current.color}40, ${current.color}20)`,
            border: `2px solid ${current.color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: current.color, fontSize: 18, fontWeight: 700,
          }}>
            {current.initials}
          </div>
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: '#fff', fontSize: 13, fontWeight: 700,
              fontFamily: 'Heebo, sans-serif', marginBottom: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              👤 {current.name} מ{current.city}
            </div>
            <div style={{
              color: '#94a3b8', fontSize: 12, fontFamily: 'Heebo, sans-serif', marginBottom: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {current.service}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ color: '#64748b', fontSize: 11, fontFamily: 'Heebo, sans-serif' }}>
                לפני {current.mins} דקות
              </span>
            </div>
          </div>
          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#64748b', fontSize: 14, padding: 4, flexShrink: 0,
              alignSelf: 'flex-start',
            }}
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderToast;
