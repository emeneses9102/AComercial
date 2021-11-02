const moduleBreadCrumb = {
  text: 'Comprás',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Almacén
export default [
  {
    path: '/areas',
    name: 'area',
    component: () => import('@/views/system/shopping/area/Area.vue'),
    meta: {
      auth: true,
      pageTitle: 'Áreas',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Áreas',
          active: true,
        },
      ],
    },
  },
]
