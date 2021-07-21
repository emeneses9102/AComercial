// Importar funciones y variables necesarias para crear los servicios del mantenimiento Grupo Unidad
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryUnitGroup, dataTableUnitGroup, stateUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup,
} from './useVariablesUnitGroup'

// Función para obtener los datos desde la API y actualizar los valores de dataTableUnitGroups
export const loadItemsUnitGroup = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUnitGroup, dataTableUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateUnitGroup
export const getUnitGroupById = async _id => {
  const { data, status } = await getDataById(urlApiUnitGroup, _id, titleNotificationUnitGroup)
  if (status) {
    stateUnitGroup.value = { ...stateUnitGroup.value, ...data }
  }
}

// Función para gestionar una Grupo Unidad
export const sendUnitGroup = async (action, _id = null) => {
  const response = await sendForm(stateUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup, action, _id)
  return response
}
