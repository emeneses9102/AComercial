// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import { initialStateCombo } from '@/helpers/combos'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento Medio de Pago
export const routeNamePaymentMethod = routesName.medioPago

// Constante para almacenar el id base de los modales del mantenimiento Medio de Pago
export const MODAL_ID = 'modal-payment-method'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Medio de Pago
export const columnsPaymentMethod = ref([
  columnAction,
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreMedioPago',
    label: 'DESCRIPCIÓN SUNAT',
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
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Medio de Pago
export const dataTablePaymentMethod = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Medio de Pago
export const serverQueryPaymentMethod = ref({
  ...serverQueryDefault,
  tabla: 'mediopago',
})

// Función para limpiar filtros en la consulta de la tabla Medio de Pago
export const clearFiltersPaymentMethod = () => {
  clearServerQueryDefaultFilter(serverQueryPaymentMethod)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Medio de Pago
const initialStatePaymentMethod = {
  _id: 0,
  idCodigoSunat: 0,
  nombreMedioPago: '',
  nombre: '',
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Medio de Pago
export const statePaymentMethod = ref({ ...initialStatePaymentMethod })

// Función para regresar al estado inicial la variable reactiva que gestiona Medio de Pago
export const clearStatePaymentMethod = () => {
  statePaymentMethod.value = { ...initialStatePaymentMethod }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Medio de Pago
export const combosPaymentMethod = ref({
  paymentMethodSunat: { ...initialStateCombo },
})

// Constante para almacenar las columas permitidas para el filtro de la table Medio de Pago
export const columnsFilterPaymentMethod = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Medio de Pago
export const urlApiPaymentMethod = '/mediopago'

// Constante para almacenar el título de las notificaciónes del mantenimiento Medio de Pago
export const titleNotificationPaymentMethod = 'Medio de Pago'

// Constante para almacenar el titulo de los reportes del mantenimiento Medio de Pago
export const titleReportPaymentMethod = 'REPORTE DE TIPO DE MEDIOS DE PAGO'
