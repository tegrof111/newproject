import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { AppMain } from '@/layout/components/'

export const constantRoutes = [
  {
    path: '/login',
    // import 是一种懒加载模式
    component: () => import('@/views/login/index'),
    // component: () => import('@/views/login2/index'),
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

        meta: { title: '仪表盘', icon: '123456' },
      }
    ]
  }
  // 不能在这里使用path: '*' 的路由
]

export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: () => import('@/views/dashboard/index'),

        meta: { title: '仪表盘', icon: '123456' },
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
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
