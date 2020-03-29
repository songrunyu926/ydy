export default {
  sendCode: { //获取手机登录验证码
    url: '/sendcode',
    method: 'get',
    corsUrl: '/4000'
  },
  login_sms: { //手机登录
    url: '/login_sms',
    method: 'post',
    corsUrl: '/4000',
    
  },
  login_pwd: {  //账号密码登录
    url: '/login_pwd',
    method: 'post',
    corsUrl: '/4000'
  },
  autoLogin: {
    url: '/auto_login',
    method: 'get',
    corsUrl: '/4000',
    needToken: true
  }
}
