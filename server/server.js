const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Çevre değişkenlerini yükle
dotenv.config();

// Express uygulaması oluştur
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Uploads klasörünü oluştur
const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads klasörü oluşturuldu:', uploadsDir);
}

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
  console.log('Avatars klasörü oluşturuldu:', avatarsDir);
}

// Statik dosya servisi için uploads klasörünü ayarla
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Statik dosya dizini:', path.join(__dirname, 'uploads'));

// Routes klasörünün var olduğunu kontrol et
const routesDir = path.join(__dirname, 'routes');
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
  console.log('Routes klasörü oluşturuldu');
}

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/firdevsmobil')
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    
    // Routes
    try {
      const authRoutes = require('./routes/auth');
      app.use('/api/auth', authRoutes);
      console.log('Auth routes yüklendi');
      
      const userRoutes = require('./routes/user');
      app.use('/api/user', userRoutes);
      console.log('User routes yüklendi');
    } catch (error) {
      console.error('Routes yüklenirken hata:', error);
    }

    // Test endpoint
    app.get('/', (req, res) => {
      res.send('FIRDevs Mobile API çalışıyor!');
    });

    // Server başlat
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
    });
  })
  .catch(err => console.error('MongoDB bağlantı hatası:', err)); 