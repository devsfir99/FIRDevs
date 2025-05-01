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
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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
    } catch (error) {
      console.error('Auth routes yüklenirken hata:', error);
    }

    // Test endpoint
    app.get('/', (req, res) => {
      res.send('FIRDevs Mobile API çalışıyor!');
    });

    // Server başlat
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
    });
  })
  .catch(err => console.error('MongoDB bağlantı hatası:', err)); 