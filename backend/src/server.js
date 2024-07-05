const app = require('./app');
const config = require('./config/config');

// 포트 설정 및 서버 시작
const port = config.port;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
