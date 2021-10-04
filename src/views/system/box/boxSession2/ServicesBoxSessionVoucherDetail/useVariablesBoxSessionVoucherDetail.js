// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'
import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Sesion Caja Comprobante
export const initialColumnsBoxSessionVoucherDetail = [
  {
    label: 'Id',
    field: '_id',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  // {
  //   label: 'MEDIO DE PAGO',
  //   field: 'nombreMedioPago',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  // {
  //   label: 'MONEDA',
  //   field: 'nombreMoneda',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  // {
  //   label: 'MONTO',
  //   field: 'apertura',
  //   thClass: 'align-middle',
  //   tdClass: 'align-middle',
  //   pdf: true,
  // },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Sesion Caja Comprobante con Acciones
export const columnsBoxSessionVoucherDetail = ref([
  columnAction,
  ...initialColumnsBoxSessionVoucherDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Sesion Caja Comprobante cuando solo se desea mostrar
export const columnsBoxSessionVoucherDetailForShow = ref([...initialColumnsBoxSessionVoucherDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Sesion Caja Comprobante
const initialDataTableBoxSessionVoucherDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Sesion Caja Comprobante
export const dataTableBoxSessionVoucherDetail = ref({ ...initialDataTableBoxSessionVoucherDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Sesion Caja Comprobante
export const clearDataTableBoxSessionVoucherDetail = () => {
  dataTableBoxSessionVoucherDetail.value = { ...initialDataTableBoxSessionVoucherDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Sesion Caja Comprobante
export const serverQueryBoxSessionVoucherDetail = ref({
  ...serverQueryDefault,
  tabla: 'sesioncomprobante',
  pfin: 5,
  campo: 'a.idSesionCaja',
})

// Función para limpiar filtros en la consulta de la tabla Sesion Caja Comprobante
export const clearFiltersBoxSessionVoucherDetail = () => {
  clearServerQueryDefaultFilter(serverQueryBoxSessionVoucherDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sesion Caja Comprobante
const initialStateBoxSessionVoucherDetail = {
  _id: 0,
  idSesionCaja: 0,
  idComprobante: 0,
  idCorrelativo: 0,
  flgDefecto: 0,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Sesion Caja Comprobante
export const stateBoxSessionVoucherDetail = ref({ ...initialStateBoxSessionVoucherDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Sesion Caja Comprobante
export const clearStateBoxSessionVoucherDetail = () => {
  stateBoxSessionVoucherDetail.value = { ...initialStateBoxSessionVoucherDetail }
}
export const combosBoxSessionVoucherDetail = ref({
  voucher: { ...initialStateCombo },
  correlative: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Sesion Caja Comprobante
export const columnsFilterBoxSessionVoucherDetail = [
  {
    title: 'Id',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Sesion Caja Comprobante
export const urlApiBoxSessionVoucherDetail = '/sesioncomprobante'

// Constante para almacenar el titulo de las notificaciónes de Sesion Caja Comprobante
export const titleNotificationBoxSessionVoucherDetail = 'Sesion Caja Comprobante'
