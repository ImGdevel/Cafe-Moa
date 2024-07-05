//backend/src/models/Review.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  cafeId: { type: Schema.Types.ObjectId, ref: 'Cafe' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewList: { type: Schema.Types.ObjectId, ref: 'ReviewList' }
});

module.exports = mongoose.model('Review', reviewSchema);
