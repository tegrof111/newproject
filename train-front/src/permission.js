// 请求侧边栏资源，从routes-add引入
import router from './router'
import store from './store'
import { Message } from 'element-ui'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// get token from cookie
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import addRoutesByResources from '@/utils/routes-add'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
router.onReady(() => {
  // 如果已经登录存在资源就可以直接登录，初次登录不调用这个
  if (store.getters.resources) {
    console.log(store.getters.resources)
    const resources = store.getters.resources
    addRoutesByResources(resources)
  }
  router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
})

// 路由访问拦截，对进入的路由请求进行拉取，登录认证成功了进入主页被拦截然后请求后端权限完成动态路由
router.beforeEach(async (to, from, next) => {
  console.log(3, 'beforeEach')

  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  // 确认是否登录
  const hasToken = getToken()

  console.log('router-check-token', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // 如果登录了，定位到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息，资源列表
          console.log(4, 'info')
          await store.dispatch('user/getInfo')
          // 需要在store添加对应方法、参数，并且需要在Commit之后调用
          if (store.getters.resources) {
            // 动态添加路由
            console.log(store.getters.resources)
            const resources = store.getters.resources
            // 根据资源列表添加路由
            addRoutesByResources(resources)
          }
          router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
          next()
        } catch (error) {
          // 取走令牌，重返登录页面
          await store.dispatch('user/resetToken')
          await store.dispatch('user/resetCodeAndAccount')
          await store.dispatch('user/resetUserId')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果白名单为空，路由跳转
      next()
    } else {
      // 如果其他页面没有权限，退回登录页面
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
