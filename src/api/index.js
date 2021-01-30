// 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import JSONBIG from 'json-bigint'

Vue.use(router)
axios.defaults.baseURL = 'http://salarycalculator.shanghai-at.com:88/';
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => {
  if (res.data.code == 1) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(res);
  }
}, err => {
  console.log(err);
  return Promise.reject(err)
})

export default axios
