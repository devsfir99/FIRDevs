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
    const { 
      ad, 
      soyad, 
      bio, 
      fakulte, 
      bolum, 
      skills,
      socialMedia 
    } = req.body;
    
    console.log('==========================================');
    console.log('Profil güncelleme isteği alındı:', JSON.stringify(req.body, null, 2));
    console.log('İstek yapılan kullanıcı ID:', req.user.id);
    console.log('==========================================');
    
    // Kullanıcıyı bul
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    console.log('Güncellemeden önceki kullanıcı verileri:');
    console.log('Fakülte:', user.fakulte);
    console.log('Bölüm:', user.bolum);
    console.log('Bio:', user.bio);
    console.log('Skills:', user.skills);
    console.log('SocialMedia:', JSON.stringify(user.socialMedia, null, 2));
    console.log('==========================================');
    
    // Ana alanları güncelle
    const updateData = {};
    
    if (ad !== undefined) updateData.ad = ad;
    if (soyad !== undefined) updateData.soyad = soyad;
    if (bio !== undefined) updateData.bio = bio;
    if (fakulte !== undefined) updateData.fakulte = fakulte;
    if (bolum !== undefined) updateData.bolum = bolum;
    if (skills !== undefined) updateData.skills = skills;
    
    // SocialMedia alanları için dot notation kullan
    if (socialMedia && typeof socialMedia === 'object') {
      if (socialMedia.github !== undefined) {
        updateData['socialMedia.github'] = socialMedia.github;
        console.log('Github güncellenecek:', socialMedia.github);
      }
      
      if (socialMedia.linkedin !== undefined) {
        updateData['socialMedia.linkedin'] = socialMedia.linkedin;
        console.log('LinkedIn güncellenecek:', socialMedia.linkedin);
      }
      
      if (socialMedia.twitter !== undefined) {
        updateData['socialMedia.twitter'] = socialMedia.twitter;
        console.log('Twitter güncellenecek:', socialMedia.twitter);
      }
      
      if (socialMedia.instagram !== undefined) {
        updateData['socialMedia.instagram'] = socialMedia.instagram;
        console.log('Instagram güncellenecek:', socialMedia.instagram);
      }
    }
    
    // Güncellenecek verileri logla
    console.log('Güncellenecek alanlar:', Object.keys(updateData));
    console.log('Güncelleme verileri:', JSON.stringify(updateData, null, 2));
    
    // Güncelleme timestamp
    updateData.updatedAt = new Date();
    
    // findByIdAndUpdate ile tek seferde güncelle - new:true ile güncel dokümanı döndür
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Kullanıcı güncellenirken bir hata oluştu' });
    }
    
    console.log('Kullanıcı profili başarıyla güncellendi:', updatedUser._id);
    
    // Güncellemeden sonraki kullanıcı verileri:
    console.log('==========================================');
    console.log('Güncellemeden sonraki kullanıcı verileri:');
    console.log('Fakülte:', updatedUser.fakulte);
    console.log('Bölüm:', updatedUser.bolum);
    console.log('Bio:', updatedUser.bio);
    console.log('Skills:', updatedUser.skills);
    console.log('SocialMedia:', JSON.stringify(updatedUser.socialMedia, null, 2));
    console.log('==========================================');
    
    // Şifreyi çıkararak kullanıcı nesnesini döndür
    const userObj = updatedUser.toObject();
    delete userObj.sifre;
    
    // Güncellenmiş kullanıcı bilgilerini döndür
    res.json(userObj);
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
}; 