// Importar Helpers
import {
  endPointsCombo,
} from '@/helpers/combos'
import {
  getRequest,
} from '@/helpers/requestRaw'

// Importar variables reactivas
import {
  initialStateDataVoucher,
  stateDataVoucher,
  stateVoucherSelected,
  stateQueryName,
} from './useVariablesVoucher'

// Función para obtener todas los comprobantes
export const getAllVouchers = async () => {
  stateDataVoucher.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.tipoComprobanteSunat}/1`, 'Listar Comprobantes')
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
  stateVoucherSelected.value = 0
}

// Función para limiar nombre de consulta
export const clearStateQueryName = () => {
  stateQueryName.value = ''
}
