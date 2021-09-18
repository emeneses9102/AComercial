// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'

// Constante para almacenar el id base de los modales del mantenimiento Artículo
export const MODAL_ID = 'modal-article'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Artículo
export const columnsArticle = ref([
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
    formatFn: value => `S/. ${value.toFixed(2)}`,
    pdf: true,
    type: 'numberMoney',
  },
  {
    field: 'precioMinimoVenta',
    label: 'PRECIO MIN. VENTA',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `S/. ${value.toFixed(2)}`,
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
    field: 'flgSerie',
    label: 'SERIE',
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

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Artículo
const initialStateArticle = {
  _id: 0,
  sku: '',
  nombre: '',
  descripcion: '',
  abreviatura: '',
  idCodUnico: 0,
  codUnico: 0,
  nombreCodigoUnico: '',
  codInterno: '',
  codBarra: '',
  codFabricante: '',
  flgStock: 1,
  flgServicio: 0,
  flgReceta: 0,
  flgSerie: 0,
  idTipoProducto: 0,
  nombreTipoProducto: '',
  idTipoServicio: 0,
  nombreTipoServicio: '',
  idGrupoUnidad: 0,
  nombreGrupoUnidad: '',
  idUnidad: 0,
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

// Variable Reactiva para almacenar el valor de un radioButton (Stock | Servicio)
export const selectedArticleType = ref('stock')

export const resetSelectedArticleType = () => {
  selectedArticleType.value = 'stock'
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Artículo
export const stateArticle = ref({ ...initialStateArticle })

// Función para regresar al estado inicial la variable reactiva que gestiona Artículos
export const clearStateArticle = () => {
  stateArticle.value = { ...initialStateArticle }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Articulo
export const combosArticle = ref({
  productType: { ...initialStateCombo },
  serviceType: { ...initialStateCombo },
  unitGroup: { ...initialStateCombo },
  unitMeasure: { ...initialStateCombo },
})

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
  {
    title: 'CÓDIGO UNICO',
    field: 'a.codigoUnico',
  },
  {
    title: 'CÓDIGO INTERNO',
    field: 'a.codInterno',
  },
  {
    title: 'CÓDIGO BARRA',
    field: 'a.codBarra',
  },
  {
    title: 'CÓDIGO FABRICANTE',
    field: 'a.codFabricante',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Artículos
export const urlApiArticle = '/articulos'

// Constante para almacenar el título de las notificaciónes del mantenimiento Artículos
export const titleNotificationArticle = 'Artículo'

// Constante para almacenar el titulo de los reportes del mantenimiento Artículos
export const titleReportArticle = 'REPORTE DE ARTÍCULOS'
