// Importar funciones y variables necesarias para crear los servicios del mantenimiento Sesion Caja
import { ref } from '@vue/composition-api'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryBoxSession, dataTableBoxSession, stateBoxSession, urlApiBoxSession, titleNotificationBoxSession,
} from './useVariablesBoxSession'

// Función para obtener los datos desde la API y actualizar los valores de dataTableBoxSession
export const loadItemsBoxSession = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryBoxSession, dataTableBoxSession, urlApiBoxSession, titleNotificationBoxSession, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateBoxSession
export const getBoxSessionById = async _id => {
  const { data, status } = await getDataById(urlApiBoxSession, _id, titleNotificationBoxSession)
  if (status) {
    stateBoxSession.value = { ...stateBoxSession.value, ...data }
  }
}

// Función para gestionar un Sesion Caja
export const sendBoxSession = async (action, _id = null) => {
  const { fechaApertura, fechaCierre, ...restStateBoxSession } = stateBoxSession.value
  const newRestStateBoxSession = ref(restStateBoxSession)
  const response = await sendForm(newRestStateBoxSession, urlApiBoxSession, titleNotificationBoxSession, action, _id)
  return response
}
