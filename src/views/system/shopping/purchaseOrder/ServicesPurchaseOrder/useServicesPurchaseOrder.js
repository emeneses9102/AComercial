// Importar funciones y variables necesarias para crear los servicios del mantenimiento Pedido Compra
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPurchaseOrder, dataTablePurchaseOrder, statePurchaseOrder, urlApiPurchaseOrder, titleNotificationPurchaseOrder,
} from './useVariablesPurchaseOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePurchaseOrder
export const loadItemsPurchaseOrder = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPurchaseOrder, dataTablePurchaseOrder, urlApiPurchaseOrder, titleNotificationPurchaseOrder, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePurchaseOrder
export const getPurchaseOrderById = async _id => {
  const { data, status } = await getDataById(urlApiPurchaseOrder, _id, titleNotificationPurchaseOrder)
  if (status) {
    statePurchaseOrder.value = { ...statePurchaseOrder.value, ...data }
  }
}

// Función para gestionar un Pedido Compra
export const sendPurchaseOrder = async (action, _id = null) => {
  const response = await sendForm(statePurchaseOrder, urlApiPurchaseOrder, titleNotificationPurchaseOrder, action, _id)
  return response
}
