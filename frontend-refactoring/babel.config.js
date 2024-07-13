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
            "@navigation": "./src/navigation",
            "@api": "./src/api",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@assets": "./assets",

          },
        },
      ],
    ],
  };
};
