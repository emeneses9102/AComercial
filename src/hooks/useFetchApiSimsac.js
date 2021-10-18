import apis from '@/libs/axios'

const useFetchApiSimsac = async (path = '/', query = {}, body = {}) => {
  const response = {
    data: null,
    error: null,
  }
  try {
    if (Object.keys(body).length) {
      const responseApi = await apis.apiSimsac.post(path, body)
      response.data = responseApi.data
    } else {
      const serverQuery = []
      if (Object.values(query).length) {
        const keys = Object.keys(query)
        keys.forEach(key => {
          if (typeof query[key] === 'number' || (typeof query[key] === 'string' && query[key].trim().length !== 0)) {
            serverQuery.push(`${key}=${query[key]}`)
          }
        })
      }
      let pathWithServerQuery = path
      if (serverQuery.length) {
        pathWithServerQuery += `?${serverQuery.join('&')}`
      }
      const responseApi = await apis.apiSimsac.get(pathWithServerQuery)
      response.data = responseApi.data
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      response.data = null
      response.error = null
    } else {
      response.error = error.response || 'Ocurrio un error en el servidor...'
    }
  }
  return response
}

export default useFetchApiSimsac
