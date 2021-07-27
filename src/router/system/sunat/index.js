const moduleBreadCrumb = {
  text: 'SUNAT',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo SUNAT
export default [
  {
    path: '/segmentos-sunat',
    name: 'segmentSunat',
    component: () => import('@/views/system/sunat/segmentSunat/SegmentSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'Segmento',
      breadcrumb: [
        moduleBreadCrumb,
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
    component: () => import('@/views/system/sunat/familySunat/FamilySunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'Familia',
      breadcrumb: [
        moduleBreadCrumb,
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
    component: () => import('@/views/system/sunat/classSunat/ClassSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'Clase',
      breadcrumb: [
        moduleBreadCrumb,
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
    component: () => import('@/views/system/sunat/uniqueCodeSunat/UniqueCodeSunat.vue'),
    meta: {
      auth: true,
      pageTitle: 'Código Único',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Código Único',
          active: true,
        },
      ],
    },
  },
]
