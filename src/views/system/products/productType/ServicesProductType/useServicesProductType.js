// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Producto
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryProductType, dataTableProductType, stateProductType, urlApiProductType, titleNotificationProductType,
} from './useVariablesProductType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableProductType
export const loadItemsProductType = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryProductType, dataTableProductType, urlApiProductType, titleNotificationProductType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateProductType
export const getProductTypeById = async _id => {
  const { data, status } = await getDataById(urlApiProductType, _id, titleNotificationProductType)
  if (status) {
    stateProductType.value = { ...stateProductType.value, ...data }
  }
}

// Función para gestionar una Tipo Producto
export const sendProductType = async (action, _id = null) => {
  const response = await sendForm(stateProductType, urlApiProductType, titleNotificationProductType, action, _id)
  return response
}
