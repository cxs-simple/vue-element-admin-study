<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

  export default {
    // 组件
    components: { SidebarItem },

    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),

      // 是否水平折叠收起菜单栏
      isCollapse() {
        return !this.sidebar.opened
      },

      // 菜单栏样式
      variables() {
        return variables
      }
    }
  }
</script>
