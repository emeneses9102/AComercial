// Importar Helpers
import {
  endPointsCombo,
} from '@/helpers/combos'
import {
  getRequest,
} from '@/helpers/requestRaw'

import store from '@/store'
// Importar variables reactivas
import {
  initialStateDataVoucher,
  stateDataVoucher,
} from './useVariablesVoucher'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

// Función para obtener todas los comprobantes
export const getAllVouchers = async () => {
  stateDataVoucher.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.comprobanteSesionCaja}/1/${store.state.boxSession.boxSession._id}`, 'Listar Comprobantes')
  stateDataVoucher.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar los comprobantes en la variable reactiva
  stateDataVoucher.value.data = data
  return true
}

// Función para limpiar los datos de los comprobantes
export const clearStateDataVoucher = () => {
  stateDataVoucher.value = { ...initialStateDataVoucher }
}

// Función para limpiar comprobante seleccionada
export const clearStateVoucherSelected = () => {
  statePointSale.value.idComprobante = 0
}
