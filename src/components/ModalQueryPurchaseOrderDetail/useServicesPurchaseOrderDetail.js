// Importar funciones y variables necesarias para crear los servicios del mantenimiento Detalle Pedido Compra
import { getData, getDataById } from '@/helpers/manageTables'
import {
  serverQueryPurchaseOrderDetail, dataTablePurchaseOrderDetail, statePurchaseOrderDetail, urlApiPurchaseOrderDetail, titleNotificationPurchaseOrderDetail,
} from './useVariablesPurchaseOrderDetail'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePurchaseOrderDetail
export const loadItemsPurchaseOrderDetail = async (page = null, perPage = null) => {
  if (page) serverQueryPurchaseOrderDetail.value.pinicio = page
  if (perPage) serverQueryPurchaseOrderDetail.value.pfin = perPage
  dataTablePurchaseOrderDetail.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiPurchaseOrderDetail, serverQueryPurchaseOrderDetail.value, titleNotificationPurchaseOrderDetail)
  if (status) {
    dataTablePurchaseOrderDetail.value.rows = rows
    dataTablePurchaseOrderDetail.value.totalRows = totalRows
  }
  dataTablePurchaseOrderDetail.value.loading = false
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePurchaseOrderDetail
export const getPurchaseOrderDetailById = async _id => {
  const { data, status } = await getDataById(urlApiPurchaseOrderDetail, _id, titleNotificationPurchaseOrderDetail)
  if (status) {
    statePurchaseOrderDetail.value = { ...statePurchaseOrderDetail.value, ...data }
  }
}
