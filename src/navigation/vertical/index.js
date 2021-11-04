export default [
  {
    title: 'Inicio',
    icon: 'HomeIcon',
    route: 'home',
  },
  {
    title: 'Seguridad',
    icon: 'LockIcon',
    children: [
      {
        title: 'Roles',
        route: 'role',
      },
      {
        title: 'Módulos',
        route: 'module',
      },
      {
        title: 'Programas',
        route: 'menu',
      },
      {
        title: 'Eventos al Programa',
        route: 'option',
      },
      {
        title: 'Accesos',
        route: 'access',
      },
      {
        title: 'Usuarios',
        route: 'user',
      },
      {
        title: 'Mensaje Sistema',
        route: 'systemMessage',
      },
      {
        title: 'Error del Sistema',
        route: 'systemError',
      },
    ],
  },
  {
    title: 'Catálogo',
    icon: 'CodesandboxIcon',
    children: [
      {
        title: 'Tipo de Producto',
        route: 'productType',
      },
      {
        title: 'Tipo de Servicio',
        route: 'serviceType',
      },
      {
        title: 'Caracteristicas',
        route: 'feature',
      },
      {
        title: 'Unidad de Negocio',
        route: 'businessUnit',
      },
      {
        title: 'Grupo Unidad',
        route: 'unitGroup',
      },
      {
        title: 'Tipo de Documento',
        route: 'document',
      },
      {
        title: 'Comprobantes',
        route: 'voucher',
      },
      {
        title: 'Moneda / País',
        route: 'currency',
      },
      {
        title: 'Medio de Pago',
        route: 'paymentMethod',
      },
      {
        title: 'Forma de Pago',
        route: 'paymentForm',
      },
      {
        title: 'Tributos',
        route: 'tribute',
      },
    ],
  },
  {
    title: 'Compras',
    icon: 'ShoppingBagIcon',
    children: [
      {
        title: 'Áreas',
        route: 'area',
      },
      {
        title: 'Pedido Compra',
        route: 'purchaseOrder',
      },
      {
        title: 'Formato',
        route: 'format',
      },
      {
        title: 'Motivo Compra',
        route: 'purchaseReason',
      },
      {
        title: 'Órden Compra',
        route: 'buyOrder',
      },
    ],
  },
  {
    title: 'Administración',
    icon: 'SettingsIcon',
    children: [
      {
        title: 'Colaboradores',
        route: 'collaborator',
      },
      {
        title: 'Clientes / Proveedores',
        route: 'partner',
      },
      {
        title: 'Predios',
        route: 'predio',
      },
      {
        title: 'Artículos',
        route: 'article',
      },
    ],
  },
  {
    title: 'Almacén',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Tipo Almacén',
        route: 'storageType',
      },
      {
        title: 'Almacén',
        route: 'storage',
      },
    ],
  },
  {
    title: 'Caja',
    icon: 'InboxIcon',
    children: [
      {
        title: 'Tipo de Cambio',
        route: 'changeType',
      },
      {
        title: 'Sesión Caja',
        route: 'boxSession2',
      },
      {
        title: 'Punto de Venta',
        route: 'pointSaleThree',
      },
    ],
  },
  {
    title: 'SUNAT',
    icon: 'ClipboardIcon',
    children: [
      {
        title: 'Segmentos SUNAT',
        route: 'segmentSunat',
      },
      {
        title: 'Familias SUNAT',
        route: 'familySunat',
      },
      {
        title: 'Clases SUNAT',
        route: 'classSunat',
      },
      {
        title: 'Código Único SUNAT',
        route: 'uniqueCodeSunat',
      },
    ],
  },
]
