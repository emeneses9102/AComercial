// Importar funciones y variables necesarias para crear los servicios del mantenimiento Área
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArea, dataTableArea, stateArea, urlApiArea, titleNotificationArea,
} from './useVariablesArea'

// Función para obtener los datos desde la API y actualizar los valores de dataTableArea
export const loadItemsArea = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArea, dataTableArea, urlApiArea, titleNotificationArea, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArea
export const getAreaById = async _id => {
  const { data, status } = await getDataById(urlApiArea, _id, titleNotificationArea)
  if (status) {
    stateArea.value = { ...stateArea.value, ...data }
  }
}

// Función para gestionar una Área
export const sendArea = async (action, _id = null) => {
  const response = await sendForm(stateArea, urlApiArea, titleNotificationArea, action, _id)
  return response
}
