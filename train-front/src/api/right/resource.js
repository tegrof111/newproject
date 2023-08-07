import request from '@/utils/request'

const RESOURCE_URL = '/resource'
// 增加或者修改菜单资源需要取得填写子系统因此这里发起对子系统的接口的请求

/**
 *  初始化使调用此方法加载系统的树
 * @param {*} ResourceQuery 
 */
export function treeQuery(ResourceQuery) {
  return request({
    url: RESOURCE_URL + '/tree',
    method: 'get',
    params: ResourceQuery
  })
}
