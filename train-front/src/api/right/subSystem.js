// eslint-disable-next-line quotes
import request from '@/utils/request'

// eslint-disable-next-line quotes
const SUBSYSTEM_URL = '/subsystem'
/**
 * @param: 子系统DTO
 * @return: 成功则true CommonResponse 应答码和消息统一参考基础框架
 * @see
 * @since
 */

export function add(subSystemDTO) {
  return request({
    url: SUBSYSTEM_URL,
    method: 'post',
    data: subSystemDTO
  })
}

/**
 * @param:
 * @return:  CommonResponse<Boolean>
 * @see
 * @since
 */

export function remove(id, version) {
  return request({
    url: SUBSYSTEM_URL,
    params: { id: id, version: version },
    method: 'delete'
  })
}

/**
 * @param:
 * @return:  CommonResponse<Boolean>
 * @see
 * @since
 */

export function batchRemove(subSystemDTOS) {
  return request({
    url: SUBSYSTEM_URL + '/batch',
    data: subSystemDTOS,
    method: 'delete'
  })
}

/**
 * @param:
 * @return:
 * @see
 * @since
 */

export function modify(subSystemDTO) {
  return request({
    url: SUBSYSTEM_URL,
    method: 'put',
    params: subSystemDTO
  })
}

/**
 * @param:
 * @return:  CommonResponse<CommonPage<CustomerVO>>
 * @see
 * @since
 */

export function commonQuery(subSystemQuery) {
  return request({
    url: SUBSYSTEM_URL,
    method: 'get',
    params: subSystemQuery
  })
}
/**
 *
 * @param {*} subSystemQuery
 */
export function tenantQuery() {
  return request({
    url: SUBSYSTEM_URL + '/tenant',
    method: 'get'
  })
}

export function querySubSystemById(id) {
  return request({
    url: SUBSYSTEM_URL + '/' + id,
    method: 'get'
  })
}

export function querySubSystemByTenantId(tenantId) {
  return request({
    url: SUBSYSTEM_URL + '/tenantId',
    method: 'get',
    params: { tenantId: tenantId }
  })
}

