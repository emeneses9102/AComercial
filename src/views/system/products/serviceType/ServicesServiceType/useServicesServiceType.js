// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Servicio
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryServiceType, dataTableServiceType, stateServiceType, urlApiServiceType, titleNotificationServiceType,
} from './useVariablesServiceType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableServiceType
export const loadItemsServiceType = async (page = null, perPage = null) => {
  // if (page) serverQueryServiceType.value.pinicio = page
  // if (perPage) serverQueryServiceType.value.pfin = perPage
  // dataTableServiceType.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiServiceType, serverQueryServiceType.value, titleNotificationServiceType)
  // if (status) {
  //   dataTableServiceType.value.rows = rows
  //   dataTableServiceType.value.totalRows = totalRows
  // }
  // dataTableServiceType.value.loading = false
  const status = await loadTable(serverQueryServiceType, dataTableServiceType, urlApiServiceType, titleNotificationServiceType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateServiceType
export const getServiceTypeById = async _id => {
  const { data, status } = await getDataById(urlApiServiceType, _id, titleNotificationServiceType)
  if (status) {
    stateServiceType.value._id = data._id
    stateServiceType.value.nombre = data.nombre
  }
}

// Función para gestionar una Tipo Servicio
export const sendServiceType = async (action, _id = null) => {
  // if (_id) stateServiceType.value._id = _id
  // stateServiceType.value.accion = action
  // const response = await sendData(urlApiServiceType, stateServiceType.value, titleNotificationServiceType)
  // if (response.status && action === ACTION_REGISTER) stateServiceType.value._id = response.data.id
  // return response
  const response = await sendForm(stateServiceType, urlApiServiceType, titleNotificationServiceType, action, _id)
  return response
}
