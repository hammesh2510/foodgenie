const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All menu routes require the user to be logged in AND be an OWNER
router.use(protect);
router.use(authorize('OWNER'));

router.route('/')
  .get(getMenuItems)
  .post(createMenuItem);

router.route('/:id')
  .put(updateMenuItem)
  .delete(deleteMenuItem);

module.exports = router;
