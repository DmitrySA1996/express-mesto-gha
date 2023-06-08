const User = require('../models/user');
const { OK, BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/constants');

// Пользователи:
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

// Конкретный пользователь по его ID:
module.exports.getUserId = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при поиске пользователя',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(NOT_FOUND)
          .send({
            message: 'Пользователь c указанным _id не найден',
          });
      }

      return res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

// Создание пользователя:
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create( { name, about, avatar } )
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.createFilm  = (req, res) => {
  Film.create({})
      .then(films => res.send({ data: films }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};