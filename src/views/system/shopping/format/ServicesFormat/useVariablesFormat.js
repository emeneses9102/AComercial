// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Formato
export const routeNameFormat = routesName.formato

// Constante para almacenar el id base de los modales del mantenimiento Formato
export const MODAL_ID = 'modal-format'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Formato
export const columnsFormat = ref([
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
  {
    field: 'titulo',
    label: 'TÍTULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'texto',
    label: 'TEXTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Formato
export const dataTableFormat = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Formato
export const serverQueryFormat = ref({
  ...serverQueryDefault,
  tabla: 'formato',
})

// Función para limpiar filtros en la consulta de la tabla Formato
export const clearFiltersFormat = () => {
  clearServerQueryDefaultFilter(serverQueryFormat)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Formato
const initialStateFormat = {
  _id: 0,
  nombre: '',
  titulo: '',
  texto: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Formato
export const stateFormat = ref({ ...initialStateFormat })

// Función para regresar al estado inicial la variable reactiva que gestiona Formato
export const clearStateFormat = () => {
  stateFormat.value = { ...initialStateFormat }
}

// Constante para almacenar las columas permitidas para el filtro de la table Formato
export const columnsFilterFormat = [
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
  {
    title: 'TÍTULO',
    field: 'a.titulo',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Formato
export const urlApiFormat = '/formato'

// Constante para almacenar el título de las notificaciónes del mantenimiento Formato
export const titleNotificationFormat = 'Formato'

// Constante para almacenar el titulo de los reportes del mantenimiento Formato
export const titleReportFormat = 'REPORTE DE FORMATO'
