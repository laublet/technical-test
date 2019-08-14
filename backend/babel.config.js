module.exports = {
  presets: [ '@babel/preset-env', ],
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
