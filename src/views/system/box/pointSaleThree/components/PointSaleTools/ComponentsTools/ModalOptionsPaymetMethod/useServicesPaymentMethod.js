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
  statePaymentMethodSelected,
  stateQueryName,
} from './useVariablesPaymentMethod'

// Función para filtrar las formas de pago
export const filteredPaymentMethodsByName = () => {
  stateDataPaymentMethod.value.filteredData = stateDataPaymentMethod.value.data.filter(({ nombre }) => (
    nombre.toUpperCase().includes(stateQueryName.value.toUpperCase())
  ))
}

// Función para obtener todas las formas de pago
export const getAllPaymentMethods = async () => {
  stateDataPaymentMethod.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.formaPago}/1`, 'Listar Forma de Pago')
  stateDataPaymentMethod.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar las formas de pago en la variable reactiva
  stateDataPaymentMethod.value.data = data
  stateDataPaymentMethod.value.filteredData = data

  // Verificar que nomnre de consulta este vacio
  if (stateQueryName.value.trim().length) filteredPaymentMethodsByName(stateQueryName.value.trim())
  return true
}

// Función para limpiar los datos de las formas de pago
export const clearStateDataPaymentMethod = () => {
  stateDataPaymentMethod.value = { ...initialStateDataPaymentMethod }
}

// Función para limpiar la forma de pago seleccionada
export const clearStatePaymentMethodSelected = () => {
  statePaymentMethodSelected.value = null
}

// Función para limiar nombre de consulta
export const clearStateQueryName = () => {
  stateQueryName.value = ''
  filteredPaymentMethodsByName()
}
