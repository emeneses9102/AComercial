// Importar funciones y variables necesarias para crear los servicios del mantenimiento Predio
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPredio, dataTablePredio, statePredio, urlApiPredio, titleNotificationPredio,
} from './useVariablesPredio'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePredio
export const loadItemsPredio = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPredio, dataTablePredio, urlApiPredio, titleNotificationPredio, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePredio
export const getPredioById = async _id => {
  const { data, status } = await getDataById(urlApiPredio, _id, titleNotificationPredio)
  if (status) {
    statePredio.value = { ...statePredio.value, ...data }
  }
}

// Función para gestionar una Predio
export const sendPredio = async (action, _id = null) => {
  const response = await sendForm(statePredio, urlApiPredio, titleNotificationPredio, action, _id)
  return response
}
