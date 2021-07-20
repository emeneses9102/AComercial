import apis from '@/libs/axios'

const useFetchApiPeru = async documentNumber => {
  const response = {
    data: null,
    error: null,
  }
  try {
    let documentType = ''
    if (documentNumber.length === 8) documentType = 'dni'
    else if (documentNumber.length === 11) documentType = 'ruc'
    else return response
    const { data } = await apis.apiPeru.get(`${documentType}/${documentNumber}`)
    if (!data.success) response.error = data.message
    response.data = data.data
  } catch (error) {
    response.error = error
  }
  return response
}

export default useFetchApiPeru
