// Importar funciones y variables necesarias para crear los servicios de la tabla Sub Almacén
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryClient, dataTableClient, stateClient, urlApiClient, titleNotificationClient,
} from './useVariablesClient'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsClient = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryClient, dataTableClient, urlApiClient, titleNotificationClient, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateClient
export const getClientById = async _id => {
  const { data, status } = await getDataById(urlApiClient, _id, titleNotificationClient)
  if (status) {
    stateClient.value = { ...stateClient.value, ...data }
  }
}

// Función para gestionar un Correlativo
export const sendClient = async (action, _id = null) => {
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateClient.value.loading = true
  const response = await sendForm(stateClient, urlApiClient, titleNotificationClient, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateClient.value.loading = false
  return response
}
