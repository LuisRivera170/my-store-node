const express = require('express');
const router = express.Router();

/**
 * Get with path variables
 **/
 router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;
