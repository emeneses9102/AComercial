// Importar funciones y variables necesarias para crear los servicios del mantenimiento Moneda
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryCurrency, dataTableCurrency, stateCurrency, urlApiCurrency, titleNotificationCurrency,
} from './useVariablesCurrency'

// Función para obtener los datos desde la API y actualizar los valores de dataTableCurrency
export const loadItemsCurrency = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryCurrency, dataTableCurrency, urlApiCurrency, titleNotificationCurrency, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateCurrency
export const getCurrencyById = async _id => {
  const { data, status } = await getDataById(urlApiCurrency, _id, titleNotificationCurrency)
  if (status) {
    stateCurrency.value = { ...stateCurrency.value, ...data }
  }
}

// Función para gestionar una Moneda
export const sendCurrency = async (action, _id = null) => {
  const response = await sendForm(stateCurrency, urlApiCurrency, titleNotificationCurrency, action, _id)
  return response
}
