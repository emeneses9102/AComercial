// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Usuario Negocio
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUserStorageDetail, dataTableUserStorageDetail, stateUserStorageDetail, urlApiUserStorageDetail, titleNotificationUserStorageDetail,
} from './useVariablesUserStorageDetail'
import { stateUser } from '../ServicesUser/useVariablesUser'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsUserStorageDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUserStorageDetail, dataTableUserStorageDetail, urlApiUserStorageDetail, titleNotificationUserStorageDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUserStorageDetail
export const getUserStorageDetailById = async _id => {
  const { data, status } = await getDataById(urlApiUserStorageDetail, _id, titleNotificationUserStorageDetail)
  if (status) {
    stateUserStorageDetail.value = { ...stateUserStorageDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Usuario Negocio
export const sendUserStorageDetail = async (action, _id = null) => {
  stateUserStorageDetail.value.idUsuario = stateUser.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUserStorageDetail.value.loading = true
  const response = await sendForm(stateUserStorageDetail, urlApiUserStorageDetail, titleNotificationUserStorageDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUserStorageDetail.value.loading = false
  return response
}
