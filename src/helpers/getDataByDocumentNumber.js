import useFetchApiPeru from '@/hooks/useFetchApiPeru'
import { messageToast } from './messageExtensions'

// Función para obtener un recurso de la api por Id
export default async documentNumber => {
  const response = {
    status: false,
    data: null,
  }
  const { data, error } = await useFetchApiPeru(documentNumber)
  if (error) {
    messageToast('danger', 'Número de Documento', error)
    response.status = false
    response.data = null
    return response
  }
  if (data) {
    response.status = true
    response.data = data
    return response
  }
  response.status = false
  response.data = null
  return response
}
