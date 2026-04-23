const express = require('express');
const router = express.Router();
const { authUser, registerUser, logoutUser, getUserProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
