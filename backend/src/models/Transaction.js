const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Transaction Identification
  transactionId: {
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
  
  // Transaction Type
  type: {
    type: String,
    required: [true, 'סוג עסקה הוא שדה חובה'],
    enum: {
      values: ['deposit', 'withdraw', 'purchase', 'refund', 'bonus', 'penalty', 'referral_commission', 'admin_adjustment'],
      message: 'סוג עסקה לא תקין'
    }
  },
  
  // Amount Information
  amount: {
    type: Number,
    required: [true, 'סכום הוא שדה חובה'],
    min: [0, 'סכום לא יכול להיות שלילי']
  },
  
  currency: {
    type: String,
    enum: ['USD', 'ILS', 'EUR'],
    default: 'ILS'
  },
  
  // For currency conversion
  originalAmount: {
    type: Number
  },
  
  originalCurrency: {
    type: String,
    enum: ['USD', 'ILS', 'EUR']
  },
  
  exchangeRate: {
    type: Number,
    default: 1
  },
  
  // Balance Information
  balanceBefore: {
    type: Number,
    required: true
  },
  
  balanceAfter: {
    type: Number,
    required: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'reversed'],
    default: 'pending'
  },
  
  // Payment Method (for deposits/withdrawals)
  paymentMethod: {
    type: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'bit', 'bank_transfer', 'crypto', 'cash', 'admin']
    },
    provider: String, // stripe, paypal, bit, etc.
    details: {
      last4: String, // last 4 digits of card
      brand: String, // visa, mastercard, etc.
      email: String, // for paypal
      phone: String, // for bit
      bankName: String, // for bank transfer
      accountNumber: String
    }
  },
  
  // External Payment Information
  externalPayment: {
    providerId: String, // ID from payment provider
    providerTransactionId: String,
    providerStatus: String,
    providerResponse: mongoose.Schema.Types.Mixed,
    webhook: {
      received: { type: Boolean, default: false },
      data: mongoose.Schema.Types.Mixed,
      receivedAt: Date
    }
  },
  
  // Order Reference (for purchases)
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  
  // Related Transaction (for refunds, reversals)
  relatedTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  
  // Description & Notes
  description: {
    type: String,
    required: [true, 'תיאור הוא שדה חובה'],
    maxlength: [500, 'תיאור לא יכול להכיל יותר מ-500 תווים']
  },
  
  descriptionEn: {
    type: String,
    maxlength: [500, 'תיאור באנגלית לא יכול להכיל יותר מ-500 תווים']
  },
  
  adminNotes: {
    type: String,
    maxlength: [1000, 'הערות אדמין לא יכולות להכיל יותר מ-1000 תווים']
  },
  
  // Fees & Commissions
  fees: {
    processingFee: { type: Number, default: 0 },
    platformFee: { type: Number, default: 0 },
    paymentProviderFee: { type: Number, default: 0 },
    totalFees: { type: Number, default: 0 }
  },
  
  commission: {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 } // percentage
  },
  
  // Fraud Prevention
  riskAssessment: {
    score: { type: Number, min: 0, max: 100 },
    level: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'low'
    },
    factors: [String],
    reviewRequired: { type: Boolean, default: false },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    reviewNotes: String
  },
  
  // Location & Device
  metadata: {
    userIP: String,
    userAgent: String,
    device: String,
    location: {
      country: String,
      city: String,
      coordinates: [Number] // [longitude, latitude]
    },
    browserFingerprint: String
  },
  
  // Tax Information (for Israeli market)
  tax: {
    applicable: { type: Boolean, default: false },
    rate: { type: Number, default: 0 }, // percentage
    amount: { type: Number, default: 0 },
    invoiceNumber: String,
    invoiceUrl: String
  },
  
  // Processing Information
  processing: {
    attempts: { type: Number, default: 0 },
    lastAttempt: Date,
    nextAttempt: Date,
    maxAttempts: { type: Number, default: 3 },
    processor: String,
    processingTime: Number, // milliseconds
    errorLog: [String]
  },
  
  // Notifications
  notifications: {
    emailSent: { type: Boolean, default: false },
    smsSent: { type: Boolean, default: false },
    webhookSent: { type: Boolean, default: false },
    sentAt: Date
  },
  
  // Compliance & Reporting
  compliance: {
    amlCheck: { type: Boolean, default: false },
    amlResult: String,
    reportable: { type: Boolean, default: false },
    reportedAt: Date,
    reportReference: String
  },
  
  // Israeli Specific
  israeliFeatures: {
    vatIncluded: { type: Boolean, default: true },
    vatRate: { type: Number, default: 17 },
    vatAmount: { type: Number, default: 0 },
    businessNumber: String, // מספר עסק
    invoiceRequired: { type: Boolean, default: false }
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ 'externalPayment.providerId': 1 });
transactionSchema.index({ 'externalPayment.providerTransactionId': 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ order: 1 });

// Generate unique transaction ID before saving
transactionSchema.pre('save', function(next) {
  if (this.isNew && !this.transactionId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 6);
    this.transactionId = `TX${timestamp}${random}`.toUpperCase();
  }
  
  // Calculate total fees
  if (this.fees) {
    this.fees.totalFees = (this.fees.processingFee || 0) + 
                          (this.fees.platformFee || 0) + 
                          (this.fees.paymentProviderFee || 0);
  }
  
  // Calculate VAT for Israeli transactions
  if (this.israeliFeatures && this.israeliFeatures.vatIncluded && this.type === 'deposit') {
    this.israeliFeatures.vatAmount = this.amount * (this.israeliFeatures.vatRate / 100);
  }
  
  next();
});

