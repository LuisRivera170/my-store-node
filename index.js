const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello my server with express')
});

app.get('/products', (_, res) => {
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

// Get with path variable
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Product 1',
      price: 1000
    }
  );
});

// Get with path variables
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
