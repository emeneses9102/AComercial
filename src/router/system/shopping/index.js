import routesName from '@/helpers/routesName'

const moduleBreadCrumb = {
  text: 'Comprás',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Almacén
export default [
  {
    path: '/areas',
    name: routesName.area,
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
  {
    path: '/pedido-compra',
    name: routesName.pedidoCompra,
    component: () => import('@/views/system/shopping/purchaseOrder/PurchaseOrder.vue'),
    meta: {
      auth: true,
      pageTitle: 'Pedido Compra',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Pedido Compra',
          active: true,
        },
      ],
    },
  },
  {
    path: '/formato',
    name: routesName.formato,
    component: () => import('@/views/system/shopping/format/Format.vue'),
    meta: {
      auth: true,
      pageTitle: 'Formato',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Formato',
          active: true,
        },
      ],
    },
  },
  {
    path: '/motivo-compra',
    name: routesName.motivoCompra,
    component: () => import('@/views/system/shopping/purchaseReason/PurchaseReason.vue'),
    meta: {
      auth: true,
      pageTitle: 'Motivo Compra',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Motivo Compra',
          active: true,
        },
      ],
    },
  },
]
