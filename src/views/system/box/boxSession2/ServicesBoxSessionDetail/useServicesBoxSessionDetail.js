// Importar funciones y variables necesarias para crear los servicios de la tabla Sesion Caja Detalle
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import {
  getDataById,
  loadTable,
  sendForm,
} from '@/helpers/manageTables'
import {
  serverQueryBoxSessionDetail,
  dataTableBoxSessionDetail,
  stateBoxSessionDetail,
  urlApiBoxSessionDetail,
  titleNotificationBoxSessionDetail,
} from './useVariablesBoxSessionDetail'
import {
  stateBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsBoxSessionDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBoxSessionDetail, dataTableBoxSessionDetail, urlApiBoxSessionDetail, titleNotificationBoxSessionDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBoxSessionDetail
export const getBoxSessionDetailById = async _id => {
  const { data, status } = await getDataById(urlApiBoxSessionDetail, _id, titleNotificationBoxSessionDetail)
  if (status) {
    stateBoxSessionDetail.value = { ...stateBoxSessionDetail.value, ...data }
  }
}

// Función para gestionar un Sesion Caja Detalle
export const sendBoxSessionDetail = async (action, _id = null) => {
  stateBoxSessionDetail.value.idSesionCaja = stateBoxSession.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBoxSessionDetail.value.loading = true
  const response = await sendForm(stateBoxSessionDetail, urlApiBoxSessionDetail, titleNotificationBoxSessionDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBoxSessionDetail.value.loading = false
  return response
}
