import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户角色信息
export function getInfo() {
  return request({
    url: '/userinfo',
    method: 'get'
  })
}