// Importar funciones y variables necesarias para crear los servicios del mantenimiento Grupo Unidad
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUnitGroup, dataTableUnitGroup, stateUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup,
} from './useVariablesUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableUnitGroups
export const loadItemsUnitGroup = async (page = null, perPage = null) => {
  // if (page) serverQueryUnitGroup.value.pinicio = page
  // if (perPage) serverQueryUnitGroup.value.pfin = perPage
  // dataTableUnitGroup.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiUnitGroup, serverQueryUnitGroup.value, titleNotificationUnitGroup)
  // if (status) {
  //   dataTableUnitGroup.value.rows = rows
  //   dataTableUnitGroup.value.totalRows = totalRows
  // }
  // dataTableUnitGroup.value.loading = false
  const status = await loadTable(serverQueryUnitGroup, dataTableUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUnitGroup
export const getUnitGroupById = async _id => {
  const { data, status } = await getDataById(urlApiUnitGroup, _id, titleNotificationUnitGroup)
  if (status) {
    stateUnitGroup.value._id = data._id
    stateUnitGroup.value.nombre = data.nombre
  }
}

// Función para gestionar una Grupo Unidad
export const sendUnitGroup = async (action, _id = null) => {
  // if (_id) stateUnitGroup.value._id = _id
  // stateUnitGroup.value.accion = action
  // const response = await sendData(urlApiUnitGroup, stateUnitGroup.value, titleNotificationUnitGroup)
  // if (response.status && action === ACTION_REGISTER) stateUnitGroup.value._id = response.data.id
  // return response
  const response = await sendForm(stateUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup, action, _id)
  return response
}
