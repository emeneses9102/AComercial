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
]
