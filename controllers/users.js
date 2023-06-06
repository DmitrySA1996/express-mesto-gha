const bcrypt = require('bcrypt');
const User = require('../models/user');

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
      avatar
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        name,
        about,
        avatar,
        _id
      });
    })
    .catch((err) => {
        next(err);
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

      next(err);
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = {
  registrationUser,
  getUsers,
  getUserId
};