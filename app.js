const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./src/routes/router');
const limiter = require('./src/middlewares/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.use(routes);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
