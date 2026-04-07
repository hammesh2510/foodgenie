const express = require('express');
const router = express.Router();
const { getActiveRestaurants, getRestaurantDetails, getRestaurantMenu } = require('../controllers/restaurantController');

router.route('/').get(getActiveRestaurants);
router.route('/:id').get(getRestaurantDetails);
router.route('/:id/menu').get(getRestaurantMenu);

module.exports = router;
