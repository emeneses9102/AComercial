// Importar funciones y variables necesarias para crear los servicios del mantenimiento Formato
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryFormat, dataTableFormat, stateFormat, urlApiFormat, titleNotificationFormat,
} from './useVariablesFormat'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFormat
export const loadItemsFormat = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryFormat, dataTableFormat, urlApiFormat, titleNotificationFormat, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateFormat
export const getFormatById = async _id => {
  const { data, status } = await getDataById(urlApiFormat, _id, titleNotificationFormat)
  if (status) {
    stateFormat.value = { ...stateFormat.value, ...data }
  }
}

// Función para gestionar una Formato
export const sendFormat = async (action, _id = null) => {
  const response = await sendForm(stateFormat, urlApiFormat, titleNotificationFormat, action, _id)
  return response
}
