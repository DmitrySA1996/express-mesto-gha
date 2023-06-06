const bcrypt = require('bcrypt');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');
const InaccurateDataError = require('../errors/InaccurateDataError');

// создаёт пользователя
function registrationUser(req, res, next) {
  const {
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при регистрации пользователя'));
      } else {
        next(err);
      }
    });
}

// возвращает всех пользователей:
function getUsers(_, res, next) {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

// возвращает пользователя по _id:
function getUserId(req, res, next) {
  const { id } = req.params;

  User
    .findById(id)

    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  registrationUser,
  getUsers,
  getUserId
};