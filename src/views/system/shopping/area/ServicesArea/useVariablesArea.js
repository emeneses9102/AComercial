// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Área
export const routeNameArea = routesName.area

// Constante para almacenar el id base de los modales del mantenimiento Área
export const MODAL_ID = 'modal-area'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Área
export const columnsArea = ref([
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Área
export const dataTableArea = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Área
export const serverQueryArea = ref({
  ...serverQueryDefault,
  tabla: 'area',
})

// Función para limpiar filtros en la consulta de la tabla Área
export const clearFiltersArea = () => {
  clearServerQueryDefaultFilter(serverQueryArea)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Área
const initialStateArea = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Área
export const stateArea = ref({ ...initialStateArea })

// Función para regresar al estado inicial la variable reactiva que gestiona Área
export const clearStateArea = () => {
  stateArea.value = { ...initialStateArea }
}

// Constante para almacenar las columas permitidas para el filtro de la table Área
export const columnsFilterArea = [
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Área
export const urlApiArea = '/areas'

// Constante para almacenar el título de las notificaciónes del mantenimiento Área
export const titleNotificationArea = 'Área'

// Constante para almacenar el titulo de los reportes del mantenimiento Área
export const titleReportArea = 'REPORTE DE ÁREAS'
