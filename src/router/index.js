import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from '../modules/auth/router'
import dashboardRoutes from '../modules/dashboard/router'
import AuthService from '../modules/auth/services/auth-services'
import { AUTH_TOKEN } from '../plugins/apollo.js'
Vue.use(VueRouter)

const routes = [

  {
    path: '',
    redirect: '/login'
  },
  ...authRoutes,
  ...dashboardRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }
    if (token) {
      try {
        await AuthService.user({
          fetchPolicy: 'network-only'
        })
        return next()
      } catch (error) {
        console.log('auto login error', error)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }
  next()
})

export default router
