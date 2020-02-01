const express = require('express');
const router = express.Router();
const userRoutes = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('./cloudinary.config');

router.get('/', userRoutes.base)
router.post('/register', userRoutes.create)
router.post('/login', userRoutes.login)
router.get('/user/:id', userRoutes.getUser)
router.patch('/user/:id', userRoutes.updateUser)

module.exports = router;
