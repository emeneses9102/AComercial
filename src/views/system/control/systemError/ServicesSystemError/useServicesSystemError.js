// Importar funciones y variables necesarias para crear los servicios del mantenimiento Error del Sistema
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQuerySystemError, dataTableSystemError, stateSystemError, urlApiSystemError, titleNotificationSystemError,
} from './useVariablesSystemError'

// Función para obtener los datos desde la API y actualizar los valores de dataTableSystemError
export const loadItemsSystemError = async (page = null, perPage = null) => {
  const status = await loadTable(serverQuerySystemError, dataTableSystemError, urlApiSystemError, titleNotificationSystemError, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateSystemError
export const getSystemErrorById = async _id => {
  const { data, status } = await getDataById(urlApiSystemError, _id, titleNotificationSystemError)
  if (status) {
    stateSystemError.value = { ...stateSystemError.value, ...data }
  }
}

// Función para gestionar una Error del Sistema
export const sendSystemError = async (action, _id = null) => {
  const response = await sendForm(stateSystemError, urlApiSystemError, titleNotificationSystemError, action, _id)
  return response
}
