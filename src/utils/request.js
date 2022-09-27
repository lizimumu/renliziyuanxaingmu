// 实现对axios 的二次封装
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
const Timeout = 3600 /* s */
// 对比时间是不是超时
function IsCheckTimeOut() {
  const currenttTime = new Date().getTime() // 时间2，接口调用的时间
  const timeStamp = (currenttTime - store.getters.hrssaasTime) / 1000
  return timeStamp > Timeout /* true超时 */
}
// 通过axios 创建实例 了另一个axios 出来
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 基础地址 */
  timeout: 5000
})
// console.log(store)
// !请求拦截器
service.interceptors.request.use(config => {
  // console.log(config)
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, errors => {
  return Promise.reject(errors)
})
//! 响应拦截器
service.interceptors.response.use(response => {
  // 1.考虑把那些数据跑出去
  // 2,接口调用成功，并且业务成功
  // 3.没有成功 Promise.reject 抛出错误
  // console.log(response)
  const { message, data, success } = response.data
  if (success) { /* 业务逻辑成功 */
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  Message.error(error.message)
  return Promise.reject(error)
})
export default service

