// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Acceso Opción
export const initialColumnsAccessOptionDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreOpcion',
    label: 'OPCIÓN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Acceso Opción
export const columnsAccessOptionDetail = ref([
  columnAction,
  ...initialColumnsAccessOptionDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Acceso Opción cuando solo se desea mostrar
export const columnsAccessOptionDetailForShow = ref([...initialColumnsAccessOptionDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Acceso Opción
const initialDataTableAccessOptionDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Acceso Opción
export const dataTableAccessOptionDetail = ref({ ...initialDataTableAccessOptionDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Acceso Opción
export const clearDataTableAccessOptionDetail = () => {
  dataTableAccessOptionDetail.value = { ...initialDataTableAccessOptionDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Acceso Opción
export const serverQueryAccessOptionDetail = ref({
  ...serverQueryDefault,
  tabla: 'accesosopcion',
  pfin: 5,
  campo: 'a.idacceso',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Acceso Opción
export const clearFiltersAccessOptionDetail = () => {
  clearServerQueryDefaultFilter(serverQueryAccessOptionDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Acceso Opción
const initialStateAccessOptionDetail = {
  _id: 0,
  idacceso: 0,
  idOpcion: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Acceso Opción
export const stateAccessOptionDetail = ref({ ...initialStateAccessOptionDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Acceso Opción
export const clearStateAccessOptionDetail = () => {
  stateAccessOptionDetail.value = { ...initialStateAccessOptionDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Acceso Opción
export const combosAccessOptionDetail = ref({
  option: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Acceso Opción
export const columnsFilterAccessOptionDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Opción',
    field: 'a.nombreopcion',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Acceso Opción
export const urlApiAccessOptionDetail = '/accesoopcion'

// Constante para almacenar el titulo de las notificaciónes de Detalle Acceso Opción
export const titleNotificationAccessOptionDetail = 'Detalle Acceso Opción'
