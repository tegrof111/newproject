import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const CodeKey = 'vue_admin_template_code'
const AccountKey = 'vue_admin_template_account'
const USERIdKey = 'vue_admin_template_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCode() {
  return Cookies.get(CodeKey)
}

export function setCode(code) {
  return Cookies.set(CodeKey, code)
}

export function removeCode() {
  return Cookies.remove(CodeKey)
}

export function getAccount() {
  return Cookies.get(AccountKey)
}

export function setAccount(account) {
  return Cookies.set(AccountKey, account)
}

export function removeAccount() {
  return Cookies.remove(AccountKey)
}

export function getUserId() {
  return Cookies.get(USERIdKey)
}

export function setUserId(id) {
  return Cookies.set(USERIdKey, id)
}

export function removeUserId() {
  return Cookies.remove(USERIdKey)
}
