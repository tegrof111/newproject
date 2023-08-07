import request from '@/utils/request'

const USER_URL = '/v1/user'

/**
 * @param: 用户DTO
 * @return: 成功则true CommonResponse 应答码和消息统一参考基础框架
 * @see
 * @since
 */

export function add(userDTO) {
  return request({
    url: USER_URL,
    method: 'post',
    data: userDTO
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
    url: USER_URL,
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

export function batchRemove(deleteUserDOTS) {
  return request({
    url: USER_URL + '/batchDelete',
    data: deleteUserDOTS,
    method: 'delete'
  })
}

/**
 * @param:
 * @return:
 * @see
 * @since
 */

export function modify(userDTO) {
  return request({
    url: USER_URL,
    method: 'put',
    data: userDTO
  })
}

export function batchUpdate(userDTOS) {
  return request({
    url: USER_URL + '/batchUpdate',
    method: 'put',
    data: userDTOS
  })
}

/**
 * @param:
 * @return:  CommonResponse<CommonPage<UserVO>>
 * @see
 * @since
 */

export function commonQuery(userQuery) {
  return request({
    url: USER_URL,
    method: 'get',
    params: userQuery
  })
}

export function queryUserById(id) {
  return request({
    url: USER_URL + '/' + id,
    method: 'get'
  })
}

export function queryAllRole() {
  return request({
    url: USER_URL + '/queryAllRole',
    method: 'get'
  })
}
export function queryAll() {
  return request({
    url: USER_URL + '/queryAllDepartment',
    method: 'get'
  })
}
export function queryAllPosition() {
  return request({
    url: USER_URL + '/queryAllPosition',
    method: 'get'
  })
}
export function modifyWithNewRole(userDTOS) {
  return request({
    url: USER_URL + '/modifyWithNewRole',
    method: 'put',
    data: userDTOS
  })
}

