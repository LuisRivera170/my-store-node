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
  if (id === '999') {
    res
      .status(404)
      .json({
        message: 'Not found'
      });
  } else {
    res
      .status(200)
      .json({
        id,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res
    .status(201)
    .json({
      message: 'created',
      data: body
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id
  })
});

module.exports = router;
