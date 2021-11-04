// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Órden Compra
export const initialColumnsBuyOrderDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreTablaArticulo',
    label: 'ARTÍCULO',
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
    field: 'descuento',
    label: 'DESCUENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'subTotal',
    label: 'SUBTOTAL',
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
  {
    field: 'nombreMotivoCompra',
    label: 'MOTIVO COMPRA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Órden Compra con Acciones
export const columnsBuyOrderDetail = ref([
  columnAction,
  ...initialColumnsBuyOrderDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Órden Compra cuando solo se desea mostrar
export const columnsBuyOrderDetailForShow = ref([...initialColumnsBuyOrderDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Órden Compra
const initialDataTableBuyOrderDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Órden Compra
export const dataTableBuyOrderDetail = ref({ ...initialDataTableBuyOrderDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Órden Compra
export const clearDataTableBuyOrderDetail = () => {
  dataTableBuyOrderDetail.value = { ...initialDataTableBuyOrderDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Órden Compra
export const serverQueryBuyOrderDetail = ref({
  ...serverQueryDefault,
  tabla: 'dordencompra',
  pfin: 5,
  campo: 'a.idordencompra',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Órden Compra
export const clearFiltersBuyOrderDetail = () => {
  clearServerQueryDefaultFilter(serverQueryBuyOrderDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Órden Compra
const initialStateBuyOrderDetail = {
  _id: 0,
  idOrdenCompra: 0,
  fecha: '',
  idPedidoCompra: 0,
  idDetallePedidoCompra: 0,
  idArticulo: 0,
  idTablaArticulo: 0,
  nombreTablaArticulo: '',
  cantidad: 0,
  cantidadMax: 0,
  precioCompra: 0,
  descuento: 0,
  subTotal: 0,
  total: 0,
  idMotivoCompra: 0,
  nombreMotivoCompra: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Órden Compra
export const stateBuyOrderDetail = ref({ ...initialStateBuyOrderDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Órden Compra
export const clearStateBuyOrderDetail = () => {
  stateBuyOrderDetail.value = { ...initialStateBuyOrderDetail }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Orden Compra
export const combosBuyOrderDetail = ref({
  purchaseReason: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Órden Compra
export const columnsFilterBuyOrderDetail = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'ARTÍCULO',
    field: 'a.nombreTablaArticulo',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Órden Compra
export const urlApiBuyOrderDetail = '/dordencompra'

// Constante para almacenar el titulo de las notificaciónes de Detalle Órden Compra
export const titleNotificationBuyOrderDetail = 'Detalle Órden Compra'
