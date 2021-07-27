/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Clases Sunat
import { loadTable } from '@/helpers/manageTables'
import {
  serverQueryClassSunat, dataTableClassSunat, urlApiClassSunat, titleNotificationClassSunat,
} from './useVariablesClassSunat'

// Función para obtener los datos desde la API y actualizar los valores de dataTableClassSunat
export const loadItemsClassSunat = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryClassSunat, dataTableClassSunat, urlApiClassSunat, titleNotificationClassSunat, page, perPage)
  return status
}
