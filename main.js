// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// $http.baseUrl = 'http://127.0.0.1:8081'
// $http.baseUrl = 'http://1.15.78.149:18080/mini'
$http.baseUrl = 'https://user.xiaomoto.cn/mini/'

// 封装弹窗
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// // #ifdef VUE3
// import {
//   createApp
// } from 'vue'
// import App from './App.vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// #endif
