// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo de Tributo
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryTribute, dataTableTribute, stateTribute, urlApiTribute, titleNotificationTribute,
} from './useVariablesTribute'

// Función para obtener los datos desde la API y actualizar los valores de dataTableTribute
export const loadItemsTribute = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryTribute, dataTableTribute, urlApiTribute, titleNotificationTribute, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateTribute
export const getTributeById = async _id => {
  const { data, status } = await getDataById(urlApiTribute, _id, titleNotificationTribute)
  if (status) {
    stateTribute.value = { ...stateTribute.value, ...data }
  }
}

// Función para gestionar una Tipo de Tributo
export const sendTribute = async (action, _id = null) => {
  const response = await sendForm(stateTribute, urlApiTribute, titleNotificationTribute, action, _id)
  return response
}
