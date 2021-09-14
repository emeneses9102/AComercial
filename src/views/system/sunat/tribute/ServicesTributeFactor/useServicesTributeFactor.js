// Importar funciones y variables necesarias para crear los servicios de la tabla Tributo Factor
import {
  ACTION_REGISTER,
  ACTION_UPDATE,
} from '@/helpers/actionsApi'
import {
  getDataById,
  loadTable,
  sendForm,
} from '@/helpers/manageTables'
import {
  serverQueryTributeFactor,
  dataTableTributeFactor,
  stateTributeFactor,
  urlApiTributeFactor,
  titleNotificationTributeFactor,
} from './useVariablesTributeFactor'
import {
  stateTribute,
} from '../ServicesTribute/useVariablesTribute'

// Función para obtener los datos desde la API y actualizar los valores de dataTable
export const loadItemsTributeFactor = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryTributeFactor, dataTableTributeFactor, urlApiTributeFactor, titleNotificationTributeFactor, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateTributeFactor
export const getTributeFactorById = async _id => {
  const { data, status } = await getDataById(urlApiTributeFactor, _id, titleNotificationTributeFactor)
  if (status) {
    stateTributeFactor.value = { ...stateTributeFactor.value, ...data }
  }
}

// Función para gestionar un Tributo Factor
export const sendTributeFactor = async (action, _id = null) => {
  if (stateTributeFactor.value.finicial) {
    stateTributeFactor.value.inicial = stateTributeFactor.value.finicial
  } else {
    stateTributeFactor.value.inicial = '1900-01-01'
  }
  if (stateTributeFactor.value.ffinal) {
    stateTributeFactor.value.final = stateTributeFactor.value.ffinal
  } else {
    stateTributeFactor.value.final = '1900-01-01'
  }
  stateTributeFactor.value.idTributo = stateTribute.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateTributeFactor.value.loading = true
  const response = await sendForm(stateTributeFactor, urlApiTributeFactor, titleNotificationTributeFactor, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateTributeFactor.value.loading = false
  return response
}
