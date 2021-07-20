const moduleBreadCrumb = {
  text: 'Mantenimiento',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Mantenimiento
export default [
  {
    path: '/socios',
    name: 'partner',
    component: () => import('@/views/system/maintenance/partner/Partner.vue'),
    meta: {
      auth: true,
      pageTitle: 'Socio',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Socio',
          active: true,
        },
      ],
    },
  },
  {
    path: '/unidad-negocio',
    name: 'businessUnit',
    component: () => import('@/views/system/maintenance/businessUnit/BusinessUnit.vue'),
    meta: {
      auth: true,
      pageTitle: 'Unidad Negocio',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Unidad Negocio',
          active: true,
        },
      ],
    },
  },
]
