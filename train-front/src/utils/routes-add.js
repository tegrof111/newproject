// 循环遍历数据返回菜单，指定路由
import router from '@/router'
import { constantRoutes } from '@/router'

// 获取组件
export const components = {
  '@/layout': () => import('@/layout'),
  '@/views/bg/role/index': () => import('@/views/bg/role/index')
}
/**
 * 循环遍历资源，获取当前菜单组
 * @param {*} resources 用户资源
 * @param {*} parent 父节点数组
 * @returns 返回当前菜单组
 */ // 2800
export function getMenus(resources, parent) {
  // 登录用户的资源为空
  if (resources === undefined || resources === null) {
    resources = []
  }
  // 初始化父节点数组为空，并给newParent赋值(parent为null,newParent为[])
  const newParent = parent === null || parent === [] ? [] : parent
  console.log('parent', parent)
  console.log('newParent', newParent)
  // 循环遍历当前所有的菜单资源并且导入item数组
  for (let i = 0; i < resources.length; i++) {
    const item = resources[i]
    // console.log('item', item)
    // 如果为按钮，则跳出循环
    if (item.resourceType === 1) {
      continue
    }
    // console.log('i:--------------------', i)

    // 定义路由为空
    let route = null
    // 若存在父结点，则将其push进children
    if (parent !== undefined && parent != null) {
      if (newParent.children === undefined || newParent.children === null) {
        newParent.children = []
      }
      // 路由
      route = {
        // 路由路径，用空替换
        path: item.api.replaceAll('/', ''),
        // 映射的组件使用resource的url（/resource），通过已提前加载的components数组获取
        component: components[item.url],
        // 路由元信息
        meta: {
          // 菜单标题
          title: item.name,
          // 菜单图标
          icon: item.openImg
        },
        children: []
      }
      // 通过递归调用获取item的子菜单，并push进newParent.children
      newParent.children.push(getMenus(item.resourceVOs, route))
    } else {
      // 若不存在父结点，则为根结点
      route = {
        // 路由路径
        path: item.api,
        // 映射的组件使用resource的url（/resource），通过已提前加载的components数组获取
        component: components[item.url],
        // 路由名称
        name: item.name,
        // 路由元信息
        meta: {
          // 菜单标题
          title: item.name,
          // 菜单图标
          icon: item.openImg
        },
        //
        children: []
      }
      // 通过递归调用获取其与子菜单，并push进newParent
      newParent.push(getMenus(item.resourceVOs, route))
    }
  }
  // 返回当前菜单组
  console.log(newParent)
  return newParent
}
/**
 * 根据资源菜单添加路由
 * @param {*} resources 获取的用户资源
 */
function addRoutesByResources(resources) {
  try {
    // console.log(router.options.routes)
    // console.log(resources)
    // 从资源列表获取菜单
    const menus = getMenus(resources, null)
    console.log(menus)
    // 通过菜单新增、删除和更新路由
    addOrUpdateRoutes(menus)
  } catch (e) {
    console.log('动态加载路由出错')
    console.log(e)
  }
}
/**
 * 更新或添加路由
 * @param {*} menus 已经获取的菜单资源
 */
function addOrUpdateRoutes(menus) {
  // 需要被删除的上一位用户的资源路由数组
  const oldRoutePaths = []
  // 默认路由数组
  const defaultPaths = []
  // 遍历顶层数组
  for (let i = 0; i < constantRoutes.length; i++) {
    const item = constantRoutes[i]
    // 1、将默认路由添加到默认路径
    defaultPaths.push(item.path)
  }
  // 2、删除旧的用户资源里面当前用户没有的部分
  // 查找旧路由顶层的path
  for (let i = 0; i < router.options.routes.length; i++) {
    const path = router.options.routes[i].path
    // 将没有在当前用户菜单和固定路由里的路径push进oldRoutePaths
    if (!itemInArray(path, menus) && !itemInArray(path, defaultPaths)) {
      oldRoutePaths.push(path)
    }
  }
  // 遍历删除没有在当前用户菜单和固定路由里的路径
  for (let i = 0; i < router.options.routes.length; i++) {
    const path = router.options.routes[i].path
    // 将没有在当前用户菜单和固定路由里的路径，即oldRoutePaths里的路径删除、
    if (itemInArray(path, oldRoutePaths)) {
      router.options.routes.splice(i, 1)
    }
  }
  // 3、更新重复的路由
  const dumplingPaths = []
  // 用双重循环更新路由，找出重复的菜单
  for (let i = 0; i < router.options.routes.length; i++) {
    const route = router.options.routes[i]
    for (let j = 0; j < menus.length; j++) {
      const menu = menus[j]
      // 将重复的组员路径Push进dumplingPaths路由数组
      if (menu.path === route.path) {
        router.options.routes[i] = menu
        dumplingPaths.push(menu.path)
      }
    }
  }
  // 将dumplingPaths路由数组更新到menu中
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (!itemInArray(menu.path, dumplingPaths)) {
      router.options.routes.push(menu)
    }
  }
  // 加载资源
  router.addRoutes(menus)
}
/**
 * 判断item是否在array数组中
 * @param {*} item 被判断的资源
 * @param {*} array 对比的资源
 * @returns 如果item在array数组中，则返回true,否则返回false
 */
function itemInArray(item, array) {
  try {
    // console.log('item', item)
    // console.log('array', array)
    // console.log('array.length', array.length)
    for (let i = 0; i < array.length; i++) {
      const value = array[i]
      if (value === item) {
        return true
      }
    }
  } catch (e) {
    console.log(e)
  }
  return false
}

export default addRoutesByResources
