// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Negocio
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleBusinessDetail, dataTableArticleBusinessDetail, stateArticleBusinessDetail, urlApiArticleBusinessDetail, titleNotificationArticleBusinessDetail,
} from './useVariablesArticleBusinessDetail'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTableArticleBusinessDetail
export const loadItemsArticleBusinessDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArticleBusinessDetail, dataTableArticleBusinessDetail, urlApiArticleBusinessDetail, titleNotificationArticleBusinessDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api
export const getArticleBusinessDetailById = async _id => {
  const response = await getDataById(urlApiArticleBusinessDetail, _id, titleNotificationArticleBusinessDetail)
  return response
}

// Función para gestionar un Detalle Articulo Negocio
export const sendArticleBusinessDetail = async (action, _id = null) => {
  stateArticleBusinessDetail.value.idArticulo = stateArticle.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleBusinessDetail.value.loading = true
  const response = await sendForm(stateArticleBusinessDetail, urlApiArticleBusinessDetail, titleNotificationArticleBusinessDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleBusinessDetail.value.loading = false
  return response
}
