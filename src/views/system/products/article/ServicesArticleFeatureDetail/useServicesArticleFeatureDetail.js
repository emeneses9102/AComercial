// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Caracteristica
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleFeatureDetail, dataTableArticleFeatureDetail, stateArticleFeatureDetail, urlApiArticleFeatureDetail, titleNotificationArticleFeatureDetail,
} from './useVariablesArticleFeatureDetail'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsArticleFeatureDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArticleFeatureDetail, dataTableArticleFeatureDetail, urlApiArticleFeatureDetail, titleNotificationArticleFeatureDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArticleFeatureDetail
export const getArticleFeatureDetailById = async _id => {
  const response = await getDataById(urlApiArticleFeatureDetail, _id, titleNotificationArticleFeatureDetail)
  return response
}

// Función para gestionar un Detalle Articulo Caracteristica
export const sendArticleFeatureDetail = async (action, _id = null) => {
  stateArticleFeatureDetail.value.idArticulo = stateArticle.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleFeatureDetail.value.loading = true
  const response = await sendForm(stateArticleFeatureDetail, urlApiArticleFeatureDetail, titleNotificationArticleFeatureDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleFeatureDetail.value.loading = false
  return response
}
