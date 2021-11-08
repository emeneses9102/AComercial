// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Presentacion
export const routeNamePresentation = routesName.presentacion

// Constante para almacenar el id base de los modales del mantenimiento Presentacion
export const MODAL_ID = 'modal-presentation'

// Variable reactiva para almacenar la configuración de cada columna del mantenimiento Presentacion
export const columnsPresentation = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado del mantenimiento Presentacion
export const dataTablePresentation = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor del mantenimiento Presentacion
export const serverQueryPresentation = ref({
  ...serverQueryDefault,
  tabla: 'presentacion',
})

// Función para limpiar filtros en la consulta del mantenimiento Presentacion
export const clearFiltersPresentation = () => {
  clearServerQueryDefaultFilter(serverQueryPresentation)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Presentacion
const initialStatePresentation = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Presentacion
export const statePresentation = ref({ ...initialStatePresentation })

// Función para regresar al estado inicial la variable reactiva que gestiona Presentacion
export const clearStatePresentation = () => {
  statePresentation.value = { ...initialStatePresentation }
}

// Constante para almacenar las columas permitidas para el filtro del mantenimiento Presentacion
export const columnsFilterPresentation = [
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Presentacion
export const urlApiPresentation = '/presentacion'

// Constante para almacenar el título de las notificaciónes del mantenimiento Presentacion
export const titleNotificationPresentation = 'Presentacion'

// Constante para almacenar el titulo de los reportes del mantenimiento Presentacion
export const titleReportPresentation = 'REPORTE DE PRESENTACIÓN'
