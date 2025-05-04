const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true,
    trim: true
  },
  soyad: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@firat\.edu\.tr$/.test(v);
      },
      message: props => `${props.value} geçerli bir firat.edu.tr e-posta adresi değil!`
    }
  },
  sifre: {
    type: String,
    required: true,
    minlength: 6
  },
  fakulte: {
    type: String,
    default: '',
    trim: true
  },
  bolum: {
    type: String,
    default: '',
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 200
  },
  skills: {
    type: [String],
    default: []
  },
  socialMedia: {
    github: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    }
  },
  profileImage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Şifreyi hashleme
userSchema.pre('save', async function(next) {
  if (this.isModified('sifre')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.sifre = await bcrypt.hash(this.sifre, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Güncelleme yaparken tarihi otomatik güncelle
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Şifre doğrulama yöntemi
userSchema.methods.comparePassword = async function(givenPassword) {
  return await bcrypt.compare(givenPassword, this.sifre);
};

const User = mongoose.model('User', userSchema);

module.exports = User;