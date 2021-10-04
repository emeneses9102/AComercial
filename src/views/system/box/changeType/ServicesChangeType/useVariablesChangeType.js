// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'
import { formatDate } from '@/helpers/date'

// Nombre de la ruta que usa el mantenimiento Tipo de Cambio
export const routeNameChangeType = routesName.tipoCambio

// Constante para almacenar el id base de los modales del mantenimiento Tipo de Cambio
export const MODAL_ID = 'modal-change-type'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Tipo de Cambio
export const columnsChangeType = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'fecha',
    label: 'FECHA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: formatDate,
    pdf: true,
  },
  {
    field: 'nombreMoneda',
    label: 'MONEDA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'compra',
    label: 'COMPRA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: value => value.toFixed(4),
    pdf: true,
  },
  {
    field: 'venta',
    label: 'VENTA',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    formatFn: value => value.toFixed(4),
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Tipo de Cambio
export const dataTableChangeType = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Tipo de Cambio
export const serverQueryChangeType = ref({
  ...serverQueryDefault,
  tabla: 'tipocambio',
})

// Función para limpiar filtros en la consulta de la tabla Tipo de Cambio
export const clearFiltersChangeType = () => {
  clearServerQueryDefaultFilter(serverQueryChangeType)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo de Cambio
const initialStateChangeType = {
  _id: 0,
  fecha: null,
  idMoneda: 0,
  nombreMoneda: '',
  compra: 0.0000,
  venta: 0.0000,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Tipo de Cambio
export const stateChangeType = ref({ ...initialStateChangeType })

// Función para regresar al estado inicial la variable reactiva que gestiona Tipo de Cambio
export const clearStateChangeType = () => {
  stateChangeType.value = { ...initialStateChangeType }
}

// Variable reactiva para almacenar los combos que se manejaran en el mantenimiento Tipo de Cambio
export const combosChangeType = ref({
  currency: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Tipo de Cambio
export const columnsFilterChangeType = [
  {
    title: 'ID',
    field: 'a._id',
  },
  {
    title: 'MONEDA',
    field: 'a.nombreMoneda',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Tipo de Cambio
export const urlApiChangeType = '/tipocambio'

// Constante para almacenar el título de las notificaciónes del mantenimiento Tipo de Cambio
export const titleNotificationChangeType = 'Tipo de Cambio'

// Constante para almacenar el titulo de los reportes del mantenimiento Tipo de Cambio
export const titleReportChangeType = 'REPORTE DE TIPO DE CAMBIO'
