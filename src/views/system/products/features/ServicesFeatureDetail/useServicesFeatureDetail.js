// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Característica
// import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryFeatureDetail, dataTableFeatureDetail, stateFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail,
} from './useVariablesFeatureDetail'
import { stateFeature } from '../ServicesFeature/useVariablesFeature'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsFeatureDetail = async (page = null, perPage = null) => {
  // if (page) serverQueryFeatureDetail.value.pinicio = page
  // if (perPage) serverQueryFeatureDetail.value.pfin = perPage
  // dataTableFeatureDetail.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiFeatureDetail, serverQueryFeatureDetail.value, titleNotificationFeatureDetail)
  // if (status) {
  //   dataTableFeatureDetail.value.rows = rows
  //   dataTableFeatureDetail.value.totalRows = totalRows
  // }
  // dataTableFeatureDetail.value.loading = false
  const status = await loadTable(serverQueryFeatureDetail, dataTableFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateFeatureDetail
export const getFeatureDetailById = async _id => {
  const { data, status } = await getDataById(urlApiFeatureDetail, _id, titleNotificationFeatureDetail)
  if (status) {
    stateFeatureDetail.value._id = data._id
    stateFeatureDetail.value.nombre = data.nombre
    stateFeatureDetail.value.abreviatura = data.abreviatura
    stateFeatureDetail.value.idCaracteristica = data.idCaracteristica
  }
}

// Función para gestionar un Detalle Característica
export const sendFeatureDetail = async (action, _id = null) => {
  // if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = true
  // stateFeatureDetail.value.accion = action
  // stateFeatureDetail.value.idCaracteristica = stateFeature.value._id
  // const response = await sendData(urlApiFeatureDetail, _id ? { ...stateFeatureDetail.value, _id } : stateFeatureDetail.value, titleNotificationFeatureDetail)
  // if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = false
  // return response
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = true
  stateFeatureDetail.value.idCaracteristica = stateFeature.value._id
  const response = await sendForm(stateFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = true
  return response
}
