// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-article-children-detail'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Articulo Caracteristica
export const initialColumnsArticleChildrenFeatureDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreCaracteristica',
    label: 'CARACTERÍSTICA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreDCaracteristica',
    label: 'VALOR',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'orden',
    label: 'ORDEN',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Articulo Caracteristica
export const columnsArticleChildrenFeatureDetail = ref([
  columnAction,
  ...initialColumnsArticleChildrenFeatureDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Articulo Caracteristica cuando solo se desea mostrar
export const columnsArticleChildrenFeatureDetailForShow = ref([...initialColumnsArticleChildrenFeatureDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
const initialDataTableArticleChildrenFeatureDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
export const dataTableArticleChildrenFeatureDetail = ref({ ...initialDataTableArticleChildrenFeatureDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
export const clearDataTableArticleChildrenFeatureDetail = () => {
  dataTableArticleChildrenFeatureDetail.value = { ...initialDataTableArticleChildrenFeatureDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Articulo Caracteristica
export const serverQueryArticleChildrenFeatureDetail = ref({
  ...serverQueryDefault,
  tabla: 'tarticulocaracteristica',
  pfin: 5,
  campo: 'a.idtarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Articulo Caracteristica
export const clearFiltersArticleChildrenFeatureDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleChildrenFeatureDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Caracteristica
const initialStateArticleChildrenFeatureDetail = {
  _id: 0,
  idTArticulo: 0,
  idCaracteristica: 0,
  idDtlCaracteristica: 0,
  orden: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Caracteristica
export const stateArticleChildrenFeatureDetail = ref({ ...initialStateArticleChildrenFeatureDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Articulo Caracteristica
export const clearStateArticleChildrenFeatureDetail = () => {
  stateArticleChildrenFeatureDetail.value._id = 0
  stateArticleChildrenFeatureDetail.value.idCaracteristica = 0
  stateArticleChildrenFeatureDetail.value.idDtlCaracteristica = 0
  stateArticleChildrenFeatureDetail.value.orden = 0
  stateArticleChildrenFeatureDetail.value.accion = 0
  stateArticleChildrenFeatureDetail.value.loading = false
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Articulo Caracteristica
export const combosArticleChildrenFeatureDetail = ref({
  feature: { ...initialStateCombo },
  featureDetail: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Articulo Caracteristica
export const columnsFilterArticleChildrenFeatureDetail = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'CARACTERÍSTICA',
    field: 'a.nombrecaracteristica',
  },
  {
    title: 'VALOR',
    field: 'a.nombreDCaracteristica',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Articulo Caracteristica
export const urlApiArticleChildrenFeatureDetail = '/tarticulocaracteristica'

// Constante para almacenar el titulo de las notificaciónes de Detalle Articulo Caracteristica
export const titleNotificationArticleChildrenFeatureDetail = 'Detalle Articulo Caracteristica'
