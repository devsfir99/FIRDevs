const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT token oluştur
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'gizli-anahtar', {
    expiresIn: '30d'
  });
};

// Kullanıcı kaydı
exports.register = async (req, res) => {
  try {
    const { ad, soyad, email, sifre } = req.body;

    // Email kontrolü
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    // E-posta firat.edu.tr kontrolü
    if (!email.endsWith('@firat.edu.tr')) {
      return res.status(400).json({ message: 'Sadece firat.edu.tr uzantılı e-posta adresleri kabul edilmektedir.' });
    }

    // Yeni kullanıcı oluştur
    const user = await User.create({
      ad,
      soyad,
      email,
      sifre
    });

    // Token oluştur
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      ad: user.ad,
      soyad: user.soyad,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  try {
    const { email, sifre } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // Şifreyi kontrol et
    const isMatch = await user.comparePassword(sifre);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // Token oluştur
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      ad: user.ad,
      soyad: user.soyad,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
};

// Mevcut kullanıcıyı getir
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-sifre');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
}; 