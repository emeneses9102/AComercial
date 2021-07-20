// Exportar arreglo de las rutas registradas para la autenticación
export default [
  {
    path: '/iniciar-sesion',
    name: 'login',
    component: () => import('@/views/authentication/Login-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
]
