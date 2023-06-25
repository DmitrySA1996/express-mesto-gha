const router = require('express').Router();
const { FORBIDDEN } = require('../utils/constants');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(FORBIDDEN)
    .send({ message: '403: Нет прав доступа.' });
});

module.exports = router;
