// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Producto
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryCollaborator, dataTableCollaborator, stateCollaborator, urlApiCollaborator, titleNotificationCollaborator,
} from './useVariablesCollaborator'

// Función para obtener los datos desde la API y actualizar los valores de dataTableCollaborator
export const loadItemsCollaborator = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryCollaborator, dataTableCollaborator, urlApiCollaborator, titleNotificationCollaborator, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateCollaborator
export const getCollaboratorById = async _id => {
  const { data, status } = await getDataById(urlApiCollaborator, _id, titleNotificationCollaborator)
  if (status) {
    stateCollaborator.value = { ...stateCollaborator.value, ...data }
  }
}

// Función para gestionar una Tipo Producto
export const sendCollaborator = async (action, _id = null) => {
  const response = await sendForm(stateCollaborator, urlApiCollaborator, titleNotificationCollaborator, action, _id)
  return response
}
