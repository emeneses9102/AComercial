// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Sesion Caja Detalle
export const initialColumnsBoxSessionDetail = [
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MEDIO DE PAGO',
    field: 'nombreMedioPago',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MONEDA',
    field: 'nombreMoneda',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    label: 'MONTO',
    field: 'apertura',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Sesion Caja Detalle con Acciones
export const columnsBoxSessionDetail = ref([
  columnAction,
  ...initialColumnsBoxSessionDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Sesion Caja Detalle cuando solo se desea mostrar
export const columnsBoxSessionDetailForShow = ref([...initialColumnsBoxSessionDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Sesion Caja Detalle
const initialDataTableBoxSessionDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Sesion Caja Detalle
export const dataTableBoxSessionDetail = ref({ ...initialDataTableBoxSessionDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Sesion Caja Detalle
export const clearDataTableBoxSessionDetail = () => {
  dataTableBoxSessionDetail.value = { ...initialDataTableBoxSessionDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Sesion Caja Detalle
export const serverQueryBoxSessionDetail = ref({
  ...serverQueryDefault,
  tabla: 'dsesioncaja',
  pfin: 5,
  campo: 'a.idSesionCaja',
})

// Función para limpiar filtros en la consulta de la tabla Correlativo
export const clearFiltersBoxSessionDetail = () => {
  clearServerQueryDefaultFilter(serverQueryBoxSessionDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Correlativo
const initialStateBoxSessionDetail = {
  _id: 0,
  idSesionCaja: 0,
  idMedioPago: 0,
  idMoneda: 0,
  apertura: 0,
  cierre: 0,
  monto: 0,
  observacion: '',
  proceso: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Correlativo
export const stateBoxSessionDetail = ref({ ...initialStateBoxSessionDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Correlativo
export const clearStateBoxSessionDetail = () => {
  stateBoxSessionDetail.value = { ...initialStateBoxSessionDetail }
}
export const combosBoxSessionDetail = ref({
  paymentMethod: { ...initialStateCombo },
  currency: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Correlativo
export const columnsFilterBoxSessionDetail = [
  {
    title: 'Id',
    field: '_id',
  },
  {
    title: 'Número',
    field: 'a.numero',
  },
  {
    title: 'Serie',
    field: 'a.serie',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Correlativo
export const urlApiBoxSessionDetail = '/dsesioncaja'

// Constante para almacenar el titulo de las notificaciónes de Correlativo
export const titleNotificationBoxSessionDetail = 'Sesion Caja Detalle'
