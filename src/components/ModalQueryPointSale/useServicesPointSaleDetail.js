import {
  ACTION_REGISTER,
  ACTION_UPDATE,
} from '@/helpers/actionsApi'
import {
  getDataById,
  loadTable,
  sendForm,
} from '@/helpers/manageTables'
import {
  statePointSaleDetail,
  listPointSaleDetail,
  urlApiPointSaleDetail,
  titleNotificationPointSaleDetail,
  serverQueryPointSaleDetail,
} from './useVariablesPointSaleDetail'
import {
  statePointSale,
} from './useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de listPointSaleDetail
export const loadItemsPointSaleDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSaleDetail, listPointSaleDetail, urlApiPointSaleDetail, titleNotificationPointSaleDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSaleDetail
export const getPointSaleDetailById = async _id => {
  const { data, status } = await getDataById(urlApiPointSaleDetail, _id, titleNotificationPointSaleDetail)
  if (status) {
    statePointSaleDetail.value = { ...statePointSaleDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Punto de Venta
export const sendPointSaleDetail = async (action, _id = null) => {
  statePointSaleDetail.value.idPuntoVenta = statePointSale.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = true
  const response = await sendForm(statePointSaleDetail, urlApiPointSaleDetail, titleNotificationPointSaleDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = false
  return response
}
