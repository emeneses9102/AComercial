// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Mensaje Sistema
export const routeNameAccess = routesName.accesos

// Constante para almacenar el id base de los modales del mantenimiento Accesos
export const MODAL_ID = 'modal-access'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Accesos
export const columnsAccess = ref([
  columnAction,
  {
    label: 'ID',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'ROL',
    field: 'nombreRol',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MODULO',
    field: 'nombreModulo',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MENU',
    field: 'nombreMenu',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Accesos
export const dataTableAccess = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Accesos
export const serverQueryAccess = ref({
  ...serverQueryDefault,
  tabla: 'accesos',
})

// Función para limpiar filtros en la consulta de la tabla Accesos
export const clearFiltersAccess = () => {
  clearServerQueryDefaultFilter(serverQueryAccess)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Accesos
const initialStateAccess = {
  _id: 0,
  idRol: 0,
  nombreRol: '',
  idModulo: 0,
  nombreModulo: '',
  idMenu: 0,
  nombreMenu: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Accesos
export const stateAccess = ref({ ...initialStateAccess })

// Función para regresar al estado inicial la variable reactiva que gestiona Accesos
export const clearStateAccess = () => {
  stateAccess.value = { ...initialStateAccess }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Accesos
export const combosAccess = ref({
  role: { ...initialStateCombo },
  module: { ...initialStateCombo },
  menu: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Accesos
export const columnsFilterAccess = [
  {
    title: 'ROL',
    field: 'a.nombreRol',
  },
  {
    title: 'MÓDULO',
    field: 'a.nombreModulo',
  },
  {
    title: 'MENÚ',
    field: 'a.nombreMenu',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Accesos
export const urlApiAccess = '/accesos'

// Constante para almacenar el título de las notificaciónes del mantenimiento Accesos
export const titleNotificationAccess = 'Accesos'

// Constante para almacenar el titulo de los reportes del mantenimiento Accesos
export const titleReportAccess = 'REPORTE DE ACCESOS'
