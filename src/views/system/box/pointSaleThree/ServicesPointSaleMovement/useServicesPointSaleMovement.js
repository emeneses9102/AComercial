// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Punto de Venta Movimiento
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPointSaleMovement, dataTablePointSaleMovement, statePointSaleMovement, urlApiPointSaleMovement, titleNotificationPointSaleMovement,
} from './useVariablesPointSaleMovement'
import { statePointSale } from '../ServicesPointSale/useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsPointSaleMovement = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSaleMovement, dataTablePointSaleMovement, urlApiPointSaleMovement, titleNotificationPointSaleMovement, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSaleMovement
export const getPointSaleMovementById = async _id => {
  const response = await getDataById(urlApiPointSaleMovement, _id, titleNotificationPointSaleMovement)
  return response
}

// Función para gestionar un Detalle Punto de Venta Movimiento
export const sendPointSaleMovement = async (action, _id = null) => {
  statePointSaleMovement.value.idPuntoVenta = statePointSale.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleMovement.value.loading = true
  const response = await sendForm(statePointSaleMovement, urlApiPointSaleMovement, titleNotificationPointSaleMovement, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleMovement.value.loading = false
  return response
}
