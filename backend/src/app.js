const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Body-parser middleware
app.use(bodyParser.json()); // JSON 형식의 요청 body 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// MongoDB 연결
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/users', userRoutes);

module.exports = app;
