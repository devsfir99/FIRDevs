const User = require('../models/User');

// Kullanıcı profilini getir
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-sifre');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
};

// Kullanıcı profilini güncelle
exports.updateProfile = async (req, res) => {
  try {
    const { ad, soyad, bio } = req.body;
    
    // Güncelleme verilerini hazırla
    const updateData = {};
    if (ad) updateData.ad = ad;
    if (soyad) updateData.soyad = soyad;
    if (bio) updateData.bio = bio;
    
    // Profili güncelle
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-sifre');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
}; 