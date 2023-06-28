const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.use('/', registerRoutes);
router.use('/', loginRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

module.exports = router;
