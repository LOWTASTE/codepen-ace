import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/router.js'
import axios from 'axios'
import baseURL from './configuration/BaseURL.js'
import VueX from 'vuex'
// 序列化使用
// import qs from 'qs'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = baseURL.baseURL;
// axios.defaults.timeout = 30000;
Vue.use(VueRouter)
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.transformRequest = function(data){
//   return qs.stringify(data,{arrayFormat: 'brackets'})
// }
Vue.use(VueX)

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("Token")
  if (token) {
      config.headers.Token = token;    //将token放到请求头发送给服务器
      return config;
      //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
      // config.headers['accessToken'] = Token;
  }
}, function (error) {
  localStorage.setItem("Token","");
  console.log(error)
});

const store = new VueX.Store({
  state: {
    isAuth: 0,
    userId: null,
    noteId: null
  },
  mutations: {
    auth (state) {
      state.isAuth = 1
    },
    unAuth(state) {
      state.isAuth = 0
    }
  }
})

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 冗余导航
const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
