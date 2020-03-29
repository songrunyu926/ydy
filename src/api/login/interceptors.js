import axios from "axios"
import store from '../../vuex'

const AxiosObj = axios.create({
  //baseURL:"http://localhost:4000",
  timeout:15000
})


AxiosObj.interceptors.request.use(function (config) {
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
  return Promise.reject(error);
});


export default AxiosObj
