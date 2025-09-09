const express = require('express');
const { body, query, param, validationResult } = require('express-validator');
const router = express.Router();

// Import controllers and middleware
const {
  getServices,
  getServiceById,
  getServicesByPlatform,
  getPopularServices,
  getCategories,
  getPlatforms,
  calculatePrice,
  searchServices,
  getRecommendations,
  checkAvailability
} = require('../controllers/servicesController');

const { optionalAuth, authenticateToken } = require('../middleware/auth');

// Validation middleware
const validateGetServices = [
  query('platform')
    .optional()
    .isIn(['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business'])
    .withMessage('פלטפורמה לא תקינה'),
  
  query('category')
    .optional()
    .isIn(['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other'])
    .withMessage('קטגוריה לא תקינה'),
  
  query('quality')
    .optional()
    .isIn(['basic', 'standard', 'premium', 'exclusive'])
    .withMessage('רמת איכות לא תקינה'),
  
  query('status')
    .optional()
    .isIn(['active', 'inactive', 'maintenance', 'out_of_stock'])
    .withMessage('סטטוס לא תקין'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('מחיר מינימלי חייב להיות מספר חיובי'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('מחיר מקסימלי חייב להיות מספר חיובי'),
  
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
    .isIn(['pricePerK', 'stats.successRate', 'stats.totalOrders', 'createdAt', 'name'])
    .withMessage('שדה מיון לא תקין'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('כיוון מיון לא תקין')
];

const validatePlatform = [
  param('platform')
    .isIn(['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business'])
    .withMessage('פלטפורמה לא תקינה')
];

const validateServiceId = [
  param('id')
    .isMongoId()
    .withMessage('מזהה שירות לא תקין')
];

const validateCalculatePrice = [
  body('serviceId')
    .isMongoId()
    .withMessage('מזהה שירות לא תקין'),
  
  body('quantity')
    .isInt({ min: 1, max: 10000000 })
    .withMessage('כמות חייבת להיות מספר שלם בין 1 ל-10,000,000')
];

const validateSearch = [
  query('q')
    .isLength({ min: 2, max: 100 })
    .withMessage('שאילתת חיפוש חייבת להכיל בין 2 ל-100 תווים')
    .trim(),
  
  query('platform')
    .optional()
    .isIn(['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business'])
    .withMessage('פלטפורמה לא תקינה'),
  
  query('category')
    .optional()
    .isIn(['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other'])
    .withMessage('קטגוריה לא תקינה'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('מגבלת תוצאות חייבת להיות בין 1 ל-50')
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

// @route   GET /api/services
// @desc    Get all services with filtering and pagination
// @access  Public
router.get('/',
  optionalAuth,
  validateGetServices,
  handleValidationErrors,
  getServices
);

// @route   GET /api/services/popular
// @desc    Get popular services
// @access  Public
router.get('/popular',
  optionalAuth,
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('מגבלה חייבת להיות בין 1 ל-50'),
  handleValidationErrors,
  getPopularServices
);

// @route   GET /api/services/categories
// @desc    Get service categories
// @access  Public
router.get('/categories',
  optionalAuth,
  query('platform').optional().isIn(['instagram', 'facebook', 'tiktok', 'youtube', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'spotify', 'soundcloud', 'discord', 'google-business']).withMessage('פלטפורמה לא תקינה'),
  handleValidationErrors,
  getCategories
);

// @route   GET /api/services/platforms
// @desc    Get available platforms
// @access  Public
router.get('/platforms',
  optionalAuth,
  getPlatforms
);

// @route   GET /api/services/search
// @desc    Search services
// @access  Public
router.get('/search',
  optionalAuth,
  validateSearch,
  handleValidationErrors,
  searchServices
);

// @route   POST /api/services/calculate-price
// @desc    Calculate price for service and quantity
// @access  Public
router.post('/calculate-price',
  optionalAuth,
  validateCalculatePrice,
  handleValidationErrors,
  calculatePrice
);

// @route   GET /api/services/platform/:platform
// @desc    Get services by platform
// @access  Public
router.get('/platform/:platform',
  optionalAuth,
  validatePlatform,
  query('category').optional().isIn(['followers', 'likes', 'views', 'comments', 'shares', 'subscribers', 'members', 'reactions', 'saves', 'story_views', 'live_views', 'plays', 'downloads', 'reviews', 'other']).withMessage('קטגוריה לא תקינה'),
  query('quality').optional().isIn(['basic', 'standard', 'premium', 'exclusive']).withMessage('רמת איכות לא תקינה'),
  handleValidationErrors,
  getServicesByPlatform
);

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id',
  optionalAuth,
  validateServiceId,
  handleValidationErrors,
  getServiceById
);

// @route   GET /api/services/:id/recommendations
// @desc    Get service recommendations
// @access  Public
router.get('/:id/recommendations',
  optionalAuth,
  validateServiceId,
  handleValidationErrors,
  getRecommendations
);

// @route   GET /api/services/:id/availability
// @desc    Check service availability
// @access  Public
router.get('/:id/availability',
  optionalAuth,
  validateServiceId,
  handleValidationErrors,
  checkAvailability
);

// @route   GET /api/services/:id/preview
// @desc    Get service preview for authenticated users
// @access  Private
router.get('/:id/preview',
  authenticateToken,
  validateServiceId,
  handleValidationErrors,
  async (req, res) => {
    try {
      const Service = require('../models/Service');
      const service = await Service.findById(req.params.id);
      
      if (!service) {
        return res.status(404).json({
          error: 'שירות לא נמצא',
          message: 'השירות המבוקש לא קיים במערכת'
        });
      }

      // Additional info for authenticated users
      const preview = {
        ...service.toObject(),
        userBalance: req.user.balance,
        canAfford: req.user.balance >= service.calculatePrice(service.minOrder),
        recommendedQuantity: Math.min(
          Math.max(service.minOrder, Math.floor(req.user.balance / service.pricePerK * 1000)),
          service.maxOrder
        )
      };

      res.json({
        success: true,
        data: {
          service: preview
        }
      });

    } catch (error) {
      console.error('Service preview error:', error);
      res.status(500).json({
        error: 'שגיאת שרת',
        message: 'שגיאה בטעינת תצוגה מקדימה של השירות'
      });
    }
  }
);

// @route   POST /api/services/:id/validate-order
// @desc    Validate order before creation
// @access  Private
router.post('/:id/validate-order',
  authenticateToken,
  validateServiceId,
  body('quantity').isInt({ min: 1 }).withMessage('כמות חייבת להיות מספר שלם חיובי'),
  body('targetUrl').isURL().withMessage('כתובת URL לא תקינה'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const Service = require('../models/Service');
      const { quantity, targetUrl } = req.body;
      
      const service = await Service.findById(req.params.id);
      
      if (!service) {
        return res.status(404).json({
          error: 'שירות לא נמצא',
          message: 'השירות המבוקש לא קיים במערכת'
        });
      }

      // Validate service availability
      if (!service.isAvailable()) {
        return res.status(400).json({
          error: 'שירות לא זמין',
          message: 'השירות אינו זמין כרגע'
        });
      }

      // Validate quantity
      if (quantity < service.minOrder || quantity > service.maxOrder) {
        return res.status(400).json({
          error: 'כמות לא תקינה',
          message: `הכמות חייבת להיות בין ${service.minOrder} ל-${service.maxOrder}`
        });
      }

      // Calculate price and validate balance
      const price = service.calculatePrice(quantity);
      
      if (req.user.balance < price) {
        return res.status(402).json({
          error: 'יתרה לא מספיקה',
          message: `היתרה שלך (₪${req.user.balance}) אינה מספיקה לביצוע ההזמנה (₪${price.toFixed(2)})`
        });
      }

      // Validate URL pattern if exists
      if (service.urlValidation && service.urlValidation.pattern) {
        const urlPattern = new RegExp(service.urlValidation.pattern);
        if (!urlPattern.test(targetUrl)) {
          return res.status(400).json({
            error: 'כתובת URL לא תקינה',
            message: `הכתובת חייבת להיות בפורמט: ${service.urlValidation.example || 'URL תקין'}`
          });
        }
      }

      res.json({
        success: true,
        message: 'ההזמנה תקינה',
        data: {
          serviceId: service._id,
          serviceName: service.name,
          quantity,
          price,
          estimatedStartTime: service.startTime,
          estimatedCompletionTime: Math.ceil(quantity / service.speedPerDay * 24)
        }
      });

    } catch (error) {
      console.error('Validate order error:', error);
      res.status(500).json({
        error: 'שגיאת שרת',
        message: 'שגיאה בולידציית ההזמנה'
      });
    }
  }
);

module.exports = router;