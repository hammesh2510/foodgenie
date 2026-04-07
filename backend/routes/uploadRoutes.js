const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }
  // Return the path starting from /uploads/
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
