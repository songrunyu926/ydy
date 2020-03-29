import axios from "axios"
import store from '../../vuex'
import {
  Toast
} from 'vant'
import router from '../../router'

const codeMessage = {
  401: '没有权限访问接口',
  403: '禁止访问',
  404: '资源不存在',
  500: '服务器故障了，稍后重试'
}


const AxiosObj = axios.create({
  //baseURL:"http://localhost:4000",
  timeout: 15000
})


AxiosObj.interceptors.request.use(function (config) {
  //特殊情况 一般get请求只有一种方式 query或者params  这里出现了params请求 我们在拦截器中处理
  if (config.url === '/4000/position') {
    config.url = `${config.url}/${config.params.latitude},${config.params.longitude}`
    //清除query请求参数
    config.params = {}
  }
  //需要token就带上
  if (config.headers.needToken) {
    config.headers.Authorization = store.state.token
  }


  return config;
}, function (error) {
  return Promise.reject(error);
});


AxiosObj.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  let errorMessage = ''
  //先通过error.response  有没有响应  
  if (error.response) {
    errorMessage = codeMessage[error.response.status] || '未知错误'
    //在这判断响应状态码是否为401
    if (error.response.status === 401) {
      //token有问题 清空数据
      localStorage.removeItem('token')
    }
  } else {
    if (error.message.indexOf('Network Error')) {
      errorMessage = '网络断开，请检查连接'
    } else if (error.message.indexOf('timeout')) {
      errorMessage = '太卡了，换个网络'
    } else {
      errorMessage = '未知错误'
    }
  }

  //token有问题  跳转到登录页
  Toast({
    message: errorMessage,
    type: 'fail',
    duration: 4000,
    forbidClick: true,
    onClose() {
      router.replace('/login')
    }
  })

  return Promise.reject(error);
});


export default AxiosObj
