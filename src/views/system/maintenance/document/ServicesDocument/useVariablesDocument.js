// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Tipo Documento
export const routeNameDocumentType = routesName.tipoDocumento

// Constante para almacenar el id base de los modales del mantenimiento Documento
export const MODAL_ID = 'modal-document'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Documento
export const columnsDocument = ref([
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
    field: 'codigo_sunat',
    label: 'CÓDIGO SUNAT',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Documento
export const dataTableDocument = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Documento
export const serverQueryDocument = ref({
  ...serverQueryDefault,
  tabla: 'documento',
})

// Función para limpiar filtros en la consulta de la tabla Documento
export const clearFiltersDocument = () => {
  clearServerQueryDefaultFilter(serverQueryDocument)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Documento
const initialStateDocument = {
  _id: 0,
  nombre: '',
  codigo_sunat: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Documento
export const stateDocument = ref({ ...initialStateDocument })

// Función para regresar al estado inicial la variable reactiva que gestiona Documento
export const clearStateDocument = () => {
  stateDocument.value = { ...initialStateDocument }
}

// Constante para almacenar las columas permitidas para el filtro de la table Documento
export const columnsFilterDocument = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
  {
    title: 'Código Sunat',
    field: 'a.codigo_sunat',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Documento
export const urlApiDocument = '/documento'

// Constante para almacenar el título de las notificaciónes del mantenimiento Documento
export const titleNotificationDocument = 'Documento'

// Constante para almacenar el titulo de los reportes del mantenimiento Documento
export const titleReportDocument = 'REPORTE DE DOCUMENTOS'
