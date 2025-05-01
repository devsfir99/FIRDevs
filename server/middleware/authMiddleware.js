const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcının oturum açmış olup olmadığını kontrol eder
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token'ı al
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar');

      // Kullanıcıyı bul (şifre hariç)
      req.user = await User.findById(decoded.id).select('-sifre');

      next();
    } catch (error) {
      console.error('Kimlik doğrulama hatası:', error);
      res.status(401).json({ message: 'Yetkilendirme başarısız' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Token bulunamadı, yetkilendirme başarısız' });
  }
};

module.exports = { protect }; 