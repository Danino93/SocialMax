const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  username: {
    type: String,
    required: [true, 'שם משתמש הוא שדה חובה'],
    unique: true,
    trim: true,
    minlength: [3, 'שם משתמש חייב להכיל לפחות 3 תווים'],
    maxlength: [30, 'שם משתמש לא יכול להכיל יותר מ-30 תווים'],
    match: [/^[a-zA-Z0-9_]+$/, 'שם משתמש יכול להכיל רק אותיות אנגליות, מספרים וקו תחתון']
  },
  
  email: {
    type: String,
    required: [true, 'כתובת אימייל היא שדה חובה'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'כתובת אימייל לא תקינה']
  },
  
  password: {
    type: String,
    required: [true, 'סיסמה היא שדה חובה'],
    minlength: [6, 'סיסמה חייבת להכיל לפחות 6 תווים'],
    select: false // Don't include password in queries by default
  },
  
  // Personal Information
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'שם פרטי לא יכול להכיל יותר מ-50 תווים']
  },
  
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'שם משפחה לא יכול להכיל יותר מ-50 תווים']
  },
  
  phone: {
    type: String,
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'מספר טלפון לא תקין']
  },
  
  // Account Status
  role: {
    type: String,
    enum: ['user', 'admin', 'super-admin'],
    default: 'user'
  },
  
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending', 'banned'],
    default: 'active'
  },
  
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Financial Information
  balance: {
    type: Number,
    default: 0,
    min: [0, 'יתרה לא יכולה להיות שלילית']
  },
  
  totalSpent: {
    type: Number,
    default: 0,
    min: [0, 'סכום כולל שהוצא לא יכול להיות שלילי']
  },
  
  currency: {
    type: String,
    enum: ['USD', 'ILS', 'EUR'],
    default: 'ILS'
  },
  
  // Location & Preferences
  country: {
    type: String,
    default: 'IL'
  },
  
  timezone: {
    type: String,
    default: 'Asia/Jerusalem'
  },
  
  language: {
    type: String,
    enum: ['he', 'en', 'ar'],
    default: 'he'
  },
  
  // Business Information (for resellers)
  businessName: {
    type: String,
    trim: true,
    maxlength: [100, 'שם עסק לא יכול להכיל יותר מ-100 תווים']
  },
  
  businessType: {
    type: String,
    enum: ['individual', 'company', 'agency', 'reseller'],
    default: 'individual'
  },
  
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'כתובת אתר לא תקינה']
  },
  
  // Marketing & Analytics
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  totalReferrals: {
    type: Number,
    default: 0
  },
  
  // Security
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockUntil: Date,
  
  lastLogin: Date,
  
  ipAddresses: [{
    ip: String,
    timestamp: { type: Date, default: Date.now },
    userAgent: String
  }],
  
  // Verification tokens
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // API Access
  apiKey: {
    type: String,
    unique: true,
    sparse: true
  },
  
  apiCallsToday: {
    type: Number,
    default: 0
  },
  
  apiLimit: {
    type: Number,
    default: 1000
  },
  
  // Settings & Preferences
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: false
    }
  },
  
  // Social Media Accounts (for targeting)
  socialAccounts: [{
    platform: {
      type: String,
      enum: ['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp']
    },
    username: String,
    url: String,
    isMain: { type: Boolean, default: false }
  }],
  
  // Statistics
  stats: {
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 },
    lastOrderDate: Date
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'stats.totalOrders': -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.username;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it's been modified
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to generate referral code
userSchema.pre('save', function(next) {
  if (this.isNew && !this.referralCode) {
    this.referralCode = this.username + Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('שגיאה בהשוואת סיסמאות');
  }
};

// Instance method to handle failed login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock and it's expired, reset attempts
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Instance method to update balance
userSchema.methods.updateBalance = function(amount, type = 'add') {
  if (type === 'add') {
    this.balance += amount;
  } else if (type === 'subtract') {
    if (this.balance < amount) {
      throw new Error('יתרה לא מספיקה');
    }
    this.balance -= amount;
    this.totalSpent += amount;
  }
  return this.save();
};

// Static method to find by email or username
userSchema.statics.findByEmailOrUsername = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  });
};

// Static method to get user stats
userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        totalBalance: { $sum: '$balance' },
        totalSpent: { $sum: '$totalSpent' }
      }
    }
  ]);
};

module.exports = mongoose.model('User', userSchema);