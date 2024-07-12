module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@components": "./components",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
