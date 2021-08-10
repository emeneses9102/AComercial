/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Tipo Producto
import { loadTable } from '@/helpers/manageTables'
import {
  serverQuerySegmentSunat, dataTableSegmentSunat, urlApiSegmentSunat, titleNotificationSegmentSunat,
} from './useVariablesSegmentSunat'

// Función para obtener los datos desde la API y actualizar los valores de dataTableSegmentSunat
export const loadItemsSegmentSunat = async (page = null, perPage = null) => {
  const status = await loadTable(serverQuerySegmentSunat, dataTableSegmentSunat, urlApiSegmentSunat, titleNotificationSegmentSunat, page, perPage)
  return status
}
