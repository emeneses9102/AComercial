// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Almacén
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryStorageType, dataTableStorageType, stateStorageType, urlApiStorageType, titleNotificationStorageType,
} from './useVariablesStorageType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableStorageType
export const loadItemsStorageType = async (page = null, perPage = null) => {
  // if (page) serverQueryStorageType.value.pinicio = page
  // if (perPage) serverQueryStorageType.value.pfin = perPage
  // dataTableStorageType.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiStorageType, serverQueryStorageType.value, titleNotificationStorageType)
  // if (status) {
  //   dataTableStorageType.value.rows = rows
  //   dataTableStorageType.value.totalRows = totalRows
  // }
  // dataTableStorageType.value.loading = false
  const status = await loadTable(serverQueryStorageType, dataTableStorageType, urlApiStorageType, titleNotificationStorageType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateStorageType
export const getStorageTypeById = async _id => {
  const { data, status } = await getDataById(urlApiStorageType, _id, titleNotificationStorageType)
  if (status) {
    stateStorageType.value._id = data._id
    stateStorageType.value.nombre = data.nombre
  }
}

// Función para gestionar una Tipo Almacén
export const sendStorageType = async (action, _id = null) => {
  // if (_id) stateStorageType.value._id = _id
  // stateStorageType.value.accion = action
  // const response = await sendData(urlApiStorageType, stateStorageType.value, titleNotificationStorageType)
  // if (response.status && action === ACTION_REGISTER) stateStorageType.value._id = response.data.id
  // return response
  const response = await sendForm(stateStorageType, urlApiStorageType, titleNotificationStorageType, action, _id)
  return response
}
