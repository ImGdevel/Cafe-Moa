//backend/src/models/Cafe.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cafeSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, default: null },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: { type: [Number], required: true }
  },
  address: { type: String, required: true },
  seatNumber: { type: Number, required: true },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
  logoImage: { type: String },
  seatImage: { type: String },
  storeImage: { type: String },
  seatId: { type: Schema.Types.ObjectId },
  notice: { type: String },
  distance: { type: Number },
  rating: { type: Number, default: 0 },
  review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  reviewCount: { type: Number, default: 0 },
  visitors: { type: Number, default: 0 },
  now: { type: Number, default: 0 },
  cafeImages: [{ type: String }]
});

cafeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Cafe', cafeSchema);
