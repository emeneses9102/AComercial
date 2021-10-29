// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'
import {
  serverQueryDefault,
  clearServerQueryDefaultFilter,
} from '@/helpers/serverQuery'

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta
const initialListPointSaleDetail = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Detalle Punto de Venta
export const listPointSaleDetail = ref({ ...initialListPointSaleDetail })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Detalle Punto de Venta
export const clearListPointSaleDetail = () => {
  listPointSaleDetail.value = { ...initialListPointSaleDetail }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Detalle Punto de Venta
export const serverQueryPointSaleDetail = ref({
  ...serverQueryDefault,
  tabla: 'dpuntoventa',
  pinicio: 0,
  pfin: 0,
  campo: 'a.idPuntoVenta',
})

// Función para limpiar filtros en la consulta de la tabla Detalle Punto de Venta
export const clearFiltersPointSaleDetail = () => {
  clearServerQueryDefaultFilter(serverQueryPointSaleDetail)
}

// Variable inicializadora para almacenar item del Detalle Punto de Venta
const initialStatePointSaleDetail = {
  _id: 0,
  idPuntoVenta: 0,
  idTArticulo: 0,
  nombreArticulo: '',
  imagenArticulo: '',
  flgSerie: 0,
  cantidad: 0,
  precio: 0.00,
  descuento: 0.00,
  accion: 0,
  loading: false,
}

// Variable reactiva para almacenar un item del Detalle Punto de Venta
export const statePointSaleDetail = ref({ ...initialStatePointSaleDetail })

// Variable para regresar al estado inicial la variable reactiva que almacena un item del Detalle Punto de Venta
export const clearStatePointSaleDetail = () => {
  statePointSaleDetail.value = { ...initialStatePointSaleDetail }
}

// Constante para almacenar el endpoint base para Detalle Punto de Venta
export const urlApiPointSaleDetail = 'dpuntoventa'

// Constante para almacenar el titulo base para las notificaciones del mantenimiento
export const titleNotificationPointSaleDetail = 'DetallePunto de Venta'
