/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Código Único
import { getData } from '@/helpers/manageTables'
import {
  serverQueryUniqueCode, dataTableUniqueCode, urlApiUniqueCode, titleNotificationUniqueCode,
} from './useVariablesUniqueCode'

// Función para obtener los datos desde la API y actualizar los valores de dataTableUniqueCode
export const loadItemsUniqueCode = async (page = null, perPage = null) => {
  if (page) serverQueryUniqueCode.value.pinicio = page
  if (perPage) serverQueryUniqueCode.value.pfin = perPage
  dataTableUniqueCode.value.loading = true
  const { status, rows, totalRows } = await getData(urlApiUniqueCode, serverQueryUniqueCode.value, titleNotificationUniqueCode)
  if (status) {
    dataTableUniqueCode.value.rows = rows
    dataTableUniqueCode.value.totalRows = totalRows
  }
  dataTableUniqueCode.value.loading = false
}
