// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Almacén
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryStorageType, dataTableStorageType, stateStorageType, urlApiStorageType, titleNotificationStorageType,
} from './useVariablesStorageType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableStorageType
export const loadItemsStorageType = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryStorageType, dataTableStorageType, urlApiStorageType, titleNotificationStorageType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateStorageType
export const getStorageTypeById = async _id => {
  const { data, status } = await getDataById(urlApiStorageType, _id, titleNotificationStorageType)
  if (status) {
    stateStorageType.value = { ...stateStorageType.value, ...data }
  }
}

// Función para gestionar una Tipo Almacén
export const sendStorageType = async (action, _id = null) => {
  const response = await sendForm(stateStorageType, urlApiStorageType, titleNotificationStorageType, action, _id)
  return response
}
