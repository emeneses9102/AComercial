const moduleBreadCrumb = {
  text: 'Productos',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Productos
export default [
  {
    path: '/caracteristicas',
    name: 'feature',
    component: () => import('@/views/system/products/features/Feature.vue'),
    meta: {
      auth: true,
      pageTitle: 'Características',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Características',
          active: true,
        },
      ],
    },
  },
  {
    path: '/tipo-producto',
    name: 'product-type',
    component: () => import('@/views/system/products/productType/ProductType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Producto',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Tipo Producto',
          active: true,
        },
      ],
    },
  },
  {
    path: '/tipo-servicio',
    name: 'service-type',
    component: () => import('@/views/system/products/serviceType/ServiceType.vue'),
    meta: {
      auth: true,
      pageTitle: 'Tipo Servicio',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Tipo Servicio',
          active: true,
        },
      ],
    },
  },
  {
    path: '/grupo-unidad',
    name: 'unit-group',
    component: () => import('@/views/system/products/unitGroup/UnitGroup.vue'),
    meta: {
      auth: true,
      pageTitle: 'Grupo Unidad',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Grupo Unidad',
          active: true,
        },
      ],
    },
  },
]
