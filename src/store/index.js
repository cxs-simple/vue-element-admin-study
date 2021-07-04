import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 提供唯一的公共数据源，所有共享收据统一放到Store的state中 
  state: {},
  /**
  * mutation用于变更store中的数据
  * mutation操作数据易于监控所有数据的变化
  * 不要再mutation中执行异步操作
  * 只有mutation才可以修改state中的数据
  */
  mutations: {},
  // action用于处理异步操作
  // 在action中不能直接修改state中的数据
  // 要通过触发mutation的方式间接变更数据
  actions: {},
  modules: {},
  // getter用于对store中的数据进行加工处理形成新的数据
  // getter不会修改state中的数据
  getters: {}
});
