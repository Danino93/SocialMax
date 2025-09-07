const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Identification
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  
  // User Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'משתמש הוא שדה חובה']
  },
  
  // Service Information
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'שירות הוא שדה חובה']
  },
  
  serviceName: {
    type: String,
    required: true
  },
  
  platform: {
    type: String,
    required: true,
    enum: ['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business']
  },
  
  category: {
    type: String,
    required: true,
    enum: ['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other']
  },
  
  // Order Details
  targetUrl: {
    type: String,
    required: [true, 'קישור יעד הוא שדה חובה'],
    trim: true
  },
  
  targetUsername: {
    type: String,
    trim: true
  },
  
  quantity: {
    type: Number,
    required: [true, 'כמות היא שדה חובה'],
    min: [1, 'כמות חייבת להיות לפחות 1']
  },
  
  delivered: {
    type: Number,
    default: 0,
    min: [0, 'כמות שנמסרה לא יכולה להיות שלילית']
  },
  
  remains: {
    type: Number,
    default: 0,
    min: [0, 'כמות שנותרה לא יכולה להיות שלילית']
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'מחיר הוא שדה חובה'],
    min: [0, 'מחיר לא יכול להיות שלילי']
  },
  
  currency: {
    type: String,
    enum: ['USD', 'ILS', 'EUR'],
    default: 'ILS'
  },
  
  discount: {
    type: Number,
    default: 0,
    min: [0, 'הנחה לא יכולה להיות שלילית'],
    max: [100, 'הנחה לא יכולה להיות יותר מ-100%']
  },
  
  finalPrice: {
    type: Number,
    required: true
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'processing', 'in_progress', 'completed', 'partial', 'cancelled', 'refunded', 'failed'],
    default: 'pending'
  },
  
  providerStatus: {
    type: String,
    default: 'pending'
  },
  
  providerOrderId: {
    type: String,
    sparse: true
  },
  
  // Timing
  estimatedStartTime: {
    type: Number, // minutes
    default: 60
  },
  
  estimatedCompletionTime: {
    type: Number, // hours
    default: 24
  },
  
  actualStartTime: Date,
  actualCompletionTime: Date,
  
  // Provider Information
  provider: {
    name: { type: String, required: true },
    serviceId: { type: String, required: true },
    cost: { type: Number, required: true }, // our cost from provider
    markup: { type: Number, default: 100 } // percentage markup
  },
  
  // Custom Requirements
  customComments: [{
    text: String,
    language: { type: String, enum: ['he', 'en', 'ar'], default: 'he' }
  }],
  
  hashtags: [String],
  
  mentions: [String],
  
  // Delivery Options
  deliveryOptions: {
    speed: {
      type: String,
      enum: ['instant', 'fast', 'medium', 'slow', 'gradual'],
      default: 'medium'
    },
    drip: {
      enabled: { type: Boolean, default: false },
      interval: { type: Number, default: 60 }, // minutes
      batchSize: { type: Number, default: 100 }
    },
    schedule: {
      enabled: { type: Boolean, default: false },
      startDate: Date,
      endDate: Date
    }
  },
  
  // Quality Assurance
  qualityCheck: {
    performed: { type: Boolean, default: false },
    result: String,
    notes: String,
    performedAt: Date,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  
  // Refill & Guarantee
  refill: {
    guaranteed: { type: Boolean, default: false },
    guaranteeDays: { type: Number, default: 0 },
    requests: [{
      requestedAt: { type: Date, default: Date.now },
      quantity: Number,
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
      },
      processedAt: Date,
      notes: String
    }]
  },
  
  // Analytics & Tracking
  analytics: {
    conversionRate: Number,
    engagementRate: Number,
    retentionRate: Number,
    sourceAnalysis: {
      organic: Number,
      promoted: Number,
      bot: Number
    }
  },
  
  // Notes & Communication
  notes: {
    user: String,
    admin: String,
    provider: String,
    system: [String]
  },
  
  // Error Handling
  errors: [{
    code: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
  }],
  
  // Audit Trail
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    automatic: { type: Boolean, default: false }
  }],
  
  // Israeli Specific Features
  israeliFeatures: {
    shabbatCompliant: { type: Boolean, default: true },
    localContent: { type: Boolean, default: false },
    hebrewComments: { type: Boolean, default: false },
    targetIsraeli: { type: Boolean, default: false }
  },
  
  // IP and Device Tracking
  metadata: {
    userIP: String,
    userAgent: String,
    device: String,
    location: {
      country: String,
      city: String,
      coordinates: [Number] // [longitude, latitude]
    }
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ platform: 1, category: 1 });
orderSchema.index({ providerOrderId: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'provider.name': 1 });

