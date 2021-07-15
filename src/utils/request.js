import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth'

// 创建axios实例
const service = axios.create({
  // 获取环境的baseURL
  baseURL: process.env.VUE_APP_BASE_API,
  //  请求过期事件
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // Token令牌
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    const res = response.data

    // 响应失败时
    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 4002: token不合法
      if (res.code === 4002) {
        MessageBox.confirm('您已经退出，可以继续留在该页面或选择重新登录。', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除token
          store.dispatch('user/restToken').then(() => {
            // windows自带方法：重新加载页面
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg) || 'Error')
    } else {
      return res
    }
  }
)

export default service