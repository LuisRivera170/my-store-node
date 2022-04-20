const express = require('express');

const router = express.Router();

/**
 * Query params
 **/

 router.get('', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  res.json({
    limit,
    offset
  });
});

module.exports = router;
