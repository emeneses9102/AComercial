// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Menú Opción
export const initialColumnsMenuOptionDetail = [
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

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Menú Opción
export const columnsMenuOptionDetail = ref([
  columnAction,
  ...initialColumnsMenuOptionDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Menú Opción cuando solo se desea mostrar
export const columnsMenuOptionDetailForShow = ref([...initialColumnsMenuOptionDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Menú Opción
const initialDataTableMenuOptionDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Menú Opción
export const dataTableMenuOptionDetail = ref({ ...initialDataTableMenuOptionDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Menú Opción
export const clearDataTableMenuOptionDetail = () => {
  dataTableMenuOptionDetail.value = { ...initialDataTableMenuOptionDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Menú Opción
export const serverQueryMenuOptionDetail = ref({
  ...serverQueryDefault,
  tabla: 'menuopciones',
  pfin: 5,
  campo: 'a.idmenu',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Menú Opción
export const clearFiltersMenuOptionDetail = () => {
  clearServerQueryDefaultFilter(serverQueryMenuOptionDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Menú Opción
const initialStateMenuOptionDetail = {
  _id: 0,
  idMenu: 0,
  idOpcion: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Menú Opción
export const stateMenuOptionDetail = ref({ ...initialStateMenuOptionDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Menú Opción
export const clearStateMenuOptionDetail = () => {
  stateMenuOptionDetail.value = { ...initialStateMenuOptionDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Menú Opción
export const combosMenuOptionDetail = ref({
  option: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Menú Opción
export const columnsFilterMenuOptionDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Opción',
    field: 'a.nombreopcion',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Menú Opción
export const urlApiMenuOptionDetail = '/menuopciones'

// Constante para almacenar el titulo de las notificaciónes de Detalle Menú Opción
export const titleNotificationMenuOptionDetail = 'Detalle Menú Opción'
