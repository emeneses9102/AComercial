// Importar funciones y variables necesarias para crear los servicios del mantenimiento Documento
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryDocument, dataTableDocument, stateDocument, urlApiDocument, titleNotificationDocument,
} from './useVariablesDocument'

// Función para obtener los datos desde la API y actualizar los valores de dataTableDocument
export const loadItemsDocument = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryDocument, dataTableDocument, urlApiDocument, titleNotificationDocument, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateDocument
export const getDocumentById = async _id => {
  const { data, status } = await getDataById(urlApiDocument, _id, titleNotificationDocument)
  if (status) {
    stateDocument.value = { ...stateDocument.value, ...data }
  }
}

// Función para gestionar una Documento
export const sendDocument = async (action, _id = null) => {
  const response = await sendForm(stateDocument, urlApiDocument, titleNotificationDocument, action, _id)
  return response
}
