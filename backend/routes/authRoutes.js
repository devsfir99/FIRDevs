const express = require('express');
const router = express.Router();
const { register, login, updateToAdmin, updatePassword, deleteUser, changeUserRole } = require('../auth/authController');
const { authenticateToken, checkRole } = require('../auth/authMiddleware');

// Middleware - Hata yakalama
const errorHandler = (err, req, res, next) => {
    console.error('Hata:', err);
    res.status(500).json({ 
        error: 'Sunucu hatası',
        message: err.message 
    });
};

// Request kontrolü middleware
const validateRequest = (req, res, next) => {
    // Body boş mu kontrolü
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: 'Geçersiz istek',
            message: 'Request body boş olamaz' 
        });
    }
    next();
};

// Email format kontrolü middleware
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^\d{9}@firat\.edu\.tr$/;
    
    if (!email) {
        return res.status(400).json({ 
            error: 'Geçersiz istek',
            message: 'Email adresi gerekli' 
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Geçersiz email',
            message: 'Lütfen geçerli bir Fırat Üniversitesi öğrenci numarası kullanın. Örnek: 240542009@firat.edu.tr' 
        });
    }
    next();
};

// Password kontrolü middleware
const validatePassword = (req, res, next) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ 
            error: 'Geçersiz istek',
            message: 'Şifre gerekli' 
        });
    }

    if (password.length < 6) {
        return res.status(400).json({ 
            error: 'Geçersiz şifre',
            message: 'Şifre en az 6 karakter olmalıdır' 
        });
    }
    next();
};

// Name kontrolü middleware
const validateName = (req, res, next) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ 
            error: 'Geçersiz istek',
            message: 'İsim gerekli' 
        });
    }

    if (name.length < 3) {
        return res.status(400).json({ 
            error: 'Geçersiz isim',
            message: 'İsim en az 3 karakter olmalıdır' 
        });
    }
    next();
};

// Role kontrolü middleware
const validateRole = (req, res, next) => {
    const { newRole } = req.body;
    const validRoles = ['USER', 'ADMIN'];
    
    if (!newRole) {
        return res.status(400).json({ 
            error: 'Geçersiz istek',
            message: 'Rol bilgisi gerekli' 
        });
    }

    if (!validRoles.includes(newRole)) {
        return res.status(400).json({ 
            error: 'Geçersiz rol',
            message: 'Rol sadece USER veya ADMIN olabilir' 
        });
    }
    next();
};

// Routes
// Kullanıcı kaydı
router.post('/register', 
    validateRequest,
    validateEmail,
    validatePassword,
    validateName,
    register
);

// Kullanıcı girişi
router.post('/login',
    validateRequest,
    validateEmail,
    validatePassword,
    login
);

// Admin rolü güncelleme
router.post('/update-admin', 
    authenticateToken,
    checkRole(['ADMIN']),
    updateToAdmin
);

// Şifre güncelleme
router.post('/update-password',
    authenticateToken,
    validateRequest,
    validateEmail,
    validatePassword,
    updatePassword
);

// Kullanıcı silme (Sadece ADMIN)
router.delete('/delete-user', 
    authenticateToken, 
    checkRole(['ADMIN']),
    validateRequest,
    validateEmail,
    deleteUser
);

// Kullanıcı rolü değiştirme (Sadece ADMIN)
router.post('/change-role', 
    authenticateToken, 
    checkRole(['ADMIN']),
    validateRequest,
    validateEmail,
    validateRole,
    changeUserRole
);

// Korumalı rota örneği
router.get('/profile', 
    authenticateToken, 
    (req, res) => {
        res.json({ user: req.user });
    }
);

// E-posta doğrulama
router.get('/verify/:token', async (req, res) => {
    try {
        const { userId } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        
        const user = await prisma.user.update({
            where: { id: userId },
            data: { isVerified: true }
        });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }

        res.send(`
            <html>
                <body>
                    <h1>E-posta Doğrulama Başarılı</h1>
                    <p>E-posta adresiniz başarıyla doğrulandı.</p>
                    <p>Şimdi uygulamaya giriş yapabilirsiniz.</p>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Doğrulama hatası:', error);
        res.status(400).send('Doğrulama bağlantısı geçersiz veya süresi dolmuş.');
    }
});

// Hata yakalama middleware'ini en sona ekle
router.use(errorHandler);

module.exports = router;