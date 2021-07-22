/* eslint-disable import/prefer-default-export */

import { ACTION_CHANGE_PASSWORD } from '@/helpers/actionsApi'
import { sendForm } from '@/helpers/manageTables'
import { verifyUserExist } from '@/helpers/verifyUser'
import {
  preparedData, stateChangePassword, titleNotificationChangePassword, urlApiChangePassword,
} from './useVariablesChangePassword'

// Función para cambiar la contraseña
export const sendChangePassword = async () => {
  stateChangePassword.value.loading = true
  const userExist = await verifyUserExist(stateChangePassword.value.usuario, stateChangePassword.value.claveUsuarioLoageado, titleNotificationChangePassword)
  if (!userExist) {
    stateChangePassword.value.loading = false
    return false
  }
  const { status } = await sendForm(preparedData(), urlApiChangePassword, titleNotificationChangePassword, ACTION_CHANGE_PASSWORD)
  stateChangePassword.value.loading = false
  return status
}
