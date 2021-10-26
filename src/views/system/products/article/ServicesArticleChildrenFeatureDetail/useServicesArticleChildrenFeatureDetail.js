// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Caracteristica
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleChildrenFeatureDetail, dataTableArticleChildrenFeatureDetail, stateArticleChildrenFeatureDetail, urlApiArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail,
} from './useVariablesArticleChildrenFeatureDetail'
// import { stateArticle } from '../ServicesArticle/useVariablesArticle'
// import { stateArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsArticleChildrenFeatureDetail = async (page = null, perPage = null) => {
  serverQueryArticleChildrenFeatureDetail.value.indice = stateArticleChildrenFeatureDetail.value.idTArticulo
  const status = await loadTable(serverQueryArticleChildrenFeatureDetail, dataTableArticleChildrenFeatureDetail, urlApiArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArticleChildrenFeatureDetail
export const getArticleChildrenFeatureDetailById = async _id => {
  const response = await getDataById(urlApiArticleChildrenFeatureDetail, _id, titleNotificationArticleChildrenFeatureDetail)
  return response
}

// Función para gestionar un Detalle Articulo Caracteristica
export const sendArticleChildrenFeatureDetail = async (action, _id = null) => {
  // stateArticleChildrenFeatureDetail.value.idTArticulo = stateArticleChildrenDetail.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenFeatureDetail.value.loading = true
  const response = await sendForm(stateArticleChildrenFeatureDetail, urlApiArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenFeatureDetail.value.loading = false
  return response
}
