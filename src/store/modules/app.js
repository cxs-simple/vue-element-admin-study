import Cookies from "js-cookie"

const state = {
  // 控制菜单栏开关状态
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !! + Cookies.get('sidebarStatus') : true
  }
}

const mutations = {

}

export default {
  namespace: true,
  state,
  mutations
}