// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Tributo
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryTributeTypeDetail, dataTableTributeTypeDetail, stateTributeTypeDetail, urlApiTributeTypeDetail, titleNotificationTributeTypeDetail,
} from './useVariablesTributeTypeDetail'
import { stateTribute } from '../ServicesTribute/useVariablesTribute'

// Función para obtener los datos desde la API y actualizar los valores de dataTable
export const loadItemsTributeTypeDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryTributeTypeDetail, dataTableTributeTypeDetail, urlApiTributeTypeDetail, titleNotificationTributeTypeDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateTributeTypeDetail
export const getTributeTypeDetailById = async _id => {
  const response = await getDataById(urlApiTributeTypeDetail, _id, titleNotificationTributeTypeDetail)
  return response
}

// Función para gestionar un Detalle Articulo Tributo
export const sendTributeTypeDetail = async (action, _id = null) => {
  if (stateTributeTypeDetail.value.finicial) {
    stateTributeTypeDetail.value.inicial = stateTributeTypeDetail.value.finicial
  } else {
    stateTributeTypeDetail.value.inicial = '1900-01-01'
  }
  if (stateTributeTypeDetail.value.ffinal) {
    stateTributeTypeDetail.value.final = stateTributeTypeDetail.value.ffinal
  } else {
    stateTributeTypeDetail.value.final = '1900-01-01'
  }
  stateTributeTypeDetail.value.idTributo = stateTribute.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateTributeTypeDetail.value.loading = true
  const response = await sendForm(stateTributeTypeDetail, urlApiTributeTypeDetail, titleNotificationTributeTypeDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateTributeTypeDetail.value.loading = false
  return response
}
