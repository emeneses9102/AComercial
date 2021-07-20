// Importar funciones y variables necesarias para crear los servicios del mantenimiento Predio
// import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryPredio, dataTablePredio, statePredio, urlApiPredio, titleNotificationPredio,
} from './useVariablesPredio'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePredio
export const loadItemsPredio = async (page = null, perPage = null) => {
  // if (page) serverQueryPredio.value.pinicio = page
  // if (perPage) serverQueryPredio.value.pfin = perPage
  // dataTablePredio.value.loading = true
  // const { status, rows, totalRows } = await getData(urlApiPredio, serverQueryPredio.value, titleNotificationPredio)
  // if (status) {
  //   dataTablePredio.value.rows = rows
  //   dataTablePredio.value.totalRows = totalRows
  // }
  // dataTablePredio.value.loading = false
  const status = await loadTable(serverQueryPredio, dataTablePredio, urlApiPredio, titleNotificationPredio, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePredio
export const getPredioById = async _id => {
  const { data, status } = await getDataById(urlApiPredio, _id, titleNotificationPredio)
  if (status) {
    statePredio.value._id = data._id
    statePredio.value.codigoDepartamento = data.codigoDepartamento
    statePredio.value.codigoProvincia = data.codigoProvincia
    statePredio.value.idUbigeo = data.idUbigeo
    statePredio.value.direccion = data.direccion
    statePredio.value.observacion = data.observacion
  }
}

// Función para gestionar una Predio
export const sendPredio = async (action, _id = null) => {
  // if (_id) statePredio.value._id = _id
  // statePredio.value.accion = action
  // const response = await sendData(urlApiPredio, statePredio.value, titleNotificationPredio)
  // if (response.status && action === ACTION_REGISTER) statePredio.value._id = response.data.id
  // return response
  const response = await sendForm(statePredio, urlApiPredio, titleNotificationPredio, action, _id)
  return response
}
