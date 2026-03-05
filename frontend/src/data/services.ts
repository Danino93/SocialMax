export type Platform =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'telegram'
  | 'whatsapp'
  | 'twitter'
  | 'discord'
  | 'spotify'
  | 'google';

export type Category =
  | 'followers'
  | 'likes'
  | 'views'
  | 'comments'
  | 'members'
  | 'subscribers'
  | 'reactions'
  | 'plays'
  | 'reviews'
  | 'other';

export type Badge = 'popular' | 'non-drop' | 'refill' | 'fast' | 'premium';

export interface Service {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  category: Category;
  pricePerK: number;
  minOrder: number;
  maxOrder: number;
  startTime: string;
  badges: Badge[];
}

// =========================================================
// מחירים: עלות SMMProMax (USD) × 2.5 markup × 3.7 ₪/$
// =========================================================

export const services: Service[] = [

  // ─── INSTAGRAM ───────────────────────────────────────────
  {
    id: 'ig-followers-basic',
    name: 'עוקבים לאינסטגרם - בסיסי',
    description: 'עוקבים איכותיים לפרופיל האינסטגרם שלך. מסירה מהירה.',
    platform: 'instagram',
    category: 'followers',
    pricePerK: 1.90,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '1-6 שעות',
    badges: ['fast', 'popular'],
  },
  {
    id: 'ig-followers-refill',
    name: 'עוקבים לאינסטגרם + Refill 30 יום',
    description: 'עוקבים עם ערבות Refill למשך 30 יום. אם יורדים - מחזירים.',
    platform: 'instagram',
    category: 'followers',
    pricePerK: 7.40,
    minOrder: 50,
    maxOrder: 500000,
    startTime: '1-12 שעות',
    badges: ['refill', 'popular'],
  },
  {
    id: 'ig-followers-nondrop',
    name: 'עוקבים לאינסטגרם - Non-Drop',
    description: 'עוקבים אורגניים שאינם נופלים. הכי יציב בשוק.',
    platform: 'instagram',
    category: 'followers',
    pricePerK: 9.90,
    minOrder: 50,
    maxOrder: 50000,
    startTime: '6-24 שעות',
    badges: ['non-drop', 'premium'],
  },
  {
    id: 'ig-likes',
    name: 'לייקים לפוסטים - אינסטגרם',
    description: 'לייקים אמיתיים לכל פוסט או תמונה באינסטגרם.',
    platform: 'instagram',
    category: 'likes',
    pricePerK: 1.10,
    minOrder: 50,
    maxOrder: 500000,
    startTime: '1-3 שעות',
    badges: ['fast', 'popular'],
  },
  {
    id: 'ig-views-reels',
    name: 'צפיות ריילס ופוסטים - אינסטגרם',
    description: 'הגדל את מספר הצפיות בריילס ובפוסטי וידאו שלך.',
    platform: 'instagram',
    category: 'views',
    pricePerK: 0.02,
    minOrder: 1000,
    maxOrder: 50000000,
    startTime: '30 דקות',
    badges: ['fast'],
  },
  {
    id: 'ig-story-views',
    name: 'צפיות סטוריז - אינסטגרם',
    description: 'הגדל את מספר הצופים בסטוריז שלך.',
    platform: 'instagram',
    category: 'views',
    pricePerK: 0.07,
    minOrder: 100,
    maxOrder: 10000000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },

  // ─── FACEBOOK ────────────────────────────────────────────
  {
    id: 'fb-followers',
    name: 'עוקבים לדף פייסבוק',
    description: 'הגדל את מספר העוקבים לדף העסקי שלך.',
    platform: 'facebook',
    category: 'followers',
    pricePerK: 2.00,
    minOrder: 100,
    maxOrder: 500000,
    startTime: '6-24 שעות',
    badges: ['popular'],
  },
  {
    id: 'fb-page-likes',
    name: 'לייקים לדף פייסבוק',
    description: 'לייקים אמיתיים לדף העסקי שלך בפייסבוק.',
    platform: 'facebook',
    category: 'likes',
    pricePerK: 0.90,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '6-48 שעות',
    badges: ['popular'],
  },
  {
    id: 'fb-post-likes',
    name: 'לייקים לפוסטים - פייסבוק',
    description: 'לייקים לפוסטים ספציפיים בדף הפייסבוק שלך.',
    platform: 'facebook',
    category: 'likes',
    pricePerK: 0.90,
    minOrder: 50,
    maxOrder: 100000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },
  {
    id: 'fb-video-views',
    name: 'צפיות וידאו - פייסבוק',
    description: 'הגדל את מספר הצפיות בסרטוני הפייסבוק שלך.',
    platform: 'facebook',
    category: 'views',
    pricePerK: 0.75,
    minOrder: 500,
    maxOrder: 1000000,
    startTime: '30 דקות',
    badges: ['fast'],
  },

  // ─── TIKTOK ──────────────────────────────────────────────
  {
    id: 'tt-followers',
    name: 'עוקבים לטיקטוק',
    description: 'עוקבים איכותיים לפרופיל הטיקטוק שלך.',
    platform: 'tiktok',
    category: 'followers',
    pricePerK: 0.90,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '6-24 שעות',
    badges: ['popular'],
  },
  {
    id: 'tt-likes',
    name: 'לייקים לסרטוני טיקטוק',
    description: 'לייקים אמיתיים לסרטונים שלך בטיקטוק.',
    platform: 'tiktok',
    category: 'likes',
    pricePerK: 1.10,
    minOrder: 100,
    maxOrder: 500000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },
  {
    id: 'tt-views',
    name: 'צפיות לטיקטוק',
    description: 'מיליוני צפיות לסרטוני הטיקטוק שלך.',
    platform: 'tiktok',
    category: 'views',
    pricePerK: 0.003,
    minOrder: 5000,
    maxOrder: 10000000,
    startTime: '30 דקות',
    badges: ['fast', 'popular'],
  },
  {
    id: 'tt-comments',
    name: 'תגובות לטיקטוק',
    description: 'תגובות מגוונות לסרטוני הטיקטוק שלך.',
    platform: 'tiktok',
    category: 'comments',
    pricePerK: 18.00,
    minOrder: 10,
    maxOrder: 5000,
    startTime: '6-24 שעות',
    badges: [],
  },

  // ─── YOUTUBE ─────────────────────────────────────────────
  {
    id: 'yt-subscribers',
    name: 'מנויים לערוץ יוטיוב',
    description: 'הגדל את מספר המנויים לערוץ היוטיוב שלך.',
    platform: 'youtube',
    category: 'subscribers',
    pricePerK: 1.30,
    minOrder: 50,
    maxOrder: 50000,
    startTime: '6-48 שעות',
    badges: ['popular'],
  },
  {
    id: 'yt-views',
    name: 'צפיות לסרטוני יוטיוב',
    description: 'מיליוני צפיות איכותיות לסרטוני היוטיוב שלך.',
    platform: 'youtube',
    category: 'views',
    pricePerK: 4.40,
    minOrder: 500,
    maxOrder: 100000000,
    startTime: '1-6 שעות',
    badges: ['popular'],
  },
  {
    id: 'yt-likes',
    name: 'לייקים לסרטוני יוטיוב',
    description: 'לייקים אמיתיים לשיפור הדירוג ביוטיוב.',
    platform: 'youtube',
    category: 'likes',
    pricePerK: 0.78,
    minOrder: 50,
    maxOrder: 500000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },
  {
    id: 'yt-watch-hours',
    name: 'שעות צפייה - יוטיוב',
    description: 'הגדל שעות צפייה לעמוד בדרישות המוניטיזציה של יוטיוב.',
    platform: 'youtube',
    category: 'views',
    pricePerK: 170.00,
    minOrder: 100,
    maxOrder: 50000,
    startTime: '3-14 ימים',
    badges: ['premium'],
  },

  // ─── TELEGRAM ────────────────────────────────────────────
  {
    id: 'tg-members',
    name: 'מנויים לערוץ / קבוצה - טלגרם',
    description: 'חברים אמיתיים לערוץ או קבוצת הטלגרם שלך. Non-Drop.',
    platform: 'telegram',
    category: 'members',
    pricePerK: 4.50,
    minOrder: 50,
    maxOrder: 200000,
    startTime: '1-24 שעות',
    badges: ['non-drop', 'popular'],
  },
  {
    id: 'tg-post-views',
    name: 'צפיות לפוסטים - טלגרם',
    description: 'מיליוני צפיות לפוסטים בערוץ הטלגרם שלך.',
    platform: 'telegram',
    category: 'views',
    pricePerK: 0.08,
    minOrder: 100,
    maxOrder: 10000000,
    startTime: '30 דקות',
    badges: ['fast'],
  },
  {
    id: 'tg-reactions',
    name: 'ריאקשנים לפוסטים - טלגרם',
    description: 'ריאקשנים מגוונים (❤️ 👍 🔥) לפוסטים בטלגרם.',
    platform: 'telegram',
    category: 'reactions',
    pricePerK: 0.75,
    minOrder: 20,
    maxOrder: 100000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },
  {
    id: 'tg-story-views',
    name: 'צפיות סטוריז - טלגרם',
    description: 'הגדל את מספר הצופים בסטוריז שלך בטלגרם.',
    platform: 'telegram',
    category: 'views',
    pricePerK: 0.90,
    minOrder: 100,
    maxOrder: 5000000,
    startTime: '1-6 שעות',
    badges: [],
  },

  // ─── TWITTER / X ─────────────────────────────────────────
  {
    id: 'tw-followers',
    name: 'עוקבים לחשבון X (טוויטר)',
    description: 'הגדל את מספר העוקבים שלך ב-X (טוויטר).',
    platform: 'twitter',
    category: 'followers',
    pricePerK: 48.00,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '24-72 שעות',
    badges: [],
  },
  {
    id: 'tw-likes',
    name: 'לייקים לציוצים - X',
    description: 'לייקים לציוצים ותגובות שלך ב-X.',
    platform: 'twitter',
    category: 'likes',
    pricePerK: 5.50,
    minOrder: 100,
    maxOrder: 500000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },
  {
    id: 'tw-views',
    name: 'צפיות לציוצים - X',
    description: 'מיליוני צפיות לציוצים שלך ב-X.',
    platform: 'twitter',
    category: 'views',
    pricePerK: 1.10,
    minOrder: 500,
    maxOrder: 100000000,
    startTime: '1-3 שעות',
    badges: ['fast'],
  },

  // ─── WHATSAPP ────────────────────────────────────────────
  {
    id: 'wa-group-members',
    name: 'חברים לקבוצת WhatsApp',
    description: 'הוסף חברים אמיתיים לקבוצת ה-WhatsApp שלך.',
    platform: 'whatsapp',
    category: 'members',
    pricePerK: 12.00,
    minOrder: 50,
    maxOrder: 50000,
    startTime: '6-24 שעות',
    badges: [],
  },
  {
    id: 'wa-status-views',
    name: 'צפיות סטטוס - WhatsApp',
    description: 'הגדל את מספר הצופים בסטטוסים שלך ב-WhatsApp.',
    platform: 'whatsapp',
    category: 'views',
    pricePerK: 3.00,
    minOrder: 100,
    maxOrder: 10000000,
    startTime: '1-6 שעות',
    badges: ['fast'],
  },

  // ─── DISCORD ─────────────────────────────────────────────
  {
    id: 'dc-server-members',
    name: 'חברים לשרת Discord',
    description: 'הגדל את מספר החברים בשרת ה-Discord שלך.',
    platform: 'discord',
    category: 'members',
    pricePerK: 7.00,
    minOrder: 100,
    maxOrder: 50000,
    startTime: '6-24 שעות',
    badges: [],
  },
  {
    id: 'dc-online-members',
    name: 'חברים Online - Discord',
    description: 'הגדל את מספר החברים Online בשרת שלך.',
    platform: 'discord',
    category: 'members',
    pricePerK: 18.00,
    minOrder: 50,
    maxOrder: 10000,
    startTime: '1-6 שעות',
    badges: ['premium'],
  },

  // ─── SPOTIFY ─────────────────────────────────────────────
  {
    id: 'sp-plays',
    name: 'נגינות לשירים - Spotify',
    description: 'הגדל את מספר ההשמעות של השירים שלך ב-Spotify.',
    platform: 'spotify',
    category: 'plays',
    pricePerK: 3.70,
    minOrder: 1000,
    maxOrder: 10000000,
    startTime: '1-24 שעות',
    badges: ['popular'],
  },
  {
    id: 'sp-followers',
    name: 'עוקבים לאמן - Spotify',
    description: 'הגדל את מספר העוקבים לפרופיל האמן שלך.',
    platform: 'spotify',
    category: 'followers',
    pricePerK: 9.25,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '6-48 שעות',
    badges: [],
  },
  {
    id: 'sp-monthly-listeners',
    name: 'מאזינים חודשיים - Spotify',
    description: 'הגדל את מספר המאזינים החודשיים לפרופיל שלך.',
    platform: 'spotify',
    category: 'plays',
    pricePerK: 8.00,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '6-72 שעות',
    badges: [],
  },

  // ─── GOOGLE BUSINESS ─────────────────────────────────────
  {
    id: 'gb-reviews',
    name: 'ביקורות 5 כוכבים - Google Business',
    description: 'הוסף ביקורות חיוביות לפרופיל העסק שלך בגוגל.',
    platform: 'google',
    category: 'reviews',
    pricePerK: 950.00,
    minOrder: 1,
    maxOrder: 100,
    startTime: '1-3 ימים',
    badges: ['premium'],
  },
  {
    id: 'gb-map-views',
    name: 'צפיות במפות - Google Maps',
    description: 'הגדל את הנוכחות שלך במפות גוגל.',
    platform: 'google',
    category: 'views',
    pricePerK: 5.50,
    minOrder: 100,
    maxOrder: 100000,
    startTime: '1-7 ימים',
    badges: [],
  },
];

