const express = require('express');
const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const registerRoutes = require('./users');
const loginRoutes = require('./cards');
const auth = require('../middlewares/auth');

const app = express();

router.use('/signup', registerRoutes);
router.use('/signin', loginRoutes);
app.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
