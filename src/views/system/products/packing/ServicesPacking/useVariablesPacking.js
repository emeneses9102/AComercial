// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Empaque
export const routeNamePacking = routesName.tipoProducto

// Constante para almacenar el id base de los modales del mantenimiento Empaque
export const MODAL_ID = 'modal-packing'

// Variable reactiva para almacenar la configuración de cada columna del mantenimiento Empaque
export const columnsPacking = ref([
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

// Variable reactiva para almacenar las propiedades necesarias para el listado del mantenimiento Empaque
export const dataTablePacking = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor del mantenimiento Empaque
export const serverQueryPacking = ref({
  ...serverQueryDefault,
  tabla: 'empaque',
})

// Función para limpiar filtros en la consulta del empaque Empaque
export const clearFiltersPacking = () => {
  clearServerQueryDefaultFilter(serverQueryPacking)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Empaque
const initialStatePacking = {
  _id: 0,
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en el mantenimiento Empaque
export const statePacking = ref({ ...initialStatePacking })

// Función para regresar al estado inicial la variable reactiva que gestiona Empaque
export const clearStatePacking = () => {
  statePacking.value = { ...initialStatePacking }
}

// Constante para almacenar las columas permitidas para el filtro del mantenimiento Empaque
export const columnsFilterPacking = [
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Empaque
export const urlApiPacking = '/empaque'

// Constante para almacenar el título de las notificaciónes del mantenimiento Empaque
export const titleNotificationPacking = 'Empaque'

// Constante para almacenar el titulo de los reportes del mantenimiento Empaque
export const titleReportPacking = 'REPORTE DE EMPAQUES'
