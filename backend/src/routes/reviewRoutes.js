const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Cafe = require('../models/Cafe');
const User = require('../models/User');

// 모든 리뷰 조회 (GET /api/reviews)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 카페의 리뷰 조회 (GET /api/reviews/cafe/:cafeId)
router.get('/cafe/:cafeId', async (req, res) => {
  try {
    const reviews = await Review.find({ cafeId: req.params.cafeId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 사용자의 리뷰 조회 (GET /api/reviews/user/:userId)
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 새로운 리뷰 생성 (POST /api/reviews)
router.post('/', async (req, res) => {
  const { cafeId, userId, rating, comment } = req.body;

  try {
    const cafe = await Cafe.findById(cafeId);
    if (!cafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReview = new Review({
      cafeId,
      userId,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    cafe.review.push(savedReview._id);
    cafe.rating = calculateAverageRating(cafe);
    await cafe.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 리뷰 삭제 (DELETE /api/reviews/:id)
router.delete('/:id', getReview, async (req, res) => {
  try {
    await res.review.remove();
    
    // Remove review reference from cafe
    const cafe = await Cafe.findById(res.review.cafeId);
    if (cafe) {
      cafe.review.pull(res.review._id);
      cafe.rating = calculateAverageRating(cafe);
      await cafe.save();
    }

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReview(req, res, next) {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.review = review;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Helper function to calculate average rating of a cafe
function calculateAverageRating(cafe) {
  let totalRating = 0;
  cafe.review.forEach(reviewId => {
    // Assuming each review has a 'rating' field
    totalRating += review.rating;
  });
  return totalRating / cafe.review.length;
}

module.exports = router;
