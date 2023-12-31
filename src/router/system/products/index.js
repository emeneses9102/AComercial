import routesName from '@/helpers/routesName'

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
    name: 'productType',
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
    name: 'serviceType',
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
    name: 'unitGroup',
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
    path: '/empaque',
    name: routesName.empaque,
    component: () => import('@/views/system/products/packing/Packing.vue'),
    meta: {
      auth: true,
      pageTitle: 'Empaque',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Empaque',
          active: true,
        },
      ],
    },
  },
  {
    path: '/presentacion',
    name: routesName.presentacion,
    component: () => import('@/views/system/products/presentation/Presentation.vue'),
    meta: {
      auth: true,
      pageTitle: 'Presentación',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Presentación',
          active: true,
        },
      ],
    },
  },
  {
    path: '/articulo-grupo-unidad',
    name: routesName.articulosGrupoUnidad,
    component: () => import('@/views/system/products/tArticleUnitGroup/TArticleUnitGroup.vue'),
    meta: {
      auth: true,
      pageTitle: 'Artículo Grupo Unidad',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Artículo Grupo Unidad',
          active: true,
        },
      ],
    },
  },
]
