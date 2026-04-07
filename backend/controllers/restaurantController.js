const User = require('../models/User');
const MenuItem = require('../models/MenuItem');

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

// @desc    Get a single restaurant's details
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await User.findById(req.params.id).select('-password');
    if (!restaurant || restaurant.role !== 'OWNER') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ message: 'Server error retrieving restaurant details' });
  }
};

// @desc    Get menu for a specific restaurant
// @route   GET /api/restaurants/:id/menu
// @access  Public
exports.getRestaurantMenu = async (req, res) => {
  try {
    const filter = { ownerId: req.params.id };
    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    res.status(500).json({ message: 'Server error fetching restaurant menu' });
  }
};
