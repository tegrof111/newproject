// 封装axios
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const BUSINESS_CODE_SUCCESS = '0'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求之前做些什么
    if (store.getters.token) {
      // 让每个请求携带token
      config.headers['accessToken'] = getToken()
    }
    // 判断请求的类型：如果是post请求就把默认参数拼到data里面；如果是get请求就拼到params里面
    if (config.method === 'post') {
      try {
        // 租户、机构、公司id全都是写死的
        config.data.tenantId = '1337940702788714496'
        config.data.orgId = '1337955940401545216'
        config.data.companyId = '1337960193258029056'
        config.data.createdBy = 1
        console.log(config.data)
      } catch (e) {
        console.log('自动注入字段错误')
        console.log(e)
      }
    }
    // 如果是get请求就拼到params里面
    if (config.method === 'get') {
      try {
        // 这里租户、机构、公司id全都是写死的
        config.params.tenantId = '1337940702788714496'
        config.params.orgId = '1337955940401545216'
        config.params.companyId = '1337960193258029056'
        config.params.createdBy = 1
        // console.log(config.data)
      } catch (e) {
        console.log('自动注入字段错误')
        console.log(e)
      }
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 应答拦截器
service.interceptors.response.use(
  (response) => {
    // 取得后端统一应答CommonResponse 其中包含Head 和 body ,head包含code,message body就是具体的业务数据
    console.debug(commonResponse)
    const commonResponse = response.data
    // 如果自定义码不是200，则定义为错误
    if (commonResponse.head.code !== BUSINESS_CODE_SUCCESS) {
      Message({
        message: commonResponse.head.message || 'error' || commonResponse.head.code,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: 非法的token; 50012: 其他客户端登录了; 50014: Token 过期;
      if (
        commonResponse.head.code &&
        (commonResponse.head.code === '50008' || commonResponse.head.code === '50012' || commonResponse.head.code === '50014')
      ) {
        // 重新登录
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(
        new Error(
          commonResponse.head.message || 'Error' || commonResponse.head.code
        )
      )
    } else {
      console.log('response', commonResponse.body)
      return commonResponse.body
    }
  },
  (error) => {
    console.log('err', error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
