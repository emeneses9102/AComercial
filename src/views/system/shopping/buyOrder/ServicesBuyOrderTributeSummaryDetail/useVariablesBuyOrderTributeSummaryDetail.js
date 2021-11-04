// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Tributo Resumen Orden de Compra
export const initialColumnsBuyOrderTributeSummaryDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'nombre',
    label: 'TRIBUTO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
  },
  {
    field: 'monto',
    label: 'MONTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Tributo Resumen Orden de Compra con Acciones
export const columnsBuyOrderTributeSummaryDetail = ref([
  columnAction,
  ...initialColumnsBuyOrderTributeSummaryDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Tributo Resumen Orden de Compra cuando solo se desea mostrar
export const columnsBuyOrderTributeSummaryDetailForShow = ref([...initialColumnsBuyOrderTributeSummaryDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Resumen Orden de Compra
const initialDataTableBuyOrderTributeSummaryDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Tributo Resumen Orden de Compra
export const dataTableBuyOrderTributeSummaryDetail = ref({ ...initialDataTableBuyOrderTributeSummaryDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Tributo Resumen Orden de Compra
export const clearDataTableBuyOrderTributeSummaryDetail = () => {
  dataTableBuyOrderTributeSummaryDetail.value = { ...initialDataTableBuyOrderTributeSummaryDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Tributo Resumen Orden de Compra
export const serverQueryBuyOrderTributeSummaryDetail = ref({
  ...serverQueryDefault,
  tabla: 'rordencompratributo',
  pfin: 5,
})

// Función para limpiar filtros en la consulta de la tabla Detalle Tributo Resumen Orden de Compra
export const clearFiltersBuyOrderTributeSummaryDetail = () => {
  clearServerQueryDefaultFilter(serverQueryBuyOrderTributeSummaryDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Resumen Orden de Compra
const initialStateBuyOrderTributeSummaryDetail = {
  _id: 0,
  idOrdenCompra: 0,
  fecha: '',
  idPedidoCompra: 0,
  idDetallePedidoCompra: 0,
  idArticulo: 0,
  idTablaArticulo: 0,
  nombreTablaArticulo: '',
  cantidad: 0,
  precioCompra: 0,
  descuento: 0,
  subTotal: 0,
  total: 0,
  idMotivoCompra: 0,
  nombreMotivoCompra: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Tributo Resumen Orden de Compra
export const stateBuyOrderTributeSummaryDetail = ref({ ...initialStateBuyOrderTributeSummaryDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Tributo Resumen Orden de Compra
export const clearStateBuyOrderTributeSummaryDetail = () => {
  stateBuyOrderTributeSummaryDetail.value = { ...initialStateBuyOrderTributeSummaryDetail }
}

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Tributo Resumen Orden de Compra
export const columnsFilterBuyOrderTributeSummaryDetail = [
  {
    title: 'ID',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Tributo Resumen Orden de Compra
export const urlApiBuyOrderTributeSummaryDetail = '/rordencompratributo'

// Constante para almacenar el titulo de las notificaciónes de Detalle Tributo Resumen Orden de Compra
export const titleNotificationBuyOrderTributeSummaryDetail = 'Detalle Tributo Resumen Orden de Compra'
