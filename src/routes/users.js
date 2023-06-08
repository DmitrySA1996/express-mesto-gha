const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser
} = require('../controllers/users');

// Пользователи:
router.get('/', getUsers);
// Конкретный пользователь по его ID:
router.get('/:id', getUserId);
// Создание пользователя:
router.post('/', createUser);

module.exports = router;