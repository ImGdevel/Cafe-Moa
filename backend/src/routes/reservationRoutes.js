const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// 모든 예약 조회 (GET /api/reservations)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 예약 조회 (GET /api/reservations/:id)
router.get('/:id', getReservation, (req, res) => {
  res.json(res.reservation);
});

// 새로운 예약 생성 (POST /api/reservations)
router.post('/', async (req, res) => {
  const reservation = new Reservation({
    open: req.body.open,
    close: req.body.close,
    timeTable: req.body.timeTable,
    seatId: req.body.seatId,
    isLoad: req.body.isLoad
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 예약 업데이트 (PATCH /api/reservations/:id)
router.patch('/:id', getReservation, async (req, res) => {
  if (req.body.open != null) res.reservation.open = req.body.open;
  if (req.body.close != null) res.reservation.close = req.body.close;
  if (req.body.timeTable != null) res.reservation.timeTable = req.body.timeTable;
  if (req.body.seatId != null) res.reservation.seatId = req.body.seatId;
  if (req.body.isLoad != null) res.reservation.isLoad = req.body.isLoad;

  try {
    const updatedReservation = await res.reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 특정 예약 삭제 (DELETE /api/reservations/:id)
router.delete('/:id', getReservation, async (req, res) => {
  try {
    await res.reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReservation(req, res, next) {
  let reservation;
  try {
    reservation = await Reservation.findById(req.params.id);
    if (reservation == null) {
      return res.status(404).json({ message: 'Cannot find reservation' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.reservation = reservation;
  next();
}

module.exports = router;
