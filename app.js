const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const routes = require('./src/routes/router');
const {login, createUser} = require('./src/routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(routes);

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
