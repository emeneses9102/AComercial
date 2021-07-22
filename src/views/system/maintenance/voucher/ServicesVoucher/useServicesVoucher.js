// Importar funciones y variables necesarias para crear los servicios del mantenimiento Comprobante
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryVoucher, dataTableVoucher, stateVoucher, urlApiVoucher, titleNotificationVoucher,
} from './useVariablesVoucher'

// Función para obtener los datos desde la API y actualizar los valores de dataTableVoucher
export const loadItemsVoucher = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryVoucher, dataTableVoucher, urlApiVoucher, titleNotificationVoucher, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateVoucher
export const getVoucherById = async _id => {
  const { data, status } = await getDataById(urlApiVoucher, _id, titleNotificationVoucher)
  if (status) {
    stateVoucher.value = { ...stateVoucher.value, ...data }
  }
}

// Función para gestionar un Comprobante
export const sendVoucher = async (action, _id = null) => {
  const response = await sendForm(stateVoucher, urlApiVoucher, titleNotificationVoucher, action, _id)
  return response
}
