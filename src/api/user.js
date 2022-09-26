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

export function logout() {

}
