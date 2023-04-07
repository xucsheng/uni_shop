// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import cart from './cart.js'
// 2.将Vuex 安装为Vux的插件
Vue.use(Vuex)
const store = new Vuex.Store({
//  3.挂载store模块
  modules: {
	user,  
	cart
  }

})
// 向外共享store的实例对象 
export default store
