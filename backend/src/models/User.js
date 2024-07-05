// backend/src/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
  image: { type: String },
  bookmark: [{ type: Schema.Types.ObjectId, ref: 'Cafe' }],
  review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('User', userSchema);
