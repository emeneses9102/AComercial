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
  stateVendorSelected,
  stateQueryName,
} from './useVariablesVendor'

// Función para filtrar los vendedores
export const filteredVendorsByName = () => {
  stateDataVendor.value.filteredData = stateDataVendor.value.data.filter(({ nombre }) => (
    nombre.toUpperCase().includes(stateQueryName.value.toUpperCase())
  ))
}

// Función para obtener todas los vendedores
export const getAllVendors = async () => {
  stateDataVendor.value.loading = true
  const { data, error } = await getRequest(`${endPointsCombo.colaborador}/1`, 'Listar Vendedores')
  stateDataVendor.value.loading = false

  // Evaluar si hay errores
  if (error || !data) return false

  // Almacenar los vendedores en la variable reactiva
  stateDataVendor.value.data = data
  stateDataVendor.value.filteredData = data

  // Verificar que nomnre de consulta este vacio
  if (stateQueryName.value.trim().length) filteredVendorsByName(stateQueryName.value.trim())
  return true
}

// Función para limpiar los datos de los vendedores
export const clearStateDataVendor = () => {
  stateDataVendor.value = { ...initialStateDataVendor }
}

// Función para limpiar vendedor seleccionado
export const clearStateVendorSelected = () => {
  stateVendorSelected.value = 0
}

// Función para limiar nombre de consulta
export const clearStateQueryName = () => {
  stateQueryName.value = ''
  filteredVendorsByName()
}
