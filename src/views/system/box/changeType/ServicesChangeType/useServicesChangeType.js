// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo de Cambio
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryChangeType, dataTableChangeType, stateChangeType, urlApiChangeType, titleNotificationChangeType,
} from './useVariablesChangeType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableChangeType
export const loadItemsChangeType = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryChangeType, dataTableChangeType, urlApiChangeType, titleNotificationChangeType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateChangeType
export const getChangeTypeById = async _id => {
  const { data, status } = await getDataById(urlApiChangeType, _id, titleNotificationChangeType)
  if (status) {
    stateChangeType.value = { ...stateChangeType.value, ...data }
  }
}

// Función para gestionar una Tipo de Cambio
export const sendChangeType = async (action, _id = null) => {
  const response = await sendForm(stateChangeType, urlApiChangeType, titleNotificationChangeType, action, _id)
  return response
}
