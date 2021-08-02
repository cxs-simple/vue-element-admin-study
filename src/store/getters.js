const getters = {
  roles: state => state.user.roles,
  token: state => state.user.token,
  permission_routes: state => state.permission.routes,
  sidebar: state => state.app.sidebar
}

export default getters
