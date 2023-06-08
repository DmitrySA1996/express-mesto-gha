const router = require('express').Router();
const { NOT_FOUND } = require('../utils/constants')
const userRoutes = require('./users');

router.use('/users', userRoutes);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND)
    .send({ message: '404: Страница не найдена.' });
});

module.exports = router;