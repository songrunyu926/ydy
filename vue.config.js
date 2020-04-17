module.exports = {
  devServer: {
    port: 9000,
    open: true,
    proxy: {
      // /platform-admin 代表一个服务器 填什么无所谓  /platform-admin 会被重写 替换成 空 拼接出来的地址 例如http://10.20.143.132:8888/platform-admin/plus/sys/getCode
      '/test': {
        target: 'http://10.20.143.132:8888/platform-admin',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/test': '' // 重写地址
        },
      }
    }
  }
}
