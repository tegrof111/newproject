import request from '@/utils/request'

const tenant_URL = '/v1/tenant'
export function add(tenantDTO) {
  return request({
    url: tenant_URL,
    method: 'post',
    data: tenantDTO
  })
}

export function remove(id, version) {
  return request({
    url: tenant_URL,
    params: { id: id, version: version },
    method: 'delete'
  })
}

export function batchRemove(deletetenantDOTS) {
  return request({
    url: tenant_URL + '/batch',
    data: deletetenantDOTS,
    method: 'delete'
  })
}

export function modify(tenantDTO) {
  return request({
    url: tenant_URL,
    method: 'put',
    data: tenantDTO
  })
}

export function batchUpdate(tenantDTOS) {
  return request({
    url: tenant_URL + '/batch',
    method: 'put',
    data: tenantDTOS
  })
}

export function commonQueryTenant(tenantQuery) {
  return request({
    url: tenant_URL,
    method: 'get',
    params: tenantQuery
  })
}

export function querytenantById(id) {
  return request({
    url: tenant_URL + '/' + id,
    method: 'get'
  })
}

export function copy(id) {
  return request({
    url: tenant_URL + '/copy',
    method: 'post',
    params: id
  })
}

export function status(tenantDTO) {
  return request({
    url: tenant_URL + '/status',
    method: 'put',
    data: tenantDTO
  })
}
