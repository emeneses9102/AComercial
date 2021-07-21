// Importar funciones y variables necesarias para crear los servicios del mantenimiento Almacén
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryStorage, dataTableStorage, stateStorage, urlApiStorage, titleNotificationStorage,
} from './useVariablesStorage'

// Función para obtener los datos desde la API y actualizar los valores de dataTableStorage
export const loadItemsStorage = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryStorage, dataTableStorage, urlApiStorage, titleNotificationStorage, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateStorage
export const getStorageById = async _id => {
  const { data, status } = await getDataById(urlApiStorage, _id, titleNotificationStorage)
  if (status) {
    stateStorage.value._id = data._id
    stateStorage.value.nombre = data.nombre
    stateStorage.value.idPredio = data.idPredio
    stateStorage.value.idTipoAlmacen = data.idTipoAlmacen
    stateStorage.value.idNegocio = data.idNegocio
    stateStorage.value.observacion = data.observacion
  }
}

// Función para gestionar un Almacén
export const sendStorage = async (action, _id = null) => {
  const response = await sendForm(stateStorage, urlApiStorage, titleNotificationStorage, action, _id)
  return response
}
