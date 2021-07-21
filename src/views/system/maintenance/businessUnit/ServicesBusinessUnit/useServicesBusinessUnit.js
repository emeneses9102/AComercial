// Importar funciones y variables necesarias para crear los servicios del mantenimiento Unidad de Negocio
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBusinessUnit, dataTableBusinessUnit, stateBusinessUnit, urlApiBusinessUnit, titleNotificationBusinessUnit,
} from './useVariablesBusinessUnit'

// Función para obtener los datos desde la API y actualizar los valores de dataTableBusinessUnit
export const loadItemsBusinessUnit = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBusinessUnit, dataTableBusinessUnit, urlApiBusinessUnit, titleNotificationBusinessUnit, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBusinessUnit
export const getBusinessUnitById = async _id => {
  const { data, status } = await getDataById(urlApiBusinessUnit, _id, titleNotificationBusinessUnit)
  if (status) {
    stateBusinessUnit.value = { ...stateBusinessUnit.value, ...data }
  }
}

// Función para gestionar una Unidad de Negocio
export const sendBusinessUnit = async (action, _id = null) => {
  const response = await sendForm(stateBusinessUnit, urlApiBusinessUnit, titleNotificationBusinessUnit, action, _id)
  return response
}
