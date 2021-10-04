// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Sesion Caja Comprobante
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBoxSessionVoucherDetail, dataTableBoxSessionVoucherDetail, stateBoxSessionVoucherDetail, urlApiBoxSessionVoucherDetail, titleNotificationBoxSessionVoucherDetail,
} from './useVariablesBoxSessionVoucherDetail'
import { stateBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

// Función para obtener los datos desde la API y actualizar los valores de dataTableBoxSessionVoucherDetail
export const loadItemsBoxSessionVoucherDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBoxSessionVoucherDetail, dataTableBoxSessionVoucherDetail, urlApiBoxSessionVoucherDetail, titleNotificationBoxSessionVoucherDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBoxSessionVoucherDetail
export const getBoxSessionVoucherDetailById = async _id => {
  const { data, status } = await getDataById(urlApiBoxSessionVoucherDetail, _id, titleNotificationBoxSessionVoucherDetail)
  if (status) {
    stateBoxSessionVoucherDetail.value = { ...stateBoxSessionVoucherDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Sesion Caja Comprobante
export const sendBoxSessionVoucherDetail = async (action, _id = null) => {
  stateBoxSessionVoucherDetail.value.idSesionCaja = stateBoxSession.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBoxSessionVoucherDetail.value.loading = true
  const response = await sendForm(stateBoxSessionVoucherDetail, urlApiBoxSessionVoucherDetail, titleNotificationBoxSessionVoucherDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBoxSessionVoucherDetail.value.loading = false
  return response
}