// Virtual for net amount (after fees)
transactionSchema.virtual('netAmount').get(function() {
  return this.amount - (this.fees ? this.fees.totalFees : 0);
});

// Virtual for transaction age
transactionSchema.virtual('age').get(function() {
  return Math.round((new Date() - this.createdAt) / (1000 * 60)); // minutes
});

// Virtual for status in Hebrew
transactionSchema.virtual('statusHebrew').get(function() {
  const statusMap = {
    'pending': 'ממתין',
    'processing': 'מעובד',
    'completed': 'הושלם',
    'failed': 'נכשל',
    'cancelled': 'בוטל',
    'reversed': 'הוחזר'
  };
  return statusMap[this.status] || this.status;
});

// Virtual for type in Hebrew
transactionSchema.virtual('typeHebrew').get(function() {
  const typeMap = {
    'deposit': 'הפקדה',
    'withdraw': 'משיכה',
    'purchase': 'רכישה',
    'refund': 'החזר',
    'bonus': 'בונוס',
    'penalty': 'קנס',
    'referral_commission': 'עמלת הפניה',
    'admin_adjustment': 'התאמת אדמין'
  };
  return typeMap[this.type] || this.type;
});

// Static method to get user transactions
transactionSchema.statics.getByUser = function(userId, options = {}) {
  const {
    limit = 20,
    type = null,
    status = null,
    startDate = null,
    endDate = null
  } = options;
  
  const query = { user: userId };
  if (type) query.type = type;
  if (status) query.status = status;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = startDate;
    if (endDate) query.createdAt.$lte = endDate;
  }
  
  return this.find(query)
    .populate('order', 'orderId serviceName')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get financial summary
transactionSchema.statics.getFinancialSummary = function(userId, timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: '$type',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
      }
    }
  ]);
};

// Static method to get daily revenue
transactionSchema.statics.getDailyRevenue = function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    {
      $match: {
        type: { $in: ['purchase', 'deposit'] },
        status: 'completed',
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        revenue: { $sum: '$amount' },
        transactions: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Instance method to process transaction
transactionSchema.methods.processTransaction = async function() {
  this.processing.attempts += 1;
  this.processing.lastAttempt = new Date();
  this.status = 'processing';
  
  try {
    // Update user balance based on transaction type
    const user = await mongoose.model('User').findById(this.user);
    if (!user) {
      throw new Error('משתמש לא נמצא');
    }
    
    // Store balance before transaction
    this.balanceBefore = user.balance;
    
    switch (this.type) {
      case 'deposit':
      case 'bonus':
      case 'refund':
      case 'referral_commission':
        user.balance += this.amount;
        break;
        
      case 'purchase':
      case 'withdraw':
      case 'penalty':
        if (user.balance < this.amount) {
          throw new Error('יתרה לא מספיקה');
        }
        user.balance -= this.amount;
        if (this.type === 'purchase') {
          user.totalSpent += this.amount;
        }
        break;
        
      case 'admin_adjustment':
        user.balance = this.balanceBefore + this.amount; // amount can be negative
        break;
    }
    
    this.balanceAfter = user.balance;
    await user.save();
    
    this.status = 'completed';
    this.processing.processingTime = Date.now() - this.processing.lastAttempt.getTime();
    
  } catch (error) {
    this.status = 'failed';
    this.processing.errorLog.push(error.message);
    
    // Schedule retry if under max attempts
    if (this.processing.attempts < this.processing.maxAttempts) {
      this.processing.nextAttempt = new Date(Date.now() + (this.processing.attempts * 5 * 60 * 1000)); // exponential backoff
    }
    
    throw error;
  }
  
  return this.save();
};

// Instance method to reverse transaction
transactionSchema.methods.reverseTransaction = async function(reason = '') {
  if (this.status !== 'completed') {
    throw new Error('ניתן לבטל רק עסקאות שהושלמו');
  }
  
  // Create reverse transaction
  const reverseAmount = this.type === 'deposit' ? -this.amount : this.amount;
  const reverseType = this.type === 'deposit' ? 'withdraw' : 'deposit';
  
  const reverseTransaction = new mongoose.model('Transaction')({
    user: this.user,
    type: reverseType,
    amount: Math.abs(reverseAmount),
    currency: this.currency,
    description: `ביטול עסקה: ${this.description}`,
    descriptionEn: `Reversal of: ${this.descriptionEn}`,
    adminNotes: reason,
    relatedTransaction: this._id
  });
  
  await reverseTransaction.processTransaction();
  
  this.status = 'reversed';
  await this.save();
  
  return reverseTransaction;
};

// Instance method to calculate risk score
transactionSchema.methods.calculateRiskScore = function() {
  let score = 0;
  const factors = [];
  
  // Amount-based risk
  if (this.amount > 1000) {
    score += 20;
    factors.push('סכום גבוה');
  }
  
  // Time-based risk (transactions at unusual hours)
  const hour = new Date().getHours();
  if (hour < 6 || hour > 23) {
    score += 10;
    factors.push('שעה חריגה');
  }
  
  // Payment method risk
  if (this.paymentMethod && this.paymentMethod.type === 'crypto') {
    score += 30;
    factors.push('תשלום קריפטו');
  }
  
  // Multiple failed attempts
  if (this.processing.attempts > 1) {
    score += 15;
    factors.push('ניסיונות כושלים');
  }
  
  this.riskAssessment = {
    score: Math.min(score, 100),
    level: score < 25 ? 'low' : score < 50 ? 'medium' : score < 75 ? 'high' : 'critical',
    factors,
    reviewRequired: score >= 50
  };
  
  return this.riskAssessment;
};

module.exports = mongoose.model('Transaction', transactionSchema);