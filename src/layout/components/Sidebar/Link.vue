<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    // 校验是否为外部链接url
    isExternal() {
      return isExternal(this.to)
    },
    // 获取链接类型
    type() {
      // 外部链接url
      if (this.isExternal) {
        console.log(11)
        // 返回a标签
        return 'a'
      }
      // 内部路由时, 返回router-link标签
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      // 外部链接url
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      // 内部路由
      return {
        to: to
      }
    }
  }
}
</script>