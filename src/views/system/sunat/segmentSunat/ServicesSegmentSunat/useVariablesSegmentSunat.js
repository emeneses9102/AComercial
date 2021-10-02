// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento SegmentoSunat
export const routeNameSegmentSunat = routesName.segmentos

// Constante para almacenar el id base de los modales del mantenimiento Segmento Sunat
export const MODAL_ID = 'modal-segment-sunat'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Segmento Sunat
export const columnsSegmentSunat = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codSegmento',
    label: 'CÓDIGO',
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

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Segmento Sunat
export const dataTableSegmentSunat = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Segmento Sunat
export const serverQuerySegmentSunat = ref({
  ...serverQueryDefault,
  tabla: 'sntsegmento',
})

// Función para limpiar filtros en la consulta de la tabla Segmento Sunat
export const clearFiltersSegmentSunat = () => {
  clearServerQueryDefaultFilter(serverQuerySegmentSunat)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Segmento Sunat
const initialStateSegmentSunat = {
  _id: 0,
  codSegmento: 0,
  nombre: '',
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Segmento Sunat
export const stateSegmentSunat = ref({ ...initialStateSegmentSunat })

// Función para regresar al estado inicial la variable reactiva que gestiona Segmento Sunat
export const clearStateSegmentSunat = () => {
  stateSegmentSunat.value = { ...initialStateSegmentSunat }
}

// Constante para almacenar las columas permitidas para el filtro de la table Segmento Sunat
export const columnsFilterSegmentSunat = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Segmento Sunat
export const urlApiSegmentSunat = '/codigosunat/segmento'

// Constante para almacenar el título de las notificaciónes del mantenimiento Segmento Sunat
export const titleNotificationSegmentSunat = 'Segmento Sunat'

// Constante para almacenar el titulo de los reportes del mantenimiento Segmento Sunat
export const titleReportSegmentSunat = 'REPORTE DE SEGMENTO SUNAT'
