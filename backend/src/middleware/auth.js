const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// Verify JWT Token and authenticate user
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return res.status(401).json({
        error: 'גישה נדחתה',
        message: 'לא סופק טוקן אימות'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId)
      .select('-password'); // Don't include password

    if (!user) {
      return res.status(401).json({
        error: 'גישה נדחתה',
        message: 'משתמש לא נמצא'
      });
    }

    // Check if user account is active
    if (user.status !== 'active') {
      return res.status(403).json({
        error: 'חשבון חסום',
        message: 'החשבון שלך אינו פעיל. אנא פנה לתמיכה'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        error: 'חשבון נעול',
        message: 'החשבון נעול זמנית עקב ניסיונות כניסה כושלים'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    
    // Add IP tracking
    const userIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    
    // Check if this is a new IP
    const existingIP = user.ipAddresses.find(ip => ip.ip === userIP);
    if (!existingIP) {
      user.ipAddresses.push({
        ip: userIP,
        userAgent,
        timestamp: new Date()
      });
      
      // Keep only last 10 IPs
      if (user.ipAddresses.length > 10) {
        user.ipAddresses = user.ipAddresses.slice(-10);
      }
    }

    await user.save();

    // Attach user to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'טוקן לא תקין',
        message: 'אנא התחבר מחדש'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'הטוקן פג תוקף',
        message: 'אנא התחבר מחדש'
      });
    }
    
    return res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה באימות המשתמש'
    });
  }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.status === 'active' && !user.isLocked) {
        req.user = user;
        req.token = token;
      }
    }
    
    next();
  } catch (error) {
    // Don't fail on optional auth errors
    next();
  }
};

// Check user roles
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'גישה נדחתה',
        message: 'נדרש אימות'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'אין הרשאה',
        message: 'אין לך הרשאות מספיקות לפעולה זו'
      });
    }

    next();
  };
};

// Admin only middleware
const requireAdmin = requireRole('admin', 'super-admin');

// Super admin only middleware
const requireSuperAdmin = requireRole('super-admin');

// Check if user owns resource or is admin
const requireOwnershipOrAdmin = (resourceUserField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'גישה נדחתה',
        message: 'נדרש אימות'
      });
    }

    // Admin can access everything
    if (['admin', 'super-admin'].includes(req.user.role)) {
      return next();
    }

    // Check ownership based on request params or body
    const resourceUserId = req.params.userId || 
                          req.body[resourceUserField] || 
                          req.params.id;

    if (resourceUserId && resourceUserId.toString() === req.user._id.toString()) {
      return next();
    }

    return res.status(403).json({
      error: 'אין הרשאה',
      message: 'אין לך הרשאה לגשת למשאב זה'
    });
  };
};

// Rate limiting per user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const userRequests = new Map();
  
  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user._id.toString();
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get user's requests in current window
    if (!userRequests.has(userId)) {
      userRequests.set(userId, []);
    }

    const requests = userRequests.get(userId);
    
    // Remove old requests
    const recentRequests = requests.filter(time => time > windowStart);
    userRequests.set(userId, recentRequests);

    // Check if limit exceeded
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'יותר מדי בקשות',
        message: `חרגת ממגבלת ${maxRequests} בקשות ב-${windowMs / 60000} דקות`,
        retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
      });
    }

    // Add current request
    recentRequests.push(now);
    userRequests.set(userId, recentRequests);

    next();
  };
};

// API Key authentication (for external integrations)
const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey) {
      return res.status(401).json({
        error: 'API Key נדרש',
        message: 'אנא ספק API Key תקין'
      });
    }

    const user = await User.findOne({ apiKey }).select('-password');

    if (!user) {
      return res.status(401).json({
        error: 'API Key לא תקין',
        message: 'המפתח שסופק אינו תקין'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        error: 'חשבון לא פעיל',
        message: 'החשבון שלך אינו פעיל'
      });
    }

    // Check API limits
    const today = new Date().toDateString();
    const lastCallDate = user.lastApiCall ? user.lastApiCall.toDateString() : null;
    
    // Reset daily counter if new day
    if (lastCallDate !== today) {
      user.apiCallsToday = 0;
    }

    if (user.apiCallsToday >= user.apiLimit) {
      return res.status(429).json({
        error: 'חריגה ממגבלת API',
        message: `חרגת ממגבלת ${user.apiLimit} קריאות ליום`
      });
    }

    // Update API usage
    user.apiCallsToday += 1;
    user.lastApiCall = new Date();
    await user.save();

    req.user = user;
    req.authMethod = 'api_key';
    
    next();
  } catch (error) {
    console.error('API Key authentication error:', error);
    return res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה באימות API Key'
    });
  }
};

// Combined auth middleware (JWT or API Key)
const authenticate = async (req, res, next) => {
  const hasApiKey = req.headers['x-api-key'] || req.query.api_key;
  const hasJwtToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');

  if (hasApiKey) {
    return authenticateApiKey(req, res, next);
  } else if (hasJwtToken) {
    return authenticateToken(req, res, next);
  } else {
    return res.status(401).json({
      error: 'אימות נדרש',
      message: 'אנא ספק JWT token או API key'
    });
  }
};

// Validate email verification
const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'גישה נדחתה',
      message: 'נדרש אימות'
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      error: 'אימות אימייל נדרש',
      message: 'אנא אמת את כתובת האימייל שלך כדי להמשיך'
    });
  }

  next();
};

// Check sufficient balance for purchase
const requireSufficientBalance = (amountField = 'amount') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'גישה נדחתה',
        message: 'נדרש אימות'
      });
    }

    const amount = req.body[amountField] || req.params[amountField];
    
    if (!amount) {
      return res.status(400).json({
        error: 'סכום לא צוין',
        message: 'לא נמצא סכום לבדיקה'
      });
    }

    if (req.user.balance < amount) {
      return res.status(402).json({
        error: 'יתרה לא מספיקה',
        message: `היתרה שלך (₪${req.user.balance}) אינה מספיקה לביצוע העסקה (₪${amount})`
      });
    }

    next();
  };
};

module.exports = {
  generateToken,
  authenticateToken,
  optionalAuth,
  requireRole,
  requireAdmin,
  requireSuperAdmin,
  requireOwnershipOrAdmin,
  userRateLimit,
  authenticateApiKey,
  authenticate,
  requireEmailVerification,
  requireSufficientBalance
};