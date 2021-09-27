// Importar funciones y variables necesarias para crear los servicios del mantenimiento Punto de Venta
import { getData, getDataById } from '@/helpers/manageTables'
import {
  serverQueryPointSale, dataTablePointSale, statePointSale, urlApiPointSale, titleNotificationPointSale,
} from './useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePointSale
export const loadItemsPointSale = async (page = null, perPage = null) => {
  if (page) serverQueryPointSale.value.pinicio = page
  if (perPage) serverQueryPointSale.value.pfin = perPage
  dataTablePointSale.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiPointSale, serverQueryPointSale.value, titleNotificationPointSale)
  if (status) {
    dataTablePointSale.value.rows = rows
    dataTablePointSale.value.totalRows = totalRows
  }
  dataTablePointSale.value.loading = false
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSale
export const getPointSaleById = async _id => {
  const { data, status } = await getDataById(urlApiPointSale, _id, titleNotificationPointSale)
  if (status) {
    statePointSale.value = { ...statePointSale.value, ...data }
  }
}
