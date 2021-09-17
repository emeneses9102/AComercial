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
  stateCurrencySelected,
  stateQueryName,
} from './useVariablesCurrency'

// Función para filtrar las monedas
export const filteredCurrencysByName = () => {
  stateDataCurrency.value.filteredData = stateDataCurrency.value.data.filter(({ nombre }) => (
    nombre.toUpperCase().includes(stateQueryName.value.toUpperCase())
  ))
}

// Función para obtener todas las monedas
export const getAllCurrencys = async () => {
  stateDataCurrency.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.moneda}/1`, 'Listar Moneda')
  stateDataCurrency.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar las monedas en la variable reactiva
  stateDataCurrency.value.data = data
  stateDataCurrency.value.filteredData = data

  // Verificar que nomnre de consulta este vacio
  if (stateQueryName.value.trim().length) filteredCurrencysByName(stateQueryName.value.trim())
  return true
}

// Función para limpiar los datos de las monedas
export const clearStateDataCurrency = () => {
  stateDataCurrency.value = { ...initialStateDataCurrency }
}

// Función para limpiar moneda seleccionada
export const clearStateCurrencySelected = () => {
  stateCurrencySelected.value = 0
}

// Función para limiar nombre de consulta
export const clearStateQueryName = () => {
  stateQueryName.value = ''
  filteredCurrencysByName()
}
