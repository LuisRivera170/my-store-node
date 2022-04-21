const express = require('express');

const router = express.Router();

router.get('', (_, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000
    },
    {
      name: 'Product 2',
      price: 2000
    }
  ]);
});

/**
 * Get with path variable
 **/
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Product 1',
      price: 1000
    }
  );
});

module.exports = router;
