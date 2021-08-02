<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    // 从props中解构出icon与title
    const { icon, title } = context.props
    // 节点
    const vnodes = []

    // 图标存在时
    if (icon) {
      vnodes.push(<i class={'iconfont ' + icon}/>)
    }

    // 标题存在时
    if (title) {
      console.log(title)
      vnodes.push(<span>{title}</span>)
    }
    return vnodes
  }
}
</script>