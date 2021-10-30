import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";
import Admin from "../views/admin/Admin";
Vue.use(VueRouter)


const routes = [
  {
    path: '*',
    name: 'notFound',
    beforeEnter: (to, from, next) => {
            return next({
                name: 'admin'
            })
    }
  },
  {
    path: '/',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