// Generate unique order ID before saving
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.orderId = `SM${timestamp}${random}`.toUpperCase();
  }
  
  // Calculate remains
  this.remains = this.quantity - this.delivered;
  
  // Calculate final price with discount
  if (this.discount > 0) {
    this.finalPrice = this.price * (1 - this.discount / 100);
  } else {
    this.finalPrice = this.price;
  }
  
  next();
});

// Pre-save middleware to add status history
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      automatic: true
    });
  }
  next();
});

// Virtual for completion percentage
orderSchema.virtual('completionPercentage').get(function() {
  if (this.quantity === 0) return 0;
  return Math.round((this.delivered / this.quantity) * 100);
});

// Virtual for order duration
orderSchema.virtual('duration').get(function() {
  if (!this.actualStartTime) return null;
  const end = this.actualCompletionTime || new Date();
  return Math.round((end - this.actualStartTime) / (1000 * 60 * 60)); // hours
});

// Virtual for order age
orderSchema.virtual('age').get(function() {
  return Math.round((new Date() - this.createdAt) / (1000 * 60 * 60)); // hours
});

// Virtual for profit margin
orderSchema.virtual('profit').get(function() {
  return this.finalPrice - this.provider.cost;
});

// Virtual for status in Hebrew
orderSchema.virtual('statusHebrew').get(function() {
  const statusMap = {
    'pending': 'ממתין',
    'processing': 'מעובד',
    'in_progress': 'בביצוע',
    'completed': 'הושלם',
    'partial': 'חלקי',
    'cancelled': 'בוטל',
    'refunded': 'הוחזר',
    'failed': 'נכשל'
  };
  return statusMap[this.status] || this.status;
});

// Static method to get orders by user
orderSchema.statics.getByUser = function(userId, limit = 10) {
  return this.find({ user: userId })
    .populate('service', 'name platform category')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get orders statistics
orderSchema.statics.getStats = function(timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$finalPrice' },
        averageOrderValue: { $avg: '$finalPrice' },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Static method to get platform statistics
orderSchema.statics.getPlatformStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$platform',
        count: { $sum: 1 },
        revenue: { $sum: '$finalPrice' },
        avgOrderValue: { $avg: '$finalPrice' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

// Instance method to update status with history
orderSchema.methods.updateStatus = function(newStatus, reason = '', changedBy = null) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    changedBy,
    reason,
    automatic: false
  });
  
  // Set timing based on status
  if (newStatus === 'processing' && !this.actualStartTime) {
    this.actualStartTime = new Date();
  }
  
  if (['completed', 'cancelled', 'failed'].includes(newStatus) && !this.actualCompletionTime) {
    this.actualCompletionTime = new Date();
  }
  
  return this.save();
};

// Instance method to request refill
orderSchema.methods.requestRefill = function(quantity, reason = '') {
  if (!this.refill.guaranteed) {
    throw new Error('לא זמין מילוי חוזר לשירות זה');
  }
  
  const guaranteeExpired = new Date() > new Date(this.createdAt.getTime() + (this.refill.guaranteeDays * 24 * 60 * 60 * 1000));
  if (guaranteeExpired) {
    throw new Error('תקופת הערבות למילוי חוזר פגה');
  }
  
  this.refill.requests.push({
    quantity,
    notes: reason
  });
  
  return this.save();
};

// Instance method to calculate refund amount
orderSchema.methods.calculateRefund = function() {
  const deliveredPercentage = this.delivered / this.quantity;
  return this.finalPrice * (1 - deliveredPercentage);
};

// Instance method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  return ['pending', 'processing'].includes(this.status);
};

// Instance method to check if order needs attention
orderSchema.methods.needsAttention = function() {
  const ageHours = this.age;
  
  // Order is old and not completed
  if (ageHours > 48 && !['completed', 'cancelled', 'refunded'].includes(this.status)) {
    return true;
  }
  
  // Order has errors
  if (this.errors.length > 0 && this.errors.some(error => !error.resolved)) {
    return true;
  }
  
  // Order is stuck in processing
  if (this.status === 'processing' && ageHours > 6) {
    return true;
  }
  
  return false;
};

module.exports = mongoose.model('Order', orderSchema);