// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import {
  columnAction,
  columnStatus,
} from '@/helpers/columnsTable'

import {
  clearServerQueryDefaultFilter,
  serverQueryDefault,
} from '@/helpers/serverQuery'

import {
  stateArticle,
} from '../ServicesArticle/useVariablesArticle'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Artículo Hijos
export const initialColumnsArticleChildrenDetail = [
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombre',
    label: 'NOMBRE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreArticuloPadre',
    label: 'NOMBRE PADRE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreTipoProducto',
    label: 'TIPO PRODUCTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreUnidad',
    label: 'UNIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'precioVenta',
    label: 'PRECIO VENTA',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
    type: 'numberMoney',
  },
  {
    field: 'precioMinimoVenta',
    label: 'PRECIO MIN. VENTA',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
    type: 'numberMoney',
  },
  {
    field: 'flgStock',
    label: 'STOCK',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  {
    field: 'flgServicio',
    label: 'SERVICIO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  {
    field: 'flgReceta',
    label: 'RECETA',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  {
    field: 'stockMinimo',
    label: 'STOCK MIN.',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    pdf: true,
  },
  {
    field: 'stockMaximo',
    label: 'STOCK MAX.',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Artículo Hijos
export const columnsArticleChildrenDetail = ref([
  // columnAction,
  ...initialColumnsArticleChildrenDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Artículo Hijos cuando solo se desea mostrar
export const columnsArticleChildrenDetailForShow = ref([...initialColumnsArticleChildrenDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Artículo Hijos
const initialDataTableArticleChildrenDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Artículo Hijos
export const dataTableArticleChildrenDetail = ref({ ...initialDataTableArticleChildrenDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Artículo Hijos
export const clearDataTableArticleChildrenDetail = () => {
  dataTableArticleChildrenDetail.value = { ...initialDataTableArticleChildrenDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Artículo Hijos
export const serverQueryArticleChildrenDetail = ref({
  ...serverQueryDefault,
  tabla: 'tarticulos',
  pfin: 5,
  campo: 'a.idarticulo',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Artículo Hijos
export const clearFiltersArticleChildrenDetail = () => {
  clearServerQueryDefaultFilter(serverQueryArticleChildrenDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Artículo Hijos
const initialStateArticleChildrenDetail = {
  _id: 0,
  idArticulo: 0,
  codInterno: '',
  codBarra: '',
  codFabricante: '',
  nombre: '',
  descripcion: '',
  precioCompra: 0,
  precioVenta: 0,
  precioMinimoVenta: 0,
  stockMinimo: 0,
  stockMaximo: 0,
  imagen: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Artículo Hijos
export const stateArticleChildrenDetail = ref({ ...initialStateArticleChildrenDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Artículo Hijos
export const clearStateArticleChildrenDetail = () => {
  stateArticleChildrenDetail.value = { ...initialStateArticleChildrenDetail }
}

export const equalizeStateArticleChildrenDetail = () => {
  stateArticleChildrenDetail.value._id = 0
  stateArticleChildrenDetail.value.idArticulo = stateArticle.value._id
  stateArticleChildrenDetail.value.codInterno = stateArticle.value.codInterno
  stateArticleChildrenDetail.value.codBarra = stateArticle.value.codBarra
  stateArticleChildrenDetail.value.codFabricante = stateArticle.value.codFabricante
  stateArticleChildrenDetail.value.nombre = stateArticle.value.nombre
  stateArticleChildrenDetail.value.descripcion = stateArticle.value.descripcion
  stateArticleChildrenDetail.value.precioCompra = stateArticle.value.precioCompra
  stateArticleChildrenDetail.value.precioVenta = stateArticle.value.precioVenta
  stateArticleChildrenDetail.value.precioMinimoVenta = stateArticle.value.precioMinimoVenta
  stateArticleChildrenDetail.value.stockMinimo = stateArticle.value.stockMinimo
  stateArticleChildrenDetail.value.stockMaximo = stateArticle.value.stockMaximo
  stateArticleChildrenDetail.value.imagen = ''
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Artículo Hijos
export const columnsFilterArticleChildrenDetail = [
  {
    title: 'Id',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Artículo Hijos
export const urlApiArticleChildrenDetail = '/tarticulos'

// Constante para almacenar el titulo de las notificaciónes de Detalle Artículo Hijos
export const titleNotificationArticleChildrenDetail = 'Detalle Artículo Altas'
