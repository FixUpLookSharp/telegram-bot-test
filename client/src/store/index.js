import Vue from 'vue'
import Vuex from 'vuex'

//modules
import login from "./modules/auth/login";
import auth from "./modules/auth/auth";
Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    login,
    auth
  }
})
