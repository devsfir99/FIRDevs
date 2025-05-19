const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  hashtags: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Hashtag'leri otomatik olarak ayıkla
postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const hashtagRegex = /#[a-zA-ZğüşıöçĞÜŞİÖÇ0-9]+/g;
    const hashtags = this.content.match(hashtagRegex);
    if (hashtags) {
      this.hashtags = hashtags.map(tag => tag.slice(1).toLowerCase());
    }
  }
  next();
});

module.exports = mongoose.model('Post', postSchema); 