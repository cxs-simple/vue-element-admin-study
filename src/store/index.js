import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'

Vue.use(Vuex);

/**
 * 获取modules文件夹下所有js文件
 * true: 获取modules文件夹下的子文件夹
 * false: 不获取modules文件夹下的子文件夹
 */
const modulesFiles = require.context('./modules', true, /\.js$/)

/**
 * modulesFiles.keys(): modules文件加下所有js文件的路径列表
 * modules: 空对象，存放js信息
 * modulePath: 每个js文件的路径
 */
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 获取js文件名
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 获取js文件内部export所有信息
  const value = modulesFiles(modulePath)
  // 将export的信息放入对象
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store

// export default new Vuex.Store({
//   // 提供唯一的公共数据源，所有共享收据统一放到Store的state中 
//   state: {},
//   /**
//   * mutation用于变更store中的数据
//   * mutation操作数据易于监控所有数据的变化
//   * 不要再mutation中执行异步操作
//   * 只有mutation才可以修改state中的数据
//   */
//   mutations: {},
//   // action用于处理异步操作
//   // 在action中不能直接修改state中的数据
//   // 要通过触发mutation的方式间接变更数据
//   actions: {},
//   modules: modules,
//   // getter用于对store中的数据进行加工处理形成新的数据
//   // getter不会修改state中的数据
//   getters: {}
// }); 
