<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)"></app-link>
      <el-menu-item>s</el-menu-item>
    </template>
  </div>
</template>

<script>
import path from 'path'
import AppLink from './Link'
import { isExternal } from '@/utils/validate'

export default {
  components: { AppLink },
  props: {
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 判断是否只有一个子路由用
      onlyOneChild: null
    }
  },
  methods: {
    // 拼接路由
    resolvePath(routePath) {
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