// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import {
  columnAction,
  columnStatus,
} from '@/helpers/columnsTable'

import {
  initialStateCombo,
} from '@/helpers/combos'

import {
  formatDate,
} from '@/helpers/date'

import {
  clearServerQueryDefaultFilter,
  serverQueryDefault,
} from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Tributo Tipo
export const initialColumnsTributeTypeDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreTipoProducto',
    label: 'TIPO PRODUCTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreTipoServicio',
    label: 'TIPO SERVICIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'factor',
    label: 'FACTOR',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'inicial',
    label: 'INICIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  {
    field: 'final',
    label: 'FIN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Tributo Tipo
export const columnsTributeTypeDetail = ref([
  columnAction,
  ...initialColumnsTributeTypeDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Tributo Tipo cuando solo se desea mostrar
export const columnsTributeTypeDetailForShow = ref([...initialColumnsTributeTypeDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Tipo
const initialDataTableTributeTypeDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Tipo
export const dataTableTributeTypeDetail = ref({ ...initialDataTableTributeTypeDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Tributo Tipo
export const clearDataTableTributeTypeDetail = () => {
  dataTableTributeTypeDetail.value = { ...initialDataTableTributeTypeDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Tributo Tipo
export const serverQueryTributeTypeDetail = ref({
  ...serverQueryDefault,
  tabla: 'tributoarticulo',
  pfin: 5,
  campo: 'a.idTributo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Tributo Tipo
export const clearFiltersTributeTypeDetail = () => {
  clearServerQueryDefaultFilter(serverQueryTributeTypeDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Tipo
const initialStateTributeTypeDetail = {
  _id: 0,
  idArticulo: 0,
  idTipoProducto: 0,
  idTipoServicio: 0,
  idTributo: 0,
  factor: 0,
  finicial: null,
  inicial: null,
  ffinal: null,
  final: null,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Tipo
export const stateTributeTypeDetail = ref({ ...initialStateTributeTypeDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Tributo Tipo
export const clearStateTributeTypeDetail = () => {
  stateTributeTypeDetail.value = { ...initialStateTributeTypeDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Tributo Tipo
export const combosTributeTypeDetail = ref({
  productType: { ...initialStateCombo },
  serviceType: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Tributo Tipo
export const columnsFilterTributeTypeDetail = [
  {
    title: 'ID',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Tributo Tipo
export const urlApiTributeTypeDetail = '/tributoarticulo'

// Constante para almacenar el titulo de las notificaciónes de Detalle Tributo Tipo
export const titleNotificationTributeTypeDetail = 'Detalle Tributo Tipo'
