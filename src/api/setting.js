import request from '@/utils/request'

export
const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  })
}
/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

