const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware başladı');
    console.log('Headers:', req.headers);
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token ? 'Token var' : 'Token yok');
    
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Token bulunamadı' });
    }

    console.log('Token doğrulanıyor...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar');
    console.log('Token doğrulandı:', decoded);
    
    // Find user by id
    console.log('Kullanıcı aranıyor...');
    const user = await User.findById(decoded.id).select('-sifre');
    console.log('Bulunan kullanıcı:', user ? 'Kullanıcı bulundu' : 'Kullanıcı bulunamadı');
    
    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }
    
    req.user = user;
    console.log('Auth middleware başarılı');
    next();
  } catch (error) {
    console.error('Auth middleware hatası:', error);
    res.status(401).json({ message: 'Yetkilendirme hatası: Geçersiz token' });
  }
};

module.exports = auth; 