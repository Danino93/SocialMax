const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      serviceId,
      targetUrl,
      quantity,
      customComments,
      hashtags,
      mentions,
      deliveryOptions
    } = req.body;

    // Get service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        error: 'שירות לא נמצא',
        message: 'השירות המבוקש לא קיים במערכת'
      });
    }

    // Check service availability
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

    // Calculate price
    const price = service.calculatePrice(quantity);

    // Check user balance
    if (req.user.balance < price) {
      return res.status(402).json({
        error: 'יתרה לא מספיקה',
        message: `היתרה שלך (₪${req.user.balance}) אינה מספיקה לביצוע ההזמנה (₪${price.toFixed(2)})`
      });
    }

    // Validate URL if pattern exists
    if (service.urlValidation && service.urlValidation.pattern) {
      const urlPattern = new RegExp(service.urlValidation.pattern);
      if (!urlPattern.test(targetUrl)) {
        return res.status(400).json({
          error: 'כתובת URL לא תקינה',
          message: `הכתובת חייבת להיות בפורמט: ${service.urlValidation.example || 'URL תקין'}`
        });
      }
    }

    // Get user location and device info
    const userIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];

    // Create order
    const orderData = {
      user: req.user._id,
      service: serviceId,
      serviceName: service.name,
      platform: service.platform,
      category: service.category,
      targetUrl,
      quantity,
      price,
      currency: service.currency,
      finalPrice: price,
      estimatedStartTime: service.startTime.max,
      estimatedCompletionTime: Math.ceil(quantity / service.speedPerDay * 24),
      provider: {
        name: service.provider.name,
        serviceId: service.provider.serviceId,
        cost: price / (1 + service.provider.markup / 100),
        markup: service.provider.markup
      },
      metadata: {
        userIP,
        userAgent,
        device: req.headers['sec-ch-ua-platform'] || 'Unknown'
      }
    };

    // Add optional fields
    if (customComments && customComments.length > 0) {
      orderData.customComments = customComments;
    }
    if (hashtags && hashtags.length > 0) {
      orderData.hashtags = hashtags;
    }
    if (mentions && mentions.length > 0) {
      orderData.mentions = mentions;
    }
    if (deliveryOptions) {
      orderData.deliveryOptions = deliveryOptions;
    }

    const order = new Order(orderData);
    await order.save();

    // Create transaction for the purchase
    const transaction = new Transaction({
      user: req.user._id,
      type: 'purchase',
      amount: price,
      currency: service.currency,
      balanceBefore: req.user.balance,
      description: `רכישת שירות: ${service.name}`,
      descriptionEn: `Service purchase: ${service.nameEn}`,
      order: order._id,
      metadata: {
        userIP,
        userAgent
      }
    });

    // Process transaction (deduct from balance)
    await transaction.processTransaction();

    // Update service statistics
    await service.updateStats({ status: 'pending', price });

    // Update user statistics
    req.user.stats.totalOrders += 1;
    req.user.stats.lastOrderDate = new Date();
    await req.user.save();

    // Populate order for response
    await order.populate('service', 'name nameEn platform category');

    res.status(201).json({
      success: true,
      message: 'ההזמנה נוצרה בהצלחה',
      data: {
        order,
        transaction: {
          id: transaction.transactionId,
          amount: transaction.amount,
          balanceAfter: transaction.balanceAfter
        }
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    
    if (error.message.includes('יתרה לא מספיקה')) {
      return res.status(402).json({
        error: 'יתרה לא מספיקה',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה ביצירת ההזמנה'
    });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const {
      status,
      platform,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { user: req.user._id };
    
    if (status) query.status = status;
    if (platform) query.platform = platform;
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const orders = await Order.find(query)
      .populate('service', 'name nameEn platform category pricePerK')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count
    const total = await Order.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת ההזמנות'
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ 
      _id: id, 
      user: req.user._id 
    }).populate('service', 'name nameEn platform category refill');

    if (!order) {
      return res.status(404).json({
        error: 'הזמנה לא נמצאה',
        message: 'ההזמנה המבוקשת לא קיימת או שאין לך הרשאה לצפות בה'
      });
    }

    res.json({
      success: true,
      data: {
        order
      }
    });

  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת ההזמנה'
    });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({ 
      _id: id, 
      user: req.user._id 
    });

    if (!order) {
      return res.status(404).json({
        error: 'הזמנה לא נמצאה',
        message: 'ההזמנה המבוקשת לא קיימת או שאין לך הרשאה לבטל אותה'
      });
    }

    if (!order.canBeCancelled()) {
      return res.status(400).json({
        error: 'לא ניתן לבטל',
        message: 'לא ניתן לבטל הזמנה זו במצבה הנוכחי'
      });
    }

    // Update order status
    await order.updateStatus('cancelled', reason || 'בוטל על ידי המשתמש', req.user._id);

    // Create refund transaction
    const refundAmount = order.calculateRefund();
    
    if (refundAmount > 0) {
      const refundTransaction = new Transaction({
        user: req.user._id,
        type: 'refund',
        amount: refundAmount,
        currency: order.currency,
        description: `החזר עבור הזמנה מבוטלת: ${order.orderId}`,
        descriptionEn: `Refund for cancelled order: ${order.orderId}`,
        order: order._id,
        relatedTransaction: order._id // Reference to original purchase
      });

      await refundTransaction.processTransaction();
    }

    res.json({
      success: true,
      message: 'ההזמנה בוטלה בהצלחה',
      data: {
        order: await order.populate('service', 'name nameEn'),
        refundAmount
      }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בביטול ההזמנה'
    });
  }
};

