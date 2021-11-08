// Importar funciones y variables necesarias para crear los servicios del mantenimiento TArticulo Grupo Unidad
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryTArticleUnitGroup, dataTableTArticleUnitGroup, stateTArticleUnitGroup, urlApiTArticleUnitGroup, titleNotificationTArticleUnitGroup,
} from './useVariablesTArticleUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableTArticleUnitGroup
export const loadItemsTArticleUnitGroup = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryTArticleUnitGroup, dataTableTArticleUnitGroup, urlApiTArticleUnitGroup, titleNotificationTArticleUnitGroup, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateTArticleUnitGroup
export const getTArticleUnitGroupById = async _id => {
  const { data, status } = await getDataById(urlApiTArticleUnitGroup, _id, titleNotificationTArticleUnitGroup)
  if (status) {
    stateTArticleUnitGroup.value = { ...stateTArticleUnitGroup.value, ...data }
  }
}

// Función para gestionar una TArticulo Grupo Unidad
export const sendTArticleUnitGroup = async (action, _id = null) => {
  const response = await sendForm(stateTArticleUnitGroup, urlApiTArticleUnitGroup, titleNotificationTArticleUnitGroup, action, _id)
  return response
}
