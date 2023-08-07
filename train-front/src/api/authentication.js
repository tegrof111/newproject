import request from '@/utils/request'

// 前端发起登录请求的时候调用此接口，在/store/moudle/user.js 中发起调用
export function login(data) {
  return request({
    url: '/v1/user/login',
    method: 'get',
    params: data
  })
}
// 登录认证成功后，进入主控制台的时候，在/store/moudle/permission.js的router拦截器中发起用户信息获取的调用，这些信息包含了角色和资源列表
export function getInfo(data) {
  return request({
    url: '/v1/user/info',
    method: 'get',
    params: data
  })
}
// 通知后端用户退出登录，做相应前后端的状态清除，包括前端store后端token等
export function logout(data) {
  return request({
    url: '/v1/user/logout',
    method: 'get',
    params: data
  })
}
