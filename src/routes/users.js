const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');
const {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
  loginUser,
} = require('../controllers/users');

router.get('/', getUsers); // - // получить пользователей
router.get('/:id', getUserId); // - Поиск пользователя по id
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), createUser); // - Создать пользователя
router.patch('/me', updateProfile); // - Обновляет профиль
router.patch('/me/avatar', updateAvatar); // - Обновляет аватар

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

module.exports = router;
