// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'
import routesName from '@/helpers/routesName'

// Nombre de la ruta que usa el mantenimiento FormaPago
export const routeNamePaymentForm = routesName.formaPago

// Constante para almacenar el id base de los modales del mantenimiento Forma de Pago
export const MODAL_ID = 'modal-payment-form'

// Variable reactiva para almacenar la configuración de cada columna de la tabla Forma de Pago
export const columnsPaymentForm = ref([
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
    field: 'dias',
    label: 'DÍAS',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'defecto',
    label: 'DEFECTO',
    thClass: 'align-middle text-center',
    tdClass: 'align-middle text-center',
    pdf: true,
    type: 'boolean',
  },
  columnStatus,
])

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Forma de Pago
export const dataTablePaymentForm = ref({
  rows: [],
  totalRows: 0,
  loading: false,
})

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Forma de Pago
export const serverQueryPaymentForm = ref({
  ...serverQueryDefault,
  tabla: 'formapago',
})

// Función para limpiar filtros en la consulta de la tabla Forma de Pago
export const clearFiltersPaymentForm = () => {
  clearServerQueryDefaultFilter(serverQueryPaymentForm)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Forma de Pago
const initialStatePaymentForm = {
  _id: 0,
  nombre: '',
  dias: 0,
  defecto: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Forma de Pago
export const statePaymentForm = ref({ ...initialStatePaymentForm })

// Función para regresar al estado inicial la variable reactiva que gestiona Forma de Pago
export const clearStatePaymentForm = () => {
  statePaymentForm.value = { ...initialStatePaymentForm }
}

// Constante para almacenar las columas permitidas para el filtro de la table Forma de Pago
export const columnsFilterPaymentForm = [
  {
    title: 'Nombre',
    field: 'a.nombre',
  },
  {
    title: 'Días',
    field: 'a.dias',
  },
]

// Constante para almacenar la url base de la petición al mantenimiento Forma de Pago
export const urlApiPaymentForm = '/formapago'

// Constante para almacenar el título de las notificaciónes del mantenimiento Forma de Pago
export const titleNotificationPaymentForm = 'Forma de Pago'

// Constante para almacenar el titulo de los reportes del mantenimiento Forma de Pago
export const titleReportPaymentForm = 'REPORTE DE TIPO DE FORMAS DE PAGO'
