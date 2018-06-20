import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'
import Login from '@/components/Login'

import cloudService from '../services/cloud.service'
// import { loadLanguageAsync } from '../services/i18n.setup'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = cloudService.getCurrentUser()
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && user.isAuthenticated === false) next('/login')
  else if (!requiresAuth && user.isAuthenticated) next('/')
  else next()
})

export default router
