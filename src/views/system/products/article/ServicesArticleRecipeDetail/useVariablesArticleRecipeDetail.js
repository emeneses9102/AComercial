// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Articulo Receta
export const initialColumnsArticleRecipeDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreReceta',
    label: 'RECETA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreGrupo',
    label: 'GRUPO UNIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreUnidad',
    label: 'UNIDAD MEDIDA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Articulo Receta
export const columnsArticleRecipeDetail = ref([
  columnAction,
  ...initialColumnsArticleRecipeDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Articulo Receta cuando solo se desea mostrar
export const columnsArticleRecipeDetailForShow = ref([...initialColumnsArticleRecipeDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Receta
const initialDataTableArticleRecipeDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Articulo Receta
export const dataTableArticleRecipeDetail = ref({ ...initialDataTableArticleRecipeDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Articulo Receta
export const clearDataTableArticleRecipeDetail = () => {
  dataTableArticleRecipeDetail.value = { ...initialDataTableArticleRecipeDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Articulo Receta
export const serverQueryArticleRecipeDetail = ref({
  ...serverQueryDefault,
  tabla: 'receta',
  pfin: 5,
  campo: 'a.idarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Articulo Receta
export const clearFiltersArticleRecipeDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleRecipeDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Receta
const initialStateArticleRecipeDetail = {
  _id: 0,
  idArticulo: 0,
  idReceta: 0,
  nombreReceta: '',
  idGrupoUnidad: 0,
  nombreGrupoUnidad: '',
  idUnidad: 0,
  cantidad: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Articulo Receta
export const stateArticleRecipeDetail = ref({ ...initialStateArticleRecipeDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Articulo Receta
export const clearStateArticleRecipeDetail = () => {
  stateArticleRecipeDetail.value = { ...initialStateArticleRecipeDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Articulo Receta
export const combosArticleRecipeDetail = ref({
  unitMeasure: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Articulo Receta
export const columnsFilterArticleRecipeDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Receta',
    field: 'a.nombrereceta',
  },
  {
    title: 'Grupo',
    field: 'a.nombregrupo',
  },
  {
    title: 'Unidad',
    field: 'a.nombreunidad',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Articulo Receta
export const urlApiArticleRecipeDetail = '/articulosreceta'

// Constante para almacenar el titulo de las notificaciónes de Detalle Articulo Receta
export const titleNotificationArticleRecipeDetail = 'Detalle Articulo Receta'
