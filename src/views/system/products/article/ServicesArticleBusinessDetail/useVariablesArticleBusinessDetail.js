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
  clearServerQueryDefaultFilter,
  serverQueryDefault,
} from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Articulo Negocio
export const initialColumnsArticleBusinessDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  // {
  //   field: 'nombreTributo',
  //   label: 'TRIBUTO',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  // },
  // {
  //   field: 'factor',
  //   label: 'FACTOR',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  // },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Articulo Negocio
export const columnsArticleBusinessDetail = ref([
  columnAction,
  ...initialColumnsArticleBusinessDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Articulo Negocio cuando solo se desea mostrar
export const columnsArticleBusinessDetailForShow = ref([...initialColumnsArticleBusinessDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Negocio
const initialDataTableArticleBusinessDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Negocio
export const dataTableArticleBusinessDetail = ref({ ...initialDataTableArticleBusinessDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Articulo Negocio
export const clearDataTableArticleBusinessDetail = () => {
  dataTableArticleBusinessDetail.value = { ...initialDataTableArticleBusinessDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Articulo Negocio
export const serverQueryArticleBusinessDetail = ref({
  ...serverQueryDefault,
  tabla: 'articulonegocio',
  pfin: 5,
  campo: 'a.idarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Articulo Negocio
export const clearFiltersArticleBusinessDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleBusinessDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Negocio
const initialStateArticleBusinessDetail = {
  _id: 0,
  idArticulo: 0,
  idNegocio: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Negocio
export const stateArticleBusinessDetail = ref({ ...initialStateArticleBusinessDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Articulo Negocio
export const clearStateArticleBusinessDetail = () => {
  stateArticleBusinessDetail.value = { ...initialStateArticleBusinessDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Articulo Negocio
export const combosArticleBusinessDetail = ref({
  businessUnit: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Articulo Negocio
export const columnsFilterArticleBusinessDetail = [
  {
    title: 'Id',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Articulo Negocio
export const urlApiArticleBusinessDetail = '/articulonegocio'

// Constante para almacenar el titulo de las notificaciónes de Detalle Articulo Negocio
export const titleNotificationArticleBusinessDetail = 'Detalle Articulo Negocio'
