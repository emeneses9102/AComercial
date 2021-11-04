// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Tributo Orden Compra
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBuyOrderTributeDetail, dataTableBuyOrderTributeDetail, stateBuyOrderTributeDetail, urlApiBuyOrderTributeDetail, titleNotificationBuyOrderTributeDetail,
} from './useVariablesBuyOrderTributeDetail'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsBuyOrderTributeDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBuyOrderTributeDetail, dataTableBuyOrderTributeDetail, urlApiBuyOrderTributeDetail, titleNotificationBuyOrderTributeDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBuyOrderTributeDetail
export const getBuyOrderTributeDetailById = async _id => {
  const { data, status } = await getDataById(urlApiBuyOrderTributeDetail, _id, titleNotificationBuyOrderTributeDetail)
  if (status) {
    stateBuyOrderTributeDetail.value = { ...stateBuyOrderTributeDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Tributo Orden Compra
export const sendBuyOrderTributeDetail = async (action, _id = null) => {
  stateBuyOrderTributeDetail.value.idOrdenCompra = stateBuyOrder.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderTributeDetail.value.loading = true
  const response = await sendForm(stateBuyOrderTributeDetail, urlApiBuyOrderTributeDetail, titleNotificationBuyOrderTributeDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderTributeDetail.value.loading = false
  return response
}
