/* eslint-disable import/prefer-default-export */

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Familia Sunat
import { loadTable } from '@/helpers/manageTables'
import {
  serverQueryFamilySunat, dataTableFamilySunat, urlApiFamilySunat, titleNotificationFamilySunat,
} from './useVariablesFamilySunat'

// Función para obtener los datos desde la API y actualizar los valores de dataTableFamilySunat
export const loadItemsFamilySunat = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryFamilySunat, dataTableFamilySunat, urlApiFamilySunat, titleNotificationFamilySunat, page, perPage)
  return status
}
