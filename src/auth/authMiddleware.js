const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token' });
        }
        req.user = user;
        next();
    });
};

// Yeni eklenen rol kontrolü middleware
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Yetkilendirme gerekli' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    checkRole  // Yeni eklenen fonksiyonu export ediyoruz
};