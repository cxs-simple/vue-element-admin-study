const getters = {
  roles: state => state.user.roles,
  token: state => state.user.token,
  permission_routes: state => state.permission.routes
}

export default getters
