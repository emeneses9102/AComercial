// Importar funciones y variables necesarias para crear los servicios de la tabla Detalle Articulo Caracteristica
import { ref } from '@vue/composition-api'

import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryArticleChildrenSerieDetail, dataTableArticleChildrenSerieDetail, stateArticleChildrenSerieDetail, urlApiArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail,
} from './useVariablesArticleChildrenSerieDetail'

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

// Función para gestionar un Detalle Articulo Caracteristica
export const sendArticleChildrenSerieDetail = async (action, _id = null) => {
  // stateArticleChildrenSerieDetail.value.idTArticulo = stateArticleChildrenDetail.value._id
  const newStateArticleChildrenSerieDetail = ref({
    _id: stateArticleChildrenSerieDetail.value._id,
    idTArticulo: stateArticleChildrenSerieDetail.value.idTArticulo,
    serie: stateArticleChildrenSerieDetail.value.serie,
    observaciones: stateArticleChildrenSerieDetail.value.observaciones,
    fabricacion: stateArticleChildrenSerieDetail.value.fabricacion || '1900-01-01',
    vencimiento: stateArticleChildrenSerieDetail.value.vencimiento || '1900-01-01',
    accion: stateArticleChildrenSerieDetail.value.accion,
    loading: stateArticleChildrenSerieDetail.value.loading,
  })
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenSerieDetail.value.loading = true
  const response = await sendForm(newStateArticleChildrenSerieDetail, urlApiArticleChildrenSerieDetail, titleNotificationArticleChildrenSerieDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateArticleChildrenSerieDetail.value.loading = false
  return response
}
