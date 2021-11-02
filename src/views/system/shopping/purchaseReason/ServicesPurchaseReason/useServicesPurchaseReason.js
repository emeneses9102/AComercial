// Importar funciones y variables necesarias para crear los servicios del mantenimiento Motivo Compra
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPurchaseReason, dataTablePurchaseReason, statePurchaseReason, urlApiPurchaseReason, titleNotificationPurchaseReason,
} from './useVariablesPurchaseReason'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePurchaseReason
export const loadItemsPurchaseReason = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPurchaseReason, dataTablePurchaseReason, urlApiPurchaseReason, titleNotificationPurchaseReason, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePurchaseReason
export const getPurchaseReasonById = async _id => {
  const { data, status } = await getDataById(urlApiPurchaseReason, _id, titleNotificationPurchaseReason)
  if (status) {
    statePurchaseReason.value = { ...statePurchaseReason.value, ...data }
  }
}

// Función para gestionar una Motivo Compra
export const sendPurchaseReason = async (action, _id = null) => {
  const response = await sendForm(statePurchaseReason, urlApiPurchaseReason, titleNotificationPurchaseReason, action, _id)
  return response
}
