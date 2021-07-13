// 引入进度条
import NProgress from 'nprogress'
// 引入router
import router from './router'
// 引入getToken方法
import { getToken } from '@/utils/auth'
// 引入store
import store from './store'

/** token不存在时放行白名单 */
const whiteList = ['/login']

// 关闭加载旋转器
NProgress.configure({ showSpinner: false})

// 全局路由前置守卫
router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 获取token值
  const hasToken = getToken()

  // token存在
  if (hasToken) {
    // 判断迁移画面是否为login画面
    if(to.path == '/login') {
      // 放行迁移至主页
      next({ path: '/'})
      // 导航条结束
      NProgress.done()
    } else {
      // 判断是否有权限迁移画面
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      // 有权限
      if(hasRoles) {
        // 放行
        next()
      } else {
        // 无权限
        try {
          // 获取当前用户权限

        } catch(error) {

        }
      }
    }
  } else {
    // token不存在

    // 是否存在于放行白名单中
    if (whiteList.indexOf(to.path) != -1) {
      // 存在，放行
      next()
    } else {
      // 不存在，重定向与login画面（带参数）
      next(`/login?redirect=${to.path}`)
      // 导航条结束
      NProgress.done()
    }
  }
})
