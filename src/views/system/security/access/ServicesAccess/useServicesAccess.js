// Importar funciones y variables necesarias para crear los servicios del mantenimiento Accesos
import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getData, sendData } from '@/helpers/manageTables'
import {
  dataTableAccess, urlApiAccess, titleNotificationAccess, stateAccess, serverQueryAccess,
} from './useVariablesAccess'

// Función para obtener los datos desde la API y actualizar los valores de dataTableAccess
export const loadItemsAccess = async () => {
  dataTableAccess.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiAccess, serverQueryAccess, titleNotificationAccess)
  if (status) {
    dataTableAccess.value.rows = rows
    dataTableAccess.value.totalRows = totalRows
  }
  dataTableAccess.value.loading = false
}

// Función para gestionar una Acceso
export const sendAccess = async (action, _id = null) => {
  if (_id) stateAccess.value._id = _id
  stateAccess.value.accion = action
  const response = await sendData(urlApiAccess, stateAccess.value, titleNotificationAccess)
  if (response.status && action === ACTION_REGISTER) stateAccess.value._id = response.data.id
  return response
}
