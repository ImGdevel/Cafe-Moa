const express = require('express');
const router = express.Router();
const Cafe = require('../models/Cafe');

// 모든 카페 조회 (GET /api/cafes)
router.get('/', async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 카페 조회 (GET /api/cafes/:id)
router.get('/:id', getCafe, (req, res) => {
  res.json(res.cafe);
});

// 새로운 카페 생성 (POST /api/cafes)
router.post('/', async (req, res) => {
  const cafe = new Cafe({
    name: req.body.name,
    location: req.body.location,
    address: req.body.address,
    seatNumber: req.body.seatNumber,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    logoImage: req.body.logoImage,
    seatImage: req.body.seatImage,
    storeImage: req.body.storeImage,
    seatId: req.body.seatId,
    notice: req.body.notice,
    cafeImages: req.body.cafeImages
  });

  try {
    const newCafe = await cafe.save();
    res.status(201).json(newCafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 카페 업데이트 (PATCH /api/cafes/:id)
router.patch('/:id', getCafe, async (req, res) => {
  if (req.body.name != null) res.cafe.name = req.body.name;
  if (req.body.location != null) res.cafe.location = req.body.location;
  if (req.body.address != null) res.cafe.address = req.body.address;
  if (req.body.seatNumber != null) res.cafe.seatNumber = req.body.seatNumber;
  if (req.body.openTime != null) res.cafe.openTime = req.body.openTime;
  if (req.body.closeTime != null) res.cafe.closeTime = req.body.closeTime;
  if (req.body.logoImage != null) res.cafe.logoImage = req.body.logoImage;
  if (req.body.seatImage != null) res.cafe.seatImage = req.body.seatImage;
  if (req.body.storeImage != null) res.cafe.storeImage = req.body.storeImage;
  if (req.body.seatId != null) res.cafe.seatId = req.body.seatId;
  if (req.body.notice != null) res.cafe.notice = req.body.notice;
  if (req.body.cafeImages != null) res.cafe.cafeImages = req.body.cafeImages;

  try {
    const updatedCafe = await res.cafe.save();
    res.json(updatedCafe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 카페 삭제 (DELETE /api/cafes/:id)
router.delete('/:id', getCafe, async (req, res) => {
  try {
    await res.cafe.remove();
    res.json({ message: 'Cafe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCafe(req, res, next) {
  let cafe;
  try {
    cafe = await Cafe.findById(req.params.id);
    if (cafe == null) {
      return res.status(404).json({ message: 'Cannot find cafe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.cafe = cafe;
  next();
}

module.exports = router;
