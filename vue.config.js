const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  transpileDependencies: ['element-plus'],
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        filename: 'worker/[name].worker.js',
        languages: ['json', 'less', 'javascript', 'html'],
      }),
      new GenerateSW ({
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  },
  devServer: {
    before(app) {
      app.use('/page.json', (req, res, next) => {
        const originalSend = res.send;
        res.send = function(body) {
          const serverData = {
            serverTime: new Date().getTime(),
          };
          const modifiedBody = body
            .toString()
            .replace('"pageIcon": ""', `"pageIcon": "", "pageData": ${JSON.stringify(serverData)}`);
          originalSend.call(res, modifiedBody);
        };
        next();
      });
    }
  }
};
