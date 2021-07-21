export default [
  {
    title: 'Productos',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Caracteristicas',
        route: 'feature',
      },
      {
        title: 'Tipo Producto',
        route: 'product-type',
      },
      {
        title: 'Tipo Servicio',
        route: 'service-type',
      },
      {
        title: 'Grupo Unidad',
        route: 'unit-group',
      },
    ],
  },
  {
    title: 'Mantenimiento',
    icon: 'FolderMinusIcon',
    children: [
      {
        title: 'Socios',
        route: 'partner',
      },
      {
        title: 'Unidad de Negocio',
        route: 'businessUnit',
      },
    ],
  },
  {
    title: 'Almacén',
    icon: 'ClipboardIcon',
    children: [
      {
        title: 'Tipo Almacén',
        route: 'storageType',
      },
      {
        title: 'Predio',
        route: 'predio',
      },
      {
        title: 'Almacén',
        route: 'storage',
      },
    ],
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
        title: 'Colaborador',
        route: 'collaborator',
      },
      {
        title: 'Opciones',
        route: 'option',
      },
      {
        title: 'Módulos',
        route: 'module',
      },
      {
        title: 'Menú',
        route: 'menu',
      },
      {
        title: 'Usuario',
        route: 'user',
      },
      {
        title: 'Accesos',
        route: 'access',
      },
    ],
  },
]
