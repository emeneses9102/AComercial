// Importar funciones y variables necesarias para crear los servicios del mantenimiento Almacén
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryStorage, dataTableStorage, stateStorage, urlApiStorage, titleNotificationStorage,
} from './useVariablesStorage'

// Función para obtener los datos desde la API y actualizar los valores de dataTableStorage
export const loadItemsStorage = async (page = null, perPage = null) => {
  // if (page) serverQueryStorage.value.pinicio = page
  // if (perPage) serverQueryStorage.value.pfin = perPage
  // dataTableStorage.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiStorage, serverQueryStorage.value, titleNotificationStorage)
  // if (status) {
  //   dataTableStorage.value.rows = rows
  //   dataTableStorage.value.totalRows = totalRows
  // }
  // dataTableStorage.value.loading = false
  const status = await loadTable(serverQueryStorage, dataTableStorage, urlApiStorage, titleNotificationStorage, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateStorage
export const getStorageById = async _id => {
  const { data, status } = await getDataById(urlApiStorage, _id, titleNotificationStorage)
  if (status) {
    stateStorage.value._id = data._id
    stateStorage.value.nombre = data.nombre
    stateStorage.value.idPredio = data.idPredio
    stateStorage.value.idTipoAlmacen = data.idTipoAlmacen
    stateStorage.value.idNegocio = data.idNegocio
    stateStorage.value.observacion = data.observacion
  }
}

// Función para gestionar un Almacén
export const sendStorage = async (action, _id = null) => {
  // if (_id) stateStorage.value._id = _id
  // stateStorage.value.accion = action
  // const response = await sendData(urlApiStorage, stateStorage.value, titleNotificationStorage)
  // if (response.status && action === ACTION_REGISTER) stateStorage.value._id = response.data.id
  // return response
  const response = await sendForm(stateStorage, urlApiStorage, titleNotificationStorage, action, _id)
  return response
}
