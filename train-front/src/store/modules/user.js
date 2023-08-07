import { login, logout, getInfo } from '../../api/authentication'
import {
  getToken,
  setToken,
  removeToken,
  getCode,
  setCode,
  removeCode,
  getAccount,
  setAccount,
  removeAccount,
  getUserId,
  setUserId,
  removeUserId
} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    code: getCode(),
    account: getAccount(),
    name: '',
    avatar: '',
    resources: [],
    hassetroutes: false,
    tenantId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_RESOURCES: (state, resources) => {
    state.resources = resources
  },
  SET_TENANTID: (state, tenantId) => {
    state.tenantId = tenantId
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { code, account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ code: code, account: account.trim(), password: password })
        .then((response) => {
          console.log('444')
          console.log(response)
          const { data } = response
          console.log(data)
          if (!data.token) {
            reject()
          }
          console.log(1)
          commit('SET_TOKEN', data.token)
          commit('SET_CODE', code)
          commit('SET_ACCOUNT', account)
          commit('SET_USERID', response.id)
          setUserId(response.id)
          setToken(data.token)
          setCode(code)
          setAccount(account)
          console.log('===>token=' + data.token)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ code: state.code, account: state.account })
        .then((response) => {
          console.log('===>', response)
          const { data, tenantId } = response
          console.log('===>', data)

          if (!data) {
            return reject('用户没有权限请联系管理员授权!')
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_TENANTID', tenantId)
          console.log(name + ' ==> ' + avatar)
          if (data.resourceVO === undefined || data.resourceVO === null) {
            commit('SET_RESOURCES', [])
          } else {
            let resourceVOs = []
            data.resourceVO.map((item) => {
              console.log(item.api)
              //通过SET_RESOURCES 把当前用户路由菜单添加到 store resources
              if (item.api.includes('CENTRESYSTEM')) {
                commit('SET_RESOURCES', item.resourceVOs)
              }
            })
          }

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ id: getUserId() })
        .then(() => {
          removeToken() // must remove  token  first
          removeUserId()
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  resetCodeAndAccount({ commit }) {
    return new Promise((resolve) => {
      removeCode()
      removeAccount()
      commit('RESET_STATE')
      resolve
    })
  },

  resetUserId({ commit }) {
    return new Promise((resolve) => {
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
