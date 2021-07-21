// Importar funciones y variables necesarias para crear los servicios del mantenimiento Opción
import { getDataById, loadTable, sendForm } from '@/helpers/manageTables'
import {
  serverQueryOption, dataTableOption, stateOption, urlApiOption, titleNotificationOption,
} from './useVariablesOption'

// Función para obtener los datos desde la API y actualizar los valores de dataTableOption
export const loadItemsOption = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryOption, dataTableOption, urlApiOption, titleNotificationOption, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable stateOption
export const getOptionById = async _id => {
  const { data, status } = await getDataById(urlApiOption, _id, titleNotificationOption)
  if (status) {
    stateOption.value = { ...stateOption.value, ...data }
  }
}

// Función para gestionar una Opción
export const sendOption = async (action, _id = null) => {
  const response = await sendForm(stateOption, urlApiOption, titleNotificationOption, action, _id)
  return response
}
