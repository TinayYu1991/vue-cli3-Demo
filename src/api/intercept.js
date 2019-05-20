import axios from 'axios'

const RESPONSE = {
  SUCCESS: 0,   // 成功
  FAILURE: 1,   // 错误
  ERROR: 2,     // 历史原因，一些错误会使用这个code
  INTERRUPT: 3,   // 登录信息过期
  NO_EXPAND: 4,   // 未开户
  BALANCE_NOT_ENOUGH: 5,   // 余额不足
  NO_BANKCARD: 6,   // 未绑卡
  NO_ACCREDIT: 8,   // 未授权
  RETRY_PAY: 4000
}

let os = 'wap'
// if (device.isApp) {
//   if (device.isAndroid) {
//     os = 'android_wap'
//   } else if (device.isIos) {
//     os = 'ios_wap'
//   }
// }

const service = axios.create({
  // 设置超时时间
  timeout: 60000
})


/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    os: os,
    longTtl: true
    // ...getUserInfo()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  const { data } = response
  // 开户注册页不需要跳回原来的页面
  // let redirectUrl = location.href.indexOf('register') ? '' : encodeURIComponent(location.href)
  // let noencodeUrl = location.href
  if (data.code === RESPONSE.SUCCESS) {
    return Promise.resolve(data)
  } else {

    switch (data.code) {
      case RESPONSE.NO_EXPAND:
        console.log('请您先进行实名认证')
        // setTimeout(() => this.$klg.redirect.redirectExpand(), 1000)
        break
      case RESPONSE.NO_BANKCARD:
        console.log('请您先绑定银行卡')
        // BindCardDialog({ redirectUrl })
        break
      case RESPONSE.NO_ACCREDIT:
        console.log('请您先授权')
        // AccreditDialog({ messages: body.msg, redirectUrl: noencodeUrl })
        break
      case RESPONSE.INTERRUPT:
        console.log('登录信息过期')
        // setTimeout(() => {
        //   // 移除本地缓存用户信息
        //   localStorage.removeItem('kllc_autoInfo')
        //   redirectLogin({
        //     query: {
        //       redirect_uri: redirectUrl
        //     }
        //   })
        // }, 1000)
        break
      default: 
        console.log(data.msg || '抱歉，考拉打瞌睡了')
        break
    }
    return Promise.reject(data)
  }

}, error => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  console.log('抱歉，考拉打瞌睡了')
  return Promise.reject(error)
})

export default service
