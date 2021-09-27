// Importar Helpers
import {
  endPointsCombo,
} from '@/helpers/combos'
import {
  getRequest,
} from '@/helpers/requestRaw'

// Importar variables reactivas
import {
  initialStateDataPaymentMethod,
  stateDataPaymentMethod,
} from './useVariablesPaymentMethod'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

// Función para obtener todas las formas de pago
export const getAllPaymentMethods = async () => {
  stateDataPaymentMethod.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.formaPago}/1`, 'Listar Forma de Pago')
  stateDataPaymentMethod.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar las formas de pago en la variable reactiva
  stateDataPaymentMethod.value.data = data
  return true
}

// Función para limpiar los datos de las formas de pago
export const clearStateDataPaymentMethod = () => {
  stateDataPaymentMethod.value = { ...initialStateDataPaymentMethod }
}

// Función para limpiar la forma de pago seleccionada
export const clearStatePaymentMethodSelected = () => {
  statePointSale.value.idFormaPago = 0
}
