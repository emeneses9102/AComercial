// Importar funciones y variables necesarias para crear los servicios del mantenimiento Rol
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUser, dataTableUser, stateUser, urlApiUser, titleNotificationUser,
} from './useVariablesUser'

// Función para obtener los datos desde la API y actualizar los valores de dataTableUser
export const loadItemsUser = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUser, dataTableUser, urlApiUser, titleNotificationUser, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUser
export const getUserById = async _id => {
  const { data, status } = await getDataById(urlApiUser, _id, titleNotificationUser)
  if (status) {
    stateUser.value = { ...stateUser.value, ...data }
  }
}

// Función para gestionar un Rol
export const sendUser = async (action, _id = null) => {
  stateUser.value.clave = ''
  const response = await sendForm(stateUser, urlApiUser, titleNotificationUser, action, _id)
  return response
}
