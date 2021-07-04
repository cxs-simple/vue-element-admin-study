import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import 'default-passive-events'

// element-ui引入
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入自己配置的全局css
import "@/styles/index.css";

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
