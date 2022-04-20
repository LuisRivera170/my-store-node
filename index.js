const express = require('express');
const routerApi = require('./app/routes');

const { logErrors, errorHandler } = require('./app/middlewares/error.handler');

const app = express();
const port = 3000;

// Manejo de respuestas en tipo json
app.use(express.json());

// Router
routerApi(app);

// Middlewares
app.use(logErrors);
app.use(errorHandler);

app.get('/', (_, res) => {
  res.send('Hello my server with express')
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
