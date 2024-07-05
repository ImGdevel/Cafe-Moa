const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const app = require('../src/app');

let server;

beforeAll(async () => {
  const mongoUri = 'mongodb://localhost:27017/test'; // 테스트용 데이터베이스
  if (mongoose.connection.readyState === 0) { // 연결이 없으면 연결 시도
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  server = app.listen(3001); // 테스트용 서버 시작
});

afterAll(async () => {
  await mongoose.disconnect(); // 테스트 후 MongoDB 연결 해제
  await server.close(); // 테스트용 서버 종료
});

afterEach(async () => {
  await User.deleteMany({}); // 각 테스트 후 User 컬렉션 데이터 제거
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'securepassword',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toEqual('johndoe');
    expect(res.body.email).toEqual('johndoe@example.com');

    // 데이터베이스에서 데이터 확인
    const user = await User.findOne({ email: 'johndoe@example.com' });
    expect(user).not.toBeNull();
    expect(user.username).toEqual('johndoe');
  });

  it('should get all users', async () => {
    await User.create({
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
    });
    await User.create({
      username: 'user2',
      email: 'user2@example.com',
      password: 'password456',
    });

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0].username).toEqual('user1');
    expect(res.body[1].username).toEqual('user2');

    // 데이터베이스에서 데이터 확인
    const users = await User.find({});
    expect(users.length).toEqual(2);
    expect(users[0].username).toEqual('user1');
    expect(users[1].username).toEqual('user2');
  });
});
