const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Kullanıcı kaydı
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Fırat Üniversitesi öğrenci e-posta kontrolü
        const emailRegex = /^\d{9}@firat\.edu\.tr$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Lütfen geçerli bir Fırat Üniversitesi öğrenci numarası kullanın.' 
            });
        }

        // Öğrenci numarasını e-postadan çıkar
        const studentNumber = email.split('@')[0];
        if (studentNumber.length !== 9) {
            return res.status(400).json({ 
                message: 'Öğrenci numarası 9 haneli olmalıdır.' 
            });
        }

        // E-posta kullanımda mı kontrolü
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Bu öğrenci numarası zaten kayıtlı.' 
            });
        }

        // Şifre hashleme
        const hashedPassword = await bcrypt.hash(password, 10);

        // İlk kullanıcı kontrolü
        const userCount = await prisma.user.count();
        const role = userCount === 0 ? 'ADMIN' : 'USER';

        // Kullanıcı oluşturma
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
                isVerified: true
            }
        });

        res.status(201).json({ 
            message: 'Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.',
            role: user.role
        });
    } catch (error) {
        console.error('Kayıt hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
};

// Kullanıcı girişi
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // E-posta format kontrolü
        const emailRegex = /^\d{9}@firat\.edu\.tr$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Lütfen geçerli bir Fırat Üniversitesi öğrenci numarası kullanın.' 
            });
        }

        // Kullanıcı kontrolü
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı.' });
        }

        // Şifre kontrolü
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Geçersiz şifre.' });
        }

        // JWT token oluşturma
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                email: user.email, 
                name: user.name,
                role: user.role,
                studentNumber: email.split('@')[0]
            } 
        });
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası', error: error.message });
    }
};

// Kullanıcı rolünü ADMIN olarak güncelleme
const updateToAdmin = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                email: "240542009@firat.edu.tr"
            },
            data: {
                role: "ADMIN"
            }
        });
        res.json({ message: "Kullanıcı rolü ADMIN olarak güncellendi", user });
    } catch (error) {
        res.status(500).json({ error: "Rol güncelleme hatası" });
    }
};

// Şifre güncelleme
const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı var mı kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).json({
                error: "Kullanıcı bulunamadı",
                message: "Bu email adresi ile kayıtlı kullanıcı bulunamadı"
            });
        }

        // Yeni şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Şifreyi güncelle
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword
            }
        });

        res.json({
            message: "Şifre başarıyla güncellendi",
            email: updatedUser.email
        });

    } catch (error) {
        console.error("Şifre güncelleme hatası:", error);
        res.status(500).json({
            error: "Şifre güncelleme hatası",
            message: error.message
        });
    }
};

// Kullanıcı silme (Sadece ADMIN)
const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Kullanıcı var mı kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).json({
                error: "Kullanıcı bulunamadı",
                message: "Bu email adresi ile kayıtlı kullanıcı bulunamadı"
            });
        }

        // Kendini silmeye çalışıyor mu kontrolü
        if (req.user.email === email) {
            return res.status(400).json({
                error: "İzin verilmeyen işlem",
                message: "Kendi hesabınızı silemezsiniz"
            });
        }

        // Kullanıcıyı sil
        await prisma.user.delete({
            where: { email }
        });

        res.json({
            message: "Kullanıcı başarıyla silindi",
            deletedUserEmail: email
        });

    } catch (error) {
        console.error("Kullanıcı silme hatası:", error);
        res.status(500).json({
            error: "Kullanıcı silme hatası",
            message: error.message
        });
    }
};

// Kullanıcı rolü değiştirme (Sadece ADMIN)
const changeUserRole = async (req, res) => {
    try {
        const { email, newRole } = req.body;

        // Role tipini kontrol et
        const validRoles = ['USER', 'ADMIN'];
        if (!validRoles.includes(newRole)) {
            return res.status(400).json({
                error: "Geçersiz rol",
                message: "Rol sadece USER veya ADMIN olabilir"
            });
        }

        // Kullanıcı var mı kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existingUser) {
            return res.status(404).json({
                error: "Kullanıcı bulunamadı",
                message: "Bu email adresi ile kayıtlı kullanıcı bulunamadı"
            });
        }

        // Kendini değiştirmeye çalışıyor mu kontrolü
        if (req.user.email === email) {
            return res.status(400).json({
                error: "İzin verilmeyen işlem",
                message: "Kendi rolünüzü değiştiremezsiniz"
            });
        }

        // Rolü güncelle
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: newRole }
        });

        res.json({
            message: "Kullanıcı rolü başarıyla güncellendi",
            user: {
                email: updatedUser.email,
                role: updatedUser.role
            }
        });

    } catch (error) {
        console.error("Rol değiştirme hatası:", error);
        res.status(500).json({
            error: "Rol değiştirme hatası",
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    updateToAdmin,
    updatePassword,
    deleteUser,
    changeUserRole
};