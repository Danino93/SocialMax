const Service = require('../models/Service');

// Get all services with filtering and pagination
const getServices = async (req, res) => {
  try {
    const {
      platform,
      category,
      quality,
      status = 'active',
      minPrice,
      maxPrice,
      search,
      sortBy = 'stats.successRate',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Build query object
    const query = { status };

    // Platform filter
    if (platform) {
      query.platform = platform;
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Quality filter
    if (quality) {
      query.quality = quality;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricePerK = {};
      if (minPrice) query.pricePerK.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerK.$lte = parseFloat(maxPrice);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { nameEn: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { descriptionEn: new RegExp(search, 'i') }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const services = await Service.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Service.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת השירותים'
    });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        error: 'שירות לא נמצא',
        message: 'השירות המבוקש לא קיים במערכת'
      });
    }

    res.json({
      success: true,
      data: {
        service
      }
    });

  } catch (error) {
    console.error('Get service by ID error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת השירות'
    });
  }
};

// Get services by platform
const getServicesByPlatform = async (req, res) => {
  try {
    const { platform } = req.params;
    const { category, quality } = req.query;

    const query = { platform, status: 'active' };
    if (category) query.category = category;
    if (quality) query.quality = quality;

    const services = await Service.find(query)
      .sort({ 'stats.successRate': -1 })
      .lean();

    res.json({
      success: true,
      data: {
        platform,
        services
      }
    });

  } catch (error) {
    console.error('Get services by platform error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת שירותי הפלטפורמה'
    });
  }
};

// Get popular services
const getPopularServices = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const services = await Service.find({ status: 'active' })
      .sort({ 'stats.totalOrders': -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      data: {
        services
      }
    });

  } catch (error) {
    console.error('Get popular services error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת השירותים הפופולריים'
    });
  }
};

// Get service categories
const getCategories = async (req, res) => {
  try {
    const { platform } = req.query;

    const match = { status: 'active' };
    if (platform) match.platform = platform;

    const categories = await Service.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            category: '$category',
            platform: '$platform'
          },
          count: { $sum: 1 },
          avgPrice: { $avg: '$pricePerK' },
          minPrice: { $min: '$pricePerK' },
          maxPrice: { $max: '$pricePerK' }
        }
      },
      {
        $group: {
          _id: '$_id.category',
          platforms: {
            $push: {
              platform: '$_id.platform',
              count: '$count',
              avgPrice: '$avgPrice',
              minPrice: '$minPrice',
              maxPrice: '$maxPrice'
            }
          },
          totalServices: { $sum: '$count' }
        }
      },
      { $sort: { totalServices: -1 } }
    ]);

    // Map category names to Hebrew
    const categoryNames = {
      'followers': 'עוקבים',
      'likes': 'לייקים',
      'views': 'צפיות',
      'comments': 'תגובות',
      'shares': 'שיתופים',
      'subscribers': 'מנויים',
      'members': 'חברים',
      'reactions': 'ריאקציות',
      'saves': 'שמירות',
      'story_views': 'צפיות בסטורי',
      'live_views': 'צפיות בשידור חי',
      'plays': 'השמעות',
      'downloads': 'הורדות',
      'reviews': 'ביקורות',
      'other': 'אחר'
    };

    const categoriesWithNames = categories.map(cat => ({
      ...cat,
      nameHe: categoryNames[cat._id] || cat._id,
      nameEn: cat._id
    }));

    res.json({
      success: true,
      data: {
        categories: categoriesWithNames
      }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת הקטגוריות'
    });
  }
};

// Get platforms
const getPlatforms = async (req, res) => {
  try {
    const platforms = await Service.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
          categories: { $addToSet: '$category' },
          avgPrice: { $avg: '$pricePerK' },
          minPrice: { $min: '$pricePerK' },
          maxPrice: { $max: '$pricePerK' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Map platform names to Hebrew
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

    const platformsWithNames = platforms.map(platform => ({
      ...platform,
      nameHe: platformNames[platform._id] || platform._id,
      nameEn: platform._id
    }));

    res.json({
      success: true,
      data: {
        platforms: platformsWithNames
      }
    });

  } catch (error) {
    console.error('Get platforms error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת הפלטפורמות'
    });
  }
};

// Calculate price for quantity
const calculatePrice = async (req, res) => {
  try {
    const { serviceId, quantity } = req.body;

    if (!serviceId || !quantity) {
      return res.status(400).json({
        error: 'שדות חובה חסרים',
        message: 'מזהה שירות וכמות הם שדות חובה'
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'שירות לא נמצא',
        message: 'השירות המבוקש לא קיים במערכת'
      });
    }

    if (service.status !== 'active') {
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

    const price = service.calculatePrice(quantity);

    res.json({
      success: true,
      data: {
        serviceId,
        serviceName: service.name,
        quantity,
        pricePerK: service.pricePerK,
        totalPrice: price,
        currency: service.currency,
        estimatedStartTime: service.startTime,
        estimatedCompletionTime: Math.ceil(quantity / service.speedPerDay * 24) // hours
      }
    });

  } catch (error) {
    console.error('Calculate price error:', error);
    
    if (error.message.includes('כמות חייבת')) {
      return res.status(400).json({
        error: 'כמות לא תקינה',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בחישוב המחיר'
    });
  }
};

// Search services
const searchServices = async (req, res) => {
  try {
    const { q: query, platform, category, limit = 20 } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        error: 'שאילתה קצרה מדי',
        message: 'החיפוש חייב להכיל לפחות 2 תווים'
      });
    }

    const filters = { platform, category };
    const services = await Service.searchServices(query, filters);

    res.json({
      success: true,
      data: {
        query,
        services: services.slice(0, parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Search services error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בחיפוש השירותים'
    });
  }
};

// Get service recommendations
const getRecommendations = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'שירות לא נמצא',
        message: 'השירות המבוקש לא קיים במערכת'
      });
    }

    // Find similar services
    const recommendations = await Service.find({
      _id: { $ne: serviceId },
      platform: service.platform,
      category: service.category,
      status: 'active'
    })
    .sort({ 'stats.successRate': -1 })
    .limit(5)
    .lean();

    // If not enough similar services, add from same platform
    if (recommendations.length < 5) {
      const additionalServices = await Service.find({
        _id: { $ne: serviceId, $nin: recommendations.map(s => s._id) },
        platform: service.platform,
        status: 'active'
      })
      .sort({ 'stats.totalOrders': -1 })
      .limit(5 - recommendations.length)
      .lean();

      recommendations.push(...additionalServices);
    }

    res.json({
      success: true,
      data: {
        recommendations
      }
    });

  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת ההמלצות'
    });
  }
};

// Check service availability
const checkAvailability = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: 'שירות לא נמצא',
        message: 'השירות המבוקש לא קיים במערכת'
      });
    }

    const isAvailable = service.isAvailable();
    const nextAvailableTime = !isAvailable ? 
      'מחר ב-' + service.availability.hours.start : null;

    res.json({
      success: true,
      data: {
        serviceId,
        isAvailable,
        status: service.status,
        nextAvailableTime,
        availability: service.availability
      }
    });

  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בבדיקת זמינות השירות'
    });
  }
};

module.exports = {
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
};