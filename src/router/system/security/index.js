const moduleBradCrumb = {
  text: 'Seguridad',
  active: true,
}

// Exportar arreglo de las rutas registradas para el Módulo Seguridad
export default [
  {
    path: '/roles',
    name: 'role',
    component: () => import('@/views/system/security/role/Role.vue'),
    meta: {
      auth: true,
      pageTitle: 'Roles',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Roles',
          active: true,
        },
      ],
    },
  },
  {
    path: '/colaborador',
    name: 'collaborator',
    component: () => import('@/views/system/security/collaborator/Collaborator.vue'),
    meta: {
      auth: true,
      pageTitle: 'Colaborador',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Colaborador',
          active: true,
        },
      ],
    },
  },
  {
    path: '/opciones',
    name: 'option',
    component: () => import('@/views/system/security/option/Option.vue'),
    meta: {
      auth: true,
      pageTitle: 'Opciones',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Opciones',
          active: true,
        },
      ],
    },
  },
  {
    path: '/modulos',
    name: 'module',
    component: () => import('@/views/system/security/module/Module.vue'),
    meta: {
      auth: true,
      pageTitle: 'Módulos',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Módulos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/system/security/menu/Menu.vue'),
    meta: {
      auth: true,
      pageTitle: 'Menú',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Menú',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usuario',
    name: 'user',
    component: () => import('@/views/system/security/user/User.vue'),
    meta: {
      auth: true,
      pageTitle: 'Usuario',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Usuario',
          active: true,
        },
      ],
    },
  },
  {
    path: '/accesos',
    name: 'access',
    component: () => import('@/views/system/security/access/Access.vue'),
    meta: {
      auth: true,
      pageTitle: 'Accesos',
      breadcrumb: [
        moduleBradCrumb,
        {
          text: 'Accesos',
          active: true,
        },
      ],
    },
  },
]
