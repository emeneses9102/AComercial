// Importar funciones y variables necesarias para crear los servicios del mantenimiento Socio
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPartner, dataTablePartner, statePartner, urlApiPartner, titleNotificationPartner,
} from './useVariablesPartner'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePartner
export const loadItemsPartner = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPartner, dataTablePartner, urlApiPartner, titleNotificationPartner, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePartner
export const getPartnerById = async _id => {
  const { data, status } = await getDataById(urlApiPartner, _id, titleNotificationPartner)
  if (status) {
    statePartner.value = { ...statePartner.value, ...data }
  }
}

// Función para gestionar un Socio
export const sendPartner = async (action, _id = null) => {
  const response = await sendForm(statePartner, urlApiPartner, titleNotificationPartner, action, _id)
  return response
}
