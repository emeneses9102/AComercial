// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Característica
export const MODAL_ID = 'modal-feature'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Característica
export const columnsFeature = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    pdf: true,
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
    pdf: true,
  },
  {
    field: 'abreviatura',
    label: 'ABREVIATURA',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Característica
export const dataTableFeature = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Característica
export const serverQueryFeature = ref({
  ...serverQueryDefault,
  tabla: 'caracteristica',
})

// Función para limpiar filtros en la consulta de la tabla Característica
export const clearFiltersFeature = () => {
  clearServerQueryDefaultFilter(serverQueryFeature)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Característica
const initialStateFeature = {
  _id: 0,
  nombre: '',
  abreviatura: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Característica
export const stateFeature = ref({ ...initialStateFeature })

// Función para regresar al estado inicial la variable reactiva que gestiona Característica
export const clearStateFeature = () => {
  stateFeature.value = { ...initialStateFeature }
}

// Constante para almacenar las columas permitidas para el filtro de la table Característica
export const columnsFilterFeature = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Característica
export const urlApiFeature = '/caracteristica'

// Constante para almacenar el título de las notificaciónes del mantenimiento Característica
export const titleNotificationFeature = 'Característica'

// Constante para almacenar el titulo de los reportes del mantenimiento Característica
export const titleReportFeature = 'REPORTE DE CARACTERISTICAS'
