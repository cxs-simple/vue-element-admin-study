// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
// 引入router
import router from './router'
// 引入getToken方法
import { getToken } from '@/utils/auth'
// 引入store
import store from './store'
import { Message } from 'element-ui'

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
      console.log(1111)
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
          const { roles } = await store.dispatch('user/getInfo')

          // 获取当前用户有权限可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加路由
          router.addRoutes(accessRoutes)

          // replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
          next({ ...to, replace: true})

          console.log(accessRoutes)
        } catch(error) {
          // 请求失败时，清空token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 重定向至login画面
          next(`/login?redirect=${to.path}`)
          // 导航条结束
          NProgress.done()
        }
      }
    }
  } else {
    // token不存在

    // 是否存在于放行白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 存在，放行
      console.log(55555)
      next()
    } else {
      // 不存在，重定向至login画面（带参数）
      next(`/login?redirect=${to.path}`)
      // 导航条结束
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
