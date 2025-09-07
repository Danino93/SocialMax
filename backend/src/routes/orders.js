const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const router = express.Router();

// Import controllers and middleware
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  requestRefill,
  getOrderStats,
  getOrderHistory
} = require('../controllers/ordersController');

const { 
  authenticateToken, 
  requireSufficientBalance 
} = require('../middleware/auth');

// Validation middleware
const validateCreateOrder = [
  body('serviceId')
    .isMongoId()
    .withMessage('מזהה שירות לא תקין'),
  
  body('targetUrl')
    .isURL()
    .withMessage('כתובת URL לא תקינה')
    .isLength({ max: 500 })
    .withMessage('כתובת URL ארוכה מדי'),
  
  body('quantity')
    .isInt({ min: 1, max: 10000000 })
    .withMessage('כמות חייבת להיות מספר שלם בין 1 ל-10,000,000'),
  
  body('customComments')
    .optional()
    .isArray({ max: 10 })
    .withMessage('ניתן להוסיף עד 10 תגובות מותאמות'),
  
  body('customComments.*')
    .optional()
    .isLength({ max: 200 })
    .withMessage('תגובה לא יכולה להכיל יותר מ-200 תווים'),
  
  body('hashtags')
    .optional()
    .isArray({ max: 20 })
    .withMessage('ניתן להוסיף עד 20 hashtags'),
  
  body('hashtags.*')
    .optional()
    .matches(/^#[a-zA-Z0-9_\u0590-\u05FF]+$/)
    .withMessage('hashtag לא תקין'),
  
  body('mentions')
    .optional()
    .isArray({ max: 10 })
    .withMessage('ניתן להוסיף עד 10 mentions'),
  
  body('mentions.*')
    .optional()
    .matches(/^@[a-zA-Z0-9_.]+$/)
    .withMessage('mention לא תקין'),
  
  body('deliveryOptions.speed')
    .optional()
    .isIn(['instant', 'fast', 'medium', 'slow', 'gradual'])
    .withMessage('מהירות אספקה לא תקינה'),
  
  body('deliveryOptions.drip.enabled')
    .optional()
    .isBoolean()
    .withMessage('הגדרת drip חייבת להיות true או false'),
  
  body('deliveryOptions.drip.interval')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('מרווח drip חייב להיות בין 1 ל-1440 דקות'),
  
  body('deliveryOptions.drip.batchSize')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('גודל batch חייב להיות בין 1 ל-10,000')
];

const validateGetOrders = [
  query('status')
    .optional()
    .isIn(['pending', 'processing', 'in_progress', 'completed', 'partial', 'cancelled', 'refunded', 'failed'])
    .withMessage('סטטוס לא תקין'),
  
  query('platform')
    .optional()
    .isIn(['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business'])
    .withMessage('פלטפורמה לא תקינה'),
  
  query('category')
    .optional()
    .isIn(['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other'])
    .withMessage('קטגוריה לא תקינה'),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('תאריך התחלה לא תקין'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('תאריך סיום לא תקין'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('מספר עמוד חייב להיות מספר חיובי'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('מגבלת תוצאות חייבת להיות בין 1 ל-100'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'finalPrice', 'quantity', 'status', 'completionPercentage'])
    .withMessage('שדה מיון לא תקין'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('כיוון מיון לא תקין')
];

const validateOrderId = [
  param('id')
    .isMongoId()
    .withMessage('מזהה הזמנה לא תקין')
];

const validateCancelOrder = [
  body('reason')
    .optional()
    .isLength({ max: 200 })
    .withMessage('סיבת ביטול לא יכולה להכיל יותר מ-200 תווים')
    .trim()
];

const validateRequestRefill = [
  body('quantity')
    .isInt({ min: 1, max: 1000000 })
    .withMessage('כמות מילוי חוזר חייבת להיות מספר שלם בין 1 ל-1,000,000'),
  
  body('reason')
    .optional()
    .isLength({ max: 300 })
    .withMessage('סיבת בקשת מילוי חוזר לא יכולה להכיל יותר מ-300 תווים')
    .trim()
];

const validateOrderStats = [
  query('timeframe')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('מסגרת זמן חייבת להיות בין 1 ל-365 ימים')
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

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/',
  authenticateToken,
  validateCreateOrder,
  handleValidationErrors,
  createOrder
);

// @route   GET /api/orders
// @desc    Get user orders with filtering and pagination
// @access  Private
router.get('/',
  authenticateToken,
  validateGetOrders,
  handleValidationErrors,
  getUserOrders
);

// @route   GET /api/orders/stats
// @desc    Get user order statistics
// @access  Private
router.get('/stats',
  authenticateToken,
  validateOrderStats,
  handleValidationErrors,
  getOrderStats
);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id',
  authenticateToken,
  validateOrderId,
  handleValidationErrors,
  getOrderById
);

// @route   GET /api/orders/:id/history
// @desc    Get order history with detailed tracking
// @access  Private
router.get('/:id/history',
  authenticateToken,
  validateOrderId,
  handleValidationErrors,
  getOrderHistory
);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel',
  authenticateToken,
  validateOrderId,
  validateCancelOrder,
  handleValidationErrors,
  cancelOrder
);

// @route   POST /api/orders/:id/refill
// @desc    Request refill for order
// @access  Private
router.post('/:id/refill',
  authenticateToken,
  validateOrderId,
  validateRequestRefill,
  handleValidationErrors,
  requestRefill
);

// @route   GET /api/orders/:id/status
// @desc    Get order status with real-time updates
// @access  Private
router.get('/:id/status',
  authenticateToken,
  validateOrderId,
  handleValidationErrors,
  async (req, res) => {
    try {
      const Order = require('../models/Order');
      
      const order = await Order.findOne({ 
        _id: req.params.id, 
        user: req.user._id 
      }).select('orderId status delivered quantity remains completionPercentage actualStartTime actualCompletionTime');

      if (!order) {
        return res.status(404).json({
          error: 'הזמנה לא נמצאה',
          message: 'ההזמנה המבוקשת לא קיימת'
        });
      }

      // Calculate estimated completion time
      let estimatedCompletion = null;
      if (order.actualStartTime && order.status === 'in_progress') {
        const elapsedMinutes = (new Date() - order.actualStartTime) / (1000 * 60);
        const progressRate = order.delivered / elapsedMinutes; // delivered per minute
        const remainingMinutes = order.remains / progressRate;
        estimatedCompletion = new Date(Date.now() + remainingMinutes * 60 * 1000);
      }

      res.json({
        success: true,
        data: {
          orderId: order.orderId,
          status: order.status,
          statusHebrew: order.statusHebrew,
          delivered: order.delivered,
          quantity: order.quantity,
          remains: order.remains,
          completionPercentage: order.completionPercentage,
          actualStartTime: order.actualStartTime,
          actualCompletionTime: order.actualCompletionTime,
          estimatedCompletion,
          needsAttention: order.needsAttention()
        }
      });

    } catch (error) {
      console.error('Get order status error:', error);
      res.status(500).json({
        error: 'שגיאת שרת',
        message: 'שגיאה בטעינת סטטוס ההזמנה'
      });
    }
  }
);

// @route   POST /api/orders/bulk-cancel
// @desc    Cancel multiple orders
// @access  Private
router.post('/bulk-cancel',
  authenticateToken,
  body('orderIds')
    .isArray({ min: 1, max: 50 })
    .withMessage('ניתן לבטל בין 1 ל-50 הזמנות בו זמנית'),
  body('orderIds.*')
    .isMongoId()
    .withMessage('מזהה הזמנה לא תקין'),
  body('reason')
    .optional()
    .isLength({ max: 200 })
    .withMessage('סיבת ביטול לא יכולה להכיל יותר מ-200 תווים'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { orderIds, reason } = req.body;
      const Order = require('../models/Order');
      
      // Find orders that belong to user and can be cancelled
      const orders = await Order.find({
        _id: { $in: orderIds },
        user: req.user._id
      });

      const results = {
        cancelled: [],
        failed: [],
        refunded: 0
      };

      for (const order of orders) {
        try {
          if (order.canBeCancelled()) {
            await order.updateStatus('cancelled', reason || 'ביטול מרוכז', req.user._id);
            
            // Calculate and process refund
            const refundAmount = order.calculateRefund();
            if (refundAmount > 0) {
              const Transaction = require('../models/Transaction');
              const refundTransaction = new Transaction({
                user: req.user._id,
                type: 'refund',
                amount: refundAmount,
                currency: order.currency,
                description: `החזר עבור הזמנה מבוטלת: ${order.orderId}`,
                order: order._id
              });
              await refundTransaction.processTransaction();
              results.refunded += refundAmount;
            }
            
            results.cancelled.push({
              orderId: order.orderId,
              refundAmount
            });
          } else {
            results.failed.push({
              orderId: order.orderId,
              reason: 'לא ניתן לבטל הזמנה זו במצבה הנוכחי'
            });
          }
        } catch (error) {
          results.failed.push({
            orderId: order.orderId,
            reason: error.message
          });
        }
      }

      res.json({
        success: true,
        message: `בוטלו ${results.cancelled.length} הזמנות מתוך ${orderIds.length}`,
        data: results
      });

    } catch (error) {
      console.error('Bulk cancel orders error:', error);
      res.status(500).json({
        error: 'שגיאת שרת',
        message: 'שגיאה בביטול ההזמנות'
      });
    }
  }
);

module.exports = router;