// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Grupo Unidad
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryAccessOptionDetail, dataTableAccessOptionDetail, stateAccessOptionDetail, urlApiAccessOptionDetail, titleNotificationAccessOptionDetail,
} from './useVariablesAccessOptionDetail'
import { stateAccess } from '../ServicesAccess/useVariablesAccess'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsAccessOptionDetail = async (page = null, perPage = null) => {
  serverQueryAccessOptionDetail.value.indice = stateAccess.value._id
  const status = await loadTable(serverQueryAccessOptionDetail, dataTableAccessOptionDetail, urlApiAccessOptionDetail, titleNotificationAccessOptionDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateAccessOptionDetail
export const getAccessOptionDetailById = async _id => {
  const { data, status } = await getDataById(urlApiAccessOptionDetail, _id, titleNotificationAccessOptionDetail)
  if (status) {
    stateAccessOptionDetail.value = { ...stateAccessOptionDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Grupo Unidad
export const sendAccessOptionDetail = async (action, _id = null) => {
  stateAccessOptionDetail.value.idacceso = stateAccess.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateAccessOptionDetail.value.loading = true
  const response = await sendForm(stateAccessOptionDetail, urlApiAccessOptionDetail, titleNotificationAccessOptionDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateAccessOptionDetail.value.loading = false
  return response
}
