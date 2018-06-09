import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Life Tracker',
      component: MainView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