// Request refill
const requestRefill = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;

    const order = await Order.findOne({ 
      _id: id, 
      user: req.user._id 
    }).populate('service', 'refill');

    if (!order) {
      return res.status(404).json({
        error: 'הזמנה לא נמצאה',
        message: 'ההזמנה המבוקשת לא קיימת'
      });
    }

    // Check if refill is available
    if (!order.refill.guaranteed) {
      return res.status(400).json({
        error: 'מילוי חוזר לא זמין',
        message: 'שירות זה לא כולל מילוי חוזר'
      });
    }

    await order.requestRefill(quantity, reason);

    res.json({
      success: true,
      message: 'בקשת מילוי חוזר נשלחה בהצלחה',
      data: {
        order: await order.populate('service', 'name nameEn')
      }
    });

  } catch (error) {
    console.error('Request refill error:', error);
    
    if (error.message.includes('לא זמין') || error.message.includes('פגה')) {
      return res.status(400).json({
        error: 'מילוי חוזר לא זמין',
        message: error.message
      });
    }

    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בבקשת מילוי חוזר'
    });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const { timeframe = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeframe));

    const stats = await Order.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$finalPrice' },
          averageOrderValue: { $avg: '$finalPrice' },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          cancelledOrders: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    // Platform breakdown
    const platformStats = await Order.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
          totalSpent: { $sum: '$finalPrice' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        summary: stats[0] || {
          totalOrders: 0,
          totalSpent: 0,
          averageOrderValue: 0,
          completedOrders: 0,
          pendingOrders: 0,
          cancelledOrders: 0
        },
        platformBreakdown: platformStats,
        timeframe: parseInt(timeframe)
      }
    });

  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת סטטיסטיקות ההזמנות'
    });
  }
};

// Get order history with detailed tracking
const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ 
      _id: id, 
      user: req.user._id 
    }).populate('service', 'name nameEn platform category');

    if (!order) {
      return res.status(404).json({
        error: 'הזמנה לא נמצאה',
        message: 'ההזמנה המבוקשת לא קיימת'
      });
    }

    // Get related transactions
    const transactions = await Transaction.find({
      $or: [
        { order: order._id },
        { relatedTransaction: order._id }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        order,
        statusHistory: order.statusHistory,
        transactions,
        refillRequests: order.refill.requests
      }
    });

  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת היסטוריית ההזמנה'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  requestRefill,
  getOrderStats,
  getOrderHistory
};