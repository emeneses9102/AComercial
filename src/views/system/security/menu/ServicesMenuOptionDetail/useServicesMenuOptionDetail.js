// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Grupo Unidad
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryMenuOptionDetail, dataTableMenuOptionDetail, stateMenuOptionDetail, urlApiMenuOptionDetail, titleNotificationMenuOptionDetail,
} from './useVariablesMenuOptionDetail'
import { stateMenu } from '../ServicesMenu/useVariablesMenu'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsMenuOptionDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryMenuOptionDetail, dataTableMenuOptionDetail, urlApiMenuOptionDetail, titleNotificationMenuOptionDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateMenuOptionDetail
export const getMenuOptionDetailById = async _id => {
  const { data, status } = await getDataById(urlApiMenuOptionDetail, _id, titleNotificationMenuOptionDetail)
  if (status) {
    stateMenuOptionDetail.value = { ...stateMenuOptionDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Grupo Unidad
export const sendMenuOptionDetail = async (action, _id = null) => {
  stateMenuOptionDetail.value.idMenu = stateMenu.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateMenuOptionDetail.value.loading = true
  const response = await sendForm(stateMenuOptionDetail, urlApiMenuOptionDetail, titleNotificationMenuOptionDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateMenuOptionDetail.value.loading = false
  return response
}
