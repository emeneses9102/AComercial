// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Articulo Caracteristica
export const initialColumnsArticleFeatureDetail = [
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
export const columnsArticleFeatureDetail = ref([
  columnAction,
  ...initialColumnsArticleFeatureDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Articulo Caracteristica cuando solo se desea mostrar
export const columnsArticleFeatureDetailForShow = ref([...initialColumnsArticleFeatureDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
const initialDataTableArticleFeatureDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
export const dataTableArticleFeatureDetail = ref({ ...initialDataTableArticleFeatureDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Articulo Caracteristica
export const clearDataTableArticleFeatureDetail = () => {
  dataTableArticleFeatureDetail.value = { ...initialDataTableArticleFeatureDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Articulo Caracteristica
export const serverQueryArticleFeatureDetail = ref({
  ...serverQueryDefault,
  tabla: 'articulocaracteristica',
  pfin: 5,
  campo: 'a.idarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Articulo Caracteristica
export const clearFiltersArticleFeatureDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleFeatureDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Caracteristica
const initialStateArticleFeatureDetail = {
  _id: 0,
  idArticulo: 0,
  idCaracteristica: 0,
  idDtlCaracteristica: 0,
  orden: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Caracteristica
export const stateArticleFeatureDetail = ref({ ...initialStateArticleFeatureDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Articulo Caracteristica
export const clearStateArticleFeatureDetail = () => {
  stateArticleFeatureDetail.value = { ...initialStateArticleFeatureDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Articulo Caracteristica
export const combosArticleFeatureDetail = ref({
  feature: { ...initialStateCombo },
  featureDetail: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Articulo Caracteristica
export const columnsFilterArticleFeatureDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Característica',
    field: 'a.nombrecaracteristica',
  },
  {
    title: 'Valor',
    field: 'a.nombreDCaracteristica',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Articulo Caracteristica
export const urlApiArticleFeatureDetail = '/articulocaracteristica'

// Constante para almacenar el titulo de las notificaciónes de Detalle Articulo Caracteristica
export const titleNotificationArticleFeatureDetail = 'Detalle Articulo Caracteristica'
