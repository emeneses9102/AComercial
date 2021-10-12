// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { initialStateCombo } from '@/helpers/combos'
import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-point-sale-movement'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Movimiento
export const initialColumnsPointSaleMovement = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreMedioPago',
    label: 'MEDIO PAGO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
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
    field: 'pagado',
    label: 'PAGADO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => value.toFixed(2),
    pdf: true,
  },
  {
    field: 'tipoCambio',
    label: 'TIPO CAMBIO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => value.toFixed(2),
    pdf: true,
  },
  {
    field: 'totalCambio',
    label: 'TOTAL CAMBIO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => value.toFixed(2),
    pdf: true,
  },
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Movimiento
export const columnsPointSaleMovement = ref([
  columnAction,
  ...initialColumnsPointSaleMovement,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Punto de Venta Movimiento cuando solo se desea mostrar
export const columnsPointSaleMovementForShow = ref([...initialColumnsPointSaleMovement])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Movimiento
const initialDataTablePointSaleMovement = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Movimiento
export const dataTablePointSaleMovement = ref({ ...initialDataTablePointSaleMovement })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Movimiento
export const clearDataTablePointSaleMovement = () => {
  dataTablePointSaleMovement.value = { ...initialDataTablePointSaleMovement }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Punto de Venta Movimiento
export const serverQueryPointSaleMovement = ref({
  ...serverQueryDefault,
  tabla: 'mvtpuntoventa',
  pfin: 5,
  campo: 'a.idpuntoventa',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Punto de Venta Movimiento
export const clearFiltersPointSaleMovement = () => {
  clearServerQueryDefaultFilter(serverQueryPointSaleMovement)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Movimiento
const initialStatePointSaleMovement = {
  _id: 0,
  idPuntoVenta: 0,
  idMoneda: 0,
  idMedioPago: 0,
  pagado: 0.00,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Movimiento
export const statePointSaleMovement = ref({ ...initialStatePointSaleMovement })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Punto de Venta Movimiento
export const clearStatePointSaleMovement = () => {
  statePointSaleMovement.value = { ...initialStatePointSaleMovement }
}

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Punto de Venta Movimiento
export const combosPointSaleMovement = ref({
  currency: { ...initialStateCombo },
  paymentMethod: { ...initialStateCombo },
})

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Punto de Venta Movimiento
export const columnsFilterPointSaleMovement = [
  {
    title: 'Id',
    field: '_id',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Punto de Venta Movimiento
export const urlApiPointSaleMovement = '/mvtpuntoventa'

// Constante para almacenar el titulo de las notificaciónes de Detalle Punto de Venta Movimiento
export const titleNotificationPointSaleMovement = 'Detalle Movimiento'
