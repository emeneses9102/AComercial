import { ref } from '@vue/composition-api'
import { columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-search-article'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Artículo
export const columnsArticle = ref([
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
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Artículo
export const dataTableArticle = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Artículo
export const serverQueryArticle = ref({
  ...serverQueryDefault,
  tabla: 'articulos',
})

// Función para limpiar filtros en la consulta de la tabla Artículo
export const clearFiltersArticle = () => {
  clearServerQueryDefaultFilter(serverQueryArticle)
}

// Variable inicializadora para almacenar el estado de un Articulo
const initialStateArticle = {
  _id: 0,
  sku: '',
  nombre: '',
  descripcion: '',
  abreviatura: '',
  idCodUnico: 0,
  nombreCodigoUnico: '',
  flgStock: 1,
  flgServicio: 0,
  flgReceta: 0,
  flgSerie: 0,
  idTipoProducto: 0,
  nombreTipoProducto: '',
  idTipoServicio: 0,
  nombreTipoServicio: '',
  idGrupoUnidad: 15,
  nombreGrupoUnidad: '',
  idUnidad: 11,
  nombreUnidad: '',
  precioCompra: 0,
  precioVenta: 0,
  precioMinimoVenta: 0,
  stockMinimo: 0,
  stockMaximo: 0,
  imagen: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un Articulo
export const stateArticle = ref({ ...initialStateArticle })

// Función para regresar al estado inicial la variable reactiva de Artículos
export const clearStateArticle = () => {
  stateArticle.value = { ...initialStateArticle }
}

// Constante para almacenar las columas permitidas para el filtro de la table Artículos
export const columnsFilterArticle = [
  {
    title: 'ID',
    field: 'a._id',
  },
  {
    title: 'SKU',
    field: 'sku',
  },
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
  {
    title: 'TIPO DE PRODUCTO',
    field: 'a.nombreTipoProducto',
  },
  {
    title: 'GRUPO UNIDAD',
    field: 'a.nombreGrupoUnidad',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Artículos
export const urlApiArticle = '/articulos'

// Constante para almacenar el título de las notificaciónes del Buscador Artículos
export const titleNotificationArticle = 'Artículo'
