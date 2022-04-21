const express = require('express');
const routerApi = require('./src/app/routes');
const swaggerUI = require('swagger-ui-express'),
      swaggerDocument = require('./swagger.json');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./src/app/middlewares/error.handler');

const app = express();
const port = 3000;

// Manejo de respuestas en tipo json
app.use(express.json());

// Cors
const whiteList = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed'));
    }
  }
}
app.use(cors(options));

// Router
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Swagger
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

app.get('/', (_, res) => {
  res.send('Hello my server with express')
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
