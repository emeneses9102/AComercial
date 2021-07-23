export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/system/home/Analytics.vue'),
    meta: {
      auth: true,
      pageTitle: 'Inicio',
    },
  },
]
