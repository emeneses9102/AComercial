// Importar funciones y variables necesarias para crear los servicios del mantenimiento Orden de Compra
import { ref } from '@vue/composition-api'
import {
  ACTION_APPROVE, ACTION_ATTENDED, ACTION_CANCEL,
} from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBuyOrder, dataTableBuyOrder, stateBuyOrder, urlApiBuyOrder, titleNotificationBuyOrder,
} from './useVariablesBuyOrder'

// Función para obtener los datos desde la API y actualizar los valores de dataTableBuyOrder
export const loadItemsBuyOrder = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBuyOrder, dataTableBuyOrder, urlApiBuyOrder, titleNotificationBuyOrder, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBuyOrder
export const getBuyOrderById = async _id => {
  const { data, status } = await getDataById(urlApiBuyOrder, _id, titleNotificationBuyOrder)
  if (status) {
    stateBuyOrder.value = { ...stateBuyOrder.value, ...data }
  }
}

// Función para gestionar una Orden de Compra
export const sendBuyOrder = async (action, _id = null) => {
  let newStateBuyOrder
  if (action === ACTION_APPROVE || action === ACTION_CANCEL || action === ACTION_ATTENDED) {
    newStateBuyOrder = ref({
      _id: stateBuyOrder.value._id,
      accion: stateBuyOrder.value.accion,
      loading: stateBuyOrder.value.loading,
    })
  } else {
    newStateBuyOrder = ref({
      _id: stateBuyOrder.value._id,
      entrega: stateBuyOrder.value.entrega,
      pedidoCompra: stateBuyOrder.value.pedidoCompra,
      idMoneda: stateBuyOrder.value.idMoneda,
      idProveedor: stateBuyOrder.value.idProveedor,
      idFormaPago: stateBuyOrder.value.idFormaPago,
      prioridad: stateBuyOrder.value.prioridad, // 0 - 9
      observacion: stateBuyOrder.value.observacion,
      idFormato: stateBuyOrder.value.idFormato,
      accion: stateBuyOrder.value.accion,
      loading: stateBuyOrder.value.loading,
    })
  }
  const response = await sendForm(newStateBuyOrder, urlApiBuyOrder, titleNotificationBuyOrder, action, _id)
  return response
}
