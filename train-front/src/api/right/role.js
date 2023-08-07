import request from '@/utils/request'

const ROLE_URL = '/v1/role'

export function getUserResource(params) {
  return request({
    url: ROLE_URL + '/queryUserResource',
    method: 'get',
    params
  })
}

export function add(RoleDTO) {
  return request({
    url: ROLE_URL,
    method: 'post',
    data: RoleDTO
  })
}

export function remove(id, version) {
  return request({
    url: ROLE_URL,
    method: 'delete',
    params: { id: id, version: version }
  })
}

export function batchRemove(RoleDTOs) {
  return request({
    url: ROLE_URL + '/batch',
    method: 'delete',
    data: RoleDTOs
  })
}

export function modify(data) {
  return request({
    url: ROLE_URL,
    method: 'put',
    data
  })
}

export function copy(id) {
  return request({
    url: ROLE_URL + '/copy',
    method: 'post',
    params: { id: id }
  })
}

export function commonQuery(RoleQuery) {
  return request({
    url: ROLE_URL,
    method: 'get',
    params: RoleQuery
  })
}

export function queryRoleById(id) {
  return request({
    url: ROLE_URL + '/' + id,
    method: 'get'
  })
}

export function commonQueryUser(userQuery) {
  return request({
    url: ROLE_URL + '/commonQueryUser',
    method: 'get',
    params: userQuery
  })
}

export function assignUser(userRoleDTO) {
  return request({
    url: ROLE_URL + '/assignUser',
    method: 'post',
    data: userRoleDTO
  })
}

export function assignResource(roleResourceDTO) {
  return request({
    url: ROLE_URL + '/assignResource',
    method: 'post',
    data: roleResourceDTO
  })
}

