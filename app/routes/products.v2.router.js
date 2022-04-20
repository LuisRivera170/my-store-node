const { faker } = require('@faker-js/faker');
const express = require('express');

const router = express.Router();

router.get('', (req, res) => {
  const products = [];
  const { limit = 10, offset = 0 } = req.query;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
});

/* Nota: Para evitar conflictos, los enpoints con rutas dinámicas
 * deben ir después de los enpoints estáticos
*/
router.get('/filter', (_, res) => {
  res.json({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl()
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    }
  );
});

module.exports = router;
