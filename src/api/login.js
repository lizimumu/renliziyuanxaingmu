// 引入axios
import request from '@/utils/request'
/**
 *
 * @param {Object} data 用户账号和密码
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
