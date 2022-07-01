import Vue from 'vue'
import Vuex from 'vuex'
// 导入 购物车的 vuex 模块
import moudleUser from '@/store/user.js'

Vue.use(Vuex)

// 插件store对象：挂载相关的vuex模块
const store = new Vuex.Store({
  modules: {
    'm_user': moudleUser // 挂载用户的 vuex 模块，模块内的成员访问路径调整为 m_user
  }
})
export default store
