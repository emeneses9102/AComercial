// Importar funciones y variables necesarias para crear los servicios del mantenimiento Artículos
import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getData, getDataById, sendData } from '@/helpers/manageTables'
import {
  serverQueryArticle, dataTableArticle, stateArticle, urlApiArticle, titleNotificationArticle, selectedArticleType,
} from './useVariablesArticle'

// Función para obtener los datos desde la API y actualizar los valores de dataTableArticle
export const loadItemsArticle = async (page = null, perPage = null) => {
  if (page) serverQueryArticle.value.pinicio = page
  if (perPage) serverQueryArticle.value.pfin = perPage
  dataTableArticle.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiArticle, serverQueryArticle.value, titleNotificationArticle)
  if (status) {
    dataTableArticle.value.rows = rows
    dataTableArticle.value.totalRows = totalRows
  }
  dataTableArticle.value.loading = false
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArticle
export const getArticleById = async _id => {
  const { data, status } = await getDataById(urlApiArticle, _id, titleNotificationArticle)
  if (status) {
    stateArticle.value = { ...stateArticle.value, ...data }
    if (stateArticle.value.flgStock) selectedArticleType.value = 'stock'
    else if (stateArticle.value.flgServicio) selectedArticleType.value = 'servicio'
    else selectedArticleType.value = ''
  }
}

// Función para gestionar un Artículos
export const sendArticle = async (action, _id = null) => {
  if (_id) stateArticle.value._id = _id
  stateArticle.value.accion = action
  const response = await sendData(urlApiArticle, stateArticle.value, titleNotificationArticle)
  if (response.status && action === ACTION_REGISTER) stateArticle.value._id = response.data.id
  return response
}
