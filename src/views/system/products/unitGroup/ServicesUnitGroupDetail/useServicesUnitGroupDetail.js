// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Grupo Unidad
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUnitGroupDetail, dataTableUnitGroupDetail, stateUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail,
} from './useVariablesUnitGroupDetail'
import { stateUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsUnitGroupDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUnitGroupDetail, dataTableUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUnitGroupDetail
export const getUnitGroupDetailById = async _id => {
  const { data, status } = await getDataById(urlApiUnitGroupDetail, _id, titleNotificationUnitGroupDetail)
  if (status) {
    stateUnitGroupDetail.value = { ...stateUnitGroupDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Grupo Unidad
export const sendUnitGroupDetail = async (action, _id = null) => {
  stateUnitGroupDetail.value.idGrupoUnidad = stateUnitGroup.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = true
  const response = await sendForm(stateUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = false
  return response
}
