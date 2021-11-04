// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { formatDate } from '@/helpers/date'

export const MODAL_ID = 'modal-query-purchase-order-detail'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Pedido Compra
export const initialColumnsPurchaseOrderDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombreTArticulo',
    label: 'ARTÍCULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'precio',
    label: 'PRECIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'subTotal',
    label: 'SUB TOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: value => `${value.toFixed(2)}`,
  },
  {
    field: 'necesario',
    label: 'NECESARIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Pedido Compra con Acciones
export const columnsPurchaseOrderDetail = ref([
  columnAction,
  ...initialColumnsPurchaseOrderDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Pedido Compra cuando solo se desea mostrar
export const columnsPurchaseOrderDetailForShow = ref([...initialColumnsPurchaseOrderDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Pedido Compra
const initialDataTablePurchaseOrderDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Pedido Compra
export const dataTablePurchaseOrderDetail = ref({ ...initialDataTablePurchaseOrderDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Pedido Compra
export const clearDataTablePurchaseOrderDetail = () => {
  dataTablePurchaseOrderDetail.value = { ...initialDataTablePurchaseOrderDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Pedido Compra
export const serverQueryPurchaseOrderDetail = ref({
  ...serverQueryDefault,
  tabla: 'dpedidocompra',
  pfin: 5,
})

// Función para limpiar filtros en la consulta de la tabla Detalle Pedido Compra
export const clearFiltersPurchaseOrderDetail = () => {
  clearServerQueryDefaultFilter(serverQueryPurchaseOrderDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Pedido Compra
const initialStatePurchaseOrderDetail = {
  _id: 0,
  idPedidoCompra: 0,
  idTArticulo: 0,
  nombreTArticulo: '',
  cantidad: 0,
  necesario: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Pedido Compra
export const statePurchaseOrderDetail = ref({ ...initialStatePurchaseOrderDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Pedido Compra
export const clearStatePurchaseOrderDetail = () => {
  statePurchaseOrderDetail.value = { ...initialStatePurchaseOrderDetail }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Pedido Compra
export const columnsFilterPurchaseOrderDetail = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'ARTÍCULO',
    field: 'a.nombreTArticulo',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Pedido Compra
export const urlApiPurchaseOrderDetail = '/dpedidocompra'

// Constante para almacenar el titulo de las notificaciónes de Detalle Pedido Compra
export const titleNotificationPurchaseOrderDetail = 'Detalle Pedido Compra'
