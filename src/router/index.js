import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout"
import componentsRouter from "./modules/components.js"
import chartsRouter from "./modules/charts.js"
import tableRouter from "./modules/table.js"


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
  // 权限
  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    meta: {
      title: '权限',
      icon: 'icon-permissions',
      roles: ['admin']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  // 图标
  {
    path:'/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: {
          title: '图标',
          icon: 'icon-zuopin'
        }
      }
    ]
  },

  // 组件
  componentsRouter,
  // 图表
  chartsRouter,
  // 表格
  tableRouter,

  // Example
  {
    path: '/example',
    component: Layout,
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: {
          title: 'Create Article',
          icon: 'icon-bianji'
        }
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: {
          title: 'Article List',
          icon: 'icon-liebiao' }
      }
    ]
  },

  // 标签页
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: '标签页',
        meta: {
          title: 'Tab',
          icon: 'icon-biaoqianye'
        }
      }
    ]
  },

  // 错误页面
  {
    path: '/error',
    component: Layout,
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      icon: 'icon-icon-test'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: {
          title: '404',
          noCache: true
        }
      }
    ]
  },

  // 错误日志
  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: '错误日志',
        meta: {
          title: 'Error Log',
          icon: 'icon-bug'
        }
      }
    ]
  },

  // Excel
  {
    path: '/excel',
    component: Layout,
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'icon-Excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel'
        }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: {
          title: 'Export Selected'
        }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: {
          title: 'Merge Header'
        }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: {
          title: 'Upload Excel'
        }
      }
    ]
  },

  // zip压缩
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: {
      title: 'Zip',
      icon: 'icon-zip'
    },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: {
          title: 'Export Zip'
        }
      }
    ]
  },

  // PDF
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: {
          title: 'PDF',
          icon: 'icon-PDF'
        }
      }
    ]
  },

  // 主题theme
  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: '主题',
        meta: {
          title: 'Theme', 
          icon: 'icon-theme'
        }
      }
    ]
  },

  // clipboard
  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: {
          title: 'Clipboard',
          icon: 'icon-clipboard'
        }
      }
    ]
  },

  // 外部链接
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: {
          title: 'External Link', 
          icon: 'icon-link'
        }
      }
    ]
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
