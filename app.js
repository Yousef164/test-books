const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


require('./config/config.js');
const restRouter = require('./src/api/api-routes');


const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', restRouter);


const server = app.listen(PORT, () => {
  console.log(
    `app is up and running in the ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

module.exports = server;