import { asyncRoutes, constantRoutes } from '@/router'
import { fetchUserMenuList } from '@/api/authentication'
import Layout from '@/layout'

// 静态路由懒加载
export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}.vue`], resolve)
}

// 把从后端返回的菜单数据拼装成路由格式的数据
export function generaMenu(routes, data) {
  data.forEach((item) => {
    const menu = {
      path: item.url,
      component: item.component === '#' ? Layout : loadView(item.component),
      hidden: item.status === 0,
      redirect: item.redirect,
      children: [],
      name: item.code,
      meta: item.meta
    }

    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
  return routes
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // 拼接静态路由和动态路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, token) {
    return new Promise((resolve) => {
      // 通过token从后端获取用户菜单，并加入全局状态
      fetchUserMenuList(token)
        .then((res) => {
          const menuData = Object.assign([], res.data)
          const tempAsyncRoutes = Object.assign([], asyncRoutes)
          const accessedRoutes = generaMenu(tempAsyncRoutes, menuData)

          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
