// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Serie
import { getDataById, loadTable } from '@/helpers/manageTables'
import {
  serverQueryArticleChildrenSerieDetail, dataTableArticleChildrenSerieDetail, stateArticleChildrenSerieDetail, urlApiArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail,
} from './useVariablesArticleSerieDetail'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsArticleChildrenSerieDetail = async (page = null, perPage = null) => {
  serverQueryArticleChildrenSerieDetail.value.indice = stateArticleChildrenSerieDetail.value.idTArticulo
  const status = await loadTable(serverQueryArticleChildrenSerieDetail, dataTableArticleChildrenSerieDetail, urlApiArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateArticleChildrenSerieDetail
export const getArticleChildrenSerieDetailById = async _id => {
  const response = await getDataById(urlApiArticleChildrenSerieDetail, _id, titleNotificationArticleChildrenSerieDetail)
  return response
}
