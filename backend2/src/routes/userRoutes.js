const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 유저 생성 (POST /api/users)
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 유저 조회 (GET /api/users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 유저 상세 조회 (GET /api/users/:id)
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// 유저 수정 (PATCH /api/users/:id)
router.patch('/:id', getUser, async (req, res) => {
  const { username, email, password } = req.body;
  if (username != null) res.user.username = username;
  if (email != null) res.user.email = email;
  if (password != null) res.user.password = password;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 유저 삭제 (DELETE /api/users/:id)
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware: 유저 객체를 가져오는 함수
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
