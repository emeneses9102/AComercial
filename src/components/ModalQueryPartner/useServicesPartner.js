// Importar funciones y variables necesarias para crear los servicios del mantenimiento Artículos
import { getData, getDataById } from '@/helpers/manageTables'
import {
  serverQueryPartner, dataTablePartner, statePartner, urlApiPartner, titleNotificationPartner,
} from './useVariablesPartner'

// Función para obtener los datos desde la API y actualizar los valores de dataTablePartner
export const loadItemsPartner = async (page = null, perPage = null) => {
  if (page) serverQueryPartner.value.pinicio = page
  if (perPage) serverQueryPartner.value.pfin = perPage
  dataTablePartner.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiPartner, serverQueryPartner.value, titleNotificationPartner)
  if (status) {
    dataTablePartner.value.rows = rows
    dataTablePartner.value.totalRows = totalRows
  }
  dataTablePartner.value.loading = false
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePartner
export const getPartnerById = async _id => {
  const { data, status } = await getDataById(urlApiPartner, _id, titleNotificationPartner)
  if (status) {
    statePartner.value = { ...statePartner.value, ...data }
  }
}
