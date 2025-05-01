const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');

// Profil bilgilerini getir
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Profil bilgilerini güncelle
exports.updateProfile = async (req, res) => {
  try {
    const { name, department, studentNumber, bio } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (department) updateData.department = department;
    if (studentNumber) updateData.studentNumber = studentNumber;
    if (bio) updateData.bio = bio;
    updateData.updatedAt = Date.now();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Profil fotoğrafını güncelle
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Lütfen bir fotoğraf yükleyin' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Eski fotoğrafı sil (varsayılan fotoğraf değilse)
    if (user.profileImage !== 'default-profile.png') {
      const publicId = user.profileImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Yeni fotoğrafı kaydet
    user.profileImage = req.file.path;
    user.updatedAt = Date.now();
    await user.save();

    res.json({ profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}; 