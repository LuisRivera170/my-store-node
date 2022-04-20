const categoryV1Router = require('./categories.v1.router');
const productV1Router = require('./products.v1.router');
const productV2Router = require('./products.v2.router');
const userV1Router = require('./users.v1.router');

function routerApi(app) {
  app.use('/api/v1/products', productV1Router);
  app.use('/api/v2/products', productV2Router);
  app.use('/api/v1/categories', categoryV1Router);
  app.use('/api/v1/users', userV1Router);
}

module.exports = routerApi;
