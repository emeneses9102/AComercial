// Importar function ref para crear variables reactivas
import { ref } from '@vue/composition-api'
import {
  serverQueryDefault,
  clearServerQueryDefaultFilter,
} from '@/helpers/serverQuery'

// Variable inicializadora para almacenar las propiedades necesarias para el listado de la tabla Resumen Punto Venta Tributo
const initialListPointSaleTributeSummary = {
  rows: [],
  totalRows: 0,
  loading: false,
}

// Variable reactiva para almacenar las propiedades necesarias para el listado de la tabla Resumen Punto Venta Tributo
export const listPointSaleTributeSummary = ref({ ...initialListPointSaleTributeSummary })

// Función para regresar al estado inicial la variable reactiva que tiene las propiedades necesarias para el listado de la tabla Resumen Punto Venta Tributo
export const clearListPointSaleTributeSummary = () => {
  listPointSaleTributeSummary.value = { ...initialListPointSaleTributeSummary }
}

// Variable reactiva para manjear los consultas del lado del servidor de la tabla Resumen Punto Venta Tributo
export const serverQueryPointSaleTributeSummary = ref({
  ...serverQueryDefault,
  tabla: 'rpuntoventatributo',
  pinicio: 0,
  pfin: 0,
})

// Función para limpiar filtros en la consulta de la tabla Resumen Punto Venta Tributo
export const clearFiltersPointSaleTributeSummary = () => {
  clearServerQueryDefaultFilter(serverQueryPointSaleTributeSummary)
}

// Variable inicializadora para almacenar item del Resumen Punto Venta Tributo
// const initialStatePointSaleTributeSummary = {
//   _id: 0,
//   idPuntoVenta: 0,
//   idArticulo: 0,
//   nombreArticulo: '',
//   imagenArticulo: '',
//   cantidad: 0,
//   precio: 0.00,
//   descuento: 0.00,
//   accion: 0,
//   loading: false,
// }

// Variable reactiva para almacenar un item del Resumen Punto Venta Tributo
// export const statePointSaleTributeSummary = ref({ ...initialStatePointSaleTributeSummary })

// Variable para regresar al estado inicial la variable reactiva que almacena un item del Resumen Punto Venta Tributo
// export const clearStatePointSaleTributeSummary = () => {
//   statePointSaleTributeSummary.value = { ...initialStatePointSaleTributeSummary }
// }

// Constante para almacenar el endpoint base para Resumen Punto Venta Tributo
export const urlApiPointSaleTributeSummary = 'rventaatributo'

// Constante para almacenar el titulo base para las notificaciones del mantenimiento
export const titleNotificationPointSaleTributeSummary = 'Resumen Punto de Venta Tributo'
