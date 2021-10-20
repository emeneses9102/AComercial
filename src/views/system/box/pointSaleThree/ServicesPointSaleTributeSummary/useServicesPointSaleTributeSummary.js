/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable import/prefer-default-export */

import {
  loadTable,
} from '@/helpers/manageTables'
import {
  listPointSaleTributeSummary,
  urlApiPointSaleTributeSummary,
  titleNotificationPointSaleTributeSummary,
  serverQueryPointSaleTributeSummary,
} from './useVariablesPointSaleTributeSummary'
import {
  statePointSale,
} from '../ServicesPointSale/useVariablesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de listPointSaleTributeSummary
export const loadItemsPointSaleTributeSummary = async (page = null, perPage = null) => {
  serverQueryPointSaleTributeSummary.value._id = statePointSale.value._id
  const status = await loadTable(serverQueryPointSaleTributeSummary, listPointSaleTributeSummary, urlApiPointSaleTributeSummary, titleNotificationPointSaleTributeSummary, page, perPage)
  return status
}
