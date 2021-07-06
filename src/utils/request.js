import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // 获取环境的baseURL
  baseURL: process.env.VUE_APP_BASE_API,
  //  请求过期事件
  timeout: 5000
})

export default service