// Importar funciones y variables necesarias para crear los servicios del mantenimiento Mensaje Sistema
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQuerySystemMessage, dataTableSystemMessage, stateSystemMessage, urlApiSystemMessage, titleNotificationSystemMessage,
} from './useVariablesSystemMessage'

// Función para obtener los datos desde la API y actualizar los valores de dataTableSystemMessage
export const loadItemsSystemMessage = async (page = null, perPage = null) => {
  const status = await loadTable(serverQuerySystemMessage, dataTableSystemMessage, urlApiSystemMessage, titleNotificationSystemMessage, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateSystemMessage
export const getSystemMessageById = async _id => {
  const { data, status } = await getDataById(urlApiSystemMessage, _id, titleNotificationSystemMessage)
  if (status) {
    stateSystemMessage.value = { ...stateSystemMessage.value, ...data }
  }
}

// Función para gestionar una Mensaje Sistema
export const sendSystemMessage = async (action, _id = null) => {
  const response = await sendForm(stateSystemMessage, urlApiSystemMessage, titleNotificationSystemMessage, action, _id)
  return response
}
