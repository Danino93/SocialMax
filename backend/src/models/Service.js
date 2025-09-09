const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'שם השירות הוא שדה חובה'],
    trim: true,
    maxlength: [100, 'שם השירות לא יכול להכיל יותר מ-100 תווים']
  },
  
  nameEn: {
    type: String,
    required: [true, 'שם השירות באנגלית הוא שדה חובה'],
    trim: true,
    maxlength: [100, 'שם השירות באנגלית לא יכול להכיל יותר מ-100 תווים']
  },
  
  description: {
    type: String,
    required: [true, 'תיאור השירות הוא שדה חובה'],
    maxlength: [500, 'תיאור השירות לא יכול להכיל יותר מ-500 תווים']
  },
  
  descriptionEn: {
    type: String,
    required: [true, 'תיאור השירות באנגלית הוא שדה חובה'],
    maxlength: [500, 'תיאור השירות באנגלית לא יכול להכיל יותר מ-500 תווים']
  },
  
  // Platform & Category
  platform: {
    type: String,
    required: [true, 'פלטפורמה היא שדה חובה'],
    enum: {
      values: ['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business'],
      message: 'פלטפורמה לא תקינה'
    }
  },
  
  category: {
    type: String,
    required: [true, 'קטגוריה היא שדה חובה'],
    enum: {
      values: ['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other'],
      message: 'קטגוריה לא תקינה'
    }
  },
  
  subCategory: {
    type: String,
    trim: true
  },
  
  // Pricing
  pricePerK: {
    type: Number,
    required: [true, 'מחיר לאלף הוא שדה חובה'],
    min: [0.001, 'מחיר חייב להיות חיובי'],
    max: [10000, 'מחיר גבוה מדי']
  },
  
  currency: {
    type: String,
    enum: ['USD', 'ILS', 'EUR'],
    default: 'ILS'
  },
  
  // Order Limits
  minOrder: {
    type: Number,
    required: [true, 'כמות הזמנה מינימלית היא שדה חובה'],
    min: [1, 'כמות מינימלית חייבת להיות לפחות 1'],
    default: 100
  },
  
  maxOrder: {
    type: Number,
    required: [true, 'כמות הזמנה מקסימלית היא שדה חובה'],
    min: [1, 'כמות מקסימלית חייבת להיות לפחות 1'],
    default: 100000
  },
  
  // Quality & Delivery
  quality: {
    type: String,
    enum: ['basic', 'standard', 'premium', 'exclusive'],
    default: 'standard'
  },
  
  dropRate: {
    type: Number,
    min: [0, 'שיעור נשירה לא יכול להיות שלילי'],
    max: [100, 'שיעור נשירה לא יכול להיות יותר מ-100%'],
    default: 0
  },
  
  refillGuarantee: {
    enabled: { type: Boolean, default: false },
    days: { type: Number, min: 0, max: 365, default: 0 }
  },
  
  startTime: {
    min: { type: Number, default: 0 }, // minutes
    max: { type: Number, default: 60 } // minutes
  },
  
  speed: {
    type: String,
    enum: ['instant', 'fast', 'medium', 'slow', 'gradual'],
    default: 'medium'
  },
  
  speedPerDay: {
    type: Number,
    min: [1, 'מהירות יומית חייבת להיות לפחות 1'],
    default: 10000
  },
  
  // Targeting Options
  targeting: {
    geographic: {
      enabled: { type: Boolean, default: false },
      countries: [String],
      cities: [String]
    },
    demographic: {
      enabled: { type: Boolean, default: false },
      ageGroups: [String],
      genders: [String],
      interests: [String]
    },
    behavioral: {
      enabled: { type: Boolean, default: false },
      activeUsers: { type: Boolean, default: false },
      realProfiles: { type: Boolean, default: false }
    }
  },
  
  // Technical Details
  requiresUsername: {
    type: Boolean,
    default: false
  },
  
  requiresUrl: {
    type: Boolean,
    default: true
  },
  
  requiresHashtags: {
    type: Boolean,
    default: false
  },
  
  requiresCustomComments: {
    type: Boolean,
    default: false
  },
  
  urlValidation: {
    pattern: String,
    example: String
  },
  
  // Provider Information
  provider: {
    name: { type: String, required: true },
    serviceId: { type: String, required: true },
    apiEndpoint: String,
    markup: { type: Number, default: 100 }, // percentage markup
    isActive: { type: Boolean, default: true }
  },
  
  // Status & Availability
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'out_of_stock'],
    default: 'active'
  },
  
  availability: {
    days: {
      type: [String],
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      default: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    hours: {
      start: { type: String, default: '00:00' },
      end: { type: String, default: '23:59' }
    },
    timezone: { type: String, default: 'Asia/Jerusalem' }
  },
  
  // Statistics
  stats: {
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    successRate: { type: Number, default: 100 },
    averageStartTime: { type: Number, default: 0 }, // minutes
    lastOrderDate: Date,
    revenue: { type: Number, default: 0 }
  },
  
  // Features & Specifications
  features: [{
    name: String,
    nameEn: String,
    description: String,
    descriptionEn: String,
    isHighlight: { type: Boolean, default: false }
  }],
  
  // Requirements & Restrictions
  requirements: {
    accountType: {
      type: String,
      enum: ['any', 'public', 'business', 'verified'],
      default: 'any'
    },
    minFollowers: { type: Number, default: 0 },
    maxFollowers: { type: Number, default: 0 },
    contentType: [String],
    languages: [String]
  },
  
  restrictions: {
    adultContent: { type: Boolean, default: false },
    politicalContent: { type: Boolean, default: false },
    violentContent: { type: Boolean, default: false },
    keywords: [String]
  },
  
  // Special Features for Israeli Market
  israeliFeatures: {
    hebrewSupport: { type: Boolean, default: true },
    localTargeting: {
      enabled: { type: Boolean, default: false },
      cities: {
        type: [String],
        enum: ['tel-aviv', 'jerusalem', 'haifa', 'rishon-lezion', 'petah-tikva', 'ashdod', 'netanya', 'beer-sheva', 'holon', 'bnei-brak']
      }
    },
    kosherCompliant: { type: Boolean, default: false },
    shabbatAware: { type: Boolean, default: true }
  },
  
  // Automation Settings
  automation: {
    autoStart: { type: Boolean, default: true },
    autoRefill: { type: Boolean, default: false },
    smartDelivery: { type: Boolean, default: false },
    antiDetection: { type: Boolean, default: true }
  },
  
  // Custom Fields for specific platforms
  customFields: {
    telegram: {
      memberType: String, // 'regular', 'premium'
      chatType: String // 'group', 'channel'
    },
    whatsapp: {
      messageType: String, // 'text', 'media', 'status'
      schedulingEnabled: Boolean
    },
    youtube: {
      watchTime: Number, // percentage
      retention: Number, // percentage
      monetizable: Boolean
    }
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
serviceSchema.index({ platform: 1, category: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ pricePerK: 1 });
serviceSchema.index({ quality: 1 });
serviceSchema.index({ 'stats.successRate': -1 });
serviceSchema.index({ 'stats.totalOrders': -1 });
serviceSchema.index({ createdAt: -1 });
serviceSchema.index({ 'provider.name': 1 });

// Virtual for price calculation
serviceSchema.virtual('priceFor').get(function() {
  return (quantity) => {
    return (quantity / 1000) * this.pricePerK;
  };
});

// Virtual for success rate percentage
serviceSchema.virtual('successRatePercent').get(function() {
  return `${this.stats.successRate.toFixed(1)}%`;
});

// Virtual for drop rate percentage  
serviceSchema.virtual('dropRatePercent').get(function() {
  return `${this.dropRate.toFixed(1)}%`;
});

// Virtual for platform display name
serviceSchema.virtual('platformDisplay').get(function() {
  const platformNames = {
    'instagram': 'אינסטגרם',
    'facebook': 'פייסבוק',
    'tiktok': 'טיקטוק',
    'youtube': 'יוטיוב',
    'telegram': 'טלגרם',
    'whatsapp': 'וואטסאפ',
    'twitter': 'טוויטר',
    'linkedin': 'לינקדאין',
    'spotify': 'ספוטיפיי',
    'soundcloud': 'סאונדקלאוד',
    'discord': 'דיסקורד',
    'google-business': 'גוגל ביזנס'
  };
  return platformNames[this.platform] || this.platform;
});

// Pre-save middleware to validate order limits
serviceSchema.pre('save', function(next) {
  if (this.minOrder > this.maxOrder) {
    next(new Error('כמות מינימלית לא יכולה להיות גדולה מהכמות המקסימלית'));
  }
  next();
});

// Static method to get services by platform
serviceSchema.statics.getByPlatform = function(platform, status = 'active') {
  return this.find({ platform, status }).sort({ 'stats.successRate': -1 });
};

// Static method to get popular services
serviceSchema.statics.getPopular = function(limit = 10) {
  return this.find({ status: 'active' })
    .sort({ 'stats.totalOrders': -1 })
    .limit(limit);
};

// Static method to search services
serviceSchema.statics.searchServices = function(query, filters = {}) {
  const searchQuery = {
    status: 'active',
    $or: [
      { name: new RegExp(query, 'i') },
      { nameEn: new RegExp(query, 'i') },
      { description: new RegExp(query, 'i') },
      { descriptionEn: new RegExp(query, 'i') }
    ]
  };
  
  // Apply filters
  if (filters.platform) searchQuery.platform = filters.platform;
  if (filters.category) searchQuery.category = filters.category;
  if (filters.quality) searchQuery.quality = filters.quality;
  if (filters.maxPrice) searchQuery.pricePerK = { $lte: filters.maxPrice };
  if (filters.minPrice) searchQuery.pricePerK = { ...searchQuery.pricePerK, $gte: filters.minPrice };
  
  return this.find(searchQuery).sort({ 'stats.successRate': -1 });
};

// Instance method to calculate price for quantity
serviceSchema.methods.calculatePrice = function(quantity) {
  if (quantity < this.minOrder || quantity > this.maxOrder) {
    throw new Error(`כמות חייבת להיות בין ${this.minOrder} ל-${this.maxOrder}`);
  }
  return (quantity / 1000) * this.pricePerK;
};

// Instance method to update statistics
serviceSchema.methods.updateStats = function(orderData) {
  this.stats.totalOrders += 1;
  if (orderData.status === 'completed') {
    this.stats.completedOrders += 1;
    this.stats.successRate = (this.stats.completedOrders / this.stats.totalOrders) * 100;
    this.stats.revenue += orderData.price;
  }
  this.stats.lastOrderDate = new Date();
  return this.save();
};

// Instance method to check availability
serviceSchema.methods.isAvailable = function(timezone = 'Asia/Jerusalem') {
  if (this.status !== 'active') return false;
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    timeZone: timezone 
  }).toLowerCase();
  
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Check if current day is in available days
  if (!this.availability.days.includes(currentDay)) return false;
  
  // Check if current time is in available hours
  if (currentTime < this.availability.hours.start || currentTime > this.availability.hours.end) {
    return false;
  }
  
  return true;
};

module.exports = mongoose.model('Service', serviceSchema);