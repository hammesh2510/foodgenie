const express = require('express');
const router = express.Router();
const { getActiveRestaurants } = require('../controllers/restaurantController');

router.route('/').get(getActiveRestaurants);

module.exports = router;
