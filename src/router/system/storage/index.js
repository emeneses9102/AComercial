const moduleBreadCrumb = {
  text: 'Almacén',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Almacén
export default [
  {
    path: '/tipo-almacen',
    name: 'storageType',
    component: () => import('@/views/system/storage/storageType/StorageType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Almacén',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Tipo Almacén',
          active: true,
        },
      ],
    },
  },
  {
    path: '/predio',
    name: 'predio',
    component: () => import('@/views/system/storage/predio/Predio.vue'),
    meta: {
      auth: true,
      pageTitle: 'Predio',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Predio',
          active: true,
        },
      ],
    },
  },
  {
    path: '/almacen',
    name: 'storage',
    component: () => import('@/views/system/storage/storage/Storage.vue'),
    meta: {
      auth: true,
      pageTitle: 'Almacén',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Inicio',
          active: true,
        },
      ],
    },
  },
]
