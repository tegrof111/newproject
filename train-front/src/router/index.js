import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入Layout
import Layout from '@/layout'
// import { AppMain } from '@/layout/components/'

// 通用路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '仪表盘', icon: '123456' }
      }
    ]
  }
]
// 动态路由，根据角色权限
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '仪表盘', icon: '123456' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

// 定义滚轮固定，刷新以后回到顶部
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
// 使用
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
