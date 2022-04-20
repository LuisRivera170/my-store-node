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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(+id);
    res.json(product);
  } catch (err) {
    next(err);
  }
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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const productUpdated = await productService.update(+id, body);
    res
      .status(200)
      .json(productUpdated);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.delete(+id);
    res
      .json({
        message: 'deleted',
        deletedProduct
      });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
