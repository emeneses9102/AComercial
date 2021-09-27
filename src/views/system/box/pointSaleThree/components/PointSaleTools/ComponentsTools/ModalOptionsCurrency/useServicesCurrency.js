// Importar Helpers
import {
  endPointsCombo,
} from '@/helpers/combos'
import {
  getRequest,
} from '@/helpers/requestRaw'

// Importar variables reactivas
import {
  initialStateDataCurrency,
  stateDataCurrency,
} from './useVariablesCurrency'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

// Función para obtener todas las monedas
export const getAllCurrencys = async () => {
  stateDataCurrency.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.moneda}/1`, 'Listar Moneda')
  stateDataCurrency.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar las monedas en la variable reactiva
  stateDataCurrency.value.data = data
  return true
}

// Función para limpiar los datos de las monedas
export const clearStateDataCurrency = () => {
  stateDataCurrency.value = { ...initialStateDataCurrency }
}

// Función para limpiar moneda seleccionada
export const clearStateCurrencySelected = () => {
  statePointSale.value.idMoneda = 0
}
