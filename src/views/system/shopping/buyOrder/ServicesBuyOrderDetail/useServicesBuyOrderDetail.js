// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Orden Compra
import { ref } from '@vue/composition-api'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBuyOrderDetail, dataTableBuyOrderDetail, stateBuyOrderDetail, urlApiBuyOrderDetail, titleNotificationBuyOrderDetail,
} from './useVariablesBuyOrderDetail'
import { stateBuyOrder } from '../ServicesBuyOrder/useVariablesBuyOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsBuyOrderDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBuyOrderDetail, dataTableBuyOrderDetail, urlApiBuyOrderDetail, titleNotificationBuyOrderDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBuyOrderDetail
export const getBuyOrderDetailById = async _id => {
  const { data, status } = await getDataById(urlApiBuyOrderDetail, _id, titleNotificationBuyOrderDetail)
  if (status) {
    stateBuyOrderDetail.value = { ...stateBuyOrderDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Orden Compra
export const sendBuyOrderDetail = async (action, _id = null) => {
  stateBuyOrderDetail.value.idOrdenCompra = stateBuyOrder.value._id
  const newStateBuyOrderDetail = ref({
    _id: stateBuyOrderDetail.value._id,
    idOrdenCompra: stateBuyOrderDetail.value.idOrdenCompra,
    idPedidoCompra: stateBuyOrderDetail.value.idPedidoCompra,
    idDetallePedidoCompra: stateBuyOrderDetail.value.idDetallePedidoCompra,
    idArticulo: stateBuyOrderDetail.value.idArticulo,
    idTablaArticulo: stateBuyOrderDetail.value.idTablaArticulo,
    cantidad: stateBuyOrderDetail.value.cantidad,
    precioCompra: stateBuyOrderDetail.value.precioCompra,
    descuento: stateBuyOrderDetail.value.descuento,
    idMotivoCompra: stateBuyOrderDetail.value.idMotivoCompra,
    accion: stateBuyOrderDetail.value.accion,
    loading: stateBuyOrderDetail.value.loading,
  })
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderDetail.value.loading = true
  const response = await sendForm(newStateBuyOrderDetail, urlApiBuyOrderDetail, titleNotificationBuyOrderDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateBuyOrderDetail.value.loading = false
  return response
}
