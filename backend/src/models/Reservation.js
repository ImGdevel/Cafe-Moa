//backend/src/models/Reservation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  open: { type: Date, default: null },
  close: { type: Date, default: null },
  timeTable: { type: Schema.Types.ObjectId, ref: 'TimeTable' },
  seatId: { type: Schema.Types.ObjectId },
  isLoad: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reservation', reservationSchema);
