const User = require('../models/User');

// @desc    Get active restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getActiveRestaurants = async (req, res) => {
  try {
    const restaurants = await User.find({ role: 'OWNER', isActive: true }).select('-password');
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Server error fetching restaurants' });
  }
};
