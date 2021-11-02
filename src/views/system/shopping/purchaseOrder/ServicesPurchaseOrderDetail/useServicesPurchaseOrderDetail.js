// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Pedido Compra
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPurchaseOrderDetail, dataTablePurchaseOrderDetail, statePurchaseOrderDetail, urlApiPurchaseOrderDetail, titleNotificationPurchaseOrderDetail,
} from './useVariablesPurchaseOrderDetail'
import { statePurchaseOrder } from '../ServicesPurchaseOrder/useVariablesPurchaseOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsPurchaseOrderDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPurchaseOrderDetail, dataTablePurchaseOrderDetail, urlApiPurchaseOrderDetail, titleNotificationPurchaseOrderDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePurchaseOrderDetail
export const getPurchaseOrderDetailById = async _id => {
  const { data, status } = await getDataById(urlApiPurchaseOrderDetail, _id, titleNotificationPurchaseOrderDetail)
  if (status) {
    statePurchaseOrderDetail.value = { ...statePurchaseOrderDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Pedido Compra
export const sendPurchaseOrderDetail = async (action, _id = null) => {
  statePurchaseOrderDetail.value.idPedidoCompra = statePurchaseOrder.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePurchaseOrderDetail.value.loading = true
  const response = await sendForm(statePurchaseOrderDetail, urlApiPurchaseOrderDetail, titleNotificationPurchaseOrderDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePurchaseOrderDetail.value.loading = false
  return response
}
