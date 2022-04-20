const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello my server with express')
});

app.get('/api/v1/products', (_, res) => {
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
app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Product 1',
      price: 1000
    }
  );
});

/**
 * Get with path variables
 **/
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

/**
 * Query params
 **/

app.get('/users', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  res.json({
    limit,
    offset
  });
});

app.get('/api/v2/products', (req, res) => {
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

app.get('/api/v2/products/filter', (req, res) => {
  res.json({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl()
  });
});

app.get('/api/v2/products/:id', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
