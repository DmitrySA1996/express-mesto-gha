const router = require('express').Router();

const {
  getInitialCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getInitialCards); // - Возвращает все карточки
router.post('/', createCard); // - Создаёт карточку
router.delete('/:cardId', removeCard); // - Удаляет карточку по идентификатору
router.put('/:cardId/likes', likeCard); // - Поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard); // - Убрать лайк с карточки

module.exports = router;
