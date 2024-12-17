const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/protected', isAuthenticated, verifyToken);

module.exports = router;