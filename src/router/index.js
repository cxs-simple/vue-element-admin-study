import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout"

Vue.use(Router);

// 所有用户可访问的路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/",
    component: Layout
    // redirect: '/dashboard'
  }
]

// 具有一定权限才可以访问的路由
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    meta: {
      title: '权限',
      icon: 'icon-permissions',
      roles: ['admin']
    }
  }
]

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

// 新版本路由比编程式跳转出错解决办法，重写push方法
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

export default router;
