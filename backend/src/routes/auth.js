const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Import controllers and middleware
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  generateApiKey,
  logout
} = require('../controllers/authController');

const { authenticateToken } = require('../middleware/auth');

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'יותר מדי ניסיונות התחברות',
    message: 'נסה שוב בעוד 15 דקות',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: {
    error: 'יותר מדי בקשות לאיפוס סיסמה',
    message: 'נסה שוב בעוד שעה',
    retryAfter: 60 * 60
  }
});

// Validation middleware
const validateRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('שם משתמש חייב להכיל בין 3 ל-30 תווים')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('שם משתמש יכול להכיל רק אותיות אנגליות, מספרים וקו תחתון')
    .toLowerCase(),
  
  body('email')
    .isEmail()
    .withMessage('כתובת אימייל לא תקינה')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('סיסמה חייבת להכיל לפחות 6 תווים')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('סיסמה חייבת להכיל לפחות אות קטנה, אות גדולה ומספר'),
  
  body('firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('שם פרטי לא יכול להכיל יותר מ-50 תווים')
    .trim(),
  
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('שם משפחה לא יכול להכיל יותר מ-50 תווים')
    .trim(),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('מספר טלפון לא תקין'),
  
  body('referralCode')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('קוד הפניה לא תקין')
];

const validateLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('אימייל או שם משתמש הם שדה חובה')
    .trim(),
  
  body('password')
    .notEmpty()
    .withMessage('סיסמה היא שדה חובה')
];

const validateProfileUpdate = [
  body('firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('שם פרטי לא יכול להכיל יותר מ-50 תווים')
    .trim(),
  
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('שם משפחה לא יכול להכיל יותר מ-50 תווים')
    .trim(),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('מספר טלפון לא תקין'),
  
  body('businessName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('שם עסק לא יכול להכיל יותר מ-100 תווים')
    .trim(),
  
  body('businessType')
    .optional()
    .isIn(['individual', 'company', 'agency', 'reseller'])
    .withMessage('סוג עסק לא תקין'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('כתובת אתר לא תקינה')
];

const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('סיסמה נוכחית היא שדה חובה'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('סיסמה חדשה חייבת להכיל לפחות 6 תווים')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('סיסמה חדשה חייבת להכיל לפחות אות קטנה, אות גדולה ומספר')
];

const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('כתובת אימייל לא תקינה')
    .normalizeEmail()
];

const validateResetPassword = [
  body('token')
    .notEmpty()
    .withMessage('טוקן איפוס סיסמה הוא שדה חובה'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('סיסמה חדשה חייבת להכיל לפחות 6 תווים')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('סיסמה חדשה חייבת להכיל לפחות אות קטנה, אות גדולה ומספר')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({
      error: 'שגיאת ולידציה',
      message: errorMessages[0],
      details: errorMessages
    });
  }
  next();
};

// Routes

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', 
  authLimiter,
  validateRegistration,
  handleValidationErrors,
  register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login',
  authLimiter,
  validateLogin,
  handleValidationErrors,
  login
);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile',
  authenticateToken,
  getProfile
);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile',
  authenticateToken,
  validateProfileUpdate,
  handleValidationErrors,
  updateProfile
);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password',
  authenticateToken,
  validatePasswordChange,
  handleValidationErrors,
  changePassword
);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password',
  passwordResetLimiter,
  validateForgotPassword,
  handleValidationErrors,
  forgotPassword
);

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password',
  passwordResetLimiter,
  validateResetPassword,
  handleValidationErrors,
  resetPassword
);

// @route   POST /api/auth/generate-api-key
// @desc    Generate new API key for user
// @access  Private
router.post('/generate-api-key',
  authenticateToken,
  generateApiKey
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout',
  authenticateToken,
  logout
);

// @route   GET /api/auth/verify-token
// @desc    Verify if token is valid
// @access  Private
router.get('/verify-token',
  authenticateToken,
  (req, res) => {
    res.json({
      success: true,
      message: 'טוקן תקין',
      data: {
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
          status: req.user.status
        }
      }
    });
  }
);

// @route   GET /api/auth/user-stats
// @desc    Get user statistics
// @access  Private
router.get('/user-stats',
  authenticateToken,
  async (req, res) => {
    try {
      const User = require('../models/User');
      const Order = require('../models/Order');
      const Transaction = require('../models/Transaction');

      // Get user's order statistics
      const orderStats = await Order.aggregate([
        { $match: { user: req.user._id } },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            completedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
            },
            totalSpent: { $sum: '$finalPrice' },
            averageOrderValue: { $avg: '$finalPrice' }
          }
        }
      ]);

      // Get user's transaction statistics
      const transactionStats = await Transaction.aggregate([
        { 
          $match: { 
            user: req.user._id,
            status: 'completed'
          } 
        },
        {
          $group: {
            _id: '$type',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          orders: orderStats[0] || {
            totalOrders: 0,
            completedOrders: 0,
            totalSpent: 0,
            averageOrderValue: 0
          },
          transactions: transactionStats,
          balance: req.user.balance,
          memberSince: req.user.createdAt,
          lastLogin: req.user.lastLogin
        }
      });

    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({
        error: 'שגיאת שרת',
        message: 'שגיאה בטעינת סטטיסטיקות המשתמש'
      });
    }
  }
);

module.exports = router;