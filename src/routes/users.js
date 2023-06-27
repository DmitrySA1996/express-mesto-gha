const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // - получить пользователей
router.get('/me', updateProfile);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), updateAvatar);

module.exports = router;
