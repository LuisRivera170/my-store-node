const express = require('express');
const routerApi = require('./app/routes');

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.get('/', (_, res) => {
  res.send('Hello my server with express')
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
