// Importar funciones y variables necesarias para crear los servicios de la tabla detalle Grupo Unidad
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUnitGroupDetail, dataTableUnitGroupDetail, stateUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail,
} from './useVariablesUnitGroupDetail'
import { stateUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeatures
export const loadItemsUnitGroupDetail = async (page = null, perPage = null) => {
  // if (page) serverQueryUnitGroupDetail.value.pinicio = page
  // if (perPage) serverQueryUnitGroupDetail.value.pfin = perPage
  // dataTableUnitGroupDetail.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiUnitGroupDetail, serverQueryUnitGroupDetail.value, titleNotificationUnitGroupDetail)
  // if (status) {
  //   dataTableUnitGroupDetail.value.rows = rows
  //   dataTableUnitGroupDetail.value.totalRows = totalRows
  // }
  // dataTableUnitGroupDetail.value.loading = false
  const status = await loadTable(serverQueryUnitGroupDetail, dataTableUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUnitGroupDetail
export const getUnitGroupDetailById = async _id => {
  const { data, status } = await getDataById(urlApiUnitGroupDetail, _id, titleNotificationUnitGroupDetail)
  if (status) {
    stateUnitGroupDetail.value._id = data._id
    stateUnitGroupDetail.value.nombre = data.nombre
    stateUnitGroupDetail.value.idGrupoUnidad = data.idGrupoUnidad
    stateUnitGroupDetail.value.idUnidadSunat = data.idUnidadSunat
  }
}

// Función para gestionar un Detalle Grupo Unidad
export const sendUnitGroupDetail = async (action, _id = null) => {
  // if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = true
  // stateUnitGroupDetail.value.accion = action
  // const response = await sendData(urlApiUnitGroupDetail, _id ? { ...stateUnitGroupDetail.value, _id } : stateUnitGroupDetail.value, titleNotificationUnitGroupDetail)
  // if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = false
  // return response
  stateUnitGroupDetail.value.idGrupoUnidad = stateUnitGroup.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = true
  const response = await sendForm(stateUnitGroupDetail, urlApiUnitGroupDetail, titleNotificationUnitGroupDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateUnitGroupDetail.value.loading = false
  return response
}
