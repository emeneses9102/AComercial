// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Usuario Negocio
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUserBusinessDetail, dataTableUserBusinessDetail, stateUserBusinessDetail, urlApiUserBusinessDetail, titleNotificationUserBusinessDetail,
} from './useVariablesUserBusinessDetail'
import { stateUser } from '../ServicesUser/useVariablesUser'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsUserBusinessDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUserBusinessDetail, dataTableUserBusinessDetail, urlApiUserBusinessDetail, titleNotificationUserBusinessDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUserBusinessDetail
export const getUserBusinessDetailById = async _id => {
  const { data, status } = await getDataById(urlApiUserBusinessDetail, _id, titleNotificationUserBusinessDetail)
  if (status) {
    stateUserBusinessDetail.value = { ...stateUserBusinessDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Usuario Negocio
export const sendUserBusinessDetail = async (action, _id = null) => {
  stateUserBusinessDetail.value.idUsuario = stateUser.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUserBusinessDetail.value.loading = true
  const response = await sendForm(stateUserBusinessDetail, urlApiUserBusinessDetail, titleNotificationUserBusinessDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUserBusinessDetail.value.loading = false
  return response
}
