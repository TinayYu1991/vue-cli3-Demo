module.exports = {
  devServer: {
    proxy: {
      "/activity/api": {
        "target": "http://app.jason.alpha.dev1.kaolalicai.cn",
        "changeOrigin": true
      },
      "/api/v1": {
        "target": "http://app.jason.alpha.dev1.kaolalicai.cn",
        "changeOrigin": true
      },
      "/api/v2": {
        "target": "http://app.jason.alpha.dev1.kaolalicai.cn",
        "changeOrigin": true
      },
      "/msite": {
        "target": "http://app.jason.alpha.dev1.kaolalicai.cn",
        "changeOrigin": true
      }
    }
  }
  // chainWebpack: config => {
  //   // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
  //   config.plugin('define').tap(args => {
  //     args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
  //     return args
  //   })
  // }
}
