// Importar funciones y variables necesarias para crear los servicios de la tabla Sub Almacén
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryVoucherDetailCorrelative, dataTableVoucherDetailCorrelative, stateVoucherDetailCorrelative, urlApiVoucherDetailCorrelative, titleNotificationVoucherDetailCorrelative,
} from './useVariablesVoucherDetailCorrelative'
import { stateVoucher } from '../ServicesVoucher/useVariablesVoucher'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFeature
export const loadItemsVoucherDetailCorrelative = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryVoucherDetailCorrelative, dataTableVoucherDetailCorrelative, urlApiVoucherDetailCorrelative, titleNotificationVoucherDetailCorrelative, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateVoucherDetailCorrelative
export const getVoucherDetailCorrelativeById = async _id => {
  const { data, status } = await getDataById(urlApiVoucherDetailCorrelative, _id, titleNotificationVoucherDetailCorrelative)
  if (status) {
    stateVoucherDetailCorrelative.value = { ...stateVoucherDetailCorrelative.value, ...data }
  }
}

// Función para gestionar un Correlativo
export const sendVoucherDetailCorrelative = async (action, _id = null) => {
  stateVoucherDetailCorrelative.value.idComprobante = stateVoucher.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateVoucherDetailCorrelative.value.loading = true
  const response = await sendForm(stateVoucherDetailCorrelative, urlApiVoucherDetailCorrelative, titleNotificationVoucherDetailCorrelative, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) stateVoucherDetailCorrelative.value.loading = false
  return response
}
