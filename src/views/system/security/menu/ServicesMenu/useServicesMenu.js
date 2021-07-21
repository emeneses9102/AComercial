// Importar funciones y variables necesarias para crear los servicios del mantenimiento Menu
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryMenu, dataTableMenu, stateMenu, urlApiMenu, titleNotificationMenu,
} from './useVariablesMenu'

// Función para obtener los datos desde la API y actualizar los valores de dataTableMenu
export const loadItemsMenu = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryMenu, dataTableMenu, urlApiMenu, titleNotificationMenu, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateMenu
export const getMenuById = async _id => {
  const { data, status } = await getDataById(urlApiMenu, _id, titleNotificationMenu)
  if (status) {
    stateMenu.value = { ...stateMenu.value, ...data }
  }
}

// Función para gestionar un Menu
export const sendMenu = async (action, _id = null) => {
  const response = await sendForm(stateMenu, urlApiMenu, titleNotificationMenu, action, _id)
  return response
}
