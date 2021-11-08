// Importar funciones y variables necesarias para crear los servicios del mantenimiento Artículos Grupo Unidad
import { getData, getDataById } from '@/helpers/manageTables'
import {
  serverQueryTArticleUnitGroup, dataTableTArticleUnitGroup, stateTArticleUnitGroup, urlApiTArticleUnitGroup, titleNotificationTArticleUnitGroup,
} from './useVariablesTArticleUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableTArticleUnitGroup
export const loadItemsTArticleUnitGroup = async (page = null, perPage = null) => {
  if (page) serverQueryTArticleUnitGroup.value.pinicio = page
  if (perPage) serverQueryTArticleUnitGroup.value.pfin = perPage
  dataTableTArticleUnitGroup.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiTArticleUnitGroup, serverQueryTArticleUnitGroup.value, titleNotificationTArticleUnitGroup)
  if (status) {
    dataTableTArticleUnitGroup.value.rows = rows
    dataTableTArticleUnitGroup.value.totalRows = totalRows
  }
  dataTableTArticleUnitGroup.value.loading = false
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateTArticleUnitGroup
export const getTArticleUnitGroupById = async _id => {
  const { data, status } = await getDataById(urlApiTArticleUnitGroup, _id, titleNotificationTArticleUnitGroup)
  if (status) {
    stateTArticleUnitGroup.value = { ...stateTArticleUnitGroup.value, ...data }
  }
}
