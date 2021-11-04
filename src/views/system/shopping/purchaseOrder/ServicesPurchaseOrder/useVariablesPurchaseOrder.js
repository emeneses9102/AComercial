// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { formatDate } from '@/helpers/date'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Pedido Compra
export const routeNamePurchaseOrder = routesName.pedidoCompra

// Constante para almacenar el id base de los modales del mantenimiento Pedido Compra
export const MODAL_ID = 'modal-purchase-order'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Pedido Compra
export const columnsPurchaseOrder = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreArea',
    label: 'ÁREA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreSucursal',
    label: 'SUCURSAL',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreSolicitante',
    label: 'SOLICITANTE',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'prioridad',
    label: 'PRIORIDAD',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  {
    field: 'necesario',
    label: 'NECESARIO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  {
    field: 'validohasta',
    label: 'VALIDO HASTA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
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
    field: 'rechazado',
    label: 'RECHAZADO',
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
    field: 'faprobado',
    label: 'FECHA APROBADO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  {
    field: 'frechazado',
    label: 'FECHA RECHAZO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Pedido Compra
export const dataTablePurchaseOrder = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Pedido Compra
export const serverQueryPurchaseOrder = ref({
  ...serverQueryDefault,
  tabla: 'pedidocompra',
})

// Función para limpiar filtros en la consulta de la tabla Pedido Compra
export const clearFiltersPurchaseOrder = () => {
  clearServerQueryDefaultFilter(serverQueryPurchaseOrder)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Pedido Compra
const initialStatePurchaseOrder = {
  _id: 0,
  idArea: 0,
  nombreArea: '',
  idSucursal: 0,
  nombreSucursal: '',
  prioridad: 0,
  necesario: '',
  validohasta: '',
  observacion: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Pedido Compra
export const statePurchaseOrder = ref({ ...initialStatePurchaseOrder })

// Función para regresar al estado inicial la variable reactiva que gestiona Pedido Compra
export const clearStatePurchaseOrder = () => {
  statePurchaseOrder.value = { ...initialStatePurchaseOrder }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Pedido Compra
export const combosPurchaseOrder = ref({
  area: { ...initialStateCombo },
  branchOffice: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Pedido Compra
export const columnsFilterPurchaseOrder = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'ÁREA',
    field: 'a.nombreArea',
  },
  {
    title: 'SUCURSAL',
    field: 'a.nombreSucursal',
  },
  {
    title: 'SOLICITANTE',
    field: 'a.nombreSolicitante',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Pedido Compra
export const urlApiPurchaseOrder = '/pedidocompra'

// Constante para almacenar el título de las notificaciónes del mantenimiento Pedido Compra
export const titleNotificationPurchaseOrder = 'Pedido Compra'

// Constante para almacenar el titulo de los reportes del mantenimiento Pedido Compra
export const titleReportPurchaseOrder = 'REPORTE DE PEDIDOS DE COMPRA'
