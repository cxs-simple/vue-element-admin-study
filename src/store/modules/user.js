import { getToken, setToken } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

// 数据
const state = {
  // token
  token: getToken(),
  // 角色权限
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    // 从参数中解构出username和password
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 登录者信息
      const loginData = {username: username.trim(), password: password}
      login(loginData).then(response => {
        const { data } = response
        // 调用mutatisons里的方法改变state中的token数据
        commit('SET_TOKEN', data.token)
        // 将token放入cookies
        setToken(data.token)
        // 异步请求成功时调用resolve()方法
        resolve()
      }).catch(error => {
        console.log(error)
        // 异步请求失败时调用inject()方法
        reject(error)
      })
    })
  },

  // 获取用户权限信息
  getInfo() {
    return new Promise((resolve, reject) => {
      // 调用api获取用户权限信息
      getInfo().then(response => {
        console.log(response)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}