const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  transpileDependencies: ['element-plus'],
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        filename: 'worker/[name].worker.js',
        languages: ['json'],
      }),
      new GenerateSW ({
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  }
};
