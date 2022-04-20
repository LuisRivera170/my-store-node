const { faker } = require('@faker-js/faker');
const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const productService = new ProductService();

router.get('', (req, res) => {
  const { limit, offset = 0 } = req.query;
  const products = productService.find(+limit);
  res.json(products);
});

/* Nota: Para evitar conflictos, los enpoints con rutas dinámicas
 * deben ir después de los enpoints estáticos
*/
router.get('/filter', (_, res) => {
  res.json(productService.filter());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productService.findOne(+id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = productService.create(body);
  res
    .status(201)
    .json({
      message: 'created',
      data: newProduct
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const productUpdated = productService.update(+id, body);
  res.json(productUpdated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = productService.delete(+id);
  res.json({
    message: 'deleted',
    deletedProduct
  })
});

module.exports = router;
