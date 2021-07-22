/* eslint-disable import/prefer-default-export */

import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import { messageToast } from './messageExtensions'

export const verifyUserExist = async (usuario, clave, title = 'Usuario') => {
  const { data, error } = await useFetchApiSimsac('/verificausuario', {}, { usuario, clave })
  if (error) {
    messageToast('danger', title, 'Ocurrio un error al momento de verificar el usuario')
    return false
  }
  if (!data) {
    messageToast('warning', title, 'Ingresa la contraseña con la que accediste al sistema')
    return false
  }
  return true
}
