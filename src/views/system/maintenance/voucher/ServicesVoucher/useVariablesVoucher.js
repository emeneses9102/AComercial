// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Comprobantes
export const routeNameVoucher = routesName.comprobantes

// Constante para almacenar el id base de los modales del mantenimiento Comprobantes
export const MODAL_ID = 'modal-voucher'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Comprobantes
export const columnsVoucher = ref([
  columnAction,
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'Nombre',
    field: 'nombre',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'Comprobante Sunat',
    field: 'nombreComprobante',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'Operacion',
    field: 'nombreOperacion',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'Tipo comprobante',
    field: 'nombreTipoComprobante',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Comprobantes
export const dataTableVoucher = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Comprobantes
export const serverQueryVoucher = ref({
  ...serverQueryDefault,
  tabla: 'comprobante',
})

// Función para limpiar filtros en la consulta de la tabla Comprobantes
export const clearFiltersVoucher = () => {
  clearServerQueryDefaultFilter(serverQueryVoucher)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Comprobantes
const initialStateVoucher = {
  _id: 0,
  nombre: '',
  idComprobante: 0,
  idOperacion: 0,
  idTipoComprobante: 0,
  nombreComprobante: '',
  nombreOperacion: '',
  nombreTipoComprobante: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Comprobantes
export const stateVoucher = ref({ ...initialStateVoucher })

// Función para regresar al estado inicial la variable reactiva que gestiona Comprobantes
export const clearStateVoucher = () => {
  stateVoucher.value = { ...initialStateVoucher }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Comprobantes
export const combosVoucher = ref({
  voucherSunat: { ...initialStateCombo },
  operationSunat: { ...initialStateCombo },
  voucherTypeSunat: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la tabla Comprobantes
export const columnsFilterVoucher = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
  {
    title: 'Comprobante Sunat',
    field: 'a.nombreComprobante',
  },
  {
    title: 'Operación',
    field: 'a.nombreOperacion',
  },
  {
    title: 'Tipo Comprobante',
    field: 'a.nombreTipoComprobante',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Comprobantes
export const urlApiVoucher = '/comprobante'

// Constante para almacenar el título de las notificaciónes del mantenimiento Comprobantes
export const titleNotificationVoucher = 'Comprobantes'

// Constante para almacenar el titulo de los reportes del mantenimiento Comprobantes
export const titleReportVoucher = 'REPORTE DE COMPROBANTES'
