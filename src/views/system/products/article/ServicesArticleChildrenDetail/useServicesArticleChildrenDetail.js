// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Hijos
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, stateArticleChildrenDetail, urlApiArticleChildrenDetail, titleNotificationArticleChildrenDetail,
} from './useVariablesArticleChildrenDetail'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTableArticleChildrenDetail
export const loadItemsArticleChildrenDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArticleChildrenDetail, dataTableArticleChildrenDetail, urlApiArticleChildrenDetail, titleNotificationArticleChildrenDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api
export const getArticleChildrenDetailById = async _id => {
  const response = await getDataById(urlApiArticleChildrenDetail, _id, titleNotificationArticleChildrenDetail)
  return response
}

// Función para gestionar un Detalle Articulo Hijos
export const sendArticleChildrenDetail = async (action, _id = null) => {
  stateArticleChildrenDetail.value.idArticulo = stateArticle.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenDetail.value.loading = true
  const response = await sendForm(stateArticleChildrenDetail, urlApiArticleChildrenDetail, titleNotificationArticleChildrenDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenDetail.value.loading = false
  return response
}
