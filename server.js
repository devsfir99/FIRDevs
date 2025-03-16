// .env dosyasındaki değişkenleri yükle 
require('dotenv').config();

// Express , CORS ve Morgan paketlerini dahil et

const express = require ('express');
const cors = require('cors');
const morgan = require ('morgan');

// Express uygulamasını başlat
const app = express();

// Middleware'ler
app.use(express.json()); //JSON verisini parse etmek için
app.use(cors()); //CORS izinleri
app.use(morgan('dev')); //sunucu logları için

// Basit bir test endpoint'i
app.get('/', (reg,res) => {
    res.send('Backend Sorunsuzca Çalşıyor');
});

// Sunucuyu Başlat 
const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server ${PORT} portunda çalışıyor.');
});