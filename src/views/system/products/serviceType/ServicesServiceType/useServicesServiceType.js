// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Servicio
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryServiceType, dataTableServiceType, stateServiceType, urlApiServiceType, titleNotificationServiceType,
} from './useVariablesServiceType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableServiceType
export const loadItemsServiceType = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryServiceType, dataTableServiceType, urlApiServiceType, titleNotificationServiceType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateServiceType
export const getServiceTypeById = async _id => {
  const { data, status } = await getDataById(urlApiServiceType, _id, titleNotificationServiceType)
  if (status) {
    stateServiceType.value = { ...stateServiceType.value, ...data }
  }
}

// Función para gestionar una Tipo Servicio
export const sendServiceType = async (action, _id = null) => {
  const response = await sendForm(stateServiceType, urlApiServiceType, titleNotificationServiceType, action, _id)
  return response
}
