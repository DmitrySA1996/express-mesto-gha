const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

router.get('/', getUsers); // - // получить пользователей
router.get('/:id', getUserId); // - Поиск пользователя по id
router.post('/', createUser); // - Создать пользователя
router.patch('/me', updateProfile); // - Обновляет профиль
router.patch('/me/avatar', updateAvatar); // - Обновляет аватар

module.exports = router;