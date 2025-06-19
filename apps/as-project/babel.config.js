module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true, // 是否将 Babel 工具函数提取为单独的导入
        regenerator: true, // 是否转换 generator 函数
        useESModules: true, // 是否使用 ES 模块格式的 helper
      },
    ],
  ]
}
