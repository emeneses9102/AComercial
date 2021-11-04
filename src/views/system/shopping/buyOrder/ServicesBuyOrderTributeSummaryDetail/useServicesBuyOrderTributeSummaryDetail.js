// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Tributo Resumen Orden Compra
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBuyOrderTributeSummaryDetail, dataTableBuyOrderTributeSummaryDetail, stateBuyOrderTributeSummaryDetail, urlApiBuyOrderTributeSummaryDetail, titleNotificationBuyOrderTributeSummaryDetail,
} from './useVariablesBuyOrderTributeSummaryDetail'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsBuyOrderTributeSummaryDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBuyOrderTributeSummaryDetail, dataTableBuyOrderTributeSummaryDetail, urlApiBuyOrderTributeSummaryDetail, titleNotificationBuyOrderTributeSummaryDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBuyOrderTributeSummaryDetail
export const getBuyOrderTributeSummaryDetailById = async _id => {
  const { data, status } = await getDataById(urlApiBuyOrderTributeSummaryDetail, _id, titleNotificationBuyOrderTributeSummaryDetail)
  if (status) {
    stateBuyOrderTributeSummaryDetail.value = { ...stateBuyOrderTributeSummaryDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Tributo Resumen Orden Compra
export const sendBuyOrderTributeSummaryDetail = async (action, _id = null) => {
  stateBuyOrderTributeSummaryDetail.value.idOrdenCompra = stateBuyOrder.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderTributeSummaryDetail.value.loading = true
  const response = await sendForm(stateBuyOrderTributeSummaryDetail, urlApiBuyOrderTributeSummaryDetail, titleNotificationBuyOrderTributeSummaryDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderTributeSummaryDetail.value.loading = false
  return response
}
