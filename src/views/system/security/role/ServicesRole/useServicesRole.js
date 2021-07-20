// Importar funciones y variables necesarias para crear los servicios del mantenimiento Rol
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryRole, dataTableRole, stateRole, urlApiRole, titleNotificationRole,
} from './useVariablesRole'

// Función para obtener los datos desde la API y actualizar los valores de dataTableRole
export const loadItemsRole = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryRole, dataTableRole, urlApiRole, titleNotificationRole, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateRole
export const getRoleById = async _id => {
  const { data, status } = await getDataById(urlApiRole, _id, titleNotificationRole)
  if (status) {
    stateRole.value._id = data._id
    stateRole.value.nombre = data.nombre
    stateRole.value.idPredio = data.idPredio
    stateRole.value.idAlmacen = data.idAlmacen
  }
}

// Función para gestionar un Rol
export const sendRole = async (action, _id = null) => {
  const response = await sendForm(stateRole, urlApiRole, titleNotificationRole, action, _id)
  return response
}
