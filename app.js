const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const { routeUsers } = require('./routes/users');
const { NOT_FOUND } = require('./utils/constants');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use('/users', routeUsers);
app.use((req, res) => {
  res.status(NOT_FOUND)
    .send({
      message: 'Страницы по запрошенному URL не существует'
    });
});

app.listen(PORT);