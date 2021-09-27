/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Almacén
import {
  sendForm,
} from '@/helpers/manageTables'
import {
  statePointSale,
  urlApiPointSale,
  titleNotificationPointSale,
} from './useVariablesPointSale'

// Función para gestionar un Almacén
export const sendPointSale = async (action, _id = null) => {
  const response = await sendForm(statePointSale, urlApiPointSale, titleNotificationPointSale, action, _id)
  return response
}
