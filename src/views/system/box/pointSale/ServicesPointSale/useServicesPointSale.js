// Importar funciones y variables necesarias para crear los servicios del mantenimiento Medio de Pago
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPointSale, dataTablePointSale, statePointSale, urlApiPointSale, titleNotificationPointSale,
} from './useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePointSale
export const loadItemsPointSale = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSale, dataTablePointSale, urlApiPointSale, titleNotificationPointSale, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSale
export const getPointSaleById = async _id => {
  const { data, status } = await getDataById(urlApiPointSale, _id, titleNotificationPointSale)
  if (status) {
    statePointSale.value = { ...statePointSale.value, ...data }
  }
}

// Función para gestionar una Medio de Pago
export const sendPointSale = async (action, _id = null) => {
  const response = await sendForm(statePointSale, urlApiPointSale, titleNotificationPointSale, action, _id)
  return response
}
