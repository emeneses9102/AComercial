// Importar funciones y variables necesarias para crear los servicios del mantenimiento Forma de Pago
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPaymentForm, dataTablePaymentForm, statePaymentForm, urlApiPaymentForm, titleNotificationPaymentForm,
} from './useVariablesPaymentForm'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePaymentForm
export const loadItemsPaymentForm = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPaymentForm, dataTablePaymentForm, urlApiPaymentForm, titleNotificationPaymentForm, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePaymentForm
export const getPaymentFormById = async _id => {
  const { data, status } = await getDataById(urlApiPaymentForm, _id, titleNotificationPaymentForm)
  if (status) {
    statePaymentForm.value = { ...statePaymentForm.value, ...data }
  }
}

// Función para gestionar una Forma de Pago
export const sendPaymentForm = async (action, _id = null) => {
  const response = await sendForm(statePaymentForm, urlApiPaymentForm, titleNotificationPaymentForm, action, _id)
  return response
}
