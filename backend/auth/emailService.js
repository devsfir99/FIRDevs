const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const EMAIL_SECRET = process.env.EMAIL_SECRET || 'your-email-secret-key';

// E-posta göndermek için transporter oluşturma
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (user) => {
    // Doğrulama token'ı oluşturma
    const emailToken = jwt.sign(
        { userId: user.id },
        EMAIL_SECRET,
        { expiresIn: '1d' }
    );

    const url = `http://yourapp.com/verify/${emailToken}`;

    // E-posta gönderme
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'E-posta Adresinizi Doğrulayın',
        html: `
            <h1>E-posta Doğrulama</h1>
            <p>Merhaba ${user.name},</p>
            <p>Hesabınızı doğrulamak için lütfen aşağıdaki bağlantıya tıklayın:</p>
            <a href="${url}">E-posta Adresimi Doğrula</a>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail
}; 