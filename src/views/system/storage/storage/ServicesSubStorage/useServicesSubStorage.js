// Importar funciones y variables necesarias para crear los servicios del mantenimiento Sub Almacén
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQuerySubStorage, dataTableSubStorage, stateSubStorage, urlApiSubStorage, titleNotificationSubStorage,
} from './useVariablesSubStorage'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsSubStorage = async (page = null, perPage = null) => {
  const status = await loadTable(serverQuerySubStorage, dataTableSubStorage, urlApiSubStorage, titleNotificationSubStorage, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateSubStorage
export const getSubStorageById = async _id => {
  const { data, status } = await getDataById(urlApiSubStorage, _id, titleNotificationSubStorage)
  if (status) {
    stateSubStorage.value = { ...stateSubStorage.value, ...data }
  }
}

// Función para gestionar un Sub Almacén
export const sendSubStorage = async (action, _id = null) => {
  stateSubStorage.value.idAlmacen = stateStorage.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateSubStorage.value.loading = true
  const response = await sendForm(stateSubStorage, urlApiSubStorage, titleNotificationSubStorage, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateSubStorage.value.loading = false
  return response
}
