// export default [
//   {
//     title: 'Inicio',
//     icon: 'HomeIcon',
//     route: 'home',
//   },
//   {
//     title: 'Productos',
//     icon: 'BoxIcon',
//     children: [
//       {
//         title: 'Caracteristicas',
//         route: 'feature',
//       },
//       {
//         title: 'Tipo Producto',
//         route: 'product-type',
//       },
//       {
//         title: 'Tipo Servicio',
//         route: 'service-type',
//       },
//       {
//         title: 'Grupo Unidad',
//         route: 'unit-group',
//       },
//       {
//         title: 'Artículos',
//         route: 'article',
//       },
//     ],
//   },
//   {
//     title: 'Mantenimiento',
//     icon: 'FolderMinusIcon',
//     children: [
//       {
//         title: 'Socios',
//         route: 'partner',
//       },
//       {
//         title: 'Unidad de Negocio',
//         route: 'businessUnit',
//       },
//       {
//         title: 'Comprobante',
//         route: 'voucher',
//       },
//       {
//         title: 'Documento',
//         route: 'document',
//       },
//     ],
//   },
//   {
//     title: 'Almacén',
//     icon: 'ClipboardIcon',
//     children: [
//       {
//         title: 'Tipo Almacén',
//         route: 'storageType',
//       },
//       {
//         title: 'Predio',
//         route: 'predio',
//       },
//       {
//         title: 'Almacén',
//         route: 'storage',
//       },
//     ],
//   },
//   {
//     title: 'Seguridad',
//     icon: 'LockIcon',
//     children: [
//       {
//         title: 'Roles',
//         route: 'role',
//       },
//       {
//         title: 'Colaborador',
//         route: 'collaborator',
//       },
//       {
//         title: 'Opciones',
//         route: 'option',
//       },
//       {
//         title: 'Módulos',
//         route: 'module',
//       },
//       {
//         title: 'Menú',
//         route: 'menu',
//       },
//       {
//         title: 'Usuario',
//         route: 'user',
//       },
//       {
//         title: 'Accesos',
//         route: 'access',
//       },
//     ],
//   },
//   {
//     title: 'Control',
//     icon: 'AlertOctagonIcon',
//     children: [
//       {
//         title: 'Mensaje Sistema',
//         route: 'systemMessage',
//       },
//       {
//         title: 'Error del Sistema',
//         route: 'systemError',
//       },
//     ],
//   },
//   {
//     title: 'Caja',
//     icon: 'InboxIcon',
//     children: [
//       {
//         title: 'Medio Pago',
//         route: 'paymentMethod',
//       },
//       {
//         title: 'Moneda',
//         route: 'currency',
//       },
//       {
//         title: 'Forma Pago',
//         route: 'paymentForm',
//       },
//       {
//         title: 'Sesión Caja',
//         route: 'boxSession',
//       },
//       {
//         title: 'Punto de Venta',
//         route: 'pointSale',
//       },
//       {
//         title: 'Punto de Venta 2',
//         route: 'pointSaleTwo',
//       },
//       {
//         title: 'Punto de Venta 3',
//         route: 'pointSaleThree',
//       },
//     ],
//   },
//   {
//     title: 'SUNAT',
//     icon: 'ClipboardIcon',
//     children: [
//       {
//         title: 'Segmentos SUNAT',
//         route: 'segmentSunat',
//       },
//       {
//         title: 'Familias SUNAT',
//         route: 'familySunat',
//       },
//       {
//         title: 'Clases SUNAT',
//         route: 'classSunat',
//       },
//       {
//         title: 'Código Único SUNAT',
//         route: 'uniqueCodeSunat',
//       },
//     ],
//   },
// ]
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
        route: 'product-type',
      },
      {
        title: 'Tipo de Servicio',
        route: 'service-type',
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
        route: 'unit-group',
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
        title: 'Sesión Caja',
        route: 'boxSession',
      },
      {
        title: 'Punto de Venta',
        route: 'pointSale',
      },
      {
        title: 'Punto de Venta 2',
        route: 'pointSaleTwo',
      },
      {
        title: 'Punto de Venta 3',
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
