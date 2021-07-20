// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Producto
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryProductType, dataTableProductType, stateProductType, urlApiProductType, titleNotificationProductType,
} from './useVariablesProductType'

// Función para obtener los datos desde la API y actualizar los valores de dataTableProductType
export const loadItemsProductType = async (page = null, perPage = null) => {
  // if (page) serverQueryProductType.value.pinicio = page
  // if (perPage) serverQueryProductType.value.pfin = perPage
  // dataTableProductType.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiProductType, serverQueryProductType.value, titleNotificationProductType)
  // if (status) {
  //   dataTableProductType.value.rows = rows
  //   dataTableProductType.value.totalRows = totalRows
  // }
  // dataTableProductType.value.loading = false
  const status = await loadTable(serverQueryProductType, dataTableProductType, urlApiProductType, titleNotificationProductType, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateProductType
export const getProductTypeById = async _id => {
  const { data, status } = await getDataById(urlApiProductType, _id, titleNotificationProductType)
  if (status) {
    stateProductType.value._id = data._id
    stateProductType.value.nombre = data.nombre
  }
}

// Función para gestionar una Tipo Producto
export const sendProductType = async (action, _id = null) => {
  // if (_id) stateProductType.value._id = _id
  // stateProductType.value.accion = action
  // const response = await sendData(urlApiProductType, stateProductType.value, titleNotificationProductType)
  // if (response.status && action === ACTION_REGISTER) stateProductType.value._id = response.data.id
  // return response
  const response = await sendForm(stateProductType, urlApiProductType, titleNotificationProductType, action, _id)
  return response
}
