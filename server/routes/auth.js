const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Kullanıcı kaydı
router.post('/register', register);

// Kullanıcı girişi
router.post('/login', login);

// Mevcut kullanıcıyı getir
router.get('/me', protect, getCurrentUser);

module.exports = router; 