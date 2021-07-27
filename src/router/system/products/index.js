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
  {
    path: '/articulos',
    name: 'article',
    component: () => import('@/views/system/products/article/Article.vue'),
    meta: {
      auth: true,
      pageTitle: 'Artículo',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Artículo',
          active: true,
        },
      ],
    },
  },
  {
    path: '/segmentos-sunat',
    name: 'segmentSunat',
    component: () => import('@/views/system/products/segmentSunat/SegmentSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'SUNAT',
      breadcrumb: [
        {
          text: 'Segmento',
          active: true,
        },
      ],
    },
  },
  {
    path: '/familias-sunat',
    name: 'familySunat',
    component: () => import('@/views/system/products/familySunat/FamilySunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'SUNAT',
      breadcrumb: [
        {
          text: 'Familia',
          active: true,
        },
      ],
    },
  },
  {
    path: '/clases-sunat',
    name: 'classSunat',
    component: () => import('@/views/system/products/classSunat/ClassSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'SUNAT',
      breadcrumb: [
        {
          text: 'Clase',
          active: true,
        },
      ],
    },
  },
  {
    path: '/codigo-unico-sunat',
    name: 'uniqueCodeSunat',
    component: () => import('@/views/system/products/uniqueCodeSunat/UniqueCodeSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'SUNAT',
      breadcrumb: [
        {
          text: 'Código Único',
          active: true,
        },
      ],
    },
  },
]
