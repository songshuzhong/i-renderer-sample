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
  }
};
