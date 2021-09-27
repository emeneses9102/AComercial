/* eslint-disable import/prefer-default-export */

import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from './messageExtensions'

export const getRequest = async (url, title, serverQuery = null) => {
  let response = null
  if (!serverQuery) {
    response = await useFetchApiSimsac(url)
    if (response.error) {
      messageToast('danger', title, 'Ocurrio un error al momento de obtener información')
      return response
    }
  } else {
    response = await useFetchApiSimsac(url, serverQuery)
    if (response.error) {
      messageToast('danger', title, 'Ocurrio un error al momento de obtener información')
      return response
    }
  }
  return response
}
