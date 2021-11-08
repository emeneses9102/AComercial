// Importar funciones y variables necesarias para crear los servicios del mantenimiento Presentacion
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPresentation, dataTablePresentation, statePresentation, urlApiPresentation, titleNotificationPresentation,
} from './useVariablesPresentation'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePresentation
export const loadItemsPresentation = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPresentation, dataTablePresentation, urlApiPresentation, titleNotificationPresentation, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePresentation
export const getPresentationById = async _id => {
  const { data, status } = await getDataById(urlApiPresentation, _id, titleNotificationPresentation)
  if (status) {
    statePresentation.value = { ...statePresentation.value, ...data }
  }
}

// Función para gestionar una Presentacion
export const sendPresentation = async (action, _id = null) => {
  const response = await sendForm(statePresentation, urlApiPresentation, titleNotificationPresentation, action, _id)
  return response
}
