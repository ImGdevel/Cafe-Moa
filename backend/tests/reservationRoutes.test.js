const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Reservation = require('../src/models/Reservation');

// Mock data for testing
const mockReservations = [
  { seatId: 'abc123', open: '2024-07-05T10:00:00Z', close: '2024-07-05T12:00:00Z', isLoad: false },
  { seatId: 'def456', open: '2024-07-05T14:00:00Z', close: '2024-07-05T16:00:00Z', isLoad: true }
];

beforeEach(async () => {
  // Clear previous test data
  await Reservation.deleteMany({});
  // Insert mock data
  await Reservation.insertMany(mockReservations);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/reservations', () => {
  it('should get all reservations', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(mockReservations.length);
  });
});

describe('POST /api/reservations', () => {
  it('should create a new reservation', async () => {
    const newReservation = {
      seatId: 'ghi789',
      open: '2024-07-06T09:00:00Z',
      close: '2024-07-06T11:00:00Z',
      isLoad: false
    };

    const res = await request(app)
      .post('/api/reservations')
      .send(newReservation);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.seatId).toEqual(newReservation.seatId);
  });
});
