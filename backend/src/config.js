// backend/src/config.js

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cafemoadb',
};

const path = require('path');

require('module-alias').addAlias('@src', path.resolve(__dirname, 'src'));