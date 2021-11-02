// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Motivo Compra
export const routeNamePurchaseReason = routesName.motivoCompra

// Constante para almacenar el id base de los modales del mantenimiento Motivo Compra
export const MODAL_ID = 'modal-purchase-reason'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Motivo Compra
export const columnsPurchaseReason = ref([
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
    field: 'flgPedidoCompra',
    label: 'PEDIDO COMPRA',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    type: 'boolean',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Motivo Compra
export const dataTablePurchaseReason = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Motivo Compra
export const serverQueryPurchaseReason = ref({
  ...serverQueryDefault,
  tabla: 'motivocompra',
})

// Función para limpiar filtros en la consulta de la tabla Motivo Compra
export const clearFiltersPurchaseReason = () => {
  clearServerQueryDefaultFilter(serverQueryPurchaseReason)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Motivo Compra
const initialStatePurchaseReason = {
  _id: 0,
  nombre: '',
  flgPedidoCompra: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Motivo Compra
export const statePurchaseReason = ref({ ...initialStatePurchaseReason })

// Función para regresar al estado inicial la variable reactiva que gestiona Motivo Compra
export const clearStatePurchaseReason = () => {
  statePurchaseReason.value = { ...initialStatePurchaseReason }
}

// Constante para almacenar las columas permitidas para el filtro de la table Motivo Compra
export const columnsFilterPurchaseReason = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'NOMBRE',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Motivo Compra
export const urlApiPurchaseReason = '/motivocompra'

// Constante para almacenar el título de las notificaciónes del mantenimiento Motivo Compra
export const titleNotificationPurchaseReason = 'Motivo Compra'

// Constante para almacenar el titulo de los reportes del mantenimiento Motivo Compra
export const titleReportPurchaseReason = 'REPORTE DE Motivo Compra'
