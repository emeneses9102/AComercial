// Importar funciones y variables necesarias para crear los servicios del mantenimiento Accesos
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import { getRequest } from '@/helpers/requestRaw'
import {
  serverQueryAccess, dataTableAccess, stateAccess, urlApiAccess, titleNotificationAccess,
} from './useVariablesAccess'

// Función para obtener los datos desde la API y actualizar los valores de dataTableAccess
export const loadItemsAccess = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryAccess, dataTableAccess, urlApiAccess, titleNotificationAccess, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateAccess
export const getAccessById = async _id => {
  const { data, status } = await getDataById(urlApiAccess, _id, titleNotificationAccess)
  if (status) {
    stateAccess.value = { ...stateAccess.value, ...data }
  }
}

// Función para gestionar un Accesos
export const sendAccess = async (action, _id = null) => {
  const response = await sendForm(stateAccess, urlApiAccess, titleNotificationAccess, action, _id)
  return response
}

// Verificar existencia de acceso
export const verifyExistenceOfAccess = async (idRole, idModule, idMenu) => {
  const { error, data } = await getRequest(`/accesos/seguridad/${idRole}/${idModule}/${idMenu}`, 'Consultar Existencia de Acceso')
  if (error) return 0
  if (!data) return 0
  return data
}
