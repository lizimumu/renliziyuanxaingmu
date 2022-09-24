// 实现对axios 的二次封装
import axios from 'axios'
// 通过axios 创建实例 了另一个axios 出来
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 基础地址 */
  timeout: 5000
})
export default service
