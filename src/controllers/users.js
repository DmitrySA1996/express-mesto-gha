const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_SIGNING_KEY } = require('../utils/constants');
const {
  OK, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR,
} = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const InaccurateDataError = require('../errors/InaccurateDataError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          SECRET_SIGNING_KEY,
          { expiresIn: '7d' },
        );

        return res.send({ _id: token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
};

// Создание пользователя:
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(CREATED).send({
        email,
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
};

// Пользователи:
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' }));
};

// Конкретный пользователь по его ID:
module.exports.getUserId = (req, res) => {
  User
    .findById(req.params.id)
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

// поиск пользователя:
module.exports.currentUserInfo = (req, res, next) => {
  const { userId } = req.user;

  User
    .findById(userId)
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
};

// Обновление профиля:
module.exports.updateProfile = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при обновлении профиля пользователя'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара:
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
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
