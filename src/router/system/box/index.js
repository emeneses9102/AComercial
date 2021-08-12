const moduleBreadCrumb = {
  text: 'Caja',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Caja
export default [
  {
    path: '/medio-pago',
    name: 'paymentMethod',
    component: () => import('@/views/system/box/paymentMethod/PaymentMethod.vue'),
    meta: {
      auth: true,
      pageTitle: 'Medio de Pago',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Medio de Pago',
          active: true,
        },
      ],
    },
  },
  {
    path: '/moneda',
    name: 'currency',
    component: () => import('@/views/system/box/currency/Currency.vue'),
    meta: {
      auth: true,
      pageTitle: 'Moneda',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Moneda',
          active: true,
        },
      ],
    },
  },
  {
    path: '/forma-pago',
    name: 'paymentForm',
    component: () => import('@/views/system/box/paymentForm/PaymentForm.vue'),
    meta: {
      auth: true,
      pageTitle: 'Forma de Pago',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Forma de Pago',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sesion-caja',
    name: 'boxSession',
    component: () => import('@/views/system/box/boxSession/BoxSession.vue'),
    meta: {
      auth: true,
      pageTitle: 'Sesión Caja',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Sesión Caja',
          active: true,
        },
      ],
    },
  },
  {
    path: '/punto-venta',
    name: 'pointSale',
    component: () => import('@/views/system/box/pointSale/PointSale.vue'),
    meta: {
      auth: true,
      pageTitle: 'Punto de Venta',
      breadcrumb: [
        moduleBreadCrumb,
        {
          text: 'Punto de Venta',
          active: true,
        },
      ],
    },
  },
]
