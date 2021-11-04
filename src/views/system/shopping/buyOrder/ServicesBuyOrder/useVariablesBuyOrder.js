// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'
import { initialStateCombo } from '@/helpers/combos'
import { formatDate } from '@/helpers/date'

// Nombre de la ruta que usa el mantenimiento Orden Compra
export const routeNameBuyOrder = routesName.ordenCompra

// Constante para almacenar el id base de los modales del mantenimiento Orden Compra
export const MODAL_ID = 'modal-buy-order'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Orden Compra
export const columnsBuyOrder = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'entrega',
    label: 'ENTREGA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  {
    field: 'pedidoCompra',
    label: 'PEDIDO COMPRA',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  {
    field: 'nombreProveedor',
    label: 'PROVEEDOR',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreFormaPago',
    label: 'FORMA PAGO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'prioridad',
    label: 'PRIORIDAD',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    pdf: true,
  },
  {
    field: 'nombreFormato',
    label: 'FORMATO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'subTotal',
    label: 'SUBTOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'tributos',
    label: 'TRIBUTOS',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'descuento',
    label: 'DESCUENTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'total',
    label: 'TOTAL',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'aprobado',
    label: 'APROBADO',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  {
    field: 'atendido',
    label: 'ATENDIDO',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  {
    field: 'cerrado',
    label: 'CERRADO',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  {
    field: 'anulado',
    label: 'ANULADO',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Orden Compra
export const dataTableBuyOrder = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Orden Compra
export const serverQueryBuyOrder = ref({
  ...serverQueryDefault,
  tabla: 'ordencompra',
})

// Función para limpiar filtros en la consulta de la tabla Orden Compra
export const clearFiltersBuyOrder = () => {
  clearServerQueryDefaultFilter(serverQueryBuyOrder)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Orden Compra
const initialStateBuyOrder = {
  _id: 0,
  fecha: '',
  entrega: '',
  pedidoCompra: 0,
  idMoneda: 0,
  nombreMoneda: '',
  idProveedor: 0,
  nombreProveedor: '',
  idFormaPago: 0,
  nombreFormaPago: '',
  prioridad: 0, // 0 - 9
  observacion: '',
  idAtendido: 0,
  nombreAtendido: '',
  atendido: 0,
  fatendido: '',
  idAprobado: 0,
  nombreAprobado: '',
  aprobado: '',
  faprobado: '',
  cerrado: 0,
  anulado: 0,
  idAnula: 0,
  fanula: '',
  subTotal: 0,
  descuento: 0,
  tributos: 0,
  total: 0,
  idFormato: 0,
  nombreFormato: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Orden Compra
export const stateBuyOrder = ref({ ...initialStateBuyOrder })

// Función para regresar al estado inicial la variable reactiva que gestiona Orden Compra
export const clearStateBuyOrder = () => {
  stateBuyOrder.value = { ...initialStateBuyOrder }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Orden Compra
export const combosBuyOrder = ref({
  currency: { ...initialStateCombo },
  paymentForm: { ...initialStateCombo },
  format: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la table Orden Compra
export const columnsFilterBuyOrder = [
  {
    title: 'ID',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Orden Compra
export const urlApiBuyOrder = '/ordencompra'

// Constante para almacenar el título de las notificaciónes del mantenimiento Orden Compra
export const titleNotificationBuyOrder = 'Órden Compra'

// Constante para almacenar el titulo de los reportes del mantenimiento Orden Compra
export const titleReportBuyOrder = 'REPORTE DE ÓRDEN COMPRA'
