const User = require('../models/user');
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/constants');

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
  User.create({ name, about, avatar })
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

// Обновление профиля:
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail().then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

// Обновление аватара:
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    { new: true })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара',
          });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(NOT_FOUND)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};