import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

// 判断角色是否有权限访问路由
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // js: some()方法用于检测数组中的元素是否满足制定条件（函数提供）
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 过滤用户可访问的路由
function filterAsyncRoutes(routes, roles) {
  const res = []
  // 循环漏油数组
  routes.forEach(route => {
    // 深拷贝当前路由
    const temp = { ...route }
    // 角色有权限访问路由时
    if (hasPermission(roles, temp)) {
      // 路由存在子路由时
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      // 路由不存在子路由时
      res.push(temp)
    }
  })
  return res
}

const actions = {
  // 获取用户可操作画面
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 管理员权限时
      if (roles.includes('admin')) {
        // 管理员可以访问所有路由
        accessedRoutes = asyncRoutes || []
      } else {
        // 根据角色进行路由过滤
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 更改router中的routes
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
