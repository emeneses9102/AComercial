// Exportar arreglo de las rutas registradas para la autenticación
export default [
  {
    path: '/iniciar-sesion',
    name: 'login',
    component: () => import('@/views/authentication/Login-v1.vue'),
    meta: {
      layout: 'full',
    },
    beforeEnter: (to, from, next) => {
      // Verificar si en el localstorage almacenamos las credenciales
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)) {
        next('/')
      }
      // De no pasar la condicion anterior permitira el acceso al login
      next()
    },
  },
]
