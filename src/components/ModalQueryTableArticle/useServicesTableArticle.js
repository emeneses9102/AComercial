// Importar funciones y variables necesarias para crear los servicios del mantenimiento Artículos
import { getData, getDataById } from '@/helpers/manageTables'
import {
  serverQueryArticle, dataTableArticle, stateArticle, urlApiArticle, titleNotificationArticle,
} from './useVariablesTableArticle'

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
  }
}
