// Importar funciones y variables necesarias para crear los servicios del mantenimiento Característica
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryFeature, dataTableFeature, stateFeature, urlApiFeature, titleNotificationFeature,
} from './useVariablesFeature'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsFeature = async (page = null, perPage = null) => {
  loadTable(serverQueryFeature, dataTableFeature, urlApiFeature, titleNotificationFeature, page, perPage)
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateFeature
export const getFeatureById = async _id => {
  const { data, status } = await getDataById(urlApiFeature, _id, titleNotificationFeature)
  if (status) {
    stateFeature.value = { ...stateFeature.value, ...data }
  }
}

// Función para gestionar una Característica
export const sendFeature = async (action, _id = null) => {
  const response = await sendForm(stateFeature, urlApiFeature, titleNotificationFeature, action, _id)
  return response
}
