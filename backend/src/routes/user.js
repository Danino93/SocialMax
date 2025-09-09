const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order'); // חסר גם את זה

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, businessName, website } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, businessName, website },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

// Get user balance
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('balance currency');
    res.json({ 
      balance: user.balance, 
      currency: user.currency 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

// Get user orders history
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const query = { userId: req.user.id };
    if (status) query.status = status;
    
    const orders = await Order.find(query)
      .populate('serviceId', 'name category platform')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

module.exports = router;