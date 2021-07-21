// Importar funciones y variables necesarias para crear los servicios del mantenimiento Módulo
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryModule, dataTableModule, stateModule, urlApiModule, titleNotificationModule,
} from './useVariablesModule'

// Función para obtener los datos desde la API y actualizar los valores de dataTableModule
export const loadItemsModule = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryModule, dataTableModule, urlApiModule, titleNotificationModule, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateModule
export const getModuleById = async _id => {
  const { data, status } = await getDataById(urlApiModule, _id, titleNotificationModule)
  if (status) {
    stateModule.value = { ...stateModule.value, ...data }
  }
}

// Función para gestionar un Módulo
export const sendModule = async (action, _id = null) => {
  const response = await sendForm(stateModule, urlApiModule, titleNotificationModule, action, _id)
  return response
}
