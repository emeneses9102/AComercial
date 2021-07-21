// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Característica
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryFeatureDetail, dataTableFeatureDetail, stateFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail,
} from './useVariablesFeatureDetail'
import { stateFeature } from '../ServicesFeature/useVariablesFeature'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsFeatureDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryFeatureDetail, dataTableFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateFeatureDetail
export const getFeatureDetailById = async _id => {
  const { data, status } = await getDataById(urlApiFeatureDetail, _id, titleNotificationFeatureDetail)
  if (status) {
    stateFeatureDetail.value = { ...stateFeatureDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Característica
export const sendFeatureDetail = async (action, _id = null) => {
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = true
  stateFeatureDetail.value.idCaracteristica = stateFeature.value._id
  const response = await sendForm(stateFeatureDetail, urlApiFeatureDetail, titleNotificationFeatureDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateFeatureDetail.value.loading = false
  return response
}
