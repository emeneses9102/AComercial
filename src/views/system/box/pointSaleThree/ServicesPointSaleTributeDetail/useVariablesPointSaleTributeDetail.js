// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'

// Importar configuracion de las columnas personalizadas
import { columnAction, columnStatus } from '@/helpers/columnsTable'

import { clearServerQueryDefaultFilter, serverQueryDefault } from '@/helpers/serverQuery'

export const MODAL_ID = 'modal-point-sale-tribute-detail'

// Variables inicializadora para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Tributo
export const initialColumnsPointSaleTributeDetail = [
  {
    field: '_id',
    label: 'ID',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'nombreArticulo',
    label: 'ARTICULO',
    thClass: 'align-middle',
    tdClass: 'align-middle',
    pdf: true,
  },
  {
    field: 'precio',
    label: 'PRECIO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'cantidad',
    label: 'CANTIDAD',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
    pdf: true,
  },
  {
    field: 'subtotal',
    label: 'SUBTOTAL',
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
    field: 'impuesto',
    label: 'IMPUESTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-right',
    formatFn: value => `${value.toFixed(2)}`,
    pdf: true,
  },
  {
    field: 'tributo',
    label: 'TRIBUTO',
    thClass: 'align-middle',
    tdClass: 'align-middle text-center',
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
  columnStatus,
]

// Variable reactiva para almacenar la configuración de cada columna de la tabla Detalle Punto de Venta Tributo
export const columnsPointSaleTributeDetail = ref([
  columnAction,
  ...initialColumnsPointSaleTributeDetail,
])

// Variable reactiva para almacenar la configuracion de cada columna de la tabla Detalle Punto de Venta Tributo cuando solo se desea mostrar
export const columnsPointSaleTributeDetailForShow = ref([...initialColumnsPointSaleTributeDetail])

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Tributo
const initialDataTablePointSaleTributeDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Tributo
export const dataTablePointSaleTributeDetail = ref({ ...initialDataTablePointSaleTributeDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Punto de Venta Tributo
export const clearDataTablePointSaleTributeDetail = () => {
  dataTablePointSaleTributeDetail.value = { ...initialDataTablePointSaleTributeDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Punto de Venta Tributo
export const serverQueryPointSaleTributeDetail = ref({
  ...serverQueryDefault,
  tabla: 'dpuntoventatributo',
  campo: 't.idpuntoventa',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Punto de Venta Tributo
export const clearFiltersPointSaleTributeDetail = () => {
  clearServerQueryDefaultFilter(serverQueryPointSaleTributeDetail)
}

// Variable inicializadora para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Tributo
// const initialStatePointSaleTributeDetail = {
//   _id: 0,
//   idPuntoVenta: 0,
//   idMoneda: 0,
//   idMedioPago: 0,
//   pagado: 0.00,
//   accion: 0,
//   loading: false,
// }

// Variable reactiva para almacenar el estado de un registro, actualización, cambio de estado, eliminación en la tabla Detalle Punto de Venta Tributo
// export const statePointSaleTributeDetail = ref({ ...initialStatePointSaleTributeDetail })

// Función para regresar al estado inicial la variable reactiva que gestiona el mantenimiento de  Detalle Punto de Venta Tributo
// export const clearStatePointSaleTributeDetail = () => {
//   statePointSaleTributeDetail.value = { ...initialStatePointSaleTributeDetail }
// }

// Variable reactiva para almacenar el listado de los combos del mantenimiento Detalle Punto de Venta Tributo
// export const combosPointSaleTributeDetail = ref({
//   currency: { ...initialStateCombo },
//   paymentMethod: { ...initialStateCombo },
// })

// Constante para almacenar las columnas permitidas para el filtro del mantenimiento Detalle Punto de Venta Tributo
export const columnsFilterPointSaleTributeDetail = [
  {
    title: 'ID',
    field: '_id',
  },
  {
    title: 'ARTICULO',
    field: 'a.nombreArticulo',
  },
]

// Constante para almacenar la url base de la petición del mantenimiento Detalle Punto de Venta Tributo
export const urlApiPointSaleTributeDetail = '/dpuntoventaatributo'

// Constante para almacenar el titulo de las notificaciónes de Detalle Punto de Venta Tributo
export const titleNotificationPointSaleTributeDetail = 'Detalle Punto de Venta Tributo'
