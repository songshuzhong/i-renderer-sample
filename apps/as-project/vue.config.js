const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  transpileDependencies: ['element-plus'],
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.mjs', '.js', '.vue', '.json']
    },
    plugins: [
      new MonacoWebpackPlugin({
        filename: 'worker/[name].worker.js',
        languages: ['json', 'less', 'html', 'javascript', 'css', 'typescript'],
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          isCustomElement: tag => ['wc-input', 'wc-card', 'wc-footer'].includes(tag)
        }
        return options
      })
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('/chart.json', (req, res, next) => {
        const originalSend = res.send;
        res.send = function(body) {
          const data = {server: {url: 'chart', timestamp: Date.now()}};
          const modifiedBody = body.toString().replace('"pageDesc": null,', `"pageDesc": null,"pageData": ${JSON.stringify(data)},`);
          return originalSend.call(this, modifiedBody.toString());
        };
        next();
      });
      devServer.app.get('/page4.json', (req, res, next) => {
        const originalSend = res.send;
        res.send = function(body) {
          const data = {server: {url: 'page4', timestamp: Date.now()}};
          const modifiedBody = body.toString().replace('"pageDesc": null,', `"pageDesc": null,"pageData": ${JSON.stringify(data)},`);
          return originalSend.call(this, modifiedBody.toString());
        };
        next();
      });
      devServer.app.post('/uploadImages', (_, response) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          response.send({
            status: 200,
            message: 'success',
            data: 'https://pic4.zhimg.com/v2-14e5e0e040ec85a8e5f654501eb6fd7d_1440w.jpg'
          });
        }, 2000);
      });
      devServer.app.post('/api/file/upload', (_, response) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          response.send({
            status: 200,
            message: 'received file chunk',
          });
        }, 2000);
      });
      devServer.app.post('/api/file/merge', (_, request, response) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          response.send({
            status: 200,
            message: '上传成功',
            data: {
              filehash: request.body.filehash,
              name: request.body.name
            }
          });
        }, 2000);
      });
      devServer.app.get('/api/file/verify', (_, request, response) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          response.send({
            status: 200,
            message: '上传成功'
          });
        }, 2000);
      });
      middlewares.unshift({
        name: 'upload',
        path: '/uploadImage',
        middleware: (req, res) => {
          res.send({
            status: 200,
            message: 'success',
            data: '31412341'
          });
        },
      });
      return middlewares;
    },
    proxy: {
      '/uploadImage.json': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        router: app => {
          app.get('/chart.json', (_, response) => {
            console.log('__________+++++++_________');
          });
          app.get('/uploadImage.json', (req, res) => {
            res.json({
              status: 200,
              message: 'success',
              data: 'asdfasfasfasdf'
            })
          })
        }
      }
    },
    client: {
      overlay: false
    }
  },
};
