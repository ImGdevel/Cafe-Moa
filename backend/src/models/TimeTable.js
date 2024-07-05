//backend/src/models/TimeTable.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeTableSchema = new Schema({
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  timeArray: [{
    type: Schema.Types.ObjectId,
    ref: 'SeatTable'
  }]
});

module.exports = mongoose.model('TimeTable', timeTableSchema);
