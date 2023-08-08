import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import '@/icons'
import '@/permission' // src/permission
import FormDialog from '@/components/FormDialog/index.vue'
import BossTree from '@/components/BossTree/index.vue'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.component('FormDialog', FormDialog)
Vue.component('BossTree', BossTree)
Vue.use(SlideVerify)
Vue.use(ElementUI)
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
