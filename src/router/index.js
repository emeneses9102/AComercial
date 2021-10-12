import Vue from 'vue'
import VueRouter from 'vue-router'

import { routesNameDefault } from '@/helpers/rolesAndPermissions'

// Importar todas las rutas del Sistema
import routesAuthentication from './authentication'
import routesSystem from './system'
import routesError from './error'

// Agrupando todas las rutas del sistema para añadirlo al VueRouter
const routes = [
  ...routesAuthentication,
  ...routesSystem,
  ...routesError,
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)
  let allowedRoutes = JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_OPTIONS_ENCRYPT) || '') || null) || {}
  allowedRoutes = [...routesNameDefault, ...Object.keys(allowedRoutes)]

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next({ name: 'login' })
  } else if (!allowedRoutes.includes(to.name)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
