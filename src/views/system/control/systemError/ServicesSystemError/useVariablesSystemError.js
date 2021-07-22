// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Constante para almacenar el id base de los modales del mantenimiento Mensaje de error
export const MODAL_ID = 'modal-system-error'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Mensaje de error
export const columnsSystemError = ref([
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
    field: 'codError',
    label: 'Cod. Error',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'texto',
    label: 'Texto',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'tabla',
    label: 'Tabla',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'codigo',
    label: 'Codigo',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'usuario',
    label: 'Usuario',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'descripcion',
    label: 'Descripción',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Mensaje de error
export const dataTableSystemError = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Mensaje de error
export const serverQuerySystemError = ref({
  ...serverQueryDefault,
  tabla: 'dberror',
})

// Función para limpiar filtros en la consulta de la tabla Mensaje de error
export const clearFiltersSystemError = () => {
  clearServerQueryDefaultFilter(serverQuerySystemError)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Mensaje de error
const initialStateSystemError = {
  _id: 0,
  sqlEstado: '',
  codError: 0,
  texto: '',
  tabla: '',
  codigo: 0,
  usuario: '',
  descripcion: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Mensaje de error
export const stateSystemError = ref({ ...initialStateSystemError })

// Función para regresar al estado inicial la variable reactiva que gestiona Mensaje de error
export const clearStateSystemError = () => {
  stateSystemError.value = { ...initialStateSystemError }
}

// Constante para almacenar las columas permitidas para el filtro de la table Mensaje de error
export const columnsFilterSystemError = [
  {
    title: 'SQL Estado',
    field: 'a.sqlEstado',
  },
  {
    title: 'Cod. Error',
    field: 'a.codError',
  },
  {
    title: 'Texto',
    field: 'a.texto',
  },
  {
    title: 'Tabla',
    field: 'a.tabkla',
  },
  {
    title: 'Código',
    field: 'a.codigo',
  },
  {
    title: 'Usuario',
    field: 'a.usuario',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Mensaje de error
export const urlApiSystemError = '/errores'

// Constante para almacenar el título de las notificaciónes del mantenimiento Mensaje de error
export const titleNotificationSystemError = 'Mensaje de error'

// Constante para almacenar el titulo de los reportes del mantenimiento Mensaje de error
export const titleReportSystemError = 'REPORTE DE MENSAJE DE ERRORES'
