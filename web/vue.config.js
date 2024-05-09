const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  //开启代理服务器， 只对开发环境有作用
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000', //实际跨域请求的API地址
        changeOrigin: true, //跨域
      }
    },
    client: {
      overlay: false, //当出现编译错误时，不在浏览器中显示全屏覆盖
    }
  }
})
