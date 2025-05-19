const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Tüm projeleri getir
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('userId', 'ad soyad email profileImage')
      .populate('members', 'ad soyad email profileImage')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni proje oluştur
router.post('/', auth, async (req, res) => {
  const project = new Project({
    userId: req.user._id,
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    technology: req.body.technology,
    status: req.body.status,
    images: req.body.images
  });

  try {
    const newProject = await project.save();
    await newProject.populate('userId', 'ad soyad email profileImage');
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Projeyi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }

    // Sadece proje sahibi güncelleyebilir
    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        technology: req.body.technology,
        status: req.body.status,
        images: req.body.images,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate([
      { path: 'userId', select: 'ad soyad email profileImage' },
      { path: 'members', select: 'ad soyad email profileImage' },
      { path: 'comments.userId', select: 'ad soyad email profileImage' }
    ]);

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Projeyi beğen/beğenmekten vazgeç
router.post('/:id/like', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }

    const likeIndex = project.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      project.likes.splice(likeIndex, 1);
    } else {
      project.likes.push(req.user._id);
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Projeye yorum ekle
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }

    project.comments.push({
      userId: req.user._id,
      content: req.body.comment
    });

    await project.save();
    await project.populate('comments.userId', 'ad soyad email profileImage');
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Projeye üye ekle/çıkar
router.post('/:id/members', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proje bulunamadı' });
    }

    const memberIndex = project.members.indexOf(req.body.memberId);
    if (memberIndex > -1) {
      project.members.splice(memberIndex, 1);
    } else {
      project.members.push(req.body.memberId);
    }

    await project.save();
    await project.populate('members', 'ad soyad email profileImage');
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 