// Importar funciones y variables necesarias para crear los servicios del mantenimiento Empaque
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPacking, dataTablePacking, statePacking, urlApiPacking, titleNotificationPacking,
} from './useVariablesPacking'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePacking
export const loadItemsPacking = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPacking, dataTablePacking, urlApiPacking, titleNotificationPacking, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePacking
export const getPackingById = async _id => {
  const { data, status } = await getDataById(urlApiPacking, _id, titleNotificationPacking)
  if (status) {
    statePacking.value = { ...statePacking.value, ...data }
  }
}

// Función para gestionar una Empaque
export const sendPacking = async (action, _id = null) => {
  const response = await sendForm(statePacking, urlApiPacking, titleNotificationPacking, action, _id)
  return response
}
