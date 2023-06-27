const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const auth = require('../middlewares/auth');

router.use('/', registerRoutes);
router.use('/', loginRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
