// Importar Helpers
import {
  endPointsCombo,
} from '@/helpers/combos'
import {
  getRequest,
} from '@/helpers/requestRaw'

// Importar variables reactivas
import {
  initialStateDataVendor,
  stateDataVendor,
} from './useVariablesVendor'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'

// Función para obtener todas los vendedores
export const getAllVendors = async () => {
  stateDataVendor.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.colaborador}/1`, 'Listar Vendedores')
  stateDataVendor.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar los vendedores en la variable reactiva
  stateDataVendor.value.data = data
  return true
}

// Función para limpiar los datos de los vendedores
export const clearStateDataVendor = () => {
  stateDataVendor.value = { ...initialStateDataVendor }
}

// Función para limpiar vendedor seleccionado
export const clearStateVendorSelected = () => {
  statePointSale.value.idVendedor = 0
}
