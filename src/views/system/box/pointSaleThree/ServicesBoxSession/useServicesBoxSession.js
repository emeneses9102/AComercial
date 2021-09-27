/* eslint-disable import/prefer-default-export */

// Importar helpers para los servicios
import {
  getRequest,
} from '@/helpers/requestRaw'
import {
  formatDateBySeparator,
} from '@/helpers/date'
// Importar las variables reactivas
import {
  urlApiBoxSession,
  serverQueryBoxSession,
  titleNotificationBoxSession,
} from './useVariablesBoxSession'

// Función para obtener una sesion por idCollaborator
export const getBoxSessionByIdCollaborator = async (idCollaborator, startDate = null, endDate = null) => {
  serverQueryBoxSession.value.ffin = '1'
  serverQueryBoxSession.value.indice = idCollaborator
  serverQueryBoxSession.value.finicio = formatDateBySeparator(startDate, '-')
  serverQueryBoxSession.value.ffin = formatDateBySeparator(endDate, '-')
  const { data, error } = await getRequest(urlApiBoxSession, titleNotificationBoxSession, serverQueryBoxSession.value)
  if (error || !data) return null
  return data[0]
}

// Función para obtener el idMoneda local
export const getCurrencyLocal = async () => {
  const { data, error } = await getRequest('/monedas?_id=0&tabla=moneda&pinicio=1&pfin=1&opcional=a.mlocal=1')
  if (error || !data) return null
  return data[0]
}
