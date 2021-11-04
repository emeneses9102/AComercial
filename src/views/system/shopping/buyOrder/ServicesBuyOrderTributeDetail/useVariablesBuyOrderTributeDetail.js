// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Tributo Orden Compra
export const initialColumnsBuyOrderTributeDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreArticulo',
    label: 'ARTÍCULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'tributo',
    label: 'TRIBUTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'precioCompra',
    label: 'PRECIO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'subTotal',
    label: 'SUBTOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'impuesto',
    label: 'IMPUESTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'descuento',
    label: 'DESCUENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'total',
    label: 'TOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Tributo Orden Compra con Acciones
export const columnsBuyOrderTributeDetail = ref([
  columnAction,
  ...initialColumnsBuyOrderTributeDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Tributo Orden Compra cuando solo se desea mostrar
export const columnsBuyOrderTributeDetailForShow = ref([...initialColumnsBuyOrderTributeDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Orden Compra
const initialDataTableBuyOrderTributeDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Orden Compra
export const dataTableBuyOrderTributeDetail = ref({ ...initialDataTableBuyOrderTributeDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Tributo Orden Compra
export const clearDataTableBuyOrderTributeDetail = () => {
  dataTableBuyOrderTributeDetail.value = { ...initialDataTableBuyOrderTributeDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Tributo Orden Compra
export const serverQueryBuyOrderTributeDetail = ref({
  ...serverQueryDefault,
  tabla: 'dordencompratributo',
  pfin: 5,
  campo: 't.idordencompra',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Tributo Orden Compra
export const clearFiltersBuyOrderTributeDetail = () => {
  clearServerQueryDefaultFilter(serverQueryBuyOrderTributeDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Orden Compra
const initialStateBuyOrderTributeDetail = {
  _id: 0,
  idOrdenCompra: 0,
  idDetalleOrdenCompra: 0,
  idTablaArticulo: 0,
  nombreArticulo: '',
  cantidad: 0,
  precioCompra: 0,
  descuento: 0,
  subTotal: 0,
  impuesto: 0,
  total: 0,
  idTributo: 0,
  tributo: '',
  nombreTributo: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Orden Compra
export const stateBuyOrderTributeDetail = ref({ ...initialStateBuyOrderTributeDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Tributo Orden Compra
export const clearStateBuyOrderTributeDetail = () => {
  stateBuyOrderTributeDetail.value = { ...initialStateBuyOrderTributeDetail }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Tributo Orden Compra
export const columnsFilterBuyOrderTributeDetail = [
  {
    title: 'ID',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Tributo Orden Compra
export const urlApiBuyOrderTributeDetail = '/dordencompratributo'

// Constante para almacenar el titulo de las notificaciónes de Detalle Tributo Orden Compra
export const titleNotificationBuyOrderTributeDetail = 'Detalle Tributo Orden Compra'
