import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jwtDecode from 'jwt-decode'


import '@/assets/global.css';
//Custom scss for bootstrap overrides
import '@/assets/_global.scss';





// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import cookies from 'vue-cookies'

import { BootstrapVue } from 'bootstrap-vue';
import { BootstrapVueIcons } from 'bootstrap-vue'
import { ToastPlugin } from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue, ToastPlugin);
Vue.use(cookies)




require('dotenv').config();
Vue.config.productionTip = false;
// console.log($cookies.get("user_token"));

// if(cookies.get("user_cart")){
//   store.commit("setCart", cookies.get("user_cart"))
// }

if(cookies.get("user_token")){
  var decoded = jwtDecode(cookies.get("user_token"));
  if(decoded.isAdmin){
    store.commit("admin", true);
  }
  store.commit("setUser", decoded.username);
  store.commit("login");

} else {
  console.log("no cookie found")
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

