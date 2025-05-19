const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Tüm gönderileri getir (Pagination ile)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'ad soyad email profileImage')
      .populate('comments.userId', 'ad soyad email profileImage');

    const total = await Post.countDocuments();
    
    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + posts.length < total
    });
  } catch (error) {
    console.error('Gönderiler getirilirken hata:', error);
    res.status(500).json({ message: 'Gönderiler getirilirken bir hata oluştu' });
  }
});

// Yeni gönderi oluştur
router.post('/', auth, async (req, res) => {
  try {
    const { content, images, location } = req.body;

    const post = new Post({
      userId: req.user._id,
      content,
      images: images || [],
      location
    });

    await post.save();
    await post.populate('userId', 'ad soyad email profileImage');

    res.status(201).json(post);
  } catch (error) {
    console.error('Gönderi oluşturulurken hata:', error);
    res.status(400).json({ message: 'Gönderi oluşturulurken bir hata oluştu' });
  }
});

// Gönderiyi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const { content, images, location } = req.body;
    
    post.content = content;
    post.images = images || post.images;
    post.location = location;

    await post.save();
    await post.populate('userId', 'ad soyad email profileImage');
    await post.populate('comments.userId', 'ad soyad email profileImage');

    res.json(post);
  } catch (error) {
    console.error('Gönderi güncellenirken hata:', error);
    res.status(400).json({ message: 'Gönderi güncellenirken bir hata oluştu' });
  }
});

// Gönderiyi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    await post.deleteOne();
    res.json({ message: 'Gönderi başarıyla silindi' });
  } catch (error) {
    console.error('Gönderi silinirken hata:', error);
    res.status(500).json({ message: 'Gönderi silinirken bir hata oluştu' });
  }
});

// Gönderiyi beğen/beğenmekten vazgeç
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    const likeIndex = post.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    await post.populate('userId', 'ad soyad email profileImage');
    await post.populate('comments.userId', 'ad soyad email profileImage');

    res.json(post);
  } catch (error) {
    console.error('Beğeni işlemi sırasında hata:', error);
    res.status(500).json({ message: 'Beğeni işlemi sırasında bir hata oluştu' });
  }
});

// Gönderiye yorum ekle
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    post.comments.push({
      userId: req.user._id,
      content: req.body.content
    });

    await post.save();
    await post.populate('userId', 'ad soyad email profileImage');
    await post.populate('comments.userId', 'ad soyad email profileImage');

    res.json(post);
  } catch (error) {
    console.error('Yorum eklenirken hata:', error);
    res.status(500).json({ message: 'Yorum eklenirken bir hata oluştu' });
  }
});

// Hashtag'e göre gönderi ara
router.get('/hashtag/:tag', auth, async (req, res) => {
  try {
    const tag = req.params.tag.toLowerCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ hashtags: tag })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'ad soyad email profileImage')
      .populate('comments.userId', 'ad soyad email profileImage');

    const total = await Post.countDocuments({ hashtags: tag });

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + posts.length < total
    });
  } catch (error) {
    console.error('Hashtag araması sırasında hata:', error);
    res.status(500).json({ message: 'Hashtag araması sırasında bir hata oluştu' });
  }
});

module.exports = router; 