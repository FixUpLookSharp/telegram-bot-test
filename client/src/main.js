import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = true
import './assets/css/login.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
