// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Tributo
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleTributeDetail, dataTableArticleTributeDetail, stateArticleTributeDetail, urlApiArticleTributeDetail, titleNotificationArticleTributeDetail,
} from './useVariablesArticleTributeDetail'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTable
export const loadItemsArticleTributeDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryArticleTributeDetail, dataTableArticleTributeDetail, urlApiArticleTributeDetail, titleNotificationArticleTributeDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArticleTributeDetail
export const getArticleTributeDetailById = async _id => {
  const response = await getDataById(urlApiArticleTributeDetail, _id, titleNotificationArticleTributeDetail)
  return response
}

// Función para gestionar un Detalle Articulo Tributo
export const sendArticleTributeDetail = async (action, _id = null) => {
  if (stateArticleTributeDetail.value.finicial) {
    stateArticleTributeDetail.value.inicial = stateArticleTributeDetail.value.finicial
  } else {
    stateArticleTributeDetail.value.inicial = '1900-01-01'
  }
  if (stateArticleTributeDetail.value.ffinal) {
    stateArticleTributeDetail.value.final = stateArticleTributeDetail.value.ffinal
  } else {
    stateArticleTributeDetail.value.final = '1900-01-01'
  }
  stateArticleTributeDetail.value.idArticulo = stateArticle.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleTributeDetail.value.loading = true
  const response = await sendForm(stateArticleTributeDetail, urlApiArticleTributeDetail, titleNotificationArticleTributeDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleTributeDetail.value.loading = false
  return response
}
