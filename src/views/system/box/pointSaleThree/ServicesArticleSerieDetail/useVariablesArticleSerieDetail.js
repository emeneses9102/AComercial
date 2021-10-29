// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import {
  formatDate,
} from '@/helpers/date'

import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-article-children-serie-detail'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Articulo Hijo Serie
export const initialColumnsArticleChildrenSerieDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'serie',
    label: 'SERIE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'observaciones',
    label: 'OBSERVACIONES',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'fabricacion',
    label: 'FABRICACION',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  {
    field: 'vencimiento',
    label: 'VENCIMIENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Articulo Hijo Serie
export const columnsArticleChildrenSerieDetail = ref([
  columnAction,
  ...initialColumnsArticleChildrenSerieDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Articulo Hijo Serie cuando solo se desea mostrar
export const columnsArticleChildrenSerieDetailForShow = ref([...initialColumnsArticleChildrenSerieDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Hijo Serie
const initialDataTableArticleChildrenSerieDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Hijo Serie
export const dataTableArticleChildrenSerieDetail = ref({ ...initialDataTableArticleChildrenSerieDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Articulo Hijo Serie
export const clearDataTableArticleChildrenSerieDetail = () => {
  dataTableArticleChildrenSerieDetail.value = { ...initialDataTableArticleChildrenSerieDetail }
}

export const serverQueryArticleChildrenSerieDetail = ref({
  ...serverQueryDefault,
  tabla: 'darticulos',
  pfin: 5,
  campo: 'a.idtarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Articulo Hijo Serie
export const clearFiltersArticleChildrenSerieDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleChildrenSerieDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Hijo Serie
const initialStateArticleChildrenSerieDetail = {
  _id: 0,
  idTArticulo: 0,
  serie: '',
  observaciones: '',
  fabricacion: '',
  vencimiento: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Hijo Serie
export const stateArticleChildrenSerieDetail = ref({ ...initialStateArticleChildrenSerieDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Articulo Hijo Serie
export const clearStateArticleChildrenSerieDetail = () => {
  stateArticleChildrenSerieDetail.value = { ...initialStateArticleChildrenSerieDetail }
  // stateArticleChildrenSerieDetail.value._id = 0
  // stateArticleChildrenSerieDetail.value.serie = ''
  // stateArticleChildrenSerieDetail.value.observaciones = ''
  // stateArticleChildrenSerieDetail.value.fabricacion = ''
  // stateArticleChildrenSerieDetail.value.vencimiento = ''
  // stateArticleChildrenSerieDetail.value.loading = false
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Articulo Hijo Serie
export const columnsFilterArticleChildrenSerieDetail = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'SERIE',
    field: 'a.serie',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Articulo Hijo Serie
export const urlApiArticleChildrenSerieDetail = '/darticulos'

// Constante para almacenar el titulo de las notificaciónes de Detalle Articulo Hijo Serie
export const titleNotificationArticleChildrenSerieDetail = 'Detalle Articulo Serie'
