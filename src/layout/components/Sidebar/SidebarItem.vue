<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="'submenu-title-noDropdown'">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from 'path'
import Item from './Item'
import AppLink from './Link'
import { isExternal } from '@/utils/validate'

export default {
  components: { AppLink, Item },
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    // 基本路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // 判断是否只有一个子路由用
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 判断是否只有一个子路由
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      // 当前路由只有一个子路由时， 默认显示第一个子路由
      if (showingChildren.length === 1) {
        return true
      }

      // 当前路由没有子路由时
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true}
        return true;
      }
      return false;
    },

    // 拼接路由
    resolvePath(routePath) {
      // 判断是否为外部链接
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>