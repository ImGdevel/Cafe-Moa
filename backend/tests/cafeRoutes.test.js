const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cafe = require('../src/models/Cafe');

// Mock data for testing
const mockCafes = [
  { name: 'Cafe A', location: '37.1234, 127.5678', address: '123 Cafe St', seatNumber: 20, openTime: 8, closeTime: 20 },
  { name: 'Cafe B', location: '37.4321, 127.8765', address: '456 Coffee Ave', seatNumber: 15, openTime: 9, closeTime: 21 }
];

beforeEach(async () => {
  // Clear previous test data
  await Cafe.deleteMany({});
  // Insert mock data
  await Cafe.insertMany(mockCafes);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/cafes', () => {
  it('should get all cafes', async () => {
    const res = await request(app).get('/api/cafes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(mockCafes.length);
  });
});

describe('POST /api/cafes', () => {
  it('should create a new cafe', async () => {
    const newCafe = {
      name: 'New Cafe',
      location: '37.5678, 127.9876',
      address: '789 Java Blvd',
      seatNumber: 25,
      openTime: 10,
      closeTime: 22
    };

    const res = await request(app)
      .post('/api/cafes')
      .send(newCafe);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(newCafe.name);
  });
});

// Add more test cases as needed for other endpoints like GET /api/cafes/:id, PATCH /api/cafes/:id, DELETE /api/cafes/:id

