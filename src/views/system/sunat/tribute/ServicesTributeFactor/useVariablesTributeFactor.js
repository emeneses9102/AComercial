// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import {
  columnAction,
  columnStatus,
} from '@/helpers/columnsTable'
import {
  clearServerQueryDefaultFilter,
  serverQueryDefault,
} from '@/helpers/serverQuery'
import {
  formatDate,
} from '@/helpers/date'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Tributo Factor
export const initialColumnsTributeFactor = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'factor',
    label: 'FACTOR',
  },
  {
    field: 'inicio',
    label: 'INICIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  {
    field: 'fin',
    label: 'FIN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tributo Factor con Acciones
export const columnsTributeFactor = ref([
  columnAction,
  ...initialColumnsTributeFactor,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Tributo Factor cuando solo se desea mostrar
export const columnsTributeFactorForShow = ref([...initialColumnsTributeFactor])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Tributo Factor
const initialDataTableTributeFactor = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tributo Factor
export const dataTableTributeFactor = ref({ ...initialDataTableTributeFactor })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Tributo Factor
export const clearDataTableTributeFactor = () => {
  dataTableTributeFactor.value = { ...initialDataTableTributeFactor }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tributo Factor
export const serverQueryTributeFactor = ref({
  ...serverQueryDefault,
  tabla: 'tributofactor',
  pfin: 5,
  campo: 'a.idtributo',
})

// Función para limpiar filtros en la consulta de la tabla Tributo Factor
export const clearFiltersTributeFactor = () => {
  clearServerQueryDefaultFilter(serverQueryTributeFactor)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tributo Factor
const initialStateTributeFactor = {
  _id: 0,
  idTributo: 0,
  factor: 0,
  inicio: null,
  fin: null,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tributo Factor
export const stateTributeFactor = ref({ ...initialStateTributeFactor })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Tributo Factor
export const clearStateTributeFactor = () => {
  stateTributeFactor.value = { ...initialStateTributeFactor }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Tributo Factor
export const columnsFilterTributeFactor = [
  {
    title: 'Id',
    field: 'a._id',
  },
  {
    title: 'factor',
    field: 'a.factor',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Tributo Factor
export const urlApiTributeFactor = '/tributofactor'

// Constante para almacenar el titulo de las notificaciónes de Tributo Factor
export const titleNotificationTributeFactor = 'Tributo Factor'
