// Importar funciones y variables necesarias para crear los servicios del mantenimiento Característica
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryFeature, dataTableFeature, stateFeature, urlApiFeature, titleNotificationFeature,
} from './useVariablesFeature'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsFeature = async (page = null, perPage = null) => {
  // if (page) serverQueryFeature.value.pinicio = page
  // if (perPage) serverQueryFeature.value.pfin = perPage
  // dataTableFeature.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiFeature, serverQueryFeature.value, titleNotificationFeature)
  // if (status) {
  //   dataTableFeature.value.rows = rows
  //   dataTableFeature.value.totalRows = totalRows
  // }
  // dataTableFeature.value.loading = false
  loadTable(serverQueryFeature, dataTableFeature, urlApiFeature, titleNotificationFeature, page, perPage)
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateFeature
export const getFeatureById = async _id => {
  const { data, status } = await getDataById(urlApiFeature, _id, titleNotificationFeature)
  if (status) {
    stateFeature.value._id = data._id
    stateFeature.value.nombre = data.nombre
    stateFeature.value.abreviatura = data.abreviatura
  }
}

// Función para gestionar una Característica
export const sendFeature = async (action, _id = null) => {
  // if (_id) stateFeature.value._id = _id
  // stateFeature.value.accion = action
  // const response = await sendData(urlApiFeature, stateFeature.value, titleNotificationFeature)
  // if (response.status && action === ACTION_REGISTER) stateFeature.value._id = response.data.id
  // return response
  const response = await sendForm(stateFeature, urlApiFeature, titleNotificationFeature, action, _id)
  return response
}
