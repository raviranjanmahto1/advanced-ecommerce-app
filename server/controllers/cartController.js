const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (user) {
    // Format to match frontend expectations
    const formattedCart = user.cart.map(item => ({
      ...item.product._doc,
      qty: item.qty
    }));
    res.json(formattedCart);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user cart
// @route   POST /api/cart
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  
  const user = await User.findById(req.user._id);
  if (user) {
    // Map frontend cartItems to backend schema
    user.cart = cartItems.map(item => ({
      product: item._id,
      qty: item.qty
    }));
    
    await user.save();
    res.json({ message: 'Cart updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { getCart, updateCart };
