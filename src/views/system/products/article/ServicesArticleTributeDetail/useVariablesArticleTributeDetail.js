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

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Artículo Tributo
export const initialColumnsArticleTributeDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreTributo',
    label: 'TRIBUTO',
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

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Artículo Tributo
export const columnsArticleTributeDetail = ref([
  columnAction,
  ...initialColumnsArticleTributeDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Artículo Tributo cuando solo se desea mostrar
export const columnsArticleTributeDetailForShow = ref([...initialColumnsArticleTributeDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Artículo Tributo
const initialDataTableArticleTributeDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Artículo Tributo
export const dataTableArticleTributeDetail = ref({ ...initialDataTableArticleTributeDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Artículo Tributo
export const clearDataTableArticleTributeDetail = () => {
  dataTableArticleTributeDetail.value = { ...initialDataTableArticleTributeDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Artículo Tributo
export const serverQueryArticleTributeDetail = ref({
  ...serverQueryDefault,
  tabla: 'tributoarticulo',
  pfin: 5,
  campo: 'a.idarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Artículo Tributo
export const clearFiltersArticleTributeDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleTributeDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Artículo Tributo
const initialStateArticleTributeDetail = {
  _id: 0,
  idArticulo: 0,
  idTributo: 0,
  factor: 0,
  finicial: null,
  inicial: null,
  ffinal: null,
  final: null,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Artículo Tributo
export const stateArticleTributeDetail = ref({ ...initialStateArticleTributeDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Artículo Tributo
export const clearStateArticleTributeDetail = () => {
  stateArticleTributeDetail.value = { ...initialStateArticleTributeDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Artículo Tributo
export const combosArticleTributeDetail = ref({
  tribute: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Artículo Tributo
export const columnsFilterArticleTributeDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Tributo',
    field: 'a.nombreTributo',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Artículo Tributo
export const urlApiArticleTributeDetail = '/tributoarticulo'

// Constante para almacenar el titulo de las notificaciónes de Detalle Artículo Tributo
export const titleNotificationArticleTributeDetail = 'Detalle Artículo Tributo'
