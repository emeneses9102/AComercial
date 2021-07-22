// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Usuario Negocio
export const initialColumnsUserBusinessDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreNegocio',
    label: 'NEGOCIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Usuario Negocio
export const columnsUserBusinessDetail = ref([
  columnAction,
  ...initialColumnsUserBusinessDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Usuario Negocio cuando solo se desea mostrar
export const columnsUserBusinessDetailForShow = ref([...initialColumnsUserBusinessDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Usuario Negocio
const initialDataTableUserBusinessDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Usuario Negocio
export const dataTableUserBusinessDetail = ref({ ...initialDataTableUserBusinessDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Usuario Negocio
export const clearDataTableUserBusinessDetail = () => {
  dataTableUserBusinessDetail.value = { ...initialDataTableUserBusinessDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Usuario Negocio
export const serverQueryUserBusinessDetail = ref({
  ...serverQueryDefault,
  tabla: 'usuarionegocio',
  pfin: 5,
  campo: 'a.idusuario',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Usuario Negocio
export const clearFiltersUserBusinessDetail = () => {
  clearServerQueryDefaultFilter(serverQueryUserBusinessDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Usuario Negocio
const initialStateUserBusinessDetail = {
  _id: 0,
  idUsuario: 0,
  idNegocio: 0,
  idLogin: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Usuario Negocio
export const stateUserBusinessDetail = ref({ ...initialStateUserBusinessDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Usuario Negocio
export const clearStateUserBusinessDetail = () => {
  stateUserBusinessDetail.value = { ...initialStateUserBusinessDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Usuario Negocio
export const combosUserBusinessDetail = ref({
  businessUnit: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Usuario Negocio
export const columnsFilterUserBusinessDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Negocio',
    field: 'a.nombrenegocio',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Usuario Negocio
export const urlApiUserBusinessDetail = '/usuarionegocio'

// Constante para almacenar el titulo de las notificaciónes de Detalle Usuario Negocio
export const titleNotificationUserBusinessDetail = 'Detalle Usuario Negocio'
