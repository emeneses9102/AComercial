// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Punto de Venta Movimiento
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPointSaleSerie, dataTablePointSaleSerie, statePointSaleSerie, urlApiPointSaleSerie, titleNotificationPointSaleSerie,
} from './useVariablesPointSaleSerieDetail'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsPointSaleSerie = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSaleSerie, dataTablePointSaleSerie, urlApiPointSaleSerie, titleNotificationPointSaleSerie, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSaleSerie
export const getPointSaleSerieById = async _id => {
  const response = await getDataById(urlApiPointSaleSerie, _id, titleNotificationPointSaleSerie)
  return response
}

// Función para gestionar un Detalle Punto de Venta Movimiento
export const sendPointSaleSerie = async (action, _id = null) => {
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleSerie.value.loading = true
  const response = await sendForm(statePointSaleSerie, urlApiPointSaleSerie, titleNotificationPointSaleSerie, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleSerie.value.loading = false
  return response
}
