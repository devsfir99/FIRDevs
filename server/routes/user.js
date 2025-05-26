const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Multer yapılandırması
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'avatars');
    // Klasör yoksa oluştur
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Benzersiz dosya adı oluştur
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'avatar-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Sadece resim dosyalarına izin ver
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Sadece resim dosyaları yüklenebilir!'));
    }
    cb(null, true);
  }
});

// Kullanıcı profili route'ları
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Avatar yükleme endpoint'i
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenemedi' });
    }

    console.log('Yüklenen dosya:', req.file);

    // Kullanıcıyı bul ve avatar yolunu güncelle
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Eski avatar varsa sil
    if (user.profileImage) {
      const oldAvatarPath = path.join(__dirname, '..', 'uploads', 'avatars', path.basename(user.profileImage));
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Yeni avatar yolunu kaydet
    const avatarFileName = path.basename(req.file.path);
    const avatarUrl = `/uploads/avatars/${avatarFileName}`;
    
    console.log('Kaydedilecek avatar URL:', avatarUrl);
    
    user.profileImage = avatarUrl;
    await user.save();

    res.json({
      message: 'Avatar başarıyla yüklendi',
      profileImage: avatarUrl
    });
  } catch (error) {
    console.error('Avatar yükleme hatası:', error);
    res.status(500).json({ message: 'Avatar yüklenirken bir hata oluştu' });
  }
});

module.exports = router; 