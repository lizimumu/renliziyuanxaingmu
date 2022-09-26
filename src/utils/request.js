// 实现对axios 的二次封装
import axios from 'axios'
import { Message } from 'element-ui'
// 通过axios 创建实例 了另一个axios 出来
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 基础地址 */
  timeout: 5000
})
service.interceptors.response.use(response => {
  // 1.考虑把那些数据跑出去
  // 2,接口调用成功，并且业务成功
  // 3.没有成功 Promise.reject 抛出错误
  console.log(response)
  const { message, data, success } = response.data
  if (success) { /* 业务逻辑成功 */
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
