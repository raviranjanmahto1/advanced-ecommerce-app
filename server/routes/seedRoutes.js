const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const users = require('../data/users');
const products = require('../data/products');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Seed database with sample data
// @route   GET /api/seed
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const createdUsers = await User.insertMany(users);
  const adminUser = createdUsers[0]._id;

  const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser };
  });

  await Product.insertMany(sampleProducts);

  res.status(200).json({ message: 'Database successfully seeded with sample data!' });
}));

module.exports = router;
