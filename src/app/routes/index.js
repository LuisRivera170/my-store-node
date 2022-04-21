const express = require('express');

const categoryV1Router = require('./categories.v1.router');
const productV1Router = require('./products.v1.router');
const productV2Router = require('./products.v2.router');
const userV1Router = require('./users.v1.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productV1Router);
  router.use('/categories', categoryV1Router);
  router.use('/users', userV1Router);

  const routerv2 = express.Router();
  app.use('/api/v2', routerv2);
  routerv2.use('/products', productV2Router);
}

module.exports = routerApi;
