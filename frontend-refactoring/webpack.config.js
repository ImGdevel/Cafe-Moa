const { createWebpackConfigAsync } = require('@expo/webpack-config');
const Dotenv = require('dotenv-webpack');

module.exports = async function(env, argv) {
  const config = await createWebpackConfigAsync(env, argv);
  config.plugins = config.plugins || [];
  
  // dotenv-webpack 설정 추가
  config.plugins.push(new Dotenv({
    path: './.env', // '.env' 파일의 경로
    systemvars: true
  }));

  return config;
};
