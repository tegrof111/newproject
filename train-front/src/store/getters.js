const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  resources: state => state.user.resources,
  code: state => state.user.code,
  account: state => state.user.account,
  tenantId: state => state.user.tenantId,
  userId: state => state.user.userId
}
export default getters
