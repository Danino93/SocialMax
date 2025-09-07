const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Register new user
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      referralCode
    } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'שדות חובה חסרים',
        message: 'שם משתמש, אימייל וסיסמה הם שדות חובה'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmailOrUsername(email) || 
                        await User.findByEmailOrUsername(username);

    if (existingUser) {
      const field = existingUser.email === email.toLowerCase() ? 'אימייל' : 'שם משתמש';
      return res.status(400).json({
        error: 'משתמש כבר קיים',
        message: `${field} זה כבר רשום במערכת`
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        error: 'סיסמה חלשה',
        message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
      });
    }

    // Create user object
    const userData = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      phone
    };

    // Handle referral
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        userData.referredBy = referrer._id;
        
        // Give bonus to referrer
        referrer.totalReferrals += 1;
        referrer.balance += 10; // 10 ILS bonus
        await referrer.save();
        
        // Give bonus to new user
        userData.balance = 5; // 5 ILS welcome bonus
      }
    }

    // Get user location and device info
    const userIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    
    userData.ipAddresses = [{
      ip: userIP,
      userAgent,
      timestamp: new Date()
    }];

    // Create user
    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'הרישום בוצע בהצלחה',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'שגיאת ולידציה',
        message: errors[0] || 'נתונים לא תקינים'
      });
    }

    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה ביצירת החשבון. אנא נסה שוב'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({
        error: 'שדות חובה חסרים',
        message: 'אימייל/שם משתמש וסיסמה הם שדות חובה'
      });
    }

    // Find user by email or username
    const user = await User.findByEmailOrUsername(identifier).select('+password');

    if (!user) {
      return res.status(401).json({
        error: 'פרטי התחברות שגויים',
        message: 'אימייל/שם משתמש או סיסמה לא נכונים'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        error: 'חשבון נעול',
        message: 'החשבון נעול זמנית עקב ניסיונות כניסה כושלים רבים'
      });
    }

    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json({
        error: 'חשבון לא פעיל',
        message: 'החשבון שלך אינו פעיל. אנא פנה לתמיכה'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment failed login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        error: 'פרטי התחברות שגויים',
        message: 'אימייל/שם משתמש או סיסמה לא נכונים'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login and IP tracking
    const userIP = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    
    user.lastLogin = new Date();
    
    // Add IP if not exists
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

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'התחברות בוצעה בהצלחה',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בהתחברות. אנא נסה שוב'
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = await User.findById(req.user._id)
      .populate('referredBy', 'username firstName lastName')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'משתמש לא נמצא',
        message: 'פרופיל המשתמש לא נמצא'
      });
    }

    res.json({
      success: true,
      data: {
        user
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בטעינת הפרופיל'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      businessName,
      businessType,
      website,
      notifications
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        error: 'משתמש לא נמצא',
        message: 'פרופיל המשתמש לא נמצא'
      });
    }

    // Update allowed fields
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;
    if (businessName !== undefined) user.businessName = businessName;
    if (businessType !== undefined) user.businessType = businessType;
    if (website !== undefined) user.website = website;
    if (notifications !== undefined) user.notifications = { ...user.notifications, ...notifications };

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'הפרופיל עודכן בהצלחה',
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'שגיאת ולידציה',
        message: errors[0] || 'נתונים לא תקינים'
      });
    }

    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בעדכון הפרופיל'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'שדות חובה חסרים',
        message: 'סיסמה נוכחית וסיסמה חדשה הם שדות חובה'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'סיסמה חלשה',
        message: 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים'
      });
    }

    const user = await User.findById(req.user._id).select('+password');

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'סיסמה שגויה',
        message: 'הסיסמה הנוכחית שהוזנה אינה נכונה'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'הסיסמה שונתה בהצלחה'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בשינוי הסיסמה'
    });
  }
};

// Forgot password - send reset email
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'אימייל חסר',
        message: 'אנא הזן כתובת אימייל'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({
        success: true,
        message: 'אם האימייל קיים במערכת, נשלח אליך קישור לאיפוס הסיסמה'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // TODO: Send email with reset link
    // For now, we'll just log it (in production, send actual email)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: 'אם האימייל קיים במערכת, נשלח אליך קישור לאיפוס הסיסמה'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בשליחת אימייל איפוס סיסמה'
    });
  }
};

// Reset password with token
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: 'שדות חובה חסרים',
        message: 'טוקן וסיסמה חדשה הם שדות חובה'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'סיסמה חלשה',
        message: 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים'
      });
    }

    // Hash the token to compare with stored hash
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        error: 'טוקן לא תקין',
        message: 'טוקן איפוס הסיסמה לא תקין או פג תוקף'
      });
    }

    // Update password and clear reset token
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'הסיסמה אופסה בהצלחה'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה באיפוס הסיסמה'
    });
  }
};

// Generate API key for user
const generateApiKey = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Generate unique API key
    const apiKey = 'sk_' + crypto.randomBytes(32).toString('hex');
    
    user.apiKey = apiKey;
    user.apiCallsToday = 0;
    await user.save();

    res.json({
      success: true,
      message: 'API Key נוצר בהצלחה',
      data: {
        apiKey
      }
    });

  } catch (error) {
    console.error('Generate API key error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה ביצירת API Key'
    });
  }
};

// Logout (invalidate token on client side)
const logout = async (req, res) => {
  try {
    // In a more sophisticated setup, you might maintain a blacklist of tokens
    // For now, we'll just send a success response
    res.json({
      success: true,
      message: 'התנתקת בהצלחה'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'שגיאת שרת',
      message: 'שגיאה בהתנתקות'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  generateApiKey,
  logout
};