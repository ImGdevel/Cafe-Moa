const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Review = require('../src/models/Review');
const Cafe = require('../src/models/Cafe');
const User = require('../src/models/User');

// Mock data for testing
let mockCafe;
let mockUser;

beforeEach(async () => {
  // Clear previous test data
  await Review.deleteMany({});
  await Cafe.deleteMany({});
  await User.deleteMany({});

  // Insert mock data for Cafe and User
  mockCafe = await Cafe.create({ name: 'Mock Cafe', location: '37.7777, 127.8888', address: '789 Cafe Blvd', seatNumber: 30, openTime: 9, closeTime: 21 });
  mockUser = await User.create({ name: 'Mock User', email: 'mockuser@example.com', password: 'password123' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/reviews', () => {
  it('should get all reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0); // No reviews initially
  });
});

describe('POST /api/reviews', () => {
  it('should create a new review', async () => {
    const newReview = {
      cafeId: mockCafe._id,
      userId: mockUser._id,
      rating: 4,
      comment: 'Nice place to hang out'
    };

    const res = await request(app)
      .post('/api/reviews')
      .send(newReview);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.rating).toEqual(newReview.rating);
  });
});

