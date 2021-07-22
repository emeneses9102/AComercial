// Importar funciones y variables necesarias para crear los servicios del mantenimiento Medio de Pago
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPaymentMethod, dataTablePaymentMethod, statePaymentMethod, urlApiPaymentMethod, titleNotificationPaymentMethod,
} from './useVariablesPaymentMethod'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePaymentMethod
export const loadItemsPaymentMethod = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPaymentMethod, dataTablePaymentMethod, urlApiPaymentMethod, titleNotificationPaymentMethod, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePaymentMethod
export const getPaymentMethodById = async _id => {
  const { data, status } = await getDataById(urlApiPaymentMethod, _id, titleNotificationPaymentMethod)
  if (status) {
    statePaymentMethod.value = { ...statePaymentMethod.value, ...data }
  }
}

// Función para gestionar una Medio de Pago
export const sendPaymentMethod = async (action, _id = null) => {
  const response = await sendForm(statePaymentMethod, urlApiPaymentMethod, titleNotificationPaymentMethod, action, _id)
  return response
}