// ─── Helper Functions ────────────────────────────────────────
export const getServicesByPlatform = (platform: Platform) =>
  services.filter(s => s.platform === platform);

export const getServiceById = (id: string) =>
  services.find(s => s.id === id);

export const calculatePrice = (service: Service, quantity: number): number => {
  const price = (quantity / 1000) * service.pricePerK;
  return Math.max(price, 0.01);
};

export const formatPrice = (price: number): string => {
  if (price < 1) return `${(price * 100).toFixed(0)} אג'`;
  return `₪${price.toFixed(2)}`;
};

// ─── Platform Metadata ──────────────────────────────────────
export const platformMeta: Record<Platform, {
  label: string;
  emoji: string;
  color: string;
  gradient: string;
  startingPrice: number;
}> = {
  instagram: {
    label: 'Instagram',
    emoji: '📸',
    color: '#e1306c',
    gradient: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    startingPrice: 0.02,
  },
  facebook: {
    label: 'Facebook',
    emoji: '👥',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #0d5ecc)',
    startingPrice: 0.75,
  },
  tiktok: {
    label: 'TikTok',
    emoji: '🎵',
    color: '#ff0050',
    gradient: 'linear-gradient(135deg, #010101, #ff0050)',
    startingPrice: 0.003,
  },
  youtube: {
    label: 'YouTube',
    emoji: '▶️',
    color: '#ff0000',
    gradient: 'linear-gradient(135deg, #ff0000, #cc0000)',
    startingPrice: 0.78,
  },
  telegram: {
    label: 'Telegram',
    emoji: '✈️',
    color: '#229ed9',
    gradient: 'linear-gradient(135deg, #229ed9, #1a7fc7)',
    startingPrice: 0.08,
  },
  whatsapp: {
    label: 'WhatsApp',
    emoji: '💬',
    color: '#25d366',
    gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
    startingPrice: 3.00,
  },
  twitter: {
    label: 'X (Twitter)',
    emoji: '🐦',
    color: '#1da1f2',
    gradient: 'linear-gradient(135deg, #1da1f2, #0d8bd0)',
    startingPrice: 1.10,
  },
  discord: {
    label: 'Discord',
    emoji: '🎮',
    color: '#5865f2',
    gradient: 'linear-gradient(135deg, #5865f2, #4752c4)',
    startingPrice: 7.00,
  },
  spotify: {
    label: 'Spotify',
    emoji: '🎶',
    color: '#1db954',
    gradient: 'linear-gradient(135deg, #1db954, #158a3e)',
    startingPrice: 3.70,
  },
  google: {
    label: 'Google Business',
    emoji: '📍',
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
    startingPrice: 5.50,
  },
};
