const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Logged in users)
exports.addOrderItems = async (req, res) => {
  try {
    const { orderItems, restaurantId, totalAmount } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        customer: req.user._id,
        restaurant: restaurantId,
        items: orderItems,
        totalAmount
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
};
