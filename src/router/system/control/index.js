const moduleBreadCrumb = {
  text: 'Control',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Control
export default [
  {
    path: '/mensaje-sistema',
    name: 'systemMessage',
    component: () => import('@/views/system/control/systemMessage/SystemMessage.vue'),
    meta: {
      auth: true,
      pageTitle: 'Mensaje Sistema',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Mensaje Sistema',
          active: true,
        },
      ],
    },
  },
  {
    path: '/error-sistema',
    name: 'systemError',
    component: () => import('@/views/system/control/systemError/SystemError.vue'),
    meta: {
      auth: true,
      pageTitle: 'Error del Sistema',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Error del Sistema',
          active: true,
        },
      ],
    },
  },
]
