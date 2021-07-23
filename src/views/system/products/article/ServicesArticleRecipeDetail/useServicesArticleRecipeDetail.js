// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Receta
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleRecipeDetail, dataTableArticleRecipeDetail, stateArticleRecipeDetail, urlApiArticleRecipeDetail, titleNotificationArticleRecipeDetail,
} from './useVariablesArticleRecipeDetail'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsArticleRecipeDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArticleRecipeDetail, dataTableArticleRecipeDetail, urlApiArticleRecipeDetail, titleNotificationArticleRecipeDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api
export const getArticleRecipeDetailById = async _id => {
  const response = await getDataById(urlApiArticleRecipeDetail, _id, titleNotificationArticleRecipeDetail)
  return response
}

// Función para gestionar un Detalle Articulo Receta
export const sendArticleRecipeDetail = async (action, _id = null) => {
  stateArticleRecipeDetail.value.idArticulo = stateArticle.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleRecipeDetail.value.loading = true
  const response = await sendForm(stateArticleRecipeDetail, urlApiArticleRecipeDetail, titleNotificationArticleRecipeDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleRecipeDetail.value.loading = false
  return response
}
