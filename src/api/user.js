import request from '@/utils/request'

export function login(data) {

}

export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'GET'
})
/**
 * 保存用户信息
 * @param {Object} data {}
 * @returns
 */
export const saveUserDetailById = (data) => request({
  url: `/sys/user/${data.id}`,
  method: 'PUT',
  data
})
export function logout() {

}
