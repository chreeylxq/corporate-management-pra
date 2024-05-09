const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //开启代理服务器，只对开发环境有作用
  devServer: {
    proxy: {
      '/adminapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    client: {
      overlay: false
    }
  }
})
