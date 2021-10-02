// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Mensaje Sistema
export const routeNameSystemMessage = routesName.mensajeSistema

// Constante para almacenar el id base de los modales del mantenimiento Mensaje Sistema
export const MODAL_ID = 'modal-system-message'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Mensaje Sistema
export const columnsSystemMessage = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'sqlEstado',
    label: 'ESTADO SQL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'msjError',
    label: 'MENSAJE ERROR',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'mensaje',
    label: 'MENSAJE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Mensaje Sistema
export const dataTableSystemMessage = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Mensaje Sistema
export const serverQuerySystemMessage = ref({
  ...serverQueryDefault,
  tabla: 'dbmensaje',
})

// Función para limpiar filtros en la consulta de la tabla Mensaje Sistema
export const clearFiltersSystemMessage = () => {
  clearServerQueryDefaultFilter(serverQuerySystemMessage)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Mensaje Sistema
const initialStateSystemMessage = {
  _id: 0,
  sqlEstado: '',
  msjError: '',
  mensaje: '',
  accion: 0,
  loading: false,
}

// variable reactiva para determinar si es nuevo o actualizar
export const actionModal = ref('NEW')

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Mensaje Sistema
export const stateSystemMessage = ref({ ...initialStateSystemMessage })

// Función para regresar al estado inicial la variable reactiva que gestiona Mensaje Sistema
export const clearStateSystemMessage = () => {
  stateSystemMessage.value = { ...initialStateSystemMessage }
}

// Constante para almacenar las columas permitidas para el filtro de la table Mensaje Sistema
export const columnsFilterSystemMessage = [
  {
    title: 'mensaje',
    field: 'a.mensaje',
  },
  {
    title: 'SQL estado',
    field: 'a.sqlEstado',
  },
  {
    title: 'mensaje Error',
    field: 'a.msjError',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Mensaje Sistema
export const urlApiSystemMessage = '/mensajes'

// Constante para almacenar el título de las notificaciónes del mantenimiento Mensaje Sistema
export const titleNotificationSystemMessage = 'Mensaje Sistema'

// Constante para almacenar el titulo de los reportes del mantenimiento Mensaje Sistema
export const titleReportSystemMessage = 'REPORTE DE MENSAJES DEL SISTEMA'
