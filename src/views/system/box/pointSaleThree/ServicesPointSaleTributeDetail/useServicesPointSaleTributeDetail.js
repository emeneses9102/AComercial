// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Punto de Venta Movimiento
import { getDataById, loadTable } from '@/helpers/manageTables'
import {
  serverQueryPointSaleTributeDetail, dataTablePointSaleTributeDetail, urlApiPointSaleTributeDetail, titleNotificationPointSaleTributeDetail,
} from './useVariablesPointSaleTributeDetail'
import { statePointSale } from '../ServicesPointSale/useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsPointSaleTributeDetail = async (page = null, perPage = null) => {
  serverQueryPointSaleTributeDetail.value.indice = statePointSale.value._id
  const status = await loadTable(serverQueryPointSaleTributeDetail, dataTablePointSaleTributeDetail, urlApiPointSaleTributeDetail, titleNotificationPointSaleTributeDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSaleTributeDetail
export const getPointSaleTributeDetailById = async _id => {
  const response = await getDataById(urlApiPointSaleTributeDetail, _id, titleNotificationPointSaleTributeDetail)
  return response
}
