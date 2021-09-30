// // Importar Helpers
// import {
//   endPointsCombo,
//   initialStateCombo,
// } from '@/helpers/combos'
// import {
//   getRequest,
// } from '@/helpers/requestRaw'

// import store from '@/store'
// // Importar variables reactivas
// import {
//   combosVoucher,
// } from './useVariablesVoucher'

// // Función para obtener todas los comprobantes
// export const getAllVouchers = async () => {
//   stateDataVoucher.value.loading = true
//   const { data, error } = await getRequest(`${endPointsCombo.comprobanteSesionCaja}/1/${store.state.boxSession.boxSession._id}`, 'Listar Comprobantes')
//   stateDataVoucher.value.loading = false

//   // Evaluar si hay errores
//   if (error || !data) return false

//   // Almacenar los comprobantes en la variable reactiva
//   stateDataVoucher.value.data = data
//   return true
// }

// // Función para limpiar los datos de los comprobantes
// export const clearStateDataVoucher = () => {
//   stateDataVoucher.value = { ...initialStateCombo }
// }

// // Función para obtener todos los correlativos
// export const getAllCorrelative = async () => {

//   stateDataCorrelative.value.loading = true
//   const { data, error } = await getRequest(`${endPointsCombo.comprobanteSesionCaja}/1/${store.state.boxSession.boxSession._id}`, 'Listar Correltivos')
//   stateDataCorrelative.value.loading = false

//   // Evaluar si hay errores
//   if (error || !data) return false

//   // Almacenar los comprobantes en la variable reactiva
//   stateDataCorrelative.value.data = data
//   return true
// }

// // Función para limpiar los datos de los correlativos
// export const clearStateDataCorrelative = () => {
//   stateDataCorrelative.value = { ...initialStateCombo }
// }
