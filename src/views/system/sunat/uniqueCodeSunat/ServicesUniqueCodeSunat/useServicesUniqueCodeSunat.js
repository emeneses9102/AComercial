/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Código Único Sunat
import { loadTable } from '@/helpers/manageTables'
import {
  serverQueryUniqueCodeSunat, dataTableUniqueCodeSunat, urlApiUniqueCodeSunat, titleNotificationUniqueCodeSunat,
} from './useVariablesUniqueCodeSunat'

// Función para obtener los datos desde la API y actualizar los valores de dataTableUniqueCodeSunat
export const loadItemsUniqueCodeSunat = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryUniqueCodeSunat, dataTableUniqueCodeSunat, urlApiUniqueCodeSunat, titleNotificationUniqueCodeSunat, page, perPage)
  return status
}
