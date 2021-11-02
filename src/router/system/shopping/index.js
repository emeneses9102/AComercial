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
]
