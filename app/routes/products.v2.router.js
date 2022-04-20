const { faker } = require('@faker-js/faker');
const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const productService = new ProductService();

router.get('', async (req, res) => {
  const { limit } = req.query;
  const products = await productService.find(+limit);
  res
    .json(products);
});

/* Nota: Para evitar conflictos, los enpoints con rutas dinámicas
 * deben ir después de los enpoints estáticos
*/
router.get('/filter', async (_, res) => {
  const randomProduct = await productService.filter();
  res
    .json(randomProduct);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.findOne(+id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res
    .status(201)
    .json({
      message: 'created',
      data: newProduct
    });
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const productUpdated = await productService.update(+id, body);
    res
      .status(200)
      .json(productUpdated);
  } catch(error) {
    res
      .status(404)
      .json({
        message: error.message
      });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.delete(+id);
    res
      .json({
        message: 'deleted',
        deletedProduct
      });
  } catch(error) {
    res
      .status(404)
      .json({
        message: error.message
      });
  }
});

module.exports = router;
