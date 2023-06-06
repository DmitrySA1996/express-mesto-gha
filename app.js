const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const routeUsers = require('./routes/users');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use('/users', routeUsers);
app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

app.listen(PORT);