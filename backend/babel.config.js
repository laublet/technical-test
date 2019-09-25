module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  sourceMaps: 'inline',
  retainLines: true,
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './server/',
        rootPathPrefix: '@',
      },
    ],
  ],
};
