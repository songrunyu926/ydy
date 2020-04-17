export default {
  //获取短信验证码
  sendCode: { 
    url: '/plus/sys/getCode',
    method: 'post',
    corsUrl: '/test'
  },
  //手机号注册
  registerByMobile: { 
    url: '/plus/sys/addUser',
    method: 'post',
    corsUrl: '/test',
    
  },
  autoLogin: {
    url: '/auto_login',
    method: 'get',
    corsUrl: '/4000',
    needToken: true
  }
}
