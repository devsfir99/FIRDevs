const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const userController = require('../controllers/userController');

// Profil bilgilerini getir
router.get('/profile', auth, userController.getProfile);

// Profil bilgilerini güncelle
router.put('/profile', auth, userController.updateProfile);

// Profil fotoğrafını güncelle
router.put('/profile/image', auth, upload.single('profileImage'), userController.updateProfileImage);

module.exports = router; 